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

    
     if (!fwa.getTypeUser().equals("administrator")) {

%>

<jsp:forward page="../IDE/index.jsp"></jsp:forward>

<%        }
    
    
    String user = fwa.getUser();
    
    String admin=request.getParameter("admin");
    
    int filter= 0;
    
    try{
        filter=Integer.valueOf(request.getParameter("filter"));
    }catch(Exception e){
        %>

        <jsp:forward page="../IDE/index.jsp"></jsp:forward>

        <% 
    
    }
    
    Document myP=null;
    ConverterJSON cj = new ConverterJSON();
    String misUsuarios = "";
    switch(filter){
               case 1:{
                   myP=fwa.getProgrammers();
                   misUsuarios=cj.programmersXMLtoJSON(myP);
                   break;
               }
               case 2:{
                   myP=fwa.getProgrammersOnHold();
                   misUsuarios=cj.programmersOnHoldXMLtoJSON(myP);
                   break;
               }
    }
    
    
    
    int width=Integer.parseInt(request.getParameter("width"));
    int cant=width/80;
    
    
    String html = "<br><table align=\"center\" border=\"1\" style=\"padding-left: 10px;\">";
    NodeList nl = myP.getDocumentElement().getChildNodes();
    for (int i = 0; i < nl.getLength(); i++) {  //recorre proyecto del usuario
        String iconoP = "";
        if (i == 0) {
            html += "<tr>";
        }

        if ((float) i % cant == 0 && i != 0) {
            html += "</tr><tr>";
        }

        if(filter!=2)
            iconoP="user.png";
        else
            iconoP="userW.png";

        html += "<td align=\"center\" style=\"width: 60px; height:60px;\"  id=\"tR"+myP.getElementsByTagName("email").item(i).getTextContent()+"\">"
                + "<div align=\"center\" id=\""+i+"\" class=\"divP\" \" style=\"width: 80px; height:80px;padding-top:5px\" onclick=\"viewInfo('"+myP.getElementsByTagName("email").item(i).getTextContent()+"')\">"
                +"<div style=\"float:right;\"><div style=\"z-index:1001;width:20px;height:20px;display:none;\" id=\"oR"+i+"\" onclick=\"eliminarU('"+myP.getElementsByTagName("email").item(i).getTextContent()+"')\" ><img src=\"../Images/SupportWindow/close.png\" title=\"Eliminar\" alt=\"Eliminar\"/></div>"
                +"<div style=\"z-index:1001;width:20px;height:20px;display:none;\" id=\"oE"+i+"\"  onclick=\"verPU('"+myP.getElementsByTagName("email").item(i).getTextContent()+"')\" ><img src=\"../Images/SupportWindow/myProjects.png\" title=\"Ver Proyectos\" alt=\"Ver Proyectos\"/></div></div>"
                + "<img align=\"center\" src=\"../Images/SupportWindow/" + iconoP + "\"/>"
                + "<input class=\"np\" id=\"t"+i+"\" align=\"center\" readonly=\"readonly\" type=\"text\" name=\"nameP\" value=\"" + myP.getElementsByTagName("email").item(i).getTextContent() + "\" size=\"8\" style=\"width: 70px;\"/>"
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
       
      
            var con=<%=misUsuarios%>;
            var usuarios = con.Programmers;
            var filter=<%=filter%>
            var aux;
            var user='<%=user%>';
            var pMemory=null;
            var divPS='';
       
                $(".divP").hover(
                  function () {
                    $('#oR'+$(this).attr("id")).show();
                    if(filter!=2)
                    $('#oE'+$(this).attr("id")).show();
                    $('#t'+$(this).attr("id")).addClass("textNameP");
                  },
                  function () {
                     $('#oR'+$(this).attr("id")).hide();
                     $('#oE'+$(this).attr("id")).hide();
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
                        filtrarUserByMail($(this).val());
                });
            function filtrarUserByMail(mail){
              aux=new Array();          
              if(mail!=''){
                  for(var i in usuarios){
                      if(new RegExp("^(" + mail + "+)", "g").test(usuarios[i].email))
                          aux.push(usuarios[i]);
                     }
              }else{
                  aux=usuarios;
              }
             armarTablaUsuarios(aux);    
          }
          
          function refrescarTabla(){
              if(aux==usuarios)
                  armarTabla(usuarios);
              else{
                  if(aux.length==0)
                      armarTablaUsuarios(usuarios);
                  else
                      armarTablaUsuarios(aux);
              }
                  
          }
          
          function armarTablaUsuarios(aux){
              var html='<br/><table>';
              var icono='userW.png';
               if(filter!=2)
                    icono="user.png";

             var cant=parseInt($('#divTablaUser').css('width'))/80;
              
               for(var j in aux){
                   
                   if (j == 0) {
                        html += "<tr>";
                    }

                    if (j % cant == 0 && j != 0) {
                        html += "</tr><tr>";
                    } 
                   
                   
                    html += "<td align=\"center\" style=\"width: 60px; height:60px;\"  id=\"tR"+aux[j].email+"\">"
                + "<div align=\"center\" id=\""+j+"\" class=\"divP\" \" style=\"width: 80px; height:80px;padding-top:5px\" onclick=\"viewInfo('"+aux[j].email+"')\">"
                +"<div style=\"float:right;\"><div style=\"z-index:1001;width:20px;height:20px;display:none;\" id=\"oR"+j+"\" onclick=\"eliminarU('"+aux[j].email+"')\" ><img src=\"../Images/SupportWindow/close.png\" title=\"Eliminar\" alt=\"Eliminar\"/></div>"
                +"<div style=\"z-index:1001;width:20px;height:20px;display:none;\" id=\"oE"+j+"\"  onclick=\"verPU('"+aux[j].email+"')\" ><img src=\"../Images/SupportWindow/myProjects.png\" title=\"Renombrar\" alt=\"Renombrar\"/></div></div>"
                + "<img align=\"center\" src=\"../Images/SupportWindow/" + icono + "\"/>"
                + "<input class=\"np\" id=\"t"+j+"\" align=\"center\" readonly=\"readonly\" type=\"text\" name=\"nameP\" value=\"" + aux[j].email + "\" size=\"8\" style=\"width: 70px;\"/>"
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
                    if(filter!=2)
                    $('#oE'+$(this).attr("id")).show();
                    $('#t'+$(this).attr("id")).addClass("textNameP");
                  },
                  function () {
                     $('#oR'+$(this).attr("id")).hide();
                     $('#oE'+$(this).attr("id")).hide();
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
            function viewInfo(email){
                var p;
                for(var i in usuarios){
                    if(usuarios[i].email==email)
                    {p=usuarios[i];break;}
                }

                if(filter!=2){
                    $("#itemDetalles").html("<div align='center' class='divFoto'>\n\
                                         <img src='../photo/"+p.email+"/"+p.photo+"' style='display:none;' imgResizable='true' mw='102' mh='102'>\n\
                                    </div><br/>\n\
                                    &nbsp;&nbsp;<b>Email</b> : <input class='inputForm' type='text' size='7' value='"+p.email+"'/><br>&nbsp;\n\
                                    <b>Nombre</b> : <input class='inputForm' type='text' size='7' value='"+p.name+"'/><br>&nbsp;\n\
                                    <b>Suscripcion</b> : "+p.dateMembership+"<br>&nbsp;\n\
                                    <b>Ultimo ingreso</b> : "+p.lastEntry+"<br/>");
                   
                }else{
                    $("#itemDetalles").html("<div align='center' class='divFotoW'><img src='../Images/SupportWindow/userW.png'></div>&nbsp;&nbsp;<b>Email</b> : <input class='inputForm' type='text' size='7' value='"+p.email+"'/><br>&nbsp;&nbsp;<b>Nombre</b> : <input class='inputForm' type='text' size='7' value='"+p.name+"'/><br>");
                   
                }
                 resizeImages();
                pMemory=p;
            }
       
            function openProject(){
        
                if(pMemory==null)
                    jAlert('No ha seleccionado proyecto');
          
                abrirProyecto(pMemory.name,pMemory.owner,user,pMemory.type);
                pMemory=null;
                cerrarBox();
            }
            
            function eliminarU(email){
                if(filter!=2)
                    eliminarUsuario(email);
                else
                    eliminarUsuarioOnHold(email); 
            }
            
            function verPU(email){
                verProyectosUsuario(email);
            }
            
           
       
        </script>
    </head>


            <div style="height: 100%; width: 99%;position: relative;background-color: white;overflow: auto;margin: 0px 5px;">
                <div style="width: 100%;height: 40px;background-color: gainsboro;">
                    <div style="padding:10px 10px">
                        <label class='labelForm'>Filtrar por Correo : </label>
                        <input class="inputForm" id="campoBusquedaCorreo" type="text" size="25" value="" style="width:200px;"/>
                    </div>
                </div>
                <div id="divTablaUser">
                    <%=html%>
                </div>
                

            </div>

   
    </div>
</html>