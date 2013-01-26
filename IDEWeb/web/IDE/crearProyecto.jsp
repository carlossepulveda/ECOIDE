<%-- 
    Document   : crearProyecto
    Created on : 9/12/2011, 02:29:45 PM
    Author     : cas
--%>

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
String answ="wrong";
if(fwa.createProject(name))
    answ="ok";
%>
{"answ": "<%=answ%>"}