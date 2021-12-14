using System;

namespace ConnectFarmers.ViewModels.Products
{
    public class PlaceBidViewModel
    {
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public DateTime CreatedDate { get; set; }
        public decimal Amount { get; set; }
        public string UserName { get; set; }
    }
}
