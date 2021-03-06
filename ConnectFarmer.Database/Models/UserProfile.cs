using System;
using System.Collections.Generic;

#nullable disable

namespace ConnectFarmer.Database.Models
{
    public partial class UserProfile
    {
        public int SysSerial { get; set; }
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }
        public string Image { get; set; }
        public string Nic { get; set; }
    }
}
