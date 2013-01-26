<%-- 
    Document   : descargarProyecto
    Created on : Mar 9, 2012, 8:06:43 AM
    Author     : cas
--%>
<%@page import="Util.ConverterJSON"%>
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
String answ="wrong";
Document r=fwa.compressExecutableProject(name, owner);
if(r!=null){
    String res=r.getDocumentElement().getElementsByTagName("result").item(0).getAttributes().getNamedItem("answer").getTextContent();
    if(res.equals("true"))
          answ="{\"answ\": \"ok\", \"fileName\": \""+r.getDocumentElement().getElementsByTagName("result").item(0).getAttributes().getNamedItem("fileName").getTextContent()+"\"}";
       
    else{
            answ="{ \"answ\": \""+res+"\" }";
    }
   }
else{
    answ="{ \"answ\": \"wrong\" }";
}


%>
<%=answ%>