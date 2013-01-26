<%-- 
    Document   : cargarFichero
    Created on : 21/12/2011, 09:46:57 AM
    Author     : cas
--%>


<%@page import="Util.SubirArchivoBean"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

 <%
                

                    //Primer atributo  es la referencia a todos los campos del formulario, segundo parametro corresponde a la ruta donde se desea almacenar y
                    //el tercer parametro el nombre del campo que contiene el archivo en el formulario

                    SubirArchivoBean subir = new SubirArchivoBean(request, "/home/cas/Escritorio", "fileUpload");
                    boolean r=subir.subirFile();
           
        %>
        
        
<html>
       <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel=StyleSheet HREF="../css/styleTabla.css" type="text/css" media="screen">
        <script type="text/javascript" src="../javaScript/jquery.js"></script>
     <%=r%>  
  
  
</html>
