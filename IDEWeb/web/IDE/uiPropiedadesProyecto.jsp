<%-- 
    Document   : uiProperties
    Created on : 8/02/2012, 06:49:05 AM
    Author     : cas
--%>

<%@page import="org.w3c.dom.NodeList"%>
<%@page import="java.util.ArrayList"%>
<%@page import="org.w3c.dom.Document"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page session="true"%>
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
  
    String user=fwa.getUser();
 


String name=request.getParameter("name");
String owner=request.getParameter("owner");
int typePet=Integer.valueOf(request.getParameter("type"));
System.out.println("Solicitar ui propiedades proyecto: "+name+" "+owner+" "+typePet);
String mc="";
switch(typePet){

       case 1:{
           mc=fwa.getMainClass(name, owner);
           break;
       }
       case 2:{
           mc=fwa.getMainClass_(name, owner);//debe hacer lapeticion diferente debido a que no tiene cargado el proyecto
           break;
       }

}

if(mc==null) mc="";
mc+=".java";


String type="";
String mName="";
if(!owner.equals(user)){
    mName="readonly=\"readonly\"";
    type="";
    switch(typePet){

       case 1:{
           type=fwa.getUserType(name,owner);
           break;
       }
       case 2:{
           type=fwa.getUserType_(name,owner);//debe hacer lapeticion diferente debido a que no tiene cargado el proyecto
           break;
       }

}
       }

String ec="";
if(type.equals("Read"))
    ec="disabled=\"disabled\"";
String menuUsuarios="";

    

Document c=null;
 switch(typePet){

       case 1:{
           c=fwa.getClassesProjectXML(name, owner);
           break;
       }
       case 2:{
           c=fwa.getClassesProjectXML_(name, owner);//debe hacer lapeticion diferente debido a que no tiene cargado el proyecto
           break;
       }

}
String combo="<select id='msc' "+ec+"><option selected=\"true\" id=\"for\">--</option>";
String os="";
    for(int i=0;i<c.getDocumentElement().getChildNodes().getLength();i++){
    
        String pa=c.getDocumentElement().getChildNodes().item(i).getAttributes().getNamedItem("package").getTextContent();
        if(!pa.isEmpty())pa+=".";
  
       if((pa+c.getDocumentElement().getChildNodes().item(i).getAttributes().getNamedItem("name").getTextContent()).equals(mc)){
           os="selected=\"true\"";
        }
        combo+="<option "+os+" id=\""+c.getDocumentElement().getChildNodes().item(i).getAttributes().getNamedItem("package").getTextContent()+"."+c.getDocumentElement().getChildNodes().item(i).getAttributes().getNamedItem("name").getTextContent()+"\""
                + "  packagec=\""+c.getDocumentElement().getChildNodes().item(i).getAttributes().getNamedItem("package").getTextContent()+"\" namec=\""+c.getDocumentElement().getChildNodes().item(i).getAttributes().getNamedItem("name").getTextContent()+"\"   "
                + " >"+c.getDocumentElement().getChildNodes().item(i).getAttributes().getNamedItem("package").getTextContent()+"."+c.getDocumentElement().getChildNodes().item(i).getAttributes().getNamedItem("name").getTextContent()+"</option>";
        os="";
    }

