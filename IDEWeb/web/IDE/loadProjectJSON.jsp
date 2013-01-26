<%-- 
    Document   : loadProjectJSON
    Created on : 1/12/2011, 05:19:49 PM
    Author     : cas
--%>

<%@page import="Util.ConverterJSON"%>
<%@page import="org.w3c.dom.Document"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>
<%@page contentType="text/plain" pageEncoding="UTF-8"%>
<%@page session="true"%>
<%
String name=request.getParameter("name");
String owner=request.getParameter("owner");
        
Facade_WEBApplication fwa=(Facade_WEBApplication)request.getSession().getAttribute("fwa");
System.out.println("IDE "+fwa);
                if(fwa==null){
                    
                        %>
                            <jsp:forward page="../IDE/index.html"></jsp:forward>
                        <%

                }

String user=fwa.getUser();
                if(!fwa.isValidSession()){

                        %>

                        <jsp:forward page="../IDE/index.html"></jsp:forward>

                        <%
                }


fwa.loadProject(name, owner, user);
Document data=fwa.getDataProjectXML(name, owner);
Document pack=fwa.getPackagesProjectXML(name, owner);
Document classes=fwa.getClassesProjectXML(name,owner);
Document files=fwa.getOtherFilesProjectXML(name, owner);
Document libs=fwa.getLibsProjectXML(name,owner);
String mc=fwa.getMainClass(name, owner);
String type=fwa.getUserType(name, owner);
String imgL="lib.png";
String datosP="";
            datosP+="\"nombre\":   \""+data.getDocumentElement().getElementsByTagName("name").item(0).getTextContent()+"\"";

            datosP+=",\"propietario\":  \""+data.getDocumentElement().getElementsByTagName("owner").item(0).getTextContent()+"\"";

            datosP+=",\"fecha\":   \""+data.getDocumentElement().getElementsByTagName("date").item(0).getTextContent()+"\"";
            
            datosP+=",\"clase\":   \""+mc+"\",  \"type\" : \""+type+"\",";

String librerias="";

    for(int i=0; i<libs.getDocumentElement().getChildNodes().getLength();i++){
    
        String a=",";
        if(i==0)a="";
          librerias+=a+"{\"tipo\":\"LibrarieNode\",\"nombre\": \""+libs.getDocumentElement().getChildNodes().item(i).getAttributes().getNamedItem("name").getTextContent() +"\",\"imagen\":\""+imgL+"\"}";
        
    }

ConverterJSON cj=new ConverterJSON();          

String json="{      "
                + "\"Proyecto\":   { "
   
                                    +datosP
                                    
                                    + "\"src\":  ["
   
                                                  +cj.srcProjectXMLtoJSON(pack, classes, files)
   

                                                 + "] ,  "
                                                 
                                   + "\"libs\":  ["
   
                                                   +librerias
   

                                                 + "]   "
   

                                 + "}           "
   

          + "}";


System.out.println("este es el json"+json);

//var myJson = '{ "x": "Hello, World!", "y": [ 1, 2, 3] }';


%>


<%=json%>