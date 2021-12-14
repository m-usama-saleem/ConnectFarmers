using ConnectFarmers.ViewModels.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConnectFarmers.Services.Products
{
    public interface IProductService
    {
        Task<int> CreateProduct(ProductViewModel model);
        Task<List<ProductViewModel>> GetProductList();
        Task<List<ProductViewModel>> GetProductListFilter(string value);
        Task<int> PlaceBid(PlaceBidViewModel model);
        Task<List<ProductViewModel>> GetSoldProductList(int userId);
        Task<List<PlaceBidViewModel>> GetProductHistory(int productId);
        Task<List<ProductViewModel>> GetBoughtProductList(int userId);
        Task<List<ProductViewModel>> GetPostBids(int userId);
        Task<List<ProductViewModel>> GetActiveBids(int userId);
        Task<List<ProductViewModel>> GetExpireBids(int userId);

        Task<int> GetProductListCount();
        Task<int> GetSoldProductListCount(int userId);
        Task<int> GetBoughtProductListCount(int userId);
        Task<int> GetPostBidsCount(int userId);
        Task<int> GetActiveBidsCount(int userId);
        Task<int> GetExpireBidsCount(int userId);
        Task<int> CheckSoldBids();
        Task<int> CheckExpireBids();

    }
}
