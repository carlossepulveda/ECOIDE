<%-- 
    Document   : renombrarPaquete
    Created on : 20/12/2011, 02:41:02 PM
    Author     : cas
--%>

<%@page import="org.w3c.dom.Document"%>
<%@page contentType="text/plain" pageEncoding="UTF-8"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>

<%

String name=request.getParameter("name");
String owner=request.getParameter("owner");
String newNameP=request.getParameter("newName");
String nPackage=request.getParameter("nameP");

String answ="wrong";


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


boolean d=fwa.renamePackage(name, owner, nPackage, newNameP);
if(d) answ="ok";
    


%>
{"answ":"<%=answ%>"}
