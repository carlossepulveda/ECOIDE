<%-- 
    Document   : activarProgramador
    Created on : 13/12/2011, 05:02:42 PM
    Author     : cas
--%>

<%@page import="WEBApplication.Facade_WEBApplication"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    String user=request.getParameter("email");
    String id=request.getParameter("id");
    Facade_WEBApplication fwa=new Facade_WEBApplication(request.getRealPath("").replace("/build/web","/web"),request.getSession().getId());

    Object o=null;
    try{
        fwa.getProgrammerDataXML(user);
    }catch(Exception e){
        System.out.println("Se intento activas programador invalido - activarProgramador.jsp");
    }
    if(o==null){
        
        if(fwa.isValidIdRegister(user,id)){
            fwa.createProgrammer(user);
            
           }
        
        else{
            
            %>

            <jsp:forward page="../IDE/index.html"></jsp:forward>

            <%
            
         }
        
        
        
        
    }else{
            
            %>

            <jsp:forward page="../IDE/index.html"></jsp:forward>

            <%
            
         }
    

%>



<html>
    <head>

        <title></title>
        <link rel="icon" type="image/png" href="../Images/SupportWindow/favicon.png" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="../Scripts/jquery/jquery.min.js"></script> 
        <script  src="../Scripts/jquery/jquery-ui.min.js"></script>
        <script type="text/javascript" src="../Scripts/json/json_sans_eval.js"></script>
<style>

.block {
  text-align: center;
  background: white;
  background-image: url(../Images/fondo.png);
  /**border: #a0a0a0 solid 1px;**/
}
.viewPortInfoFooter{
    background-color: #FAFAFA;
background-image: url(../Images/bg_hr.png);

background-repeat: repeat-x, repeat-y;
}
 
.block:before {
  content: '';
  display: inline-block;
  height: 100%; 
  vertical-align: middle;
    
  /* For visualization 
  background: #808080; width: 5px;
  */
 }
 
.centered {
  display: inline-block;
  vertical-align: middle;
  width: 300px;
  /**background: #f5f5f5;**/
 }​

 div[c="bordeShadow"]{
    background-color: red;
    box-shadow:0 0 50px 5px blue!important;

 }
 h4{
     color:#9e1010;
 }
 e{
  color: blue;
 }
 o{
  color:black;
 }
 string{
	color:orange;
 }
 s{
  text-decoration: underline;
  cursor: pointer;
 }
 s:hover{
  color:blue;
 }
 .inputForm{
    height:20px;
    width:255px;
    background-color: #f0f0f0;
    border-radius: 4px;
 }
 .numeroLineaCodigo{
  background-color: #f0f0f0;
  color:#225987;
  height: 23px;
  text-align: middle;
 }
 .numeroLineaCodigo[type="error"]{
    background-color: rgba(255,0,0,0.4);
 }
  .numeroLineaCodigo[type="load"]{
    background-color: rgba(235,235,235,0.8);
 }
 .numeroLineaCodigo[type="success"]{
    background-color: rgba(0,255,0,0.4);
 }
 .editorCodigo{
  background-color: white;

 }
 .lineaEditorCodigo{
  color: #a8a8a8;
  height: 23px;
  font-family: Calibri, Verdana, Ariel, sans-serif;
  font-size: 15px;
 }
 .lineaEditorCodigo[type="error"]{
    background-color: rgba(255,0,0,0.4);
 }
 .lineaEditorCodigo[type="load"]{
    background-color: rgba(235,235,235,0.8);
 }
 .lineaEditorCodigo[type="success"]{
    color:#225987;
    background-color: rgba(0,255,0,0.4);
    font-size: 13px;
 }
 .errorViewPort[type="error"]{
     color:black;
 }
 .buttonForm{
  height: 25px;
  margin-top:3px;
 }
 
 .buttonForm[method="iniciar"]{
    width: 200px;
 }
 #footer{
                cursor:pointer;
                background-color: #dcdad5; 
                padding-bottom: 10px;
                padding-top: 10px;
            }
