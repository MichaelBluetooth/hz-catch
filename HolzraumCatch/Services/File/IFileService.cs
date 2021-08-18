using System.IO;
using Microsoft.AspNetCore.Http;

namespace HolzraumCatch.Services.File {
    public interface IFileService {
        void save(string fileName, IFormFile file);
        TextReader getFile(string fileName);
    }
}