import Mail = require('nodemailer/lib/mailer');

export interface sendEmail {

  sendMail(mailOptions: Mail.Options): void
}
