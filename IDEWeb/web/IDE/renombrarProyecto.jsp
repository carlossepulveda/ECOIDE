<%-- 
    Document   : renombrarProyecto
    Created on : 19/12/2011, 03:07:38 PM
    Author     : cas
--%>

<%@page import="org.w3c.dom.Document"%>
<%@page contentType="text/plain" pageEncoding="UTF-8"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>

<%

String name=request.getParameter("name");
String owner=request.getParameter("owner");
String newname=request.getParameter("newname");


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


int type=Integer.parseInt(request.getParameter("type"));
boolean d=false;
switch(type){
       case 1:{
           d=fwa.renameProject_(name, owner,newname);
           break;
       }
       case 2:{// es mandado a renombrar por un usuario que probablemente no tiene abierto dicho proyecto
           d=fwa.renameProject_(name, owner,newname);    
           break;
       }
       case 3:{// es mandado a renombrar por un usuario que probablemente no tiene abierto dicho proyecto
           
           fwa.setNameProject(name, owner,newname);  
           d=true;
           break;
       }
}
if(d) answ="ok";
    


%>
{"answ":"<%=answ%>"}