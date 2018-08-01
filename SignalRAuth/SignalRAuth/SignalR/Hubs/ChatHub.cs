using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalR.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string sender, string message)
        {
            await Clients.All.SendAsync("RecieveMessage", sender, message);

            await SentMessage();
        }  
        
        public async Task SentMessage()
        {
            await Clients.Caller.SendAsync("MessageSent");
        }
    }
}
