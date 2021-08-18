using System;
using HolzraumCatch.Models;

namespace HolzraumCatch.Authentication
{
    public interface IUserService
    {
        bool IsValidUserCredentials(string username, string password);
        User findUserByUserName(string username);
        User Register(string username, string email, string password);
        bool isValidPassword(string password);
        void setPassword(User user, string password);
    }
}