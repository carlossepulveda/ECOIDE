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
String nameL=request.getParameter("nameL");

String name2=request.getParameter("name2");
String owner2=request.getParameter("owner2");

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


boolean d=fwa.moveLibrarie(name, owner, nameL, name2, owner2, cut.equals("true"));
if(d) answ="ok";
    


%>
{"answ":"<%=answ%>"}
