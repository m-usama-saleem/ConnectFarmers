using ConnectFarmers.ViewModels.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConnectFarmers.Services.Users
{
    public interface IUserService
    {
        // Task<UserViewModel> ValidateUser(LoginViewModel loginModel);
        Task<int> Register(UserViewModel userViewModel);
        Task<int> RegisterOAuth(OAuthUsersViewModel oauthUser);
        Task<UserViewModel> ValidateUser(LoginViewModel loginViewModel);
        Task<int> ValidateOAuthser(OAuthUsersViewModel oAuthUserViewModel);
        Task<bool> IsUserExists(string loginId);
        Task<bool> IsProfileExists(string loginId);
        Task<int> AddProfile(ProfileViewModel profileViewModel);
        Task<int> UpdateUserProfile(ProfileViewModel userViewModel);
        string GenerateToken(UserViewModel usersModel);
        string GenerateRefreshToken(UserViewModel user);
        bool ValidateRefreshToken(string value);
        Task<ProfileViewModel> GetProfileByLoginId(int userId);
        Task<ProfileViewModel> GetProfileByLoginId(string userId);
        Task<bool> IsProfileExistsByLoginId(string loginId);
        Task<ProfileViewModel> GetProfileOnLogin(int userId, string loginId);
        Task<UserViewModel> GetUserLoginId(string loginId);

    }
}
