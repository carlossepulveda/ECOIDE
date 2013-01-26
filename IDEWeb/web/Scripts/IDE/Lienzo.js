/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function Lienzo(id,width,height,dJava,dFrml){  
  
    var id=id; 
            
    var dimension=new Dimension(new Number(width),new Number(height));
    var componentes=new Array();
            
    var eBorde=0;//es la distancia en pixeles, a la que debe estar un componente del borde del lienzo
    var eBordeComponente=0;//es la distacia en pixeles, a la que debe estar un elemento de otro.
    var nextLine=parseInt(dFrml.snapshot.lai);
    var hasModified=0;
    var dJava=dJava;
    var dFrml=dFrml;
    
    this.getNombre = function(){  
        //acciones del método  
        return nombre;  
    };

    this.getHeight = function(){  
        //acciones del método  
        return dimension.getHeight();  
    };

    this.getWidth = function(){  
        //acciones del método  
        return dimension.getWidth();  
    };

    this.getID= function(){  
        //acciones del método  
        return id;  
    }


    this.createComponete=function(com,usr){
       
        var c=this.getComponente(com.getNombre());    
        if(c!=null)return false;
        if(  !isPosibleAddComponente( com.getCoordenada(),com.getDimension() , com )   )return false;
   
        hasModified=true;
        
        this.addComponete(com);
        var lai=parseInt(dFrml.snapshot.lai);
        com.generateLines(lai);
        var ti='private '+com.getTipoJava()+' '+com.getNombre()+';';
        com.setLineInit(ti);
        
        if(user==usr){
           guest=false;
           
           var la=com.getLineasAfectadas();
           for(var i in la){
               dJava.insertar( dJava.rango.start.row+parseInt(lai), 0 , '\t'+la[i].line+'\n', false ); 
               lai++;
           }
           dJava.insertar( dJava.rango.start.row+parseInt(lai), 0 , '\n', false ); 
           lai++;
          
          var cli=parseInt(dFrml.snapshot.cl)+la.length;
          // console.log('va a insertar declaracion:  '+dJava.rango.end.row);
           dJava.insertar( dJava.rango.start.row+cli, 0 ,'\t'+ti+'\n', false );
           
           cli+=2;
           
           dFrml.submitOp([{p:['lai'], od: dFrml.snapshot.lai,oi: lai },
               {p:['cl'], od: dFrml.snapshot.cl,oi: cli},
               {p:['components',1], li:  {name:com.getNombre(),x:com.getCoordenada().getX(),y:com.getCoordenada().getY(),width:com.getDimension().getWidth(),height:com.getDimension().getHeight(),value:com.getValor(),type:com.getTipo(),lines:com.getLineasAfectadas(),action: false}   }]);
        
           //console.log('va insertar en lai: '+lai+'  el end.row es: '+dJava.rango.end.row+' cantidad de lineas:  '+cli);
           guest=true;
          
               
      }
     console.log(componentes);
        return true;
    };

    this.addComponete=function(c){
      
        componentes.push(c);
    };

    this.moveComponente=function( idC , x , y ,usr){
  
        var c=this.getComponente(idC);
    
        if(c==null)return null;
    
    
        if(  !isPosibleAddComponente(   new Coordenada(new Number(x),new Number(y)),c.getDimension() , c )   )return c.getCoordenada();
   
        hasModified=true;
        c.setCoordenada(new Coordenada(new Number(x),new Number(y)));
        if(user==usr)
           updateCodeComponent(c);
   
    };

    function updateCodeComponent(c){
      
        c.updateLines();
        
        var ind=jQuery.inArray(c, componentes);
       
        var nld=parseInt(dJava.rango.start.row)+parseInt(dFrml.snapshot.cl)-parseInt(componentes.length)+parseInt(ind)-parseInt(1);
        
       
        var liai='\t'+c.getLineInit();
        var cca=dJava.getSession().getLine(nld).length;
       
        dJava.insertar( nld , 0 , liai, false );
        dJava.remover(  nld ,liai.length,  true  );
        
        
       
        var lines=c.getLineasAfectadas();
     
        for(var i in lines){
            var li='\t'+lines[i].line;
            dJava.insertar(dJava.rango.start.row+lines[i].nl,0,li,false);
            dJava.remover(dJava.rango.start.row+lines[i].nl,li.length,false);
            
        }
        
       //"name":"button0",
       //"x":15,"y":16,
       //"width":100,"height":21,
       //"value":"button0",
       //"type":"button",
       //"lines":[
       //       {"nl":7,"line":"button0= new javax.swing.JButton();"},
       //       {"nl":8,"line":"getContentPane().add(button0, new org.netbeans.lib.awtextra.AbsoluteConstraints(36,196, 100, 21));"},
       //       {"nl":9,"line":"button0.setText(\"button0\");"}
       //       ]
   
        dFrml.submitOp([{p:['components',ind,'lines'], od: dFrml.snapshot.components[ind].lines,oi: c.getLineasAfectadas()},
                        {p:['components',ind,'x'], od: dFrml.snapshot.components[ind].x,oi: c.getCoordenada().getX()},
                        {p:['components',ind,'y'], od: dFrml.snapshot.components[ind].x,oi: c.getCoordenada().getY()},
                        {p:['components',ind,'width'], od: dFrml.snapshot.components[ind].width,oi: c.getDimension().getWidth()},
                        {p:['components',ind,'height'], od: dFrml.snapshot.components[ind].height,oi: c.getDimension().getHeight()},
                        {p:['components',ind,'value'], od: dFrml.snapshot.components[ind].height,oi: c.getValor()}]);
       
    }

    this.resizeComponente=function(idC,width,height,usuario){
    
        var c=this.getComponente(idC);

        if(c==null)return null;
 
    
        if(  !isPosibleAddComponente( c.getCoordenada(),new Dimension(width,height) , c )   )return c.getDimension();
   
        hasModified=true;
        c.setDimension(new Dimension(new Number(width),new Number(height)));
        if(usuario==user)
            updateCodeComponent(c);
    };

    this.getComponentes=function(){
    
        return componentes;
    
    };

    this.resize=function(width,height,usuario){
        
        if(!isPosibleMyResize(width-20,height-20))return dimension;
        
        dimension=new Dimension(new Number(width),new Number(height));
        if(usuario==user) {
            dFrml.submitOp([{p:['width'], od: dFrml.snapshot.width ,oi: width},{p:['height'], od: dFrml.snapshot.height,oi: height}]);
            var liai='   this.setSize(new java.awt.Dimension('+width+','+height+'));';
            var liai2='   this.setPreferredSize(new java.awt.Dimension('+width+','+height+'));';
            dJava.insertar( dJava.rango.start.row+2 , 0 , liai, false );
            dJava.remover(  dJava.rango.start.row+2 ,liai.length,  true  );
            dJava.insertar( dJava.rango.start.row+3 , 0 , liai2, false );
            dJava.remover(  dJava.rango.start.row+3 ,liai2.length,  true  );
        }
        return null;
   
    
    };

    //evalua si es posible ubicar un componente de dimension d en la coordenada c
    //c=coordenada x,y new coordenada(x,y)
    //d=dimension new dimension(100,21)de acuerdo a la clase
    //com=compoenente
    function isPosibleAddComponente(c,d,com){
        var w=d.getWidth();
        var h=d.getHeight();
 
        var coorEv=calcularCoordenadas(c, h, w);  

        for(var cc in coorEv){  
            if(coorEv[cc].getX()<-1 || coorEv[cc].getX()>=dimension.getWidth()  || coorEv[cc].getY()<-1 || coorEv[cc].getY()>=dimension.getHeight())
                return false;    
        }
 
        for(var i in componentes){
     
            if(com!=null){           
                if(componentes[i].getNombre()==com.getNombre())
                    continue;
            }
            var coor=calcularCoordenadas(componentes[i].getCoordenada(), componentes[i].getDimension().getHeight(),componentes[i].getDimension().getWidth());
    
            if(interfiere(coorEv,coor))return false;
            var comA=new Componente();
            comA.setCoordenada(c);
            comA.setDimension(d);
            if(superpone(comA,componentes[i]))return false;        
        }   
        return true;  
    }

    //evalua si es posible asignar al lienzo la anchura w y la altura h
    function isPosibleMyResize(w,h){
   
        if(componentesIsEmpty())return true;
        var cmX=getComponenteMayorX();
        var cmY=getComponenteMayorY();
    
        var minw=new Number(cmX.getCoordenada().getX())+new Number(cmX.getDimension().getWidth());
        var minh=new Number(cmY.getCoordenada().getY())+new Number(cmY.getDimension().getHeight());
 

    
        if(w<=minw || h<=minh)return false;
        return true;
    }

    //calcula las coordenadas de las cuatro esquina que ocupa el componente, y retorna un array de Coordenada en donde la primera posicion hace referencia a la esquina superior izquierda
    function calcularCoordenadas(c,h,w){
    
 
        var coors=new Array(4);
        coors.push(c);
   
        var px=new Number(c.getX())+new Number(w);//+eBordeComponente;
        var py=new Number(c.getY())+new Number(h);//+eBordeComponente;
   
        coors.push(new Coordenada(px,c.getY()));
  
        coors.push(new Coordenada(px,py));
    
        coors.push(new Coordenada(c.getX(),py));
  
        return coors;
    
    };

    //busca el componente que tenga la ubicacion de mayor magnitud en el eje Y y lo retorna
    function getComponenteMayorY(){
       
        if(componentesIsEmpty())return '10px';
        var aux=0;
        var auxC=null;
        for(var i in componentes){
      
            if(componentes[i].getCoordenada().getY()>aux){
                auxC=componentes[i];
                aux=componentes[i].getCoordenada().getY();
            }
        
        }
    
        return auxC;
  
    }

    //busca el componente que tenga la ubicacion de mayor magnitud en el eje X y lo retorna
    function getComponenteMayorX(){
        
        if(componentesIsEmpty())return '10px';
        var aux=0;
        var auxC=null;
        for(var i in componentes){
      
            if(componentes[i].getCoordenada().getX()>aux){
                auxC=componentes[i];
                aux=componentes[i].getCoordenada().getX();
            }
        
        }
    
        return auxC;
    
    
    
    }

    this.isModified=function isModified(){

        return hasModified;
  
    };

    this.getComponente=function(idC){
    
        for(var i in componentes){
       
            if(componentes[i].getNombre()==idC){
            
                return componentes[i];
            
            }
        
        }
    
        return null;
    
    
    
    };

    this.getInfo=function(){
    
        var info='';
        var s=id.split(';');
        var sp=s[3].split(':');
        info+='nameProject='+s[1]+'@:@ownerProject='+s[2]+'@:@package='+sp[0]+'@:@name='+sp[1]+'@:@width='+dimension.getWidth()+';height='+dimension.getHeight();
        for(var i in componentes){
        
            info+='æðđßcomponentßđðæ'+componentes[i].getInfo();
        
        }
   
        return info;
    
    };

    function interfiere(c1,c2){
 
   
        for(var i in c1){
        
            if(c1[i].getX()>=c2[4].getX() && 
                c1[i].getX()<=c2[5].getX()  &&  
                c1[i].getY()>=c2[4].getY() && 
                c1[i].getY()<=c2[7].getY())
                return true;
        
        }

   
        for(var j in c2){
        
            if(c2[j].getX()>=c1[4].getX() && c2[j].getX()<=c1[5].getX()  &&  c2[j].getY()>=c1[4].getY() && c2[j].getY()<=c1[7].getY())
                return true;
        
        }
        return false;
    };

    function superpone(c1,c2){
 
        var c1Xi=new Number(c1.getCoordenada().getX());     
        var c1Xf=new Number(c1.getCoordenada().getX())+new Number(c1.getDimension().getWidth());
        var c1Yi=new Number(c1.getCoordenada().getY());     
        var c1Yf=new Number(c1.getCoordenada().getY())+new Number(c1.getDimension().getHeight());
       
        var c2Xi=new Number(c2.getCoordenada().getX());     
        var c2Xf=new Number(c2.getCoordenada().getX())+new Number(c2.getDimension().getWidth());
        var c2Yi=new Number(c2.getCoordenada().getY());     
        var c2Yf=new Number(c2.getCoordenada().getY())+new Number(c2.getDimension().getHeight());
       
        //primera linea horizontal del componente 1 con la primera linea vertical delcomponente 2
        if(c1Yi>=c2Yi && c1Yi<=c2Yf     &&    c2Xi>=c1Xi && c2Xi<=c1Xf)return true;
        
        //primera linea horizontal del componente 1 con la segunda liena vertical del componente 2
        if(c1Yi>=c2Yi && c1Yi<=c2Yf     &&    c2Xf>=c1Xi && c2Xf<=c1Xf)return true;
   
        //segunda linea horizontal del componente 1 con la primera linea vertical del componente2
        if(c1Yf>=c2Yi && c1Yf<=c2Yf     &&    c2Xi>=c1Xi && c2Xi<=c1Xf)return true;
        
        //segunda liena horizontal del componente 1 con la segunda liena vertical del componente2
        if(c1Yf>=c2Yi && c1Yf<=c2Yf     &&    c2Xf>=c1Xi && c2Xf<=c1Xf)return true;
        
                
        
        
        //primera liena vertical del componente 1 con la primera linea horizontal del componente2
        if(c1Xi>=c2Xi && c1Xi<=c2Xf     &&    c2Yi>=c1Yi && c2Yi<=c1Yf)return true;
        
        //primera linea vertical del componente 1 con la segunda linea horizontal del componente2
        if(c1Xi>=c2Xi && c1Xi<=c2Xf     &&    c2Yf>=c1Yi && c2Yf<=c1Yf)return true;
        
        //segunda liena vertical del componente 1 con la primera liena horizontal del componente2
        if(c1Xf>=c2Xi && c1Xf<=c2Xf     &&    c2Yi>=c1Yi && c2Yi<=c1Yf)return true;
        
        //segunda linea vertical del componente 1 con la segunda liena horizontal del componente2
        if(c1Xf>=c2Xi && c1Xf<=c2Xf     &&    c2Yf>=c1Yi && c2Yf<=c1Yf)return true;
        
        return false;
    }

    function componentesIsEmpty(){
      
        return componentes==null || componentes==undefined || componentes.length==0  || componentes.length==undefined;
    }
    
    this.generarNombre=function(type){
        return buscarNombre(type);        
    };
    
    //falta buscar en todos los componentes
    function buscarNombre(type){
        var cont=0;
        while(estaNombre(type+cont)>=0){
            cont++;
        }
        return type+cont;        
    }
    
    
    /**
     *Indica si un nombre de componente ya existe, si esta devuelve la posicion del array de componentes
     *@param name{String} nombre a buscar
     *@return i=posicion en el array, -1 si no lo encontro
     **/
    function estaNombre(name){
        for(var i in componentes){
            if(componentes[i].getNombre()==name){
                return i;
            }
        }
        return -1;
    }
    
    /**
     *Esta funcion permite cambiarle el nombre y el valor a un componente que este en el lienzo
     *@param name {String} es el nombre antiguo
     *@param newName {String} el nuevo nombre
     *@param newValue {String} el nuevo valor del componente
     *@return true= si se actualizo y false en caso contrario*/
    this.updateProperties=function(name, newName, newValue){
        if(estaNombre(newName)<0){        
            for(var i in componentes){
                if(componentes[i].getNombre()==name){
                    componentes[i].setNombre(newName);
                    componentes[i].setValue(newValue);
                    updateCodeComponent(componentes[i]);
                    return true;
                }
            }
            return false;//no encontro el elemento con el nombre name
        }
        return false;
    }
    
    /**
     *Esta funcion permite cambiarle el nombre a un componente que este en el lienzo
     *@param name {String} es el nombre antiguo
     *@param newName {String} el nuevo nombre
     *@return true= si se actualizo y false en caso contrario*/
    this.updateName=function(name, newName,usuario){
        if(estaNombre(newName)<0){        
            for(var i in componentes){
                if(componentes[i].getNombre()==name){
                    componentes[i].setNombre(newName);
                    if(usuario==user){
                        dFrml.submitOp([{p:['components',i,'name'], od: dFrml.snapshot.components[i].name,oi: newName}]);
                        updateCodeComponent(componentes[i]);
                    }
                    return true;
                }
            }
            return false;//no encontro el elemento con el nombre name
        }
        return false;
    }
    
    /**
     *Esta funcion permite cambiarle el nombre y el valor a un componente que este en el lienzo
     *@param name {String} es el nombre del componente
     *@param newValue {String} el nuevo valor del componente
     *@return true= si se actualizo y false en caso contrario
     */
    this.updateValue=function(name, newValue,usuario){       
        for(var i in componentes){
            if(componentes[i].getNombre()==name){
                componentes[i].setValue(newValue);
                if(usuario==user){
                    dFrml.submitOp([{p:['components',i,'value'], od: dFrml.snapshot.components[i].name,oi: newValue}]);
                    updateCodeComponent(componentes[i]);
                }
                return true;
            }
        }
        return false;//no encontro el elemento con el nombre name        
    }
    
    /*
     *Esta funcion permite obtener la id normalizada de un componente a traves de su nombre
     *@param nameComponente {String} nombre del componente a buscar
     *@return retorna la idNormalizada del componente y si no una cadena vacia**/
    this.getIdNormalizadaComponente=function(nameComponente){
        for(var i in componentes){
            if(componentes[i].getNombre()==nameComponente){
                return componentes[i].getIdNormalizada();
            }
        }
        return "";
    }
    
    
    this.toStringComponentes=function(){
        var comp="";
        for(var i in componentes){
            comp+=componentes[i].toString();
        }
        return comp;
    };
    
    
    this.getCodeJava=function(){


        var info="";
        for(var i in componentes){
        
            info+='\n'+componentes[i].getCodeJava();
        
        }
   
        return 'setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);\n\
                \ngetContentPane().setLayout(new AbsoluteLayout());\n\
                \nthis.setSize(new Dimension('+dimension.getWidth()+','+dimension.getHeight()+'));\n'+info;
      
  
    
    };
    
    this.deleteComponete=function(c,usuario){
       console.log(componentes.length);
       var coma;
        for(var i in componentes){
       console.log('componente en i:  '+componentes[i].getNombre()+'     '+c);
            if(c==componentes[i].getNombre()){
                console.log('......llego a ELIMINAR COMPONENTE......');
                coma=componentes[i];
                if(usuario==user){
                    deleteCodeComponent(i);  
                    dFrml.submitOp([{p:['components',i], ld: dFrml.snapshot.components[i]}]);
                }
                componentes.splice( i, 1 );
                //delete componentes[i];
                notificarModificacionCodigoComponente(i,-(coma.getLineasAfectadas().length+1));
                nextLine+=-(coma.getLineasAfectadas().length+1);
               
                if(i==componentes.length){
                    dJava.auxUlt=true;
                    if(user==usuario)
                        dJava.rango.end.row=dJava.rango.end.row+1;
                   // else
                     //   dJava.rango.end.row=dJava.rango.end.row-1;
                  
            }
                return true;
                
            }
        
        }
   
   return false;
   
    };
    
    function getIndexComponent(c){
        
         for(var i in componentes){
       
            if(c==componentes[i].getNombre()){
                return i;
                
            }
        
        }
   
     return -1;
        
    }
    
    function deleteCodeComponent(index){
        
         console.log('deleteCODECOMPNENT....'+index);
         var lines=componentes[index].getLineasAfectadas();
         var Range=require("ace/range").Range;

         var ld=parseInt(dFrml.snapshot.li)+parseInt(dFrml.snapshot.cl)-parseInt(componentes.length)-1+parseInt(index);
         //rango del codigo de declaracion del componente
         var rang=new Range(ld,0,ld+1,0);   
         console.log('rango donde se encuentra la linea de declaracion:   ');
         console.log(rang);
         dJava.getSession().remove(rang);


         rang=new Range(parseInt(dFrml.snapshot.li)+lines[0].nl,0,parseInt(dFrml.snapshot.li)+parseInt(lines[lines.length-1].nl)+2,0);   
         //rango del codigo de inicializacion y configuracion del componente
         dJava.getSession().remove(rang);

         dFrml.submitOp([{p:['cl'], od: dFrml.snapshot.cl,oi: dFrml.snapshot.cl-lines.length-2},{p:['lai'], od: dFrml.snapshot.lai,oi: dFrml.snapshot.lai-lines.length-1}]);
         dJava.rango.end.row=dJava.rango.end.row-(lines.length+2);
         
        
    }
     
    
    function notificarModificacionCodigoComponente(index,linesL,usuario){
       console.log('llego a notificar modificaciones desde el index : '+index+'   con linesL: '+linesL);
         for(var i in componentes){
             if(i<index)continue;
             componentes[i].updateLi(linesL);
             console.log('for de modificacion de lineas : '+componentes[i].getNombre());
             console.log(componentes[i].getLineasAfectadas());
         }
        
        
        // if(user==usuario)
           // dFrml.submitOp([{p:['cl'], od: dFrml.snapshot.cl,oi: dFrml.snapshot.cl+linesL } , {p:['lai'], od: dFrml.snapshot.lai,oi: nextLine}]);//,{p:['cf'], od: dFrml.snapshot.cf,oi: ti.length } ]);
         return true;
        //modifica del json la cantidad de lineas
        //modifica del json las lineas de referencia de los componentes afectados
    }
    //Es el encargado de llevar a cabo las respectivas notificaciones OT en los documento afectados
    this.notificarDocumentos=function(){
        ///dJava es el editor de texto OT
        ///dFrml es un documento json OT
    };
    
    this.createAction=function(idC){
         var com=this.getComponente(idC);
         if(com.haveAction()){
             box_('Mensaje',"<link rel='STYLESHEET' type='text/css' href='../CSS/SupportWindow/fieldSetForm.css'/> <div id='formulario'><fieldset class='fieldsetForm'><div><label class='labelForm'>El componente \'"+com.getNombre()+"\' ya tiene creado un 'actionperformed'</label></div><div align='right'><input id='botnCancelar' type='button' class='botonForm' value='Cancelar' onclick='cerrarBox()' /></div></fieldset></div>");
             return;
         }
        /// dJava.insertar(parseInt(dJava.rango.start.row)+parseInt(com.getLineasAfectadas()[com.getLineasAfectadas().length-1].nl+1),0,'\n\n\n\n',false);
         var index=jQuery.inArray(com, componentes);
         console.log('se envio a crear Action al componente: '+com.getNombre());
         var clad=com.createAction();
         
         var lines=com.getLineasAfectadas();
        
        for(var i in lines){
            if(i<3)continue;
            
            var liF= parseInt(com.getLineasAfectadas()[i-1].nl)  +  parseInt(dJava.rango.start.row);
            var coF=dJava.getSession().getLine(liF).length;
         
             dJava.insertar(liF,coF,'\n\t'+lines[i].line,false); 
            
        }
       
         notificarModificacionCodigoComponente(index+1,clad);
        
         dJava.insertar(dJava.rango.end.row+1,0,'\n\tprivate void '+com.getNameActionEvent()+' ( java.awt.event.ActionEvent evt ){\n\n\t//Escribe tu codigo aqui\n\t}');
         dFrml.submitOp([ {p:['cl'], od: dFrml.snapshot.cl,oi: dFrml.snapshot.cl+clad },{p:['lai'], od: dFrml.snapshot.lai,oi: dFrml.snapshot.lai+clad },{p:['components',index,'action'], od: dFrml.snapshot.components[index].action, oi: true}]);
         //updateCodeComponent(this.getComponente(idC));
    };
    
  /**  this.deleteCodeComponent=function(idC){
         var com=this.getComponente(idC);
         
         var index=jQuery.inArray(com, componentes);
        
         var lines=com.getLineasAfectadas();
        
        for(var i in lines){
           
            var liF= parseInt(com.getLineasAfectadas()[i].nl)  +  parseInt(dJava.rango.start.row);
            dJava.remover(liF,false); 
            
        }
       
       nextLine++;
       notificarModificacionCodigoComponente(index+1,-(lines.length+1));
    
    };**/
    
    this.updatedJava=function(data){
       //  dJava.rango=data.r;
       //  nextLine=data.nl;
        // dJava.updateJava();
      //   dJava.jose();
    };
}