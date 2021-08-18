using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace HolzraumCatch.Services.File
{
    public class FileService : IFileService
    {
        private readonly string UPLOADS_DIRECTORY = "uploads";
        private readonly IWebHostEnvironment _hostingEnvironment;

        public FileService(IWebHostEnvironment env)
        {
            _hostingEnvironment = env;
        }

        public void save(string fileName, IFormFile file)
        {
            string uploads = Path.Combine(_hostingEnvironment.WebRootPath, UPLOADS_DIRECTORY);
            string filePath = Path.Combine(uploads, fileName);
            using (Stream fileStream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(fileStream);
            }
        }

        public TextReader getFile(string fileName)
        {
            string uploads = Path.Combine(_hostingEnvironment.WebRootPath, UPLOADS_DIRECTORY);
            return new StreamReader(Path.Combine(uploads, fileName));
        }
    }
}