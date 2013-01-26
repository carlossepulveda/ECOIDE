

<%@page import="org.w3c.dom.Document"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%

Facade_WEBApplication fwa=(Facade_WEBApplication)request.getSession().getAttribute("fwa");

if(fwa==null){
    
%>
    <jsp:forward page="../IDE/index.html"></jsp:forward>
<%

}


if(!fwa.isValidSession()){
    
      
    %>
    
    <jsp:forward page="../IDE/index.html"></jsp:forward>
    
    <%
}



%>

<!DOCTYPE html>
<!-- saved from url=(0117)http://www.elated.com/res/File/articles/development/javascript/jquery/jquery-mobile-what-can-it-do-for-you/lists.html -->
<html>
    <head><meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"><meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1"><!--<base href="/res/File/articles/development/javascript/jquery/jquery-mobile-what-can-it-do-for-you/lists.html" id="ui-base">--><base href="."> 
  
  <link rel="stylesheet" href="http://code.jquery.com/mobile/1.0a1/jquery.mobile-1.0a1.min.css">
 
</head> 
<body> 


  <div data-role="content" class="ui-content" role="main" style="width:500px;">

   
    
    <h2 style="padding: 1em 0;" >Seleccione el proyecto que ver su respectivo chat</h2>

    <ul data-role="listview" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-controlgroup ui-controlgroup-vertical ui-shadow" role="listbox" id="proyectosAejecutar">


 <script>
    var cont=0;
        for(var i in projectsMemory){
         var id=projectsMemory[i].nombre+";"+projectsMemory[i].propietario;
         var ida=id;
         id=normalizar(id);
   
      
      
           $("#proyectosAejecutar").append("<li onclick='createChatBox(\""+projectsMemory[i].nombre+"-"+projectsMemory[i].propietario+"\",1,\""+id+"\",\""+ida+"\");cerrarBox();' role='option' tabindex='0' class='ui-li ui-btn ui-btn-icon-right ui-corner-top ui-btn-up-c' data-theme='c'><div class='ui-btn-inner ui-corner-top'><div class='ui-btn-text'><a>"+projectsMemory[i].nombre+"-"+projectsMemory[i].propietario+"</a></div></div></li>");
                 cont++;
         }
                       
       
  function normalizar(id){
      
        id=id.replace(" ", "_"); //eliminando los espacios en blanco del id
        var sp=id.split(':');
        var aux='';
        for(var i in sp){        
            var s='C';
            if(i==0)s='';        
            aux+=s+sp[i];        
        }
        
        id=aux;
        aux='';
        sp=id.split(';');
        for(var i in sp){        
            var s='C';
            if(i==0)s='';        
            aux+=s+sp[i];        
        }
    
        id=aux;
        aux='';
        sp=id.split('.');
        for(var i in sp){        
            var s='C';
            if(i==0)s='';        
            aux+=s+sp[i];       
        }
    
        id=aux;
        aux='';
        sp=id.split('@');
        for(var i in sp){        
            var s='C';
            if(i==0)s='';        
            aux+=s+sp[i];        
        }
        return aux;
  }    
      
      
  </script>

    </ul>



 
    
  </div>

   </body>
</html>