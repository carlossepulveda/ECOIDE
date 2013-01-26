<%-- 
    Document   : guardarGUI
    Created on : 23/01/2012, 06:37:39 AM
    Author     : cas
--%>

<%@page import="org.w3c.dom.Text"%>
<%@page import="FileManagerXML.Facade_FileManagerXML"%>
<%@page import="org.w3c.dom.Element"%>
<%@page import="org.w3c.dom.Document"%>
<%@page contentType="text/plain" pageEncoding="UTF-8"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>
<%

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

String info=request.getParameter("info");
Facade_FileManagerXML controlFileManagerXML=new Facade_FileManagerXML();
//division de lienzos æðđßcanvasßđðæ
String[] lienzos=info.split("æðđßcanvasßđðæ");
    for(String x:lienzos){
    //recorro cada canvas osea cada lienzo
        if(x.isEmpty())continue;
        String[] comp=x.split("æðđßcomponentßđðæ");
        String l=comp[0];
     
        String[] c=l.split("@:@");
        String np=c[0].split("=")[1];
        String op=c[1].split("=")[1];
        String pac=c[2].split("=")[1];
        if(pac.equals("*.*") || pac.equals("Default Package"))pac="";
        String name=c[3].split("=")[1];
        String[] dimension=c[4].split(";");
        String height=dimension[1].split("=")[1];
        String width=dimension[0].split("=")[1];
        
        controlFileManagerXML.crearXMLinMemory("form");
        Element canvas = controlFileManagerXML.getDocumentoXML().createElement("canvas"); //creamos un nuevo elemento en el XMLLLL
       
                    Element h = controlFileManagerXML.getDocumentoXML().createElement("height");
                    Text text = controlFileManagerXML.getDocumentoXML().createTextNode(""+height); //Ingresamos la info en xmlllllllllll
                    h.appendChild(text); //
                    canvas.appendChild(h);

                    Element w = controlFileManagerXML.getDocumentoXML().createElement("width");
                    Text textP = controlFileManagerXML.getDocumentoXML().createTextNode(""+width); //Ingresamos la info en xmlllllllllll
                    w.appendChild(textP); //
                    canvas.appendChild(w);

                    controlFileManagerXML.getDocumentoXML().getDocumentElement().appendChild(canvas); //pegamos el elemento hijo a la raiz
                   
                   Element components = controlFileManagerXML.getDocumentoXML().createElement("components"); //creamos un nuevo elemento en el XMLLLL
                   controlFileManagerXML.getDocumentoXML().getDocumentElement().appendChild(components);
                    
                   
        
        for(int i=1;i<comp.length;i++){
           
            String[] pComp=comp[i].split("æðđßfieldßđðæ");
            Element com = controlFileManagerXML.getDocumentoXML().createElement("component");
            String[] coordenadas=pComp[3].split(":")[1].split(";");
            String[] dimensionC=pComp[4].split(":")[1].split(";");
          
                    Element type = controlFileManagerXML.getDocumentoXML().createElement("type");
                    Text textType = controlFileManagerXML.getDocumentoXML().createTextNode(pComp[2].split("=")[1]); //Ingresamos la info en xmlllllllllll
                    type.appendChild(textType);
                    com.appendChild(type); //
                    
                    Element nameC = controlFileManagerXML.getDocumentoXML().createElement("name");
                    Text textName = controlFileManagerXML.getDocumentoXML().createTextNode(pComp[0].split("=")[1]); //Ingresamos la info en xmlllllllllll
                    nameC.appendChild(textName);
                    com.appendChild(nameC); //
                    
                    Element value = controlFileManagerXML.getDocumentoXML().createElement("value");
                    Text textValue = controlFileManagerXML.getDocumentoXML().createTextNode(pComp[0].split("=")[1]); //Ingresamos la info en xmlllllllllll
                    value.appendChild(textValue);
                    com.appendChild(value); //
                    
                    Element coorX = controlFileManagerXML.getDocumentoXML().createElement("x");
                    Text textX = controlFileManagerXML.getDocumentoXML().createTextNode(coordenadas[0].split("=")[1]); //Ingresamos la info en xmlllllllllll
                    coorX.appendChild(textX);
                    com.appendChild(coorX); //
                    
                    Element coorY = controlFileManagerXML.getDocumentoXML().createElement("y");
                    Text textY = controlFileManagerXML.getDocumentoXML().createTextNode(coordenadas[1].split("=")[1]); //Ingresamos la info en xmlllllllllll
                    coorY.appendChild(textY);
                    com.appendChild(coorY); //
                      
                    Element widthC = controlFileManagerXML.getDocumentoXML().createElement("width");
                    Text textW = controlFileManagerXML.getDocumentoXML().createTextNode(dimensionC[0].split("=")[1]); //Ingresamos la info en xmlllllllllll
                    widthC.appendChild(textW);
                    com.appendChild(widthC); //
                    
                    Element heightC = controlFileManagerXML.getDocumentoXML().createElement("height");
                    Text textH = controlFileManagerXML.getDocumentoXML().createTextNode(dimensionC[1].split("=")[1]); //Ingresamos la info en xmlllllllllll
                    heightC.appendChild(textH);
                    com.appendChild(heightC); //

                    components.appendChild(com);                           
        
        }
        
        fwa.saveGUIClass(np, op, pac, name, controlFileManagerXML.getDocumentoXML());
        
    
    }

%>
