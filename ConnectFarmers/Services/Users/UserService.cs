using ConnectFarmer.Database.Models;
using ConnectFarmers.ViewModels.Users;
using GetacMasterDock03D.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ConnectFarmers.Services.Users
{
    public class UserService : IUserService
    {
        private readonly ILogger _logger;
        private readonly IConfiguration _configuration;
        private readonly ConnectFarmersContext _db;

        private readonly IConnectFarmerCommon _getacCommon;
        private SymmetricSecurityKey _secretKey;

        public UserService(ConnectFarmersContext dBContext, IConfiguration configuration, ILogger<UserService> logger, IConnectFarmerCommon getacCommon)
        {
            _configuration = configuration;
            _db = dBContext;
            _logger = logger;
            _getacCommon = getacCommon;
            GenerateSecretKeyFromInMemoryTokenKey();
        }
        public async Task<bool> IsUserExists(string loginId)
        {
            var isFound = false;

            try
            {
                var user = await _db.Users.Where(x => x.LoginId == loginId).FirstOrDefaultAsync();
                if (user != null)
                {
                    isFound = true;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                isFound = false;
            }
            return isFound;
        }
        public async Task<ProfileViewModel> GetUserProfileById(int userId)
        {
            ProfileViewModel result;

            try
            {
                var user = await _db.Users.Where(x => x.SysSerial == userId).FirstOrDefaultAsync();
                if (user != null)
                {
                    var profile = await _db.UserProfiles.Where(x => x.SysSerial == user.SysSerial).FirstOrDefaultAsync();
                    if (user != null)
                    {
                        result = new ProfileViewModel
                        {
                            LoginId = user.LoginId,
                            UserId = user.SysSerial
                        };
                        if (profile != null)
                        {
                            result.FirstName = profile.FirstName;
                        }
                    }
                    else
                    {
                        result = null;
                    }
                }
                else
                {
                    result = null;
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                result = null;
            }

            return result;
        }
        public async Task<int> Register(UserViewModel userViewModel)
        {
            var result = 0;
            try
            {
                var user = new User
                {
                    LoginId = userViewModel.LoginId,
                    Password = GetPasswordHash(userViewModel.Password),
                };
                var res = await _db.Users.AddAsync(user);
                result = await _db.SaveChangesAsync();

                _db.UserProfiles.Add(new UserProfile
                {
                    UserId = res.Entity.SysSerial
                });
                result = await _db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                result = 0;
            }
            return result;
        }
        public async Task<int> RegisterOAuth(OAuthUsersViewModel oauthUser)
        {
            var result = 0;
            try
            {
                var user = new User();
                user.LoginId = oauthUser.LoginId;
                user.OauthKey = oauthUser.OAuthKey;
                _db.Users.Add(user);
                var userCreated = await _db.SaveChangesAsync();
                if (userCreated > 0)
                {
                    _db.UserProfiles.Add(new UserProfile
                    {
                        UserId = user.SysSerial,
                    });
                    result = await _db.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                result = 0;
            }
            return result;
        }
        public async Task<UserViewModel> ValidateUser(LoginViewModel loginViewModel)
        {
            UserViewModel result = null;
            try
            {
                var user = await _db.Users.Where(x => x.LoginId == loginViewModel.LoginId).FirstOrDefaultAsync();
                if (user != null)
                {
                    if (ComparePassword(loginViewModel.Password, user.Password))
                    {
                        result = new UserViewModel()
                        {
                            LoginId = loginViewModel.LoginId,
                            SysSerial = user.SysSerial
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                result = null;
            }
            return result;
        }
        public async Task<int> ValidateOAuthser(OAuthUsersViewModel oAuthUserViewModel)
        {
            int result = -1;
            try
            {
                var user = await _db.Users.FirstOrDefaultAsync(x => x.LoginId == oAuthUserViewModel.LoginId);
                if (user != null)
                {
                    if (string.IsNullOrEmpty(user.OauthKey))
                    {
                        user.OauthKey = oAuthUserViewModel.OAuthKey;
                        await _db.SaveChangesAsync();
                    }
                    if (oAuthUserViewModel.OAuthKey.Trim() == user.OauthKey.Trim())
                    {
                        result = user.SysSerial;
                    }
                }
            }
            catch (Exception ex)
            {
                result = -1;
                _logger.LogError(ex, ex.Message);
            }
            return result;
        }
        public async Task<ProfileViewModel> GetProfileByLoginId(int userId)
        {

            ProfileViewModel result = null;
            try
            {
                result = await (from user in _db.Users
                                join profile in _db.UserProfiles
                                on user.SysSerial equals profile.UserId
                                where user.SysSerial == userId
                                select new ProfileViewModel
                                {
                                    UserId = user.SysSerial,
                                    FirstName = profile.FirstName,
                                    MiddleName = profile.MiddleName,
                                    LastName = profile.LastName,
                                    Contact = profile.Contact,
                                    LoginId = user.LoginId,
                                    Image = profile.Image,
                                    Nic = profile.Nic,
                                }).FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                result = null;
                _logger.LogError(ex, ex.Message);
            }
            return result;
        }
        public async Task<ProfileViewModel> GetProfileByLoginId(string loginId)
        {

            ProfileViewModel result = null;
            try
            {
                result = await (from user in _db.Users
                                join profile in _db.UserProfiles
                                on user.SysSerial equals profile.UserId
                                where user.LoginId == loginId
                                select new ProfileViewModel
                                {
                                    UserId = user.SysSerial,
                                    FirstName = profile.FirstName,
                                    MiddleName = profile.MiddleName,
                                    LastName = profile.LastName,
                                    Contact = profile.Contact,
                                    LoginId = user.LoginId,
                                    Image = profile.Image,
                                    Nic = profile.Nic,
                                }).FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                result = null;
                _logger.LogError(ex, ex.Message);
            }
            return result;
        }
        public string GenerateToken(UserViewModel usersModel)
        {
            var tokenString = "";
            try
            {
                var signinCredentials = new SigningCredentials(_secretKey, SecurityAlgorithms.HmacSha256);

                var userClaims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, usersModel.LoginId.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                var token = new JwtSecurityToken(
                    issuer: _configuration["TokenIssuer"],
                    audience: _configuration["TokenAudience"],
                    claims: userClaims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: signinCredentials
                ); ;

                tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                tokenString = "";
            }
            return tokenString;
        }
        public string GenerateRefreshToken(UserViewModel usersModel)
        {
            var tokenString = "";
            try
            {
                var signinCredentials = new SigningCredentials(_secretKey, SecurityAlgorithms.HmacSha256);

                var userClaims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, usersModel.LoginId.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                var token = new JwtSecurityToken(
                    issuer: _configuration["TokenIssuer"],
                    audience: _configuration["TokenIssuer"],
                    claims: userClaims,
                    expires: DateTime.Now.AddMinutes(60),
                    signingCredentials: signinCredentials

                );

                tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                tokenString = "";
            }
            return tokenString;
        }
        public bool ValidateRefreshToken(string token)
        {
            JwtSecurityTokenHandler securityTokenHandler = new JwtSecurityTokenHandler();

            TokenValidationParameters validationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

                ValidIssuer = _configuration["TokenIssuer"],
                ValidAudience = _configuration["TokenIssuer"],
                IssuerSigningKey = _secretKey,
                ClockSkew = TimeSpan.Zero
            };

            ClaimsPrincipal claimsPrincipal = securityTokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);
            if (claimsPrincipal != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        private void GenerateSecretKeyFromInMemoryTokenKey()
        {
            var tokenValue = _getacCommon.GetInMemoryData("TokenKey");

            if (tokenValue == null || string.IsNullOrEmpty((string)tokenValue))
            {
                var newTokenAesKey = ConnectFarmerCryptography.GenerateAesKey();
                _getacCommon.SetInMemoryData("TokenKey", newTokenAesKey);

                _secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(newTokenAesKey));
            }
            else
            {
                _secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenValue));
            }
        }
        public static byte[] GetPasswordHash(string rsValue)
        {
            return ConnecctFarmerHash.CalculateHash(rsValue);
        }
        public static bool ComparePassword(string rsValue, byte[] robjPasswordHash)
        {
            return ConnecctFarmerHash.CheckHashValue(rsValue, robjPasswordHash);
        }
        public async Task<bool> IsProfileExistsByLoginId(string loginId)
        {
            bool result = false;
            try
            {
                var user = await _db.Users.Where(x => x.LoginId == loginId).FirstOrDefaultAsync();
                if (user != null)
                {
                    var profile = await _db.UserProfiles.Where(x => x.UserId == user.SysSerial).FirstOrDefaultAsync();
                    if (profile != null)
                    {
                        result = true;
                    }
                }
            }
            catch (Exception ex)
            {
                result = false;
                _logger.LogError(ex, ex.Message);
            }
            return result;
        }
        public async Task<ProfileViewModel> GetProfileOnLogin(int userId, string loginId)
        {
            ProfileViewModel result = null;
            try
            {
                UserProfile profile = null;
                int userIdInSystem = -1;
                if (userId == -1)
                {
                    var _user = await _db.Users.Where(x => x.LoginId == loginId).FirstOrDefaultAsync();
                    profile = await _db.UserProfiles.Where(x => x.UserId == _user.SysSerial).FirstOrDefaultAsync();
                    userIdInSystem = profile.UserId;
                }
                else
                {
                    profile = await _db.UserProfiles.Where(x => x.UserId == userId).FirstOrDefaultAsync();
                    userIdInSystem = userId;
                }
                if (profile != null)
                {
                    result = new ProfileViewModel()
                    {
                        UserId = profile.UserId,
                        FirstName = profile.FirstName,
                        LastName = profile.LastName,
                        MiddleName = profile.MiddleName,
                        Contact = profile.Contact,
                        Image = profile.Image,
                        Nic = profile.Nic,
                        LoginId = loginId,
                    };
                }
                else
                {
                    result = new ProfileViewModel()
                    {
                        UserId = userIdInSystem,
                        LoginId = loginId
                    };
                }
            }
            catch (Exception ex)
            {
                result = null;
                _logger.LogError(ex, ex.Message);
            }
            return result;
        }
        public async Task<UserViewModel> GetUserLoginId(string loginId)
        {
            UserViewModel result;

            try
            {
                var user = await _db.Users.Where(x => x.LoginId == loginId).FirstOrDefaultAsync();
                if (user != null)
                {
                    if (user != null)
                    {
                        result = new UserViewModel
                        {
                            LoginId = user.LoginId,
                            SysSerial = user.SysSerial
                        };
                    }
                    else
                    {
                        result = null;
                    }
                }
                else
                {
                    result = null;
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                result = null;
            }

            return result;
        }
        public async Task<int> UpdateUserProfile(ProfileViewModel profileViewModel)
        {
            var result = 0;
            int DBResult = 0;
            try
            {
                var user = await _db.Users.Where(x => x.LoginId == profileViewModel.LoginId).FirstOrDefaultAsync();
                if (user != null)
                {
                    var profile = await _db.UserProfiles.Where(x => x.UserId == user.SysSerial).FirstOrDefaultAsync();
                    if (profile == null)
                    {
                        profile = new UserProfile();
                        profile.UserId = profileViewModel.UserId;
                        profile.FirstName = profileViewModel.FirstName;
                        profile.LastName = profileViewModel.LastName;
                        profile.MiddleName = profileViewModel.MiddleName;
                        profile.Contact = profileViewModel.Contact;
                        profile.Image = profileViewModel.Image;
                        profile.Nic = profileViewModel.Nic;

                        await _db.UserProfiles.AddAsync(profile);
                        DBResult = await _db.SaveChangesAsync();
                        if (DBResult == 0)
                        {
                            if (!TrackedEntities(_db.ChangeTracker))
                            {
                                result = 0;
                            }
                            else
                            {
                                result = 1;
                            }
                        }
                    }
                    else
                    {
                        profile.FirstName = profileViewModel.FirstName;
                        profile.LastName = profileViewModel.LastName;
                        profile.MiddleName = profileViewModel.MiddleName;
                        profile.Contact = profileViewModel.Contact;
                        profile.Image = profileViewModel.Image;
                        profile.Nic = profileViewModel.Nic;

                        _db.UserProfiles.Update(profile);
                        var dbresult = await _db.SaveChangesAsync();
                        if (dbresult == 0)
                        {
                            if (!TrackedEntities(_db.ChangeTracker))
                            {
                                result = 0;
                            }
                        }
                        else
                        {
                            result = 1;
                        }
                    }
                }
                else
                {
                    result = 0;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                result = 0;
            }
            return result;
        }
        private static bool TrackedEntities(ChangeTracker changeTracker)
        {
            try
            {
                var entries = changeTracker.Entries();
                if (entries.FirstOrDefault().State == EntityState.Unchanged)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }

        }
        public async Task<bool> IsProfileExists(string loginId)
        {
            var isFound = false;

            try
            {
                var user = await _db.Users.Where(x => x.LoginId == loginId).FirstOrDefaultAsync();
                if (user != null)
                {
                    var profile = await _db.UserProfiles.Where(x => x.UserId == user.SysSerial).FirstOrDefaultAsync();
                    if (profile != null)
                    {
                        isFound = true;
                    }
                    else
                    {
                        isFound = false;
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                isFound = false;
            }

            return isFound;
        }
        public async Task<int> AddProfile(ProfileViewModel profileViewModel)
        {
            int result = 0;
            try
            {
                var user = await _db.Users.Where(x => x.LoginId == profileViewModel.LoginId).FirstOrDefaultAsync();
                if (user != null)
                {
                    var profile = new UserProfile();
                    profile.UserId = user.SysSerial;
                    profile.FirstName = profileViewModel.FirstName;
                    profile.LastName = profileViewModel.LastName;
                    profile.MiddleName = profileViewModel.MiddleName;
                    profile.Contact = profileViewModel.Contact;
                    profile.Email = profileViewModel.LoginId;

                    await _db.UserProfiles.AddAsync(profile);
                    result = await _db.SaveChangesAsync();
                    return result;
                }
                else
                {
                    result = 0;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                result = 0;
            }
            return result;
        }
    }
}
