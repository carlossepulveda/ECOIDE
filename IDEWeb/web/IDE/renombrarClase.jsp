<%-- 
    Document   : renombrarClase
    Created on : 20/12/2011, 06:08:04 PM
    Author     : cas
--%>

<%@page import="org.w3c.dom.Document"%>
<%@page contentType="text/plain" pageEncoding="UTF-8"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>

<%

String name=request.getParameter("name");
String owner=request.getParameter("owner");
String nameC=request.getParameter("nameC");
String newNameC=request.getParameter("newname");
String nPackage=request.getParameter("nameP");
if(nPackage.equals("*.*"))nPackage="";

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


boolean d=fwa.renameClass(name, owner, nPackage, nameC, newNameC);
if(d) answ="ok";
    


%>
{"answ":"<%=answ%>"}
