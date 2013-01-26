<%-- 
    Document   : uiAgregarClaseGUI
    Created on : 17/01/2012, 09:30:44 AM
    Author     : cas
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
String id=request.getParameter("id");

%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Agregar claseGUI</title>
       
        <link rel="STYLESHEET" type="text/css" href="../CSS/SupportWindow/fieldSetForm.css"/> 
        <script>
            
            var id='<%=id%>';
            
         
            function aceptar(){
               
               var njava=document.getElementById('name').value;
                if(njava==null)return false;
               var njava2=njava.replace('.java','');
                if(validoName(njava2)){
                    agregarClaseGUI(njava);
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
                var d=/^[a-zA-Z\_\$\ñ\Ñ]/;//esta expresion acepta que la cadena empiece por letra mayuscula o minuscula o que empieze por '_' o por '$'
                var f=/[^a-zA-Z0-9_$Ññ]+/;//acepta un caracter no permitido para el nombre de una variable
                var palabra_reservada=/^(abstract)$|^(boolean)$|^(break)$|^(byte)$|^(strinctfp)$|^(case)$|^(catch)$|^(char)$|^(class)$|^(const)$|^(continue)$|^(default)$|^(do)$|^(double)$|^(else)$|^(enum)$|^(extends)$|^(false)$|^(final)$|^(finally)$|^(for)$|^(goto)$|^(implements)$|^(import)$|^(instanceof)$|^(int)$|^(interface)$|^(long)$|^(native)$|^(new)$|^(null)$|^(package)$|^(private)$|^(protected)$|^(public)$|^(return)$|^(short)$|^(static)$|^(super)$|^(swich)$|^(synchtonized)$|^(this)$|^(threadsafe)$|^(throw)$|^(throws)$|^(true)$|^(try)$|^(void)$|^(while)$|^(if)$/;
                return (d.test(name)&&!f.test(name)&&!palabra_reservada.test(name));
              
            }
        </script>
    </head>
    <body>
       
        
        <div id='formulario'>
            <fieldset class="fieldsetForm">
                <div>
                    <label class='labelForm'>Digite nombre&nbsp;(ej:&nbsp;x.java):</label>
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