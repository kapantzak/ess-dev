using eStudio.classes.CustomAttributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eStudio.classes.HttpRequestsDataModels.{{form.className}}
{    
    public class RequestParams
    {
        [RequestParamMap("cid")]
        public int? ContactID { get; set; }
    }
}