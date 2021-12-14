using ConnectFarmers.Services.Users;
using ConnectFarmers.ViewModels.Users;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;

namespace ConnectFarmers.Controllers.Users
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        private readonly ILogger _logger;

        public UserController(IUserService userService, ILogger<UserController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        [HttpGet, Route("test")]
        [EnableCors("AllowOrigin")]
        public string Test()
        {
            return "OK";
        }

        [HttpPost, Route("refresh")]
        [EnableCors("AllowOrigin")]
        public ActionResult Refresh()
        {
            _logger.LogInformation("UserController.Refresh() Called");

            if (Request.Cookies["REFRESH_TOKEN"] != null && Request.Cookies["USER"] != null)
            {
                var value = Request.Cookies["REFRESH_TOKEN"];
                var isValidRefreshToken = _userService.ValidateRefreshToken(value);
                if (isValidRefreshToken)
                {
                    var user = JsonSerializer.Deserialize<UserViewModel>(Request.Cookies["USER"]);
                    var tokenString = _userService.GenerateToken(user);
                    var refreshTokenString = _userService.GenerateRefreshToken(user);
                    HttpContext.Response.Cookies.Append("REFRESH_TOKEN", refreshTokenString, new CookieOptions
                    {
                        Expires = DateTime.Now.AddMinutes(60),
                        HttpOnly = true,
                        Secure = true
                    });
                    HttpContext.Response.Cookies.Append("USER", JsonSerializer.Serialize<UserViewModel>(user), new CookieOptions
                    {
                        Expires = DateTime.Now.AddMinutes(60),
                        HttpOnly = true,
                        Secure = true
                    });
                    return Ok(new
                    {
                        Token = tokenString,
                        user
                    });
                }
                else
                {
                    throw new UnauthorizedAccessException();
                }
            }
            else
            {
                throw new UnauthorizedAccessException();
            }
        }

        [HttpPost, Route("login")]
        [EnableCors("AllowOrigin")]
        public async Task<ActionResult> Login([FromBody] LoginViewModel loginModel)
        {
            _logger.LogInformation($"UserController.Login(LoginId: {loginModel.LoginId}, Password: {loginModel.Password}) Called");

            if (loginModel == null)
            {
                return BadRequest("Invalid request");
            }
            var user = await _userService.ValidateUser(loginModel);
            if (user != null)
            {
                var tokenString = _userService.GenerateToken(user);
                var refreshTokenString = _userService.GenerateRefreshToken(user);
                HttpContext.Response.Cookies.Append("REFRESH_TOKEN", refreshTokenString, new CookieOptions
                {
                    Expires = DateTime.Now.AddMinutes(60),
                    HttpOnly = true,
                    Secure = true
                });
                HttpContext.Response.Cookies.Append("USER", JsonSerializer.Serialize<UserViewModel>(user), new CookieOptions
                {
                    Expires = DateTime.Now.AddMinutes(60),
                    HttpOnly = true,
                    Secure = true
                });
                return Ok(new
                {
                    Token = tokenString,
                    user
                });
            }
            else
            {
                throw new UnauthorizedAccessException("Username or Password incorrect");
            }
        }

        [HttpGet, Route("logout")]
        [EnableCors("AllowOrigin")]
        public ActionResult Logout()
        {
            _logger.LogInformation("UserController.Logout() Called");

            if (Request.Cookies["REFRESH_TOKEN"] != null && Request.Cookies["USER"] != null)
            {
                Response.Cookies.Delete("REFRESH_TOKEN");
                Response.Cookies.Delete("USER");
            }
            return Ok(new { IsLoggedOut = true });
        }

        [HttpPost, Route("register")]
        public async Task<IActionResult> Register([FromBody] UserViewModel userViewModel)
        {
            _logger.LogInformation("Register() Called");

            if (userViewModel == null || !ModelState.IsValid)
            {
                return BadRequest();
            }
            if (await _userService.IsUserExists(userViewModel.LoginId))
            {
                return Conflict();
            }
            else
            {
                var register = await _userService.Register(userViewModel);
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

        [HttpGet, Route("profile/{id?}")]
        public async Task<IActionResult> Profile(int id)
        {
            _logger.LogInformation("Profile() Called");
            if (id != 0)
            {
                var result = await _userService.GetProfileByLoginId(id);
                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return NotFound();
                }
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpPost, Route("profilewithloginid")]
        public async Task<IActionResult> ProfileWithLoginId(ProfileViewModel profile)
        {
            _logger.LogInformation("ProfileWithLoginId() Called");
            if (profile != null)
            {
                var result = await _userService.GetProfileByLoginId(profile.LoginId);
                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return NotFound();
                }
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost, Route("loginoauth")]
        public async Task<IActionResult> LoginOAuth([FromBody] OAuthUsersViewModel oAuthUsersViewModel)
        {
            _logger.LogInformation("LoginOAuth() Called");
            if (oAuthUsersViewModel == null || !ModelState.IsValid)
            {
                return BadRequest();
            }
            var userId = await _userService.ValidateOAuthser(oAuthUsersViewModel);
            if (userId != -1)
            {
                var user = await _userService.GetUserLoginId(oAuthUsersViewModel.LoginId);
                if(user != null)
                {
                    var tokenString = _userService.GenerateToken(user);
                    var refreshTokenString = _userService.GenerateRefreshToken(user);
                    HttpContext.Response.Cookies.Append("REFRESH_TOKEN", refreshTokenString, new CookieOptions
                    {
                        Expires = DateTime.Now.AddMinutes(60),
                        HttpOnly = true,
                        Secure = true
                    });
                    HttpContext.Response.Cookies.Append("USER", JsonSerializer.Serialize<UserViewModel>(user), new CookieOptions
                    {
                        Expires = DateTime.Now.AddMinutes(60),
                        HttpOnly = true,
                        Secure = true
                    });
                    return Ok(new
                    {
                        Token = tokenString,
                        user
                    });
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                var register = await _userService.RegisterOAuth(oAuthUsersViewModel);
                if (register != 0)
                {
                    var user = await _userService.GetUserLoginId(oAuthUsersViewModel.LoginId);
                    if (user != null)
                    {
                        var tokenString = _userService.GenerateToken(user);
                        var refreshTokenString = _userService.GenerateRefreshToken(user);
                        HttpContext.Response.Cookies.Append("REFRESH_TOKEN", refreshTokenString, new CookieOptions
                        {
                            Expires = DateTime.Now.AddMinutes(60),
                            HttpOnly = true,
                            Secure = true
                        });
                        HttpContext.Response.Cookies.Append("USER", JsonSerializer.Serialize<UserViewModel>(user), new CookieOptions
                        {
                            Expires = DateTime.Now.AddMinutes(60),
                            HttpOnly = true,
                            Secure = true
                        });
                        return Ok(new
                        {
                            Token = tokenString,
                            user
                        });
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
                else
                {
                    return BadRequest();
                }
            }
        }

        [HttpPost, Route("addprofile")]
        public async Task<IActionResult> AddProfile([FromBody] ProfileViewModel profileViewModel)
        {
            _logger.LogInformation("AddProfile() Called");
            if (profileViewModel != null && ModelState.IsValid)
            {
                var isProfileExists = await _userService.IsProfileExists(profileViewModel.LoginId);
                if (isProfileExists)
                {
                    var updateProfile = await _userService.UpdateUserProfile(profileViewModel);
                    
                    return Ok("Profile updated Successfully");
                }

                var result = await _userService.AddProfile(profileViewModel);
                if (result != 0)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                _logger.LogError("AddProfile BadRequest --Invalid data");

                return BadRequest("Invalid data");
            }
        }
        [HttpPost, Route("upload")]
        public async Task<IActionResult> Upload(IFormCollection model)
        {
            if (model.Files.Count > 0)
            {
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                var fileNames = "";
                foreach (var file in model.Files)
                {
                    if (file.Length > 0)
                    {
                        var g = Guid.NewGuid();
                        var realName = String.Format("{0}_{1}", g, file.FileName);

                        var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                        var fullPath = Path.Combine(pathToSave, fileName);
                        //var dbPath = Path.Combine(folderName, fileName);
                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }
                        fileNames += fileName;
                    }
                }
                return Ok(new { Content = fileNames });
            }
            return BadRequest();
        }
    }
}
