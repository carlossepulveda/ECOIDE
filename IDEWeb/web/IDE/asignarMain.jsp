<%-- 
    Document   : asignarMain
    Created on : 14/02/2012, 07:39:19 AM
    Author     : cas
--%>



<%@page import="FileManagerXML.Facade_FileManagerXML"%>
<%@page import="org.w3c.dom.Document"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>
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

String clase=request.getParameter("clase");
String paquete=request.getParameter("pack");
String proyecto=request.getParameter("name");
String propietario=request.getParameter("owner");

if(paquete.equals("*.*"))paquete="";
if(clase.equals("*.*"))clase="";



boolean d=fwa.setMainClass(proyecto, propietario, clase, paquete);

String answ="{\"answ\":";
if(!d)
    answ+="\"wrong\"}";
else{

answ+="\"ok\"}";
}


%>
<%=answ%>