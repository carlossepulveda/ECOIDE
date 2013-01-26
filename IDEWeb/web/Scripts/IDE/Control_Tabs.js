/**
 *@author wilson rivera
 */

function Control_Tabs(elemento){
   
   var pDoc=null;  
    //var tabbar=new dhtmlXTabBar(elemento);
    var dShareJS=new Array();
    dom=require("ace/lib/dom")
    dom.importCssString(".uneditable{background:rgba(229, 229, 229, 0.9);position:absolute;z-index:10}","uneditable",document )
    dom.importCssString(".errorCompilation{background:rgba(255, 178, 176, 0.9);position:absolute;z-index:10}","errorCompilation",document )
    this.cl=5;
    
    var tabbar=elemento;
    tabbar.setSkin('dhx_skyblue');
    tabbar.setImagePath("../Scripts/dhtmlxSuite/dhtmlxTabbar/codebase/imgs/");
    tabbar.enableTabCloseButton(true);//para que se pueda navegar entre las tabs    
    var arrayId=new Array();//array de IdTab para usar como identificadores..     
    var codigoFuente="";//variable para almacenar el codigo fuente de una clase
    var tabEvento;//esta variable permite guardar cual es la tab seleccionada o que captura un evento
    var valor=14;
    var control_BarDesplegable=new Control_BarrasDesplegables();
    var control_lienzo=new Control_Lienzo('../IDE/guardarGUI.jsp');
    
    /**
     *Adiciona un elemento al IdTab al array a partir de un id y un idNormalizada
     *@param id {String} id estructurada
     *@param idNormalizada {String} id que pasa por una normalizacion
     *@return {boolean} retorna true si adiciono, en caso contrario false;
     */
    this.addId=function(id,idNormalizada){
        //verifico que no exista esa id en el array
        if(this.estaId(idNormalizada)==-1){
            arrayId.push(new IdTab(id,idNormalizada));
            return true;
        }
        return false;      
    };
    
    /**
     *Elimina un elemento al IdTab al array a partir de un idNormalizada
     *@param idNormal {String} idNormalizada
     *@return {boolean} retorna true si elimino, en caso contrario false
     */
    this.popId=function(idNormal){
        var pos=this.estaId(idNormal);
        
        if(pos!=-1){
            delete arrayId[pos];
            return true;
        }
        return false;
    };
    
    
    
    /**
     *Verifica si una idNormalizada esta en el array
     *@param id sin normalizar
     *@return -1{integer} no encontro el elemento
     *@return pos{integer} posicion en el array del elemento encontrado
     */
    this.estaId_=function(idNodo){
        return this.estaId(this.normalizarId(idNodo));
    };//fin fucntion
    
    /**
     *Verifica si una idNormalizada esta en el array
     *@param idNormalizada {String} id que pasa por una normalizacion
     *@return -1{integer} no encontro el elemento
     *@return pos{integer} posicion en el array del elemento encontrado
     */
    this.estaId=function(idNormalizada){
        //si el array esta vacion no esta el id
        if(arrayId.length==0)
            return -1;
        else{
            //buscar si el id esta en el array
            for(var i in arrayId){
                //pregunto si es igual
                if(arrayId[i].equals(idNormalizada))
                    return i;
            }
            return -1;
        }//fin del else
    };//fin fucntion
    
    /**
     *Normaliza una id quitandoles los ';' , ':' y '@' y en su lugar coloca 'C'
     *@param id {String} id estructurada
     *@return {String} cadena q representa una idNormalizada;
     */
    this.normalizarId=function(id){
        
        id=id.replace(" ", "_"); //eliminando los espacios en blanco del id
        var sp=id.split(':');
        var aux='';
        for(var i in sp){        
            var s='C';
            if(i==0)s='';        
            aux+=s+sp[i];        
        }
        
        id=aux;
        aux='';
        sp=id.split(';');
        for(var i in sp){        
            var s='C';
            if(i==0)s='';        
            aux+=s+sp[i];        
        }
    
        id=aux;
        aux='';
        sp=id.split('.');
        for(var i in sp){        
            var s='C';
            if(i==0)s='';        
            aux+=s+sp[i];       
        }
    
        id=aux;
        aux='';
        sp=id.split('@');
        for(var i in sp){        
            var s='C';
            if(i==0)s='';        
            aux+=s+sp[i];        
        }
        return aux;
    };
    
    
    /**
     *Permite saber desde una id sin normalizar el tipo de nodo y el nombre del fichero
     *@param id {String} id estructurada
     *@return {Array} Array que en la posicion 0 tiene el tipo de nodo
     *y en la posicion 1 el nombre del fichero
     */
    
    this.iconoIdName=function(id){
        var idName=new Array(2);
        var partsId=id.split(';');
        var tipoNode=partsId[0];
        switch(tipoNode){
            case "ClassNode":{
                idName[0]='java';
                break;
            }
            case "GUINode":{
                idName[0]='gui';
                break;
            }
            case "DocNode":{
                idName[0]='word';
                break;
            }
            case "imageNode":{
                idName[0]='imagen';
                break;
            }      
            case "txtNode":{
                idName[0]='txt';
                break;
            }
            default :{
                idName[0]='desconocido';
                break; 
            }
        }
        //saber cual es el nombre del fichero
        idName[1]=(partsId[3].split(':'))[1];
        return idName;        
    };
    
    this.getArrayId=function(){
        return arrayId;
    }
    
    function getNombreId(id){
        return id.split(':')[1];
    }
    
    
    /**
     *Permitira abrir una clase en el editor en una pestaña
     *@param id {String} id estructurada
     *@param editable {boolean} true= si es editable.. false= si no es editable
     *@param lineIni {int} linea inicial
     *@param type {String} error,warning,none
     **/
    this.abrirClase=function(id,editable,lineIni,type){
      
        var html="";
        var idNormalizada=this.normalizarId(id);
        
        //intento adicionar el IdTab: si es true es porq no esta y hay que crear la pestaña
        if(this.addId(id, idNormalizada)){
           
                    codigoFuente='cargando...';//this.getBasicTemplateClass(id);
                     
            
            html="<div id='divleft'><img src='../Images/Tabbar/esquina.png' /></div>\n\
                  <div id='divBarraTools"+idNormalizada+"' class='BarraTools' style='display: block;'>\n\
                        <img class='botonBarra' src='../Images/Tabbar/undo.png' title='Deshacer' onclick='control_tab.undo(\""+idNormalizada+"\")'/>\n\
                        <img class='botonBarra' src='../Images/Tabbar/redo.png' title='Rehacer' onclick='control_tab.redo(\""+idNormalizada+"\")'/>\n\
                        <img class='botonBarra' src='../Images/Tabbar/selectAll.png' title='Seleccionar Todo' onclick='control_tab.seleccionarTodo(\""+idNormalizada+"\")'/>\n\
                        <img class='botonBarra' src='../Images/Tabbar/find.png' title='Buscar' onclick='control_tab.mostrarOcultar(2,\""+idNormalizada+"\")'/>\n\
                        <img class='botonBarra' src='../Images/Tabbar/findReplace2.png' title='Reemplazar' onclick='control_tab.mostrarOcultar(3,\""+idNormalizada+"\")'/>\n\
                        <div id='divTextSize'>\n\
                            <img class='botonBarra2' src='../Images/Tabbar/font.png' title='Tamaño de Fuente'/>\n\
                            <img class='botonBarra d' src='../Images/Tabbar/up.png' width='14' height='11' alt='up' title='Aumentar' onclick='control_tab.zoomText(\"aumentar\")'/>\n\
                            <img class='botonBarra d' src='../Images/Tabbar/down.png' width='14' height='11' alt='down' title='Disminuir' onclick='control_tab.zoomText(\"disminuir\")'/>\n\
                        </div>\n\
                  </div>\n\
                  <div id='divBuscar"+idNormalizada+"' class='BarraTools' style='display:none;'>\n\
                        <span class='fontText' style='margin-left: 3px; float:left;'>Buscar: </span>\n\
                        <input id='textBuscar"+idNormalizada+"' class='fontText inputBarra' type='text' name='find' value=''/>\n\
                        <img class='botonesBuscar' src='../Images/Tabbar/botonFind.png' title='Buscar' onclick='control_tab.find(\""+idNormalizada+"\", $(\"#textBuscar"+idNormalizada+"\").val())'/>\n\
                        <img class='botonesBuscar' src='../Images/Tabbar/botonAnterior.png' title='Anterior' onclick='control_tab.findPrevious(\""+idNormalizada+"\")'/>\n\
                        <img class='botonesBuscar' src='../Images/Tabbar/botonSiguiente.png' title='Siguiente' onclick='control_tab.findNext(\""+idNormalizada+"\")'/>\n\
                        <img class='botonesBuscar' src='../Images/Tabbar/botonCerrar.png' title='Cerrar Búsqueda' onclick='control_tab.mostrarOcultar(1,\""+idNormalizada+"\")'/>\n\
                  </div>\n\
                  <div id='divReplace"+idNormalizada+"' class='BarraTools' style='display: none;'>\n\
                        <span class='fontText' style='margin-left: 3px; float:left;'>Buscar: </span>\n\
                        <input id='textBuscarReplace"+idNormalizada+"' class='fontText inputBarra' type='text' name='find' value=''/>\n\
                        <span class='fontText' style='margin-left: 3px; float:left;'>Reemplazar con: </span>\n\
                        <input id='textReplace"+idNormalizada+"' class='fontText inputBarra' type='text' name='replace' value=''/>\n\
                        <img class='botonesBuscar' src='../Images/Tabbar/botonReplace.png' title='Reemplazar' onclick='control_tab.replace(\""+idNormalizada+"\",$(\"#textBuscarReplace"+idNormalizada+"\").val(),$(\"#textReplace"+idNormalizada+"\").val())'/>\n\
                        <img class='botonesBuscar' src='../Images/Tabbar/botonReemplazarAll.png' title='Reemplazar Todo' onclick='control_tab.replaceAll(\""+idNormalizada+"\",$(\"#textBuscarReplace"+idNormalizada+"\").val(),$(\"#textReplace"+idNormalizada+"\").val())'/>\n\
                        <img class='botonesBuscar' src='../Images/Tabbar/botonCerrar.png' title='Cerrar' onclick='control_tab.mostrarOcultar(1,\""+idNormalizada+"\")'/>\n\
                  </div>\n\
                  <div id='"+idNormalizada+"' style='background-color: #FFFFFF; margin:0; position: absolute; top: 30; bottom: 0; left: 0; right: 0; width:100%; height:100%; ' ></div>";
            //<div id='"+idNormalizada+"' style='background-color: #FFFFFF; margin:0; position: absolute; top: 30; bottom: 0; left: 0; right: 0; width:100%; height:100%; ' >"+codigoFuente+"</div>";
            codigoFuente="";
            
        }else{
            //la pestaña esta en el editor por lo tanto hay que activarla y salir de la funcion
            tabbar.setTabActive(idNormalizada);
            this.goLine(id,lineIni,type);
            
            return;
        }   
    
        crearTab(idNormalizada,'java',getNombreId(id),html,1,id,null,editable,lineIni,type);
    }
    
    this.abrirArchivo=function(id,type,editable){
        var icon='nofile'
        var s=id.split(';');
        var html='';
        var idNormalizada=this.normalizarId(id);
         switch(type){
            
            case "document":{
                icon='word';
                html="<div id='"+idNormalizada+"' style='background-color: #FFFFFF; margin:0; position: absolute; top: 30; bottom: 0; left: 0; right: 0; width:100%; height:100%; ' ></div>";
                crearTab(idNormalizada,'txt',getNombreId(id),html,3,id,null,editable,0,'none');
                return;
            }
            case "image":{
                icon='imagen';
                var sp=s[s.length-1].split(':');
                if(sp[0]=='Default Package')sp[0]='*.*'
                html="<div style='width:100%;height:100%;overflow:auto;'><img src='../getImageProject/"+s[1]+"/"+s[2]+"/"+sp[0]+"/"+sp[1]+"'></div>";
                break;
            } 
            case "video":{
               icon="video";
               html="<div><img src='../Images/SupportWindow/videofile.png'></div>";
               break;
            }
            case "sound":{
               icon="audio";
               html="<div><img src='../Images/SupportWindow/audiofile.png'></div>";
               break;
            }
            case "pdf":{
                icon="pdf";
                html="<div><img src='../Images/SupportWindow/pdffile.png'></div>";
                break;
            }
            default :{
                icon='desconocido';
                html="<div><img src='../Images/SupportWindow/unknowfile.png'></div>";
                break; 
            }
        }
        
        crearTabMediaFile(id,icon,getNombreId(id),html);
    }
    /**
     *Permitira abrir una GUI en el editor en una pestaña
     *@param id {String} id estructurada
     *@param nuevo {integer} 1= si es abrir una GUI cuando es creada.. 0= si es una GUI existente
     *@param cont{Object} JSON
     */
    this.abrirGUI=function(id,editable,lineIni,type){
       
       
        var html="";
        var idNormalizada=this.normalizarId(id);
        
        //intento adicionar el IdTab: si es true es porq no esta y hay que crear la pestaña
        if(this.addId(id, idNormalizada)){
           
            control_BarDesplegable.addBarra(idNormalizada);

            html="<div id='divleft'><img src='../Images/Tabbar/esquina.png' /></div>\n\
                  <div id='divBarraTools"+idNormalizada+"' class='BarraTools'>\n\
                        <img class='botonBarra' src='../Images/Tabbar/undo.png' title='Deshacer' onclick='control_tab.undo(\""+idNormalizada+"\")'/>\n\
                        <img class='botonBarra' src='../Images/Tabbar/redo.png' title='Rehacer' onclick='control_tab.redo(\""+idNormalizada+"\")'/>\n\
                        <img class='botonBarra' src='../Images/Tabbar/selectAll.png' title='Seleccionar Todo' onclick='control_tab.seleccionarTodo(\""+idNormalizada+"\")'/>\n\
                        <img class='botonBarra' src='../Images/Tabbar/find.png' title='Buscar' onclick='control_tab.mostrarOcultar(2,\""+idNormalizada+"\")'/>\n\
                        <div id='divTextSize'>\n\
                            <img class='botonBarra2' src='../Images/Tabbar/font.png' title='Tamaño de Fuente'/>\n\
                            <img class='botonBarra d' src='../Images/Tabbar/up.png' width='14' height='11' alt='up' title='Aumentar' onclick='control_tab.zoomText(\"aumentar\")'/>\n\
                            <img class='botonBarra d' src='../Images/Tabbar/down.png' width='14' height='11' alt='down' title='Disminuir' onclick='control_tab.zoomText(\"disminuir\")'/>\n\
                        </div>\n\
                        <img class='botonBarra' src='../Images/Tabbar/diseño.png' title='Diseño GUI' onclick='control_tab.mostrarOcultar(5,\""+idNormalizada+"\")'/>\n\
                  </div>\n\
                  <div id='divBuscar"+idNormalizada+"' class='BarraTools' style='display: none;>\n\
                        <span class='fontText' style='margin-left: 3px; float:left;'>Buscar: </span>\n\
                        <input id='textBuscar"+idNormalizada+"' class='fontText inputBarra' type='text' name='find' value=''/>\n\
                        <img class='botonesBuscar' src='../Images/Tabbar/botonFind.png' title='Buscar' onclick='control_tab.find(\""+idNormalizada+"\", $(\"#textBuscar"+idNormalizada+"\").val())'/>\n\
                        <img class='botonesBuscar' src='../Images/Tabbar/botonAnterior.png' title='Anterior' onclick='control_tab.findPrevious(\""+idNormalizada+"\")'/>\n\
                        <img class='botonesBuscar' src='../Images/Tabbar/botonSiguiente.png' title='Siguiente' onclick='control_tab.findNext(\""+idNormalizada+"\")'/>\n\
                        <img class='botonesBuscar' src='../Images/Tabbar/botonCerrar.png' title='Cerrar Búsqueda' onclick='control_tab.mostrarOcultar(1,\""+idNormalizada+"\")'/>\n\
                  </div>\n\
                  <div id='divDiseno"+idNormalizada+"' class='BarraTools'>\n\
                        <img class='botonBarra' src='../Images/Tabbar/codigo.png' title='Ver Código Fuente' onclick='control_tab.mostrarOcultar(4,\""+idNormalizada+"\")'/>\n\
                  </div>\n\
                  <div id='gui"+idNormalizada+"' style='display:none; height: 100%;background:none;'></div>\n\
                  <div style='margin-bottom:5%;height:100%;'><div id='"+idNormalizada+"'  style='background-color: #FFFFFF;  position: absolute; top: 30; bottom: 0; left: 0; right: 0; display:none ' >"+codigoFuente+"</div></div>";
                 codigoFuente='';
          
            
        }else{
            //la pestaña esta en el editor por lo tanto hay que activarla y salir de la funcion
            tabbar.setTabActive(idNormalizada);
            this.goLine(id,lineIni,type);
            return;
        }   
    
   
    // sharejs.open(idNodo, 'text','http:// direccion del servidor SHAREJS:8000/sjs', function(error, doc) {
   
    var dFrml;
   
  var s=id.split(';');
  var saux=s;
                        var c=s[3].split(':');
                        var pack=c[0];
                        var packaux=pack;
                        if('Default Package'==pack){
                            pack='';
                            packaux='*.*';
                        }
      
   var idFrml='';
   saux[saux.length-1]=packaux+':'+c[1].replace('.java','.frml');
   var sepau='';
   for(var i in saux){
       idFrml+=sepau+saux[i];
       sepau=';';
   }
   sharejs.open(idFrml, 'json','http://'+sT+':'+pT+'/sjs', function(error, doc) {
				dFrml = doc;
		
              //  dFrml.on('change', function (op) {
		//			stateUpdatedDFRML(op);
	//	});
                if (doc.created) {
                     $.get("../IDE/abrirGUI.jsp?clase="+c[1]+"&paquete="+pack+"&proyecto="+s[1]+"&propietario="+s[2]+"&ran="+Math.random()*99999999999, function(data) {
                         
                         doc.submitOp([{p:[], od:null, oi:jsonParse(data)} ]);
                        var docJava=crearTab(idNormalizada,'gui',getNombreId(id),html,2,id,dFrml,editable,lineIni,type);
                    
                         control_lienzo.buildLienzo('#gui'+idNormalizada, null, id,tabbar.getEditorAce(idNormalizada),dFrml);
                         $('#divBarraTools'+idNormalizada).css('display','block');
                         $('#'+idNormalizada).css('display','block');
                         $('#divDiseno'+idNormalizada).css('display','none');
                         $('#gui'+idNormalizada).css('display','none');
                     });
                }
		
		 
                
               else{
               console.log('*****dfrml      '+dFrml.snapshot.li+'    cl  '+dFrml.snapshot.cl);
                   var docJava=crearTab(idNormalizada,'gui',getNombreId(id),html,2,id,dFrml,editable,lineIni,type);
                   control_lienzo.buildLienzo('#gui'+idNormalizada, null, id,tabbar.getEditorAce(idNormalizada),dFrml);
                   $('#divBarraTools'+idNormalizada).css('display','block');
                   $('#'+idNormalizada).css('display','block');
                   $('#divDiseno'+idNormalizada).css('display','none');
                   $('#gui'+idNormalizada).css('display','none');
               }
               
           
         
         
   });
    
       
                              
       
    }
   
   function updateDOC(dFrml,dDoc){
   
       
   }
    /**
     *Permite parsear un xml que coontiene linea a linea el codigo fuente de una clase
     *@param xml {Object} xml es el contenido en este formato para formatear el codigo fuente que ira en el editor
     **/
    function parsearXML(xml){
        var codigoFuente;    
        $(xml).find('line').each(function(){
              
            var linea=$(this).text();
            if(linea==" ")
                codigoFuente+="\n";
            else
                codigoFuente+=linea+'\n';
        });
       return codigoFuente; 
    }
    
    /**
     *Permitira crear una pestaña
     *@param id {String} id para la pestaña
     *@param icon{String} me indica el icono a utilizar para la pestaña
     *@param nombre {String} nombre para la pestaña
     *@param contenido{String} contenido html que ira en la pestaña
     *@param editor{Integer} indica si la tab contendra un editor ace 1=contiene 0=no contiene
     */
  function crearTab(id,icon,nombre,contenido,editor,idNodo,dFrml,editable,lineIni,type){
       
        tabbar.addTabIcon(id,nombre,"*","/iconos/"+icon+".png");
        tabbar.setContentHTML(id,contenido);  
        tabbar.enableAutoReSize(true);                
        tabbar.setTabActive(id);
        var docJava;
        switch(editor){
            //Editor para una clase convencional
            case 1:{
                     var ed=editorAce(id,null,null,editable);
                     ed.typeEditor='java';
                    tabbar.setContainTab(id,ed);
                   // ed.setReadOnly(true);
            
                            sharejs.open(idNodo, 'text','http://'+sT+':'+pT+'/sjs', function(error, doc) {
                                if (error) {
                                  return;
                                }
                               doc.on('change', function (op) {
					
				});
                                if (doc.created) {
                                }
                                 doc.attach_ace(ed);
                                dShareJS[idNodo]={docs:[doc]};
                                goLine(idNodo,lineIni,type);   
                        });
                    break;
                }
            //Editor para una clase gui
            case 2:{
                    var ed=editorAce(id,dFrml.snapshot.li,dFrml.snapshot.cl,editable);
                    ed.typeEditor='gui';
                    tabbar.setContainTab(id,ed);
                   // ed.setReadOnly(true);
            
                            sharejs.open(idNodo, 'text','http://'+sT+':'+pT+'/sjs', function(error, doc) {
                                if (error) {
                                  return;
                                }
                                docJava=doc;
                               doc.on('change', function (op) {
					
				});
                                if (doc.created) {
                                  //doc.attach_ace(ed);
                                }
                                 doc.attach_ace(ed);
                                 ed.lockedCodeSource(20,12);
                                 dShareJS[idNodo]={id:id,docs:[doc,dFrml]};
                                 ed.dFrml=dFrml;
                                 goLine(idNodo,lineIni,type);
                              });
                    break;
                }
            //editor para un fichero de texto plano
            case 3:{
                   var ed=editorAce(id,null,null,editable);
                    ed.typeEditor='file';
                    tabbar.setContainTab(id,ed);
                    sharejs.open(idNodo, 'text','http://'+sT+':'+pT+'/sjs', function(error, doc) {
                                if (error) {
                                  return;
                                }
                                docJava=doc;
                                doc.attach_ace(ed);
                                dShareJS[idNodo]={docs:[doc]};
                                goLine(idNodo,0,type);
                              });
                    break;
                }
        }
    
        tabEvento=id;
        tabbar.attachEvent("onSelect", function(id) {
           
            tabEvento=id;
            try{var div=document.getElementById(id);
            div.style.fontSize=valor+"px";}catch(error){}
            return true;
        }); 
       
        return docJava;
    }
    
 function crearTabMediaFile(id,icon,nombre,contenido){
 
     tabbar.addTabIcon(id,nombre,"*","/iconos/"+icon+".png");
     tabbar.setContentHTML(id,contenido);  
     tabbar.enableAutoReSize(true);                
     tabbar.setTabActive(id);
     tabEvento=id; 
 }
    
   
       var markers=[];
    function editorAce(id,li,cl,editable) {
        
        var editor = ace.edit(id); 
        editor.setReadOnly(!editable);
        editor.setFontSize(valor);
        editor.lii=2;
        editor.setTheme("ace/theme/textmate");    
        var JavaMode = require("ace/mode/java").Mode;
        editor.getSession().setMode(new JavaMode());  
        editor.getSession().setFoldStyle("markbegin");  
        editor.guest=false;
        editor.editable=editable;
        
        editor.canModify = function(ed,command){return true;};
        editor.commands.exec = function (command, editor, args) {
                if (typeof command === "string" && editor.canModify(editor,command))
                    command = this.commands[command];
                if (!command)
                    return false;
                if (editor && !command.readOnly && !editor.canModify(editor,command))
                    return false;
                if (typeof command == "function")
                    command(editor, args || {});
                else
                    command.exec(editor, args || {});

                return true;
            };//fin de editor.commands.exec
            

        $('#'+id).click(function(){
           var ae=new Array();
            if(window.errorCA!=null && window.errorCA.lenght!=0){
               for(var i in window.errorCA){
                  
                   if(window.errorCA[i].id==$(this).attr('id')){ 
                       window.errorCA[i].e.getSession().removeMarker( window.errorCA[i].mar);
                       ae.push(i);
                   }
               }
               for(var j in ae){
                   window.errorCA.splice(ae[j],1);
               }
               return;
            }
            
        });
        if(li!=null && li!=undefined)
        {var Range= require("ace/range").Range;
      
            editor.rango=new Range(li,0,li+cl-1,3000);//editor.getSession().getLine(li+cl-1).length);
            editor.auxRango=cl;
  
        /*Función que permite a través de un editor ace, bloquearle un segmento de su documento
        *@param id {String} id del editor a manipular
        *@param lineaInicial {Integer} línea en la cual se empezará el bloqueo
        *@param cantLineas {Integer} esto indica la cantidad de líneas que debe bloquear después de la inicial
        */
        editor.lockedCodeSource=function(){
            var blockedRanges = [editor.rango];
            blockedRanges = blockedRanges.sort(function(a, b){
                return b.compareRange(a)
            });
            for(var i in markers){
                editor.session.removeMarker(markers[i]);
            }

            for(var i in blockedRanges){
                var range = blockedRanges[i];
                markers[i]=editor.session.addMarker(range, 'uneditable');
            }

            
     
            
            editor.canModify = function(ed,command){
                if(!editor.editable)return false;
                var c = this.getCursorPosition() 
                var seleccion=editor.getSelectionRange();
                var startRow=seleccion.start.row;
                var endRow=seleccion.end.row;            
                var rango=blockedRanges[0];
                if ((startRow<rango.start.row && endRow<rango.start.row) || (startRow>rango.end.row && endRow>rango.end.row)) {
                    switch(command.name){
                        case 'del':{//este caso lo hacemos para no permitir el suprimir al final de la linea anterior en donde empieza el segmento bloqueado
                            if(ed.getSession().getLine(c.row).length==c.column && c.row+1==rango.start.row){
                                return false;
                            }
                            break;
                        }
                        case 'backspace':{//este caso para no permitir hacer backspace una linea después de la línea final del segmento bloquueado
                            if(c.column==0 && c.row-1==rango.end.row){
                                return false;
                            }
                            break;
                        }
                    }
                    return true;
                }
                return false;
            };//fin de editor.canModify

            editor.session.removeEventListener("change", changeListener);
            editor.session.doc.removeEventListener("change", changeListener);

            var changeListener = function(e){
                var changeRange = e.data.range
                var start, end;
                if (e.data.action[0]=="i"){
                    start = changeRange.start
                    end = changeRange.end
                } else {
                    end = changeRange.start
                    start = changeRange.end
                }    
                var startRow = start.row
                var endRow = end.row
                var lineDif = endRow-startRow
    
                var colDiff = -start.column + end.column
                var r;
                for (var i=0, n = blockedRanges.length; i < n; i++) {
                    r = blockedRanges[i]
                    if (r.end.row < startRow)
                        continue
                    if (r.start.row > startRow)
                        break

                    if (r.start.row == startRow
                        && r.start.column >= start.column
                        ) {
                        r.start.column += colDiff
                        r.start.row += lineDif
                        r.end.row += lineDif
                    } else if (r.end.row == startRow
                        && r.end.column >=  start.column
                        ) {
                        r.end.column += colDiff
                        r.end.row += lineDif
                    }
                }
                if (lineDif != 0 && i<n) {
                    for (; i < n; i++) {
                        r = blockedRanges[i];
                        r.start.row += lineDif
                        r.end.row += lineDif
                    }
                }
             
                editor.dFrml.submitOp([{p:['li'], od: editor.dFrml.snapshot.li,oi: blockedRanges[0].start.row }]);
                
            };//fin de changeListener
            editor.session.on("change", changeListener);
            var updateRango=function(e){
             
              var fila=e.data.range.start.row;
              var text=e.data.text;
                switch (e.data.action){
                    case 'insertText':{
                           // console.log(editor.rango.end.row);
                        
                            //console.log(editor.auxRango+'       '+editor.rango.end.row);
                            if(fila>=editor.rango.start.row&&fila<=editor.rango.end.row){//esto indica si esta en el segemento bloqueado
                            //console.log('va a insertar en lo bloqueado.....   ..|'+text+'|...         '+(text=="\n"|| text=="↵")+'   uauxRango: '+editor.auxRango+'   '+(editor.rango.end.row-editor.rango.start.row+1));  
                              if((text=="\n" || text=="\u21b5") && editor.auxRango==editor.rango.end.row-editor.rango.start.row+1){
                                 // console.log(editor.rango.end.row);
                                 // console.log('aumentar linea;   auxRango= '+editor.auxRango+'  rango: '+editor.rango.end.row);
                                  editor.rango.end.row++;
                                  editor.auxRango++;
                                  editor.rango.end.column=3000;
                              }
                              else{
                                  if(!guest){
                                     editor.auxRango=editor.rango.end.row-editor.rango.start.row+1;
                                  }
                              }
                            }
                            break;
                    }
                    case 'removeText':{console.log('removerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr  textoooooooooooooooooooooooooooooooooooo');
                            if(fila>=editor.rango.start.row&&fila<=editor.rango.end.row){//esto indica si esta en el segemento bloqueado
    
                               // editor.rango.end.row--;
                              //  editor.rango.end.column=editor.getSession().getLine(editor.rango.end.row).length;
                            break;

                            }
                    }
                    
                  }
                
            };
            editor.session.on("change", updateRango);
        };
        
        
        /*Esta función se encargara de ubicar un editor ace ubicarse en la posición indicada e insertar un texto
        *@param fila {Integer} número de fila (empieza en 0)
        *@param columna {Integer} número de la columna en la fila (empieza 0)
        *@param text {String} es el texto que se desea insertar, este texto puede ir con espacios de sangría y salto de línea
        *@param cantLineas {Integer} número de líneas anexar
        */
    
        editor.insertar=function(fila,columna,text,outVoid){
            
            editor.getSession().insert({
                row: fila, 
                column: columna
            }, text);
            
        };
        
   /**     editor.insertarUpdate=function(fila,columna,text,outVoid){
        
               var cl=text.split('\n').length;
               if(cl>1){
                   editor.rango.end.row+=cl-1;
               }
                editor.getSession().insert({
                    row: fila, 
                    column: columna
                }, text);
                
        
            
            
        };**/
       
        
        /*Esta función se encarga de eliminar una línea en el editor, 
        *verificando que si la línea que se eliminará esta dentro del 
        *segmento bloqueado, reajuste las variables
        *@param linea {Integer} número de línea teniendo encuenta que empieza en 0*/
        editor.remover=function(linea,ci,outVoid){
           
            var Range=require("ace/range").Range;
            var rang=new Range(linea,ci,linea,editor.getSession().getLine(linea).length); 
          
            console.log('eliminaraaa  la fila   '+rang);            
           editor.getSession().remove(rang);
           
            
           
        };
        
        
        
   
    }
   
        return editor;
    
    }  

    this.zoomText=function(Accion){
    
        //inicializacion de variables y parámetros 
        var ed=tabbar.getEditorAce(tabEvento);
        // var obj=document.getElementById(Element); 
        var max = 30 //tamaño máximo del fontSize
        var min = 10 //tamaño mínimo del fontSize
    
        //accion sobre el texto 
        if( Accion=="reestablecer" ){
            valor=14;
            ed.setFontSize(valor);
        }
        if( Accion=="aumentar" && ((valor+1) <= max )){
            valor=valor+1;
            ed.setFontSize(valor);
        }
        if( Accion=="disminuir" && ((valor+1) >= min )){
            valor=valor-1;
            ed.setFontSize(valor);
        }
   
    }

    this.seleccionarTodo=function(id){
        var edi=tabbar.getEditorAce(id)
        edi.selectAll();
    }
    this.undo=function(id){
        var edi=tabbar.getEditorAce(id);
        edi.undo();
    }
    this.redo=function(id){
        var edi=tabbar.getEditorAce(id);
        edi.redo();
    }

    this.find=function(id,word){
        var edi=tabbar.getEditorAce(id);
        edi.find(word);
    }

    this.findNext=function(id){
               
        var edi=tabbar.getEditorAce(id);
        edi.findNext();
    }

    this.findPrevious=function(id){
        var edi=tabbar.getEditorAce(id);
        edi.findPrevious();
    }

    this.replace=function(id,buscarQue,ReemplazarCon){
        var edi=tabbar.getEditorAce(id);
        edi.find(buscarQue);
        edi.findPrevious();
        edi.replace(ReemplazarCon,buscarQue);
    }

    this.replaceAll=function(id,buscarQue,ReemplazarCon){
        var edi=tabbar.getEditorAce(id);
        edi.find(buscarQue);
        edi.replaceAll(ReemplazarCon,buscarQue);
    }

    //esta funcion se encarga que una vez se hace click en el boton buscar
    //oculte la barra de herramientas y mostrar la de busqueda
    //barra= dice cual barra es..
    //la variable barraBuscarActiva me indica si la barra de buscar estuvo activa
    var barraBuscarActiva=false;
    this.mostrarOcultar=function(barra,id){
        switch(barra){               
            case 1:{
                $("#divBarraTools"+id).css('display',"block"); 
                if(barraBuscarActiva){
                    $("#divBuscar"+id).css('display',"none"); 
                    barraBuscarActiva=false;
                }else
                    $("#divReplace"+id).css('display',"none"); 
               
                break;
            }
            case 2:{
             
                $("#divBarraTools"+id).css('display',"none"); 
                $("#divBuscar"+id).css('display',"block"); 
                barraBuscarActiva=true;
                break;
            }
            case 3:{
                $("#divBarraTools"+id).css('display',"none"); 
                $("#divReplace"+id).css('display',"block"); 
                break;
            }
            case 4:{//desdedivDiseño ver codigo fuente
                // $("#divBarraTools"+id).css('display',"block"); 
                $("#divBarraTools"+id).show();
                // $("#"+id).css('display',"block");
                $("#"+id).show();
             
                // $("#divDiseno"+id).css('display',"none"); 
                $("#divDiseno"+id).hide();
                // $("#gui"+id).css('display',"none");
                $("#gui"+id).hide();
              
              tabbar.getEditorAce(id).resize();
                
          //  tabbar.getEditorAce(id).getRenderer().updateFontSize();
                break;
                
            }
            case 5:{//desde codigo fuente ver div diseño
                 
                $("#divBarraTools"+id).css('display',"none"); 
                $("#"+id).css('display',"none");
                $("#divDiseno"+id).css('display',"block"); 
                $("#gui"+id).css('display',"block");
                break;
            }
        }
    }
    
    
    
    this.deleteFocusLienzo=function(){
                     
        control_lienzo.deleteFocus();
                     
    };
    
    this.getElementoLienzoFoco=function(){
                  
        control_lienzo.getElementoFoco();
    };
                 
    this.guardar=function(){
         
        control_lienzo.guardar();
         
    };
    this.eventoTeclado=function(e){
        control_lienzo.eventoTeclado(e);
    };
     
     
     
    this.clickToggler=function(idN){
        control_BarDesplegable.clickToggler(idN);
    };   
 
    this.updatePropertiesComponent=function(idP, idNameVariable, idValueVariable, comp, idComp){
        control_lienzo.updatePropertiesComponent(idP, idNameVariable, idValueVariable, comp, idComp);
    };
    
    this.lanzarBox=function(idP,comp,idComponent,valor,nameUrl){
        console.log(idP+'  '+comp+'   '+idComponent+'   '+valor+'   '+nameUrl);
        control_lienzo.lanzarBox(idP, comp, idComponent,valor,nameUrl);
    };
    
    this.updateNameComponent=function(idP, idNameVariable, comp, idComp){
        control_lienzo.updateNameComponent(idP, idNameVariable, comp,idComp);
    };
    
    this.updateValueComponent=function(idP,nameComponent,newValue,idComponent){
        control_lienzo.updateValueComponent(idP,nameComponent,newValue,idComponent);
    };
    
    this.addComponentPalette=function(idC,idNodo,x,y,tipo,usuario){
        control_lienzo.addComponentPalette(idC,idNodo, x, y,tipo, usuario);
    };
    this.resizeLienzo=function(idC,w,h,usuario){
        control_lienzo.resizeLienzo(idC,w,h,usuario);
    };
    this.moveComponent=function(idC,x,y,usuario){
        control_lienzo.moveComponent(idC,x,y,usuario);
    };
    this.moveComponentT=function(idC,x,y,cx,cy,usuario){
        control_lienzo.moveComponentT(idC, x, y, cx, cy, usuario);
    };
    this.resizeComponent=function(idC,w,h,usuario){
        control_lienzo.resizeComponent(idC, w, h, usuario);
    };
    this.updatePropertiesComponent_=function(idP,newName,newValue,nameComponent,idComponent,usuario){
        control_lienzo.updatePropertiesComponent_(idP, newName, newValue, nameComponent, idComponent, usuario);
    };
    this.updateNameComponent_=function(idP,newName,nameComponent,idComponent,usuario){
        control_lienzo.updateNameComponent_(idP, newName, nameComponent, idComponent, usuario);      
    };
    this.updateValueComponent_=function(idP,nameComponent,newValue,idComponent,usuario){
        control_lienzo.updateValueComponent_(idP, nameComponent, newValue, idComponent, usuario);
    };
    this.deleteComponente_=function(idC,usuario){
        control_lienzo.deleteComponente_(idC, usuario);
    };
    
    
    this.generarCodigoJava=function(){
        control_lienzo.generarCodigoJava();
    };
    
    function crearDocumento(idNodo){
        var s=idNodo.split(';');
        var c=s[3].split(':');
        var pack=c[0];
        if('Default Package'==pack)
            pack='';
        $.get("../IDE/abrirClase.jsp?clase="+c[1]+"&paquete="+pack+"&proyecto="+s[1]+"&propietario="+s[2]+"&ran="+Math.random()*99999999999, function(data) {
           
                             var codigoFuente='\na\na\na\na\na\na}\na}';    
                             var xmlDoc = $.parseXML( data );
                             var $xml = $( xmlDoc );
                            $xml.find('line').each(function(){

                                var linea=$(this).text();
                               
                                if(linea==" ")
                                    codigoFuente+="\n";
                                else
                                    codigoFuente+=linea+'\n';
                            });
              
                           return codigoFuente; 
                              

               }); 
        
    }
    
    this.createAction=function(idP,idC){
      
      control_lienzo.createAction(idP, idC);
      
    };
    
    this.updatedJava=function(data){
        control_lienzo.updatedJava(data);
    };
    
    this.removeTab=function(a){
      
        var pos=this.estaId_(a);
        if(pos==-1)return;
        tabbar.removeTab(arrayId[pos].getIdNormalizado());
        
        var ds=dShareJS[a];
        if(ds==null)return;
      
        var docs=ds.docs;
       
        for(var i in docs){
            docs[i].close();
        }
        delete dShareJS[a];
    };
    
 
 this.changeUserPrivilege=function(name,owner,type){
     
     for(var i in arrayId){
      
          var s=arrayId[i].getId().split(';');
          
          if(s[1]==name && s[2]==owner){
              var ed=false;
              ed=type=='Write';
              
              tabbar.getEditorAce(arrayId[i].getIdNormalizado()).editable=ed;
          }
    
    }
 };
 
 this.closeProject=function(name,owner){
     
     for(var i in arrayId){
      
          var s=arrayId[i].getId().split(';');
          
          if(s[1]==name && s[2]==owner){
             
             this.removeTab(arrayId[i].getId());
              /**  tabbar.removeTab(arrayId[i].getIdNormalizado());
                var docs=dShareJS[arrayId[i].getId()].docs;
                for(var k in docs){
                    docs[k].close();
                }**/
           
          }
    
    }
 };
 
 this.resizeEditores=function(){
     
    for(var i in arrayId){
      
          tabbar.getEditorAce(arrayId[i].getIdNormalizado()).resize();
    
    }
   
    var div=document.getElementById(tabEvento);
    control_lienzo.resizeContenedoresLienzos($(div).css('height'));
 };
 this.goLine=function(id,nline,type){ 
     var ss=id.split(';');
     for(var i in arrayId){
      
          var s=arrayId[i].getId().split(';');
         
          if(arrayId[i].getId()==id){
             
            
             tabbar.getEditorAce(arrayId[i].getIdNormalizado()).gotoLine(parseInt(nline));
             if(type=='none'){
               //  resaltarLinea(arrayId[i].getIdNormalizado(),nline,type,'hola mundo');
                   return;// $('.ace_active_line').addClass('errorCompilacion').css('background-color', '#ffb2b2');
                }
                var Range= require("ace/range").Range;
                var range=new Range(parseInt(nline)-1,0,parseInt(nline),0);
                var mar=  tabbar.getEditorAce(arrayId[i].getIdNormalizado()).session.addMarker(range, 'errorCompilation');
                
                
              /**  var tipoStyle="ace_gutter-cell ";
                var position=$($('#'+arrayId[i].getIdNormalizado()+' .ace_gutter-cell')[parseInt(nline)-1]).css('postion');
                if(type=='ERROR'){
                    //$($('#'+arrayId[i].getIdNormalizado()+' .ace_gutter-cell')[parseInt(nline)-1]).html('xx');
                }else{
                    //$($('#'+arrayId[i].getIdNormalizado()+' .ace_gutter-cell')[parseInt(nline)-1]).html('xx');
                }**/
                window.errorCA.push({e:tabbar.getEditorAce(arrayId[i].getIdNormalizado()) , range: range, mar: mar, id:arrayId[i].getIdNormalizado()});
               // $('#'+arrayId[i].getIdNormalizado()+' .ace_gutter-cell')[nline-1].title='mensaje';
            
            break;
           
          }
    
    }
 };
 
  function goLine(id,nline,type){ 
     var ss=id.split(';');
     for(var i in arrayId){
      
          var s=arrayId[i].getId().split(';');
         
          if(arrayId[i].getId()==id){
             
            
             tabbar.getEditorAce(arrayId[i].getIdNormalizado()).gotoLine(parseInt(nline));
             if(type=='none'){
               //  resaltarLinea(arrayId[i].getIdNormalizado(),nline,type,'hola mundo');
                   return;// $('.ace_active_line').addClass('errorCompilacion').css('background-color', '#ffb2b2');
                }
                var Range= require("ace/range").Range;
                var range=new Range(parseInt(nline)-1,0,parseInt(nline),0);
                var mar=  tabbar.getEditorAce(arrayId[i].getIdNormalizado()).session.addMarker(range, 'errorCompilation');
                
               /*** 
                var tipoStyle="ace_gutter-cell ";
                if(type=='ERROR'){
                    $($('#'+arrayId[i].getIdNormalizado()+' .ace_gutter-cell')[parseInt(nline)-1]).html('xx');
                }else{
                    $($('#'+arrayId[i].getIdNormalizado()+' .ace_gutter-cell')[parseInt(nline)-1]).html('xx');
                }**/
                window.errorCA.push({e:tabbar.getEditorAce(arrayId[i].getIdNormalizado()) , range: range, mar: mar,id:arrayId[i].getIdNormalizado()});
                //$($('#'+arrayId[i].getIdNormalizado()+' .ace_gutter-cell')[parseInt(nline)-1]).attr('id','m');
                //$('#'+arrayId[i].getIdNormalizado()+' .ace_gutter-cell')[nline-1].title='mensaje';
            
            break;
           
          }
    
    }
 }

}//fin de la clase