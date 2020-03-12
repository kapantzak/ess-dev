using eDbs;
using eStudio.classes;
using eStudio.classes.DatasourceHelpers;
using eStudio.classes.Exceptions;
using eStudio.classes.Helpers;
using eStudio.classes.HttpRequestsDataModels.{{form.className}};
using eStudio.classes.HttpRequestsDataModels.Generic;
using eStudio.classes.SqlCommands;
using eStudio.classes.UserGroups;
using eWebCore.Abstract;
using eWebCore.AppConfig;
using eWebCore.Attributes;
using eWebCore.Constants;
using eWebCore.Language;
using eWebCore.Requests;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web.UI;
using System.Web.UI.WebControls;
using Telerik.Web.UI;
using static eStudio.classes.Helpers.AdoHelper;
using eStudio.classes.UserControlHelpers;

namespace eStudio
{

    [UcEdition(1)]
    [UcName("{{form.name}}")]
    public partial class {{form.name}} : UcBase
    {

        private SessionProvider sp = null;
        private DbeStudio dc = null;
        private UserRoles userRoles = null;
        private AppRequest rq;        
        public RequestParams thisParams = null;
        {{#if answers.stateHelper}}
        private State state = null;
        {{/if}}

        protected void Page_Load(object sender, EventArgs e)
        {

            this.sp = (SessionProvider)Session[Session.SessionID];
            this.dc = new DbeStudio(sp.ConnString);
            this.userRoles = ((MainPageBase)(this.Page)).userRoles;
            this.rq = AppRequest.CreateRequestFromEncryptedQueryString(Request.QueryString[WebConst.QS_Encrypted]);

            if (this.thisParams == null)
                this.thisParams = AppHelper.ConvertDictionaryToObject<RequestParams>(this.rq.Params);

            if (!Page.IsPostBack)
            {
                this.InitApp();
                lbControl_VersionedScript.Text = AppHelper.GetVersionedScriptsTags(sender);
                this.Localize();
            }
        }


        // METHODS ==================================================================================== //

        private void InitApp()
        {
            new ChainedMethods()
                .AddBool(this.ValidateRequestParams)
                {{#if answers.stateHelper}}
                .AddBool(this.SetInitialState)
                .AddBool(this.CheckAllowAccess)
                {{/if}}
                .AddVoid(this.Localize)
                .Init();
        }

        private bool ValidateRequestParams()
        {
            // Add validation logic
            // if (this.thisParams == null)
            // {
            //     this.ToggleAccessMessage(true);
            //     return false;
            // }
            return true;
        }

        {{#if answers.stateHelper}}
        private bool CheckAllowAccess()
        {
            // Check access control from state --> this.state
            // if (false)
            // {
            //     this.ToggleAccessMessage(true, Languages.Translate("NoAccess"));
            //     return false;
            // }
            return true;
        }
        {{/if}}

        {{#if answers.stateHelper}}
        private bool SetInitialState()
        {
            var state = this.GetInitialState();
            if (state != null)
            {
                this.state = state;
                Hidden_InitialState_{{form.name}}.Value = state.EncodeAndSerialize();
                return true;
            }
            return false;            
        }

        private void ToggleAccessMessage(bool show, string message = "")
        {
            lbAccessMessage.Text = !string.IsNullOrWhiteSpace(message) ? message : Languages.Translate("NoAccess"); // Add translation
            mainContent.Visible = !show;
            accessMessageHolder.Visible = show;
        }
        
        private State GetInitialState()
        {
            {{# if answers.userControlHelper}}
            {{#each userControlHelper.mainData.storedProc.params}}
            var {{this.paramName}} = null;            
            {{/each}}
            
            {{#unless answers.formFilters}}
            Data data = null;
            try
            {
                data = {{form.className}}.GetInitialData({{userControlHelper.mainData.storedProc.methodPassParamsString}});
            }
            catch (Exception ex)
            {
                this.ToggleAccessMessage(true, ex.Message);
                return null;
            }

            {{/unless}}
            {{/if}}
            {{#if answers.formFilters}}
            Datasources datasources = null;
            try
            {
                datasources = this.GetDatasources();
            }
            catch (Exception ex)
            {
                this.ToggleAccessMessage(true, ex.Message);
                return null;
            }

            {{/if}}
            return new State
            {
                CurrentUserContactID = this.sp.eUser.User.ContactID,
                UserRoles = this.userRoles.GetAllRoles(),
                CurrentUserDepartments = this.GetCurrentUserDepartments(),
                {{#if answers.formFilters}}
                Datasources = datasources,
                {{else}}
                {{#if answers.userControlHelper}}
                {{#unless answers.formFilters}}
                Data = data
                {{/unless}}
                {{/if}}
                {{/if}}
            };
        }

        private List<int> GetCurrentUserDepartments()
        {
            var emp = new Employees(this.sp);
            return emp.GetDepartmentsOfEmployee(this.sp.eUser.User.ContactID);
        }

        {{#if answers.formFilters}}
        private Datasources GetDatasources()
        {
            return new Datasources
            {
                DepartmentsDatasourceJSON = JsonConvert.SerializeObject(AppHelper.ConvertTreeStructureToKendoDropDownTree(this.GetDepartmentsDatasource())),
                GroupsDatasourceJSON = JsonConvert.SerializeObject(AppHelper.ConvertTreeStructureToKendoDropDownTree(this.GetGroupsDatasource()))                
            };
        }

        private List<ITreeStructureData> GetDepartmentsDatasource()
        {            
            try
            {
                return DepartmentsDatasources.GetDepartmentsTree(this.sp, new int[] { 1005 }.ToList());
            }
            catch (CustomException ex)
            {
                RadScriptManager.RegisterStartupScript(this.Page, this.Page.GetType(), "GetDepartmentsTree.Error", $";console.warn('{ex.Message}');", true);
                return new List<ITreeStructureData>();
            }
        }

        private List<ITreeStructureData> GetGroupsDatasource()
        {            
            var viewAllRoles = new int[] { 1005 }.ToList();
            var scenarios = new List<UserGroupsScenario>();

            // Check if scenarios needed

            // scenarios.Add(new UserGroupsScenario
            // {
            //     ScenarioID = 11,
            //     Mode = ScenarioMode.View
            // });
            // scenarios.Add(new UserGroupsScenario
            // {
            //     ScenarioID = 12,
            //     Mode = ScenarioMode.Edit
            // });

            var userGroup = new UserGroup(viewAllRoles, scenarios, this.sp);
            var dt = userGroup.XD_GetUserGroups();
            if (dt.Rows.Count > 0)
            {
                return dt.AsEnumerable().Select(x => new ITreeStructureData
                {
                    ID = x.Field<int>("ID"),
                    Descr = x.Field<string>("Descr"),
                    ParentID = x.Field<int?>("ParentID")
                }).ToList();
            }
            return new List<ITreeStructureData>();
        }
        {{/if}}
        {{/if}}
                        
        public void Localize()
        {
            AppHelper.BuildClientXStaticTranslations(new string[] {
                "selectcmb"                
            }, sp, this);

            AppHelper.LocalizeFiltersResultsMessages(this);            
        }
    }
}