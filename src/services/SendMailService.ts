import fs from 'fs';
import nodemailer, { Transporter } from 'nodemailer';
import handleBars from 'handlebars';

class SendMailService {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth: {
          user: account.user, 
          pass: account.pass, 
        }
      });

      this.client = transporter;
    });
  }

  async execute(to: string, subject: string, variables: object, path: string) {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');
    
    const mailTemplateParse = handleBars.compile(templateFileContent);

    const mailBody = mailTemplateParse(variables);

    const message = await this.client.sendMail({
      to,
      subject,
      html: mailBody,
      from: 'NPS <noreply@nps.com.br>'
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default new SendMailService();