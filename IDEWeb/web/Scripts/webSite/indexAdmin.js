/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

             
            var canalNotificaciones=io.connect("http://"+window.configPorts.notificationServer+":"+window.configPorts.notificationPort);
            var vistaActual='';//
       $(document).ready(function (){
         
           resizeImages();
           
                $(".divMenuList").corner("top");//.parent().css('padding', '5px').corner("round 14px");
                $(".itemList").corner();
                
                canalNotificaciones.on('connect', function (data) {
                    canalNotificaciones.emit('conexionSession', {c:user,s:idS} );
                });
                               
                canalNotificaciones.on("recibirMsg", function(data)
                {
                       
                }); 
                canalNotificaciones.on('closeSession', function (data) {
                    //var xmlDoc = $.parseXML( data );
                    //var $xml = $( xmlDoc );
                    //if($xml.find('id').text()==user){
                    alert('Se ha iniciado otra session de esta cuenta en otro lugar');
                    location.href='../IDE/index.html?msj=se';//}
                });
                    
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
              
            
           
            
            }
                 
        );
    
       
            
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
        
   
                   
            function abrirVentana(url,title,con){
                       var r=Math.random()*99999999999;
                       var c='?';
                       if(con)c='&';
                       box(title,url+c+"ran="+r);
                   }
        


function verPerfil(){
    
  box_('cargando...','<div style="width:200px;height:100px;">Cargando...</div>');
 $("#itemDetalles").html("");
    $.get('../IDE/verPerfil.jsp',function(data){
        dhxLayout.cells("b").setText("Mi Perfil");
         $('#divDespligue').html(data);
         vistaActual='perfilUsuario';
          cerrarBox();
        }
    ).success(function() { cerrarBox(); })
  .error(function() { cerrarBox();dhxLayout.cells("b").setText("Error ...");alert("Ocurrio un error"); })
  .complete(function() { cerrarBox(); });
    
}

function verProyectos(){
 
 box_('cargando...','<div style="width:200px;height:100px;">Cargando...</div>');
 $("#itemDetalles").html("");
    $.get('../IDE/consultarProyectos.jsp?filter=1&admin=yes&width='+parseInt($('#divDespligue').css('width')),function(data){
        dhxLayout.cells("b").setText("Todos los Proyectos");
        $('#divDespligue').css('width')
         $('#divDespligue').html(data);
         vistaActual='verProyectosUsuario';
          cerrarBox();
     }).success(function() { cerrarBox(); })
  .error(function() { cerrarBox();dhxLayout.cells("b").setText("Error ...");alert("Ocurrio un error"); })
  .complete(function() { cerrarBox(); });
}

function verProyectosCompartidos(){
    box_('Cargando...','<div style="width:100px;height:100px;">Cargando...</div>');
    $("#itemDetalles").html("");
    $.get('../IDE/consultarProyectos.jsp?filter=2&admin=yes&width='+parseInt($('#divDespligue').css('width')),function(data){
        dhxLayout.cells("b").setText("Proyectos Compartidos");
         $('#divDespligue').html(data);
         vistaActual='verQCProyectosUsuario';
          cerrarBox();
        }
    ).success(function() { cerrarBox(); })
  .error(function() { cerrarBox();dhxLayout.cells("b").setText("Error ...");alert("Ocurrio un error"); })
  .complete(function() { cerrarBox(); });
}

function verUsuarios(){
    box_('Cargando...','<div style="width:100px;height:100px;">Cargando...</div>');
    $("#itemDetalles").html("");
    $.get('../IDE/consultarUsuarios.jsp?filter=1&admin=yes&width='+parseInt($('#divDespligue').css('width')),function(data){
        dhxLayout.cells("b").setText("Usuarios activos");
         $('#divDespligue').html(data);
         vistaActual='verQCProyectosUsuario';
          cerrarBox();
        }
    ).success(function() { cerrarBox(); })
  .error(function() { cerrarBox();dhxLayout.cells("b").setText("Error ...");alert("Ocurrio un error"); })
  .complete(function() { cerrarBox(); });
}

 function eliminarProyecto(id){
                      
                      var s=id.split(';');
                      if(user!=s[2]){
                          alert('No tiene permisos para realizar esta operacion');
                          return;
                      }
                      if (confirm('Desear eliminar el proyecto "'+s[1]+'"')){
                      
                      box_('cargando...','<div style="width:200px;height:100px;">Cargando...</div>');
                      
                      $.get("../IDE/eliminarProyecto.jsp?name="+s[1]+"&owner="+s[2]+"&type=2", function(data) {
                          
                             if(jsonParse(data).answ=="ok"){
                                  var msj='<xml><u>'+user+'</u><op>rui</op><data><m>eP</m><id>'+id+'</id></data></xml>';
                                  canalNotificaciones.emit("nuevoMsg",{c:s[1]+';'+s[2],msj:msj,u:user,s:idS}); 
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
                             }else{
                                 alert('No fue posible eliminar el proyecto '+s[1]+'-'+s[2]);
                             }
                          
                          
                      }).success(function() { cerrarBox(); })
                      .error(function() { cerrarBox();alert("Ocurrio un error"); })
                      .complete(function() { cerrarBox(); });       
                               
                      }       
                } 
                
