
import { NextRequest, NextResponse } from "next/server";  // Use NextResponse instead of Response
import { emailConfig } from "./emailconfig";



type mailOptionsType = {
  from: string;
  to: string;
  subject: string;
  html: string;
  text:string
};

export async function POST(request: NextRequest) {
  try {
    console.log("inside the post method of the email");

    const mailOptions: Partial<mailOptionsType> = await request.json();

    mailOptions.from = process.env.OAUTH_EMAIL;



    mailOptions.html = `<div><p>${mailOptions.text}</p><img src="${process.env.DOMAIN}/public/image.png"/></div>`;

    console.log(mailOptions);

    if (!(mailOptions.from && mailOptions.to && mailOptions.subject && mailOptions.html)) {
      return NextResponse.json(
        {
          message: `Missing required fields. Expected format: {from: string, to: string, subject: string, text: string, html: string}`,
        },
        { status: 400 }
      );
    }

    
    const emailConfigInstance = await emailConfig();
    const info = await emailConfigInstance.sendMail(mailOptions);
    console.log('Message sent: %s', info);

    return NextResponse.json({
      message: "Email sent successfully!",
    });
  } catch (err) {
    console.log(err);
    
    // Return error response
    return NextResponse.json({
      message: "Failed to send email.",
    }, { status: 500 });
  }
}
