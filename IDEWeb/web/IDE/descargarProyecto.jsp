<%-- 
    Document   : descargarProyecto
    Created on : Mar 9, 2012, 8:06:43 AM
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
boolean r=fwa.compressProject(name, owner);
if(r){
    answ="{\"answ\": \"ok\"}";
       }
else{
    answ="{ \"answ\": \"wrong\" }";
}


%>
<%=answ%>