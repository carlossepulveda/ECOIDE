/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Coordenada(x,y){  
  
            var x=new Number(x) ;  
            var y=new Number(y);  
  


this.getX= function(){  
            //acciones del método  
            return parseInt(x);  
};

this.getY = function(){  
            //acciones del método  
            return parseInt(y);  
};

this.getInfo=function(){
      
        return 'x='+x+';y='+y;
        
    };
    
}

