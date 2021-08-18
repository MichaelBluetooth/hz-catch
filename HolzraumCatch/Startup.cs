using System;
using System.Text;
using HolzraumCatch.Authentication;
using HolzraumCatch.Models;
using HolzraumCatch.Services.CurrentUser;
using HolzraumCatch.Services.File;
using HolzraumCatch.Services.Functions;
using HolzraumCatch.Services.Import;
using HolzraumCatch.Services.ModelDataUtils;
using HolzraumCatch.Services.ProjectMgt;
using HolzraumCatch.Services.UserUtils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;

namespace HolzraumCatch
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private static bool IsDevelopment => Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews()
                .AddNewtonsoftJson(options =>
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                );

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("AppDbContext"));


            JwtTokenConfig jwtTokenConfig;
            if (IsDevelopment)
            {
                jwtTokenConfig = Configuration.GetSection("jwtTokenConfig").Get<JwtTokenConfig>();
            }
            else
            {
                jwtTokenConfig = new JwtTokenConfig()
                {
                    Secret = Environment.GetEnvironmentVariable("SECRET"),
                    Issuer = Environment.GetEnvironmentVariable("ISSUER"),
                    Audience = Environment.GetEnvironmentVariable("AUDIENCE"),
                    AccessTokenExpiration = int.Parse(Environment.GetEnvironmentVariable("ACCESS_TOKEN_EXPIRATION")),
                    RefreshTokenExpiration = int.Parse(Environment.GetEnvironmentVariable("REFRESH_TOKEN_EXPIRATION")),
                };
            }
            services.AddSingleton(jwtTokenConfig);

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = true;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtTokenConfig.Secret)),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero

                    // ValidateIssuer = true,
                    // ValidIssuer = jwtTokenConfig.Issuer,
                    // ValidateIssuerSigningKey = true,
                    // IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtTokenConfig.Secret)),
                    // ValidAudience = jwtTokenConfig.Audience,
                    // ValidateAudience = true,
                    // ValidateLifetime = true,
                    // ClockSkew = TimeSpan.Zero
                };
            });

            services.AddHttpContextAccessor();
            services.AddSingleton<IJwtAuthManager, JwtAuthManager>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddHostedService<JwtRefreshTokenCache>();

            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<IFileService, FileService>();
            services.AddScoped<IProjectDataImportService, ProjectDataImportService>();
            services.AddScoped<IUserDetailsService, UserDetailsService>();
            services.AddScoped<IHzFunctionService, HzFunctionService>();
            services.AddScoped<IModelDataService, ModelDataService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
