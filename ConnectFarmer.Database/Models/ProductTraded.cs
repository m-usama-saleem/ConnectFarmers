using System;
using System.Collections.Generic;

#nullable disable

namespace ConnectFarmer.Database.Models
{
    public partial class ProductTraded
    {
        public int SysSerial { get; set; }
        public int BuyerId { get; set; }
        public int BidId { get; set; }
        public int ProductId { get; set; }
    }
}
