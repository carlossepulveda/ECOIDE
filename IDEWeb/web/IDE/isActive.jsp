<%-- 
    Document   : isActive
    Created on : 6/12/2011, 09:46:10 AM
    Author     : cas
--%>

<%@page import="WEBApplication.Facade_WEBApplication"%>
<%@page contentType="text/plain" pageEncoding="UTF-8"%>
<%@page session="true"%>
<%

String answ="wrong";
System.out.println("Is active : fwa1: "+request.getSession().getAttribute("fwa")+"  "+request.getParameter("ran"));
if(request.getSession().getAttribute("fwa") !=null){
    
    if(((Facade_WEBApplication)request.getSession().getAttribute("fwa")).isValidSession())
    answ="ok";
    
}
System.out.println("Is active : fwa2: "+request.getSession().getAttribute("fwa"));
%>
{"answ":"<%=answ%>"}

