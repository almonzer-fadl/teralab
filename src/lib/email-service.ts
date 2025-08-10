
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWorkshopPlan(
  email: string,
  name: string,
  planData: any,
  pdfUrl: string
) {
  const { data, error } = await resend.emails.send({
    from: 'TeraLab <noreply@teralab.io>',
    to: [email],
    subject: 'خطة ورشة العمل الخاصة بك - Your Workshop Plan',
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h1>مرحباً ${name}</h1>
        <p>تم إنشاء خطة ورشة العمل الخاصة بك بنجاح!</p>
        <a href="${pdfUrl}" style="background: #1e40af; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px;">
          تحميل الخطة الكاملة
        </a>
      </div>
    `,
  });

  if (error) {
    throw new Error(`Email sending failed: ${error.message}`);
  }

  return data;
}