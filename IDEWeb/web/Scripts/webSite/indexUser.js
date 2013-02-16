/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

             
            var canalNotificaciones=io.connect("http://"+window.configPorts.notificationServer+":"+window.configPorts.notificationPort);
            var vistaActual='';//
            var notificaciones=0;
            var misNotificaciones=new Array();
       $(document).ready(function (){
           
  
           
                $(".divMenuList").corner("top");//.parent().css('padding', '5px').corner("round 14px");
                $(".itemList").corner();
               
                
                canalNotificaciones.on('connect', function (data) {//alert('se conecto   '+user);
                   
                    canalNotificaciones.emit('conexionSession', {c:user,s:idS} );
                });
                               
                canalNotificaciones.on("recibirMsg", function(data)
                {
                    notificaciones++;
                    mostrarCNOT(notificaciones);
                       
                }); 
                
                canalNotificaciones.on('takeProject', function (data) {
              
                    notificaciones++;
                    mostrarCNOT(notificaciones);
                    var fecha=new Date() ;
                    misNotificaciones.push('El usuario: '+data.u+' , te ha compartido el proyecto '+data.p+'-'+data.u+'   '+fecha.getDate()+'/'+(fecha.getMonth() + 1)+'/'+fecha.getFullYear()+'   '+(fecha.getHours())+':'+(fecha.getMinutes())+':'+(fecha.getSeconds()));
              
              
                  });
                canalNotificaciones.on('deletedProject', function (data) {
                    notificaciones++;
                    deletedProject(data.p);
                    
                    mostrarCNOT(notificaciones);
                    var fecha=new Date() ;
                    misNotificaciones.push('Se ha eliminado el  proyecto '+data.p+'-'+data.u+'   '+fecha.getDate()+'/'+(fecha.getMonth() + 1)+'/'+fecha.getFullYear()+'   '+(fecha.getHours())+':'+(fecha.getMinutes())+':'+(fecha.getSeconds()));
                        
                   });
           
                canalNotificaciones.on('renamedProject', function (data) {
                  
                  notificaciones++;
                    mostrarCNOT(notificaciones);
                    var fecha=new Date() ;
                    misNotificaciones.push('Se ha renombrado el  proyecto '+data.p+'  a  : '+data.nn+';'+data.u+'   '+fecha.getDate()+'/'+(fecha.getMonth() + 1)+'/'+fecha.getFullYear()+'   '+(fecha.getHours())+':'+(fecha.getMinutes())+':'+(fecha.getSeconds()));

               });
               
               canalNotificaciones.on('changedUserPrivilege', function (data) {
               
                    notificaciones++;
                    mostrarCNOT(notificaciones);
                    var fecha=new Date() ;
                    var type;
                    if(data.t=='W')
                        type='Escritura';
                    else
                        type='Lectura';
                    misNotificaciones.push('Se han cambiado los privilegios del proyecto '+data.p+'-'+data.u+'  a  : '+type+'   '+fecha.getDate()+'/'+(fecha.getMonth() + 1)+'/'+fecha.getFullYear()+'   '+(fecha.getHours())+':'+(fecha.getMinutes())+':'+(fecha.getSeconds()));

               });
           
                canalNotificaciones.on('closeSession', function (data) {
                   // var xmlDoc = $.parseXML( data );
                   // var $xml = $( xmlDoc );alert($xml.find('id').text());
                   // if($xml.find('id').text()==user){
                    alert('Se ha iniciado otra session de esta cuenta en otro lugar  '+data);
                    location.href='../IDE/index.html?msj=se';//}
                });
                
                canalNotificaciones.on('deletedUser', function (data) {
                    alert('Su cuenta ha sido eliminada por el administrador.\nFue enviado a su correo un mensaje de notificacion');
                    location.href='../IDE/index.html';
                });
                 
              
                
              
              
              
             resizeImages();
            }
              
              
        );
            
function manejadorNotificaciones(data){
                      
            
                }
