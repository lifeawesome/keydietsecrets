// app/api/subscribe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const addToContactList = async (resend: Resend, email: string) => {
  // Only add to list if RESEND_AUDIENCE_ID is configured
  const audienceId = process.env.RESEND_SEGMENT_NEWSLETTER;
  if (!audienceId) {
    console.log(
      "RESEND_SEGMENT_NEWSLETTER not configured, skipping contact list addition"
    );
    return;
  }

  try {
    const { error } = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });

    if (error) {
      console.error("Failed to add contact to list:", error);
    } else {
      console.log("Contact added to list:", email);
    }
  } catch (err) {
    console.error("Error adding contact to list:", err);
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source, fileUrl } = body;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (!fileUrl) {
      return NextResponse.json(
        { error: "File URL is required" },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact support." },
        { status: 500 }
      );
    }

    // Check if sender email is configured with a verified domain
    if (!process.env.RESEND_FROM_EMAIL) {
      console.error("RESEND_FROM_EMAIL is not configured");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact support." },
        { status: 500 }
      );
    }

    // Initialize Resend client after validating API key exists
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Fetch the file from Sanity
    const fileResponse = await fetch(fileUrl);
    if (!fileResponse.ok) {
      throw new Error(`Failed to fetch file: ${fileResponse.statusText}`);
    }

    const fileBuffer = await fileResponse.arrayBuffer();
    const fileName =
      new URL(fileUrl).pathname.split("/").pop() || "download.pdf";

    // Send email with file attachment
    const { data, error: resendError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: email,
      subject: "Your Download from KeyDietSecrets",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Thank You!</h1>
            </div>
            <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
              <p style="font-size: 16px; margin-top: 0;">Hi there,</p>
              <p style="font-size: 16px;">Thank you for using KeyDietSecrets.com! As requested, we've attached your download to this email.</p>
              <p style="font-size: 16px;">If you have any questions or need help, feel free to reply to this email.</p>
              <p style="font-size: 16px; margin-bottom: 0;">Best regards,<br>The KeyDietSecrets Team</p>
            </div>
            <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
              <p>This email was sent because you requested a download from KeyDietSecrets.</p>
            </div>
          </body>
        </html>
      `,
      attachments: [
        {
          filename: fileName,
          content: Buffer.from(fileBuffer).toString("base64"),
        },
      ],
    });

    if (resendError) {
      console.error("Resend error:", resendError);
      throw new Error(`Failed to send email: ${resendError.message}`);
    }

    // Log successful delivery
    console.log("Email sent successfully:", {
      email,
      source,
      fileUrl,
      messageId: data?.id,
      timestamp: new Date().toISOString(),
    });

    // Add email to contact list
    await addToContactList(resend, email);

    // Return success
    return NextResponse.json(
      {
        success: true,
        message: "File has been sent to your email",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process subscription. Please try again.",
      },
      { status: 500 }
    );
  }
}
