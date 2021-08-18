using System;
using System.Collections.Generic;
using System.Linq;
using HolzraumCatch.Models;

namespace HolzraumCatch.Services.Functions
{
    public class HzFunctionService : IHzFunctionService
    {

        private readonly AppDbContext _ctx;

        public HzFunctionService(AppDbContext ctx)
        {
            _ctx = ctx;
        }

        public ICollection<HzFunctionSummary> getFunctions()
        {
            return _ctx.HzFunctions.ToList().Select(f => _toSummary(f)).ToList();
        }

        public HzFunctionSummary createFunction(CreateHzFunction function)
        {
            HzFunction func = _ctx.HzFunctions.Add(new HzFunction()
            {
                name = function.name,
                created = DateTime.UtcNow,
                lastUpdated = DateTime.UtcNow
            }).Entity;
            _ctx.SaveChanges();

            return _toSummary(func);
        }

        private HzFunctionSummary _toSummary(HzFunction f)
        {
            return new HzFunctionSummary()
            {
                id = f.id,
                name = f.name,
                created = f.created
            };
        }
    }
}