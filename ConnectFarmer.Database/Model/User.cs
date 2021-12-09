using System;
using System.Collections.Generic;

#nullable disable

namespace ConnectFarmer.Database.Model
{
    public partial class User
    {
        public int SysSerial { get; set; }
        public string LoginId { get; set; }
        public byte[] Password { get; set; }
        public string OauthKey { get; set; }
        public bool IsDeleted { get; set; }
        public string ActivationCode { get; set; }
        public bool? IsEmailVerified { get; set; }
    }
}
