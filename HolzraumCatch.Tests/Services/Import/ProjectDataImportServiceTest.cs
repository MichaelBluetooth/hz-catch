using System.IO;
using System.Reflection;
using HolzraumCatch.Models;
using HolzraumCatch.Services.CurrentUser;
using HolzraumCatch.Services.File;
using HolzraumCatch.Services.Import;
using HolzraumCatch.Tests.TestUtils;
using Moq;
using NUnit.Framework;

namespace HolzraumCatch.Tests.Services.Import
{
    public class ProjectDataImportServiceTest
    {
        private AppDbContext _ctx;
        private User _currentUser = new User()
        {
            id = 12345
        };
        private Mock<IFileService> _fileService;
        private Mock<ICurrentUserService> _currentUserService;
        private ProjectDataImportService _service;

        [SetUp]
        public void SetUp()
        {
            _fileService = new Mock<IFileService>();
            _currentUserService = new Mock<ICurrentUserService>();
            _currentUserService.Setup(p => p.CurrentUser).Returns(_currentUser);

            _ctx = TestDbContextFactory.GetContext();
            _service = new ProjectDataImportService(_ctx, _currentUserService.Object, _fileService.Object);
        }

        [Test]
        [Description("Assert that the importer can read csv data into the model")]
        public void importData()
        {
            string dir = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            using (TextReader reader = new StreamReader(Path.Combine(dir, "../../../Services/Import", "TestImportData.csv")))
            {
                Assert.DoesNotThrow(() =>
                {
                    _service.importModelData(12345, reader);
                });
            }
        }
    }
}