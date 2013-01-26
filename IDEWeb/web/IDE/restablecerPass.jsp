<%-- 
    Document   : restablecerPass
    Created on : Mar 29, 2012, 11:52:56 AM
    Author     : cas
--%>

<%@page import="org.w3c.dom.Document"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page session="true"%>
<%
    Facade_WEBApplication fwa = (Facade_WEBApplication) request.getSession().getAttribute("fwa");

    if (fwa == null) {

%>
<jsp:forward page="../IDE/index.html"></jsp:forward>
<%    }


    if (!fwa.isValidSession()) {

%>

<jsp:forward page="../IDE/index.html"></jsp:forward>

<%        }
    String user = fwa.getUser();

String np=request.getParameter("new");
String password=request.getParameter("pass");
String admin=request.getParameter("admin");
String answ="wrong";

if(!admin.equals("yes")){
    if(fwa.isValidPerson(user, password)){
        if(fwa.restorePassUser(np))
           answ="ok";
    }
  }
else{
    if(fwa.isValidAdmin(user, password)){
        if(fwa.restorePassUser(np))
           answ="ok";
    }
}
%>
{"answ":"<%=answ%>"}
