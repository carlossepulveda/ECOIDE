<%-- 
    Document   : eliminarUsuario
    Created on : 9/02/2012, 07:25:05 AM
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
String user=request.getParameter("user");
int type=Integer.parseInt(request.getParameter("type"));

String answ="wrong";
switch(type){
       case 1:{
           if(fwa.deleteViewProject(name, owner,user))
            answ="ok";
           break;
       }
       case 2:{// es mandado a eliminar por un usuario que probablemente no tiene abierto dicho proyecto
           if(fwa.deleteViewProject_(name, owner,user))
            answ="ok";     
           break;
       }
}
%>
{"answ": "<%=answ%>"}

