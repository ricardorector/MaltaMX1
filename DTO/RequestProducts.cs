namespace DTO
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class RequestProducts
    {
        public int Id { get; set; }

        public int IdMeasure { get; set; }

        public double Amount { get; set; }
    }
}