<%-- 
    Document   : eliminarFichero
    Created on : 21/12/2011, 08:22:15 AM
    Author     : cas
--%>

<%@page import="org.w3c.dom.Document"%>
<%@page contentType="text/plain" pageEncoding="UTF-8"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>

<%

String name=request.getParameter("name");
String owner=request.getParameter("owner");
String nameF=request.getParameter("nameF");
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


boolean d=fwa.deleteFile(name, owner, nPackage, nameF);
if(d) answ="ok";
    


%>
{"answ":"<%=answ%>"}
