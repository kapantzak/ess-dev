using eStudio.classes.CustomAttributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eStudio.classes.HttpRequestsDataModels.{{form.className}}
{ 
    [ExportToTypescript]
    public class Datasources
    {        
        [DoNotEncode]
        public string DepartmentsDatasourceJSON { get; set; }
        [DoNotEncode]
        public string GroupsDatasourceJSON { get; set; }        
    }
}