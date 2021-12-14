using System;
using System.Collections.Generic;

#nullable disable

namespace ConnectFarmer.Database.Models
{
    public partial class Bid
    {
        public int SysSerial { get; set; }
        public int? UserId { get; set; }
        public int? ProductId { get; set; }
        public decimal? Amount { get; set; }
        public DateTime? Time { get; set; }
        public bool? IsExpired { get; set; }
        public DateTime? BidDate { get; set; }
    }
}
