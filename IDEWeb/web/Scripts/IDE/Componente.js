/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function Componente(nombre_,valor_,tipo_,coordenada_,dimension_,idNodo_,lines,action_){  

  
            var nombre=nombre_ ;  
            var valor=valor_;
            var tipo=tipo_;
            var coordenada=coordenada_;//new Coordenada(new Number(x),new Number(y));
            var dimension=dimension_;
            var idNodo=idNodo_;
           var nLineasA=[{}];
           var action=action_;
           var li=-1;//linea inicial
           if(lines!=null){
             nLineasA = lines;//array que contiene el numero de las lineas que afecta este elemento en el editor del .java
             li=nLineasA[0].nl
           }
           var lineInit;// linea que contiene el texto referente a la declaracion del componente como  atributo como atributo del lienzo. 
           var minSize=25;//ancho y alto minimo que deben tener un componente

            
  
this.getIdNodo=function(){
    return idNodo;
};
this.setIdNodo=function(id){
    idNodo=id;
};
this.getNombre = function(){  
            //acciones del método  
            return nombre;  
};

this.setNombre=function(name){
    nombre=name;
};

this.getValor = function(){  
            //acciones del método  
            return valor;  
};

this.setValue=function(value){
    valor=value;
};

this.getTipo = function(){  
            //acciones del método  
            return tipo;  
};

this.getCoordenada = function(){  
            //acciones del método  
            return coordenada;  
};

this.setCoordenada = function(c){  
            //acciones del método  
            coordenada=c;  
};


this.getDimension=function(){
    
    return dimension;
    
}

this.setDimension=function(d){
    
    dimension=d;
    
}

this.isValidSize= function(w,h){
    
    return w>=25 && h>=25;
};

this.getInfo=function(){
    
    return 'name='+nombre+'æðđßfieldßđðævalue='+valor+'æðđßfieldßđðætype='+tipo+'æðđßfieldßđðæcoordinate:'+coordenada.getInfo()+'æðđßfieldßđðædimension:'+dimension.getInfo();
    
    
};

this.getIdNormalizada=function(){
    idNodo=idNodo.replace(" ", "_"); //eliminando los espacios en blanco del idNodo
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
        return aux+"_"+nombre;
}

this.toString=function(){
    return ""+nombre+" , "+valor+" , "+tipo+" , "+this.getIdNormalizada()+" , c: "+coordenada.getInfo()+" , d: "+dimension.getInfo()+"\n";        
}

this.getCodeJava=function(){
    var code='';
    for(var i in nLineasA){
        code+='\t'+nLineasA[i].line+'\n';
    }
    return code;
    
};

function getTipoJava(){
  
    switch(tipo){
        
        case 'button':{
                return 'javax.swing.JButton';
        }
        case 'textField':{
                return 'javax.swing.JTextField';
        }
        case 'textArea':{
                return 'javax.swing.JTextArea';
        }
        case 'label':{
                return 'javax.swing.JLabel';
        }
        
    }
   
}

this.getTipoJava=function(){
  
    switch(tipo){
        
        case 'button':{
                return 'javax.swing.JButton';
        }
        case 'textField':{
                return 'javax.swing.JTextField';
        }
        case 'textArea':{
                return 'javax.swing.JTextArea';
        }
        case 'label':{
                return 'javax.swing.JLabel';
        }
        
    }
 
};

this.getLineasAfectadas=function(){
      return nLineasA;
    
};
this.setLineaAfectada=function(nl){
    nLineasA.push(nl);
};

//lr es la linea de refrencia donde se insertara . lr es igual a la distancia en lineas desde el inicio de la declaracion del init hasta la linea q corresponde
this.generateLines=function(lr){
    li=lr;
    var line=this.getNombre()+"= new "+this.getTipoJava()+"();";
    nLineasA[0]={"nl":lr,"line": ""+line+""};
    line='getContentPane().add('+this.getNombre()+", new org.netbeans.lib.awtextra.AbsoluteConstraints("+coordenada.getX()+","+coordenada.getY()+", "+dimension.getWidth()+", "+dimension.getHeight()+"));";
    nLineasA[1]={"nl":lr+1,"line": ""+line+""};//
    line=this.getNombre()+".setText(\""+valor+"\");";
    nLineasA[2]={"nl":lr+2,"line": ""+line+""};
   
    
};

this.setlines=function(lines){
  nLineasA=lines;
};
this.updateLines=function(){
    
    var lr=li;
    var line=this.getNombre()+"= new "+this.getTipoJava()+"();";
    nLineasA[0]={"nl":lr,"line": ""+line+""};
    line='getContentPane().add('+this.getNombre()+", new org.netbeans.lib.awtextra.AbsoluteConstraints("+coordenada.getX()+","+coordenada.getY()+", "+dimension.getWidth()+", "+dimension.getHeight()+"));";
    nLineasA[1]={"nl":lr+1,"line": ""+line+""};//
    line=this.getNombre()+".setText(\""+valor+"\");";
    nLineasA[2]={"nl":lr+2,"line": ""+line+""};
  if(nLineasA.length>3){
      line=this.getNombre()+".addActionListener(new java.awt.event.ActionListener() {";
      nLineasA[3]={"nl":lr+3,"line": ""+line+""};
      line="\tpublic void actionPerformed(java.awt.event.ActionEvent evt) {";
      nLineasA[4]={"nl":lr+4,"line": ""+line+""};
      line="\t\t"+this.getNombre()+"ActionPerformed(evt);";
      nLineasA[5]={"nl":lr+5,"line": ""+line+""};
      line="}";
      nLineasA[6]={"nl":lr+6,"line": ""+line+""};
      line="});";
      nLineasA[7]={"nl":lr+7,"line": ""+line+""};
  }  
    lineInit='private '+this.getTipoJava()+' '+this.getNombre()+';';
  
};
this.setLineInit=function(text){
    lineInit=text;
};

this.getLineInit=function(){
    return lineInit;
};
this.createAction=function(){
      var lr=li;
      var line=this.getNombre()+".addActionListener(new java.awt.event.ActionListener() {";
      nLineasA[3]={"nl":lr+3,"line": ""+line+""};
      line="\tpublic void actionPerformed(java.awt.event.ActionEvent evt) {";
      nLineasA[4]={"nl":lr+4,"line": ""+line+""};
      line="\t\t"+this.getNombre()+"ActionPerformed(evt);";
      nLineasA[5]={"nl":lr+5,"line": ""+line+""};
      line="}";
      nLineasA[6]={"nl":lr+6,"line": ""+line+""};
      line="});";
      nLineasA[7]={"nl":lr+7,"line": ""+line+""};
      action=true;
      return 5;
  
};

this.updateLi=function(dif){
  li+=dif;  
  this.updateLines();
};

this.haveAction=function(){
  return action;  
};
this.getNameActionEvent=function(){
   return this.getNombre()+"ActionPerformed"; 
};

}