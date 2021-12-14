using ConnectFarmers.Services.Products;
using ConnectFarmers.ViewModels.Products;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace ConnectFarmers.Controllers.Products
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IProductService _productService;
        private readonly ILogger _logger;

        public ProductController(IProductService userService, ILogger<ProductController> logger)
        {
            _productService = userService;
            _logger = logger;
        }

        [HttpPost, Route("createproduct")]
        public async Task<IActionResult> CreateProduct([FromBody] ProductViewModel model)
        {
            _logger.LogInformation("Register() Called");

            if (model == null || !ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                var register = await _productService.CreateProduct(model);
                if (register != 0)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
        }
        [HttpPost, Route("placebid")]
        public async Task<IActionResult> PlaceBid([FromBody] PlaceBidViewModel model)
        {
            _logger.LogInformation("Register() Called");

            if (model == null || !ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                var register = await _productService.PlaceBid(model);
                if (register != 0)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
        }
        [HttpPost, Route("upload")]
        public async Task<IActionResult> Upload(IFormCollection model)
        {
            if(model.Files.Count > 0)
            {
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                var fileNames = "";
                foreach (var file in model.Files)
                {
                    if(file.Length > 0)
                    {
                        var g = Guid.NewGuid();
                        var realName = String.Format("{0}_{1}",g,file.FileName);
                        
                        var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                        var fullPath = Path.Combine(pathToSave, fileName);
                        //var dbPath = Path.Combine(folderName, fileName);
                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }
                        fileNames += fileName + ","; 
                    }
                }
                return Ok( new {Content = fileNames });
            }
            return BadRequest();
        }

        [HttpGet, Route("getproductlist")]
        public async Task<IActionResult> GetProductList()
        {
            _logger.LogInformation("Profile() Called");
            var result = await _productService.GetProductList();
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet, Route("getproductlistfilter/{name?}")]
        public async Task<IActionResult> GetProductListFilter(string name)
        {
            _logger.LogInformation("Profile() Called");
            var result = await _productService.GetProductListFilter(name);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }
        
        [HttpGet, Route("getproducthistory/{id?}")]
        public async Task<IActionResult> GetProductHistory(int id)
        {
            _logger.LogInformation("Profile() Called");
            var result = await _productService.GetProductHistory(id);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet, Route("getsoldproductlist/{id?}")]
        public async Task<IActionResult> GetSoldProductList(int id)
        {
            _logger.LogInformation("Profile() Called");
            var result = await _productService.GetSoldProductList(id);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet, Route("getboughtproductlist/{id?}")]
        public async Task<IActionResult> GetBoughtProductList(int id)
        {
            _logger.LogInformation("Profile() Called");
            var result = await _productService.GetBoughtProductList(id);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet, Route("getpostbids/{id?}")]
        public async Task<IActionResult> GetPostBids(int id)
        {
            _logger.LogInformation("Profile() Called");
            var result = await _productService.GetPostBids(id);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet, Route("getactivebids/{id?}")]
        public async Task<IActionResult> GetActiveBids(int id)
        {
            _logger.LogInformation("Profile() Called");
            var result = await _productService.GetActiveBids(id);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet, Route("getexpirebids/{id?}")]
        public async Task<IActionResult> GetExpireBids(int id)
        {
            _logger.LogInformation("Profile() Called");
            var result = await _productService.GetExpireBids(id);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }


        #region Counts

        [HttpGet, Route("getproductlistcount")]
        public async Task<IActionResult> GetProductListCount()
        {
            _logger.LogInformation("Profile() Called");
            var result = await _productService.GetProductListCount();
            if (result >= 0)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet, Route("getsoldproductlistcount/{id?}")]
        public async Task<IActionResult> GetSoldProductListCount(int id)
        {
            _logger.LogInformation("Profile() Called");
            var result = await _productService.GetSoldProductListCount(id);
            if (result >= 0)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet, Route("getboughtproductlistcount/{id?}")]
        public async Task<IActionResult> GetBoughtProductListCount(int id)
        {
            _logger.LogInformation("Profile() Called");
            var result = await _productService.GetBoughtProductListCount(id);
            if (result >= 0)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet, Route("getpostbidscount/{id?}")]
        public async Task<IActionResult> GetPostBidsCount(int id)
        {
            _logger.LogInformation("Profile() Called");
            var result = await _productService.GetPostBidsCount(id);
            if (result >= 0)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet, Route("getactivebidscount/{id?}")]
        public async Task<IActionResult> GetActiveBidsCount(int id)
        {
            _logger.LogInformation("Profile() Called");
            var result = await _productService.GetActiveBidsCount(id);
            if (result >= 0)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet, Route("getexpirebidscount/{id?}")]
        public async Task<IActionResult> GetExpireBidsCount(int id)
        {
            _logger.LogInformation("Profile() Called");
            var result = await _productService.GetExpireBidsCount(id);
            if (result >= 0)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet, Route("checksoldbids")]
        public async Task<IActionResult> CheckSoldBids()
        {
            _logger.LogInformation("CheckSoldBids() Called");
            var result = await _productService.CheckSoldBids();
            if (result >= 0)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet, Route("checkexpirebids")]
        public async Task<IActionResult> CheckExpireBids()
        {
            _logger.LogInformation("CheckExpireBids() Called");
            var result = await _productService.CheckExpireBids();
            if (result >= 0)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }

        #endregion
    }
}
