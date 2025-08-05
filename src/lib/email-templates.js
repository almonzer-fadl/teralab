export const EMAIL_TEMPLATES = {
    planGenerated: {
      subject: 'خطة ورشة العمل الخاصة بك جاهزة - Your Workshop Plan is Ready',
      html: (data) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 30px; text-align: center;">
            <h1>TeraLab</h1>
            <h2>خطة ورشة العمل الخاصة بك جاهزة</h2>
            <h3>Your Workshop Plan is Ready</h3>
          </div>
          
          <div style="padding: 30px;">
            <p>عزيزي ${data.customerName},</p>
            <p>Dear ${data.customerName},</p>
            
            <p>تم إنشاء خطة شاملة لورشة العمل الخاصة بك بنجاح!</p>
            <p>Your comprehensive workshop plan has been successfully generated!</p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>تفاصيل الخطة - Plan Details:</h3>
              <ul>
                <li><strong>نوع الورشة:</strong> ${data.businessType}</li>
                <li><strong>الموقع:</strong> ${data.location}</li>
                <li><strong>الميزانية:</strong> ${data.budget}</li>
                <li><strong>التكلفة المقدرة:</strong> ${data.estimatedCost} ريال</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.pdfUrl}" style="background: #1e40af; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                تحميل الخطة الكاملة - Download Full Plan
              </a>
            </div>
            
            <p>للاستفسارات أو لبدء التنفيذ، لا تتردد في التواصل معنا.</p>
            <p>For inquiries or to start implementation, don't hesitate to contact us.</p>
          </div>
          
          <div style="background: #f1f5f9; padding: 20px; text-align: center; color: #64748b;">
            <p>TeraLab - خبراؤك في بناء وتطوير ورش السيارات</p>
            <p>Your Workshop Building & Development Experts</p>
            <p>📧 info@teralab.io | 📱 +966123456789</p>
          </div>
        </div>
      `
    }
  };