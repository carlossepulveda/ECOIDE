/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

window.guest=true;
                    var projectsMemory=new Array();
                   /// var projectsChannel=new Array();
                    var dhxLayout;
                    var layout1;
                    var idAux='';
                    var control_tree;
                    var control_tab;
                    
       var sN=window.configPorts.notificationServer;
       var pN=window.configPorts.notificationPort;
       var sT=window.configPorts.otServer;
       var pT=window.configPorts.otPort;
                    
     function cargarIDE(projectosA,w,h){
       
              
                dhxLayout = new dhtmlXLayoutObject("parentId", "3L");
                dhxLayout.setSkin('dhtmlx_custom');
                //dhxLayout.setImagePath('../Scripts/dhtmlxSuite/dhtmlxLayout/codebase/imgs/');
                dhxLayout.cells("b").setWidth(parseInt(w*0.8));
                
                dhxLayout.cells("c").setText("Output");
                dhxLayout.cells("c").attachObject("objIdOutput");
                dhxLayout.cells("c").setHeight(100);
                dhxLayout.cells("c").setWidth(parseInt(w*0.8));
                dhxLayout.attachEvent('onPanelResizeFinish',function(id){if(id=='a,b,c' || id=='b,c')resizeEditores();});
                
                dhxLayout.cells("a").setWidth(parseInt(w*0.2));
                layout1 = new dhtmlXLayoutObject(dhxLayout.cells("a"), "2E");
                layout1.cells("a").setText("Proyectos");
                layout1.cells("a").setWidth(100);
                layout1.cells("b").setText("Tablero de Notificaciones");
                layout1.cells("b").attachObject("objIdNotificador");
                layout1.cells("b").setWidth(100);
            
            
                
                cargarArbol( layout1.cells("a").attachTree());//function localizada en el script Control_Tree
               // control_tab=new Control_Tabs("objIdEditor");
               control_tab=new Control_Tabs(dhxLayout.cells("b").attachTabbar());
    
                 if(projectosA!='undefined' && projectosA!=undefined  && projectosA!=null && projectosA!=""){
                 
                     var projects=projectosA.split(';');
                     for(var i in projects){
                      
                      if(projects[i]!='undefined' && projects[i]!=undefined  && projects[i]!=null && projects[i]!=""){
                         var ap=projects[i].split(',');
                         abrirProyecto(ap[0],ap[1],ap[2],ap[3]);
                    }
               }
           }
                 
             
           canalNotificaciones.on('connect', function (data) {
                    canalNotificaciones.emit('conexionSession', {c:user,s:idS} );
                    setIconConexionState(true);
                });
                
           canalNotificaciones.on("recibirMsg", function(data){
                        manejadorNotificaciones(data);
           });
 
           canalNotificaciones.on('closeSession', function (data) {
              // var xmlDoc = $.parseXML( data );
              //      var $xml = $( xmlDoc );
              //      if($xml.find('id').text()==user){
                    alert('Se ha iniciado otra session de esta cuenta en otro lugar');
                      location.href='../IDE/index.html?msj=se';
              //      }
           });
           
           canalNotificaciones.on('deletedUser', function (data) {
                    alert('Su cuenta ha sido eliminada por el administrador.\nFue enviado a su correo un mensaje de notificacion');
                    location.href='../IDE/index.html';
                });
                
           canalNotificaciones.on('deletedProject', function (data) {
              eliminarProyectoRUI('ProjectNode;'+data.p,user);
              $.get("../IDE/cerrarProyecto.jsp?name="+s[0]+"&owner="+s[1], function(data){});
            
           });
           
           canalNotificaciones.on('renamedProject', function (data) {
   
              var s=data.p.split(';');
              $.get("../IDE/renombrarProyecto.jsp?name="+s[0]+"&owner="+s[1]+'&newname='+data.nn+'&type=3', function(data2) {
                  renombrarProyectoRUI('ProjectNode;'+data.p,data.nn);
                  manejadorTableroNotificaciones('Renombrar Proyecto: '+data.p+'-'+data.u,data.u);
              });
            
           });
           
           canalNotificaciones.on('changedUserPrivilege', function (data) {
             changeUserPrivilege(data.p,data.u,data.t); 
             manejadorTableroNotificaciones('Cambiar privilegio : '+data.p+'-'+data.u+'  tipo:  '+data.t,data.u);
            
           });
           
           canalNotificaciones.on('takeProject', function (data) {
              manejadorTableroNotificaciones('Compartir Proyecto: '+data.p+'-'+data.u,data.u);
           });
           
           canalNotificaciones.on('refreshdJava',function(data){
               control_tab.updatedJava(data);
           });
           canalNotificaciones.on('disconnect', function () {
               lostConexion();
           });
           cerrarBox();
     }
     

 function cargarLayouts(w,h){
    
    dhxLayout.cells("b").setWidth(parseInt(w*0.8));
    dhxLayout.cells("b").setHeight(parseInt(h*0.8));
    
    dhxLayout.cells("c").setWidth(parseInt(w*0.8));
    dhxLayout.cells("c").setHeight(parseInt(h*0.2));
    
    dhxLayout.cells("a").setWidth(parseInt(w*0.2));
    layout1.cells("a").setHeight(parseInt(h*0.7));
    layout1.cells("b").setHeight(parseInt(h*0.3));
    dhxLayout.setSizes();
   
 }
     
                   function haveProject(name,owner){
                       
                        for(var i in projectsMemory){
                            if(projectsMemory[i].nombre==name && projectsMemory[i].propietario==owner)return true;
                        }
                        return false;
                    }
                   function getProject(name,owner){
                       
                        for(var i in projectsMemory){
                            if(projectsMemory[i].nombre==name && projectsMemory[i].propietario==owner)return projectsMemory[i];
                        }
                        return null;
                    }
                   function popProject(name,owner){
                       
                        for(var i in projectsMemory){
                            if(projectsMemory[i].nombre==name && projectsMemory[i].propietario==owner){
                                delete projectsMemory[i];
                                return true;
                            }

                        }
                        return false;
                    }
                    
                
                    
                   function loadNode(idRoot,nombreYpropietario,json){
                       if(json==null)return true;
                       if(json=='undefined')return true;
                       if(json.nombre=='undefined')return true;
                       if(json.nombre==null)return true;
                       
                        tree.insertNewChild(idRoot, json.tipo+";"+nombreYpropietario+";*.*:"+json.nombre ,json.nombre ,null ,json.imagen,json.imagen,json.imagen);
                       
                        if(json.ficheros!=null){
                                       var ficheros=json.ficheros;
                                       for (var i in  ficheros){
                                           if(ficheros[i]==null)return true;
                                           if(ficheros[i]=='undefined')return true;
                                           if(ficheros[i].nombre=='undefined')return true;
                                           if(ficheros[i].nombre==null)return true;
                                          
                                           tree.insertNewChild(json.tipo+";"+nombreYpropietario+";*.*:"+json.nombre, //id padree
                                                                ficheros[i].tipo+";"+nombreYpropietario+";"+json.nombre+":"+ficheros[i].nombre ,//id
                                                                ficheros[i].nombre ,//nombre
                                                                null ,
                                                                ficheros[i].imagen,ficheros[i].imagen,ficheros[i].imagen);
                                          
                                       }
                         }
                        
                        
                    }
               
                   function loadTree(){
                       
                        document.getElementById('loading').style.display='block';
                        document.getElementById('loading').style.zIndex=5;
                        
                          $.get('loadProjectXML.jsp', function(data) {
                                tree.deleteItem("MainNode");
                                tree.loadXMLString(data,function(){document.getElementById('loading').style.display='none';
                                document.getElementById('loading').style.zIndex=-1;});
                                    
                                    
                                });
              
        
                    }
 
 
 
                   function verChats(){
                        
                         if(projectsMemory.length==0){
                           alert('No hay proyectos abiertos para abrir su respectivo chat');
                           return;
                       }
                       abrirVentana("../IDE/uiChats.jsp","Ver chats",false);
                    }
 
 
                   function generarEjecutableProyectos(){
                       
                       if(projectsMemory.length==0){
                           alert('No hay proyectos abiertos para generar ejecutable (.jar)');
                           return;
                       }
                       abrirVentana("../IDE/uiGenerarEjecutableProyectos.jsp","Generar Ejecutable Proyectos",false);
                   }
                   
                   function generarEjecutableProyecto(id){
                        var s=id.split(';');
                      
                          $.get("../IDE/generarEjecutableProyecto.jsp?name="+s[1]+"&owner="+s[2], function(data) {

                                var r = jsonParse(data).answ;
                                var d= jsonParse(data).diagnostic;
                                var msj='';
                                for(var i in d){
                                   msj+="<br/><div style='background-color: green;border-style:solid;'><h6>Tipo</h6>:"+d[i].kind+"<br/><h6>Fuente</h6>:"+d[i].source+"<br/><h6>Linea</h6>:"+d[i].line+"<br/><h6>Mensaje</h6>:"+d[i].message+"</div>"; 
                                }
                                $("#objIdOutput").html("<h5>Resultado generacion de ejecutable</h5> : "+r+"<br/>"+msj);

                          }); 
                            
                            
                   }
                   
                   function descargarProyectos(){
                       if(projectsMemory.length==0){
                           alert('No hay proyectos abiertos Descargar');
                           return;
                       }
                       abrirVentana("../IDE/uiDescargarProyectos.jsp","Descargar Proyectos",false);
                   }
                   function descargarProyecto(id){
                       
                       var s=id.split(';');
                      
                          $.get("../IDE/descargarProyecto.jsp?name="+s[1]+"&owner="+s[2], function(data) {

                                var r = jsonParse(data).answ;
                               if(r=='ok'){
                                   window.open('../Users/'+user+'/temporal/'+s[1]+'-'+s[2]+'/'+s[1]+'_'+s[2]+'.zip','Descarga proyecto: '+s[1],'width=700,height=550,menubar=0,scrollbars=0,toolbar=0,directories=0,resizable=0,top=0,left=0');
                               }
                               else{
                                   alert('Error al generar el zip');
                               }

                          }); 
                      
                   }
                   
                   function descargarEjecutableProyectos(){
                       if(projectsMemory.length==0){
                           alert('No hay proyectos abiertos Descargar');
                           return;
                       }
                       abrirVentana("../IDE/uiDescargarEjecutableProyectos.jsp","Descargar Proyectos",false);
                   }
                   function descargarEjecutableProyecto(id){
                       
                       var s=id.split(';');
                      
                          $.get("../IDE/descargarEjecutableProyecto.jsp?name="+s[1]+"&owner="+s[2], function(data) {

                                var json=jsonParse(data)
                                var r = jsonParse(data).answ;
                               if(r=='ok'){
                                    window.open('../Users/'+user+'/temporal/'+s[1]+'-'+s[2]+'/'+s[1]+'_'+s[2]+'_JAR.zip','Descarga proyecto: '+s[1],'width=700,height=550,menubar=0,scrollbars=0,toolbar=0,directories=0,resizable=0,top=0,left=0');
                               }
                               else{
                                   alert(r)
                                   if(r=='false')
                                        alert('Ud no ha generado un archivo ejecutable para su proyecto, para hacer haga click en "Generar Ejecutable"');
                                    else
                                        alert('Ocurrio un error interno al intentar comprimir el ejecutable del proyecto');
                               }

                          }); 
                      
                   }
                   
                   function compilarProyectos(){
                       if(projectsMemory.length==0){
                           alert('No hay proyectos abiertos para compilar');
                           return;
                       }
                       abrirVentana("../IDE/uiCompilarProyectos.jsp","Compilar Proyectos",false);
                   }
                   function compilarProyecto(id){
                            
                      var s=id.split(';');
                      
                          $.get("../IDE/compilarProyecto.jsp?name="+s[1]+"&owner="+s[2], function(data) {
                                console.log('respuestade compilar: '+data);
                                var r = jsonParse(data).answ;
                                var diag=jsonParse(data).diagnostic;alert(diag);
                                var msj=construirMensajeCompilacion(diag,s[1],s[2]);
                                $("#objIdOutput").html("<div class='compilationTitle' align='center' style='margin-top:5px'>Resultado compilacion del proyecto:  "+s[1]+"-"+s[2]+" :  "+r+"</div><br/>"+msj);
                            
                               if(r=="true"){
                                    alert('El proceso de compilacion del proyecto "'+s[1]+'-'+s[2]+'" fue exitoso');
                                    return false;
                                }
                                if(diag.lenght!=0)
                                    alert('El proceso de la compilacion del proyecto "'+s[1]+'-'+s[2]+'" arrojo errores o advertencias');
                                else
                                    alert('El proceso de compilacion del proyecto "'+s[1]+'-'+s[2]+'" fue exitoso');
                          }); 
                            
                            
                            
                        }
                        
                   function uiCrearProyecto(){
                       abrirVentana("../IDE/uiCrearProyecto.jsp","Crear Proyecto",false);
                       
                   }
                   
                   function crearProyecto(name){
                       $.get("../IDE/crearProyecto.jsp?name="+name, function(data) {
                           
                            if(jsonParse(data).answ=='wrong'){
                                alert('Error al intentar crear el proyecto');

                            }else{
                                abrirProyecto(name,user,user,'Write');
                                alert('Proyecto creado exitosamente');
                                
                            }
                  
                     });
                   }
                   
                   function ejecutarProyectos(){
                       if(projectsMemory.length==0){
                           alert('No hay proyectos abiertos para ejecutar');
                           return;
                       }
                       abrirVentana("../IDE/uiEjecutarProyecto.jsp","Ejecutar Proyectos",false);
                   }
                   
                   function construirMensajeCompilacion(d,name,owner){
                      var ae=new Array();
                        if(window.errorCA!=null && window.errorCA.lenght!=0){
                           for(var i in window.errorCA){
                                   window.errorCA[i].e.getSession().removeMarker( window.errorCA[i].mar);
                                   ae.push(i);
                           }
                        }
                     window.errorCA=new Array();
                     var msj='';
                     console.log('impresion de d: '+JSON.stringify(d));
                     for(var i in d){
                         msj+="<div class='itemErrorCompilacion' onclick=\"irErrorCompilacion('"+d[i].source+"','"+d[i].line+"','"+name+"','"+owner+"','"+d[i].kind+"')\"><div>Tipo : "+d[i].kind+"</div><div>Fuente : "+d[i].source+"</div><div>Linea : "+d[i].line+"</div><div>Mensaje : "+d[i].message+"</div></div><div style='height:5px;width:100%;background-color:whitesmoke'/>";
                      }
                      return msj;
                 }
                 function irErrorCompilacion(source,line,name,owner,type){
                     var s=source.split('/');
                     var nf=s[s.length-1];
                     var pack='';
                     var sep='';
                     if(s.length>2){
                         for(var i in s){
                             if(i==0)continue;
                             if(i==s.length-1)break;
                             pack+=sep+s[i];
                             sep='.';
                         }
                     }
                     
            
                   if(pack=='')pack='Default Package';
                   var proySRC=getProject(name,owner).src
                   for(var j in proySRC){
                       if(proySRC[j].nombre==pack){
                           for(var k in proySRC[j].ficheros){
                               if(proySRC[j].ficheros[k].nombre==nf){
                                  
                                  
                                  var idnode=proySRC[j].ficheros[k].tipo+';'+name+';'+owner+';'+pack+':'+nf;
                                  switch(proySRC[j].ficheros[k].tipo){
                                      case 'ClassNode':{
                                              abrirClase(idnode,line,type);
                                             // control_tab.goLine(idnode,line);
                                              break;
                                      }
                                      case 'GUINode':{
                                              abrirClaseGUI(idnode,line,type);
                                            //  control_tab.goLine(idnode,line);
                                              break;
                                      }
                                  }
                               }
                           }
                       }
                   }
                 }
                   function ejecutarProyecto(id){
               
                            var s=id.split(';');
                     // $.get(
                     var randomico=parseInt(Math.random()*99999);
                       //     abrirVentana('../IDE/ejecutarProyecto.jsp?name='+s[1]+'&owner='+s[2]+'&ran='+r,"ejecucion proyecto",true);
                           
                             $.get("../IDE/ejecutarProyecto.jsp?name="+s[1]+"&owner="+s[2]+'&ran='+randomico, function(data) {
                              
                                 var r=jsonParse(data);
                                if(r.answ!='ok'){
                                
                                    alert('Error al intentar ejecutar el proyecto.\nVer output');
                                    switch(r.answ){
                                        case 'noMain':{
                                                $("#objIdOutput").html("<h5>Resultado construir para ejecucion : False</h5><br>\n\
                                                                        <p>El proyecto "+s[1]+"-"+s[2]+" no tiene una clase main asignada o la clase 'Principal' no tiene un metodo main, ademas es necesario verificar que no tenga errores de compilacion</p>\n\
                                                                        <p>Para ver la clase principal de dicho proyecto de click derecho en su respectivo icono, propiedades</p></br> ");
                                                break;
                                        }
                                        case 'noClass':{
                                                 $("#objIdOutput").html("<h5>Resultado construir para ejecucion : False</h5><br>\n\
                                                                        <p>El proyecto "+s[1]+"-"+s[2]+" no tiene asignada una clase principal</p>\n\
                                                                        <p>Para asignar la clase principal de dicho proyecto, de click derecho en su respectivo icono, propiedades</p></br> ");
                                                break;
                                        }
                                        case 'noCompilation':{
                                                
                                                var msj=construirMensajeCompilacion( jsonParse(data).diagnostic);
                                                
                                                 $("#objIdOutput").html("<h5>Resultado construir para ejecucion : False</h5><br>\n\
                                                                        <p>El proyecto "+s[1]+"-"+s[2]+" presenta errores de compilacion, los cuales se muestran a continuacion: </p><br/>"+msj);
                                                break;
                                                
                                        }
                                    }
                                   
                               

                                }else{
                                    $("#objIdOutput").html("<h5>Resultado construir para ejecucion</h5> : True <br/>");
                                   
                                     if (confirm("'El proyecto se ha construido correctamente,\n¿ Desear continuar con su ejecucion ?"))
                                      // window.open('../IDE/verEjecucionProyecto.jsp?name='+s[1]+'&owner='+s[2]+'&c='+r.classe+'&j='+r.jar+'&ran='+randomico,'Ejecucion del proyecto','width=500,height=500,menubar=0,scrollbars=0,toolbar=0,directories=0,resizable=0,top=0,left=0');
                                       window.open('../IDE/verEjecucionProyecto.jsp?name='+s[1]+'&owner='+s[2]+'&c='+r.classe+'&j='+r.jar+'&ran='+randomico,'Ejecucion proyecto: '+s[1],'width=700,height=550,menubar=0,scrollbars=0,toolbar=0,directories=0,resizable=0,top=0,left=0');
     
                                }

                              }); 
                        }
                       
                 
                 
                 
                       
                   function eliminarProyecto(id){
                            
                      var s=id.split(';');
                      if(user!=s[2]){
                         if (confirm('Desear dejar de ver el proyecto "'+s[1]+'"')){
                         $.get("../IDE/eliminarVistaProyecto.jsp?name="+s[1]+"&owner="+s[2]+"&user="+user+"&type=1", function(data) {

                                     if(jsonParse(data).answ=="ok"){
                                          
                                          eliminarProyectoRUI(id,user);
                                          
                                     }else{
                                         alert('Ocurrio un error al intentar eliminar vista el proyecto');
                                     }


                              });  
                         }
                     
                      }else{


                              if (confirm('Desear eliminar el proyecto "'+s[1]+'"')){

                               $.get("../IDE/consultarUsuariosProyecto.jsp?name="+s[1]+"&owner="+s[2]+"&type=2", function(dat) {   
                               var usrs=jsonParse(dat);
                                  if(usrs.answ=="ok"){
                                      $.get("../IDE/eliminarProyecto.jsp?name="+s[1]+"&owner="+s[2]+"&type=1", function(data) {

                                             if(jsonParse(data).answ=="ok"){

                                                  for(var i in usrs.email){
                                                         canalNotificaciones.emit("deleteProject",{p: s[1]+';'+s[2] , u: usrs.email[i],c:user,s:idS}); 
                                                     }


                                                  eliminarProyectoRUI(id,user);

                                             }else{
                                                 alert('Ocurrio un error al intentar eliminar el proyecto');
                                             }


                                      });         

                                  }
                                  else{
                                      alert('Ocurrion un error al intentar obtener informacion del proyecto');
                                  }
                               });


                              }   
                      }
                } 
                
                   
                   
                   
                   function eliminarProyectoRUI(id,usuario){
                        
                        var s=id.split(';');
                        var idC=control_tab.normalizarId(s[0]+'C'+s[1]);
                        closeChatBox(idC);
                        this.control_tab.closeProject(s[1],s[2]);
                         tree.deleteItem(id,true);
                               popProject(s[1],s[2]);
                               if(projectsMemory.length==0){
                                   tree.setItemImage("MainNode","gg2.png","gg2.png");
                                    }   
                                    
                       manejadorTableroNotificaciones('Eliminar proyecto '+s[1]+'-'+s[2]);
                        //aca es necesario enviar el mensaje a la consola de notificaciones
                        
                    }
                
                   function eliminarUsuarioProyectoRUI(idU,name,owner){
                     
                    if(idU==user && owner!=user){ 
                             
                             tree.deleteItem('ProjectNode;'+name+';'+owner,true);
                             popProject(name,owner);
                             if(projectsMemory.length==0){
                                  tree.setItemImage("MainNode","gg2.png","gg2.png");
                             }
                             
                            manejadorTableroNotificaciones('Dejar de compartir proyecto '+name+"-"+owner,owner);
                             
                            $.get("../IDE/cerrarProyecto.jsp?name="+name+"&owner="+owner);
                    
                    
                    }
                 }
                
                   function uiRenombrarProyecto(id){
                       
                      abrirVentana("../IDE/uiRenombrarProyecto.jsp?id="+id,"Digite nuevo nombre",true);
                       
                   }   
                   
                   function renombrarProyecto(id,nname,name){
                      var s=id.split(';');
                     
                      $.get("../IDE/renombrarProyecto.jsp?name="+s[1]+"&owner="+s[2]+"&newname="+nname+"&type=1&ran="+Math.random()*99999999999, function(data) {
                        
                          if(jsonParse(data).answ=="ok"){
                                 name=nname;
                                 var msj='<xml><u>'+user+'</u><op>rui</op><data><m>rP</m><id>'+id+'</id><name>'+nname+'</name></data></xml>';
                                 canalNotificaciones.emit("nuevoMsg", {c:s[1]+';'+s[2],msj:msj,u:user,s:idS} );
                                 
                            }else{
                                
                                alert('Ocurrio un error al intentar renombrar el proyecto');
                                
                            }
                          
                          
                      }); 
                   }
                   
                   function renombrarProyectoRUI(id,nname,usuario){
                 
                       var nid=getNewIDRenameProject(id,nname);//s[0]+';'+nname+';'+s[2]
                                 tree.setItemText(id,nname);
                                 tree.changeItemId(id,nid);
                                 var nodes=tree.getAllSubItems(nid).split(',');
                                 for(var i in nodes){
                                     
                                     tree.changeItemId(nodes[i],getNewIDRenameProject(nodes[i],nname));
                                     
                                 }
                       
                       
                       
                   }
                   
                   function uiRenombrarClase(id){
                       var s=id.split(';');
                       idAux=id;
                       abrirVentana("../IDE/uiRenombrarClase.jsp","Renombrar Clase '"+s[3].split(':')[1]+"'",false);
                       
                   }   
                   
                   function renombrarClase(nname){
                       
                      var id=idAux;
                      idAux='';
                      var s=id.split(';');
                      var namePack=s[3].split(':')[0];
                      if(namePack=='Default Package')namePack="*.*";
                      $.get("../IDE/renombrarClase.jsp?name="+s[1]+"&owner="+s[2]+"&nameC="+s[3].split(':')[1]+"&nameP="+namePack+"&newname="+nname+"&ran="+Math.random()*99999999999, function(data) {
                        
                          if(jsonParse(data).answ=="ok"){
                               var msj='<xml><u>'+user+'</u><op>rui</op><data><m>rc</m><id>'+id+'</id><name>'+nname+'</name></data></xml>';
                               canalNotificaciones.emit("nuevoMsg", {c:s[1]+';'+s[2],msj:msj,u:user,s:idS} );
                                
                           
                          }else{
                                
                                alert('Ocurrio un error al intentar renombrar la clase');
                                
                            }
                         
                          
                      }); 
                   }
                   
                   function renombrarClaseRUI(id,nname,usuario){
                       var s=id.split(';');
                      var namePack=s[3].split(':')[0];
                      if(namePack=='Default Package')namePack="*.*";
                        tree.setItemText(id,nname);
                                 if(namePack=='*.*')namePack='Default Package';
                                 tree.changeItemId(id,s[0]+';'+s[1]+';'+s[2]+';'+namePack+':'+nname);
                    
                      manejadorTableroNotificaciones('Renombrar Clase '+id+" como "+nname,usuario);
                       
                   }
                   
                   function uiRenombrarClaseGUI(id){
                       
                       idAux=id;
                       abrirVentana("../IDE/uiRenombrarClaseGUI.jsp","Renombrar GUI",false);
                       
                   }   
                   
                   function renombrarClaseGUI(nname){
                       
                      var id=idAux;
                      idAux='';
                      var s=id.split(';');
                      var namePack=s[3].split(':')[0];
                      if(namePack=='Default Package')namePack="*.*";
                      $.get("../IDE/renombrarClaseGUI.jsp?name="+s[1]+"&owner="+s[2]+"&nameC="+s[3].split(':')[1]+"&nameP="+namePack+"&newname="+nname+"&ran="+Math.random()*99999999999, function(data) {
                        
                          if(jsonParse(data).answ=="ok"){
                               var msj='<xml><u>'+user+'</u><op>rui</op><data><m>rcg</m><id>'+id+'</id><name>'+nname+'</name></data></xml>';
                               canalNotificaciones.emit("nuevoMsg", {c:s[1]+';'+s[2],msj:msj,u:user,s:idS} );
                                 
                           
                          }else{
                                
                                alert('Ocurrio un error al intentar renombrar la clase');
                                
                            }
                          
                          
                      }); 
                   }
                   
                   function renombrarClaseGUIRUI(id,nname,usuario){
                       
                      var s=id.split(';');
                      var namePack=s[3].split(':')[0];
                      if(namePack=='Default Package')namePack="*.*";
                       tree.setItemText(id,nname);
                                 if(namePack=='*.*')namePack='Default Package';
                                 tree.changeItemId(id,s[0]+';'+s[1]+';'+s[2]+';'+namePack+':'+nname);
               
                      manejadorTableroNotificaciones('Renombrar GUI '+id+" como "+nname,usuario);
                   }
                   
                   function uiRenombrarFichero(id){
                       var s=id.split(';');
                       idAux=id;
                       abrirVentana("../IDE/uiRenombrarFichero.jsp","Renombrar Fichero '"+s[3].split(':')[1]+"'",false);
                       
                   }   
                   
                   function renombrarFichero(nname){
                       
                      var id=idAux;
                      idAux='';
                      var s=id.split(';');
                      var namePack=s[3].split(':')[0];
                      if(namePack=='Default Package')namePack="*.*";
                      $.get("../IDE/renombrarFichero.jsp?name="+s[1]+"&owner="+s[2]+"&nameF="+s[3].split(':')[1]+"&nameP="+namePack+"&newname="+nname+"&ran="+Math.random()*99999999999, function(data) {
                        
                          if(jsonParse(data).answ=="ok"){
                               var msj='<xml><u>'+user+'</u><op>rui</op><data><m>rf</m><id>'+id+'</id><name>'+nname+'</name></data></xml>';
                               canalNotificaciones.emit("nuevoMsg", {c:s[1]+';'+s[2],msj:msj,u:user,s:idS});
                                 
                           
                          }else{
                                
                                alert('Ocurrio un error al intentar renombrar el fichero');
                                
                            }
                   
                          
                      }); 
                   }
                   
                   function renombrarFicheroRUI(id,nname,usuario){
                    
                      var s=id.split(';');
                      var namePack=s[3].split(':')[0];
                      if(namePack=='Default Package')namePack="*.*";
                       tree.setItemText(id,nname);
                                 if(namePack=='*.*')namePack='Default Package';
                                 tree.changeItemId(id,s[0]+';'+s[1]+';'+s[2]+';'+namePack+':'+nname);
                      
                   
                      manejadorTableroNotificaciones('Renombrar Fichero '+id+" como "+nname,usuario);
                   }
                   function uiRenombrarLibreria(id){
                       var s=id.split(';');
                       idAux=id;
                       abrirVentana("../IDE/uiRenombrarLibreria.jsp","Renombrar Libreria '"+s[3].split(':')[1]+"'",false);
                       
                   }   
                   
                   function renombrarLibreria(nname){
                       
                      var id=idAux;
                      idAux='';
                      var s=id.split(';');
                      $.get("../IDE/renombrarLibreria.jsp?name="+s[1]+"&owner="+s[2]+"&nameL="+s[3].split(':')[1]+"&newname="+nname+"&ran="+Math.random()*99999999999, function(data) {
                        
                          if(jsonParse(data).answ=="ok"){
                               var msj='<xml><u>'+user+'</u><op>rui</op><data><m>rl</m><id>'+id+'</id><name>'+nname+'</name></data></xml>';
                               canalNotificaciones.emit("nuevoMsg", {c:s[1]+';'+s[2],msj:msj,u:user,s:idS} );
                                 
                           
                          }else{
                                
                                alert('Ocurrio un error al intentar renombrar libreria');
                                
                            }
                          
                          
                      }); 
                   }
                   
                   function renombrarLibreriaRUI(id,nname,usuario){
                      
                      var s=id.split(';');
                      tree.setItemText(id,nname);
                      tree.changeItemId(id,s[0]+';'+s[1]+';'+s[2]+';LIBSNode:'+nname);
              
                       manejadorTableroNotificaciones('Renombrar Libreria '+id+" como "+nname,usuario);
                                 
                   }
                   
                   function getNewIDRenameProject(oldID,newNamePro){
                       
                       var s=oldID.split(';');
                       var nid=s[0]+';'+newNamePro;
                        
                       for(var i in s) { 
                           if(i<2)continue;
                         nid+=';'+s[i];
                       }          
                       return nid;
                   }
               
                   function abrirProyecto(name,owner,user){
                      
                       if(haveProject(name,owner)){alert('Proyecto ya se encuentra abierto');return false;}
                            $.get("../IDE/loadProjectJSON.jsp?name="+name+"&owner="+owner+"&user="+user, function(data) {
                               
                              
                                var proyecto = jsonParse(data).Proyecto;
                               // proyecto.type=type;
                                
                                projectsMemory.push(proyecto);
                                
                                var nombre=proyecto.nombre;
                              
                                var propietario=proyecto.propietario;
                             
                                var fecha=proyecto.fecha;
                                var src=proyecto.src;
                            
                                var libs=proyecto.libs;
                           
                                var idNodoProyecto="ProjectNode;"+nombre+";"+propietario;
                                var img='myproject.png';
                             
                                if(owner==user)
                                    img='myproject.png';
                                else{
                                    
                                    if(proyecto.type=='Read')
                                        img='readProject.png';
                                    if(proyecto.type=='Write')
                                        img='writeProject.png';
                                    
                                }
                                tree.insertNewChild("MainNode", idNodoProyecto ,nombre ,null ,img,img,img);
                               
                                tree.insertNewChild(idNodoProyecto, "SRCNode;"+nombre+";"+propietario ,"SRC" ,null ,"folder.png","folder.png","folder.png");
                               
                                tree.insertNewChild(idNodoProyecto, "LIBSNode;"+nombre+";"+propietario ,"LIBS" ,null ,"folderL.png","folderL.png","folderL.png");
                                
                                for(var i in src)
                                    loadNode("SRCNode;"+nombre+";"+propietario,nombre+";"+propietario , src[i]);
                                
                                for(var i in libs)
                                    loadNode("LIBSNode;"+nombre+";"+propietario,  nombre+";"+propietario , libs[i]);
                                
                                tree.setItemImage("MainNode","gg3.png","gg3.png");
                                tree.setItemText("MainNode","Proyectos Activos");
                                canalNotificaciones.emit('suscribirse',{u:user,c: nombre+';'+propietario, s:idS} );
                       
                              
                            });
                   }
                   
                   function abrirClase(id,nl,type){
                        if(nl==null || nl==undefined)nl=0;
                        if(type==null || type==undefined)type='none';
                        var s=id.split(';');
                        var c=s[3].split(':');
                        var pack=c[0];
                        if('Default Package'==pack)
                            pack='';
                     /**   sharejs.open(id, 'text','http://'+sT+':'+pT+'/sjs', function(error, doc) {
                                if (error) {
                                  return;
                                }
                                if (doc.created) {
                                }**/
                       control_tab.abrirClase(id,getProject(s[1],s[2]).type=='Write',nl,type) ;
                            
                                
                    //     });
                              

                                           
                   
                   }
                   
                   
                   function abrirClaseGUI(id,nl,type){
                        if(nl==null || nl==undefined)nl=0;
                        if(type==null || type==undefined)type='none';
                        var s=id.split(';');
                        var c=s[3].split(':');
                        var pack=c[0];
                        if('Default Package'==pack)
                            pack='';
                      
                        if(control_tab.estaId_(id)==-1){
                          
                                  sharejs.open(id, 'text','http://'+sT+':'+pT+'/sjs', function(error, doc) {
                                if (error) {
                                  return;
                                }
                               doc.on('change', function (op) {
					
				});
                                if (doc.created) {
                                }
                                  control_tab.abrirGUI(id,getProject(s[1],s[2]).type=='Write',nl,type);
                            
                                
                              });
                      
                        } 
                        else{
                            
                                    control_tab.abrirGUI(id, getProject(s[1],s[2]).type=='Write',nl,type);
                        }
                                           
                   
                   }
                    function abrirFichero(id,nl,type){
                        if(nl==null || nl==undefined)nl=0;
                        if(type==null || type==undefined)type='none';
                        var s=id.split(';');
                        var c=s[3].split(':');
                        var pack=c[0];
                        if(pack=='*.*')pack='Default Package';
                        var nf=c[1];
                        var proy=getProject(s[1],s[2]);console.log(proy);
                        var proySRC=proy.src;
                   for(var j in proySRC){
                       if(proySRC[j].nombre==pack){
                           for(var k in proySRC[j].ficheros){
                               if(proySRC[j].ficheros[k].nombre==nf){
                                  
                                  
                                  if(proySRC[j].ficheros[k].tipo=='FileNode'){
                                     control_tab.abrirArchivo(id,proySRC[j].ficheros[k].tipoFichero,proy.type);
                                  }
                               }
                           }
                       }
                   }
                            
                   
                   }
                   function editarClaseGUI(id){
                        
                        var s=id.split(';');
                        var c=s[3].split(':');
                        var pack=c[0];
                        if('Default Package'==pack)
                            pack='';
                        
                        if(control_tab.estaId_(id)==-1){
                     //    $.get("../IDE/abrirGUI.jsp?clase="+c[1]+"&paquete="+pack+"&proyecto="+s[1]+"&propietario="+s[2]+"&ran="+Math.random()*99999999999, function(data) {
                          
                       //     $.get("../IDE/abrirClase.jsp?clase="+c[1]+"&paquete="+pack+"&proyecto="+s[1]+"&propietario="+s[2]+"&ran="+Math.random()*99999999999, function(data2) {
                             //   var form = jsonParse(data).form;
                            //    var code=data2;
                                control_tab.abrirGUI(id,0,null,null,1);
                         //   });
                              
                       //     });  
                        }else{
                            
                                control_tab.abrirGUI(id, 0, null,null,1);
                        }
                   
                   }
                   
                   function uiAgregarClase(id){
                           idAux=id;
                           abrirVentana("../IDE/uiAgregarClase.jsp","Agregar Clase",false);
                   
                   }
                   
                   function agregarClase(njava){
                     
                     var id=idAux;
                     idAux='';alert(id);
                     var s=id.split(';');
                     var name='*.*';
                       if(s[0]=='PackageNode'){
                           
                           name=s[s.length-1].split(':')[1];
                           if(name=='Default Package')
                               name='*.*';
                           
                       }
                     
                     
                     
                     $.get("../IDE/agregarClase.jsp?name="+s[1]+"&owner="+s[2]+"&nameC="+njava+"&nameP="+name+"&ran="+Math.random()*99999999999, function(data) {
                        
                          if(jsonParse(data).answ=="ok"){
                               var msj='<xml><u>'+user+'</u><op>rui</op><data><m>ac</m><id>'+id+'</id><name>'+njava+'</name></data></xml>';                             
                               canalNotificaciones.emit("nuevoMsg", {c:s[1]+';'+s[2],msj:msj,u:user,s:idS} );
                               
                            }else{
                                
                                alert('Ocurrio un error al intentar agregar clase');
                                
                            }
                          
                          
                      }); 
                       
                   }
        
                   function agregarClaseRUI(id,njava,usuario){///ojo no se puede abrir la pestaña de una vez.........
                       
                     var s=id.split(';');
                     var name='*.*';
                       if(s[0]=='PackageNode'){
                           
                           name=s[s.length-1].split(':')[1];
                           if(name=='*.*')
                               name='Default Package';
                           
                       }
                       var indexTree=tree.getIndexById('PackageNode;'+s[1]+';'+s[2]+';*.*:Default Package');
                               if(indexTree==null || indexTree=='undefined') 
                                    tree.insertNewChild('SRCNode;'+s[1]+';'+s[2], 'PackageNode;'+s[1]+';'+s[2]+';*.*:Default Package' ,'Default Package',null ,'package.png','package.png','package.png');
                                
                       var idParentNodo;        
                               if(name=='*.*'){
                                   idParentNodo='PackageNode;'+s[1]+';'+s[2]+';*.*:Default Package';
                                   tree.insertNewChild('PackageNode;'+s[1]+';'+s[2]+';*.*:Default Package', 'ClassNode;'+s[1]+';'+s[2]+';Default Package:'+njava ,njava ,null ,'java.png','java.png','java.png');
                               }else{
                                   idParentNodo=id;
                                    tree.insertNewChild(id, 'ClassNode;'+s[1]+';'+s[2]+';'+name+':'+njava ,njava ,null ,'java.png','java.png','java.png');
                               }
                               if(name=='*.*'){
                                   getItemTreeMemory(idParentNodo).ficheros.push({tipo:'ClassNode',nombre: njava, imagen:'java.png'});
                               }
                               manejadorTableroNotificaciones('Agregar Clase '+njava,usuario);
                              
                              
                   }
                   function uiAgregarClaseGUI(id){
                           idAux=id;
                           abrirVentana("../IDE/uiAgregarClaseGUI.jsp","Agregar ClaseGUI",false);
                   
                   }
                   
                   function agregarClaseGUI(njava){
                     
                     var id=idAux;
                     idAux='';
                     var s=id.split(';');
                     var name='*.*';
                       if(s[0]=='PackageNode'){
                           
                           name=s[s.length-1].split(':')[1];
                           if(name=='Default Package')
                               name='*.*';
                           
                       }
                     
                     $.get("../IDE/agregarClaseGUI.jsp?name="+s[1]+"&owner="+s[2]+"&nameC="+njava+"&nameP="+name+"&ran="+Math.random()*99999999999, function(data) {
                        
                          if(jsonParse(data).answ=="ok"){
                               var msj='<xml><u>'+user+'</u><op>rui</op><data><m>acg</m><id>'+id+'</id><name>'+njava+'</name></data></xml>';                               
                               canalNotificaciones.emit("nuevoMsg", {c:s[1]+';'+s[2],msj:msj,u:user,s:idS});
                               
                            }else{
                                
                                alert('Ocurrio un error al intentar agregar clase');
                                
                            }
                          
                          
                      }); 
                       
                   }

                   function agregarClaseGUIRUI(id,njava,usuario){
                       
                     var s=id.split(';');
                     var name='*.*';
                       if(s[0]=='PackageNode'){
                           
                           name=s[s.length-1].split(':')[1];
                           if(name=='*.*')
                               name='Default Package';
                           
                       }
                       
                       var indexTree=tree.getIndexById('PackageNode;'+s[1]+';'+s[2]+';*.*:Default Package');
                               if(indexTree==null || indexTree=='undefined') 
                                    tree.insertNewChild('SRCNode;'+s[1]+';'+s[2], 'PackageNode;'+s[1]+';'+s[2]+';*.*:Default Package' ,'Default Package',null ,'package.png','package.png','package.png');
                                
                               var idParentNodo;
                               if(name=='*.*'){
                                   idParentNodo='PackageNode;'+s[1]+';'+s[2]+';*.*:Default Package';
                                   tree.insertNewChild('PackageNode;'+s[1]+';'+s[2]+';*.*:Default Package', 'GUINode;'+s[1]+';'+s[2]+';Default Package:'+njava ,njava ,null ,'form.png','form.png','form.png');
                               }
                               else{
                                   idParentNodo=id;
                                    tree.insertNewChild(id, 'GUINode;'+s[1]+';'+s[2]+';'+name+':'+njava ,njava ,null ,'form.png','form.png','form.png');
                               }
                          
                              getItemTreeMemory(idParentNodo).ficheros.push({tipo:'GUINode',nombre: njava, imagen:'form.png'});
                              manejadorTableroNotificaciones('Agregar GUI '+njava,usuario);
                       
                   }
                   function uiAgregarFichero(id){
                           idAux=id;
                           abrirVentana("../IDE/uiAgregarFichero.jsp","Agregar Fichero",false);
                   
                   }
                   
                   function agregarFichero(njava){
                     
                     var id=idAux;
                     idAux='';
                     var s=id.split(';');
                     var name='*.*';
                       if(s[0]=='PackageNode'){
                           
                           name=s[s.length-1].split(':')[1];
                           if(name=='Default Package')
                               name='*.*';
                           
                       }
                    $.get("../IDE/agregarFichero.jsp?name="+s[1]+"&owner="+s[2]+"&nameF="+njava+"&nameP="+name+"&ran="+Math.random()*99999999999, function(data) {
                        
                          if(jsonParse(data).answ=="ok"){
                               var msj='<xml><u>'+user+'</u><op>rui</op><data><m>af</m><id>'+id+'</id><name>'+njava+'</name></data></xml>'; 
                    
                               canalNotificaciones.emit("nuevoMsg", {c:s[1]+';'+s[2],msj:msj,u:user,s:idS});
                               
                               
                            }else{
                               
                                alert('Ocurrio un error al intentar agregar fichero');
                                
                            }
                          
                          
                      }); 
                       
                   }
                  
                   function agregarFicheroRUI(id,njava,usuario){
                   
                     var s=id.split(';');
                     var name='*.*';
                       if(s[0]=='PackageNode'){
                           
                           name=s[s.length-1].split(':')[1];
                           if(name=='*.*')
                               name='Default Package';
                           
                       }
                       
                       var indexTree=tree.getIndexById('PackageNode;'+s[1]+';'+s[2]+';*.*:Default Package');
                               if(indexTree==null || indexTree=='undefined') 
                                    tree.insertNewChild('SRCNode;'+s[1]+';'+s[2], 'PackageNode;'+s[1]+';'+s[2]+';*.*:Default Package' ,'Default Package',null ,'package.png','package.png','package.png');
                                
                               var idParentNodo;
                               var tif=getTipoFichero(njava);
                               var imagen=getImagenFichero(tif);
                               if(name=='*.*'){
                                   idParentNodo='PackageNode;'+s[1]+';'+s[2]+';*.*:Default Package';
                                   tree.insertNewChild('PackageNode;'+s[1]+';'+s[2]+';*.*:Default Package', 'FileNode;'+s[1]+';'+s[2]+';'+name+':'+njava ,njava ,null ,imagen,imagen,imagen);
                               }else{
                                   idParentNodo=id;
                                   tree.insertNewChild(id, 'FileNode;'+s[1]+';'+s[2]+';'+name+':'+njava ,njava ,null ,imagen,imagen,imagen);
                               }
                           
                               
                               getItemTreeMemory(idParentNodo).ficheros.push({tipo:'FileNode',nombre: njava, imagen:imagen,tipoFichero:tif}); 
                               manejadorTableroNotificaciones('Agregar Fichero '+njava,usuario);
                       
                   }
                   function uiAgregarPaquete(id){
                           idAux=id;
                           abrirVentana("../IDE/uiAgregarPaquete.jsp","Agregar Paquete",false);
                   
                   }
                   
                   function agregarPaquete(nPack){
                     
                     var id=idAux;
                     idAux='';
                     var s=id.split(';');
                     var namePack='';
                     namePack=nPack;
                     var name='*.*';
                       if(s[0]=='PackageNode'){
                           
                           name=s[s.length-1].split(':')[1];
                           if(name!='Default Package'){
                                namePack=name+'.'+nPack;
                                
                           }
                           
                       }
                
                     
                     $.get("../IDE/agregarPaquete.jsp?name="+s[1]+"&owner="+s[2]+"&nameP="+namePack+"&ran="+Math.random()*99999999999, function(data) {
                        
                          if(jsonParse(data).answ=="ok"){
                              var msj='<xml><u>'+user+'</u><op>rui</op><data><m>ap</m><id>'+id+'</id><name>'+nPack+'</name></data></xml>';
                              canalNotificaciones.emit("nuevoMsg", {c:s[1]+';'+s[2],msj:msj,u:user,s:idS});
                       
                               
                               
                            }else{
                                alert('Ocurrio un error al intentar agregar fichero');
                                
                            }
                          
                          
                      }); 
                       
                   }
                   
                   function agregarPaqueteRUI(id,nPack,usuario){
                    
                     var s=id.split(';');
                     var namePack='';
                     namePack=nPack;
                     var name='*.*';
                       if(s[0]=='PackageNode'){
                           
                           name=s[s.length-1].split(':')[1];
                           if(name!='Default Package'){
                                namePack=name+'.'+nPack;
                                
                           }
                           
                       }
                       
                              var packs=namePack.split('.');
                             
                              var pa='';
                          
                              for(var i in packs){
                                 
                                var aux='.'; 
                                if(i==0)aux='';
                                pa+=aux+packs[i]; 
                                
                                var indexTree=tree.getIndexById('PackageNode;'+s[1]+';'+s[2]+';*.*:'+pa);
                                if(indexTree==null || indexTree=='undefined') 
                                    tree.insertNewChild('SRCNode;'+s[1]+';'+s[2], 'PackageNode;'+s[1]+';'+s[2]+';*.*:'+pa ,pa ,null ,'package.png','package.png','package.png');
                                
                                  
                                  
                              }
                              
                               
                       
                               getProject(s[1],s[2]).src.push({ficheros:[],imagen:'package.png',nombre:pa,tipo:'PackageNode'});
                               manejadorTableroNotificaciones('Agregar Paquete '+pa,usuario);
                       
                       
                   }
                   
                   function uiRenombrarPaquete(id){
                       
                       var s=id.split(';');
                       if(id=='PackageNode;'+s[1]+';'+s[2]+';*.*:Default Package'){
                           alert('"Default Package" es un paquete conceptual,\npor lo tanto NO puede ser renombrado.');
                           return true;
                           
                       }
                       idAux=id;
                       abrirVentana("../IDE/uiRenombrarPaquete.jsp","Renombrar Paquete '"+s[3].split(':')[1]+"'",false);
                       
                       
                       
                   }
                   
                   function renombrarPaquete(nName){
                       
                     var id=idAux;
                     idAux='';
                     var s=id.split(';');
                     var backName=s[3].split(':')[1];
                        $.get("../IDE/renombrarPaquete.jsp?name="+s[1]+"&owner="+s[2]+"&nameP="+backName+"&newName="+nName+"&ran="+Math.random()*99999999999, function(data) {
                          
                          if(jsonParse(data).answ=="ok"){
                            var msj='<xml><u>'+user+'</u><op>rui</op><data><m>rp</m><id>'+id+'</id><name>'+nName+'</name></data></xml>';
                            canalNotificaciones.emit("nuevoMsg", {c:s[1]+';'+s[2],msj:msj,u:user,s:idS});
                               
                          }else{   
                               alert('Operacion Fallida');
                           }  
                         
                          
                          
                      });
                   }
                   
                   function renombrarPaqueteRUI(id,nName,usuario){
                     
                     var s=id.split(';');
                     var backName=s[3].split(':')[1];
                       var auxN=backName.split('.');
                            var nid=s[0]+';'+s[1]+';'+s[2]+';*.*:'+nName;
                            
                            tree.changeItemId(id,nid);
                            tree.setItemText(nid,nName);
                            if(auxN.legth==1){
                                
                                alert('Operacion exitosa!!!  (Paquetes afectados: 1)');
                                return true;
                                
                            }
                       
                           var afectados=1;
                           var nodes=tree.getAllSubItems("SRCNode;"+s[1]+";"+s[2]).split(',');  
                                    for(var i in nodes){
                                        
                                           var ss=nodes[i].split(';');
                                           if(ss[0]!='PackageNode')continue;
                                       
                                           var xx=ss[ss.length-1].split(':')[1];
                                      
                                            
                                           if(xx=='Default Package')continue
                                           if(xx==nName)continue;
                                           if(isFatherPackage(backName,xx)){
                                                var newnfp=getNewNamePackage(nName,xx);
                                                tree.changeItemId(nodes[i],ss[0]+';'+ss[1]+';'+ss[2]+';*.*:'+newnfp);
                                                tree.setItemText(ss[0]+';'+ss[1]+';'+ss[2]+';*.*:'+newnfp,newnfp);
                                                afectados++;
                                           }
                                     }
                                     
                    if(usuario==user)
                        alert('Operacion exitosa!!!  (Paquetes afectados: '+afectados+')');
                    manejadorTableroNotificaciones('Renombrar Paquete '+backName+' como '+nName,usuario);
                       
                   }
                   
                   
                   //ojo falta hacer todas las validaciones de pestañas abiertassssssssssss 
                   function eliminarClase(id){
                       var s=id.split(';');
                       var nc=s[3].split(':')[1];
                       var pack=s[3].split(':')[0];
                       if(pack=='Default Package')pack='*.*';
                       if (confirm('Realmente desea eliminar la clase "'+nc+'"')){
                        $.get("../IDE/eliminarClase.jsp?name="+s[1]+"&owner="+s[2]+"&nameC="+nc+"&nameP="+pack+"&ran="+Math.random()*99999999999,function (data){
                            
                            if(jsonParse(data).answ=="ok"){
                                
                                var msj='<xml><u>'+user+'</u><op>rui</op><data><m>ec</m><id>'+id+'</id></data></xml>';
                                canalNotificaciones.emit("nuevoMsg", {c:s[1]+';'+s[2],msj:msj,u:user,s:idS});
                                
                            }else{
                                
                                alert('Operacion fallida');
                            }
                            
                            
                            
                        });
                            
                            
                        
                        return;
                        }
                        else 
                    
                        return; 
                       
                   }
                   
                   function eliminarClaseRUI(id,usuario){
                       var s=id.split(';');
                       var pack=s[3].split(':')[0];
                       if(pack=='Default Package')pack='*.*';
                       tree.deleteItem(id,true);
                       evaluarEliminacionDefaultPackage(id);
                      
                      control_tab.removeTab(id);
                      removerItemTreeMemory(id);
                       manejadorTableroNotificaciones('Eliminar Clase '+id,usuario);
                       
                   }
                   
                   function eliminarClaseGUI(id){
                       var s=id.split(';');
                       var nc=s[3].split(':')[1];
                       var pack=s[3].split(':')[0];
                       if(pack=='Default Package')pack='*.*';
                       if (confirm('Realmente desea eliminar la clase "'+nc+'"')){
                        $.get("../IDE/eliminarClaseGUI.jsp?name="+s[1]+"&owner="+s[2]+"&nameC="+nc+"&nameP="+pack+"&ran="+Math.random()*99999999999,function (data){
                            
                            if(jsonParse(data).answ=="ok"){
                                var msj='<xml><u>'+user+'</u><op>rui</op><data><m>ecg</m><id>'+id+'</id></data></xml>';
                                canalNotificaciones.emit("nuevoMsg", {c:s[1]+';'+s[2],msj:msj,u:user,s:idS});
                                
                            }else{
                                
                                alert('Operacion fallida');
                            }
                            
                            
                            
                        });
                            
                            
                        
                        return;
                        }
                        else 
                    
                        return; 
                       
                   }
                   
                   function eliminarClaseGUIRUI(id,usuario){
                       var s=id.split(';');
                       var pack=s[3].split(':')[0];
                       if(pack=='Default Package')pack='*.*';
                       tree.deleteItem(id,true);
                       evaluarEliminacionDefaultPackage(id);
                         
                        control_tab.removeTab(id);
                        removerItemTreeMemory(id);
                       manejadorTableroNotificaciones('Eliminar GUI '+id,usuario);
                       
                   }
                   
                   function eliminarFichero(id){
                       var s=id.split(';');
                       var nc=s[3].split(':')[1];
                       var pack=s[3].split(':')[0];
                       if(pack=='Default Package')pack='*.*';
                       if (confirm('Realmente desea eliminar la Fichero "'+nc+'"')){
                        $.get("../IDE/eliminarFichero.jsp?name="+s[1]+"&owner="+s[2]+"&nameF="+nc+"&nameP="+pack+"&ran="+Math.random()*99999999999,function (data){
                            
                            if(jsonParse(data).answ=="ok"){
                                var msj='<xml><u>'+user+'</u><op>rui</op><data><m>ef</m><id>'+id+'</id></data></xml>';
                                canalNotificaciones.emit("nuevoMsg", {c:s[1]+';'+s[2],msj:msj,u:user,s:idS});
                                
                                
                                
                                
                            }else{
                                
                                alert('Operacion fallida');
                            }
                            
                            
                            
                        });
                            
                            
                        
                        return;
                        }
                        else 
                        //Aquí pones lo que quieras Cancelar 
                        return; 
                       
                   }
                   
                   function eliminarFicheroRUI(id,usuario){
                       var s=id.split(';');
                       var pack=s[3].split(':')[0];
                       if(pack=='Default Package')pack='*.*';
                       tree.deleteItem(id,true);
                       evaluarEliminacionDefaultPackage(id);
                       control_tab.removeTab(id);
                       removerItemTreeMemory(id);
                       manejadorTableroNotificaciones('Eliminar Fichero '+id,usuario);
                   }
                   
                   function evaluarEliminacionDefaultPackage(id){
                   
                       var s=id.split(';');
                       var idD='PackageNode;'+s[1]+';'+s[2]+';*.*:Default Package';
                       if( null == tree.getAllSubItems(idD) || "" == tree.getAllSubItems(idD))
                           tree.deleteItem(idD,true);
                       
                   }
                   
                   function eliminarPaquete(id){
                       var s=id.split(';');
                       if(s[3].split(':')[1]=='Default Package'){alert('El paquete "Default Package" es un paquetes conceptual y no puede ser eliminado');return;}
                       var nc=s[3].split(':')[1];
                       if (confirm('Realmente desea eliminar el paquete "'+nc+'"')){
                        $.get("../IDE/eliminarPaquete.jsp?name="+s[1]+"&owner="+s[2]+"&nameP="+nc+"&ran="+Math.random()*99999999999,function (data){
                            
                            if(jsonParse(data).answ=="ok"){
                                var msj='<xml><u>'+user+'</u><op>rui</op><data><m>ep</m><id>'+id+'</id></data></xml>';
                                canalNotificaciones.emit("nuevoMsg", {c:s[1]+';'+s[2],msj:msj,u:user,s:idS});
                                                              
                                
                            }else{
                                
                               alert('Operacion fallida');
                            }
                            
                            
                            
                        });
                            
                            
                        
                        return;
                        }
                        else 
                        //Aquí pones lo que quieras Cancelar 
                        return; 
                       
                   }
                   
                   function eliminarPaqueteRUI(id,usuario){
                       var s=id.split(';');
                       if(s[3].split(':')[1]=='Default Package'){alert('El paquete "Default Package" es un paquetes conceptual y no puede ser eliminado');return;}
                       var nc=s[3].split(':')[1];
                       var afectados=0;
                                var nodes=tree.getAllSubItems("SRCNode;"+s[1]+";"+s[2]).split(',');  
                                    for(var i in nodes){
                                        
                                           var ss=nodes[i].split(';');
                                           if(ss[0]!='PackageNode')continue;
                                       
                                           var xx=ss[ss.length-1].split(':')[1];
                                      
                                            
                                           if(xx=='Default Package')continue
                                           if(xx==nc)continue;
                                           if(isFatherPackage(nc,xx)){
                                               tree.deleteChildItems(nodes[i]);
                                               tree.deleteItem(nodes[i],true);
                                                afectados++;
                                           }
                                     }
                                
                                tree.deleteChildItems(id);
                                tree.deleteItem(id,true);
                                afectados++;
                      if(usuario==user)
                           alert('Operacion exitosa!!!\nPaquetes afectados: '+afectados);
                       removerItemTreeMemory(id);
                       manejadorTableroNotificaciones('Eliminar Paquete '+s[3].split(':')[1],usuario);
                   }
                   
                   function uiCargarClase(id){
                       idAux=id;
                       var s=id.split(';');
                       var nameP='*.*';
                       if(s[0]=='PackageNode'){
                           var nameP=s[3].split(':')[1];
                           if(nameP=='Default Package')
                               nameP='*.*';
                       }
            
                       abrirVentana("../IDE/uiCargarClase.jsp?name="+s[1]+"&owner="+s[2]+"&nameP="+nameP+"&ran="+Math.random()*99999999999,"Cargar Clase",false);
                       
                   } 
                   
                   function cargarClase(name){
                    var id=idAux;
                    idAux='';
                    var msj='<xml><u>'+user+'</u><op>rui</op><data><m>cc</m><id>'+id+'</id><name>'+name+'</name></data></xml>';
                    var s=id.split(';');
                   canalNotificaciones.emit("nuevoMsg",{c:s[1]+';'+s[2],msj:msj,u:user,s:idS});
                    
                              
                       
                   }
                   
                   function cargarClaseRUI(id,name,usuario){
                       
                       var s=id.split(';');
                    
                    var pack='*.*';
                    if(s[0]!='SRCNode')pack='';
                    
                    var indexTree=tree.getIndexById('PackageNode;'+s[1]+';'+s[2]+';*.*:Default Package');
                               if(indexTree==null || indexTree=='undefined') 
                                    tree.insertNewChild('SRCNode;'+s[1]+';'+s[2], 'PackageNode;'+s[1]+';'+s[2]+';*.*:Default Package' ,'Default Package',null ,'package.png','package.png','package.png');
                                
                              
                               if(pack=='*.*')
                                   tree.insertNewChild('PackageNode;'+s[1]+';'+s[2]+';*.*:Default Package', 'ClassNode;'+s[1]+';'+s[2]+';Default Package:'+name ,name ,null ,'java.png','java.png','java.png');
                               else
                                   tree.insertNewChild(id, 'ClassNode;'+s[1]+';'+s[2]+';'+s[3].split(':')[1]+':'+name ,name ,null ,'java.png','java.png','java.png');
                               
                               
                   
                    manejadorTableroNotificaciones('Cargar Clase '+name,usuario);
                              
                   }
                   
                   function uiCargarFichero(id){
                       idAux=id;
                       var s=id.split(';');
                       var nameP='*.*';
                       if(s[0]=='PackageNode'){
                           var nameP=s[3].split(':')[1];
                           if(nameP=='Default Package')
                               nameP='*.*';
                       }
             
                       abrirVentana("../IDE/uiCargarFichero.jsp?name="+s[1]+"&owner="+s[2]+"&nameP="+nameP+"&ran="+Math.random()*99999999999,"Cargar Fichero",false);
                       
                   } 
                   
                   function cargarFichero(name){
                    var id=idAux;
                    idAux='';
                    var msj='<xml><u>'+user+'</u><op>rui</op><data><m>cf</m><id>'+id+'</id><name>'+name+'</name></data></xml>';
                    var s=id.split(';');
                    canalNotificaciones.emit("nuevoMsg",{c:s[1]+';'+s[2],msj:msj,u:user,s:idS});               
                   }
                   
                   function cargarFicheroRUI(id,name,usuario){
                       
                       var s=id.split(';');
                    
                    var pack='*.*';
                    if(s[0]!='SRCNode')pack='';
                    
                    var indexTree=tree.getIndexById('PackageNode;'+s[1]+';'+s[2]+';*.*:Default Package');
                               if(indexTree==null || indexTree=='undefined') 
                                    tree.insertNewChild('SRCNode;'+s[1]+';'+s[2], 'PackageNode;'+s[1]+';'+s[2]+';*.*:Default Package' ,'Default Package',null ,'package.png','package.png','package.png');
                                
                    var idParentNodo; 
                    var tif=getTipoFichero(name);
                    var imagen=getImagenFichero(tif);
                               if(pack=='*.*'){
                                   idParentNodo='PackageNode;'+s[1]+';'+s[2]+';*.*:Default Package';
                                   tree.insertNewChild('PackageNode;'+s[1]+';'+s[2]+';*.*:Default Package', 'FileNode;'+s[1]+';'+s[2]+';Default Package:'+name ,name ,null ,imagen,imagen,imagen);
                               }else{
                                   idParentNodo=id;
                                   tree.insertNewChild(id, 'FileNode;'+s[1]+';'+s[2]+';'+s[3].split(':')[1]+':'+name ,name ,null ,imagen,imagen,imagen);
                               }
                   
                   getItemTreeMemory(idParentNodo).ficheros.push({tipo:'FileNode',nombre: name, imagen:imagen,tipoFichero:tif}); 
                   manejadorTableroNotificaciones('Cargar Fichero '+name,usuario);
                   }
                   
                   function uiCargarLibreria(id){
                       idAux=id;
                       var s=id.split(';');
                       if(s[0]!='LIBSNode'){
                          
                       }
             
                       abrirVentana("../IDE/uiCargarLibreria.jsp?name="+s[1]+"&owner="+s[2]+"&ran="+Math.random()*99999999999,"Cargar Libreria",false);
                       
                   } 
                   
                   function cargarLibreria(name){
                       
                       var id=idAux;
                       idAux='';
                       var msj='<xml><u>'+user+'</u><op>rui</op><data><m>cl</m><id>'+id+'</id><name>'+name+'</name></data></xml>';
                       var s=id.split(';');
                       canalNotificaciones.emit("nuevoMsg", {c:s[1]+';'+s[2],msj:msj,u:user,s:idS});
                                          
                   }
                   
                   function cargarLibreriaRUI(id,name,usuario){
                       
                       var s=id.split(';');
                       tree.insertNewChild(id, 'LibrarieNode;'+s[1]+';'+s[2]+';LIBSNode:'+name ,name ,null ,'lib.png','lib.png','lib.png');
                      getProject(s[1],s[2]).libs.push({imagen:'package.png',nombre:name,tipo:'LibrarieNode'});
                       manejadorTableroNotificaciones('Cargar Libreria '+name,usuario);
                   }
                   function eliminarLibreria(id){
                       
                       var s=id.split(';'); 
                        if (confirm('Desear eliminar la libreria "'+s[3].split(':')[1]+'"')){
                            
                            $.get("../IDE/eliminarLibreria.jsp?name="+s[1]+"&owner="+s[2]+"&nameL="+s[3].split(':')[1],function(data){
                                
                                if(jsonParse(data).answ=="ok"){
                                    var msj='<xml><u>'+user+'</u><op>rui</op><data><m>el</m><id>'+id+'</id></data></xml>';
                                    canalNotificaciones.emit("nuevoMsg", {c:s[1]+';'+s[2],msj:msj,u:user,s:idS});
                              
                                }else
                                    alert('Operacion fallida');
                                
                            });                            
                            
                            return;
                        }
                        else 
                          return null;
                       
                       
                       
                   }
                   
                   function eliminarLibreriaRUI(id,usuario){
                       tree.deleteItem(id,true);
                       if(usuario==user)
                           alert('Operacion Exitosa!!');
                       removerItemTreeMemory(id);
                       manejadorTableroNotificaciones('Eliminar Libreria',usuario);
                       
                   }
                   function cortar_copiar__pegar_Clase(idIni,idFin,cut){
                   
                        var sIni=idIni.split(';');
                        var sFin=idFin.split(';');
                        
                        var pIni=sIni[1];
                        var pFin=sFin[1];
                        
                        
                        var oIni=sIni[2];
                        var oFin=sFin[2];
                        
                        var classe=sIni[3].split(':')[1];
                        var packI='*.*';
                         if(sIni[3].split(':')[0]!='Default Package')
                            packI=sIni[3].split(':')[0];
                        
                        var packF='*.*';
                        
                     if(sFin[0]!='SRCNode')   {
                        
                         if(sFin[3].split(':')[1]!='Default Package')
                            packF=sFin[3].split(':')[1];
                    }
              var msj='<xml><u>'+user+'</u><op>rui</op><data><m>ccpc</m><idI>'+idIni+'</id><idF>'+idFin+'</idF><o>'+cut+'</o></data></xml>';
              if(!cut){       
                        $.get("../IDE/moverClase.jsp?name1="+pIni+"&owner1="+oIni+"&pack1="+packI+"&nameC="+classe+"&name2="+pFin+"&owner2="+oFin+"&pack2="+packF+"&cut=false",function(data){
                            
                            if(jsonParse(data).answ=="ok"){
                            
                            ////ARREEEEEEEGLLLLLLLARRRRRRRRRrr
                                 //--- canalNotificaciones.emit("nuevoMsg", msj);//este es coopiiiiiiarrr 
                                var msj1='<xml><u>'+user+'</u><op>rui</op><data><m>ac</m><id>'+idFin+'</id><name>'+classe+'</name></data></xml>'; 
                                canalNotificaciones.emit("nuevoMsg", {c:pFin+';'+oFin,msj:msj1,u:user,s:idS});
                                    
                                    
                            }else
                                    alert('Operacion fallida');
                                return false;
                        });
              }
              else{
              
                        $.get("../IDE/moverClase.jsp?name1="+pIni+"&owner1="+oIni+"&pack1="+packI+"&nameC="+classe+"&name2="+pFin+"&owner2="+oFin+"&pack2="+packF+"&cut=true",function(data){
                            
                            if(jsonParse(data).answ=="ok"){
                                   ////ARREEEEEEEGLLLLLLLARRRRRRRRRrr  
                                //-- canalNotificaciones.emit("nuevoMsg", msj);
                                 var msj2='<xml><u>'+user+'</u><op>rui</op><data><m>ec</m><id>'+idIni+'</id></data></xml>';
                                 var msj1='<xml><u>'+user+'</u><op>rui</op><data><m>ac</m><id>'+idFin+'</id><name>'+classe+'</name></data></xml>'; 
                                canalNotificaciones.emit("nuevoMsg", {c:pIni+';'+oIni,msj:msj2,u:user,s:idS});//notifica que cortaron...
                                canalNotificaciones.emit("nuevoMsg", {c:pFin+';'+oFin,msj:msj1,u:user,s:idS});//notifica que copiaron...
                                      
                            }else
                                    alert('Operacion fallida');
                                return false;
                        });
       
              
              }
         }
                  
         
                  function cortar_pegar_ClaseRUI(idIni,idFin,usuario){
                      var sIni=idIni.split(';');
                        var sFin=idFin.split(';');
                        
                        var pIni=sIni[1];
                        var pFin=sFin[1];
                        
                        
                        var oIni=sIni[2];
                        var oFin=sFin[2];
                        
                        var classe=sIni[3].split(':')[1];
                        var packI='*.*';
                         if(sIni[3].split(':')[0]!='Default Package')
                            packI=sIni[3].split(':')[0];
                        
                        var packF='*.*';
                        
                     if(sFin[0]!='SRCNode')   {
                        
                         if(sFin[3].split(':')[1]!='Default Package')
                            packF=sFin[3].split(':')[1];
                    }
                      
                                 if(sFin[0]=='SRCNode'){
                            
                                       var indexTree=tree.getIndexById('PackageNode;'+pFin+';'+oFin+';*.*:Default Package');
                                     
                                         if(indexTree==null || indexTree=='undefined') 
                                             tree.insertNewChild(idFin ,'PackageNode;'+pFin+';'+oFin+';*.*:Default Package','DefaultPackage',null ,'package.png','package.png','package.png');

                                       tree.insertNewChild('PackageNode;'+pFin+';'+oFin+';*.*:Default Package', 'ClassNode;'+pFin+';'+oFin+';Default Package:'+classe ,classe ,null ,'java.png','java.png','java.png');

                                  
                                         }
                                  else
                                        tree.insertNewChild(idFin ,'ClassNode;'+pFin+';'+oFin+';'+packF+':'+classe,classe ,null ,'java.png','java.png','java.png');
                           
                           
                           if(haveProject(sIni[1],sIni[2])){         
                                tree.deleteItem(idIni,true); 
                                 evaluarEliminacionDefaultPackage(idIni);
                           }
                        manejadorTableroNotificaciones('Cortar-Pegar Clase',usuario);
                               return false;
                      
                  }
                  
                  function copiar_pegar_ClaseRUI(idIni,idFin,usuario){
                      var sIni=idIni.split(';');
                        var sFin=idFin.split(';');
                        
                        var pIni=sIni[1];
                        var pFin=sFin[1];
                        
                        
                        var oIni=sIni[2];
                        var oFin=sFin[2];
                        
                        var classe=sIni[3].split(':')[1];
                        var packI='*.*';
                         if(sIni[3].split(':')[0]!='Default Package')
                            packI=sIni[3].split(':')[0];
                        
                        var packF='*.*';
                        
                     if(sFin[0]!='SRCNode')   {
                        
                         if(sFin[3].split(':')[1]!='Default Package')
                            packF=sFin[3].split(':')[1];
                    }
                      if(sFin[0]=='SRCNode'){
                                      
                                       var indexTree=tree.getIndexById('PackageNode;'+pFin+';'+oFin+';*.*:Default Package');
                                         if(indexTree==null || indexTree=='undefined') 
                                             tree.insertNewChild(idFin ,'Default Package',null ,'package.png','package.png','package.png');

                                       tree.insertNewChild('PackageNode;'+pFin+';'+oFin+';*.*:Default Package', 'ClassNode;'+pFin+';'+oFin+';Default Package:'+classe ,classe ,null ,'java.png','java.png','java.png');

                                  
                                         }
                                  else
                                        tree.insertNewChild(idFin ,'ClassNode;'+pFin+';'+oFin+';'+packF+':'+classe,classe ,null ,'java.png','java.png','java.png');
                                    
                                  
                      manejadorTableroNotificaciones('Copiar-Pegar Clase',usuario);
                               return false;
                      
                  }
                  
                  function cortar_copiar__pegar_GUI(idIni,idFin,cut){
                   
                        var sIni=idIni.split(';');
                        var sFin=idFin.split(';');
                        
                        var pIni=sIni[1];
                        var pFin=sFin[1];
                        
                        
                        var oIni=sIni[2];
                        var oFin=sFin[2];
                        
                        var classe=sIni[3].split(':')[1];
                        var packI='*.*';
                         if(sIni[3].split(':')[0]!='Default Package')
                            packI=sIni[3].split(':')[0];
                        
                        var packF='*.*';
                        
                     if(sFin[0]!='SRCNode')   {
                        
                         if(sFin[3].split(':')[1]!='Default Package')
                            packF=sFin[3].split(':')[1];
                    }
               var msj='<xml><u>'+user+'</u><op>rui</op><data><m>ccpg</m><idI>'+idIni+'</id><idF>'+idFin+'</idF><o>'+cut+'</o></data></xml>'; 
              if(!cut){       
                        $.get("../IDE/moverGUI.jsp?name1="+pIni+"&owner1="+oIni+"&pack1="+packI+"&nameC="+classe+"&name2="+pFin+"&owner2="+oFin+"&pack2="+packF+"&cut=false",function(data){
                            
                            if(jsonParse(data).answ=="ok"){
                                    ////ARREEEEEEEGLLLLLLLARRRRRRRRRrr
                                      ///--canalNotificaciones.emit("nuevoMsg", msj);//este es coopiiiiiiarrr 
                                var msj='<xml><u>'+user+'</u><op>rui</op><data><m>acg</m><id>'+idFin+'</id><name>'+classe+'</name></data></xml>'; 
                                canalNotificaciones.emit("nuevoMsg", {c:pFin+';'+oFin,msj:msj,u:user,s:idS});
                                      
                            }else
                                    alert('Operacion fallida');
                                return false;
                        });
              }
              else{
              
                        $.get("../IDE/moverGUI.jsp?name1="+pIni+"&owner1="+oIni+"&pack1="+packI+"&nameC="+classe+"&name2="+pFin+"&owner2="+oFin+"&pack2="+packF+"&cut=true",function(data){
                            
                            if(jsonParse(data).answ=="ok"){
                                
                                 var msj2='<xml><u>'+user+'</u><op>rui</op><data><m>ecg</m><id>'+idIni+'</id></data></xml>';
                                 var msj1='<xml><u>'+user+'</u><op>rui</op><data><m>acg</m><id>'+idFin+'</id><name>'+classe+'</name></data></xml>'; 
                                 canalNotificaciones.emit("nuevoMsg", {c:pIni+';'+oIni,msj:msj2,u:user,s:idS});//notifica que cortaron...
                                 canalNotificaciones.emit("nuevoMsg", {c:pFin+';'+oFin,msj:msj1,u:user,s:idS});//notifica que copiaron...
                                     
                            }else
                                    alert('Operacion fallida');
                                return false;
                        });
       
              
              }
         }
                  
                  function copiar_pegar_GUIRUI(idIni,idFin,usuario){
                      
                      var sIni=idIni.split(';');
                        var sFin=idFin.split(';');
                        
                        var pIni=sIni[1];
                        var pFin=sFin[1];
                        
                        
                        var oIni=sIni[2];
                        var oFin=sFin[2];
                        
                        var classe=sIni[3].split(':')[1];
                        var packI='*.*';
                         if(sIni[3].split(':')[0]!='Default Package')
                            packI=sIni[3].split(':')[0];
                        
                        var packF='*.*';
                        
                     if(sFin[0]!='SRCNode')   {
                        
                         if(sFin[3].split(':')[1]!='Default Package')
                            packF=sFin[3].split(':')[1];
                    }
                      
                      if(sFin[0]=='SRCNode'){
                                     
                                       var indexTree=tree.getIndexById('PackageNode;'+pFin+';'+oFin+';*.*:Default Package');
                                         if(indexTree==null || indexTree=='undefined') 
                                             tree.insertNewChild(idFin ,'Default Package',null ,'package.png','package.png','package.png');

                                       tree.insertNewChild('PackageNode;'+pFin+';'+oFin+';*.*:Default Package', 'GUINode;'+pFin+';'+oFin+';Default Package:'+classe ,classe ,null ,'form.png','form.png','form.png');

                                  
                                         }
                                  else
                                        tree.insertNewChild(idFin ,'GUINode;'+pFin+';'+oFin+';'+packF+':'+classe,classe ,null ,'form.png','form.png','form.png');
                                    
                                  
                    manejadorTableroNotificaciones('Cortar-Pegar GUI',usuario);
                               return false;  
                      
                  }
                  
                  function cortar_pegar_GUIRUI(idIni,idFin,usuario){
                      
                      var sIni=idIni.split(';');
                        var sFin=idFin.split(';');
                        
                        var pIni=sIni[1];
                        var pFin=sFin[1];
                        
                        
                        var oIni=sIni[2];
                        var oFin=sFin[2];
                        
                        var classe=sIni[3].split(':')[1];
                        var packI='*.*';
                         if(sIni[3].split(':')[0]!='Default Package')
                            packI=sIni[3].split(':')[0];
                        
                        var packF='*.*';
                        
                     if(sFin[0]!='SRCNode')   {
                        
                         if(sFin[3].split(':')[1]!='Default Package')
                            packF=sFin[3].split(':')[1];
                    }
                      
                                 if(sFin[0]=='SRCNode'){
                                     
                                       var indexTree=tree.getIndexById('PackageNode;'+pFin+';'+oFin+';*.*:Default Package');
                                     
                                         if(indexTree==null || indexTree=='undefined') 
                                             tree.insertNewChild(idFin ,'PackageNode;'+pFin+';'+oFin+';*.*:Default Package','DefaultPackage',null ,'package.png','package.png','package.png');

                                       tree.insertNewChild('PackageNode;'+pFin+';'+oFin+';*.*:Default Package', 'GUINode;'+pFin+';'+oFin+';Default Package:'+classe ,classe ,null ,'form.png','form.png','form.png');

                                  
                                         }
                                  else
                                        tree.insertNewChild(idFin ,'GUINode;'+pFin+';'+oFin+';'+packF+':'+classe,classe ,null ,'form.png','form.png','form.png');
                                 
                              if(haveProject(sIni[1],sIni[2])){      
                                tree.deleteItem(idIni,true); 
                                 evaluarEliminacionDefaultPackage(idIni);
                               }
                               
                          manejadorTableroNotificaciones('Cortar-Pegar GUI',usuario);
                               return false; 
                      
                  }
                  
                  
                   function cortar_copiar__pegar_Fichero(idIni,idFin,cut){
                   
                        var sIni=idIni.split(';');
                        var sFin=idFin.split(';');
                        
                        var pIni=sIni[1];
                        var pFin=sFin[1];
                        
                        
                        var oIni=sIni[2];
                        var oFin=sFin[2];
                        
                        var classe=sIni[3].split(':')[1];
                        var packI='*.*';
                         if(sIni[3].split(':')[0]!='Default Package')
                            packI=sIni[3].split(':')[0];
                        
                        var packF='*.*';
                        
                     if(sFin[0]!='SRCNode')   {
                        
                         if(sFin[3].split(':')[1]!='Default Package')
                            packF=sFin[3].split(':')[1];
                    }
              var msj='<xml><u>'+user+'</u><op>rui</op><data><m>ccpf</m><idI>'+idIni+'</id><idF>'+idFin+'</idF><o>'+cut+'</o></data></xml>'; 
              if(!cut){       
                        $.get("../IDE/moverFichero.jsp?name1="+pIni+"&owner1="+oIni+"&pack1="+packI+"&nameF="+classe+"&name2="+pFin+"&owner2="+oFin+"&pack2="+packF+"&cut=false",function(data){
                            
                            if(jsonParse(data).answ=="ok"){
                                 var msj1='<xml><u>'+user+'</u><op>rui</op><data><m>af</m><id>'+idFin+'</id><name>'+classe+'</name></data></xml>'; 
                                canalNotificaciones.emit("nuevoMsg", {c:pFin+';'+oFin,msj:msj1,u:user,s:idS});//notifica que copiaron...
                                       
                            }else
                                    alert('Operacion fallida');
                                return false;
                        });
              }
              else{
              
                        $.get("../IDE/moverFichero.jsp?name1="+pIni+"&owner1="+oIni+"&pack1="+packI+"&nameF="+classe+"&name2="+pFin+"&owner2="+oFin+"&pack2="+packF+"&cut=true",function(data){
                            
                            if(jsonParse(data).answ=="ok"){
                                    var msj2='<xml><u>'+user+'</u><op>rui</op><data><m>ef</m><id>'+idIni+'</id></data></xml>';
                                    var msj1='<xml><u>'+user+'</u><op>rui</op><data><m>af</m><id>'+idFin+'</id><name>'+classe+'</name></data></xml>'; 
                                   canalNotificaciones.emit("nuevoMsg", {c:pIni+';'+oIni,msj:msj2,u:user,s:idS});//notifica que cortaron...
                                   canalNotificaciones.emit("nuevoMsg", {c:pFin+';'+oFin,msj:msj1,u:user,s:idS});//notifica que copiaron...
                                      
                            }else
                                    alert('Operacion fallida');
                                return false;
                        });
       
              
              }
         }
                   
                   function cortar_pegar_FicheroRUI(idIni,idFin,usuario){
                     
                     var sIni=idIni.split(';');
                        var sFin=idFin.split(';');
                        
                        var pIni=sIni[1];
                        var pFin=sFin[1];
                        
                        
                        var oIni=sIni[2];
                        var oFin=sFin[2];
                        
                        var classe=sIni[3].split(':')[1];
                        var packI='*.*';
                         if(sIni[3].split(':')[0]!='Default Package')
                            packI=sIni[3].split(':')[0];
                        
                        var packF='*.*';
                        
                     if(sFin[0]!='SRCNode')   {
                        
                         if(sFin[3].split(':')[1]!='Default Package')
                            packF=sFin[3].split(':')[1];
                    }
                              if(sFin[0]=='SRCNode'){
                                   
                                       var indexTree=tree.getIndexById('PackageNode;'+pFin+';'+oFin+';*.*:Default Package');
                                       
                                         if(indexTree==null || indexTree=='undefined') 
                                             tree.insertNewChild(idFin ,'PackageNode;'+pFin+';'+oFin+';*.*:Default Package','DefaultPackage',null ,'package.png','package.png','package.png');

                                       tree.insertNewChild('PackageNode;'+pFin+';'+oFin+';*.*:Default Package', 'FileNode;'+pFin+';'+oFin+';Default Package:'+classe ,classe ,null ,'file.png','file.png','file.png');

                                  
                                         }
                                  else
                                        tree.insertNewChild(idFin ,'FileNode;'+pFin+';'+oFin+';'+packF+':'+classe,classe ,null ,'file.png','file.png','file.png');
                                 
                             if(haveProject(sIni[1],sIni[2])){        
                                tree.deleteItem(idIni,true); 
                                 evaluarEliminacionDefaultPackage(idIni);
                             }
                   manejadorTableroNotificaciones('Cortar-Pegar Fichero',usuario);
                               return false;
                       
                       
                   }
                   
                   function copiar_pegar_FicheroRUI(idIni,idFin,usuario){
                      
                      var sIni=idIni.split(';');
                        var sFin=idFin.split(';');
                        
                        var pIni=sIni[1];
                        var pFin=sFin[1];
                        
                        
                        var oIni=sIni[2];
                        var oFin=sFin[2];
                        
                        var classe=sIni[3].split(':')[1];
                        var packI='*.*';
                         if(sIni[3].split(':')[0]!='Default Package')
                            packI=sIni[3].split(':')[0];
                        
                        var packF='*.*';
                        
                     if(sFin[0]!='SRCNode')   {
                        
                         if(sFin[3].split(':')[1]!='Default Package')
                            packF=sFin[3].split(':')[1];
                    }
                        
                                   if(sFin[0]=='SRCNode'){
                                    
                                       var indexTree=tree.getIndexById('PackageNode;'+pFin+';'+oFin+';*.*:Default Package');
                                         if(indexTree==null || indexTree=='undefined') 
                                             tree.insertNewChild(idFin ,'Default Package',null ,'package.png','package.png','package.png');

                                       tree.insertNewChild('PackageNode;'+pFin+';'+oFin+';*.*:Default Package', 'FileNode;'+pFin+';'+oFin+';Default Package:'+classe ,classe ,null ,'file.png','file.png','file.png');

                                  
                                         }
                                  else
                                        tree.insertNewChild(idFin ,'FileNode;'+pFin+';'+oFin+';'+packF+':'+classe,classe ,null ,'file.png','file.png','file.png');
                                    
                       manejadorTableroNotificaciones('Copiar-Pegar Fichero',usuario);
                                    
                               return false;
                       
                       
                   }
                   
                   function cortar_copiar__pegar_Libreria(idIni,idFin,cut){
                   
                        var sIni=idIni.split(';');
                        var sFin=idFin.split(';');
                        
                        var pIni=sIni[1];
                        var pFin=sFin[1];
                        
                        
                        var oIni=sIni[2];
                        var oFin=sFin[2];
                        
                        var lib=sIni[3].split(':')[1];
                      
             var msj='<xml><u>'+user+'</u><op>rui</op><data><m>ccpl</m><idI>'+idIni+'</id><idF>'+idFin+'</idF><o>'+cut+'</o></data></xml>'; 
              if(!cut){       
                        $.get("../IDE/moverLibreria.jsp?name1="+pIni+"&owner1="+oIni+"&nameL="+lib+"&name2="+pFin+"&owner2="+oFin+"&cut=false",function(data){
                            
                            if(jsonParse(data).answ=="ok"){
                                var msj='<xml><u>'+user+'</u><op>rui</op><data><m>cl</m><id>'+idFin+'</id><name>'+lib+'</name></data></xml>';
                                canalNotificaciones.emit("nuevoMsg", {c:pIni+';'+oIni,msj:msj,u:user,s:idS});
                    
                               
                            
                            }else
                                    alert('Operacion fallida');
                                return false;
                        });
              }
              else{
              
                        $.get("../IDE/moverLibreria.jsp?name1="+pIni+"&owner1="+oIni+"&nameL="+lib+"&name2="+pFin+"&owner2="+oFin+"&cut=true",function(data){
                            
                            if(jsonParse(data).answ=="ok"){
                                 var msj1='<xml><u>'+user+'</u><op>rui</op><data><m>el</m><id>'+idIni+'</id></data></xml>';
                                 var msj2='<xml><u>'+user+'</u><op>rui</op><data><m>cl</m><id>'+idFin+'</id><name>'+lib+'</name></data></xml>';
                                canalNotificaciones.emit("nuevoMsg", {c:pIni+';'+oIni,msj:msj1,u:user,s:idS});
                                 canalNotificaciones.emit("nuevoMsg", {c:pFin+';'+oFin,msj:msj2,u:user,s:idS});
                                
                            }else
                                    alert('Operacion fallida');
                                return false;
                        });
       
              
              }
         }
                   
                   function cortar_pegar_LibreriaRUI(idIni,idFin,usuario){
                         
                        var sIni=idIni.split(';');
                        var sFin=idFin.split(';');
                        
                        var pIni=sIni[1];
                        var pFin=sFin[1];
                        
                        
                        var oIni=sIni[2];
                        var oFin=sFin[2];
                        
                        var lib=sIni[3].split(':')[1];
                         
                         tree.insertNewChild(idFin ,'LibNode;'+pFin+';'+oFin+';*.*:'+lib,lib ,null ,'lib.png','lib.png','lib.png');
                        
                        if(haveProject(sIni[1],sIni[2])){ 
                            tree.deleteItem(idIni,true); 
                        }
                        manejadorTableroNotificaciones('Cortar-Pegar Libreria',usuario);
                                 return false;   
                       
                   }
                   function copiar_pegar_LibreriaRUI(idIni,idFin,usuario){
                       
                        var sIni=idIni.split(';');
                        var sFin=idFin.split(';');
                        
                        var pIni=sIni[1];
                        var pFin=sFin[1];
                        
                        
                        var oIni=sIni[2];
                        var oFin=sFin[2];
                        
                        var lib=sIni[3].split(':')[1];
                        tree.insertNewChild(idFin ,'LibNode;'+pFin+';'+oFin+';*.*:'+lib,lib ,null ,'lib.png','lib.png','lib.png');
                        manejadorTableroNotificaciones('Copiar-Pegar Libreria',usuario);
                          return false;   
                       
                   }
                   
                   function moverPaquete(){}
                   function moverLibreria(){}
                   function moverFicheros(){}
                   
                   function cerrarProyecto(id){
                      
                      var s=id.split(';');
                      $.get("../IDE/cerrarProyecto.jsp?name="+s[1]+"&owner="+s[2], function(data) {
                          
                         
                               tree.deleteItem(id,true);
                               popProject(s[1],s[2]);
                               if(projectsMemory == null || projectsMemory.length==0 || projectsMemory[0]==null){
                                   tree.setItemImage("MainNode","gg2.png","gg2.png");
                                   tree.setItemText("MainNode", "No tiene proyectos activos");
                               }                         
                          
                          
                      });
                       
                   }
                   
                   function isFatherPackage(father,child){
                       
                       var pFa=father.split('.');
                       var pChil=child.split('.');
                       if(pChil.length<=pFa.length)return false;
                       
                       for(var i in pFa){
                           
                           if(pFa[i]!=pChil[i])return false;
                       }
                       
                       return true;  
                   }
                   
                   function getNewNamePackage(father,child){
                       
                       var pFa=father.split('.');
                       var pChil=child.split('.');
                       var nnp='';
                       var j=0;
                       for(var i in pFa){
                           var aux='.';
                           if(i==0)aux='';
                           nnp+=aux+pFa[i];
                           j=i;
                       }
                       for(var i in pChil){
                           if(i<=j)continue;
                           var aux='.';
                           if(i==0)aux='';
                           nnp+=aux+pChil[i];
                       }
                       return nnp;  
                   }
                   
                   function getPlantilla(tipo){
                       
                       switch(tipo){
                           
                           
                           case 0:{//si es clase normal
                               
                           }
                           case 1:{//si es clase gui
                                   
                           }
                       }
                   }
                   
                   function cerrarIDE(){
                       //confirmar=confirm("Desear cerrar session?"); 
                        if (confirm("¿ Desear cerrar la IDE ?")){
                            if(projectsMemory.length==0){
                                window.location.href='../IDE/index.jsp';
                                return;
                            }
                            $.get('../IDE/cerrarIDE.jsp',function(data){
                    
                                 window.location.href='../IDE/index.jsp';
                       
                            });
                  
                          return;
                        }
                        else 
                        //Aquí pones lo que quieras Cancelar 
                        return null;  
                   }
                   
                   function abrirVentana(url,title,con){
                       var r=Math.random()*99999999999;
                       var c='?';
                       if(con)c='&';
                       box(title,url+c+"ran="+r);
                   }
               
                   function pruebaGuardarGUI(){

                        control_tab.guardar();

                 }
                 
                   function deleteFocus(){
                     
                     control_tab.deleteFocusLienzo();
                     
                 }
                 
                   function getElementoLienzoFoco(){
                     
                     control_tab.getElementoLienzoFoco();
                 }
      
              
                   function eventoTecladoIDE(e){
                      
                      control_tab.eventoTeclado(e);
                 } 

                   function compartirProyecto(id){
                       var s=id.split(';');
                     abrirVentana('../IDE/uiCompartirProyecto.jsp?name='+s[1]+'&owner='+s[2]+'&type=1','Compartir Proyecto',true);
                    }
                 
                   function propiedadesProyecto(id){
                     var s=id.split(';');
                     var mc='';
                     for(var i in projectsMemory){
                            if(projectsMemory[i].nombre==s[1] && projectsMemory[i].propietario==s[2]){
                                mc=projectsMemory[i].clase;
                            }

                        }
                 
                   abrirVentana('../IDE/uiPropiedadesProyecto.jsp?name='+s[1]+'&owner='+s[2]+'&type=1','Propiedades Proyecto',true);
                 }
                   function manejadorNotificaciones(data){
       
                      var xmlDoc = $.parseXML( data );
                      var $xml = $( xmlDoc );
                      var usuario=$xml.find('u').text();
                      switch ($xml.find('op').text()){

                             case 'chat':{
                                     manejadorChat($xml,usuario);
                                     break;
                             }
                             case 'rui':{
                                     manejadorRUI($xml,usuario,data.c);
                                     break;
                             }
                             case 'ml':{
                                     manejadorCUI($xml,usuario);
                                     break;
                             }
                             case 'cuser':{
                                     notificarConexionUsuario($xml); 
                                     break;
                             }

                         }
                   }
                 
                   function manejadorChat(xml,usuario){
                   
                    var data=$(xml).find('data');
                    switch  (data.find('m').text()){
                        case 'em':{
                                
                                showMessage(usuario,data.find('msg').text(),data.find('ct').text(),data.find('idc').text());
                                break;
                            }
                    }
                 }
                 
                   function manejadorSessiones(xml,usuario){
                     var xmlDoc = $.parseXML( data );
                     var xml = $( xmlDoc );
                      var data=$(xml).find('data');
                    switch  (data.find('m').text()){
                        
                        case 'cs':{///cerrar session
                              
                                if(data.find('idS').text()!=idS && usuario==user){
                                  alert('Se ha iniciado otra session de esta cuenta en otro lugar');
                                  window.location.href='../IDE/index.html?msj=se';
                                }
                                break;
                        }
                     }
                     
                 }
                
                   function manejadorRUI(xml,usuario,p){
        
                    var data=$(xml).find('data');
                    switch  (data.find('m').text()){
                        
                        case 'rc':{
                                renombrarClaseRUI(data.find('id').text(),data.find('name').text(),usuario);
                                break;
                        }
                        case 'rcg':{
                                renombrarClaseGUIRUI(data.find('id').text(),data.find('name').text(),usuario);
                                break;
                        }
                        case 'rf':{
                                renombrarFicheroRUI(data.find('id').text(),data.find('name').text(),usuario);
                                break;
                        }
                        case 'rl':{
                                renombrarLibreriaRUI(data.find('id').text(),data.find('name').text(),usuario);
                                break;
                        }
                        case 'rp':{
                                renombrarPaqueteRUI(data.find('id').text(),data.find('name').text(),usuario);
                                break;
                        }
                        case 'rP':{
                                renombrarProyectoRUI(data.find('id').text(),data.find('name').text(),usuario);
                                break;
                        }
                        case 'ac':{
                                agregarClaseRUI(data.find('id').text(),data.find('name').text(),usuario);
                                break;
                        }
                        case 'acg':{
                                agregarClaseGUIRUI(data.find('id').text(),data.find('name').text(),usuario);
                                break;
                        }
                        case 'af':{
                                agregarFicheroRUI(data.find('id').text(),data.find('name').text(),usuario);
                                break;
                        }
                        case 'ap':{
                                agregarPaqueteRUI(data.find('id').text(),data.find('name').text(),usuario);
                                break;
                        }
                        case 'ec':{
                                eliminarClaseRUI(data.find('id').text(),usuario);
                                break;
                        }
                        case 'ecg':{
                                eliminarClaseGUIRUI(data.find('id').text(),usuario);
                                break;
                        }
                        case 'ef':{
                                eliminarFicheroRUI(data.find('id').text(),usuario);
                                break;
                        }
                        case 'ep':{
                                eliminarPaqueteRUI(data.find('id').text(),usuario);
                                break;
                        }
                        case 'el':{
                                eliminarLibreriaRUI(data.find('id').text(),usuario);
                                break;
                        }
                        case 'eP':{
                                eliminarProyectoRUI(data.find('id').text(),usuario);
                                break;
                        }
                        case 'euP':{
                                eliminarUsuarioProyectoRUI(data.find('idU').text(),data.find('name').text(),data.find('owner').text());
                                break;
                        }
                        case 'cc':{
                                cargarClaseRUI(data.find('id').text(),data.find('name').text(),usuario);
                                break;
                        }
                        case 'cf':{
                                cargarFicheroRUI(data.find('id').text(),data.find('name').text(),usuario);
                                break;
                        }
                        case 'cl':{
                                cargarLibreriaRUI(data.find('id').text(),data.find('name').text(),usuario);
                                break;
                        }
                        case 'ccpc':{
                                if(data.find('o').text()=='true'){
                                  
                                    eliminarClaseRUI(data.find('idI').text(),usuario);
                                }
                                else
                                    copiar_pegar_ClaseRUI(data.find('idI').text(),data.find('idF').text(),usuario);
                                break;
                        }
                        case 'ccpg':{
                                if(parseBool(data.find('o').text()))
                                    cortar_pegar_GUIRUI(data.find('idI').text(),data.find('idF').text(),usuario);
                                else
                                    copiar_pegar_GUIRUI(data.find('idI').text(),data.find('idF').text(),usuario);
                                break;
                        }
                        case 'ccpf':{
                                if(parseBool(data.find('o').text()))
                                    cortar_pegar_FicheroRUI(data.find('idI').text(),data.find('idF').text(),usuario);
                                else
                                    copiar_pegar_FicheroRUI(data.find('idI').text(),data.find('idF').text(),usuario);
                                break;
                        }
                        case 'ccpl':{
                                if(parseBool(data.find('o').text()))
                                    cortar_pegar_LibreriaRUI(data.find('idI').text(),data.find('idF').text(),usuario);
                                else
                                    copiar_pegar_LibreriaRUI(data.find('idI').text(),data.find('idF').text(),usuario);
                                break;
                        }
                        case 'mcp':{
                               
                                $('#objIdNotificador').prepend('<div class="notItemBoard">El usuario "'+usuario+'" ha cambiado la clase principal del proyecto "'+data.find('p').text()+'. Clase anterior: '+data.find('idI').text()+', clase actual: '+data.find('idF').text()+'</div>');
                                break;
                        }
                    }
                  
                  
                  
                 }
                 
                   function manejadorCUI(xml,usuario){
                                       
                     var data=$(xml).find('data');
                   
                     switch  (data.find('m').text()){
                       
                       case 'ac':{
                               control_tab.addComponentPalette(data.find('idC').text(),data.find('idN').text(),data.find('x').text(),data.find('y').text(),data.find('tipo').text(),usuario);
                               break;
                       }
                       case 'rl':{
                               control_tab.resizeLienzo(data.find('idC').text(),data.find('w').text(),data.find('h').text(),usuario);
                               break;
                       }
                       case 'mc':{
                               control_tab.moveComponent(data.find('idC').text(),data.find('x').text(),data.find('y').text(),usuario);
                               break;
                       }
                       case 'mct':{
                               control_tab.moveComponentT(data.find('idC').text(),data.find('x').text(),data.find('y').text(),data.find('cx').text(),data.find('cy').text(),usuario);
                               break;
                       }
                       case 'rc':{
                               control_tab.resizeComponent(data.find('idC').text(),data.find('w').text(),data.find('h').text(),usuario);
                               break;
                       }
                       case 'apc':{
                               control_tab.updatePropertiesComponent_(data.find('idP').text(),data.find('nn').text(),data.find('nv').text(),data.find('nc').text(),data.find('idC').text(),usuario);
                               break;
                       }
                       case 'anc':{
                               control_tab.updateNameComponent_(data.find('idP').text(),data.find('nn').text(),data.find('nc').text(),data.find('idC').text(), usuario);
                               break;
                       }
                       case 'avc':{
                               control_tab.updateValueComponent_(data.find('idP').text(), data.find('nc').text(), data.find('nv').text(),data.find('idC').text(), usuario);
                               break;
                       }
                       case 'ec':{
                               control_tab.deleteComponente_(data.find('idC').text(),usuario);
                               break;
                       }
                   
                    }
                 }
               
                   function manejadorTableroNotificaciones(op,usuario){
                     $('#objIdNotificador').prepend('<div class="notItemBoard"> Operacion : <b>'+op+'</b><br/>Usuario: <b>'+usuario+'</b></div>')
                    }
                   
                   function notificarConexionUsuario(xml){
                     var data=$(xml).find('data');
                     var user=data.find('id').text();
                     var p=data.find('p').text();
                      $('#objIdNotificador').prepend('<div class="notItemBoard" > El usuario <b>"'+user+'"</b> ha abierto el proyecto <b>"'+p+'"</b></div>');
                   }
                 
                   function updatePropertiesComponent(idP, idNameVariable, idValueVariable, comp, idComp){
                        control_tab.updatePropertiesComponent(idP, idNameVariable, idValueVariable, comp,idComp);
                    }
                 
                 
                    function lanzarBox(idP,comp,idComponent,valor,nameUrl){
                        control_tab.lanzarBox(idP,comp,idComponent,valor,nameUrl);
                    }

                    function updateNameComponent(idP, idNameVariable, comp, idComp){
                        control_tab.updateNameComponent(idP, idNameVariable, comp,idComp);
                    }


                    function updateValueComponent(idP,nameComponent,newValue,idComponent){
                        control_tab.updateValueComponent(idP,nameComponent,newValue,idComponent);
                    }

                    //esta funcón permite verificar que el posible nombre de una clase sea permitido
                    function verificarNamePermitidoClase(nombre){
                        var d=/^[a-zA-Z\_\$\ñ\Ñ]/;//esta expresion acepta que la cadena empiece por letra mayuscula o minuscula o que empieze por '_' o por '$'
                        var f=/[^a-zA-Z0-9_$Ññ]+/;//acepta un caracter no permitido para el nombre de una variable
                        var palabra_reservada=/^(abstract)$|^(boolean)$|^(break)$|^(byte)$|^(strinctfp)$|^(case)$|^(catch)$|^(char)$|^(class)$|^(const)$|^(continue)$|^(default)$|^(do)$|^(double)$|^(else)$|^(enum)$|^(extends)$|^(false)$|^(final)$|^(finally)$|^(for)$|^(goto)$|^(implements)$|^(import)$|^(instanceof)$|^(int)$|^(interface)$|^(long)$|^(native)$|^(new)$|^(null)$|^(package)$|^(private)$|^(protected)$|^(public)$|^(return)$|^(short)$|^(static)$|^(super)$|^(swich)$|^(synchtonized)$|^(this)$|^(threadsafe)$|^(throw)$|^(throws)$|^(true)$|^(try)$|^(void)$|^(while)$|^(if)$/;
                        if(d.test(nombre)&&!f.test(nombre)&&!palabra_reservada.test(nombre))
                        {
                            return true;
                        }else{
                            return false;
                        }
                    }


                    //esta funcón permite verificar que el posible nombre de un paquete sea permitido
                    function verificarNamePermitidoPaquete(nombre){
                        var d=/^[a-zA-Z\_\$\ñ\Ñ]/;//esta expresion acepta que la cadena empiece por letra mayuscula o minuscula o que empieze por '_' o por '$'
                        var f=/[^a-zA-Z0-9_$Ññ.]+/;//acepta un caracter no permitido para el nombre de un paquete             
                        var g=/\.(?=\.)/;//encuentra dos puntos seguidos
                        var palabra_reservada=/^(abstract)$|^(boolean)$|^(break)$|^(byte)$|^(strinctfp)$|^(case)$|^(catch)$|^(char)$|^(class)$|^(const)$|^(continue)$|^(default)$|^(do)$|^(double)$|^(else)$|^(enum)$|^(extends)$|^(false)$|^(final)$|^(finally)$|^(for)$|^(goto)$|^(implements)$|^(import)$|^(instanceof)$|^(int)$|^(interface)$|^(long)$|^(native)$|^(new)$|^(null)$|^(package)$|^(private)$|^(protected)$|^(public)$|^(return)$|^(short)$|^(static)$|^(super)$|^(swich)$|^(synchtonized)$|^(this)$|^(threadsafe)$|^(throw)$|^(throws)$|^(true)$|^(try)$|^(void)$|^(while)$|^(if)$/;
                        if(d.test(nombre)&&!f.test(nombre)&&!palabra_reservada.test(nombre)&&!g.test(nombre))
                        {
                            return true;
                        }else{
                            return false;
                        }
                    }


                    function changeUserPrivilege(name,owner,type){
                        if(type=='W')
                            type='Write';
                        else
                            type='Read';
                        for(var i in projectsMemory){
                            if(projectsMemory[i].nombre==name && projectsMemory[i].propietario==owner){
                                projectsMemory[i].type=type;
                                control_tab.changeUserPrivilege(name,owner,type);
                                var img;
                                if(type=='Read')
                                        img='readProject.png';
                                if(type=='Write')
                                        img='writeProject.png';
                                tree.setItemImage("ProjectNode;"+name+";"+owner,img,img);
                                return true;
                            }

                        }
                        return false;
                        
                    }
                    
