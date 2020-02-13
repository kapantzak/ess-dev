using eDbs;
using eStudio.classes;
using eStudio.classes.Helpers;
using eStudio.classes.HttpRequestsDataModels;
using eStudio.classes.SqlCommands;
using eWebCore.AppConfig;
using eWebCore.Language;
using eWebCore.Requests;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using Telerik.Web.UI;

namespace eStudio.Async
{    
    public class {{asyncHandler.name}} : essGenericHandler
    {

        private HttpContext context { get; set; }
        private SessionProvider sp { get; set; }
        private eDbs.DbeStudio dc { get; set; }

        public override void ProcessRequest(HttpContext context)
        {
            if (context.Session != null)
            {
                this.context = context;
                this.sp = (SessionProvider)context.Session[context.Session.SessionID];
                this.dc = new DbeStudio(sp.ConnString);

                string t = context.Request["t"];
                if (!string.IsNullOrEmpty(t))
                {
                    switch (t)
                    {
                        case "methodName":
                            this.MethodName();
                            break;
                    }
                }
            }
        }

        private void MethodName()
        {
            //
        }
    }
}