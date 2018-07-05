using System.Collections.Generic;
namespace DTO
{
    public class Product
    {
        public int Id { get; set; }

        public int IdPlant { get; set; }

        public int IdProduct { get; set; }

        public int? IdFather { get; set; }

        public string Image { get; set; }

        public string Name { get; set; }

        public int IdMeasure { get; set; }

        public string Measure { get; set; }

        public float Price { get; set; }

        public float Min { get; set; }

        public float Kg { get; set; }

        public float Quantity { get; set; }

        public float TotalKg { get; set; }

        public float Total { get; set; }

        public int? ValuePromotion { get; set; }

        public int? RewardPromotion { get; set; }

        public bool HasPromotion { get; set; }

        public List<Product> Products { get; set; }
    }
}