function resizeEditores(){
    control_tab.resizeEditores();
}
      
function pruebaGenerarGUI(){

    control_tab.generarCodigoJava();
}
     
function getItemTreeMemory(idNodo){
    var s=idNodo.split(';');
    var proy=getProject(s[1],s[2]);
    var dn=s[3].split(':');
    var nombreNodo=dn[1];
    var parent=dn[0];
    var tipo=s[0];
    switch(tipo){
        case 'LibrareNode':{
               var proyLibs= proy.libs
               for(var j in proyLibs){
                       if(nombreNodo==proyLibs[j].nombre){
                           return proyLibs[j];
                       }  
                   }
                break;
        }
        case 'PackageNode':{
           var proySRC=proy.src;
                   for(var j in proySRC){
                       if(nombreNodo==proySRC[j].nombre){
                           return proySRC[j];
                       }  
                   }
            break;
        }
        default:{
           var proySRC=proy.src;
           
                   for(var j in proySRC){
                       if(proySRC[j].nombre==parent){
                           for(var k in proySRC[j].ficheros){
                               if(nombreNodo==proySRC[j].ficheros[k].nombre){
                                   return proySRC[j].ficheros[k];
                               }
                           }
                       }
                   } 
        }
    }
}

function removerItemTreeMemory(idNodo){
    var s=idNodo.split(';');
    var proy=getProject(s[1],s[2]);
    var dn=s[3].split(':');
    var nombreNodo=dn[1];
    var parent=dn[0];
    var tipo=s[0];
    switch(tipo){
        case 'LibrareNode':{
               var proyLibs= proy.libs
               for(var j in proyLibs){
                       if(nombreNodo==proyLibs[j].nombre){
                           return proyLibs.splice(j,1);
                       }  
                   }
                break;
        }
        case 'PackageNode':{
           var proySRC=proy.src;
                   for(var j in proySRC){
                       if(nombreNodo==proySRC[j].nombre){
                           return proySRC.splice(j,1);
                       }  
                   }
            break;
        }
        default:{//fichero o clase
           var proySRC=proy.src;
           
                   for(var j in proySRC){
                       if(proySRC[j].nombre==parent){
                           for(var k in proySRC[j].ficheros){
                               if(nombreNodo==proySRC[j].ficheros[k].nombre){
                                   return proySRC[j].ficheros.splice(k,1);
                               }
                           }
                       }
                   } 
        }
    }
}
  