function manejadorNotificaciones_(xml){
                      
                    var data=$(xml).find('data');
                    var usuario=$xml.find('u').text();
                    switch  (data.find('m').text()){
                        
                        case 'cs':{///cerrar session
                                if(usuario==user){
                                    cerrarSession(data.find('idS').text(),usuario);
                                }
                                break;
                            }
                    }
                    
                    
                    
                }
function cerrarSession(ids){
                        if(ids==idS)return;

                        alert('Se ha iniciado otra session de esta cuenta en otro lugar');
                        location.href='../IDE/index.html?msj=se';
}
function mostrarCNOT(html){
    $('#cnot').attr('noti',notificaciones);
                 if(notificaciones>0){
                        var left =document.getElementById('i2').offsetLeft+15;
                        var top = document.getElementById('i2').offsetTop-15;

                        $('#cnot').html(html);
                        $('#cnot').css('display','block');
                        $('#cnot').css('top',top);
                        $('#cnot').css('left',left);
                        $('#cnot').css('position','absolute');
                 }
               }
function limpiarCNOT(){
                        $('#cnot').html('');
                        $('#cnot').css('display','none');
                        notificaciones=0;
                        $('#cnot').attr('noti','0');
                    }
function verNotificaciones(){
    $('#cnot').css('display','none');
    
                if(misNotificaciones.length>0){
                      
                         box_('Notificaciones','<div style="overflow:auto;"><ul>'+getHtmlNotificaciones()+'</ul></div>');
               
                    
                }
    limpiarCNOT();
    notificaciones=0;
     $('#cnot').attr('noti','0');
                         
          }
function getHtmlNotificaciones(){
                   var n='';
                   for(var i in misNotificaciones){
                       var back='';
                       if(i>=parseInt(misNotificaciones.length)-parseInt(notificaciones)){
                           back='background-color:rgba(255,255,0,0.4);';
                       }
                       n+='<li style="'+back+';border-width:1px;border-color:rgba(40,40,40,0.5);border-style:dotted">'+misNotificaciones[i]+'</li>';
                   }
                   return n;
               }  
function logout(){
                 
                $.get("../IDE/logout.jsp", function(data) {
                   
                    if(jsonParse(data).answ=='wrong'){
                        alert('No ha sido posible cerrar sesion,intente de nuevo');
                        
                    }
                    else
                        location.href='../IDE/index.html';
                       
                });
            }
function isActive(){
                 
              
            }
function getIDE(){
                            
                var r=Math.random()*92919394959;
                      
                window.location.href='../IDE/IDE.jsp?ran='+r;
           
            }
function uiCrearProyecto(){
                       abrirVentana("../IDE/uiCrearProyecto.jsp","Crear Proyecto",false);
                       
                   }
function crearProyecto(name){
                       $.get("../IDE/crearProyecto.jsp?name="+name, function(data) {
                           
                            if(jsonParse(data).answ=='wrong'){
                                alert('Error al intentar crear el proyecto');

                            }else{
                                alert('Proyecto creado exitosamente');
                                  refrescarVista();
                            }
                  
                     });
             }
function abrirVentana(url,title,con){
                       var r=Math.random()*99999999999;
                       var c='?';
                       if(con)c='&';
                       box(title,url+c+"ran="+r);
                   }
