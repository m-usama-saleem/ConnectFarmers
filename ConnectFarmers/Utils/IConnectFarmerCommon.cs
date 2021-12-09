using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GetacMasterDock03D.Utils
{
    public interface IConnectFarmerCommon
    {
        public void SetInMemoryData(object memoryKey, object memoryValue);
        public string GetInMemoryData(object memoryKey);
    }
}