combo+="</select>";
String javSarray="";
String javSpriv="";
String djsa="";
String botonesOpcion="<input type=\"button\" class=\"botonForm\" value=\"Cerrar\" onclick=\"cancelar()\" />";
if(owner.equals(user)){
    botonesOpcion="<input type=\"button\" class=\"botonForm\" value=\"Guardar\" onclick=\"guardarCambios()\" />"
            + "<input type=\"button\" class=\"botonForm\" value=\"Cerrar\" onclick=\"cancelar()\" style=\"margin-left:3px;\" />";
    Document us=fwa.getUsersProject(name,owner);
     switch(typePet){

       case 1:{
           us=fwa.getUsersProject(name,owner);
           break;
       }
       case 2:{
           us=fwa.getUsersProject_(name,owner);//debe hacer lapeticion diferente debido a que no tiene cargado el proyecto
           break;
       }

}System.out.println("pidio users  "+us);
    NodeList nl=us.getDocumentElement().getChildNodes();
    if(nl.getLength()>0){
       menuUsuarios="<div style=\"overflow:auto;width: 100%;height: 80px;\" >"
                    + "<div style=\"float:left;overflow: auto;width: 100%;\">"
                    +"<table align=\"center\" style=\"width:100%;\"><thead style=\"background-color:#e1eeff\"><tr><td><h3>Usuario</h3></td><td><h3>Privilegio</h3></td></tr></thead><tr><td colspan='2'>"
                     + "<ul style=\"margin-top:10px;\">";

        for(int i=0;i<nl.getLength();i++){
            javSarray+=djsa+"'"+us.getDocumentElement().getElementsByTagName("email").item(i).getTextContent()+"'";
            String typeU=us.getDocumentElement().getElementsByTagName("type").item(i).getTextContent();
            String claseCSSE="class='botonNoSelect'";
            String claseCSSL="class='botonDegradado'";
            if(typeU.equals("Write")){
                typeU="W";
                claseCSSL="class='botonNoSelect'";
                claseCSSE="class='botonDegradado'";
                               }
            else typeU="R";
            javSpriv+=djsa+"'"+typeU+"'";
            menuUsuarios+="<li onclick=\"seleccionarUser(this)\" id=\""+us.getDocumentElement().getElementsByTagName("email").item(i).getTextContent()+"\" type="+typeU+" class=\"listCorreos\">"
                    + "<div style='float:right' >"
                             + "<div "+claseCSSE+" type='W' id='"+i+"strW' nid='"+i+"' onclick='clickS(this)' style='float:right'>Escritura</div>"
                             + "<div "+claseCSSL+" type='R' id='"+i+"strR' onclick='clickS(this)' style='float:left' nid='"+i+"'>Lectura</div>"
                    + "</div>"
                    + "<div>"+us.getDocumentElement().getElementsByTagName("email").item(i).getTextContent()+"</div>"
                 + "</li>";
        
            djsa=",";                   
        }
       menuUsuarios+="</ul></td></tr></table>"
                 + "</div></div>";
             }
    
   
}
if(mc.equals(".java"))mc="null";
%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Properties</title>
        <link rel="STYLESHEET" type="text/css" href="../CSS/SupportWindow/fieldSetForm.css"/>
        <script>
            
            var eAuxTr='';
            var classAux='';
            var mc='<%=mc%>';
            var correos;
            var name='<%=name%>';
            var privIni;
            if('<%=owner%>'==user){
                correos=[<%=javSarray%>];
                privIni=[<%=javSpriv%>];
            }console.log(correos);console.log(privIni);
            function guardarCambios(){
             /**
                if(false)cerrarBox();
                else{**/
       
                    var name='*.*';
                    var pack='*.*';
                    if($(document.getElementById(classAux)).attr('id')!='for'){
                      
                        name=$(document.getElementById(classAux)).attr('nameC');
                        pack=$(document.getElementById(classAux)).attr('packageC');
                        var nc='';
                        if(pack==''){nc=name;pack='*.*';}
                        else
                            nc=pack+'.'+name;
                    }
                if('<%=type%>'=='Write' || '<%=owner%>'==user) {   
                  
                  if(name!=null && name!=undefined && pack!=null && pack!=undefined){
                      $.get("../IDE/asignarMain.jsp?name=<%=name%>&owner=<%=owner%>&clase="+name+"&pack="+pack,function(data){

                            var r=jsonParse(data).answ;
                            if(r=='ok'){
                                alert('Modificacion exitosa');

                                var msj='<xml><u>'+user+'</u><op>rui</op><data><m>mcp</m><idI>'+mc+'</idI><idF>'+nc+'</idF><p><%=name%>;<%=owner%></p></data></xml>';
                                canalNotificaciones.emit("nuevoMsg", {c:'<%=name%>;<%=owner%>',msj:msj,u:user,s:idS} );

                                cerrarBox();
                            }
                            else{
                                alert('ocurrio un error al intentar asignar clase principal');
                            }

                        });
                 
                     }
                 
                 }
                 
                 if('<%=owner%>'==user){
                        asignarUsuarios();
                        renombrarProyecto();
                 }
              //  }
                
            }
            
            function asignarUsuarios(){    
                    var users='';var refresh=false;
                    for(var i in correos){
                        users+=correos[i]+';';
                    }
                    if(users==''){return;}
                    var privilegios='';
                    $('.listCorreos').each(function(){
                        privilegios+=$(this).attr("type")+';';
                    });
                   
                    $.get("../IDE/cambiarPrivilegioUsuario.jsp?owner=<%=owner%>&name=<%=name%>&users="+users+'&type=<%=typePet%>&types='+privilegios,function(data){
                       
                        var priv=privilegios.split(';');
                        var answ=jsonParse(data);
                        
                        if(answ.answ=='ok'){
                            for(var i in correos){
                                if(privIni[i]!=priv[i])
                                canalNotificaciones.emit("changeUserPrivilege",{ c:correos[i],u:user,p: '<%=name%>', t: priv[i],u:user, s:idS });
                            }  
                            alert('Operacion exitosa');
                            if(refresh && '<%=type%>'=='2'){
                             refrescarVista();
                             }
                            cerrarBox();
                        }
                        else{
                            if(answ.answ=='no'){
                                alert('Ud no permisos para compartir el proyecto');
                                cerrarBox();
                                return;
                            }
                            var f=answ.mails;
                            var msj='';
                            for(var i in f)
                                msj+='* '+f[i]+'\n';
                            
                            for(var i in correos){
                                for(var j in f){
                                   if(f[j]==correos[i])
                                       continue;
                                }
                                refresh=true;
                                if(privIni[i]!=priv[i])
                                canalNotificaciones.emit("changeUserPrivilege",{c:correos[i],u:user,p:'<%=name%>', t: priv[i] });
                                
                            } 
                            if(refresh && '<%=type%>'=='2'){
                                refrescarVista();
                               
                            }
                            alert('Ocurrio un error al intentar compartir el proyecto con los siguientes usuarios: \n\n'+msj);
                        }
                        
                    }).error(function() {alert("Ocurrio un error");})
            
                }
            
            function renombrarProyecto(){
                var nn=$('#nombreProyecto').val();
                if(nn==''){
                    alert('El proyecto no puede ser renombrado con el campo correspondiente vacio');
                    return;
                }
                if(name!=nn){
                 renombrarProyecto_Script_Index('ProjectNode;<%=name%>;<%=owner%>',nn,name);
                }
                return;
                
            }
            function cancelar(){
                cerrarBox();
            }
            
            function clickS(btn){
                     
                        if($(btn).attr('type')=='W'){
                            clickSwitch($(btn),$('#'+$(btn).attr('nid')+'strR'));
                            
                        }else{
                            clickSwitch($(btn),$('#'+$(btn).attr('nid')+'strW'));
                        }
                        $(btn).parent().parent().attr('type',$(btn).attr('type'));
                  }
                  
            function getClassMain(){
                for(var i in projectsMemory){
                            if(projectsMemory[i].nombre==name && projectsMemory[i].propietario==owner){
                                document.getElementById("idls").innerHTML=projectsMemory[i].clase
                            }

                        }
            }
            function seleccionarUser(e){
                if(eAuxTr!=null && eAuxTr!=undefined)
                    $(eAuxTr).css("background","none");
                eAuxTr=e;
                $(e).css("backgroundColor","yellow");
            }
            $('#msc').change(function() {

		classAux=$('#msc option:selected').attr('id');

               var name=$(document.getElementById(classAux)).attr('namec');
               var pack=$(document.getElementById(classAux)).attr('packagec');
               
            });
            
        function deleteUser(){
            
            
            if(eAuxTr==null || eAuxTr==undefined || eAuxTr==''){
                alert('Debe primero dar click en el usuario al cual desea dar de baja en su proyecto');
                return;
            }
            if(!confirm('¿ Realmente desea dejar de compartir el proyecto "<%=name%>" con el usuario "'+eAuxTr.id+'" ?')) 
                return;
             $.get("../IDE/eliminarUsuarioProyecto.jsp?name=<%=name%>&owner=<%=owner%>&user="+eAuxTr.id,function(data){
                 
                    var  an=jsonParse(data);
                    if(an.answ=='ok'){
                        canalNotificaciones.emit("deleteProject",{p: name+';'+user , u: eAuxTr.id,c: user, s:idS}); 
                        $(eAuxTr).remove();
                  
                        for(var i in correos){
                            if(correos[i]==eAuxTr.id){
                                correos.splice(i,1);
                                privIni.splice(i,1);
                                refrescarVista();
                                return;
                            }
                        }
                    
                    }
                    else alert('Error al intentar eliminar usuario');
             });
        }
            
        </script>
    </head>
    <body onload="getClassMain()">
        
       <!-- <div style="width: 300px;">
           
            <div>Nombre:&nbsp;<input id="nombreProyecto" type="text" <%=mName%> value="<%=name%>"/></div>
            <div>Propietario:&nbsp;<input type="text" readonly="readonly" value="<%=owner%>"/></div>
            <div>Clase&nbsp;Principal:&nbsp;
                
                <%=combo%>
               
            </div>
            <%=menuUsuarios%><br/>
            <%=botonesOpcion%> 
            
            
        </div>-->
            
            <div id='formulario' style="width: 500px;">
            <fieldset class="fieldsetForm">
                <div>
                    <label class='labelForm'  >Nombre del proyecto :</label>
                    <input id="nombreProyecto" class='inputForm' type="text" name="name" <%=mName%> value="<%=name%>" />                    
                </div>
                <div>
                    <label class='labelForm'  >Propietario :</label>
                    <input id="owner" class='inputForm' type="text" name="name" readonly="readonly" value="<%=owner%>" />                    
                </div>
                <div style="margin-top: 10px;">
                    <label class='labelForm'  >Clase Principal :</label>
                    <%=combo%>                   
                </div>
                <div align="center"  style="height: 100px;overflow: auto;margin-top: 10px;border: 1px solid #a4bed4;">
                    <%=menuUsuarios%>
                </div>
                <div align="right">
                    <input id="botnCancelar" type="button" class="botonForm" onclick="deleteUser()" value="Eliminar usuario" onclick="" style="float:left"/>
                    <%=botonesOpcion%> 
                </div>
                

            </fieldset>
        </div>
    </body>
</html>
