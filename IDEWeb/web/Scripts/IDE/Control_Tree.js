/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


	var dhxLayout;
        var tree;
        var dhxTree2;
        var layout1;
        var menu;var ev=window.event;
	function cargarArbol(t) {
      
                tree=t;
          
                        tree.setSkin('dhx_skyblue');
			tree.setImagePath("../Images/Tree/");
			tree.enableDragAndDrop(1);
			tree.setOnOpenHandler(tonopen);
 
   			tree.attachEvent("onOpenEnd",function(nodeId, event){return true;});
			tree.setOnClickHandler(tonclick);
                        tree.setOnRightClickHandler(toRclick);
			tree.setOnCheckHandler(toncheck);
			tree.setOnDblClickHandler(tondblclick);
			tree.setDragHandler(tondrag);
   
                tree.loadXMLString('<tree id="0"><item text="Proyectos Activos" id="MainNode" open="1" im0="gg2.png" im1="gg2.png" im2="gg2.png" call="1" select="1"/></tree> ');
                
              
    
                        function tonclick(id){
			
				return true;
			
			};
			function tondblclick(id){
                                
                                var s=id.split(';');
                                if(s[0]=='ClassNode'){
                                    abrirClase(id);
                                    return true;
                                 }
                                if(s[0]=='GUINode'){ 
                                    abrirClaseGUI(id);
                                    return true;
                                }
				return true;
			
			};			
			function tondrag(id,id2){
                            
                            var data1=id.split(';');
                            var data2=id2.split(';');
                      
                                if(data1[0]=='PackageNode'){ 
                                   
                                   if(data2[0]=='PackageNode'){ 
                                    
                                       return true;
                                    }
                                    
                                   if(data2[0]=='SRCNode'){ 
                                   
                                       return true;
                                    }
                                                                    
                                }
                                                             
                                if(data1[0]=='ClassNode'){ 
                                    
                                    if(data2[0]=='PackageNode'){ 
                                       
                                       cortar_copiar__pegar_Clase(id,id2,true);
                                       return false;
                                    }
                                    
                                   if(data2[0]=='SRCNode'){ 
                                 
                                       cortar_copiar__pegar_Clase(id,id2,true);
                                       return false;
                                    }
                                    
                                }
                                 
                                if(data1[0]=='GUINode'){ 
                                    
                                    if(data2[0]=='PackageNode'){ 
                                       
                                       cortar_copiar__pegar_GUI(id,id2,true);
                                       return false;
                                    }
                                    
                                   if(data2[0]=='SRCNode'){ 
                            
                                       cortar_copiar__pegar_GUI(id,id2,true);
                                       return false;
                                    }
                                    
                                }
                                 
                                if(data1[0]=='FileNode'){ 
                                    
                                    if(data2[0]=='PackageNode'){ 
                                       
                                       cortar_copiar__pegar_Fichero(id,id2,true);
                                       return false;
                                    }
                                    
                                   if(data2[0]=='SRCNode'){ 
                         
                                       cortar_copiar__pegar_Fichero(id,id2,true);
                                       return false;
                                    }
                                    
                                }
                                 
                                if(data1[0]=='LibrarieNode'){
                                    
                                     if(data2[0]=='LIBSNode'){ 
                                       cortar_copiar__pegar_Libreria(id,id2,true);
                                       return false;
                                    }
                                
                                }
                                 
                                alert('Operacion invalida');
				return false;
			
			};
			function tonopen(id,mode){
			
				//return confirm("Do you want to "+(mode>0?"close":"open")+" node "+tree.getItemText(id)+"?");
                                return true;
			};                        
                        function toRclick(id,event){
                            tree.selectItem(id);
                            var menuId;                           
                            var menu;  
                            var data=id.split(';');
                            var proyecto=getProject(data[1],data[2]);
                            menuId= "menu";
                            menu= $("#"+menuId);
                                if(data[0]=='ProjectNode'){ 
                                    var anex='';
                                    if(data[2]==user)anex="<li id='menu_anterior' align='left' class='itemmenu' onclick='compartirProyecto(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/share.png'/>&nbsp;&nbsp;Compartir Proyecto</div></li>";
                                    
                                    if(proyecto.type=='Read'){
                                         $("#ULmenu").html("<ul id='ulMenu'>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='compilarProyecto(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/compile.png'/>&nbsp;&nbsp;Compilar Proyecto</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='ejecutarProyecto(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/play.png'/>&nbsp;&nbsp;Ejecutar Proyecto</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='eliminarProyecto(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/delete.png'/>&nbsp;&nbsp;Eliminar Proyecto</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='cerrarProyecto(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/close.png'/>&nbsp;&nbsp;Cerrar Proyecto</div></li>"+anex+"\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='propiedadesProyecto(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/properties.png'/>&nbsp;&nbsp;Propiedades Proyecto</div></li></ul>");
                                    
                                    }else{
                                    var ren='';
                                    if(proyecto.propietario==user){
                                        
                                         $("#ULmenu").html("<ul id='ulMenu'>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='uiRenombrarProyecto(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/rename.png'/>&nbsp;&nbsp;Renombrar Proyecto</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='compilarProyecto(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/compile.png'/>&nbsp;&nbsp;Compilar Proyecto</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='ejecutarProyecto(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/play.png'/>&nbsp;&nbsp;Ejecutar Proyecto</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='eliminarProyecto(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/delete.png'/>&nbsp;&nbsp;Eliminar Proyecto</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='cerrarProyecto(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/close.png'/>&nbsp;&nbsp;Cerrar Proyecto</div></li>"+anex+"\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='propiedadesProyecto(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/properties.png'/>&nbsp;&nbsp;Propiedades Proyecto</div></li></ul>");
                                    
                                        
                                    }else{
                                          $("#ULmenu").html("<ul id='ulMenu'>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='compilarProyecto(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/compile.png'/>&nbsp;&nbsp;Compilar Proyecto</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='ejecutarProyecto(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/play.png'/>&nbsp;&nbsp;Ejecutar Proyecto</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='eliminarProyecto(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/delete.png'/>&nbsp;&nbsp;Dejar de Ver Proyecto</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='cerrarProyecto(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/close.png'/>&nbsp;&nbsp;Cerrar Proyecto</div></li>"+anex+"\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='propiedadesProyecto(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/properties.png'/>&nbsp;&nbsp;Propiedades Proyecto</div></li></ul>");
                                    
                                        
                                    }
                                   }
                                    menu.css({'display':'block', 'left':event.clientX, 'top':event.clientY,'zIndex':1001});
                                 
                                }
                                 
                                if(data[0]=='PackageNode' && proyecto.type!='Read'){
                                    $("#ULmenu").html("<ul><li id='menu_anterior' align='left' class='itemmenu' onclick='uiRenombrarPaquete(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/rename.png'/>&nbsp;&nbsp;Renombrar Paquete</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='uiAgregarClaseGUI(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/addform.png'/>&nbsp;&nbsp;Agregar GUI</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='uiAgregarClase(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/addjava.png'/>&nbsp;&nbsp;Agregar Clase</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='uiCargarClase(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/uploadjava.png'/>&nbsp;&nbsp;Cargar Clase Existente</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='uiAgregarFichero(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/addfile.png'/>&nbsp;&nbsp;Agregar Fichero</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='uiCargarFichero(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/uploadfile.png'/>&nbsp;&nbsp;Cargar Fichero Existente</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='uiAgregarPaquete(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/addpackage.png'/>&nbsp;&nbsp;Agregar Paquete</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='eliminarPaquete(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/delete.png'/>&nbsp;&nbsp;Eliminar Paquete</div></li></ul>");
                                   menu.css({'display':'block', 'left':event.clientX, 'top':event.clientY,'zIndex':1001});
                                }
                                 
                                if(data[0]=='ClassNode'){
                                    if(proyecto.type=='Read'){
                                        
                                        $("#ULmenu").html("<ul><li id='menu_anterior' align='left' class='itemmenu' onclick='abrirClase(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/view.png'/>&nbsp;&nbsp;Abrir Clase</div></li></ul>");
                                    
                                    }else{
                                    $("#ULmenu").html("<ul><li id='menu_anterior' align='left' class='itemmenu' onclick='abrirClase(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/view.png'/>&nbsp;&nbsp;Abrir Clase</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='uiRenombrarClase(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/rename.png'/>&nbsp;&nbsp;Renombrar Clase</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='eliminarClase(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/delete.png'/>&nbsp;&nbsp;Eliminar Clase</div></li></ul>");
                                    }
                                    menu.css({'display':'block', 'left':event.clientX, 'top':event.clientY,'zIndex':1001});
                                }
                                 
                                if(data[0]=='GUINode'){
                                    if(proyecto.type=='Read'){
                                        $("#ULmenu").html("<ul><li id='menu_anterior' align='left' class='itemmenu' onclick='abrirClaseGUI(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/view.png'/>&nbsp;&nbsp;Abrir Clase</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='editarClaseGUI(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/editgui.png'/>&nbsp;&nbsp;Editar GUI</div></li></ul>");
                                     
                                    }else{
                                        
                                    
                                    $("#ULmenu").html("<ul><li id='menu_anterior' align='left' class='itemmenu' onclick='abrirClaseGUI(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/view.png'/>&nbsp;&nbsp;Abrir Clase</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='editarClaseGUI(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/editgui.png'/>&nbsp;&nbsp;Editar GUI</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='uiRenombrarClaseGUI(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/rename.png'/>&nbsp;&nbsp;Renombrar Clase</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='eliminarClaseGUI(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/delete.png'/>&nbsp;&nbsp;Eliminar Clase</div></li></ul>");
                                    }
                                    menu.css({'display':'block', 'left':event.clientX, 'top':event.clientY,'zIndex':1001});
                                }
                                 
                                if(data[0]=='FileNode'){ 
                                    if(proyecto.type=='Read'){
                                         $("#ULmenu").html("<ul><li id='menu_anterior' align='left' class='itemmenu'><div class='contentMenuItem'><img src='../Images/ContextualMenu/view.png'/>&nbsp;&nbsp;Abrir Fichero</div></li></ul>");
                                  
                                    }else{
                                         $("#ULmenu").html("<ul><li id='menu_anterior' align='left' class='itemmenu' onclick='abrirFichero(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/view.png'/>&nbsp;&nbsp;Abrir Fichero</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='uiRenombrarFichero(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/rename.png'/>&nbsp;&nbsp;Renombrar Fichero</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='eliminarFichero(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/delete.png'/>&nbsp;&nbsp;Eliminar Fichero</div></li></ul>");
                                  
                                    }
                                    menu.css({'display':'block', 'left':event.clientX, 'top':event.clientY,'zIndex':1001});
                                }
                                 
                                if(data[0]=='LibrarieNode' && proyecto.type!='Read'){
                                    
                                          $("#ULmenu").html("<ul><li id='menu_anterior' align='left' class='itemmenu' onclick='uiRenombrarLibreria(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/rename.png'/>&nbsp;&nbsp;Renombrar Libreria</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='eliminarLibreria(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/delete.png'/>&nbsp;&nbsp;Eliminar Libreria</div></li></ul>");
                                   
                                   
                                   menu.css({'display':'block', 'left':event.clientX, 'top':event.clientY,'zIndex':1001});
                                  }
                                 
                                if(data[0]=='SRCNode' && proyecto.type!='Read'){ 
                                     $("#ULmenu").html("<ul><li id='menu_anterior' align='left' class='itemmenu' onclick='uiAgregarClaseGUI(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/addform.png'/>&nbsp;&nbsp;Agregar GUI</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='uiAgregarClase(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/addjava.png'/>&nbsp;&nbsp;Agregar Clase</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='uiCargarClase(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/uploadjava.png'/>&nbsp;&nbsp;Cargar Clase Existente</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='uiAgregarFichero(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/addfile.png'/>&nbsp;&nbsp;Agregar Fichero</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='uiCargarFichero(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/uploadfile.png'/>&nbsp;&nbsp;Cargar Fichero Existente</div></li>\n\
                                                       <li id='menu_anterior' align='left' class='itemmenu' onclick='uiAgregarPaquete(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/addpackage.png'/>&nbsp;&nbsp;Agregar Paquete</div></li></ul>");
                                    menu.css({'display':'block', 'left':event.clientX, 'top':event.clientY,'zIndex':1001});
                                }
                                 
                                if(data[0]=='LIBSNode' && proyecto.type!='Read'){ 
                                    
                                     $("#ULmenu").html("<ul><li id='menu_anterior' align='left' class='itemmenu' onclick='uiCargarLibreria(\""+id+"\")'><div class='contentMenuItem'><img src='../Images/ContextualMenu/uploadlib.png'/>&nbsp;&nbsp;Cargar Libreria</div></li></ul>");
                                   menu.css({'display':'block', 'left':event.clientX, 'top':event.clientY,'zIndex':1001});
                                }
        
                            
                            event.stopPropagation();
                            return false;
                              
			};
                       	function toncheck(id,state){
			
				return true;
			
			};
                        function menu(algo){
                         jPrompt('Type something:', 'Prefilled value', 'Prompt Dialog', function(r) {
                                    if( r ) alert('You entered ' + r);
                            });
                         if(algo){
                         document.getElementById('menuJOption').style.zIndex=3;
                         document.getElementById('menuJOption').style.display='block';
                         }else{
                         document.getElementById('menuJOption').style.zIndex=-1;
                         document.getElementById('menuJOption').style.display='none';
                         }
                     };
                        

 
      
}

		
