using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using CsvHelper;
using CsvHelper.Configuration;
using HolzraumCatch.Models;
using HolzraumCatch.Services.CurrentUser;
using HolzraumCatch.Services.File;

namespace HolzraumCatch.Services.Import
{
    public class ProjectDataImportService : IProjectDataImportService
    {
        private readonly AppDbContext _ctx;
        private readonly ICurrentUserService _currentUserSvc;
        private readonly IFileService _fileService;

        public ProjectDataImportService(AppDbContext ctx, ICurrentUserService currentUserService, IFileService fileService)
        {
            _ctx = ctx;
            _currentUserSvc = currentUserService;
            _fileService = fileService;
        }

        public ImportSummary import(int projectId, ImportRequest request)
        {
            ImportJob job = null;

            //TODO: validate the incoming file is of the type/size/etc we expect (e.g. no PNG, PDF, etc)
            if (request.file.Length > 0)
            {
                job = _ctx.ImportJobs.Add(new ImportJob()
                {
                    fileName = request.file.FileName,
                    projectId = projectId,
                    runUserId = _currentUserSvc.CurrentUser.id,
                    runDate = System.DateTime.UtcNow,
                    projectPhase = request.projectPhase,
                    isActive = !_ctx.ImportJobs.Any(j => j.projectId == projectId && j.isActive),
                }).Entity;

                //TODO: consider saving this to DB instead of directory on webserver
                string fileName = $"ImportJob_{job.id}{Path.GetExtension(request.file.FileName)}";
                _fileService.save(fileName, request.file);

                using (TextReader reader = _fileService.getFile(fileName))
                {
                    importModelData(job.id, reader);
                }

                _ctx.SaveChanges();
            }
            else
            {
                //todo: bad file? throw?
            }

            return new ImportSummary()
            {
                fileName = job.fileName,
                runDate = job.runDate,
                importId = job.id,
                projectPhase = job.projectPhase,
                isActive = job.isActive
            };
        }

        public void importModelData(int importJobId, TextReader fileData)
        {
            CsvConfiguration config = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                HasHeaderRecord = true,
                PrepareHeaderForMatch = args => args.Header.ToLower().Replace(" ", "_"),
                HeaderValidated = (args) => { /* If there's a missing header, do nothing. Maybe log it one day? */ },
                MissingFieldFound = (args) => { /* If there's a missing field, do nothing. Maybe log it one day? */ }
            };

            using (CsvReader csv = new CsvReader(fileData, config))
            {
                csv.Context.RegisterClassMap<ModelDataMap>();

                List<ModelData> records = csv.GetRecords<ModelData>().ToList();
                foreach (ModelData record in records)
                {
                    record.importJob = null;
                    record.importJobId = importJobId;

                    if (String.IsNullOrEmpty(record.name) ||
                     !_ctx.HzFunctions.Any(f => f.name.Equals(record.name, StringComparison.CurrentCultureIgnoreCase)))
                    {
                        record.function_name = "UNKNOWN";
                    }
                }
                _ctx.ModelData.AddRange(records);
            }
        }

        public TextReader getImportFile(int importId)
        {
            ImportJob job = _ctx.ImportJobs.Find(importId);
            string fileName = $"ImportJob_{job.id}{Path.GetExtension(job.fileName)}";
            return _fileService.getFile(fileName);
        }
    }
}