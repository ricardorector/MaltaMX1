namespace BL
{
    using BL.Utils;
    using DAL;
    using DTO;
    using OfficeOpenXml;
    using System;
    using System.Collections.Generic;
    using System.IO;

    public class QuotationBl : BaseBl
    {
        #region Methods

        #region PUblic

        public List<Product> GetProducts(string Token)
        {
            var products = new List<Product>();
            var dal = new QuotationDal();

            this.IsCorrect = false;
            this.Message = "Productos obtenidos exitosamente";

            try
            {
                var token = this.GetToken(Token);

                this.Message = token.Message;
                this.IsCorrect = token.IsCorrect;

                if (this.IsCorrect)
                {
                    products = dal.GetProducts(token);

                    foreach (var product in products)
                    {
                        if (product.HasPromotion)
                        {
                            product.Products = dal.GetProductsPromotion(product.Id);
                        }
                    }

                    this.IsCorrect = true;
                }
            }
            catch (Exception ex)
            {
                this.Message = ex.Message;
            }

            return products;
        }

        public int SaveQ(string Token, int IdTruck, int IdDayOfWeek, List<RequestProducts> Products)
        {
            this.IsCorrect = false;
            this.Message = "Cotización guardada exitosamente";

            try
            {
                var token = this.GetToken(Token);

                this.Message = token.Message;
                this.IsCorrect = token.IsCorrect;

                if (this.IsCorrect)
                {
                    var quotation = new QuotationDal();
                    int idQ = quotation.SaveQ(token, IdTruck, IdDayOfWeek);

                    foreach (var product in Products)
                    {
                        quotation.SaveDetailQ(token, idQ, product);
                    }

                    this.IsCorrect = true;

                    return idQ;
                }
                else
                    return 0;
            }
            catch (Exception ex)
            {
                this.Message = ex.Message;
                return 0;
            }
        }

        public void SendQ(string Token, UserData Data)
        {
            var cot = new QuotationDal();

            this.IsCorrect = false;
            this.Message = string.Empty;

            try
            {
                var token = this.GetToken(Token);

                this.Message = token.Message;
                this.IsCorrect = token.IsCorrect;

                if (this.IsCorrect)
                {
                    var idQ = cot.GetLastQ(token);

                    var head = cot.GetHeaderQ(idQ);

                    head.Email = Data.Email;
                    head.Name = Data.Name;
                    head.Phone = Data.Phone;
                    head.CellPhone = Data.CellPhone;

                    var body = cot.GetBodyQ(idQ);
                    var mails = cot.GetPlantMail(head.IdPlant);
                    var excelFile = this.GetExcel(idQ, head, body);

                    this.SendMailQ(head, mails, excelFile);

                    cot.UpdateLastQ(idQ, Data);

                    this.Message = "Su cotización fue enviada a su correo electrónico";
                    this.IsCorrect = true;
                }
            }
            catch (Exception ex)
            {
                this.IsCorrect = false;
                this.Message = ex.Message;
            }
        }

        public List<Truck> GetTruck(string Token)
        {
            var list = new List<Truck>();

            this.IsCorrect = false;
            this.Message = "Camiones obtenidos exitosamente";

            try
            {
                var token = this.GetToken(Token);

                this.Message = token.Message;
                this.IsCorrect = token.IsCorrect;

                if (this.IsCorrect)
                {
                    list = new QuotationDal().GetTruck();
                    this.IsCorrect = true;
                }
            }
            catch (Exception ex)
            {
                this.Message = ex.Message;
            }

            return list;
        }

        #endregion

        #region Private

        private MemoryStream GetExcel(int Id, HeaderQ Header, List<Product> Body)
        {
            var path = System.Web.HttpContext.Current.Server.MapPath("~/Content/template/" + this.AppSet("Excel-Template"));
            var fileinfo = new FileInfo(path);

            var newFile = new FileInfo(System.Web.HttpContext.Current.Server.MapPath("~/Content/template/otro.xlsx"));

            ExcelPackage package = new ExcelPackage(fileinfo, true);

            ExcelWorksheet ws = package.Workbook.Worksheets[1];

            ws.Cells[2, 1].Value = "Cotización: " + Id.ToString().PadLeft(10, '0');

            ws.Cells[2, 3].Style.WrapText = true;
            ws.Cells[2, 3].Value = Header.AddressPlant + Environment.NewLine +
                                   "Teléfono: " + Header.PhonePlant +
                                   (string.IsNullOrEmpty(Header.CellPhonePlant) ? string.Empty : "     Celular: " + Header.CellPhonePlant);

            ws.Cells[3, 1].Value = Header.Name;

            for (int i = 0; i < Body.Count; i++)
            {
                var record = Body[i];
                var row = i + 5;

                ws.Cells[row, 1].Value = record.IdProduct;
                ws.Cells[row, 2].Value = record.Name;
                ws.Cells[row, 3].Value = record.Kg;
                ws.Cells[row, 4].Value = record.Min;
                ws.Cells[row, 5].Value = record.Price;
                ws.Cells[row, 6].Value = record.Quantity;
                ws.Cells[row, 7].Value = record.TotalKg;
                ws.Cells[row, 8].Value = record.Total;
            }

            return new MemoryStream(package.GetAsByteArray());
        }

        private void SendMailQ(HeaderQ Header, List<PlantMail> Mails, MemoryStream ExcelFile)
        {
            var to = Header.Email;
            var subject = this.AppSet("Mail-Subject");

            var bcc = this.GetMails(Mails, "BCC");
            var cc = this.GetMails(Mails, "CC");

            var body = this.GetMailTemplate("Mail-Template");

            SendMail(to, subject, body, bcc, cc, ExcelFile, "Cotización.xlsx", "application/vnd.ms-excel");
        }

        private string GetMails(List<PlantMail> Mails, string Type)
        {
            var mails = string.Empty;

            foreach (var mail in Mails)
            {
                if (mail.Type.Equals(Type, StringComparison.InvariantCultureIgnoreCase))
                    mails += mail.Email + ",";
            }

            mails = mails.TrimEnd(',');

            return mails;
        }

        #endregion

        #endregion
    }
}