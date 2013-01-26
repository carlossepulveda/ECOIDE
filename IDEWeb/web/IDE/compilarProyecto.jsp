<%-- 
    Document   : compilarProyecto
    Created on : 14/12/2011, 03:22:19 PM
    Author     : cas
--%>

<%@page import="Util.ConverterJSON"%>
<%@page import="org.w3c.dom.Document"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>
<%@page contentType="text/plain" pageEncoding="UTF-8"%>
<%@page session="true"%>
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

String name=request.getParameter("name");
String owner=request.getParameter("owner");
String answ="wrong";
Document r=fwa.compileProject(name, owner);
if(r!=null){
    answ=ConverterJSON.answsCompilerToJson(r);
       }
else{
    answ="{ \"answ\": \"wrong\" }";
}


%>
<%=answ%>
