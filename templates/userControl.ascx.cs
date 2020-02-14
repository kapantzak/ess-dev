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
            this.SetInitialState();
        }

        private void SetInitialState()
        {
            var state = this.GetInitialState();
            Hidden_InitialState_{{form.name}}.Value = state.EncodeAndSerialize();
        }
        
        private State GetInitialState()
        {
            return new State
            {
                CurrentUserContactID = this.sp.eUser.User.ContactID,
                UserRoles = this.userRoles.GetAllRoles()
            };
        }
                        
        public void Localize()
        {
            AppHelper.BuildClientXStaticTranslations(new string[] {
                "selectcmb"                
            }, sp, this);

            AppHelper.LocalizeFiltersResultsMessages(this);
                        
            //lbLiteral.Text = Languages.Translate("TranslationKey");
        }
    }
}