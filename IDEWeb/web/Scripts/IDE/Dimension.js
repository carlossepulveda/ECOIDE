/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function Dimension(w,h){
    
    var width=w;
    var height=h;
    
    this.getWidth=function(){return width;};
    this.getHeight=function(){return height;};
    
    this.setWidth=function(w){width=w;};
    this.setHeight=function(h){height=h;};
    
    this.getInfo=function(){
        
        return 'width='+w+';height='+h;
        
    };
    
}