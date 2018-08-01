using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalR.Hubs;
using System.Threading.Tasks;

namespace SignalR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SampleController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _chatHubContext;

        public SampleController(IHubContext<ChatHub> chatHubContext)
        {
            _chatHubContext = chatHubContext;
        }

        [HttpPost]
        public Task SendMessage(ChaMtessage model)
        {
            return _chatHubContext.Clients.All.SendAsync("RecieveMessage", model.Sender, model.Message);
        }

    }

    public class ChaMtessage
    {
        public string Sender { get; set; }
        public string Message { get; set; }
    }
}