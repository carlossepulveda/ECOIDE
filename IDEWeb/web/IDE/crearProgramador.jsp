<%-- 
    Document   : crearProgramador
    Created on : 9/12/2011, 01:37:16 PM
    Author     : cas
--%>

<%@page import="WEBApplication.Facade_WEBApplication"%>
<%@page contentType="text/plain" pageEncoding="UTF-8"%>
<%

String email=request.getParameter("email");
String answ="wrong";
Facade_WEBApplication fwa=new Facade_WEBApplication(request.getRealPath("").replace("/build/web","/web"),""); 
 if(fwa.createProgrammer(email))
     answ="ok";



%>
{"answ":"<%=answ%>"}
