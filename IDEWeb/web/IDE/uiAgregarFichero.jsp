<%-- 
    Document   : uiAgregarFichero
    Created on : 20/12/2011, 09:44:43 AM
    Author     : cas
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%


%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Agregar fichero</title>
       
        <link rel="STYLESHEET" type="text/css" href="../CSS/SupportWindow/fieldSetForm.css"/> 
        <script>
            
          
            function aceptar(){
               
               var njava=document.getElementById('name').value;
                if(njava==null)return false;
              
                if(validoName(njava)){
                    agregarFichero(njava);
                    cerrarBox();
                }
            }
            
            function cancelar(){
                
                cerrarBox();
            }
             function validoName(name){
                $('#idErrorName').css("display","none");
                $('#name').removeClass("error");
                $('#idNotError').css("display","none");
                $('#name').removeClass("error");
                if(name==""){
     
                    $('#idErrorName').css("display","block");
                    $('#name').addClass("error");
                    return false;
                }else{
                    
                    if(verificarNamePermitidoVariable(name)){
                        
                       return true;
                    }
                    $('#idNotError').css("display","block");
                    $('#name').addClass("error");
                    return false;
                }
            }
             //esta funcón permite verificar que el posible nombre de una variable sea permitido
            function verificarNamePermitidoVariable(name){
               return true;
              
            }
        </script>
    </head>
    <body>
       
        
        <div id='formulario'>
            <fieldset class="fieldsetForm">
                <div>
                    <label class='labelForm'>Digite nombre&nbsp;(ej:&nbsp;x.txt):</label>
                    <input id="name" class='inputForm' type="text" name="name" value="" />                    
                </div>
                <div id="idErrorName" class='divError' style="display:none;" align="right">Campo no puede estar vacio</div>
                <div id="idNotError" class='divError' style="display:none;margin-top: 10px;"> 
                    Dato Inválido, considere lo siguiente:</br>
                    <ul style="margin-top: 10px;">
                        <li>Que inicie con letra mayúscula/minúscula o el carácter '_' o el carácter '$'</li>
                        <li>No debe contener carácteres diferentes a la anterior consideración</li>
                        <li>La cadena no debe corresponder a una palabra reservada de Java</li>
                    </ul>
                </div>
                <div>
                    <input id="botonAceptar" type="button" class="botonForm" value="Aceptar" onclick="aceptar()" />
                    <input id="botnCancelar" type="button" class="botonForm" value="Cancelar" onclick="cancelar()" />
                </div>

            </fieldset>
        </div>
    </body>
</html>
