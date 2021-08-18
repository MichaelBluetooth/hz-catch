using System.Collections.Generic;

namespace HolzraumCatch.Services.Functions
{
    public interface IHzFunctionService {
        ICollection<HzFunctionSummary> getFunctions();
        HzFunctionSummary createFunction(CreateHzFunction function);
    }
}