#footer a{
  color: #c80000;
  font-family: Calibri, Verdana, Ariel, sans-serif;
  text-decoration: none;
  padding-bottom: 3px;
  position: relative;
  top:-4px;
  float:left;
}
.backAux{
  background-image: url(../Images/fondo.png);
}
#footer a:hover,.switchFooter[picked="true"]{
  background-color: rgb(170,170,170);
}
body{
  background-image: url(../Images/fondo.png);
  overflow: hidden;
}
.zoom{
transform: scale(1.1);
-ms-transform: scale(1.1); /* IE 9 */
-webkit-transform: scale(1.1); /* Safari and Chrome */
-o-transform: scale(1.1); /* Opera */
-moz-transform: scale(1.1); /* Firefox */
}

.panelAdmin{
    position: absolute;
    top:0px;
    right:-170px;
    z-index:9999;
    border-top-left-radius:5px;
    border-bottom-left-radius:5px;
    background-color: rgba(240,240,240,0.3);
    height: 30px;
    width: 200px;
    cursor: pointer;

}

</style>
       
        
    </head>
    <body>

<div class="iconos" style="position:absolute;top:2%;left:1%;z-index:9999;"><img src="../Images/optimizadaLogo.png"></div>
<div class="iconos" style="position:absolute;bottom:40px;right:2%;z-index:9999;width:400px;height:50px"><img style="width:100%;height:100%" src="../Images/letras.png"></div>
<div class="canvas" style="position: absolute;left:0px;width: 400%;height:100%"> 
    <!--primer formulario-->
