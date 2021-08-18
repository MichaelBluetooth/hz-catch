using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using HolzraumCatch.Authentication;
using HolzraumCatch.Models;
using HolzraumCatch.Services.UserUtils;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;

namespace HolzraumCatch.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IJwtAuthManager _jwtAuthManager;
        private readonly IUserService _userService;
        private readonly IUserDetailsService _userDetails;
        private readonly ILogger<UsersController> _logger;
        private readonly AppDbContext _db;

        public UsersController(ILogger<UsersController> logger, IJwtAuthManager jwtAuthManager, IUserService userService, AppDbContext db, IUserDetailsService userDetails)
        {
            _logger = logger;
            _jwtAuthManager = jwtAuthManager;
            _userService = userService;
            _db = db;
            _userDetails = userDetails;
        }

        #region AUTHENTICATION

        [AllowAnonymous]
        [HttpPost]
        [Route("register")]
        public ActionResult Register([FromBody] RegisterRequest request)
        {
            if (String.IsNullOrEmpty(request.username) || String.IsNullOrEmpty(request.password))
            {
                return BadRequest();
            }

            User user = _userService.findUserByUserName(request.username);
            if (null != user)
            {
                _logger.LogInformation($"Anonymous user tried to register with [{request.username}], but it was already registered.");
                return BadRequest("Username is already taken");
            }

            if (!_userService.isValidPassword(request.password))
            {
                return BadRequest("Passwords must have a minimum of 8 characters, at least one uppercase letter and at least one number");
            }

            User registered = _userService.Register(request.username, request.email, request.password);

            return Ok(new UserSummary()
            {
                id = registered.id,
                email = registered.email,
                username = registered.username
            });
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public ActionResult Login([FromBody] LoginRequest request)
        {
            if (String.IsNullOrEmpty(request.username) || String.IsNullOrEmpty(request.password))
            {
                return BadRequest();
            }

            if (!_userService.IsValidUserCredentials(request.username, request.password))
            {
                return Unauthorized();
            }

            User user = _userService.findUserByUserName(request.username);
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, request.username)
            };

            var jwtResult = _jwtAuthManager.GenerateTokens(request.username, claims, DateTime.Now);
            _logger.LogInformation($"User [{request.username}] logged in the system.");
            return Ok(new LoginResult
            {
                username = request.username,
                accessToken = jwtResult.accessToken,
                refreshToken = jwtResult.refreshToken.tokenString
            });
        }

        [HttpPost]
        [Route("logout")]
        public ActionResult Logout()
        {
            string userName = User.Identity.Name;
            _jwtAuthManager.RemoveRefreshTokenByUserName(userName);
            _logger.LogInformation($"User [{userName}] logged out the system.");
            return Ok();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("refresh-token")]
        public async Task<ActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            try
            {
                var userName = User.Identity.Name;
                _logger.LogInformation($"User [{userName}] is trying to refresh JWT.");

                if (string.IsNullOrWhiteSpace(request.refreshToken))
                {
                    return Unauthorized();
                }

                JwtAuthResult jwtResult;
                StringValues accessToken;
                if (HttpContext.Request.Headers.TryGetValue("Authorization", out accessToken))
                {
                    jwtResult = _jwtAuthManager.Refresh(request.refreshToken, accessToken.FirstOrDefault()?.Replace("Bearer ", ""), DateTime.Now);
                    _logger.LogInformation($"User [{userName}] has refreshed JWT.");
                }
                else
                {
                    return Unauthorized();
                }

                return Ok(new LoginResult
                {
                    username = userName,
                    accessToken = jwtResult.accessToken,
                    refreshToken = jwtResult.refreshToken.tokenString
                });
            }
            catch (SecurityTokenException e)
            {
                return Unauthorized(e.Message);
            }
        }

        #endregion AUTHENTICATION

        [HttpGet]
        [Route("{id}")]
        public ActionResult GetProfile([FromRoute] int id)
        {
            return Ok(_userDetails.getUser(id));
        }

        [HttpGet]
        [Route("profile")]
        public ActionResult GetProfile()
        {
            return Ok(_userDetails.getCurrentUser());
        }

        [HttpGet]
        public ActionResult GetUsers()
        {
            return Ok(_userDetails.getUsers());
        }

        [HttpPut]
        [Route("{id}")]
        public ActionResult UpdateUser([FromRoute] int id, [FromBody] UpdateUserRequest request)
        {
            return Ok(_userDetails.updateUser(id, request));
        }
    }
}