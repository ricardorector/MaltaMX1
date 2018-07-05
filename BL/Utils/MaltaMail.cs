namespace BL.Utils
{
    using System;
    using System.IO;
    using System.Net.Mail;

    public class MaltaMail
    {
        private string To;

        public string From;

        private string Subject;

        private string Body;

        private string User;

        private string Password;

        private string Host;

        private int Port;

        public string BCC { get; set; }

        public string CC { get; set; }

        public string Message { get; set; }

        public bool IsCorrect { get; set; }

        public MemoryStream Attachment { get; set; }

        public string AttachmentName { get; set; }

        public string AttachmentMediaType { get; set; }

        public MaltaMail(string To, string From, string Subject, string Body, string User, string Password, string Host, int Port)
        {
            this.To = To;
            this.From = From;
            this.Subject = Subject;
            this.Body = Body;
            this.User = User;
            this.Password = Password;
            this.Host = Host;
            this.Port = Port;
        }

        public void Send()
        {
            try
            {
                System.Net.Mail.MailMessage mmsg = new System.Net.Mail.MailMessage();

                mmsg.To.Add(this.To);
                mmsg.Subject = this.Subject;
                mmsg.SubjectEncoding = System.Text.Encoding.UTF8;

                if (!string.IsNullOrEmpty(this.CC))
                    mmsg.CC.Add(this.CC);

                if (!string.IsNullOrEmpty(this.BCC))
                    mmsg.Bcc.Add(this.BCC);

                mmsg.Body = this.Body;
                mmsg.BodyEncoding = System.Text.Encoding.UTF8;
                mmsg.IsBodyHtml = true;

                mmsg.From = new System.Net.Mail.MailAddress(this.From);

                if (this.Attachment != null && !string.IsNullOrEmpty(this.AttachmentName) && !string.IsNullOrEmpty(this.AttachmentMediaType))
                {
                    mmsg.Attachments.Add(new Attachment(this.Attachment, this.AttachmentName, this.AttachmentMediaType));
                }

                System.Net.Mail.SmtpClient cliente = new System.Net.Mail.SmtpClient();
                cliente.Credentials = new System.Net.NetworkCredential(this.User, this.Password);

                cliente.Port = this.Port;
                cliente.Host = this.Host;

                cliente.Send(mmsg);
            }
            catch (System.Net.Mail.SmtpException ex)
            {
                this.Message = ex.Message;
                this.IsCorrect = false;
            }
            catch (Exception ex)
            {
                this.Message = ex.Message;
                this.IsCorrect = false;
            }
        }
    }
}
