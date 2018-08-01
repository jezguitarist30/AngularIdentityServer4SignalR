using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace SignalR.Hubs
{
    [Authorize]
    public class Chat : Hub
    {
        public async Task SendPrivateMessage(string sender, string message)
        {           
            await Clients.All.SendAsync("RecievedMessage", new { sender = sender, message = message});
        }

        public override async Task OnConnectedAsync()
        {            
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await base.OnDisconnectedAsync(exception);
        }
    }
}
