<%-- 
    Document   : logout
    Created on : 6/12/2011, 08:30:38 AM
    Author     : cas
--%>

<%@page import="WEBApplication.Facade_WEBApplication"%>
<%@page contentType="text/plain" pageEncoding="UTF-8"%>
<%@page session="true"%>
<%

String answ="wrong";
  System.out.println("logaouttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt");
try{
    Facade_WEBApplication fwa=(Facade_WEBApplication)request.getSession().getAttribute("fwa");
                if(!fwa.isValidSession()){
                    request.getSession().invalidate();
                     System.out.println("sesion invelida IDE "+fwa);

                        %>

                        <jsp:forward page="../IDE/index.html"></jsp:forward>

                        <%
                }
    fwa.closeSession();
       }
catch(Exception e){System.out.println("excepcionnnnn");}
    
    request.getSession().invalidate();
    answ="ok";
%>
{"answ":"<%=answ%>"}

