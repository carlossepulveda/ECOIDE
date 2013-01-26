<%-- 
    Document   : consultarProyectos
    Created on : Mar 27, 2012, 11:16:48 AM
    Author     : cas
--%>

<%@page import="org.w3c.dom.NodeList"%>
<%@page import="Util.ConverterJSON"%>
<%@page import="org.w3c.dom.Document"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page session="true"%>
<%
    Facade_WEBApplication fwa = (Facade_WEBApplication) request.getSession().getAttribute("fwa");

    if (fwa == null) {

%>
<jsp:forward page="../IDE/index.html"></jsp:forward>
<%    }


    if (!fwa.isValidSession()) {

%>

<jsp:forward page="../IDE/index.html"></jsp:forward>

<%        }

    String user = fwa.getUser();
    
    String admin=request.getParameter("admin");
    Document myP=null;
    int filter=Integer.parseInt(request.getParameter("filter"));
    int width=Integer.parseInt(request.getParameter("width"));
  
    if(admin.equals("yes")){
        if (!fwa.getTypeUser().equals("administrator")) {

        %>

        <jsp:forward page="../IDE/index.jsp"></jsp:forward>

        <%        
        }
        switch(filter){
            case 1:{//Todos los proyectos que se encuentran en el sistema
               myP= fwa.getProjects(); 
               break;
            }
            case 2:{//Todos los proyectos compartidos
               myP= fwa.getProjectsShared();
               break;
            }
            case 3:{//Todos los proyectos de un usuario
                user=request.getParameter("user");
               myP = fwa.getProgrammerProjectsXML_Filtered(user,1);
               break;
            }
        }
        
    }
    else{
        //filter 1=todos los proyectos asociados al usuario   2= los proyectos creados por el usuario
        //       3=los proyectos que le comparten al usuario  4= los proyectos que el usuario comparte
        myP = fwa.getProgrammerProjectsXML_Filtered(user,filter);
     
    }
    
    
    
    
    ConverterJSON cj = new ConverterJSON();
    String misProyectos = cj.myProjectsXMLtoJSON(myP);
   
    String html = "<br><table align=\"center\" border=\"1\" style=\"padding-left: 10px;\">";
    NodeList nl = myP.getDocumentElement().getChildNodes();
    int cant=width/80;
    for (int i = 0; i < nl.getLength(); i++) {  //recorre proyecto del usuario
        String iconoP = "";
        if (i == 0) {
            html += "<tr>";
        }
        
        if ((float) i % cant == 0 && i != 0) {
            html += "</tr><tr>";
        }

        if (myP.getElementsByTagName("shared").item(i).getTextContent().equals("yes")) {
            iconoP = "sharedFolder.png";
            if (myP.getElementsByTagName("owner").item(i).getTextContent().equals(user)) {
                iconoP = "mySharedFolder.png";
            }

        } else {
            iconoP = "myProject.png";
        }
        String ishare="";
        String renombrar="";
         if(!admin.equals("yes")){
            renombrar= "<div style=\"z-index:1001;width:20px;height:20px;display:none;\" id=\"oE"+i+"\" onclick=\"renombrarP(\'" + myP.getElementsByTagName("name").item(i).getTextContent() + "\',\'" + myP.getElementsByTagName("owner").item(i).getTextContent() + "\')\"><img src=\"../Images/SupportWindow/edit.png\" title=\"Renombrar\" alt=\"Renombrar\"/></div>";
         }
        if(myP.getElementsByTagName("owner").item(i).getTextContent().equals(fwa.getUser()))
            ishare="<div style=\"z-index:1001;width:20px;height:20px;display:none;\" id=\"oC"+i+"\" onclick=\"compartirP(\'" + myP.getElementsByTagName("name").item(i).getTextContent() + "\',\'" + myP.getElementsByTagName("owner").item(i).getTextContent() + "\')\"><img src=\"../Images/ContextualMenu/share.png\" title=\"Compartir\" alt=\"Compartir\"/></div>";
        html += "<td align=\"center\" style=\"width: 60px; height:60px;\"  id=\"tR"+myP.getElementsByTagName("name").item(i).getTextContent()+";"+myP.getElementsByTagName("owner").item(i).getTextContent()+"\">"
                + "<div align=\"center\" id=\""+i+"\" class=\"divP\" \" onhover=\"viewInfo(\'" + myP.getElementsByTagName("name").item(i).getTextContent() + "\',\'" + myP.getElementsByTagName("owner").item(i).getTextContent() + "\')\" onclick=\"viewInfo(\'" + myP.getElementsByTagName("name").item(i).getTextContent() + "\',\'" + myP.getElementsByTagName("owner").item(i).getTextContent() + "\')\" style=\"width: 80px; height:80px;padding-top:5px\">"
                +"<div style=\"float:right;\"><div style=\"z-index:1001;width:20px;height:20px;display:none;\" id=\"oR"+i+"\" onclick=\"eliminarP(\'" + myP.getElementsByTagName("name").item(i).getTextContent() + "\',\'" + myP.getElementsByTagName("owner").item(i).getTextContent() + "\')\"><img src=\"../Images/SupportWindow/close.png\" title=\"Eliminar\" alt=\"Eliminar\"/></div>"
                +renombrar
                + ishare
                + "</div>"
                + "<img align=\"center\" src=\"../Images/SupportWindow/" + iconoP + "\"/>"
                + "<input class=\"np\" id=\"t"+i+"\" align=\"center\" readonly=\"readonly\" type=\"text\" name=\"nameP\" value=\"" + myP.getElementsByTagName("name").item(i).getTextContent() + "\" size=\"8\" style=\"width: 70px;\"/>"
                + "</div>"
                + "</td>";

        if (i == nl.getLength() - 1) {
            html += "</tr>";
        } 

    }

    html += "</table>";
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
       
            var con=<%=misProyectos%>;
            var proyectos = con.Projects;
            var user='<%=user%>';
            var admin='<%=admin%>';
            var aux;
            var pMemory=null;
            var divPS='';
            var idPn;
         
                $(".divP").hover(
                  function () {
                    $('#oR'+$(this).attr("id")).show();
                    $('#oE'+$(this).attr("id")).show();
                    $('#oC'+$(this).attr("id")).show();
                    $('#t'+$(this).attr("id")).addClass("textNameP");
                  },
                  function () {
                     $('#oR'+$(this).attr("id")).hide();
                     $('#oE'+$(this).attr("id")).hide();
                     $('#oC'+$(this).attr("id")).hide();
                     $('#t'+$(this).attr("id")).removeClass("textNameP");
                  }
                );
                
                $(".divP").click(function(){
                    $(this).addClass("divPS");
                    if(divPS!=''){
                       $('#'+divPS).removeClass("divPS"); 
                    }
                    divPS=$(this).attr("id");
                });
           $('#campoBusquedaCorreo').keyup(function(event) {
                        filtrarUserByName($(this).val());

                });
            function filtrarUserByName(mail){
              
              aux=new Array();
              if(mail!=''){
                  for(var i in proyectos){
                      if(new RegExp("^(" + mail + "+)", "g").test(proyectos[i].name))
                          aux.push(proyectos[i]);
                     }
              }else{
                  aux=proyectos;
              }
              armarTabla(aux);
            }
            
            function refrescarTabla(){
              if(aux==usuarios)
                  armarTabla(usuarios);
              else{
                  if(aux.length==0)
                      armarTabla(usuarios);
                  else
                      armarTabla(aux);
              }
                  
          }
            
            function armarTabla(aux){
                var html='<br/><table>';
             

               var cant=parseInt($('#divTablaUser').css('width'))/80;
               for(var j in aux){
                 if (j == 0) {
                        html += "<tr>";
                    }

                    if (j % cant == 0 && j != 0) {
                        html += "</tr><tr>";
                    }  
                   var icono='';
                if (aux[j].shared=="yes") {
                    icono = "sharedFolder.png";
                    if (aux[j].owner==user) {
                        icono = "mySharedFolder.png";
                        }

                } else {
                    icono = "myProject.png";
                }
                var renombrar='';
                 if(admin!='yes'){
                     renombrar="<div style=\"z-index:1001;width:20px;height:20px;display:none;\" id=\"oE"+j+"\" onclick=\"renombrarP('" + aux[j].name + "','" + aux[j].owner + "')\"><img src=\"../Images/SupportWindow/edit.png\" title=\"Renombrar\" alt=\"Renombrar\"/></div>";
                 } 
                    html +="<td align=\"center\" style=\"width: 60px; height:60px;\"  id=\"tR"+aux[j].name+";"+aux[j].owner+"\">"
                + "<div align=\"center\" id=\""+j+"\" class=\"divP\" onclick=\"viewInfo('" + aux[j].name + "','" + aux[j].owner + "')\" style=\"width: 80px; height:80px;padding-top:5px\">\n"
                +"<div style=\"float:right;\"><div style='z-index:1001;width:20px;height:20px;display:none;' id='oR"+j+"' onclick=\"eliminarP('" + aux[j].name + "','" + aux[j].owner + "')\"><img src=\"../Images/SupportWindow/close.png\" title=\"Eliminar\" alt=\"Eliminar\"/></div>"
                +renombrar
                + "</div>"
                + "<img align=\"center\" src=\"../Images/SupportWindow/" + icono + "\"/>"
                + "<input class=\"np\" id=\"t"+j+"\" readonly=\"readonly\" type=\"text\" name=\"nameP\" value=\"" + aux[j].name + "\" size=\"8\" style=\"width: 70px;\"/>"
                + "</div>"
                + "</td>";
            
                if (j == aux.length - 1) {
                    html += "</tr>";
                }
               }
               html+='</table>';
              
               $('#divTablaUser').html(html);
                $(".divP").hover(
                  function () {
                    $('#oR'+$(this).attr("id")).show();
                    $('#oE'+$(this).attr("id")).show();
                    $('#oC'+$(this).attr("id")).show();
                    $('#t'+$(this).attr("id")).addClass("textNameP");
                  },
                  function () {
                     $('#oR'+$(this).attr("id")).hide();
                     $('#oE'+$(this).attr("id")).hide();
                     $('#oC'+$(this).attr("id")).hide();
                     $('#t'+$(this).attr("id")).removeClass("textNameP");
                  }
                );
                
                $(".divP").click(function(){
                    $(this).addClass("divPS");
                    if(divPS!=''){
                       $('#'+divPS).removeClass("divPS"); 
                    }
                    divPS=$(this).attr("id");
                });
            }
            function viewInfo(name,owner){
                var p;
                for(var i in proyectos){
                    if(proyectos[i].name==name && proyectos[i].owner==owner)
                    {p=proyectos[i];break;}
                }
                $("#itemDetalles").html("<br/>&nbsp;&nbsp;<b>Nombre</b> : "+p.name+"<br>&nbsp;&nbsp;<b>Propietario</b> : "+p.owner+"<br>&nbsp;&nbsp;<b>Compartido</b> : Si"+"<br>&nbsp;&nbsp;<b>Tipo</b> : "+p.type);
                //document.getElementById('seleccionP').value=p.name;
                pMemory=p;
            }
       
            function openProject(){
        
                if(pMemory==null)
                    jAlert('No ha seleccionado proyecto');
          
                abrirProyecto(pMemory.name,pMemory.owner,user,pMemory.type);
                pMemory=null;
                cerrarBox();
            }
            
            function eliminarP(name,owner){
                eliminarProyecto('Project;'+name+';'+owner);
            }
            
            function compartirP(name,owner){
                 abrirVentana('../IDE/uiCompartirProyecto.jsp?name='+name+'&owner='+owner+'&type=2','Compartir Proyecto',true);
            }
            
            function renombrarProyecto(nn){
                renombrarProyecto_(idPn,nn);
            }
            function renombrarP(name,owner){
                idPn='Project;'+name+';'+owner;
               // box("Renombrar Proyecto","../IDE/uiRenombrarProyecto.jsp");
               box("Propiedades del Proyecto","../IDE/uiPropiedadesProyecto.jsp?name="+name+'&owner='+owner+'&type=2');
            }
       
        </script>
    </head>


            <div style="height: 100%; width: 99%;position: relative;background-color: white;overflow: auto;margin: 0px 5px;">
                <div style="width: 100%;height: 40px;background-color: rgba(240,240,240,0.5);">
                    <div style="padding:10px 10px">
                        <label class='labelForm'>Filtrar por Nombre : </label>
                        <input class="inputForm" id="campoBusquedaCorreo" type="text" size="25" value="" style="width:200px;"/>
                    </div>
                </div>
                <div id="divTablaUser">
                    <%=html%>
                </div>
            </div>

   
    </div>
</html>