using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SignalR
{
    public class NameUserIdProvider : IUserIdProvider
    {
        public string GetUserId(HubConnectionContext connection)
        {
            return connection.User?.Claims?.FirstOrDefault(x => x.Type == "userId")?.Value;           
        }
    }
}
