using ConnectFarmer.Database.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace ConnectFarmers.ViewModels.Products
{
    public class ProductViewModel
    {
        public List<IFormFile> Image { get; set; }
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
        public bool? IsSold { get; set; }
        public string Category { get; set; }
        public string Type { get; set; }
        public string Remarks { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public decimal? MinBidAmount { get; set; }
        public string Description { get; set; }
        public decimal CurrentBid { get; set; }
        public ProductViewModel() { }
        public ProductViewModel(Product p)
        {
            SysSerial = p.SysSerial;
            Name = p.Name;
            Area = p.Area;
            Weight = p.Weight;
            City = p.City;
            District = p.District;
            Zipcode = p.Zipcode;
            Images = p.Images;
            Expired = p.Expired;
            IsExpired = p.IsExpired;
            CreatedBy = p.CreatedBy;
            CreatedDate = p.CreatedDate;
            IsDeleted = p.IsDeleted;
            IsSold = p.IsSold;
            Category = p.Category;  
            Type = p.Type;
            Remarks = p.Remarks;
            Latitude = p.Latitude;
            Longitude = p.Longitude;
            MinBidAmount = p.MinBidAmount;
            Description = p.Description;    
        }
    }
}
