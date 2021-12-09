using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ConnectFarmers.ViewModels.Users
{
    public class OAuthUsersViewModel
    {
        [Required]
        public string OAuthKey { get; set; }
        [Required]
        public string LoginId { get; set; }

        public string ToJsonString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
