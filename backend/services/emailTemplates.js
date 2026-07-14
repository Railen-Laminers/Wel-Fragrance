// Email templates for different notification types

const getBaseStyle = () => `
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; border-radius: 8px 8px 0 0; text-align: center; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; text-align: center; }
    .button { display: inline-block; padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 4px; margin-top: 15px; }
    .details { background: white; padding: 15px; border-left: 4px solid #667eea; margin: 15px 0; }
    .label { font-weight: bold; color: #667eea; }
    hr { border: none; border-top: 1px solid #ddd; margin: 15px 0; }
  </style>
`;

// Inquiry - Confirmation email to sender
const inquiryConfirmationTemplate = (firstName, lastName, inquiryId) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      ${getBaseStyle()}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Inquiry Received</h1>
        </div>
        <div class="content">
          <p>Dear <strong>${firstName} ${lastName}</strong>,</p>
          
          <p>Thank you for submitting your inquiry to Wel Fragrance. We have received your message and will review it shortly.</p>
          
          <div class="details">
            <p><span class="label">Inquiry ID:</span> ${inquiryId}</p>
            <p>Our team will respond to your inquiry within 24-48 hours.</p>
          </div>
          
          <p>If you have any additional questions in the meantime, feel free to reach out to us.</p>
          
          <p>Best regards,<br><strong>The Wel Fragrance Team</strong></p>
          
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Wel Fragrance. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return htmlContent;
};

// Inquiry - Admin notification
const inquiryAdminNotificationTemplate = (firstName, lastName, email, facebookLink, message, inquiryId) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      ${getBaseStyle()}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Inquiry Submitted</h1>
        </div>
        <div class="content">
          <p>A new inquiry has been submitted and is awaiting your review.</p>
          
          <div class="details">
            <p><span class="label">Name:</span> ${firstName} ${lastName}</p>
            <p><span class="label">Email:</span> <a href="mailto:${email}">${email}</a></p>
            ${facebookLink ? `<p><span class="label">Facebook:</span> <a href="${facebookLink}" target="_blank">${facebookLink}</a></p>` : ""}
            <p><span class="label">Inquiry ID:</span> ${inquiryId}</p>
          </div>
          
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, "<br>")}</p>
          
          <p>
            <a href="${process.env.ADMIN_DASHBOARD_URL || "http://localhost:3000"}/admin/inquiries/${inquiryId}" class="button">Review in Dashboard</a>
          </p>
          
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Wel Fragrance. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return htmlContent;
};

// Testimonial - Confirmation email to sender
const testimonialConfirmationTemplate = (firstName, lastName, testimonialId) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      ${getBaseStyle()}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Testimonial Received</h1>
        </div>
        <div class="content">
          <p>Dear <strong>${firstName} ${lastName}</strong>,</p>
          
          <p>Thank you for sharing your testimonial with Wel Fragrance! We truly appreciate you taking the time to share your experience.</p>
          
          <div class="details">
            <p><span class="label">Testimonial ID:</span> ${testimonialId}</p>
            <p>Your testimonial is now under review by our team. Once approved, it will be featured on our website and help other customers discover our products.</p>
          </div>
          
          <p>We'll notify you once your testimonial has been reviewed. Thank you for being part of our community!</p>
          
          <p>Best regards,<br><strong>The Wel Fragrance Team</strong></p>
          
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Wel Fragrance. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return htmlContent;
};

// Testimonial - Admin notification
const testimonialAdminNotificationTemplate = (firstName, lastName, email, rating, message, testimonialId) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      ${getBaseStyle()}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Testimonial Awaiting Review</h1>
        </div>
        <div class="content">
          <p>A new testimonial has been submitted and is awaiting your approval.</p>
          
          <div class="details">
            <p><span class="label">Name:</span> ${firstName} ${lastName}</p>
            <p><span class="label">Email:</span> <a href="mailto:${email}">${email}</a></p>
            <p><span class="label">Rating:</span> ${"⭐".repeat(rating)} (${rating}/5)</p>
            <p><span class="label">Testimonial ID:</span> ${testimonialId}</p>
          </div>
          
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, "<br>")}</p>
          
          <p>
            <a href="${process.env.ADMIN_DASHBOARD_URL || "http://localhost:3000"}/admin/testimonials/${testimonialId}" class="button">Review in Dashboard</a>
          </p>
          
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Wel Fragrance. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return htmlContent;
};

// Testimonial - Status update notification to sender
const testimonialStatusUpdateTemplate = (firstName, lastName, status) => {
  const statusMessages = {
    Approved: {
      title: "Your Testimonial Has Been Approved! 🎉",
      message: "Congratulations! Your testimonial has been approved and will now be featured on our website. Thank you for helping other customers discover Wel Fragrance!",
      color: "#28a745",
    },
    Rejected: {
      title: "Testimonial Review Update",
      message: "Thank you for your testimonial submission. We appreciate your feedback, but we are unable to feature it at this time. We appreciate your understanding!",
      color: "#dc3545",
    },
    Pending: {
      title: "Testimonial Received",
      message: "Your testimonial is still under review. We'll notify you once a decision has been made.",
      color: "#ffc107",
    },
  };

  const statusInfo = statusMessages[status] || statusMessages.Pending;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .status-badge { display: inline-block; background: ${statusInfo.color}; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; margin: 15px 0; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${statusInfo.title}</h1>
        </div>
        <div class="content">
          <p>Dear <strong>${firstName} ${lastName}</strong>,</p>
          
          <div class="status-badge">${status}</div>
          
          <p>${statusInfo.message}</p>
          
          <p>Thank you for being part of the Wel Fragrance community!</p>
          
          <p>Best regards,<br><strong>The Wel Fragrance Team</strong></p>
          
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Wel Fragrance. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return htmlContent;
};

module.exports = {
  inquiryConfirmationTemplate,
  inquiryAdminNotificationTemplate,
  testimonialConfirmationTemplate,
  testimonialAdminNotificationTemplate,
  testimonialStatusUpdateTemplate,
};
