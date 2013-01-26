/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function ObjBarraDesplegable(id){
    var idN=id;
    var estadoBarra=1;//1= on(default) 0= off
    var barraLateral='#barraLateral'+id;
    var content='#content'+id;
    var toggler='#toggler'+id;
    
    
    this.getEstadoBarra=function(){
        return estadoBarra;
    }
    this.setEstadoBarra=function(a){
        estadoBarra=a;
    }
    
    this.getBarraLateral=function(){
        return barraLateral;
    }
    this.setBarraLateral=function(id){
        barraLateral='#barraLateral'+id;
    }
    
    this.getContent=function(){
        return content;
    }
    this.setContent=function(id){
        content='#content'+id;
    }
    
    this.getToggler=function(){
        return toggler;
    }
    this.setToggler=function(id){
        toggler='#toggler'+id;
    }
    
    this.getId=function(){
        return idN;
    }
    this.setId=function(id){
        idN=id;
    }
    this.equals=function(id){
        return id==id?true:false;
    }
    
    
    
}

