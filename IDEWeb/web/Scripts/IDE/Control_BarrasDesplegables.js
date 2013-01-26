/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function Control_BarrasDesplegables(){
    
    var myBarras=new Array();//almacenar las distintas barra según existan tab de GUIs
    
    /**
     *Adiciona un elemento una barraDesplegable al array a partir de un idNormalizada
     *@param idNormalizada {String} id que pasa por una normalizacion
     *@return {boolean} retorna true si adiciono, en caso contrario false;
     */
    this.addBarra=function(idNormalizada){
        //verifico que no exista esa id en el array
        if(this.estaBarra(idNormalizada)==-1){
            myBarras.push(new ObjBarraDesplegable(idNormalizada));
            return true;
        }
        return false;      
    };
    
    /**
     *Elimina un elemento al ObjBarraDesplegable al array a partir de un idNormalizada esta funcion es invocada desde el closeTab de la libreria de tabbar
     *@param idNormal {String} idNormalizada
     *@return {boolean} retorna true si elimino, en caso contrario false
     */
    this.popId=function(idNormal){
        
        var pos=this.estaBarra(idNormal);
        
        if(pos!=-1){
            delete myBarras[pos];
            return true;
        }
        return false;
    };
    
    /**
     *Verifica si una idNormalizada esta en el array
     *@param idNormalizada {String} id que pasa por una normalizacion
     *@return -1{integer} no encontro el elemento
     *@return pos{integer} posicion en el array del elemento encontrado
     */
    this.estaBarra=function(idNormalizada){
        //si el array esta vacion no esta el id
        if(myBarras.length==0)
            return -1;
        else{
            //buscar si el id esta en el array
            for(var i in myBarras){
                //pregunto si es igual
                if(myBarras[i].equals(idNormalizada))
                    return i;
            }
            return -1;
        }//fin del else
    };//fin function
    
    
    /**
     *Permite visualizar o ocultar la paleta de componentes de una pestaña de GUIs
     *@param id {String} id que pasa por una normalizacion
     */
    this.clickToggler=function(id){
        var pos=this.estaBarra(id);
        var barra=myBarras[pos];
        var lateral=barra.getBarraLateral();
        var toggler=barra.getToggler();
        var content=barra.getContent();
        if(barra.getEstadoBarra()==1){
            $(lateral).hide();
           // $(content).css("backgrounColor","green");
            $(toggler).addClass("off");
            myBarras[pos].setEstadoBarra(0);
        }else{
            $(lateral).show();
            //$(content).css("backgrounColor","blue");
            $(toggler).removeClass("off");
            myBarras[pos].setEstadoBarra(1);
        }
        
    };
    
}

