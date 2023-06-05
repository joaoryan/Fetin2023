import { SentMessageInfo } from 'nodemailer'
import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer'
import { sendEmail } from '../presentation/protocols/sendEmail'

const params = {
  type: 'smtp',
  host: 'smtp.office365.com',
  secure: false,
  port: 587,
  tls: {
    rejectUnauthorized: true
  },
  auth: {
    user: 'suporte@praticabr.com',
    pass: 'Def6qf2xn'
  }
}

export class MailService implements sendEmail {
  async sendMail (mailOptions: Mail.Options): Promise<SentMessageInfo> {
    const transporter = nodemailer.createTransport(params)
    return await transporter.sendMail(mailOptions)
  }
}
