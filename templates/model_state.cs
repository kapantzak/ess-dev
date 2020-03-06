using eStudio.classes.CustomAttributes;
using eStudio.classes.HttpRequestsDataModels.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eStudio.classes.HttpRequestsDataModels.{{form.className}}
{
    [ExportToTypescript]
    public class State
    {
        public int? CurrentUserContactID { get; set; }
        public List<int> CurrentUserDepartments { get; set; }
        public List<int> UserRoles { get; set; }
        {{#if answers.formFilters}}
        public Datasources Datasources { get; set; }
        {{/if}}
        public Filters Filters { get; set; }
        public Results Results { get; set; }
    }
}