<%-- 
    Document   : cerrarIDE
    Created on : Mar 8, 2012, 7:47:27 AM
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



boolean d=fwa.closeIDE();

String answ="{\"answ\":";
if(!d)
    answ+="\"wrong\"}";
else{

answ+="\"ok\"}";
}


%>
<%=answ%>