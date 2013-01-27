<%-- 
    Document   : restablecerPass
    Created on : Mar 29, 2012, 11:03:21 AM
    Author     : cas
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
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
   
</style>
<script>
    var idP='idp';
    var comp='asd';
    var idComponente='asd';
    var valor='asd';
    var estadoName=false;
    var estadoValue=false;
    var estadoInvalido=false;
    function aceptar(){
        var x=validoPass();
        var y=validoNP();
        var z=validoNP2();
        if(x&&y&&z){
            $.post('../IDE/restablecerPass.jsp?pass='+$('#idPass').val()+'&new='+$('#idValueNP').val()+'&admin=no',function(data){
                
                var answ=jsonParse(data).answ;
              
                if(answ=='ok'){
                    alert('Operacion exitosa!!!');
                    cerrarBox();
                }
                else{
                    alert('No fue posible restablecer contrase\ña');
                    cerrarBox();
                }
                
            }).error(function() {alert("Ocurrio un error");});
                
        }
        return;        
    }
    
    function cancelar(){
        cerrarBox();
    }
    
    function validoPass(){
        if($('#idPass').val()==""){
            $('#idNotPass').css("display","block");
            $('#idErrorPass').css("display","none");
            $('#idPass').addClass("error");
            
            return false;
        }else{
            if(true){//si es valido $.get('../IDE/validPass.jsp',function(data){});
                $('#idErrorPass').css("display","none");
                $('#idNotPass').css("display","none");
                $('#idPass').removeClass("error");
                return true;
            }else{
               $('#idNotPass').css("display","none");
               $('#idErrorPass').css("display","block");
               $('#idPass').addClass("error"); 
            }
            
        }
        return false;
    }
  
    function validoNP(){
        if($('#idValueNP').val()==""){
            $('#idNotNP').css("display","block");
            $('#idValueNP').addClass("error");
            return false;
        }else{
            $('#idNotNP').css("display","none");
            $('#idValueNP').removeClass("error");
            return true;
        }
    }
    
    function validoNP2(){
        if($('#idValueNP2').val()==""){
            $('#idNotNP2').css("display","block");
            $('#idValueNP2').addClass("error");
            return false;
        }else{
            if($('#idValueNP2').val()==$('#idValueNP').val()){
                $('#idNotNP2').css("display","none");
                $('#idValueNP2').removeClass("error");
                return true;
            }
            else{
                $('#idNotNP2').css("display","none");
                $('#idErrorPassNP2').css("display","block");
                $('#idValueNP2').addClass("error");
                return false;
            }
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
                $('#idError').css("display","none");
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
        <div align="right">
            <label class='labelForm'>Contrase&ntilde;a</label>
            <input id="idPass" class='inputForm' type="password" name="nameVariable" value="" />
        </div>
        <div id="idErrorPass" class='divError' style="display:none;" align="right">La contrase&ntilde;a no coincide</div>
        <div id="idNotPass" class='divError' style="display:none;" align="right">Campo obligatorio</div>
        <div align="right">
            <label class='labelForm'>Nueva Contrase&ntilde;a</label>
            <input id="idValueNP" class='inputForm' type="password" name="valueNP" value="" />
        </div>
        <div id="idNotNP" class='divError' style="display:none;" align="right">Campo obligatorio</div>
        <div align="right">
            <label class='labelForm'>Nueva Contrase&ntilde;a</label>
            <input id="idValueNP2" class='inputForm' type="password" name="valueNP2" value="" />
        </div>
        <div id="idNotNP2" class='divError' style="display:none;" align="right">Campo obligatorio</div>
        <div id="idErrorPassNP2" class='divError' style="display:none;" align="right">La contrase&ntilde;as no coinciden</div>
        <div align="right">
            <input id="botonAceptar" type="button" class="botonForm" value="Aceptar" onclick="aceptar()" />
            <input id="botnCancelar" type="button" class="botonForm" value="Cancelar" onclick="cancelar()" />
        </div>

    </fieldset>
</div>
