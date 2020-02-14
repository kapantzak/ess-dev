<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="{{form.name}}.ascx.cs" Inherits="eStudio.{{form.name}}" %>
<%@ Register Assembly="eWebCore" Namespace="eWebCore.UI.Controls" TagPrefix="cc1" %>
<%@ Register Assembly="Telerik.Web.UI" Namespace="Telerik.Web.UI" TagPrefix="telerik" %>

<div id="div_{{form.name}}">

    <asp:HiddenField ID="Hidden_InitialState_{{form.name}}" runat="server" ClientIDMode="Static" />
    
    <%--Filters--%>
    <div id="filtersHolder" runat="server" class="row" ClientIDMode="Static">
        <div id="filters" class="container-fluid"></div>
    </div>

    <%--No results--%>
    <div id="noResults"></div>

    <%--Results--%>
    <div id="divResults" class="row marginTop-lg" style="display:none;">    
        <div class="container-fluid">

            <%--Place content here--%>

        </div>    
    </div>

</div>


<%--Refference external javascript file--%>
<asp:Literal ID="lbControl_VersionedScript" runat="server" />