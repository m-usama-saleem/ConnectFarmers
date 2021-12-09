//using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
//using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace GetacMasterDock03D.Utils
{
    public class ConnectFarmerJwtValidationHandler //: JwtSecurityTokenHandler
    {
        //public override ClaimsPrincipal ValidateToken(string token, TokenValidationParameters validationParameters, out SecurityToken validatedToken)
        //{
        //    var secretKey = GenerateSecretKeyFromInMemoryTokenKey();
        //    validationParameters.IssuerSigningKey = secretKey;
        //    return base.ValidateToken(token, validationParameters, out validatedToken);
        //}
        //private SymmetricSecurityKey GenerateSecretKeyFromInMemoryTokenKey()
        //{
        //    var _getacCommon = new ConnectFarmerCommon();
        //    var tokenValue = _getacCommon.GetInMemoryData("TokenKey");
        //    SymmetricSecurityKey _secretKey;
        //    if (tokenValue == null || string.IsNullOrEmpty((string)tokenValue))
        //    {
        //        var newTokenAesKey = ConnectFarmerCryptography.GenerateAesKey();
        //        _getacCommon.SetInMemoryData("TokenKey", newTokenAesKey);

        //        _secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(newTokenAesKey));
        //    }
        //    else
        //    {
        //        _secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenValue));
        //    }
        //    return _secretKey;
        //}
    }
}
