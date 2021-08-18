using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Globalization;
using System.Linq;
using System.Reflection;
using HolzraumCatch.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace HolzraumCatch.Services.ModelDataUtils
{
    public class ModelDataService : IModelDataService
    {
        private readonly string _cacheKey = "model_data_cache";
        private readonly IMemoryCache _memoryCache;
        private readonly AppDbContext _ctx;
        private readonly HashSet<string> _ignoreProps = new HashSet<string>(){
            "importJobId",
            "importJob",
            "importJobId",
            "created",
            "lastUpdated",
        };

        public ModelDataService(AppDbContext ctx, IMemoryCache memoryCache)
        {
            _ctx = ctx;
            _memoryCache = memoryCache;
        }

        public ModelDataView getView(int importId)
        {
            ImportJob import = _ctx.ImportJobs.Include(j => j.project).FirstOrDefault(j => j.id == importId);
            ICollection<ModelData> data = _ctx.ModelData.Where(m => m.importJobId == importId).ToList();
            ModelDataDefinition def = getModelProperties();

            return new ModelDataView()
            {
                definition = def,
                data = data,
                importFileName = import.fileName,
                importId = importId,
                projectId = import.projectId,
                importPhase = import.projectPhase,
                projectName = import.project.projectName,
                importRunDate = import.runDate
            };
        }

        public ModelDataDefinition getModelProperties()
        {
            ModelDataDefinition definition;
            if (!_memoryCache.TryGetValue<ModelDataDefinition>(_cacheKey, out definition))
            {
                Type modelType = typeof(ModelData);

                ICollection<ModelDataProperty> properties = new Collection<ModelDataProperty>();
                TextInfo textInfo = new CultureInfo("en-US", false).TextInfo;

                foreach (PropertyInfo prop in modelType.GetProperties(BindingFlags.Public | BindingFlags.Instance)
                    .Where(p => !_ignoreProps.Contains(p.Name)))
                {
                    string propType = ModelDataProperty.PropertyTypes.Text;
                    if (prop.PropertyType == typeof(DateTime))
                    {
                        propType = ModelDataProperty.PropertyTypes.Date;
                    }
                    else if (prop.PropertyType == typeof(int) || prop.PropertyType == typeof(double) || prop.PropertyType == typeof(float))
                    {
                        propType = ModelDataProperty.PropertyTypes.Number;
                    }

                    HzModelPropertyAttribute attr = prop.GetCustomAttribute<HzModelPropertyAttribute>();

                    properties.Add(new ModelDataProperty()
                    {
                        name = prop.Name,
                        label = attr?.label ?? String.Join(" ", prop.Name.Replace("_", " ").Split(" ").Select(word => textInfo.ToTitleCase(word))),
                        order = attr?.order,
                        type = propType,
                        visible = attr?.visible ?? false
                    });
                }

                definition = new ModelDataDefinition()
                {
                    properties = properties
                };

                var cacheEntryOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromDays(1));
                _memoryCache.Set<ModelDataDefinition>(_cacheKey, definition, cacheEntryOptions);
            }

            return definition;
        }
    }
}