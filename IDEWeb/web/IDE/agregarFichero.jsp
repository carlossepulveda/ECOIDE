<%-- 
    Document   : agregarFichero
    Created on : 20/12/2011, 09:44:55 AM
    Author     : cas
--%>


<%@page import="org.w3c.dom.Document"%>
<%@page contentType="text/plain" pageEncoding="UTF-8"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>

<%

String name=request.getParameter("name");
String owner=request.getParameter("owner");
String nPackage=request.getParameter("nameP");
String nameF=request.getParameter("nameF");

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

if(nPackage.equals("*.*"))
    nPackage="";
boolean d=fwa.addNewFile(name, owner, nPackage, nameF);
if(d) answ="ok";
    


%>
{"answ":"<%=answ%>"}