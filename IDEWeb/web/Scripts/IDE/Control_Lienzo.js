/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function Control_Lienzo(jsp){

    
   
    var jsp=jsp;
    var contenedoresLienzos=new Array();
  

    this.buildLienzo=function(contenedor,json,idNodo,dJava,dFrml){
       ///debe dejar de recibir el json y obtenerlo del dFrml json=dFrml.snapshot;
        if(json==null)
            json=getBasicTemplateGUI();
       
        json=dFrml.snapshot;
        
       console.log(json);
        var idNodoA=idNodo;
        idNodo=normalizarId(idNodo);
      
        //<div id='content"+idNodo+"' class='contentBarraDesplegable'>\n\</div>\n\
        var alto=parseInt($(contenedor).css('height'))-35;
      
        $(contenedor).html("<div id=\"cgGUI"+idNodo+"\" style=\"overflow: auto;width:100%;top:35px;background-color:white;height:"+alto+";\">\n\
                                <div id=\"lienzo"+idNodo+"\" class=\"lienzo\" style=\"top:40px; left:10px; float:left;\"/>\n\
                                <div id='barraLateral"+idNodo+"' class='barraLateral'>\n\
                                        <div class='botonComponente botonDraggableClonable' id='bpc"+idNodo+"' idP='"+idNodoA+"' style='width:100px;height:21px; float:left; margin:15px 15px 0px 15px;'>Button</div>\n\
                                        <div class='textAreaComponente areaDraggableClonable' id='tapc"+idNodo+"' idP='"+idNodoA+"' style='width:100px;height:41px; float:left;margin:15px 15px 0px 15px;' >TextArea</div>\n\
                                        <div class='textFieldComponente fieldDraggableClonable' id='tfpc"+idNodo+"' idP='"+idNodoA+"' style='width:100px;height:21px; float:left;margin:15px 15px 0px 15px;'>TextField</div>\n\
                                        <div class='labelComponente labelDraggableClonable' id='lpc"+idNodo+"' idP='"+idNodoA+"' style='width:100px;height:21px; float:left;margin:15px 15px 0px 15px;'>Label</div>\n\
                                    </div>\n\
                                    <div id='toggler"+idNodo+"' class='toggler' onclick='control_tab.clickToggler(\""+idNodo+"\")'> </div>\n\
                            </div>");
      contenedoresLienzos.push("cgGUI"+idNodo);
        //*******************draggables para los componentes de la paleta**************************
        $('.botonDraggableClonable').draggable({
            cursor: 'move',
            stop: function(event, ui){
               var idpro=$(this).attr('idP').split(';');
               var proyecto=getProject(idpro[1],idpro[2]);
               if(proyecto.type=='Read'){
                   retornarUbicacionC($(this).attr('id'));
                   return;
               }
               var x=(parseInt($('#cgGUI'+idNodo).css("width"))-127)+ui.position.left;//coordenada en x con respecto al lienzo. Es -125 por hay 115px desde el lado derecho de cgGUI al inicio del boton y le adicionamos 10px del left del lienzo
               var y=7+ui.position.top;//coordenada y on respescto al lienzo es 6 porq la altura del boton al cgGUI es de 16px y le restamos 10px de top del lienzo
               var s=$(this).attr('idP').split(';');
               var msj='<xml><u>'+user+'</u><op>ml</op><data><m>ac</m><idC>'+$(this).attr('id')+'</idC><idN>'+idNodo+'</idN><x>'+x+'</x><y>'+y+'</y><tipo>button</tipo></data></xml>';
               canalNotificaciones.emit("nuevoMsg",{c:s[1]+';'+s[2],msj:msj,u:user, s:idS});   
               
            }//fin stop            
        });
        $('.areaDraggableClonable').draggable({
            cursor: 'move',
            stop: function(event, ui){
                var idpro=$(this).attr('idP').split(';');
               var proyecto=getProject(idpro[1],idpro[2]);
               if(proyecto.type=='Read'){
                   retornarUbicacionC($(this).attr('id'));
                   return;
               }
                var x=(parseInt($('#cgGUI'+idNodo).css("width"))-127)+ui.position.left;
                var y=45+ui.position.top;
                var s=$(this).attr('idP').split(';');
                var msj='<xml><u>'+user+'</u><op>ml</op><data><m>ac</m><idC>'+$(this).attr('id')+'</idC><idN>'+idNodo+'</idN><x>'+x+'</x><y>'+y+'</y><tipo>textArea</tipo></data></xml>';
               canalNotificaciones.emit("nuevoMsg",{c:s[1]+';'+s[2],msj:msj,u:user, s:idS});
                        
            }
            
        });
        $('.fieldDraggableClonable').draggable({
            cursor: 'move',
            stop: function(event, ui){
                var idpro=$(this).attr('idP').split(';');
               var proyecto=getProject(idpro[1],idpro[2]);
               if(proyecto.type=='Read'){
                   retornarUbicacionC($(this).attr('id'));
                   return;
               }
                var x=(parseInt($('#cgGUI'+idNodo).css("width"))-127)+ui.position.left;
                var y=103+ui.position.top;
                var s=$(this).attr('idP').split(';');
                var msj='<xml><u>'+user+'</u><op>ml</op><data><m>ac</m><idC>'+$(this).attr('id')+'</idC><idN>'+idNodo+'</idN><x>'+x+'</x><y>'+y+'</y><tipo>textField</tipo></data></xml>';
               canalNotificaciones.emit("nuevoMsg",{c:s[1]+';'+s[2],msj:msj,u:user, s:idS}); 
                      
            }
            
        });
        $('.labelDraggableClonable').draggable({
            cursor: 'move',
            stop: function(event, ui){
                var idpro=$(this).attr('idP').split(';');
               var proyecto=getProject(idpro[1],idpro[2]);
               if(proyecto.type=='Read'){
                   retornarUbicacionC($(this).attr('id'));
                   return;
               }
                var x=(parseInt($('#cgGUI'+idNodo).css("width"))-127)+ui.position.left;
                var y=141+ui.position.top;
                var s=$(this).attr('idP').split(';');
                var msj='<xml><u>'+user+'</u><op>ml</op><data><m>ac</m><idC>'+$(this).attr('id')+'</idC><idN>'+idNodo+'</idN><x>'+x+'</x><y>'+y+'</y><tipo>label</tipo></data></xml>';
               canalNotificaciones.emit("nuevoMsg",{c:s[1]+';'+s[2],msj:msj,u:user, s:idS});        
            }
            
        });
        
        //********************************************************************************************
      
        $('#cgGUI'+idNodo).css('position', 'absolute');
        $('#cgGUI'+idNodo).parent().css('backgroundColor', '#e8f2ff');

        document.getElementById('lienzo'+idNodo).style.height=parseInt(json.height)+20+'px';
        document.getElementById('lienzo'+idNodo).style.width=parseInt(json.width)+20+'px';
    
        //  document.getElementById(idNodo).style.backgroundColor="gray";
        document.getElementById('lienzo'+idNodo).style.position='relative';
        document.getElementById('lienzo'+idNodo).style.top='10px';
        document.getElementById('lienzo'+idNodo).style.left='10px';
    

    
        $('#lienzo'+idNodo).attr("name",idNodoA.split(';')[3].split(':')[1]);
        $('#lienzo'+idNodo).attr("idP",idNodoA);
        $('#lienzo'+idNodo).resizable({
            // autoHide: true,
            ghost: true,
            resize: function(event,ui){           
                     
            },
            stop: function(event, ui) {  
                var idpro=$(this).attr('idP').split(';');
                var proyecto=getProject(idpro[1],idpro[2]);
                    if(proyecto.type=='Read'){
                        var dComp=getLienzo($(this).attr('idP'));
                        retornarSizeLienzo($(this).attr('id'),dComp.getWidth(),dComp.getHeight());
                               return;
                    }
                var msj='<xml><u>'+user+'</u><op>ml</op><data><m>rl</m><idC>'+$(this).attr('id')+'</idC><w>'+$(this).width()+'</w><h>'+$(this).height()+'</h></data></xml>';
               var s=$(this).attr('idP').split(';');
               canalNotificaciones.emit("nuevoMsg",{c:s[1]+';'+s[2],msj:msj,u:user, s:idS});  
            }              
                      
        });
        var componentes=json.components;
        var lienzo=new Lienzo(idNodoA,json.width,json.height,dJava,dFrml);
    
        for(var i in componentes){
      
   
            var nc = document.createElement("div");
            nc.id=idNodo+'_'+componentes[i].name;
            
            nc.style.position='absolute';
            nc.style.height=componentes[i].height+'px';
            nc.style.width=componentes[i].width+'px';
           
            nc.style.top=parseInt(componentes[i].y)+10+'px';
            nc.style.left=parseInt(componentes[i].x)+10+'px';
           
            nc.innerHTML=componentes[i].value;
            //   nc.style.padding='5px';

            document.getElementById('lienzo'+idNodo).appendChild(nc);
            $('#'+nc.id).attr("name",componentes[i].name);
            $('#'+nc.id).attr("type",componentes[i].type);
            $('#'+nc.id).attr("idP",idNodoA);
            $('#'+nc.id).attr("valor",componentes[i].value);
           
            
            var tipo=componentes[i].type;
           
            switch(tipo){
       
                case 'button':{
                    
                    nc.className='botonComponente';
                    nc.style.lineHeight=componentes[i].height+'px';//esto  lo agrego wilson para probar si centra el texto verticalmente en el boton
                    $('#'+nc.id).mousedown(function(e){

                        $(this).removeClass('botonComponente');
                        $(this).addClass("botonComponenteClick");
                             
                        deleteFocus_();
                                  
                        $(this).addClass('componenteLienzoSeleccionado');
                        elementoFoco=$(this);
                        elementoFoco.focus();
                        if(e.button==2){
                            var menu= $("#menu");                                    
                            $("#ULmenu").html("<ul id='ulMenu'>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='control_tab.lanzarBox(\""+$(this).attr("idP")+"\",\""+$(this).attr("name")+"\",\""+$(this).attr("id")+"\",\""+$(this).attr("valor")+"\",\"uiUpdateNameComponent\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/rename.png'/>&nbsp;&nbsp;Editar Nombre de la Variable</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='control_tab.lanzarBox(\""+$(this).attr("idP")+"\",\""+$(this).attr("name")+"\",\""+$(this).attr("id")+"\",\""+$(this).attr("valor")+"\",\"uiUpdateValueComponente\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/rename.png'/>&nbsp;&nbsp;Editar Valor de la Variable</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='control_tab.createAction(\""+$(this).attr("idP")+"\",\""+$(this).attr("name")+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/compile.png'/>&nbsp;&nbsp;actionPerformend</div></li>\n\
                                               </ul>");
                            menu.css({
                                'display':'block', 
                                'left':e.clientX, 
                                'top':e.clientY,
                                'zIndex':1001
                            });                         
                        }//fin id boton derecho
                        e.stopPropagation();
                    });

                    $('#'+nc.id).mouseup(function(){

                        $(this).removeClass("botonComponenteClick");
                        $(this).addClass('botonComponente');
                    });
                    break;
                }
                case 'textArea':{
                    
                    nc.className='textAreaComponente';
                    $('#'+nc.id).mousedown(function(e){

                             
                        deleteFocus_();
                                  
                        $(this).addClass('componenteLienzoSeleccionado');
                        elementoFoco=$(this);
                        elementoFoco.focus();
                        if(e.button==2){
                            var menu= $("#menu");                                    
                            $("#ULmenu").html("<ul id='ulMenu'>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='control_tab.lanzarBox(\""+$(this).attr("idP")+"\",\""+$(this).attr("name")+"\",\""+$(this).attr("id")+"\",\""+$(this).attr("valor")+"\",\"uiUpdateNameComponent\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/rename.png'/>&nbsp;&nbsp;Editar Nombre de la Variable</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='control_tab.lanzarBox(\""+$(this).attr("idP")+"\",\""+$(this).attr("name")+"\",\""+$(this).attr("id")+"\",\""+$(this).attr("valor")+"\",\"uiUpdateValueComponente\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/rename.png'/>&nbsp;&nbsp;Editar Valor de la Variable</div></li>\n\
                                                </ul>");
                            menu.css({
                                'display':'block', 
                                'left':e.clientX, 
                                'top':e.clientY,
                                'zIndex':1001
                            });                         
                        }//fin id boton derecho
                        e.stopPropagation();
                    });

             
                    break;
                }
                case 'textField':{
                    
                    nc.className='textFieldComponente';
                    nc.style.lineHeight=componentes[i].height+'px'
                    $('#'+nc.id).mousedown(function(e){

                             
                        deleteFocus_();
                                  
                        $(this).addClass('componenteLienzoSeleccionado');
                        elementoFoco=$(this);
                        elementoFoco.focus();
                        if(e.button==2){
                            var menu= $("#menu");                                    
                            $("#ULmenu").html("<ul id='ulMenu'>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='control_tab.lanzarBox(\""+$(this).attr("idP")+"\",\""+$(this).attr("name")+"\",\""+$(this).attr("id")+"\",\""+$(this).attr("valor")+"\",\"uiUpdateNameComponent\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/rename.png'/>&nbsp;&nbsp;Editar Nombre de la Variable</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='control_tab.lanzarBox(\""+$(this).attr("idP")+"\",\""+$(this).attr("name")+"\",\""+$(this).attr("id")+"\",\""+$(this).attr("valor")+"\",\"uiUpdateValueComponente\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/rename.png'/>&nbsp;&nbsp;Editar Valor de la Variable</div></li>\n\
                                                </ul>");
                            menu.css({
                                'display':'block', 
                                'left':e.clientX, 
                                'top':e.clientY,
                                'zIndex':1001
                            });                         
                        }//fin id boton derecho
                        e.stopPropagation();
                    });
                    break;
                }
                case 'label':{
                    
                    nc.className='labelComponente';
                    nc.style.lineHeight=componentes[i].height+'px'
                    $('#'+nc.id).mousedown(function(e){

                             
                        deleteFocus_();
                                  
                        $(this).addClass('componenteLienzoSeleccionado');
                        elementoFoco=$(this);
                        elementoFoco.focus();
                        if(e.button==2){
                            var menu= $("#menu");                                    
                            $("#ULmenu").html("<ul id='ulMenu'>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='control_tab.lanzarBox(\""+$(this).attr("idP")+"\",\""+$(this).attr("name")+"\",\""+$(this).attr("id")+"\",\""+$(this).attr("valor")+"\",\"uiUpdateNameComponent\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/rename.png'/>&nbsp;&nbsp;Editar Nombre de la Variable</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='control_tab.lanzarBox(\""+$(this).attr("idP")+"\",\""+$(this).attr("name")+"\",\""+$(this).attr("id")+"\",\""+$(this).attr("valor")+"\",\"uiUpdateValueComponente\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/rename.png'/>&nbsp;&nbsp;Editar Valor de la Variable</div></li>\n\
                                                </ul>");
                            menu.css({
                                'display':'block', 
                                'left':e.clientX, 
                                'top':e.clientY,
                                'zIndex':1001
                            });                         
                        }//fin id boton derecho
                        e.stopPropagation();
                    });
                    break;
                }
       
            }
            

          
            $('#'+nc.id).draggable({
                opacity: 0.6,
                stop:function(ev,ui){
                    var idpro=$(this).attr('idP').split(';');
                    var proyecto=getProject(idpro[1],idpro[2]);
                    if(proyecto.type=='Read'){
                        var dComp=getComponente($(this).attr('idP'),$(this).attr('name')).getCoordenada();
                        retornarPosition($(this).attr('id'),dComp.getX(),dComp.getY());
                               return;
                    }
                   var ss=$(this).attr("idP").split(';');
                    var msj='<xml><u>'+user+'</u><op>ml</op><data><m>mc</m><idC>'+$(this).attr('id')+'</idC><x>'+parseInt($(this).position().left)+'</x><y>'+parseInt($(this).position().top)+'</y></data></xml>';
                    canalNotificaciones.emit("nuevoMsg",{c:ss[1]+';'+ss[2],msj: msj,u:user, s:idS}); 
       
                }
            }).resizable({
                ghost: true,
                autoHide: true,
                stop:function(ev,ui){
                    var idpro=$(this).attr('idP').split(';');
                    var proyecto=getProject(idpro[1],idpro[2]);
                    if(proyecto.type=='Read'){
                        var dComp=getComponente($(this).attr('idP'),$(this).attr('name')).getDimension();
                        retornarSize($(this).attr('id'),dComp.getHeight(),dComp.getWidth());
                               return;
                    }
                    var ss=$(this).attr("idP").split(';');
                    var msj='<xml><u>'+user+'</u><op>ml</op><data><m>rc</m><idC>'+$(this).attr('id')+'</idC><w>'+parseInt($(this).width())+'</w><h>'+parseInt($(this).height())+'</h></data></xml>';
                    canalNotificaciones.emit("nuevoMsg",{c:ss[1]+';'+ss[2],msj:msj,u:user, s:idS}); 
                //  
                    
                }
                
                
            });          
            lienzo.addComponete(new Componente(componentes[i].name,componentes[i].value,componentes[i].type,new Coordenada(componentes[i].x,componentes[i].y),new Dimension(componentes[i].width,componentes[i].height),idNodoA,componentes[i].lines,componentes[i].action));
      
        }
   
 
   
   
   
        misLienzos.push(lienzo); 
        jQuery('<div/>',{
            id: 'bleft'+idNodo,
            css:{
                position: 'absolute',
                height: '100%',
                width: '10px',
                backgroundColor : 'gray',
                left : '0px',
                top: '0px'
               
             }
        }).appendTo('#lienzo'+idNodo);
       
        jQuery('<div/>',{
            id: 'btop'+idNodo,
            css:{
                position: 'absolute',
                width: '100%',
                height: '10px',
                backgroundColor : 'gray',
                left : '0px',
                top: '0px'
               
            }
        }).appendTo('#lienzo'+idNodo);
       
        jQuery('<div/>',{
            id: 'bright'+idNodo,
            css:{
                position: 'absolute',
                height: '100%',//$('#'+idNodo).css('height'),
                width: '10px',
                backgroundColor : 'gray',
                right : '0px',
                top: '0px'
               
            }
        }).appendTo('#lienzo'+idNodo);
       
        jQuery('<div/>',{
            id: 'bbottom'+idNodo,
            css:{
                position: 'absolute',
                width: '100%',//$('#'+idNodo).css('width'),
                height: '10px',
                backgroundColor : 'gray',
                left : '0px',
                bottom: '0px'
               
            }
        }).appendTo('#lienzo'+idNodo);
    
           
   
    };

    function getBasicTemplateGUI(){

        ////var json=//'falta crear el jsondefecto';//altura de 300 anchura de 300 etcc
        return 'el lienzo nuevo';
    };

    this.addLienzo=function(x,y,id,nombre,width,height){};

    this.deleteLienzo=function(idL){
    
        popLienzo(idL);
    
    };

    this.getElementoFoco=function(){
        return elementoFoco;
    };



    this.eventoTeclado=function(event){
        
        var idpro=elementoFoco.attr('idP').split(';');
        var proyecto=getProject(idpro[1],idpro[2]);
        if(proyecto.type=='Read'){
                   return;
        }
        var c=getComponente(elementoFoco.attr('idP'),elementoFoco.attr('name'));  
        var idP=elementoFoco.attr('idP');
        var ss=idP.split(';');
        var cO=c.getCoordenada();    
        var x=0;
        var y=0;
        switch (event.keyCode){        
            case 37:{
                x=-1;
                break;
            }
            case 38:{
                y=-1;
                break;
            }
            case 39:{
                x=1;
                break;
            }
            case 40:{
                y=1;
                break;
            }
            case 46:{
                    
                var msj='<xml><u>'+user+'</u><op>ml</op><data><m>ec</m><idC>'+elementoFoco.attr('id')+'</idC></data></xml>';
                canalNotificaciones.emit("nuevoMsg",{c:ss[1]+';'+ss[2],msj:msj,u:user, s:idS});
                return;//este caso es para eliminar un componente del lienzo
            }
        }       
       var msj='<xml><u>'+user+'</u><op>ml</op><data><m>mct</m><idC>'+elementoFoco.attr('id')+'</idC><x>'+x+'</x><y>'+y+'</y><cx>'+cO.getX()+'</cx><cy>'+cO.getY()+'</cy></data></xml>';
       canalNotificaciones.emit("nuevoMsg",{c:ss[1]+';'+ss[2],msj:msj,u:user, s:idS}); 
    };

    function deleteComponente(idP,idC,c,usuario){
        var lienzo=getLienzo(idP);
        if(lienzo==null)return false;
        lienzo.deleteComponete(c,usuario);
        $('#'+idC).remove();
       
    }

    function addComponente(idP,idNodo,tipo,c,d,usuario,idC){
      
        var lienzo=getLienzo(idP);
        if(lienzo==null)return false;
        var name=lienzo.generarNombre(tipo);
        
        console.log('coordenada  '+d.getHeight());
        if(tipo=='textArea'){
            d.setHeight(41);
        }
        if(lienzo.createComponete(new Componente(name,name,tipo,c,d,idP),usuario)){
            var nc = document.createElement("div");            
            nc.id=idNodo+'_'+name;            
            nc.style.position='absolute';
            nc.style.height=d.getHeight()+'px';
            nc.style.width=d.getWidth()+'px';
           
            nc.style.top=parseInt(c.getY())+10+'px';
            nc.style.left=parseInt(c.getX())+10+'px';
           
            nc.innerHTML=name;

            document.getElementById('lienzo'+idNodo).appendChild(nc);
            $('#'+nc.id).attr("name",name);
            $('#'+nc.id).attr("type",tipo);
            $('#'+nc.id).attr("idP",idP);
            $('#'+nc.id).attr("valor",name);
           
           
            switch(tipo){
       
                case 'button':{
                    
                    nc.className='botonComponente';
                    nc.style.lineHeight=d.getHeight()+'px';//esto  lo agrego wilson para probar si centra el texto verticalmente en el boton
                    $('#'+nc.id).mousedown(function(e){
                       
                        $(this).removeClass('botonComponente');
                        $(this).addClass("botonComponenteClick");
                             
                        deleteFocus_();
                                  
                        $(this).addClass('componenteLienzoSeleccionado');
                        elementoFoco=$(this);
                        elementoFoco.focus();
                        if(e.button==2){
                            var menu= $("#menu");                                    
                            $("#ULmenu").html("<ul id='ulMenu'>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='control_tab.lanzarBox(\""+$(this).attr("idP")+"\",\""+$(this).attr("name")+"\",\""+$(this).attr("id")+"\",\""+$(this).attr("valor")+"\",\"uiUpdateNameComponent\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/rename.png'/>&nbsp;&nbsp;Editar Nombre de la Variable</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='control_tab.lanzarBox(\""+$(this).attr("idP")+"\",\""+$(this).attr("name")+"\",\""+$(this).attr("id")+"\",\""+$(this).attr("valor")+"\",\"uiUpdateValueComponente\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/rename.png'/>&nbsp;&nbsp;Editar Valor de la Variable</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='control_tab.createAction(\""+$(this).attr("idP")+"\",\""+$(this).attr("name")+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/compile.png'/>&nbsp;&nbsp;actionPerformend</div></li>\n\
                                              </ul>");
                            menu.css({
                                'display':'block', 
                                'left':e.clientX, 
                                'top':e.clientY,
                                'zIndex':1001
                            });                         
                        }//fin id boton derecho
                        e.stopPropagation();
                    });

                    $('#'+nc.id).mouseup(function(){

                        $(this).removeClass("botonComponenteClick");
                        $(this).addClass('botonComponente');
                    });
                    break;
                }
                case 'textArea':{
                
                    nc.className='textAreaComponente';
                    $('#'+nc.id).mousedown(function(e){

                             
                        deleteFocus_();
                                  
                        $(this).addClass('componenteLienzoSeleccionado');
                        elementoFoco=$(this);
                        elementoFoco.focus();
                        if(e.button==2){
                            var menu= $("#menu");                                    
                            $("#ULmenu").html("<ul id='ulMenu'>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='control_tab.lanzarBox(\""+$(this).attr("idP")+"\",\""+$(this).attr("name")+"\",\""+$(this).attr("id")+"\",\""+$(this).attr("valor")+"\",\"uiUpdateNameComponent\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/rename.png'/>&nbsp;&nbsp;Editar Nombre de la Variable</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='control_tab.lanzarBox(\""+$(this).attr("idP")+"\",\""+$(this).attr("name")+"\",\""+$(this).attr("id")+"\",\""+$(this).attr("valor")+"\",\"uiUpdateValueComponente\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/rename.png'/>&nbsp;&nbsp;Editar Valor de la Variable</div></li>\n\
                                               </ul>");
                            menu.css({
                                'display':'block', 
                                'left':e.clientX, 
                                'top':e.clientY,
                                'zIndex':1001
                            });                         
                        }//fin id boton derecho
                        e.stopPropagation();
                    });

             
                    break;
                }
                case 'textField':{
               
                    nc.className='textFieldComponente';
                    nc.style.lineHeight=d.getHeight()+'px';
                    $('#'+nc.id).mousedown(function(e){

                             
                        deleteFocus_();
                                  
                        $(this).addClass('componenteLienzoSeleccionado');
                        elementoFoco=$(this);
                        elementoFoco.focus();
                        if(e.button==2){
                            var menu= $("#menu");                                    
                            $("#ULmenu").html("<ul id='ulMenu'>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='control_tab.lanzarBox(\""+$(this).attr("idP")+"\",\""+$(this).attr("name")+"\",\""+$(this).attr("id")+"\",\""+$(this).attr("valor")+"\",\"uiUpdateNameComponent\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/rename.png'/>&nbsp;&nbsp;Editar Nombre de la Variable</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='control_tab.lanzarBox(\""+$(this).attr("idP")+"\",\""+$(this).attr("name")+"\",\""+$(this).attr("id")+"\",\""+$(this).attr("valor")+"\",\"uiUpdateValueComponente\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/rename.png'/>&nbsp;&nbsp;Editar Valor de la Variable</div></li>\n\
                                               </ul>");
                            menu.css({
                                'display':'block', 
                                'left':e.clientX, 
                                'top':e.clientY,
                                'zIndex':1001
                            });                         
                        }//fin id boton derecho
                        e.stopPropagation();
                    });
                    break;
                }
                case 'label':{
                    
                    nc.className='labelComponente';
                    nc.style.lineHeight=d.getHeight()+'px';
                    $('#'+nc.id).mousedown(function(e){

                             
                        deleteFocus_();
                                  
                        $(this).addClass('componenteLienzoSeleccionado');
                        elementoFoco=$(this);
                        elementoFoco.focus();
                        if(e.button==2){
                            var menu= $("#menu");                                    
                            $("#ULmenu").html("<ul id='ulMenu'>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='control_tab.lanzarBox(\""+$(this).attr("idP")+"\",\""+$(this).attr("name")+"\",\""+$(this).attr("id")+"\",\""+$(this).attr("valor")+"\",\"uiUpdateNameComponent\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/rename.png'/>&nbsp;&nbsp;Editar Nombre de la Variable</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='control_tab.lanzarBox(\""+$(this).attr("idP")+"\",\""+$(this).attr("name")+"\",\""+$(this).attr("id")+"\",\""+$(this).attr("valor")+"\",\"uiUpdateValueComponente\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/rename.png'/>&nbsp;&nbsp;Editar Valor de la Variable</div></li>\n\
                                              </ul>");
                            menu.css({
                                'display':'block', 
                                'left':e.clientX, 
                                'top':e.clientY,
                                'zIndex':1001
                            });                         
                        }//fin id boton derecho
                        e.stopPropagation();
                    });
                    break;
                }
       
            }//fin swicth
          
            $('#'+nc.id).draggable({
                opacity: 0.6,
                stop:function(ev,ui){
                    var ss=$(this).attr('idP').split(';');
                    var msj='<xml><u>'+user+'</u><op>ml</op><data><m>mc</m><idC>'+$(this).attr('id')+'</idC><x>'+parseInt($(this).position().left)+'</x><y>'+parseInt($(this).position().top)+'</y></data></xml>';
                   
                    canalNotificaciones.emit("nuevoMsg",{c:ss[1]+';'+ss[2],msj:msj,u:user, s:idS});
       
                }
            }).resizable({
                ghost: true,
                autoHide: true,
                stop:function(ev,ui){
                    var ss=$(this).attr('idP').split(';');
                    var msj='<xml><u>'+user+'</u><op>ml</op><data><m>rc</m><idC>'+$(this).attr('id')+'</idC><w>'+parseInt($(this).width())+'</w><h>'+parseInt($(this).height())+'</h></data></xml>';
                    canalNotificaciones.emit("nuevoMsg",{c:ss[1]+';'+ss[2],msj:msj,u:user, s:idS});                   
                }
            });
            

            if(usuario==user){ 
                 $('#'+idC).css("top",0);
                        $('#'+idC).css("left",0);
               // this.lanzarBox(idP,name,nc.id,name,'uiPropiedadesComponente');
                return true;
            }
                
            return true;
            
            
            
        }
        return false;
    }
    

    
    /*
     *Esta funcion permite lanzar un box que direccione a propiedadesdCompnente.html enviarndo unos parametros
     *@param idP {String} es el atributo del elemento en memoria
     *@param comp{String} nombre del componente
     *@param idComponent {String} id del componente
     *@param valor {String} value del componente
     *@param nameUrl {String} nombre de la pagina a direccionar
     */
    this.lanzarBox=function(idP,comp,idComponent,valor,nameUrl){
        idP=idP.replace('Default Package','*.*');
        box('Propiedades del Componente '+comp,"../IDE/"+nameUrl+".jsp?idP="+idP+"&component="+comp+"&idCompo="+idComponent+"&valor="+valor);
    };
    
    /**
     *Funcion utilizada para modificar las propiedades del componente que se agregara al lienzo
     *@param idP {String} id del componente en memoria que no esta normalizada
     *@param newName {String} es el nuevo nombre del componente
     *@param newValue {String} nuevo valor para el componente
     *@param nameComponent {String} nombre antiguo del componente
     *@param idComponent {String} id normalizada del componente
     **/
    this.updatePropertiesComponent=function(idP,newName,newValue,nameComponent,idComponent){
      
        var msj='<xml><u>'+user+'</u><op>ml</op><data><m>apc</m><idP>'+idP+'</idP><nn>'+newName+'</nn><nv>'+newValue+'</nv><nc>'+nameComponent+'</nc><idC>'+idComponent+'</idC></data></xml>';
       var ss=idP.split(';');
       console.log('canal:  '+ss[1]+';'+ss[2]);
       canalNotificaciones.emit("nuevoMsg",{c:ss[1]+';'+ss[2],msj:msj,u:user, s:idS}); 
    };
    this.updatePropertiesComponent_=function(idP,newName,newValue,nameComponent,idComponent,usuario){
        idP=idP.replace('*.*','Default Package');
        console.log(idP+'   '+newName+'  '+newValue+'  '+nameComponent+'   '+idComponent+'    '+usuario);
        var lienzo=getLienzo(idP);        
        if(lienzo.updateProperties(nameComponent, newName, newValue)){
            $('#'+idComponent).html(newValue);
            $('#'+idComponent).attr("name",newName); 
            $('#'+idComponent).attr("valor",newValue); 
            var newId=lienzo.getIdNormalizadaComponente(newName);
            document.getElementById(idComponent).id=newId; 
        }else{
            if(usuario==user)
                alert("Error al Intentar Cambiar el Nombre del Componente\n\nRazón:  * El nombre ya existe\n             * Error Interno");
        }
    };
    
    /**
     *Funcion utilizada para modificar el nombre del componente que se agregara al lienzo
     *@param idP {String} id del componente en memoria que no esta normalizada
     *@param newName {String} es el nuevo nombre del componente
     *@param nameComponent {String} nombre antiguo del componente
     *@param idComponent {String} id normalizada del componente
     **/
    this.updateNameComponent=function(idP,newName,nameComponent,idComponent){
        
        var msj='<xml><u>'+user+'</u><op>ml</op><data><m>anc</m><idP>'+idP+'</idP><nn>'+newName+'</nn><nc>'+nameComponent+'</nc><idC>'+idComponent+'</idC></data></xml>';
       var ss=idP.split(';');
       canalNotificaciones.emit("nuevoMsg",{c:ss[1]+';'+ss[2],msj:msj,u:user, s:idS}); 
    
    };
    
    this.updateNameComponent_=function(idP,newName,nameComponent,idComponent,usuario){
        idP=idP.replace('*.*','Default Package');
        var lienzo=getLienzo(idP);        
        if(lienzo.updateName(nameComponent, newName,usuario)){
            $('#'+idComponent).attr("name",newName); 
            var newId=lienzo.getIdNormalizadaComponente(newName);
            document.getElementById(idComponent).id=newId; 
        }else{
            if(usuario==user)
                alert("Error al Intentar Cambiar el Nombre del Componente\n\nRazón:  * El nombre ya existe\n             * Error Interno");
        }
    };
    
    /**
     *Funcion utilizada para modificar el value del componente que se agregara al lienzo
     *@param idP {String} id del componente en memoria
     *@param nameComponent {String} nombre del componente
     *@param newValue {String} nuevo valor para el componente
     *@param idComponent {String} id del componente
     **/
    this.updateValueComponent=function(idP,nameComponent,newValue,idComponent){
        idP=idP.replace('*.*','Default Package');
        var msj='<xml><u>'+user+'</u><op>ml</op><data><m>avc</m><idP>'+idP+'</idP><nv>'+newValue+'</nv><nc>'+nameComponent+'</nc><idC>'+idComponent+'</idC></data></xml>';
      var ss=idP.split(';');
       canalNotificaciones.emit("nuevoMsg",{c:ss[1]+';'+ss[2],msj:msj,u:user, s:idS});  
    };
    
    this.updateValueComponent_=function(idP,nameComponent,newValue,idComponent,usuario){
        idP=idP.replace('*.*','Default Package');
        console.log(idP+'\n'+nameComponent+'\n'+newValue+'\n'+idComponent+'\n'+usuario);
        var lienzo=getLienzo(idP);        
        if(lienzo.updateValue(nameComponent, newValue,usuario)){
            $('#'+idComponent).attr("valor",newValue); 
            $('#'+idComponent).html(newValue);
        }else{
            if(usuario==user)
                alert("Error al Intentar Cambiar el Nombre del Componente\n\nRazón:  * El nombre ya existe\n             * Error Interno");
        }
    };
    
    function getComponente(idl,idc){
   
        var lienzo=getLienzo(idl);
        if(lienzo==null)return null;
        return lienzo.getComponente(idc);
    }

    this.deleteFocus=function(){
  
        if(elementoFoco==null)return;
        elementoFoco.removeClass('componenteLienzoSeleccionado');
        elementoFoco=null;

    };
    function deleteFocus_(){
       
        if(elementoFoco==null)return;
        elementoFoco.removeClass('componenteLienzoSeleccionado');
        elementoFoco=null;
    
    }

    function resizeLienzo(idl,w,h,usuario){
   
        var lienzo=getLienzo(idl);
        if(lienzo==null)return false;
        return lienzo.resize(w,h,usuario);  
    
    }

    function moveComponente(idC,idl,x,y,usuario){
        
        var lienzo=getLienzo(idl);
        if(lienzo==null)return false;
        return lienzo.moveComponente(idC,x,y,usuario);
    
    
    }

    function resizeComponente(idC,idl,w,h,usuario){
   
        var lienzo=getLienzo(idl);
        if(lienzo==null)return false;
        return lienzo.resizeComponente(idC,w,h,usuario);
    
    
    }

    function getCoordenadaComponente(idl,idc){
    
        var lienzo=getLienzo(idl);
        if(lienzo==null)return false;
        return lienzo.getComponente(idc).getCoordenada();
    
    }

    //metodo privado
    function popLienzo(idl){
                       
        for(var i in misLienzos){
            if(misLienzos[i].id==idl){
                delete misLienzos[i];
                return true;
            }

        }
        return false;
    }

    //metodo privado
    function getLienzo(idl){
                     
        for(var i in misLienzos){
                 
            if(misLienzos[i].getID()==idl){
                return misLienzos[i];
                                
            }

        }
        return null;
    }

    //metodo privado
    function normalizarId(idNodo){
    
        idNodo=idNodo.replace(" ", "_");
        var sp=idNodo.split(':');
        var aux='';
        for(var i in sp){
        
            var s='C';
            if(i==0)s='';
        
            aux+=s+sp[i];
        
        }
    
        idNodo=aux;
        aux='';
        sp=idNodo.split(';');
        for(var i in sp){
        
            var s='C';
            if(i==0)s='';
        
            aux+=s+sp[i];
        
        }
    
        idNodo=aux;
        aux='';
  
        sp=idNodo.split('.');
        for(var i in sp){
        
            var s='C';
            if(i==0)s='';
        
            aux+=s+sp[i];
        
        }
    
        idNodo=aux;
        aux='';

        sp=idNodo.split('@');
        for(var i in sp){
        
            var s='C';
            if(i==0)s='';
        
            aux+=s+sp[i];
        
        }
    
        return aux;
    
    
    }

    this.guardar=function(){
    
        var a=false;
        var info='';
    
        for(var i in misLienzos){
        
            if(misLienzos[i].isModified){
       
                info+='æðđßcanvasßđðæ'+misLienzos[i].getInfo();
                a=true; 
            }
        
        }
    
      
        if(a){
            $.get(jsp+"?info="+info, function(data){
        
            });
        }
    };


this.addComponentPalette=function(idC,idNodo,x,y,tipo,usuario){
 
                      
                if(!addComponente($('#'+idC).attr('idP'),idNodo,tipo,new Coordenada(x-10,y-10),new Dimension(100,21),usuario,idC)){//xx es generado igual que value OJO
                
                     if(usuario==user){
                        $('#'+idC).animate({
                            top: '0px',
                            left:'0px'
                        }, 100 );   
                   }
                     
                }
}
function retornarUbicacionC(idC){
   
                        $('#'+idC).animate({
                            top: '0px',
                            left:'0px'
                        }, 100 );   
     
}
function retornarSize(idC,h,w){
    
   $('#'+idC).animate({
            height: h,
            width:w
    }, 100 );   

}
this.resizeLienzo=function(idC,w,h,usuario){
    
             
                var r= resizeLienzo($('#'+idC).attr("idP"),w,h,usuario);//deberia obtener como respuesta un objeto dimension con la dimension original, en caso de no poderse realizar el proceso......en caso de ser exitoso recibir un boolean
           
                if(r!=null){//no se pudo realizar operacion y retorna el valor anterior
                    if(usuario==user){    
                        $('#'+idC).animate({
                            height: r.getHeight(),
                            width:r.getWidth()
                        }, 100 );   
                    }
                }else{
                    if(usuario!=user){
                        $('#'+idC).css("width",w);
                        $('#'+idC).css("height",h);
                    }
                }
    
};

function retornarSizeLienzo(idC,w,h){
   
      $('#'+idC).animate({
                            height: h,
                            width:w
       }, 100 );  
                    
 
}
function retornarPosition(idC,x,y){
   
      $('#'+idC).animate({
                            top: parseInt(y)+10+"px",
                            left:parseInt(x)+10+"px"
      }, 200 ); 
                    
 
}
this.moveComponent=function(idC,x,y,usuario){
  
        var r= moveComponente($('#'+idC).attr("name"),$('#'+idC).attr("idP"),parseInt(x)-10,parseInt(y)-10,usuario);//deberia obtener como respuesta un objeto position con la posicion original, en caso de no poderse realizar el proceso...
                         
                    if(r!=null){//no se pudo realizar operacion y retorna el valor anterior
                    
                      if(usuario==user){
                        $('#'+idC).animate({
                            top: parseInt(r.getY())+10+"px",
                            left:parseInt(r.getX())+10+"px"
                        }, 200 );
                   
                      }
                    }else{
                        if(usuario!=user){
                            $('#'+idC).css("top",y);
                            $('#'+idC).css("left",x);
                        }
                    }
    
    
    
    
};

this.moveComponentT=function(idC,x,y,cx,cy,usuario){
   
    var x=parseInt(x);
    var y=parseInt(y);
    var cx=parseInt(cx);
    var cy=parseInt(cy);
    
    $('#'+idC).animate({
            top: (cy+y+10)+"px",
            left:(cx+x+10)+"px"
        }, 0 );
                          
        var r= moveComponente($('#'+idC).attr("name"),$('#'+idC).attr('idP'),cx+x,cy+y,usuario);
                       
        if(r!=null){// no se pudo realizar operacion 
          
          if(usuario==user){
            $('#'+idC).animate({
                top: cy+10+"px",
                left:cx+10+"px"
            }, 0 );
                          
          }                    
        } 
    
    
};

function retornarSize(idC,h,w){
   
                            $('#'+idC).animate({
                                height: h,
                                width:w
                            }, 200 );
                    
 
}
this.resizeComponent=function(idC,w,h,usuario){
    var r= resizeComponente($('#'+idC).attr('name'),$('#'+idC).attr("idP"),w,h,usuario);//deberia obtener como respuesta un objeto dimension con la dimension original, en caso de no poderse realizar el proceso......en caso de ser exitoso recibir un boolean
                         
                    if(r!=null){//no se pudo realizar operacion y retorna el valor anterior
                        
                       if(usuario==user){
                            $('#'+idC).animate({
                                height: r.getHeight(),
                                width:r.getWidth()
                            }, 200 );
                    
                       }
                    }
                    
                    else{
                        if(usuario!=user){
                            $('#'+idC).css("height",h);
                            $('#'+idC).css("width",w);
                         
                    
                       }
                    }
                    $('#'+idC).removeClass("componenteLienzoSeleccionado");
                    if(usuario==user){
                            if( $('#'+idC).attr("type")=='button'){
                                $('#'+idC).removeClass("botonComponenteClick");
                                $('#'+idC).addClass("botonComponente");
                                $('#'+idC).css('lineHeight',$(this).css('height'));
                            }
                    }
}

    this.deleteComponente_=function(idC,usuario){
        deleteComponente($('#'+idC).attr("idP"),idC,$('#'+idC).attr("name"),usuario);
    };
    
    this.generarCodigoJava=function(){

        for(var i in misLienzos){
       

        }
       
       
    /**    var info='';
    
        for(var i in misLienzos){
        
            if(misLienzos[i].isModified){
       
                info+='æðđßcanvasßđðæ'+misLienzos[i].getInfo();
     
            }
        
        }

    
      **/
        
        
        
        
        
    };
    
    this.createAction=function(idP, idC){
       
       getLienzo(idP).createAction(idC);
        
        
    };
    
    this.updatedJava=function(data){
       var lienzo=getLienzo(data.l);
       if(lienzo==null)return false;
       lienzo.updatedJava(data);
      
    };
    
    this.resizeContenedoresLienzos=function(tamV){
      //parseInt($('#'+contenedoresLienzos[i]).parent().css('height'))
       var alto=parseInt(tamV)-5;
      
      for(var i in contenedoresLienzos){
         
          $('#'+contenedoresLienzos[i]).css('height',alto);
          
      }
      
    };
}