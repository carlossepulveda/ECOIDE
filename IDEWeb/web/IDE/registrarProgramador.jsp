<%-- 
    Document   : registrarProgramador
    Created on : 7/12/2011, 03:50:57 PM
    Author     : cas
--%>

<%@page import="WEBApplication.Facade_WEBApplication"%>
<%@page contentType="text/plain" pageEncoding="UTF-8"%>
<%

String name=request.getParameter("name");
String mail=request.getParameter("mail");
String password=request.getParameter("password");
String profile="";
String answ="wrong";

Facade_WEBApplication fwa=new Facade_WEBApplication(request.getRealPath("").replace("/build/web","/web"),""); 
 if(fwa.registerProgrammer(mail, name, profile,password))
     answ="ok";



%>
{"answ":"<%=answ%>"}