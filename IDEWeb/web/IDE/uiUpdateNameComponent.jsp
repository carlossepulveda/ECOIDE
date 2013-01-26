<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    String id = request.getParameter("idP");
    String com = request.getParameter("component");
    String value = request.getParameter("valor");
    String idComponent = request.getParameter("idCompo");
%>

<html>
    <head>
        <link rel="STYLESHEET" type="text/css" href="../CSS/SupportWindow/fieldSetForm.css"/> 
       
<script>
    var idP='<%=id%>';
    var comp='<%=com%>';
    var idComponente='<%=idComponent%>';
    var valor='<%=value%>';
    var estadoName=false;
    var estadoInvalido=false;
    
    function aceptar(){
        var x=validoName();
        var y=verificarNamePermitidoVariable();
        if(x&&y){
            
            updateNameComponent(idP, $('#idNameVariable').val(), comp, idComponente);
            cerrarBox();
        }
        return;        
    }
    
    function cancelar(){
        cerrarBox();
    }
    
    function validoName(){
        if($('#idNameVariable').val()==""){
            estadoName=true;
            $('#idErrorName').css("display","block");
            $('#idNameVariable').addClass("error");
            return false;
        }else{
            if(estadoName){
                $('#idErrorName').css("display","none");
                $('#idNameVariable').removeClass("error");
                estadoName=false;
            }
            return true;
        }
    }
    
    //esta funcón permite verificar que el posible nombre de una variable sea permitido
    function verificarNamePermitidoVariable(){
        var d=/^[a-zA-Z\_\$\ñ\Ñ]/;//esta expresion acepta que la cadena empiece por letra mayuscula o minuscula o que empieze por '_' o por '$'
        var f=/[^a-zA-Z0-9_$Ññ]+/;//acepta un caracter no permitido para el nombre de una variable
        var palabra_reservada=/^(abstract)$|^(boolean)$|^(break)$|^(byte)$|^(strinctfp)$|^(case)$|^(catch)$|^(char)$|^(class)$|^(const)$|^(continue)$|^(default)$|^(do)$|^(double)$|^(else)$|^(enum)$|^(extends)$|^(false)$|^(final)$|^(finally)$|^(for)$|^(goto)$|^(implements)$|^(import)$|^(instanceof)$|^(int)$|^(interface)$|^(long)$|^(native)$|^(new)$|^(null)$|^(package)$|^(private)$|^(protected)$|^(public)$|^(return)$|^(short)$|^(static)$|^(super)$|^(swich)$|^(synchtonized)$|^(this)$|^(threadsafe)$|^(throw)$|^(throws)$|^(true)$|^(try)$|^(void)$|^(while)$|^(if)$/;
        if(!(d.test($('#idNameVariable').val())&&!f.test($('#idNameVariable').val())&&!palabra_reservada.test($('#idNameVariable').val())))
        {
            estadoInvalido=true;
            if(!estadoName){
                $('#idNotError').css("display","block");
                $('#idNameVariable').addClass("error");
            }
            return false;
        }else{
            if(estadoInvalido){
                $('#idNotError').css("display","none");
                $('#idNameVariable').removeClass("error");
                estadoInvalido=false;
            }
            return true;
        }
    }
            
</script>
    </head>
<div id='formulario'>
    <fieldset class="fieldsetForm">
        <div>
            <label class='labelForm'>Nombre de la Variable</label>
            <input id="idNameVariable" class='inputForm' type="text" name="nameVariable" value="<%=com%>" />                    
        </div>
        <div id="idErrorName" class='divError' style="display:none;">Digite El Nombre de la Variable</div>
        <div id="idNotError" class='divError' style="display:none;"> 
            Dato Inválido, considere lo siguiente:</br>
            <ul>
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
        </html>