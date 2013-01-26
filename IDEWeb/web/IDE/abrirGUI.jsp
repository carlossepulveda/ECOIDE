<%-- 
    Document   : abrirGUI
    Created on : 17/01/2012, 03:17:50 PM
    Author     : cas
--%>

<%@page import="Util.ConverterJSON"%>
<%@page import="org.w3c.dom.Document"%>
<%@page contentType="text/plain" pageEncoding="UTF-8"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>
<%

String clase=request.getParameter("clase");
String paquete=request.getParameter("paquete");
if(paquete.equals("*.*"))paquete="";
String proyecto=request.getParameter("proyecto");
String propietario=request.getParameter("propietario");
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


String d=fwa.getGUIClassJSON(proyecto, propietario, paquete, clase);
//ConverterJSON cj=new ConverterJSON();
if(d!=null)
   
    answ=d;///cj.formXMLtoJSON(d);
  


%>
<%=answ%>
