<%-- 
    Document   : IDE
    Created on : 21/11/2011, 04:31:06 PM
    Author     : cas

///en datagridesta el menu de contexto
--%>


<%@page import="WEBApplication.Facade_WEBApplication"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page session="true"%>

<%
    Facade_WEBApplication fwa = (Facade_WEBApplication) request.getSession().getAttribute("fwa");
    System.out.println("IDE " + fwa);
    if (fwa == null) {
        System.out.println("facade nulo IDE " + fwa);
%>
<jsp:forward page="../IDE/index.html"></jsp:forward>
<%

    }


    if (!fwa.isValidSession()) {

        System.out.println("sesion invelida IDE " + fwa);

%>

<jsp:forward page="../IDE/index.html"></jsp:forward>

<%
    }

    String idSession = fwa.getIdSession();
    String user = fwa.getUser();
    String p = fwa.toStringProjects();

    if (p == null) {
        p = "";
    }

%>


<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
    <head>
        <title>LittleIDE</title>
        <link rel="icon" type="image/png" href="../Images/SupportWindow/favicon.png" />
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta name="featured" content="yes"/><meta name="title" content="Samples" />
        <meta name="keywords" content="" />
        <meta name="description" content="" />
        <script src="../Scripts/config.js"></script>



        <!--       <script  src="../Scripts/jquery/jquery.min.js"></script>
                <script  src="../Scripts/jquery/jquery-ui.min.js"></script>-->


        <link href="../CSS/jquery/jquery-ui.css" rel="stylesheet" type="text/css"/>
        <script  src="../Scripts/jquery/jquery.min.js"></script>
        <script  src="../Scripts/jquery/switchButton.js"></script>
        <link rel="stylesheet" href="../CSS/SupportWindow/viewIndex.css" type="text/css" media="screen" />

        <script  src="../Scripts/jquery/jquery-ui.min.js"></script>
        <script  src="../Scripts/jquery/jqueryCookie.js"></script>

        <script  src="../Scripts/IDE/Control_IDE.js"></script>
        <script  src="../Scripts/IDE/Control_Tree.js"></script>
        <script src="../Scripts/IDE/Control_Tabs.js"></script>
        <script src="../Scripts/IDE/IdTab.js"></script>
        <script  src="../Scripts/IDE/Control_Lienzo.js"></script>

        <script src="../Scripts/IDE/Control_BarrasDesplegables.js"></script>
        <script src="../Scripts/IDE/ObjBarraDesplegable.js"></script>
        <link rel="STYLESHEET" type="text/css" href="../Scripts/IDE/PaletaComponentes.css"/>


        <script  src="../Scripts/IDE/Lienzo.js"></script>
        <script  src="../Scripts/IDE/Componente.js"></script>
        <script  src="../Scripts/IDE/Coordenada.js"></script>
        <script  src="../Scripts/IDE/Dimension.js"></script>
        <link  rel="stylesheet" type="text/css" href="../Scripts/IDE/componentesGraficosLienzo.css"/>


        <!--framework de javascript para el editor con resaltador de codigo-->
        <script src="../Scripts/ace/ace.js" type="text/javascript" charset="utf-8"></script>
        <script src="../Scripts/ace/theme-textmate.js" type="text/javascript" charset="utf-8"></script>
        <script src="../Scripts/ace/mode-java.js" type="text/javascript" charset="utf-8"></script>


        <!--framework de javascript para la GUI de la IDE-->
        <link rel="STYLESHEET" type="text/css" href="../Scripts/dhtmlxSuite/dhtmlxTabbar/codebase/dhtmlxtabbar.css"/>
        <script  src="../Scripts/dhtmlxSuite/dhtmlxTabbar/codebase/dhtmlxcommon.js"></script>
        <script  src="../Scripts/dhtmlxSuite/dhtmlxTabbar/codebase/dhtmlxtabbar.js"></script>        

        <!--JAVASCRIPT PARA LOS FORMULARIOS-->
        <link rel="stylesheet" type="text/css" href="../Scripts/dhtmlxSuite/dhtmlxForm/codebase/skins/dhtmlxform_dhx_skyblue.css"/>
        <script src="../Scripts/dhtmlxSuite/dhtmlxForm/codebase/dhtmlxcommon.js"></script>
        <script src="../Scripts/dhtmlxSuite/dhtmlxForm/codebase/dhtmlxform.js"></script>





        <script src="../Scripts/box/box.js"></script>   
        <link rel="STYLESHEET" type="text/css" href="../Scripts/box/box.css"/>

        <!--<script src="../Scripts/sharejs/ace.js"></script>-->
        <!-- <script src="../Scripts/sharejs/mode-coffee.js"></script>-->
        <!--<script src="../Scripts/sharejs/theme-idle_fingers.js"></script>-->
        <script src="../Scripts/sharejs/socket.io.js"></script>
        <script src="../Scripts/sharejs/socket.js"></script>
        <script src="../Scripts/sharejs/share.js"></script>
        <script src="../Scripts/sharejs/ace_002.js"></script>
        <script src="../Scripts/sharejs/json.js"></script>


        <script type="text/javascript" src="../Scripts/contextualMenu/menu.js"></script>
        <script type="text/javascript" src="../Scripts/json/json_sans_eval.js"></script>
        <link rel="stylesheet" href="../Scripts/contextualMenu/main.css" type="text/css" media="screen" />



        <link rel="STYLESHEET" type="text/css" href="../Scripts/IDE/cssBarraTools.css"/>

        <link rel="stylesheet" type="text/css" href="../Scripts/dhtmlxSuite/dhtmlxLayout/codebase/skins/dhtmlxlayout_dhx_skyblue.css"/>
        <script src="../Scripts/dhtmlxSuite/dhtmlxLayout/codebase/dhtmlxcommon.js"></script>
        <script src="../Scripts/dhtmlxSuite/dhtmlxLayout/codebase/dhtmlxlayout.js"></script>

        <script src="../Scripts/dhtmlxSuite/dhtmlxLayout/codebase/dhtmlxcontainer.js"></script>
        <link rel="stylesheet" type="text/css" href="../Scripts/dhtmlxSuite/dhtmlxTree/codebase/dhtmlxtree.css"/>
        <script src="../Scripts/dhtmlxSuite/dhtmlxTree/codebase/dhtmlxtree.js"></script>




        <!--framework de javascript para la GUI de la IDE-->
        <link rel="STYLESHEET" type="text/css" href="../Scripts/dhtmlxSuite/dhtmlxTabbar/codebase/dhtmlxtabbar.css"/>
        <script  src="../Scripts/dhtmlxSuite/dhtmlxTabbar/codebase/dhtmlxcommon.js"></script>
        <script  src="../Scripts/dhtmlxSuite/dhtmlxTabbar/codebase/dhtmlxtabbar.js"></script>        

        <!--JAVASCRIPT PARA LOS FORMULARIOS-->
        <link rel="stylesheet" type="text/css" href="../Scripts/dhtmlxSuite/dhtmlxForm/codebase/skins/dhtmlxform_dhx_skyblue.css"/>
        <script src="../Scripts/dhtmlxSuite/dhtmlxForm/codebase/dhtmlxcommon.js"></script>
        <script src="../Scripts/dhtmlxSuite/dhtmlxForm/codebase/dhtmlxform.js"></script>

        <!--framework de javascript para el editor con resaltador de codigo-->
        <script src="../Scripts/ace/ace.js" type="text/javascript" charset="utf-8"></script>
        <script src="../Scripts/ace/theme-textmate.js" type="text/javascript" charset="utf-8"></script>
        <script src="../Scripts/ace/mode-java.js" type="text/javascript" charset="utf-8"></script>

        <script src="../Scripts/box/box.js"></script>   
        <link rel="STYLESHEET" type="text/css" href="../Scripts/box/box.css"/>


        <link rel="STYLESHEET" type="text/css" href="../Scripts/IDE/cssBarraTools.css"/>

        <script src="../Scripts/IDE/Control_Tabs.js"></script>
        <script src="../Scripts/IDE/IdTab.js"></script>
        <script src="../Scripts/json/json_sans_eval.js"></script>


        <script src="../Scripts/menuMAC/interface.js" type="text/javascript" charset="utf-8"></script>
        <link rel="STYLESHEET" type="text/css" href="../Scripts/menuMAC/style.css"/>
     
       
 <script src="../Scripts/jquery/tooltip.js" type="text/javascript"></script>
        <style type="text/css">
            .bubblewrap{
                list-style-type:none;
                margin:0;
                padding:0;
            }

            .bubblewrap li{
                display:inline;
                width: 65px;
                height:60px;
                padding-left: 10px;
            }

            .bubblewrap li img{
                width: 30px; /* width of each image.*/
                height: 30px; /* height of each image.*/
                border:0;
               /** margin-right: 12px; /*spacing between each image**/
                -webkit-transition:-webkit-transform 0.1s ease-in; /*animate transform property */
                -o-transition:-o-transform 0.1s ease-in; /*animate transform property in Opera */
            }
            #logoUFPS{
                height: 42px;
                position:absolute;
                left: 13px;
                top:10px;
            }
            #logoING{
                height: 42px;
                width : 42px;
                position:absolute;
                right: 13px;
                top:10px;
            }

          /**  .bubblewrap li img:hover{
                -moz-transform:scale(1.5); /*scale up image 1.8x*/
            /**    -webkit-transform:scale(1.5);
                -o-transform:scale(1.5);
            }**/
            #mide{
                z-index: 99999999999999;
            }
            .qtip{
                z-index: 99999999999999;
            }
            #objIdNotificador{
                color:#505050!important;
            }

            .selectedTreeRow{
                color:#505050!important;
            }
            
            .standartTreeRow{
               color:#505050!important; 
            }

            html,   body{
                width: 100%;
                height:100%;
                margin: 0px;
                padding: 0px;
                overflow: hidden;
                 font-family: "Lucida Grande","Lucida Sans Unicode",Verdana,Arial,Helvetica,sans-serif!important;
            }

            .notItemBoard{
                background-color: rgba(240,240,240,0.7);
                border-radius: 5px;
                min-height: 30px;
                height:auto;
                margin: 3px;
                padding: 5px;
                overflow: none;
            }
            .lostConexionBall{
                background-color: rgba(255,0,0,0.3);
                z-index:99999;
                top:10px;
                position:absolute;
                border-radius : 10px;
                display: none;
                padding: 15px 20px;
            }
            .compilationTitle{
                font-size: 16px;
            }
            .errorCompilationTitle{
                color:red
            }
            .successCompilationTitle{
                color:green;
            }
            .itemErrorCompilacion{
                 background-color: rgba(255,0,0,0.3);
                 border-style:solid;
                 border-radius: 3px;
                 padding: 6px;
            }
            .failExecute{
                color : red;
            }
            .objIdOutput{
                background-color: whitesmoke;
            }
            .disabledIcon {
                filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale"); /* Firefox 10+, Firefox on Android */
                filter: gray; /* IE6-9 */
                -webkit-filter: grayscale(100%); /* Chrome 19+, Safari 6+, Safari 6+ iOS */
            }
            .enabledIcon {
                filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 1 0\'/></filter></svg>#grayscale");
                -webkit-filter: grayscale(0%);
            }

        </style> 




    </head>
    <body onmousedown="eventoClick()"
          style="background-attachment: scroll;
          background-repeat: no-repeat;
          text-align: center">
        <audio id="audioChat" preload>
            <source src="../chat.mp3" type="audio/mp3">
            <source src="../chat.ogg" type="audio/ogg">
        </audio>
        <!--!onunload="ManejadorCierre()"-->
        <div class="content">






            <div id="content" style="width: 100%!important;height: 100%!important;margin: 0!important;background-image: url('../Scripts/dhtmlxSuite/dhtmlxLayout/codebase/imgs/dhxlayout_dhx_skyblue/dhxlayout_bg50.gif'); background-repeat: repeat-x; border-: groove;border: gainsboro 5px solid;margin: 4px auto ;">
                <a id="logoUFPS" href="http://www.ufps.edu.co">
                    <img style="position:relative;width:100%;height:100%" src="../Images/SupportWindow/ufpshorizontal.png"/>
                </a>
                <a id="logoING" href="http://ingsistemas.ufps.edu.co">
                    <img style="position:relative;width:100%;height:100%" src="../Images/SupportWindow/ing_sistemas.png"/>
                </a>
                <div class="divUserInfo" style="float:right;margin-right: 70px;margin-top:15px;color: #871528!important">
                    <div>
                        <pre>Bienvenido !!</pre>
                    </div>
                    <div>
                        <img class="iconConexionState" src="../Images/SupportWindow/redBall.png" style="height:17px;width:17px;float:right">
                        <pre><%=user%></pre>
                        
                    </div>
                </div>
       
                <div style="width:470px;height: 30px;margin: 10px auto;z-index:700;">
                                
                                <ul class="bubblewrap" id="mide" idm="mide" style="float: left">

                                    <li id="i8" class="menuLiP" idm="8" msj="Ir a Inicio" ><a href="#" onclick="cerrarIDE()"><img src="../Images/MenuBar/home.png"/></a><span id="s8" style="display:none;z-index:10004;">Ejecutar</span></li>
                                    <li id="i0" class="menuLiP ttp" idm="0" msj="Crear Proyecto"><a href="#" onclick="uiCrearProyecto()"><img src="../Images/MenuBar/pack.png" /></a><span id="s0" style="display:none;z-index:10004;">Crear</span></li>
                                    <li id="i1" class="menuLiP ttp" idm="1" msj="Abrir Proyecto"><a href="#" onclick="abrirVentana('../IDE/abrirProyecto.jsp','Seleccione proyecto',false)"><img src="../Images/MenuBar/open.png"  /></a><span id="s1" style="display:none;z-index:10004;">Abrir</span></li>
                                    <li id="i2" class="menuLiP ttp disablingIcon" idm="2" msj="Compilar Proyecto"><a href="#" onclick="compilarProyectos($(this).parent())"><img src="../Images/MenuBar/compile.png"/></a><span id="s2" style="display:none;z-index:10004;">Compilar</span></li>
                                    <li id="i4" class="menuLiP disablingIcon" idm="4" msj="Descargar Proyecto"><a href="#" onclick="descargarEjecutableProyectos($(this).parent())"><img src="../Images/MenuBar/downloadJar.png" /></a><span id="s4" style="display:none;z-index:10004;">Descargar</span></li>
                                    <li id="i5" class="menuLiP disablingIcon" idm="5" msj="Descargar Proyecto"><a href="#" onclick="descargarProyectos($(this).parent())"><img src="../Images/MenuBar/downloadZip.png" /></a><span id="s5" style="display:none;z-index:10004;">Descargar</span></li>
                                    <li id="i6" class="menuLiP disablingIcon"  idm="6" msj="Ejecutar Proyecto"><a href="#" onclick="ejecutarProyectos($(this).parent())"><img src="../Images/MenuBar/play.png"/></a><span id="s6" style="display:none;z-index:10004;">Ejecutar</span></li>
                                    <li id="i7" class="menuLiP disablingIcon" idm="7" msj="Chat"><a href="#" onclick="verChats($(this).parent())"><img src="../Images/MenuBar/chats.png" /></a><span id="s7" style="display:none;z-index:10004;">Descargar</span></li>
                                    <li id="i3" class="menuLiP" msj="Cerrar Sesion" onclick='logout()' ><a href="#" onclick=""><img src="../Images/MenuBar/personal.png" class="imge"/></a></li>

                                </ul>
                </div>

                <table align="center" style="width:99.8%;height:92%">
                    <tr style="width:100%;height:100%">

                        <td style="width:100%;height:100%;">

                            <div id="parentId" style="position: relative;width:100%!important;height:100%!important; border: #bababa 1px solid;"></div>

                        </td>

                    </tr>  


                </table>
            </div>

            <div id="objIdOutput" style="width: 100%; height: 100%; overflow: auto; display: none; font-family: Tahoma; font-size: 11px;"></div>
            <div id="objIdNotificador" style="width: 100%; height: 100%; overflow: auto; display: none; font-family: Tahoma; font-size: 11px;"></div>


        </div>

        <div align="center" id="loading" style="position: absolute;left: 0px;top: 0px;filter:alpha(opacity=50);-moz-opacity:0.5; height: 100%;width: 100%;display:none;z-index: -1; ">
            <div align="center" style="margin: 4px auto ;"><img src="../Images/SupportWindow/loading.gif" alt="Cargando..."></img></div>
        </div>


    <div id="menu">
        <div id="ULmenu"></div>               
    </div> 

    <script>
     
       // box_('cargando...','<div style="width:200px;height:100px;">Cargando...</div>');
        var elementoFoco=null;   
        var misLienzos=new Array();
        var canalNotificaciones;
        var user='<%=user%>'; 
        var idS='<%=idSession%>';
             
        
        function TamVentana() {
            var Tamanyo = [0, 0];
            if (typeof window.innerWidth != 'undefined')
            {
                Tamanyo = [
                    window.innerWidth,
                    window.innerHeight
                ];
            }
            else if (typeof document.documentElement != 'undefined'
                && typeof document.documentElement.clientWidth !=
                'undefined' && document.documentElement.clientWidth != 0)
            {
                Tamanyo = [
                    document.documentElement.clientWidth,
                    document.documentElement.clientHeight
                ];
            }
            else   {
                Tamanyo = [
                    document.getElementsByTagName('body')[0].clientWidth,
                    document.getElementsByTagName('body')[0].clientHeight
                ];
            }
            return Tamanyo;
        }
        $(document).ready(function (){
                
            canalNotificaciones=io.connect("http://"+sN+":"+pN);
            $(document).keypress(function(e){eventoTeclado(e);});
            $(document).keydown(function(e){eventoTeclado(e);});

            function eventoTeclado(e){
               
                if(elementoFoco!=null){//getElementoLienzoFoco()!=null)
                    e.stopPropagation();
                    eventoTecladoIDE(e);
                }
            }
             
            function resizeWindow(){
                var Tam=TamVentana();

                var h=Tam[1]*0.97;
                var w=Tam[0]*0.98;
                $('#content').css('width',w);
                $('#content').css('height',h);
                $('#parentId').css('width',w);
                $('#parentId').css('height',parseInt((h-50)));
                $('#divRB').css('float','right');
                return Tam;
            
            }
           
            resizeWindow();
            cargarIDE('<%=p%>',parseInt($('#content').css('width')),parseInt($('#content').css('height')));
                 
            
            $(window).resize(function (event) { 
                var t=resizeWindow();
                $('#menu').css('display','none');
                cargarLayouts(t[0],parseInt((t[1]-50)))
           
            });  

      
        });
               
        function eventoClick(e){
            deleteFocus();
        }  
          
                 
    </script>

    <!-- Javascripts para el manejo del chat
    <div id="ff" style="position:absolute;top: 100px; left: 100px;height: 100px;width: 100px;background-color: green;z-index: 10000000">algooo</div>
    --><link type="text/css" rel="stylesheet" media="all" href="../Scripts/chat/chat.css"/>
    <script type="text/javascript" src="../Scripts/chat/chat.js"></script>

</body>

</html>
