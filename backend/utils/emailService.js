import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Send contact form email
export const sendContactEmail = async (contact) => {
  try {
    // Check if email service is configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email service not configured, skipping email send');
      return;
    }

    const transporter = createTransporter();

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission: ${contact.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Subject:</strong> ${contact.subject}</p>
            <p><strong>Message:</strong></p>
            <p style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
              ${contact.message.replace(/\n/g, '<br>')}
            </p>
            <p><strong>Submitted:</strong> ${new Date(contact.createdAt).toLocaleString()}</p>
            <p><strong>Source:</strong> ${contact.source}</p>
          </div>
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin/contacts" 
               style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
              View in Admin Panel
            </a>
          </div>
        </div>
      `
    };

    // Email to user (confirmation)
    const userMailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: contact.email,
      subject: `Thank you for contacting us - ${contact.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for contacting us!</h2>
          <p>Dear ${contact.name},</p>
          <p>We have received your message and will get back to you as soon as possible.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Your Message Details:</h3>
            <p><strong>Subject:</strong> ${contact.subject}</p>
            <p><strong>Message:</strong></p>
            <p style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #28a745;">
              ${contact.message.replace(/\n/g, '<br>')}
            </p>
            <p><strong>Submitted:</strong> ${new Date(contact.createdAt).toLocaleString()}</p>
          </div>
          
          <p>We typically respond within 24-48 hours during business days.</p>
          
          <div style="background-color: #e9ecef; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #495057;">Our Contact Information:</h4>
            <p><strong>Phone:</strong> +91 9943206339</p>
            <p><strong>Email:</strong> hello@srideviitpark.com</p>
            <p><strong>Address:</strong> Sri Devi Software Solutions, Vallioor, Tirunelveli - 627117, India</p>
            <p><strong>Working Hours:</strong> Mon - Fri: 9:00 AM - 6:00 PM</p>
          </div>
          
          <p>Best regards,<br>The Sri Devi Software Solutions Team</p>
        </div>
      `
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    console.log('✅ Contact emails sent successfully');

  } catch (error) {
    console.error('❌ Error sending contact emails:', error);
    throw error;
  }
};



// Send notification email to saro994320@gmail.com
export const sendNotificationToSaro = async (contact) => {
  try {
    // Check if email service is configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email service not configured, skipping notification email to saro');
      return;
    }

    const transporter = createTransporter();

    const notificationMailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: 'saro994320@gmail.com',
      subject: `New Contact Form Submission - Notification`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission - Notification</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Subject:</strong> ${contact.subject}</p>
            <p><strong>Message:</strong></p>
            <p style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
              ${contact.message.replace(/\n/g, '<br>')}
            </p>
            <p><strong>Submitted:</strong> ${new Date(contact.createdAt).toLocaleString()}</p>
            <p><strong>Source:</strong> ${contact.source}</p>
            <p><strong>IP Address:</strong> ${contact.ipAddress || 'N/A'}</p>
          </div>
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin/contacts" 
               style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
              View in Admin Panel
            </a>
          </div>
        </div>
      `
    };

    await transporter.sendMail(notificationMailOptions);
    
    console.log('✅ Notification email sent to saro994320@gmail.com');
  } catch (error) {
    console.error('❌ Error sending notification email to saro:', error);
    throw error;
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (user, resetToken) => {
  try {
    // Check if email service is configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email service not configured, skipping password reset email');
      return;
    }

    const transporter = createTransporter();

    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>Dear ${user.name},</p>
          <p>You requested a password reset. Please click the button below to reset your password:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
              Reset Password
            </a>
          </div>
          
          <p>If you did not request this password reset, please ignore this email and your password will remain unchanged.</p>
          
          <p>This link will expire in 1 hour for security reasons.</p>
          
          <p>Best regards,<br>The Sri Devi Software Solutions Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    
    console.log(`✅ Password reset email sent to ${user.email}`);
  } catch (error) {
    console.error('❌ Error sending password reset email:', error);
    throw error;
  }
};
