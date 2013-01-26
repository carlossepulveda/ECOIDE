<%-- 
    Document   : renombrarProyecto
    Created on : 19/12/2011, 11:31:30 AM
    Author     : cas
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%

%>
<!DOCTYPE html>
<html>
    <head>
        <title>Nuevo nombre proyecto</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="../CSS/SupportWindow/abrirProyecto.css"/> 
        <script>
          
            function cancelar(){cerrarBox();}
            function aceptar(){renombrarProyecto(document.getElementById('name').value);cerrarBox();}
        </script>
    </head>
    <body>
        <div class="fondo">
            <h4>Digite nuevo nombre para el proyecto:</h4><input type="text" name="name" value="" size="10" id="name"/><br/>
            <input type="submit" value="aceptar" onclick="aceptar()"/><input type="submit" value="cancelar" onclick="cancelar()"/>
       
        </div>
    </body>
</html>
