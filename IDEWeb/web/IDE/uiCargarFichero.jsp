<%-- 
    Document   : uiCargarFichero
    Created on : 22/12/2011, 10:28:17 AM
    Author     : cas
--%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

 <%@page import="org.w3c.dom.Document"%>
<%@page contentType="text/plain" pageEncoding="UTF-8"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>

<%


String answ="wrong";


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
String name=request.getParameter("name");
String owner=request.getParameter("owner");
String nPackage=request.getParameter("nameP");

  


%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Agregar nuevo fichero</title>
        <link rel="stylesheet" type="text/css" href="../CSS/SupportWindow/abrirProyecto.css"/> 
        <script>
            
           var cerrar=false;
            function validarNombreFichero(){
                
                   var f=document.getElementById('fileUpload').value;
                   if(f=='' || f==null){
                       return false;
                   }else{
                       return true;
                   }
                
            }
            
  
            
            function cerrar(){
                cerrarBox();
            }
            
            function aceptar(){
               
               if(validarNombreFichero()){
                   cerrar=true;
                   document.cargarFichero.submit();
                   return;
               }               
               
            }
            
            function cerrarVentanaCarga(e){
               
               if(e!='null'){
                    cargarFichero(e);
                    cerrarBox();
                    return;
               }else{
                   alert('No fueposible montar el archivo');
                   return;
               }
   
            }
            
        </script>
    </head>
    <body>
    <div class="fondo">
        <form method="POST" enctype="multipart/form-data" action="../IDE/cargarFichero.jsp?name=<%=name%>&owner=<%=owner%>&nPackage=<%=nPackage%>" target="iframeUpload" name="cargarFichero">
            
            <div style="margin: 0 auto;"><iframe name="iframeUpload" id="frameUpload" style="height: 120px; width: 200px;margin: 0 auto;" src="../Util/espera.html" ></iframe>  </div>          
            <table align="center" style="margin: 0 auto;">
                <tr style="background-color: white;width: 100%; margin: 0 auto;padding-left: 20px;"><td><input name="fileUpload" id="fileUpload" type="file" /></td></tr>
            </table>
          
        </form> 
        <br/><button onclick="aceptar()">Enviar</button><button onclick="cancelar(false)">Cancelar</button>
    </div>
    </body>
</html>
