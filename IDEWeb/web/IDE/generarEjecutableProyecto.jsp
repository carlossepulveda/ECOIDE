<%-- 
    Document   : lipiarYConstruirProyecto
    Created on : Mar 8, 2012, 3:16:41 PM
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
Document r=fwa.cleanAndBuild(name,owner);
if(r!=null){
    answ=ConverterJSON.answsCompilerToJson(r);
       }
else{
    answ="{ \"answ\": \"wrong\" }";
}


%>
<%=answ%>
