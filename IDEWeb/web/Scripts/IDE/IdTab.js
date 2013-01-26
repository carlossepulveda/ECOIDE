/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//i=id sin normalizar
//iN=id normalizada
function IdTab(i,iN){
    var id=i;
    var idNormalizado=iN;
    
    this.setId=function(i){
        id=i;
    };
    this.getId=function(){
        return id;
    };
    this.setIdNormalizado=function(iN){
        idNormalizado=iN;
    };
    this.getIdNormalizado=function(){
        return idNormalizado;
    };
    this.equals=function(iN){
        if(idNormalizado==iN)
            return true;
        else
            return false;
    };
}
