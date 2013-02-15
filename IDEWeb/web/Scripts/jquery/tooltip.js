var template='<div  class="viewPortTooltip" style="border-radius:10px;padding:10px;background-color:rgba(10,10,10,0.5);color:white;position:absolute;z-index:9999"/>';
var scriptTemplate = document.createElement('script');
scriptTemplate.setAttribute("id","templateTooltip");
scriptTemplate.setAttribute("type", "text/template");
document.documentElement.appendChild(scriptTemplate);
document.getElementById('templateTooltip').innerHTML=template;
var activeToolTipTemplate=false;
$(document).ready(function(){


        $('.menuLiP').hover(function(){
                if(!activeToolTipTemplate){
                    var html=$('#templateTooltip').html();
                    $('body').append(html);
                    activeToolTipTemplate=true;
                }
                var text = $(this).attr('msj');
                var left=$(this).offset().left;//-(2.2*(text.length/2));
                var top=$(this).offset().top+25;
                $('.viewPortTooltip').html( text ).css({top:top,left:left}).fadeIn(100);
                var w = $(this).width();
                var nw = $('.viewPortTooltip').width();
                var lf = ( nw - w )/2;
                $('.viewPortTooltip').css({top:top,left: left-lf})

        },function(){
             $('.viewPortTooltip').fadeOut(100);
        });


});


