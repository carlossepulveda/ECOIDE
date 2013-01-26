<%-- 
    Document   : uiCrearProyecto
    Created on : Mar 7, 2012, 5:38:05 PM
    Author     : cas
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="STYLESHEET" type="text/css" href="../CSS/SupportWindow/fieldSetForm.css"/> 
        <script>
       
            function crearP(){
                
                if( ($("#namePro").val()=='') || $("#namePro").val()==null)
                    alert('El campo nombre esta vacio');
                else{
                    crearProyecto($("#namePro").val());
                    cerrarBox();
                }
                
            }
            
        </script>
    </head>
    <body>
        <!--
        <div style="background-color: rgba(235,235,235,0.6);float: right;">
            
            <pre>crear proyecto </pre><input type="text" name="nameP" value="" id="nameP"/><br/>
            <button onclick="crearP()">Crear</button>
            
        </div>-->
        <div id='formulario'>
            <fieldset class="fieldsetForm">
                <div>
                    <label class='labelForm'>Digite nombre&nbsp;(ej:&nbsp;ProyectoPrueba):</label>
                    <input id="namePro" class='inputForm' type="text" name="name" value="" placeholder="//Nombre del proyecto" />                    
                </div>
               
                <div>
                    <button id="botonAceptar" type="button" value="Aceptar" onclick="crearP()">Aceptar</button>
                    <button id="botnCancelar" type="button" value="Cancelar" onclick="cerrarBox()">Cancelar</button>
                </div>

            </fieldset>
        </div>
    </body>
</html>
