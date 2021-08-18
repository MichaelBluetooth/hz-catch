using System.Linq;
using System.Text.RegularExpressions;
using HolzraumCatch.Models;

namespace HolzraumCatch.Authentication
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _ctx;

        public UserService(AppDbContext ctx)
        {
            _ctx = ctx;
        }

        public bool IsValidUserCredentials(string username, string password)
        {
            bool isValid = false;

            if (!string.IsNullOrWhiteSpace(password) && !string.IsNullOrEmpty(username))
            {
                User user = findUserByUserName(username);
                if (null != user)
                {
                    isValid = BCrypt.Net.BCrypt.Verify(password, user.password);
                }
            }

            return isValid;
        }

        public User findUserByUserName(string username)
        {
            return _ctx.Users.FirstOrDefault(u => u.username.ToLower() == username.ToLower());
        }

        public User Register(string username, string email, string password)
        {
            User newUser = new User()
            {
                username = username,
                email = email
            };
            setPassword(newUser, password);
            _ctx.Users.Add(newUser);
            _ctx.SaveChanges();

            return newUser;
        }

        public bool isValidPassword(string password)
        {
            var hasNumber = new Regex(@"[0-9]+");
            var hasUpperChar = new Regex(@"[A-Z]+");
            var hasMinimum8Chars = new Regex(@".{8,}");

            return hasUpperChar.IsMatch(password) &&
                   hasNumber.IsMatch(password) &&
                   hasMinimum8Chars.IsMatch(password);
        }

        public void setPassword(User user, string password)
        {
            user.password = BCrypt.Net.BCrypt.HashPassword(password);
        }
    }
}
