using System;
using System.Collections.Generic;

#nullable disable

namespace ConnectFarmer.Database.Models
{
    public partial class Product
    {
        public int SysSerial { get; set; }
        public string Name { get; set; }
        public string Area { get; set; }
        public decimal? Weight { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public int? Zipcode { get; set; }
        public string Images { get; set; }
        public DateTime? Expired { get; set; }
        public bool? IsExpired { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsDeleted { get; set; }
        public string Category { get; set; }
        public string Type { get; set; }
        public string Remarks { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public bool? IsSold { get; set; }
        public decimal? MinBidAmount { get; set; }
        public string Description { get; set; }
    }
}
