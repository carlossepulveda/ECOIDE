
    function flipbook(container, front, back) {
        var left = $(front).width()/2 + 'px';
        var width = $(front).width() + 'px';
        var height = $(front).height() + 'px';
        
        $(back).css({width:'0', height:height, left:left, opacity:'0.5'});
         
        $(container).hover(
            function(){
                $(front).stop().animate({width:'0', height:height, left:left, opacity:'0.5'},{duration:150});
                window.setTimeout(function() {
                    $(back).stop().animate({width:width, height:height, left:'0', opacity:'1'},{duration:150});
                },0);
            },
            function(){
                $(back).stop().animate({width:'0', height:height, left:left, opacity:'0.5'},{duration:150});
                window.setTimeout(function() {
                    $(front).stop().animate({width:width, height:height, left:'0', opacity:'1'},{duration:150});
                },150);
            }
        );
    };
