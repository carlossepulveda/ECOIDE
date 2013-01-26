/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function setToolTip(selector){
    var template='<div class="templateToolTip"><div class="ttc"></div></div>';
    $('body').append(template);
    $('body').mouseover(function(event){
        if(!$(event.target).parents().find('.ttp').length>=0){
            $('.templateToolTip').hide();
        }
    });
    $(selector).mouseover(
    function(event){
     var offset=$(this).offset();
         $('.templateToolTip').css({top:offset.top+'px',left: offset.left+'px'});
         $('.templateToolTip').show();
        
}

);
    //$(selector).mouseover(function(){$('.templateToolTip').hide()});
    
 
   
    
}