<div class="block formLogin" style="height: 100%;float: left;width:25%;">
    
    <div class="centered" style="height:400px;width:380px;position:relative">

        <!--<div class="contentForm" style="width:100%;height:100%;background-color:red">-->
            <div style="width:100%;height:8%;z-index:2;position:absolute">
                <div style="width:80%;z-index:2;height:100%;position:relative;border-top-left-radius:8px;border-top-right-radius:8px;">
                
                <div style="width:100%;height:100%;position:absolute;z-index:2;border-top-left-radius:8px;border-top-right-radius:8px;">
                    
                    <div style="float:left;position:relative;width:53%;height:100%;position:relative;bottom:0px;border-style:solid;border-width:1px;border-color:rgba(190,190,190,0.5);border-top-left-radius:6px;border-top-right-radius:8px;background-color:#f0f0f0">
                     <a href="http://www.ufps.edu.co" target="_blank">
                      <img align="left" src="../Images/logoufps.png" style="width:130px;height:23px;margin-top:3px;margin-left:3px"/>
                     </a>
                      <div style="position:absolute;right:0px;top:0px;margin:4px"><img src="../Images/botonCerrar.png"/></div>
                    </div>

                    <div style="float:left;width:45%;height:100%;position:relative;bottom:0px;border-style:solid;border-width:1px;border-color:rgba(190,190,190,0.7);border-top-right-radius:8px;border-top-left-radius:6px;background-color:#f0f0f0">
                      <a href="http://ingsistemas.ufps.edu.co" target="_blank">
                      <img align="left" src="../Images/logosistemas.png" style="width:70%;height:23px;margin-top:5px;margin-left:3px"/>
                    </a>
                      <div style="position:absolute;right:0px;top:0px;margin:4px"><img src="../Images/botonCerrar.png"/></div>
                    </div>

                    

                </div>
                    <div id="bordeDerechoPestana" class="bordeShadow" style="width:0;height:98%;margin-top:2%;float:right;position:absolute;position:relative;box-shadow:0 0 12px 5px rgba(5,5,5,0.7)"></div>
                </div>
            </div>


            <div id="bordeSuperiorPestana" class="bordeShadow" style="width:78%;height:0;float:left;position:absolute;position:relative;box-shadow:0 0 12px 5px rgba(5,5,5,0.7)"></div>

            <div id="bordeIzquierdoGrande" class="bordeShadow" style="width:0;height:98%;margin-top:3%;float:left;position:absolute;position:relative;box-shadow:0 0 12px 5px rgba(5,5,5,0.7)"></div>

            <div id="bordeDerechoGrande" class="bordeShadow" style="width:0;height:89%;float:right;position:absolute;position:relative;margin-top:11%;box-shadow:0 0 12px 5px gray;box-shadow:0 0 12px 5px rgba(5,5,5,0.7)"></div>


            <div style="width:100%;height:92%;position:absolute;margin-top:8%;">

              <div style="width:100%;height:100%;position:absolute;z-index:2;background-color:white;background-color:#f0f0f0;border-style:solid;border-width:1px;border-color:rgba(190,190,190,0.5);border-top-right-radius:5px;border-bottom-right-radius:5px;border-bottom-left-radius:5px;">

                  <div id="divContenido" style="width:96%;height:96%;margin: 2% 2%;box-shadow: 0 0 3px 1px rgba(200,200,200,0.5)">
                      <div id="numerdorCodigo" style="width:9%;height:99%;float:left;border-width:1px;  
                            border-style:none solid none none;border-color:#225987;border-width:2px;position:relative;background-color:#f0f0f0">

                            <div class="numeroLineaCodigo" style="position:relative;margin-top:8px;width:100%;bacckground-color:red">1</div>
                            <div class="numeroLineaCodigo" style="position:relative;width:100%;bacckground-color:red">2</div>
                            <div class="numeroLineaCodigo" style="position:relative;width:100%;bacckground-color:red">3</div>
                            <div class="numeroLineaCodigo" style="position:relative;width:100%;bacckground-color:red">4</div>
                            <div class="numeroLineaCodigo" style="position:relative;width:100%;bacckground-color:red">5</div>
                            <div class="numeroLineaCodigo" style="position:relative;width:100%;bacckground-color:red">6</div>
                            <div class="numeroLineaCodigo" style="position:relative;width:100%;bacckground-color:red">7</div>
                            <div class="numeroLineaCodigo" style="position:relative;width:100%;bacckground-color:red">8</div>
                            <div class="numeroLineaCodigo" style="position:relative;width:100%;bacckground-color:red">9</div>
                            <div class="numeroLineaCodigo" style="position:relative;width:100%;bacckground-color:red">10</div>
                            <div class="numeroLineaCodigo" style="position:relative;width:100%;bacckground-color:red">11</div>
                            <div class="numeroLineaCodigo" style="position:relative;width:100%;bacckground-color:red">12</div>
                            <div class="numeroLineaCodigo" style="position:relative;width:100%;bacckground-color:red">13</div>
                            <div class="numeroLineaCodigo" style="position:relative;width:100%;bacckground-color:red">14</div>
                            <div class="numeroLineaCodigo errorViewPort" type="none" style="position:relative;width:100%;bacckground-color:red">15</div>

                      </div>
                      <div class="editorCodigo" style="width:90%;height:99%;float:left">
                            
                            <div class="lineaEditorCodigo" style="position:relative;width:99%;margin-top:8px;margin-left:1%;text-align:left">
                              /**Bienvenido a una Nueva
                            </div>
                            <div class="lineaEditorCodigo" style="position:relative;width:99%;margin-left:1%;text-align:left">
                              *Experiencia de programacion
                            </div>
                            <div class="lineaEditorCodigo" style="position:relative;width:99%;margin-left:1%;text-align:left">
                              **/
                            </div>
                            <div class="lineaEditorCodigo" style="position:relative;width:99%;margin-left:1%;text-align:left">
                              <e>public</e>&nbsp;<e>class</e>&nbsp;<o><b>BIENVENIDO</b></o><o>{</o>
                            </div>
                            <div class="lineaEditorCodigo" style="position:relative;width:99%;margin-left:1%; text-align:left">

                            </div>
                            <div class="lineaEditorCodigo" style="position:relative;width:99%;margin-left:1%;text-align:left">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<e>public</e>&nbsp;<e>static</e>&nbsp;<e>final</e>&nbsp;<b>String</b>&nbsp;<o><b>MENSAJE</b>=</o><o></o>
                            </div>
                            <div class="lineaEditorCodigo" style="position:relative;width:99%;margin-left:1%;text-align:left">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<string>"Felicitaciones, su cuenta se ha activado "</string>+
                            </div>
							<div class="lineaEditorCodigo" style="position:relative;width:99%;margin-left:1%;text-align:left">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<string>"satisfactoriamente"</string>;
                            </div>					
                            <div class="lineaEditorCodigo" style="position:relative;width:99%;margin-left:1%;text-align:left">
							<div class="lineaEditorCodigo" style="position:relative;width:99%;margin-left:1%;text-align:left">

                            </div>
                              
                            </div>
                            <div class="lineaEditorCodigo" style="position:relative;width:99%;margin-left:1%;text-align:left">
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="buttonForm" method="iniciar" onclick="window.location='../IDE/index.html'"><b>Inciar();</b></button>
                            </div>
                            <div class="lineaEditorCodigo" style="position:relative;width:99%;margin-left:1%;text-align:left">
                              
                            </div>
                            <div class="lineaEditorCodigo" style="position:relative;width:99%;margin-left:1%;text-align:left">
                              &nbsp;&nbsp;<o>}</o>//
                            </div>
                            <div class="lineaEditorCodigo" style="position:relative;width:99%;margin-left:1%;text-align:left">
                              
                            </div>
                            <div class="lineaEditorCodigo errorViewPort" type="none" style="position:relative;width:99%;margin-left:1%;text-align:left">
                             
                            </div>



                      </div>
                  </div>
                  

              </div>
                  <div id="bordeSuperiorDerecho" class="bordeShadow" style="width:17%;height:0;position:absolute;right:0px;z-index:1;box-shadow:0 0 12px 5px rgba(5,5,5,0.7"></div>

            </div>


            <div id="borderInferior"  class="bordeShadow" style="width:95%;margin-left:3%;position:relative;margin-top:106%;box-shadow:0 0 12px 5px rgba(5,5,5,0.7)"></div>
      <!--  </div> -->
    </div><!--fin centerd-->
    
