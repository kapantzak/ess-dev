using eWebCore.AppConfig;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace eStudio.classes.UserControlHelpers
{
    public static class {{form.className}}
    {
        public static {{userControlHelper.mainData.storedProc.returnType}} GetInitialData({{userControlHelper.mainData.storedProc.methodParamsString}})
        {
            {{#if userControlHelper.mainData.storedProc.returnDataSet}}
            var ds = new DataSet("Data");            
            {{else}}
            var dt = new DataTable();
            {{/if}}
            using (var conn = new SqlConnection(sp.ConnString))
            {
                var cmd = new SqlCommand("{{userControlHelper.mainData.storedProc.name}}", conn);
                cmd.CommandTimeout = 300;
                cmd.CommandType = CommandType.StoredProcedure;

                {{#each userControlHelper.mainData.storedProc.params}}
                {{#if this.isNullable}}
                var {{this.paramName}}_val = {{this.paramName}} ?? (object)DBNull.Value;
                cmd.Parameters.AddWithValue("{{this.name}}", {{this.paramName}}_val);
                {{else}}
                cmd.Parameters.AddWithValue("{{this.name}}", {{this.paramName}});
                {{/if}}
                {{#if this.isNullable}}

                {{/if}}
                {{/each}}

                var da = new SqlDataAdapter();
                da.SelectCommand = cmd;

                {{#if userControlHelper.mainData.storedProc.returnDataSet}}
                da.Fill(ds);
                return ds;                
                {{else}}
                da.Fill(dt);
                return dt;
                {{/if}}
            }
        }
    }
}