using ConnectFarmer.Database.Models;
using ConnectFarmers.ViewModels.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConnectFarmers.Services.Products
{
    public class ProductService : IProductService
    {
        private readonly ILogger _logger;
        private readonly IConfiguration _configuration;
        private readonly ConnectFarmersContext _db;

        public ProductService(ConnectFarmersContext dBContext, IConfiguration configuration, ILogger<ProductService> logger)
        {
            _configuration = configuration;
            _db = dBContext;
            _logger = logger;
        }

        public async Task<int> CreateProduct(ProductViewModel model)
        {
            var result = 0;
            try
            {
                var product = new Product
                {
                    Area = model.Area,
                    Category = model.Category,
                    City = model.City,
                    CreatedBy = model.CreatedBy,
                    CreatedDate = DateTime.Now,
                    District = model.District,
                    Expired = model.Expired,
                    Images = model.Images,
                    IsDeleted = model.IsDeleted,
                    IsExpired = model.IsExpired,
                    Latitude = model.Latitude,
                    Longitude = model.Longitude,
                    Name = model.Name,
                    Remarks = model.Remarks,
                    SysSerial = model.SysSerial,
                    Type = model.Type,
                    Weight = model.Weight,
                    Zipcode = model.Zipcode,
                    IsSold = model.IsSold,
                    MinBidAmount = model.MinBidAmount,
                };
                await _db.Products.AddAsync(product);
                result = await _db.SaveChangesAsync();
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return 0;
            }
        }

        public async Task<int> PlaceBid(PlaceBidViewModel model)
        {
            int result = 0;

            try
            {
                var rec = _db.Bids.FirstOrDefault(x => x.UserId == model.UserId && x.ProductId == model.ProductId);
                if (rec != null)
                {
                    rec.BidDate = DateTime.Now;
                    rec.Amount = model.Amount;
                    _db.Bids.Update(rec);
                }
                else
                {
                    _db.Bids.Add(new Bid
                    {
                        UserId = model.UserId,
                        ProductId = model.ProductId,
                        Amount = model.Amount,
                        BidDate = DateTime.Now,
                    });
                }
                result = await _db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }

            return result;
        }

        public async Task<List<ProductViewModel>> GetProductList()
        {
            List<ProductViewModel> result = new List<ProductViewModel>();

            try
            {
                var products = await (from x in _db.Products
                                      where x.IsExpired == false && x.IsSold == false
                                      select new ProductViewModel(x)
                                      ).ToListAsync();
                //var products = await _db.Products.ToListAsync();
                if (products != null && products.Count > 0)
                {
                    products.ForEach(x =>
                    {
                        var maxBid = _db.Bids.Where(y => y.ProductId == x.SysSerial).OrderByDescending(y => y.Amount).FirstOrDefault();
                        x.CurrentBid = maxBid!= null ? Convert.ToDecimal(maxBid.Amount) : 0;
                    });
                    result = products;
                    //products.ForEach(product => result.Add(new ProductViewModel(product)));
                    return result;
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }

            return result;
        }

        public async Task<List<ProductViewModel>> GetProductListFilter(string value)
        {
            List<ProductViewModel> result = new List<ProductViewModel>();

            try
            {
                var products = await (from x in _db.Products
                                      where x.Category.ToLower().Contains(value.ToLower())
                                      select new ProductViewModel(x)
                                      ).ToListAsync();
                //var products = await _db.Products.ToListAsync();
                if (products != null && products.Count > 0)
                {
                    result = products;
                    //products.ForEach(product => result.Add(new ProductViewModel(product)));
                    return result;
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }

            return result;
        }
        public async Task<int> GetProductListCount()
        {
            List<ProductViewModel> result = new List<ProductViewModel>();

            try
            {
                var products = await (from x in _db.Products
                                      join y in _db.Bids on x.SysSerial equals y.ProductId into allProducts
                                      from p in allProducts.DefaultIfEmpty()
                                          //where x.IsExpired == false && p.IsSold == false && p.IsExpired == false
                                      select new ProductViewModel(x)
                                      ).ToListAsync();
                result = products;
                return result.Count();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }

            return result.Count();
        }
        public async Task<List<ProductViewModel>> GetSoldProductList(int userId)
        {
            List<ProductViewModel> result = new List<ProductViewModel>();

            try
            {
                var products = await _db.Products.Where(x => x.IsSold == true && x.IsExpired == true && x.CreatedBy == userId).ToListAsync();
                if (products != null && products.Count > 0)
                {
                    products.ForEach(product => result.Add(new ProductViewModel(product)));
                    return result;
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }

            return result;
        }
        public async Task<int> GetSoldProductListCount(int userId)
        {
            List<ProductViewModel> result = new List<ProductViewModel>();

            try
            {
                var products = await _db.Products.Where(x => x.IsSold == true && x.IsExpired == true && x.CreatedBy == userId).ToListAsync();
                return products.Count();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }

            return result.Count();
        }
        public async Task<List<PlaceBidViewModel>> GetProductHistory(int productId)
        {
            List<PlaceBidViewModel> result = new List<PlaceBidViewModel>();

            try
            {
                var products = await (from x in _db.Bids
                                      join y in _db.Users on x.UserId equals y.SysSerial
                                      join z in _db.UserProfiles on x.UserId equals z.UserId
                                      where x.ProductId == productId
                                      select new PlaceBidViewModel
                                      {
                                          Amount = Convert.ToDecimal(x.Amount),
                                          ProductId = Convert.ToInt32(x.ProductId),
                                          CreatedDate = Convert.ToDateTime(x.BidDate),
                                          UserId = Convert.ToInt32(x.UserId),
                                          UserName = (!string.IsNullOrEmpty(z.FirstName) ? z.FirstName : "") + " " + (!string.IsNullOrEmpty(z.LastName) ? z.LastName : "")
                                      }).ToListAsync();
                if (products != null && products.Count > 0)
                {
                    return products;
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }

            return result;
        }
        public async Task<List<ProductViewModel>> GetBoughtProductList(int userId)
        {
            List<ProductViewModel> result = new List<ProductViewModel>();

            try
            {
                var products = await (from x in _db.Products
                                      join y in _db.ProductTradeds on x.SysSerial equals y.ProductId
                                      where x.IsSold == true && y.BuyerId == userId
                                      select x).ToListAsync();
                if (products != null && products.Count > 0)
                {
                    products.ForEach(product => result.Add(new ProductViewModel(product)));
                    return result;
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }

            return result;
        }
        public async Task<int> GetBoughtProductListCount(int userId)
        {
            List<ProductViewModel> result = new List<ProductViewModel>();

            try
            {
                var products = await (from x in _db.Products
                                      join y in _db.ProductTradeds on x.SysSerial equals y.ProductId
                                      where x.IsSold == true && y.BuyerId == userId
                                      select x).ToListAsync();
                return products.Count();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }

            return result.Count();
        }
        public async Task<List<ProductViewModel>> GetPostBids(int userId)
        {
            List<ProductViewModel> result = new List<ProductViewModel>();

            try
            {
                var products = await (from x in _db.Products
                                      join y in _db.ProductTradeds on x.SysSerial equals y.ProductId
                                      where y.BuyerId == userId
                                      select x).ToListAsync();
                if (products != null && products.Count > 0)
                {

                    products.ForEach(product => result.Add(new ProductViewModel(product)));
                    return result;
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }

            return result;
        }
        public async Task<int> GetPostBidsCount(int userId)
        {
            List<ProductViewModel> result = new List<ProductViewModel>();

            try
            {
                var products = await (from x in _db.Products
                                      join y in _db.ProductTradeds on x.SysSerial equals y.ProductId
                                      where y.BuyerId == userId
                                      select x).ToListAsync();
                return products.Count();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }

            return result.Count();
        }
        public async Task<List<ProductViewModel>> GetActiveBids(int userId)
        {
            List<ProductViewModel> result = new List<ProductViewModel>();

            try
            {
                var products = await (from x in _db.Products
                                      join y in _db.Bids on x.SysSerial equals y.ProductId

                                      where y.UserId == userId && x.IsSold == false && x.IsExpired == false
                                      select x).ToListAsync();
                if (products != null && products.Count > 0)
                {

                    products.ForEach(product => result.Add(new ProductViewModel(product)));
                    return result;
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }

            return result;
        }
        public async Task<int> GetActiveBidsCount(int userId)
        {
            List<ProductViewModel> result = new List<ProductViewModel>();

            try
            {
                var products = await (from x in _db.Products
                                      join y in _db.Bids on x.SysSerial equals y.ProductId

                                      where y.UserId == userId && x.IsSold == false && x.IsExpired == false
                                      select x).ToListAsync();
                return products.Count();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }

            return result.Count();
        }
        public async Task<List<ProductViewModel>> GetExpireBids(int userId)
        {
            List<ProductViewModel> result = new List<ProductViewModel>();

            try
            {
                var products = await (from x in _db.Products
                                      join y in _db.Bids on x.SysSerial equals y.ProductId
                                      where y.UserId == userId && x.IsExpired == true
                                      select x).ToListAsync();
                if (products != null && products.Count > 0)
                {

                    products.ForEach(product => result.Add(new ProductViewModel(product)));
                    return result;
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }

            return result;
        }
        public async Task<int> GetExpireBidsCount(int userId)
        {
            List<ProductViewModel> result = new List<ProductViewModel>();

            try
            {
                var products = await (from x in _db.Products
                                      join y in _db.Bids on x.SysSerial equals y.ProductId
                                      where y.UserId == userId && x.IsExpired == true
                                      select x).ToListAsync();
                return products.Count();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }

            return result.Count();
        }
        public async Task<int> CheckSoldBids()
        {
            List<ProductViewModel> result = new List<ProductViewModel>();

            try
            {
                var products = await (from x in _db.Products
                                      where x.IsExpired == true && x.IsSold == false
                                      select x).ToListAsync();
                foreach (var product in products)
                {
                    product.IsSold = true;
                    _db.Products.Update(product);

                    var maxBid = _db.Bids.Where(x => x.ProductId == product.SysSerial).OrderByDescending(x => x.Amount).FirstOrDefault();
                    if (maxBid != null)
                    {
                        _db.ProductTradeds.Add(new ProductTraded
                        {
                            ProductId = product.SysSerial,
                            BidId = maxBid.SysSerial,
                            BuyerId = Convert.ToInt32(maxBid.UserId)
                        });
                    }
                }
                _db.SaveChanges();
                return products.Count();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }

            return result.Count();
        }

        public async Task<int> CheckExpireBids()
        {
            List<ProductViewModel> result = new List<ProductViewModel>();

            try
            {
                var products = await (from x in _db.Products
                                      where x.Expired < DateTime.Now && x.IsExpired == false
                                      select x).ToListAsync();

                foreach (var product in products)
                {
                    product.IsExpired = true;
                    _db.Products.Update(product);
                }
                _db.SaveChanges();
                return products.Count();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }

            return result.Count();
        }


    }
}
