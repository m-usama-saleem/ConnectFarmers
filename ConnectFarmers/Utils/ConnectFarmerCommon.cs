using Microsoft.Extensions.Caching.Memory;
using System;

namespace GetacMasterDock03D.Utils
{
    public class ConnectFarmerCommon : IConnectFarmerCommon
    {
        public static IMemoryCache _memoryCache;
        public ConnectFarmerCommon()
        {
            if(_memoryCache == null)
            {
                _memoryCache = new MemoryCache(new MemoryCacheOptions());
            }           
        }
        public void SetInMemoryData(object memoryKey, object memoryValue)
        {
            var cacheExpiryOptions = new MemoryCacheEntryOptions
            {
                Priority = CacheItemPriority.High,
                SlidingExpiration = TimeSpan.FromMinutes(60),
                Size = 1024,
            };

            _memoryCache.Set(memoryKey, memoryValue, cacheExpiryOptions);
        }
        public string GetInMemoryData(object memoryKey)
        {
            string value = string.Empty;
            _memoryCache.TryGetValue(memoryKey, out value);
            return value;
        }
    }
}