</div>
 <!--fin primer formulario-->    
</div><!--fin canvas-->


</div>

<div  class="block backAux switchFooter" style="background-color:rgba(255,255,255,0.3);height:100%;width:100%;z-index:9000;position:absolute;top:0;left:0;display:none">

    <div class="centered" style="color:white;top:-10%;position:relative"><img src="../Images/optimizadaLogo.png"/></div>

</div>
<div id="footer" state="close" align="left" style="left:0px;bottom: -180px;position:absolute;width: 100%;z-index:9001;" class="switchFooter">
            <!--<a style="height:23px;width:23px;float:right;position:absolute;top:4px;right:8px;cursor:pointer" class="hideOutButton switchFooter"></a>-->
        
        <div style="height:20px;width:100%;position:relative;background:#DCDAD5!important" class="block slidePicker" >
            <img src="../Images/slideup.png" style="margin-bottom:2px;height:100%;width:40px" class="centered slideup"/>
            <img src="../Images/slidedown.png" style="margin-bottom:2px;height:100%;width:40px;display:none" class="centered slidedown"/>
          <!--<a href="#" style="margin-left:15px;" picked="false" class="switchFooter" menu="qs">Que es</a>
            <!--<a style="margin-left:25px;" onclick="box('Inicio Sesion Administrador','../IDE/uiLoginAdministrador.html');" href="#" >Administrador</a>-->
          <!--<a href="#" style="margin-left:15px;" picked="false" class="switchFooter" menu="pq">Porque usarlo</a>
          <a href="#" style="margin-left:15px;" picked="false" class="switchFooter" menu="dev">Desarrolladores</a>
          -->
        </div>
        <div class="viewPortInfoFooter"style="height:170px;background-color:white;width:100%;position:relative">
            
            <div class="box_info" style="height:100%;width:33.3%;float:left;left:0px;position: absolute;text-align:center;">
                <div style="height:100%;width:95%" class="centered">
                   <h4>¿Que es ECO?</h4>
                Es un Entorno de Desarrollo Colaborativo Online que permite construir proyectos JAVA de  manera simultanea y en tiempo real, entre un grupo de programadores 
                </div>
                
            </div>
            <div class="box_info" style="height:100%;width:33.3%;float:left;left:33.3%;position:absolute;text-align:center;">
                <div style="height:100%;width:95%" class="centered">
                  <h4>¿Porque usarlo?</h4>
                    ECO brinda las herramientas necesarias para  llevar a cabo proyecto JAVA colaborativos, y por ser una aplicacion cloud brinda la ventaja de tener disponible el codigo en el lugar se desee al momento que se requiera, sin preocuparse por la instalacion de ambientes de programacion 
               </div>
            </div>
            <div class="box_info" style="height:100%;width:33.3%;float:left;left:66.6%;position:absolute;text-align:center;">
                <div style="height:100%;width:95%" class="centered">
                   <h4>Desarrollado por</h4>
                   Carlos Andres Sepulveda Sanchez <br/>
                Wilson Yesid Rivera Casas<br/><br/>
                
                Estudiantes del programa de <b>Ingenieria de Sistemas</b> de la <b>Universidad Franciso de Paula Santander</b> 
                    
                </div>
                
            </div>
            
        </div>
            
</div>

</body>
</html>
