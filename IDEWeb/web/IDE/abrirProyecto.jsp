<%-- 
    Document   : abrirProyecto
    Created on : 5/12/2011, 07:51:59 AM
    Author     : cas
--%>


<%@page import="org.w3c.dom.NodeList"%>
<%@page import="Util.ConverterJSON"%>
<%@page import="org.w3c.dom.Document"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page session="true"%>
<%
System.out.println("\n\nllego a abrr proyectoooo--------------------------------------------\n\n");
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

String user=fwa.getUser();
Document myP=fwa.getProgrammerProjectsXML(user);
ConverterJSON cj=new ConverterJSON();
String misProyectos=cj.myProjectsXMLtoJSON(myP);

String html="<br><table align=\"center\" border=\"1\" style=\"padding-left: 10px;\">";
NodeList nl=myP.getDocumentElement().getChildNodes();

for(int i=0;i<nl.getLength();i++){  //recorre proyecto del usuario
    String iconoP="";
    if(i==0)
         html+="<tr>";
    
    if((float)i%5==0 && i!=0)
         html+="</tr><tr>";
 
        if(myP.getElementsByTagName("shared").item(i).getTextContent().equals("yes")){
            iconoP="sharedFolder.png";
            if(myP.getElementsByTagName("owner").item(i).getTextContent().equals(user)){iconoP="mySharedFolder.png";}
           
        }
        else{
            iconoP="myProject.png";
        }
 
    html+="<td align=\"center\" style=\"width: 60px; height:60px;\">"
            + "<div align=\"center\" class=\"divP\" \" onclick=\"viewInfo(\'"+myP.getElementsByTagName("name").item(i).getTextContent() +"\',\'"+myP.getElementsByTagName("owner").item(i).getTextContent()+"\')\" style=\"width: 80px; height:80px;padding-top:5px\">"
            + "<img align=\"center\" src=\"../Images/SupportWindow/"+iconoP+"\"/>"
            + "<input class=\"np\" align=\"center\" readonly=\"readonly\" type=\"text\" name=\"nameP\" value=\""+myP.getElementsByTagName("name").item(i).getTextContent()+"\" size=\"8\" style=\"width: 70px;\"/>" 
            +"</div>"
            + "</td>";
   
    if(i==nl.getLength()-1)
        html+="</tr>";
    
}

html+="</table>";
///style="width: 490px;height: 307px;"
%>
<!DOCTYPE html>
<html>
<head>
    
   <link rel="stylesheet" type="text/css" href="../CSS/SupportWindow/abrirProyecto.css"/>  
   <script type="text/javascript" src="../Scripts/json/json_sans_eval.js"/>
   <script type="text/javascript" src="../Scripts/jquery/jquery.min.js"></script> 
   <script  src="../Scripts/jquery/jquery-ui.min.js"></script>
   <script>
       
         
       var proyectos = jsonParse('<%=misProyectos%>').Projects;
       var user='<%=user%>';
       var pMemory=null;
       $(document).ready(function (){
        
       });
       function viewInfo(name,owner){
           var p;
           for(var i in proyectos){
               if(proyectos[i].name==name && proyectos[i].owner==owner)
                   {p=proyectos[i];break;}
           }
            $("#divD").html("<h5>&nbsp;<b><u>Descripcion</u></b></h5><br/>&nbsp;&nbsp;<b>Nombre</b> : "+p.name+"<br>&nbsp;&nbsp;<b>Propietario</b> : "+p.owner+"<br>&nbsp;&nbsp;<b>Compartido</b> : Si"+"<br>&nbsp;&nbsp;<b>Tipo</b> : "+p.type);
            document.getElementById('seleccionP').value=p.name;
            pMemory=p;
       }
       
       function openProject(){
        
           if(pMemory==null)
               jAlert('No ha seleccionado proyecto');
          
           abrirProyecto(pMemory.name,pMemory.owner,user,pMemory.type);
           pMemory=null;
           cerrarBox();
       }
       
   </script>
</head>

<div class="fondo">
    <br/>
                <div style="width: 490px;height: 180px;position: relative;margin: 0px auto;">
                    
                    <div style="height: 180px; width: 480px;position: relative;background-color: white;overflow: auto;margin: 0px 5px;">
                    
                        <%=html%>

                    </div>
                    
                </div>
    <br/>
                <div style="width: 490px;height: 130px;position: relative;">
                    <div id="divD" align="left" style="width: 480px;height: 130px;margin-left: 5px;font-size: 10;font-family: Arial;border-style: solid;border-width: 1px;border-color: gray;border-radius: 5px;
                    -moz-border-radius: 5px;
                    -webkit-border-radius: 5px;
                    -khtml-border-radius: 5px;">
                        
                    </div>                    
                </div>
    
                <div style="margin-top: 15px;width: 490px;height: 32px;position: relative;">
                    <div align="left" style="width: 310px;height: 28px;float: left;">Proyecto:&nbsp;<input type="text" name="seleccion" id="seleccionP" value="" readonly="readonly" style="width: 200px;"/></div>
                    <div align="right" style="width: 170px;height: 28px;float: right"><button onclick="openProject()">Aceptar</button><button onclick="cerrarBox()">Cancelar</button></div>
                </div>
    
</div>
</html>