function verPerfil(){
  box_('cargando...','<div style="width:200px;height:100px;">Cargando...</div>');
 $("#itemDetalles").html("");
        dhxLayout.cells("b").setText("Mi Perfil");

   $("#divDespligue").html("<div id='cPerfil' style='width:35%;background-color:#B5CDE4;padding: 10px 10px 10px 10px;border-radius: 10px 10px 10px 10px;'></div>");
   
        
        $("#cPerfil").append("<fieldset class='fieldsetForm' id='fieldsetPerfil'/>");
        $('.fieldsetForm').css({
                        background: "none repeat scroll 0 0 #EBF4FB",
                        border: "2px solid #B7DDF2",
                        borderRadius: "7px 7px 7px 7px",
                        fontFamily: "Lucida Grande , Lucida Sans Unicode ,Verdana,Arial,Helvetica,sans-serif",
                        margin: 5,
                        padding: "0px 10px 15px 10px"
         });
         
         
         
        $("#fieldsetPerfil").append('<div align="center" id="divFotoPerfil" style="margin-top:10px;">\n\
                                        <div style="float:right;">\n\
                                            <div class="menuFotoPerfil" style="z-index:9999999999;width:20px;height:20px;display:none;">\n\
                                                <img src="../Images/SupportWindow/edit.png" title="Eliminar" alt="editar"/></div></div><div id="fotoUser"><img src="../Images/SupportWindow/userProgrammer.png"  class="imgR" imgResizable="true" mw="102" mh="102"/>\n\
                                            </div>\n\
                                        </div>');
    resizeImages();
                    
                $(".divP").click(function(){
                    $(this).addClass("divPS");
                    if(divPS!=''){
                       $('#'+divPS).removeClass("divPS"); 
                    }
                    divPS=$(this).attr("id");
                });
        
        $("#fieldsetPerfil").append('<div align="center" style="margin-bottom: 10px;margin-top:10px;">\n\
                                        <label class="labelForm">Email</label>\n\
                                        <input id="idEmailPerfil" readonly class="inputForm2" type="text" name="emailVariable" value="'+user+'" style="width:240px;"/>   \n\
                                    </div>');
    
        $("#fieldsetPerfil").append('<div align="center" style="margin-bottom: 10px;">\n\
                                        <label class="labelForm">Nombre</label>\n\
                                        <input id="idNamePerfil" readonly class="inputForm2" type="text" name="nameVariable" value="'+programmer.name+'" style="width:230px;"/>   \n\
                                    </div>');
    
        $("#fieldsetPerfil").append('<div align="center" style="">\n\
                                        <label class="labelForm">Suscripcion</label>\n\
                                        <input id="idSuscripcionPerfil" readonly class="inputForm2" type="text" name="dateMemberVariable" value="'+programmer.dateMembership+'" style="width:170px;"/>   \n\
                                    </div>');
    
    /**
        $("#fieldsetPerfil").append('<div align="right" style="margin-bottom: 10px;">\n\
                                        <label class="labelForm">Acerca de mi</label>\n\
                                        <textarea id="idAboutPerfil" rows="6" cols="20" name="aboutVariable">'+programmer.profile+'</textarea>   \n\
                                    </div>');**/
        $("#fieldsetPerfil").append('<div align="center" style="margin-bottom: 10px;">\n\
                                        <label class="labelForm" style="width:200px"><input id="botonAceptar" type="button" class="botonForm" value="Cambiar contraseña" onclick="restablecerPass()" style="width:300px" /> \n\
                                    </div>');
    
        
   $('#cPerfil').css({
               position:'absolute',
               left: ($("#divDespligue").width() - parseInt($('#cPerfil').css('width')))/2,
               top: 50
          });
   
 
  vistaActual='perfilUsuario';
  cerrarBox();

 
    
}
function deletedProject(nameOwner){
    switch(vistaActual){

       case 'verProyectosUsuario':{
             $(document.getElementById('tR'+nameOwner)).remove();
             break;
       }
       case 'verQMProyectosUsuario':{
            $(document.getElementById('tR'+nameOwner)).remove();
            break;
       }
        default:{
                return;
        }
   }
}
function verProyectos(){
 
 box_('cargando...','<div style="width:200px;height:100px;">Cargando...</div>');
 $("#itemDetalles").html("");
    $.get('../IDE/consultarProyectos.jsp?filter=1&admin=no&width='+parseInt($('#divDespligue').css('width')),function(data){
        dhxLayout.cells("b").setText("Todos los Proyectos");
         $('#divDespligue').html(data);
         vistaActual='verProyectosUsuario';
          cerrarBox();
        }
    ).success(function() {cerrarBox();})
  .error(function() {cerrarBox();dhxLayout.cells("b").setText("Error ...");alert("Ocurrio un error");})
  .complete(function() {cerrarBox();});
}
function verMisProyectos(){
   box_('cargando...','<div style="width:200px;height:100px;">Cargando...</div>');
   $("#itemDetalles").html("");
    $.get('../IDE/consultarProyectos.jsp?filter=2&admin=no&width='+parseInt($('#divDespligue').css('width')),function(data){
        dhxLayout.cells("b").setText("Mis Proyectos");
         $('#divDespligue').html(data);
          vistaActual='verMisProyectosUsuario';
          cerrarBox();
        }
    ).success(function() {cerrarBox();})
  .error(function() {cerrarBox();dhxLayout.cells("b").setText("Error ...");alert("Ocurrio un error");})
  .complete(function() {cerrarBox();});
}
function verQMProyectos(){
   box_('cargando...','<div style="width:200px;height:100px;">Cargando...</div>');
   $("#itemDetalles").html("");
    $.get('../IDE/consultarProyectos.jsp?filter=3&admin=no&width='+parseInt($('#divDespligue').css('width')),function(data){
        dhxLayout.cells("b").setText("Proyectos que me Comparten");
         $('#divDespligue').html(data);
         vistaActual='verQMProyectosUsuario';
          cerrarBox();
        }
    ).success(function() {cerrarBox();})
  .error(function() {cerrarBox();dhxLayout.cells("b").setText("Error ...");alert("Ocurrio un error");})
  .complete(function() {cerrarBox();});
}
function verQCProyectos(){
    box_('cargando...','<div style="width:200px;height:100px;">Cargando...</div>');
    $("#itemDetalles").html("");
    $.get('../IDE/consultarProyectos.jsp?filter=4&admin=no&width='+parseInt($('#divDespligue').css('width')),function(data){
        dhxLayout.cells("b").setText("Proyectos que Comparto");
         $('#divDespligue').html(data);
         vistaActual='verQCProyectosUsuario';
          cerrarBox();
        }
    ).success(function() {cerrarBox();})
  .error(function() {cerrarBox();dhxLayout.cells("b").setText("Error ...");alert("Ocurrio un error");})
  .complete(function() {cerrarBox();});
}
function eliminarProyecto(id){
                      
                      var s=id.split(';');
                      if(user!=s[2]){
                         if (confirm('Desear dejar de ver el proyecto "'+s[1]+'"')){
                         $.get("../IDE/eliminarVistaProyecto.jsp?name="+s[1]+"&owner="+s[2]+"&user="+user+"&type=2", function(data) {

                                     if(jsonParse(data).answ=="ok"){
                                          
                                          deletedProject(s[1]+';'+s[2]);
                                          
                                     }else{
                                         alert('Ocurrio un error al intentar eliminar vista el proyecto');
                                     }


                              });  
                         }
                     
                      }
                      else{
                      if (confirm('Desear eliminar el proyecto "'+s[1]+'"')){
                      
                      box_('cargando...','<div style="width:200px;height:100px;">Cargando...</div>');
                     
                      $.get("../IDE/consultarUsuariosProyecto.jsp?name="+s[1]+"&owner="+s[2]+"&type=2", function(dat) {
                          
                          var usrs=jsonParse(dat);
                          if(usrs.answ=="ok"){
                                  $.get("../IDE/eliminarProyecto.jsp?name="+s[1]+"&owner="+s[2]+"&type=2", function(data) {

                                         if(jsonParse(data).answ=="ok"){
                                             
                                             ///recorrer el array usrs.users    ---- usrs.users[i].email
                                             for(var i in usrs.users){
                                                 canalNotificaciones.emit("deleteProject",{p: s[1]+';'+s[2] , u: usrs.users[i].email,c: user, s:idS}); 
                                             }
                                       
                                             refrescarVista();
                                         }else{
                                             alert('No fue posible eliminar el proyecto '+s[1]+'-'+s[2]);
                                         }


                                  }).success(function() {cerrarBox();})
                                  .error(function() {cerrarBox();alert("Ocurrio un error");})
                                  .complete(function() {cerrarBox();});    
                          }
                      }).error(function() {cerrarBox();alert("Ocurrio un error");});
                      }
                      }
 }
