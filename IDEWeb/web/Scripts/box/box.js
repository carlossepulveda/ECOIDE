var izq;

function box(title,url){
    //div que servirá de fondo que se bloqueará
    jQuery("<div/>",{
        id: "fondoBox",
        css: {
            display: "block"
        }
    }).appendTo("body");
	
    //div que contendrá el box    
    jQuery("<div/>",{
        id: "contentBox",
        className: "bordesRedondeados"
    }).appendTo("body");
    

    jQuery("<div/>",{
        id: "barraBox",
        mousedown:function(){
            $('#contentBox').draggable();
        },
        mouseup: function(){
            $('#contentBox').draggable( "destroy" );
        }     
    }).appendTo("#contentBox");
    
    jQuery("<div/>",{
        id: "iconBox"
    }).appendTo("#barraBox");
    
    jQuery("<div/>",{
        id: "titleBox",
        html: title
    }).appendTo("#barraBox");
    
    jQuery("<div/>",{
        id: "closeBox",
        click: function(){
            cerrarBox();
        }        
    }).appendTo("#barraBox");

    jQuery("<div/>",{
        id: "contentBoxInter"
    }).appendTo("#contentBox");
    
   
    $('#contentBoxInter').load(url,null,function(){
        dimensionBox($(this).width(),$(this).height());
    });
    
   $('#fondoBox').click(function(){  
        shake('#contentBox',izq);
    });          
    return true;	
    
}
function box_(title,html){
    //div que servirá de fondo que se bloqueará
    jQuery("<div/>",{
        id: "fondoBox",
        css: {
            display: "block"
        }
    }).appendTo("body");
	
    //div que contendrá el box    
    jQuery("<div/>",{
        id: "contentBox",
        className: "bordesRedondeados"
    }).appendTo("body");
    

    jQuery("<div/>",{
        id: "barraBox",
        mousedown:function(){
            $('#contentBox').draggable();
        },
        mouseup: function(){
            $('#contentBox').draggable( "destroy" );
        }     
    }).appendTo("#contentBox");
    
    jQuery("<div/>",{
        id: "iconBox"
    }).appendTo("#barraBox");
    
    jQuery("<div/>",{
        id: "titleBox",
        html: title
    }).appendTo("#barraBox");
    
    jQuery("<div/>",{
        id: "closeBox",
        click: function(){
            cerrarBox();
        }        
    }).appendTo("#barraBox");

    jQuery("<div/>",{
        id: "contentBoxInter"
    }).appendTo("#contentBox");
    
   
    $('#contentBoxInter').html(html);
     dimensionBox(200,200);
  
    
   $('#fondoBox').click(function(){  
        shake('#contentBox',izq);
    });          
    return true;	
    
}
function dimensionBox(w,h){
    
    var altoDef=((document.body.scrollHeight)/2)-((h+33)/2);
    var anchoDef=((document.body.scrollWidth)/2)-((w+14)/2);
    porAncho=(anchoDef*100)/document.body.scrollWidth;
    izq=porAncho+"%";
    porAlto=(altoDef*100)/document.body.scrollHeight;
    $('#contentBox').css("top",porAlto+"%");
    $('#contentBox').css("left",porAncho+"%");
    
}
function cerrarBox(){
    try{
        restaurarVista();
    }catch(error){}
    $('#fondoBox').remove();
    $('#contentBox').remove();
}

//script para simular el efecto de shake
function shake(id,izqu) {
    var left=izqu;//$(id).css("left");
    var right;
    if(left.indexOf('%')<0){
        left=Number(left.replace("px",""));
        var anchoPage=document.body.scrollWidth;
        left=(left*100)/anchoPage;  
        right=left+"%";
        left=(left+10)+"%";
    }else{
        right=left;
        left=(Number(left.replace("%",""))+10)+"%";
    }
    var status = true;
    for(var k=0;k<=3;k++){
        var m=status ? left : right;
        $(id).animate({
            left: status ? left : right
        }, 70);
        status ? status = false : status = true;
    }
    return true;
}