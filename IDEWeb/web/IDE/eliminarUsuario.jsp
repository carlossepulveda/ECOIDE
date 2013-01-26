<%-- 
    Document   : eliminarUsuario
    Created on : Apr 11, 2012, 2:51:23 PM
    Author     : cas
--%>

<%@page import="org.w3c.dom.Document"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>
<%@page contentType="text/plain" pageEncoding="UTF-8"%>
<%@page session="true"%>
<%
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

if(!fwa.getTypeUser().equals("administrator")){
    
      
    %>
    
    <jsp:forward page="../IDE/index.html"></jsp:forward>
    
    <%
}
String name=request.getParameter("email");

int filter= 0;
    
    try{
        filter=Integer.valueOf(request.getParameter("filter"));
    }catch(Exception e){
        %>

        <jsp:forward page="../IDE/index.jsp"></jsp:forward>

        <% 
    
    }

String answ="wrong";
switch(filter){
       case 1:{
           if(fwa.deleteProgrammer(name))
             answ="ok";
           break;
       }
       case 2:{
           if(fwa.deleteProgrammerOnHold(name))
            answ="ok";
           break;      
      }
}

%>
{"answ": "<%=answ%>"}
