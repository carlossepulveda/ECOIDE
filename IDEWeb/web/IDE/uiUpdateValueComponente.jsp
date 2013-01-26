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
    var estadoValue=false;
    function aceptar(){
        if(validoValue()){
            updateValueComponent(idP, comp, $('#idValueVariable').val(), idComponente);
            cerrarBox();
        }
        return;        
    }
    
    function cancelar(){
        cerrarBox();
    }
    
    function validoValue(){
        if(/**$('#idValueVariable').val()==""**/false){
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
    
   
            
</script>

        
        
    </head>

<div id='formulario'>
    <fieldset class="fieldsetForm">

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
</html>