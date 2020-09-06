using System;
using System.Collections.Generic;
using System.Text;
using Castle.Core.Logging;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Localization;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using OrchardCore.DisplayManagement.Notify;

namespace Tweb.DragDrop.Demo.Controllers
{
    public class TwebFirstController : Controller
    {
        private readonly ILogger<TwebFirstController> _logger;
        private readonly INotifier _notifier;
        private readonly IStringLocalizer T;
        private readonly IHtmlLocalizer H;

        public TwebFirstController(
            ILogger<TwebFirstController> logger,
            INotifier notifier,
            IStringLocalizer<TwebFirstController> stringLocalizer,
            IHtmlLocalizer<TwebFirstController> htmlLocalizer)
        {
            _notifier = notifier;
            _logger = logger;

            T = stringLocalizer;
            H = htmlLocalizer;
        }

        public ActionResult Index()
        {
            ViewData["Message"] = T["Hello world!!! I'm from tweb first controller."];

            return View();
        }

        [Route("TwebDemo/NotifyMe")]
        public ActionResult NotifyMe()
        {
            _logger.LogError("You have been modified about some error!");

            _notifier.Information(H["Congratulations! You have been notified! Check the error log tool!"]);

            return View();
        }
    }
}
