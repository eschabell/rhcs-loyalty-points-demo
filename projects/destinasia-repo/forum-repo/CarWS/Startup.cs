using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Text;

namespace aspnetcoreapp
{
    public class Startup
    {
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var randomString = new StringBuilder();
            var random = new Random();
            for (int i = 0; i < length; i++)
                randomString.Append(chars[random.Next(chars.Length)]);
            return randomString.ToString();
        }
        public void Configure(IApplicationBuilder app)
        {
            app.Run(context =>
            {
                string postData = new System.IO.StreamReader(context.Request.Body).ReadToEnd();
           
                if (postData=="") {   
                     Console.WriteLine("RECIBI:" + postData + "FIN");
                     context.Response.StatusCode=200;
                     return context.Response.WriteAsync("OK");}
               // CarReqWrapper reqw = JsonConvert.DeserializeObject<CarReqWrapper>(postData);
              //  CarReq req = reqw.CarReq;
                CarReq req = JsonConvert.DeserializeObject<CarReq>(postData);
                CarResp resp = new CarResp();

                resp.carCity=req.carCity;
                resp.carRentalCo=req.carRentalCo;
                resp.carStartDate=req.carStartDate;
                resp.carType=req.carType;
                resp.carDays=req.carDays;
                resp.carPrice= Math.Round((new Random().NextDouble()* (100-20)+20)*req.carDays,2);
                resp.carResCode=RandomString(6);
                resp.carResStatus= "OK";

              //  CarRespWrapper respw = new CarRespWrapper();
               // respw.CarResp = resp;                
                context.Response.ContentType = "application/json";
                return context.Response.WriteAsync(JsonConvert.SerializeObject(resp));
            });
        }
    }
}