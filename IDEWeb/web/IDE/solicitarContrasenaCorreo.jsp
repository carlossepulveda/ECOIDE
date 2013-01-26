<%-- 
    Document   : eliminarClaseGUI
    Created on : 17/01/2012, 11:13:11 AM
    Author     : cas
--%>

<%@page import="org.w3c.dom.Document"%>
<%@page contentType="text/plain" pageEncoding="UTF-8"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>

<%

Facade_WEBApplication fwa=new Facade_WEBApplication(request.getRealPath("").replace("/build/web","/web"),request.getSession().getId());

String answ="wrong";
boolean d=fwa.getPassToEmail(request.getParameter("email"));
if(d) answ="ok";
    


%>
{"answ":"<%=answ%>"}