function eliminarUsuario(id){
    if(confirm("¿ Realmente desea eliminar el usuario ' "+id+" ' ?")){
        box_('Cargando...','<div style="width:100px;height:100px;">Cargando...</div>');
        $.get('../IDE/eliminarUsuario.jsp?email='+id+"&filer=1",function(data){
            
             var r=jsonParse(data);
             if(r.answ!='ok'){
                alert('Error al intentar eliminar el usuario');         
             }else{
                 canalNotificaciones.emit("deleteUser",{u:id,c:user, s:idS}); 
                 $(document.getElementById('tR'+id)).remove();
                 eliminarUsuarioArray(id);
                 $("#itemDetalles").html('');
                 alert('Operacion exitosa !!!');
             }
        }).success(function() { cerrarBox(); })
                      .error(function() { cerrarBox();alert("Ocurrio un error"); })
                      .complete(function() { cerrarBox(); }); 
        
    }
}

function eliminarUsuarioOnHold(id){
    if(confirm("¿ Realmente desea eliminar el usuario en espera de activacion' "+id+" ' ?")){
       box_('Cargando...','<div style="width:100px;height:100px;">Cargando...</div>'); 
        $.get('../IDE/eliminarUsuario.jsp?email='+id+'&filter=2',function(data){
           
             var r=jsonParse(data);
             if(r.answ!='ok'){
                alert('Error al intentar eliminar el usuario en espera');         
             }else{ 
                 $(document.getElementById('tR'+id)).remove();
                 $("#itemDetalles").html('');
                 eliminarUsuarioArray(id)
                 alert('Operacion exitosa !!!');
             }
        }).success(function() { cerrarBox(); })
                      .error(function() { cerrarBox();alert("Ocurrio un error"); })
                      .complete(function() { cerrarBox(); }); 
        
    }
}

function eliminarUsuarioArray(id){
    for(var i in usuarios){
        if(usuarios[i].email==id)
            usuarios.splice(i,1);
    }
}

function verProyectosUsuario(email){
 
 box_('cargando...','<div style="width:200px;height:100px;">Cargando...</div>');
 $("#itemDetalles").html("");
    $.get('../IDE/consultarProyectos.jsp?filter=3&admin=yes&user='+email+'&width='+parseInt($('#divDespligue').css('width')),function(data){
        dhxLayout.cells("b").setText("Todos los Proyectos del usuario ' "+email+" '");
         $('#divDespligue').html(data);
         vistaActual='verProyectosXUsuario';
          cerrarBox();
        }
    ).success(function() { cerrarBox(); })
  .error(function() { cerrarBox();dhxLayout.cells("b").setText("Error ...");alert("Ocurrio un error"); })
  .complete(function() { cerrarBox(); });
}

function verUsuariosEspera(){
  box_('Cargando...','<div style="width:100px;height:100px;">Cargando...</div>');
    $("#itemDetalles").html("");
    $.get('../IDE/consultarUsuarios.jsp?filter=2&admin=yes&width='+parseInt($('#divDespligue').css('width')),function(data){
        dhxLayout.cells("b").setText("Usuarios en espera de activacion");
         $('#divDespligue').html(data);
         vistaActual='verQCProyectosUsuario';
          cerrarBox();
        }
    ).success(function() { cerrarBox(); })
  .error(function() { cerrarBox();dhxLayout.cells("b").setText("Error ...");alert("Ocurrio un error"); })
  .complete(function() { cerrarBox(); });
}

function InformeAcceso(){
  dhxLayout.cells("b").setText("Informes de acceso");
 $("#itemDetalles").html("");
 $('#divDespligue').html('<div style="height: 100%; width: 99%;position: relative;background-color: white;overflow: auto;margin: 0px 5px;">\n\
<div style="width: 100%;height: 40px;background-color: gainsboro;">\n\
<div style="padding:10px 10px">\n\
<label class="labelForm">Ultimo Ingreso antes de (dd/mm/aaaa) : </label>\n\
<input class="inputForm" id="campoBusquedaFecha" type="text" size="25" value="" style="width:200px;"/>\n\
</div>\n\
</div>\n\
<div id="divTablaUser"/>\n\
</div>');
 $('#campoBusquedaFecha').keypress(function(event) {return;});
 $( "#campoBusquedaFecha" ).datepicker({
     onSelect: function(dateText, inst) { verAccesosPorFecha($(this).val());},
     onClose: function(){box_('Cargando...','<div style="width:100px;height:100px;">Cargando...</div>');verAccesosPorFecha($(this).val());}
 });
 $.datepicker.regional['es'] = {
		closeText: 'Cerrar',
		prevText: '&#x3c;Ant',
		nextText: 'Sig&#x3e;',
		currentText: 'Hoy',
		monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
		'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
		monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
		'Jul','Ago','Sep','Oct','Nov','Dic'],
		dayNames: ['Domingo','Lunes','Martes','Mi&eacute;rcoles','Jueves','Viernes','S&aacute;bado'],
		dayNamesShort: ['Dom','Lun','Mar','Mi&eacute;','Juv','Vie','S&aacute;b'],
		dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','S&aacute;'],
		weekHeader: 'Sm',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['es']);
}

function verAccesosPorFecha(fecha){
 if(fecha=='' || fecha==null){cerrarBox();$('#divTablaUser').html('');return;}

$( "#campoBusquedaFecha" ).datepicker("hide");
var f=fecha.split('/');

$.get('../IDE/consultarIngresos.jsp?fecha='+fecha+'&admin=yes'+fecha+'&width='+parseInt($('#divTablaUser').css('width')),function(data){
   
    $('#divTablaUser').html(data);
    cerrarBox();
    
});
}

 function verAyuda(){
        box('Ayuda','../IDE/ayudaAdministrador.html');
 }


