<%-- 
    Document   : lipiarYConstruirProyecto
    Created on : Mar 8, 2012, 3:16:41 PM
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
String mainClass=fwa.getMainClass(name, owner);
if(mainClass==null || mainClass.isEmpty()){
    answ = "<xml><answ>noMain</answ></xml>";
} else {
    Document r=fwa.cleanAndBuild(name,owner);
if(r!=null){
    String rr="<answ>"+r.getElementsByTagName("result").item(0).getAttributes().getNamedItem("answer").getTextContent()+"</answ>";

        for(int i=0;i<r.getElementsByTagName("diagnostic").getLength();i++){
            if(i==0)rr+="<diagnostics>";
            String s=",";
            if(i==0)
                s="";
            rr+=s+"<diagnostic><message>"+r.getElementsByTagName("message").item(i).getTextContent()+"</message>"
                    + " <line>"+r.getElementsByTagName("line").item(i).getTextContent()+"</line>"
                    + "<kind>"+r.getElementsByTagName("kind").item(i).getTextContent()+"</kind>"
                    + "<source>"+r.getElementsByTagName("source").item(i).getTextContent()+"</source></diagnostic>";

            if(i==r.getElementsByTagName("diagnostic").getLength()-1)
                rr+="</diagnostics>";

        }
     answ="<xml>"+rr+"</xml>";
       }
    else{
        answ = "<xml><answ>wrong</answ></xml>";
    }
}

%>
<%=answ%>
