<%-- 
    Document   : uiCompartirProyecto
    Created on : 7/02/2012, 11:08:14 AM
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

String name=request.getParameter("name");
String owner=request.getParameter("owner");
String type=request.getParameter("type");
boolean p=false;
if(owner.equals(fwa.getUser()))
    p=true;

%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="STYLESHEET" type="text/css" href="../CSS/SupportWindow/fieldSetForm.css"/>
        <title>Compartir proyecto</title>
        <script>
            
            
            var liSel='';
            var correos=new Array();
            var types=new Array();
            var nameP='<%=name%>';
            var ownerP='<%=owner%>';
            var ncon=0;
            
            
     
     
                
                function clickS(btn){
                     
                        if($(btn).attr('type')=='W'){
                            clickSwitch($(btn),$('#'+$(btn).attr('nid')+'strR'));
                            
                        }else{
                            clickSwitch($(btn),$('#'+$(btn).attr('nid')+'strW'));
                        }
                        $(btn).parent().parent().attr('type',$(btn).attr('type'));
                  }
    
         
                function addMail(){
             
                    var s=$('#textCorreoShare').val().split(';');
                    for(var i in s){
                        
                        if(s[i]!='' && s[i]!=undefined && s[i]!=null){
                          
                           if($.inArray(s[i], correos)){
                               $('#ulCorreoShare').append('<li  id="li'+s[i].toLowerCase()+'" onclick="seleccionar($(this))" type="R" class="listCorreos" style="width:90%;"><div style="float:right;list-style: none;margin-left:0px;" ><div class="botonNoSelect" type="W" id="'+ncon+'strW" nid="'+ncon+'" onclick="clickS(this)" style="float:right">Escritura</div><div class="botonDegradado" type="R" id="'+ncon+'strR" onclick="clickS(this)" style="float:left" nid="'+ncon+'">Lectura</div></div><div>'+s[i].toLowerCase()+'</div></li>');
                               correos['li'+s[i].toLowerCase()]=s[i].toLowerCase();
                              ncon++;
                            
                           }
                    }
                        
                    }
                $('#textCorreoShare').val('');
                }
            
                function deleteMail(){
                    
                    if(liSel!=''){
                        $(document.getElementById(liSel)).remove();
                        delete correos[liSel];
                    }
                }

          function compartir(){
                    var users='';var refresh=false;
                    for(var i in correos){
                        users+=correos[i]+';';
                    }
                    if(users==''){alert('Lista de correos vacia');return;}
                    var privilegios='';
                    $('.listCorreos').each(function(){
                        privilegios+=$(this).attr("type")+';';
                    });
                    $.get("../IDE/compartirProyecto.jsp?owner="+ownerP+"&name="+nameP+"&users="+users+'&type=<%=type%>&types='+privilegios,function(data){
                        
                        var answ=jsonParse(data);
                        if(answ.answ=='ok'){
                            for(var i in correos){
                                canalNotificaciones.emit("shareProject",{c:correos[i],u:user,p:nameP,s:idS});
                            }  
                            alert('Operacion exitosa');
                            if('<%=type%>'=='2'){
                             refrescarVista();
                             }
                            cerrarBox();
                        }
                        else{
                            if(answ.answ=='no'){
                                alert('Ud no permisos para compartir el proyecto');
                                cerrarBox();
                                return;
                            }
                            var f=answ.mails;
                            var msj='';
                            for(var i in f)
                                msj+='* '+f[i]+'\n';
                            
                            for(var i in correos){
                                for(var j in f){
                                   if(f[j]==correos[i])
                                       continue;
                                }
                                refresh=true;
                                canalNotificaciones.emit("shareProject",{c:correos[i],u:user,p:nameP});
                                
                            } 
                            if(refresh && '<%=type%>'=='2'){
                                refrescarVista();
                               
                            }
                            alert('Ocurrio un error al intentar compartir el proyecto con los siguientes usuarios: \n\n'+msj+'\n\nVerifique que los emails son correctos, y que\neste proyecto no se encuentre compartido ya con estos usuarios');
                        }
                        
                    }).error(function() {alert("Ocurrio un error");})
            
                }
           
           function seleccionar(e){

               if(liSel!=''){
                   $(document.getElementById(liSel)).css("background","none");
               }
                     
                liSel=e.attr('id');
                e.css("backgroundColor","yellow");
            }
                
                
                
          
            
            
        </script>
    </head>
    <body>
    
        <div id='formulario' style="width: 500px;">
            <fieldset class="fieldsetForm">
                <div>
                    <label class='labelForm'  >Nombre del proyecto :</label>
                    <input id="name" class='inputForm' type="text" name="name" readonly="readonly" value="<%=name%>-<%=owner%>" />                    
                </div>
                <div align="center"  style="height: 100px;overflow: auto;margin-top: 10px;border: 1px solid #a4bed4;">
                    <ul id="ulCorreoShare" align="center" style="margin-top: 10px;margin-right: 5px;width: 100%;"></ul>
                </div>
                <div align="center">
                    <input id="textCorreoShare" class='inputForm' type="text" name="name" value="" style="width: 400px;"/>   
                </div>
                <div align="center">
                    <label class='labelForm'  >Ingrese las direcciones de correo electronico separadas por ';'</label>
                </div>
                <div align="center">
                    <input id="botonAceptar" type="button" class="botonForm" value="Agregar" onclick="addMail()" />
                    <input id="botnCancelar" type="button" class="botonForm" value="Eliminar" onclick="deleteMail()" />
                    <input id="botnCancelar" type="button" class="botonForm" value="Compartir" onclick="compartir()" />
                </div>

            </fieldset>
        </div>
        <script>
            if(!<%=p%>)
                $('#formulario').html('No tiene permisos para realizar esta operacion');
            
        </script>
        
        
        
    </body>
</html>
