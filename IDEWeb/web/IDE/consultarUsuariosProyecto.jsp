<%-- 
    Document   : consultarUsuariosProyecto
    Created on : Apr 3, 2012, 9:24:41 PM
    Author     : cas
--%>

<%@page import="org.w3c.dom.NodeList"%>
<%@page import="java.util.ArrayList"%>
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

Document d=fwa.getUsersProject_(name, owner);

String answ="";

if(d==null){
    answ="{\"answ\":\"wrong\"}";
}else{
    
    NodeList nl=d.getDocumentElement().getChildNodes();
    answ="{\"answ\": \"ok\" , \"users\":[";
    String div="";
    for(int i=0;i<nl.getLength();i++){
        
        
        answ+="{ \"email\" : \""+d.getDocumentElement().getElementsByTagName("email").item(i).getTextContent() +"\"}"+div;
        div=",";
        
    }
    
    answ+="]}";
}


  %>
<%=answ%>