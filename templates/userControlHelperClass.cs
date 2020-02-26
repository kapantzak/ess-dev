using eStudio.classes.Helpers;
using eStudio.classes.HttpRequestsDataModels.{{form.className}};
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
        {{#if userControlHelper.mainData.storedProc.returnData.isDataSet}}
        public static DataSet GetInitialDataRaw({{userControlHelper.mainData.storedProc.methodParamsString}})
        {{else}}
        public static DataTable GetInitialDataRaw({{userControlHelper.mainData.storedProc.methodParamsString}})
        {{/if}}
        {
            {{#if userControlHelper.mainData.storedProc.returnData.isDataSet}}
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
                cmd.Parameters.AddWithValue("{{this.name}}", {{this.paramAssign}});
                {{/if}}                
                {{/each}}

                var da = new SqlDataAdapter();
                da.SelectCommand = cmd;

                {{#if userControlHelper.mainData.storedProc.returnData.isDataSet}}
                da.Fill(ds);
                return ds;                
                {{else}}
                da.Fill(dt);
                return dt;
                {{/if}}
            }
        }

        public static Data GetInitialData({{userControlHelper.mainData.storedProc.methodParamsString}})
        {
            var data = new Data();
            var dataRaw = GetInitialDataRaw({{userControlHelper.mainData.storedProc.methodPassParamsString}});

            {{#if userControlHelper.mainData.storedProc.returnData.isDataSet}}
            {{#each userControlHelper.mainData.storedProc.returnData.data}}
            if (dataRaw.Tables.Count > {{@index}})
                {{#if this.isPivot}}
                data.{{this.name}} = dataRaw.Tables[{{@index}}].PivotToObject<{{this.name}}>("{{this.key}}", "{{this.value}}");
                {{else}}
                data.{{this.name}} = dataRaw.Tables[1].DataTableToListNullable<{{this.name}}>();
                {{/if}}
            
            {{/each}}
            {{else}}
            {{#each userControlHelper.mainData.storedProc.returnData.data}}
            {{#if @first}}
            {{#if this.isPivot}}
            data.{{this.name}} = dataRaw.PivotToObject<{{this.name}}>("{{this.key}}", "{{this.value}}");
            {{else}}
            data.{{this.name}} = dataRaw.DataTableToListNullable<{{this.name}}>();
            {{/if}}
            {{/if}}
            {{/each}}
            {{/if}}
            
            return data;
        }
    }
}