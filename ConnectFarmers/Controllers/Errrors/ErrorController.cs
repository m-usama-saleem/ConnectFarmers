using ConnectFarmers.Utils;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace ConnectFarmers.Controllers.Errrors
{
    [ApiExplorerSettings(IgnoreApi = true)]
    [ApiController]
    public class ErrorController : ControllerBase
    {
        private readonly ILogger _logger;
        public ErrorController(ILogger<ErrorController> logger)
        {
            _logger = logger;
        }

        [Route("/error")]
        public ApiErrorResponse Error()
        {
            var context = HttpContext.Features.Get<IExceptionHandlerFeature>();
            var exception = context.Error; // Your exception
            var code = 500;

            if (exception is JsonException
                || exception is InvalidCastException) code = (int)HttpStatusCode.UnprocessableEntity;

            //else if (exception is FileNotFoundException) code = (int)HttpStatusCode.Conflict;

            //else if (exception is DirectoryNotFoundException) code = (int)HttpStatusCode.Conflict;

            else if (exception is UnauthorizedAccessException) code = (int)HttpStatusCode.Unauthorized;

            else if (exception is SecurityTokenDecryptionFailedException) code = (int)HttpStatusCode.Unauthorized;

            else if (exception is SecurityTokenExpiredException) code = (int)HttpStatusCode.Unauthorized;

            else if (exception is SecurityTokenInvalidLifetimeException) code = (int)HttpStatusCode.Unauthorized;

            else if (exception is SecurityTokenException) code = (int)HttpStatusCode.Unauthorized;

            Response.StatusCode = code;

            _logger.LogError(exception, exception.Message);

            return new ApiErrorResponse(exception);
        }
    }
}
