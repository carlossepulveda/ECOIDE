<%-- 
    Document   : abrirClase
    Created on : 19/12/2011, 07:24:24 AM
    Author     : cas
--%>


<%@page import="FileManagerXML.Facade_FileManagerXML"%>
<%@page import="org.w3c.dom.Document"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>
<%

String clase=request.getParameter("clase");
String paquete=request.getParameter("paquete");
if(paquete.equals("*.*"))paquete="";
String proyecto=request.getParameter("proyecto");
String propietario=request.getParameter("propietario");



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


Document d=fwa.getClassXML(proyecto, propietario, paquete, clase);
String answ;
if(d==null)
    answ="null";
else{
Facade_FileManagerXML fxml=new Facade_FileManagerXML();
fxml.setDocument(d);
answ=fxml.getDocumentHowString();
}


%>
<%=answ%>