using HolzraumCatch.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HolzraumCatch.Services.Import
{
    [ModelBinder(typeof(JsonWithFilesFormDataModelBinder), Name = "json")]
    public class ImportRequest
    {
        public string projectPhase { get; set; }
        public IFormFile file { get; set; }
    }
}