function getTipoFichero(name){
    var images=["png","jpeg","jpg","gif"];
    var doc=["doc","docx","txt"];
    var pdf=["pdf"];
    var sound=["mp3","wav"];
    var video=["avi","mov","mp4","flv","mpeg"];
    
    var typeImage="image";
    var typeDoc="document";
    var typePdf="pdf";
    var typeSound="sound";
    var typeVideo="video";
    var typeFile="file";
    
    var s=name.split('.');
    var ext=s[s.length-1];
    for(var i in images){
        if(ext==images[i])
            return typeImage;
    }
    for(var i in doc){
            if(ext==doc[i])
                return typeDoc;
    }
    for(var i in pdf){
            if(ext==pdf[i])
                return typePdf;
    }
    for(var i in sound){
            if(ext==sound[i])
                return typeSound;
    }
    for(var i in video){
            if(ext==video[i])
                return typeVideo;
    }
    return typeFile;
}

function getImagenFichero(tf){
    
    switch(tf){
        case 'image':{
                return 'image.png';
        }
        case 'document':{
                return 'txt.png';
        }
        case 'pdf':{
                return 'pdf.png';
        }
        case 'sound':{
                return 'audio.png';
        }
        case 'video':{
                return 'video.png';
        }
        default:{
                return 'desconocido.png';
        }
        
    }
}
    
    function uiAbrirProyecto(){
        //abrirVentana("../IDE/uiCrearProyecto.jsp","Crear Proyecto",false);
        abrirVentana('../IDE/abrirProyecto.jsp','Seleccione proyecto',false);
       
      
    }
    
    function stateUpdatedDFRML(op){
        //for(var i in op){
          //  console.log(op[i].p);
        //}
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

    function lostConexion(){
        setIconConexionState(false);
        $('body').append('<div class="lostConexionBall" style="color:rgb(70,70,70)">Conexion perdida</div>');
        var right = parseInt( $('.divUserInfo').css('width') ) + parseInt( $('.divUserInfo').css('marginRight') );
        $('.lostConexionBall').css('right',right);
        $('.lostConexionBall').show(200);
        setTimeout(function(){
            $('.lostConexionBall').hide(200, function(){
                $('.lostConexionBall').remove();
            });
            
        },3000);
    }

    function setIconConexionState(state){
        if (state) {
            $('.lostConexionBall').remove();
            $('.iconConexionState').attr("src", '../Images/SupportWindow/greenBall.png');
        } else {
            $('.iconConexionState').attr("src", '../Images/SupportWindow/redBall.png');
        }
    }

     
