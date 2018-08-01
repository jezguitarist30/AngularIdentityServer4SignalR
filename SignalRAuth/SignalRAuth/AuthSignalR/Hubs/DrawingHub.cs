using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace AuthSignalR.Hubs
{
    [Authorize]
    public class DrawingHub : Hub
    {
        public async Task JoinChannel(string groupName)
        {
           await Groups.AddToGroupAsync(this.Context.ConnectionId, groupName);

           await Clients.OthersInGroup(groupName).SendAsync("SomeoneJoined", Context.User.Identity.Name);
        }

        public async Task Draw(DrawModel newPoint)
        {
            await Clients.OthersInGroup(newPoint.GroupName).SendAsync("UpdateCanvas", newPoint);
        }
    }

    public class DrawModel
    {
        public string GroupName { get; set; }
        public double PrevX { get; set; }
        public double PrevY { get; set; }
        public double CurrX { get; set; }
        public double CurrY { get; set; }
    }
}
