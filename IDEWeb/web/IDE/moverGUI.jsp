<%-- 
    Document   : moverClase
    Created on : 23/12/2011, 12:53:39 PM
    Author     : cas
--%>

<%@page import="org.w3c.dom.Document"%>
<%@page contentType="text/plain" pageEncoding="UTF-8"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>

<%

String name=request.getParameter("name1");
String owner=request.getParameter("owner1");
String nPackage=request.getParameter("pack1");
String nameC=request.getParameter("nameC");

String name2=request.getParameter("name2");
String owner2=request.getParameter("owner2");
String nPackage2=request.getParameter("pack2");

String cut=request.getParameter("cut");

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
if(nPackage2.equals("*.*"))
    nPackage2="";

boolean d=fwa.moveGUIClass(name,owner,nPackage,nameC,name2,owner2,nPackage2,cut.equals("true"));
if(d) answ="ok";
    


%>
{"answ":"<%=answ%>"}
