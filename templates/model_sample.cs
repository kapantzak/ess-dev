using eStudio.classes.CustomAttributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eStudio.classes.HttpRequestsDataModels.{{form.className}}
{
    [ExportToTypescript]
    public class {{dataModel.name}}
    {
        {{#each dataModel.props}}
        public {{this.type}} {{this.name}} { get; set; }
        {{/each}}
    }
}