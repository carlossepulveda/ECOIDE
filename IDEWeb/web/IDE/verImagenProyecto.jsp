<%-- 
    Document   : verImagenProyecto
    Created on : Apr 16, 2012, 9:41:56 AM
    Author     : cas
--%>

<!DOCTYPE html>
<%@page import="org.w3c.dom.Document"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>

<%



Facade_WEBApplication fwa=(Facade_WEBApplication)request.getSession().getAttribute("fwa");

if(fwa==null){
    
%>
    <jsp:forward page="../IDE/index.html"></jsp:forward>
<%

}


if(!fwa.isValidSession()){
    
      
    %>
    
    <jsp:forward page="../IDE/index.html"></jsp:forward>
    
    <%
}

String imagen="";
String pack=request.getParameter("pack");
String nameF=request.getParameter("nameF");
String owner=request.getParameter("owner");
String nameP=request.getParameter("nameP");

if(pack.equals("*.*"))
    pack="";
Document d=fwa.getFileXML(nameP, owner, pack, nameF);

if(d!=null)
    imagen="../Users/"+owner+"/projects/"+nameP+"/src/"+d.getDocumentElement().getChildNodes().item(0).getTextContent();



%>
<jsp:forward page="<%=imagen%>"></jsp:forward>