function refrescarVista(){
     mostrarCNOT(notificaciones);
     switch(vistaActual){

                                                  case 'verProyectosUsuario':{
                                                          verProyectos();
                                                          break;
                                                      }
                                                  case 'verMisProyectosUsuario':{
                                                          verMisProyectos();
                                                          break;
                                                      }
                                                  case 'verQMProyectosUsuario':{
                                                          verQMProyectos();
                                                          break;
                                                      }
                                                  case 'verQCProyectosUsuario':{
                                                          verQCProyectos();
                                                          break;
                                                      }

                                              }
}             
function renombrarProyecto_Script_Index(id,nn,name){
                      var s=id.split(';');
                      if(user!=s[2]){
                          alert('No tiene permisos para realizar esta operacion');
                          return;
                      }
                      box_('cargando...','<div style="width:200px;height:100px;">Cargando...</div>');
                
                     $.get("../IDE/consultarUsuariosProyecto.jsp?name="+s[1]+"&owner="+s[2]+"&type=2", function(dat) {
                      var usrs=jsonParse(dat);
                          if(usrs.answ=="ok"){
                          $.get("../IDE/renombrarProyecto.jsp?name="+s[1]+"&owner="+s[2]+"&newname="+nn+"&type=2", function(data) {

                                 if(jsonParse(data).answ=="ok"){
                                     name=nn;
                                      ///recorrer el array usrs.users    ---- usrs.users[i].email
                                             for(var i in usrs.users){
                                                 canalNotificaciones.emit("renameProject",{p: s[1]+';'+s[2] , u: usrs.users[i].email , nn: nn, c:user, s:idS}); 
                                             }
                         /**             var msj='<xml><u>'+user+'</u><op>rui</op><data><m>rP</m><id>'+id+'</id><name>'+nn+'</name></data></xml>';
                                     canalNotificaciones.emit("nuevoMsg", {c:s[1]+';'+s[2],msj:msj} );**/
                                     refrescarVista();
                                 }else{
                                     alert('No fue posible renombrar el proyecto '+s[1]+'-'+s[2]);
                                 }


                          }).success(function() {cerrarBox();})
                          .error(function() {cerrarBox();alert("Ocurrio un error");})
                          .complete(function() {cerrarBox();});       
                          }
                     });
                            
                }               
