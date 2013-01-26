<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    String id = request.getParameter("idP");
    String com = request.getParameter("component");
    String value = request.getParameter("valor");
    String idComponent = request.getParameter("idCompo");
%>
<style>
    
    .fieldsetForm{
        background: none repeat scroll 0 0 #EBF4FB;
        border: 2px solid #B7DDF2;
        border-radius: 7px 7px 7px 7px;
        font-family: "Lucida Grande","Lucida Sans Unicode",Verdana,Arial,Helvetica,sans-serif;
        margin: 5px;
        padding: 0px 10px 15px 10px;
    }
    .inputForm{
        border: 1px solid #7997B1;
        border-radius: 4px 4px 4px 4px;
        font-size: 14px;
        margin: 15px 0 0px 6px;
        padding: 4px 2px;
        width: 200px;

    }
    .botonForm{
        background: none repeat scroll 0 0 #B6CBDD;
        border-radius: 5px 5px 5px 5px;
        color: #000000;
        font-size: 14px;
        height: 31px;
        line-height: 31px;
        text-align: center;                
        width: 110px ;
        margin-top: 15px;
    }

    .labelForm{
        color: #000000;
        font-size: 13px; 
        font-weight: bold;
        text-align: left !important;               
    }        

    .divError{
        color: red;
        font-size: 11px; 
        font-weight: bold;   
    }

    .error{
        border: 1px solid red !important;
    }
    
    #formulario{
        text-align: justify;
        
    }
    
    ul{
        list-style: circle !important;
        text-align: justify !important; 
    }
    li{
        margin-left: 25px;
        width: 345px;
    }
</style>
<script>
    var idP='<%=id%>';
    var comp='<%=com%>';
    var idComponente='<%=idComponent%>';
    var valor='<%=value%>';
    var estadoName=false;
    var estadoValue=false;
    var estadoInvalido=false;
    function aceptar(){
        var x=validoName();
        var y=validoValue();
        var z=verificarNamePermitidoVariable();
        if(x&&y&&z){
            updatePropertiesComponent(idP, $('#idNameVariable').val(), $('#idValueVariable').val(), comp, idComponente);
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

    function validoValue(){
        if($('#idValueVariable').val()==""){
            estadoValue=true;
           
            $('#idErrorValue').css("display","block");
            $('#idValueVariable').addClass("error");
            return false;
        }else{
            if(estadoValue){
                $('#idErrorValue').css("display","none");
                $('#idValueVariable').removeClass("error");
                estadoValue=false;
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
            <label class='labelForm'>Valor de la Variable</label>
            <input id="idValueVariable" class='inputForm' type="text" name="valueVariable" value="<%=value%>" />
        </div>
        <div id="idErrorValue" class='divError' style="display:none;">Digite El Valor de la Variable</div>
        <div>
            <input id="botonAceptar" type="button" class="botonForm" value="Aceptar" onclick="aceptar()" />
            <input id="botnCancelar" type="button" class="botonForm" value="Cancelar" onclick="cancelar()" />
        </div>

    </fieldset>
</div>

