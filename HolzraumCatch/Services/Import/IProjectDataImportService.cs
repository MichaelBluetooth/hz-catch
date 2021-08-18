using System.IO;
using HolzraumCatch.Models;

namespace HolzraumCatch.Services.Import
{
    public interface IProjectDataImportService
    {
        ImportSummary import(int projectId, ImportRequest request);
        void importModelData(int importJobId, TextReader fileData);
        TextReader getImportFile(int importId);
    }
}