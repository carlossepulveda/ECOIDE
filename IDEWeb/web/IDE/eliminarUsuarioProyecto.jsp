<%-- 
    Document   : eliminarUsuario
    Created on : 9/02/2012, 07:25:05 AM
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
String owner=request.getParameter("owner");
String user=request.getParameter("user");
String answ="wrong";
if(fwa.deleteUserProject(name, owner,user))
    answ="ok";
%>
{"answ": "<%=answ%>"}