function restablecerPass(){
   box('Restablecer Contrase\ña','../IDE/uiRestablecerPass.jsp?user='+user+'&admin=no');
 }
function editPhotoProfile(){
    var r=Math.random()*99999999999;    
    box("Cargar Foto","../IDE/uiCargarFoto.jsp?ran="+r);
                       
 }
function refreshPhoto(){
     $('#fotoInicioPresentacion').html('<img src="../photo/'+user+'/'+programmer.photo+'"  imgResizable="true" mw="50" mh="50"/>');
     $("#divFotoPerfil").html('<div align="center" id="divFotoPerfil" style="margin-top:10px;">\n\
                                        <div style="float:right;">\n\
                                            <div class="menuFotoPerfil" style="z-index:9999999999;width:20px;height:20px;display:none;"  onclick="editPhotoProfile()">\n\
                                                <img src="../Images/SupportWindow/edit.png" title="Eliminar" alt="editar"/></div></div><div id="fotoUser"><img src="../photo/'+user+'/'+programmer.photo+'"  class="imgR" imgResizable="true" mw="102" mh="102"/>\n\
                                            </div>\n\
                                        </div>');
     resizeImages();
      $('#fotoInicioPresentacion').show();
      $("#divFotoPerfil").show();
 }

 function dblclickProject(name,owner) {
     var r=Math.random()*92919394959;
     box_('Abriendo proyecto ... ','');
     $.get("../IDE/loadProjectJSON.jsp?name="+name+"&owner="+owner+"&user="+user)
     .done(function(){
         cerrarBox();
         window.location.href='../IDE/IDE.jsp?ran='+r;
     }).error(function(){
         cerrarBox();
         alert('Ocurrio un error al intentar abrir el proyecto');
     });
 }
 
 
 
