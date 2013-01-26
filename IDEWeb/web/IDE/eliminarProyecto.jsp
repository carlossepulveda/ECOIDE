<%-- 
    Document   : eliminarProyecto
    Created on : 12/12/2011, 11:59:23 AM
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

String name=request.getParameter("name");
String owner=request.getParameter("owner");
int type=Integer.parseInt(request.getParameter("type"));
String answ="wrong";
switch(type){
       case 1:{
           if(fwa.deleteProject(name, owner))
            answ="ok";
           break;
       }
       case 2:{// es mandado a eliminar por un usuario que probablemente no tiene abierto dicho proyecto
           if(fwa.deleteProject_(name, owner))
            answ="ok";     
           break;
       }
}

%>
{"answ": "<%=answ%>"}
