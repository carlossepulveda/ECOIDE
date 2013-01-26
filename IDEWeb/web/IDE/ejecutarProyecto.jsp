<%-- 
    Document   : ejecutarProyecto
    Created on : 15/12/2011, 09:54:36 AM
    Author     : cas
--%>

<%@page import="Util.ConverterJSON"%>
<%@page import="org.w3c.dom.Document"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>
<%@page contentType="text/plain" pageEncoding="UTF-8"%>
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

String respuesta="<h3>Respuesta ejecutar proyeto</h3><h5>";
String name=request.getParameter("name");
String owner=request.getParameter("owner");


String mainClass=fwa.getMainClass(name, owner);
if(mainClass==null || mainClass.isEmpty())
    mainClass="No Existe";

String answ="";
    if(mainClass.equals("No Existe")){
        answ="{\"answ\":\"noClass\"}";//
        
    }
Document res=fwa.executeProjectWEB(name, owner);
if(res.getDocumentElement().getElementsByTagName("return").item(0).getTextContent().equals("ok")){
 
   answ="{\"answ\":\"ok\", \"classe\":\""+res.getDocumentElement().getElementsByTagName("class").item(0).getTextContent()+"\","
           + "\"jar\": \""+res.getDocumentElement().getElementsByTagName("jar").item(0).getTextContent()+"\"}";
   
  

}
if(res.getDocumentElement().getElementsByTagName("return").item(0).getTextContent().equals("noMain")){
   
   answ="{\"answ\":\"noMain\"}";
   
  

}
if(res.getDocumentElement().getElementsByTagName("return").item(0).getTextContent().equals("noCompilation")){
   res.getDocumentElement().getElementsByTagName("result").item(0).getAttributes().getNamedItem("answer").setTextContent("noCompilation");
   answ=ConverterJSON.answsCompilerToJson(res);
   
  

}

    


  %>
<%=answ%>
