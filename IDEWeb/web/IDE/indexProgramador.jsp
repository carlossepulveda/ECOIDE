<%-- 
    Document   : indexProgramador
    Created on : Mar 28, 2012, 2:28:58 PM
    Author     : cas
--%>

<%@page import="org.w3c.dom.Document"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page session="true"%>
<%
    Facade_WEBApplication fwa = (Facade_WEBApplication) request.getSession().getAttribute("fwa");

    if (fwa == null) {

%>
<jsp:forward page="../IDE/index.html"></jsp:forward>
<%    }


    if (!fwa.isValidSession()) {

%>

<jsp:forward page="../IDE/index.html"></jsp:forward>

<%        }
    String user = fwa.getUser();

    Document d = fwa.getProgrammerDataXML(user);
    String email = d.getElementsByTagName("email").item(0).getTextContent();
    String name = d.getElementsByTagName("name").item(0).getTextContent();
    String profile = d.getElementsByTagName("profile").item(0).getTextContent();
    String photo = d.getElementsByTagName("photo").item(0).getTextContent();
    String dmem = d.getElementsByTagName("dateMembership").item(0).getTextContent();

    String idSession = fwa.getIdSession();
%>
<!DOCTYPE html>
<html>
    <head>
        <link rel="icon" type="image/png" href="../Images/SupportWindow/favicon.png" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta http-equiv="cache-control" content="no-Store"/>
        <meta http-equiv="Pragma" content="no-cache"></meta>
        <script src="../Scripts/config.js"></script>
        <script type="text/javascript" src="../Scripts/json/json_sans_eval.js"></script>
        <script type="text/javascript" src="../Scripts/jquery/jquery.min.js"></script> 
        <script  src="../Scripts/jquery/jquery-ui.min.js"></script>
        <script  src="../Scripts/jquery/jquery.imgResize.js"></script>
        <script  src="../Scripts/jquery/jquery.tools.min.js"></script>
        <script src="../Scripts/sharejs/socket.io.js"></script>
        <script src="../Scripts/sharejs/socket.js"></script>




        <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>
        <script  src="../Scripts/jquery/jquery.min.js"></script>

        <script  src="../Scripts/jquery/jquery-ui.min.js"></script>
        <script  src="../Scripts/jquery/jquery.corner.js"></script>
        <script  src="../Scripts/jquery/switchButton.js"></script>


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



        <script type="text/javascript" src="../Scripts/contextualMenu/menu.js"></script>
        <script type="text/javascript" src="../Scripts/json/json_sans_eval.js"></script>
        <link rel="stylesheet" href="../Scripts/contextualMenu/main.css" type="text/css" media="screen" />



        <link rel="STYLESHEET" type="text/css" href="../Scripts/IDE/cssBarraTools.css"/>

        <link rel="stylesheet" type="text/css" href="../Scripts/dhtmlxSuite/dhtmlxLayout/codebase/skins/dhtmlxlayout_dhx_skyblue.css"/>
        <link rel="stylesheet" type="text/css" href="../Scripts/dhtmlxSuite/dhtmlxLayout/codebase/skins/dhtmlxlayout_dhx_black.css"/>
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
        <link rel="stylesheet" type="text/css" href="../Scripts/dhtmlxSuite/dhtmlxForm/codebase/dhtml_custom.css"/>
        <script src="../Scripts/dhtmlxSuite/dhtmlxForm/codebase/dhtmlxcommon.js"></script>
        <script src="../Scripts/dhtmlxSuite/dhtmlxForm/codebase/dhtmlxform.js"></script>


        <script src="../Scripts/webSite/indexUser.js"></script>
        <link rel="stylesheet" href="../CSS/SupportWindow/viewIndex.css" type="text/css" media="screen" />

 <script src="../Scripts/jquery/tooltip.js" type="text/javascript"></script>

        <style type="text/css">

            .bubblewrap{
                list-style-type:none;
                margin:0;
                padding:0;
            }

            .bubblewrap li{
                display:inline;
                width: 25%!important;
                height:60px;
            }

            .bubblewrap li .imge{
                width: 30px; /* width of each image.*/
                height: 30px; /* height of each image.*/
                border:0;
                margin-right: 12px; /*spacing between each image*/
                -webkit-transition:-webkit-transform 0.1s ease-in; /*animate transform property */
                -o-transition:-o-transform 0.1s ease-in; /*animate transform property in Opera */
            }

            .bubblewrap li .imgr{
                width: 30px; /* width of each image.*/
                height: 30px; /* height of each image.*/
                border:0;
                margin-right: 12px; /*spacing between each image*/
                -webkit-transition:-webkit-transform 0.1s ease-in; /*animate transform property */
                -o-transition:-o-transform 0.1s ease-in; /*animate transform property in Opera */
            }


            .bubblewrap .cnot{
                display:inline;
                width: 65px;
                height:60px;
            }

            .bubblewrap li .cnot{
                width: 30px; /* width of each image.*/
                height: 30px; /* height of each image.*/
                border:0;
                margin-right: 12px; /*spacing between each image*/
                -webkit-transition:-webkit-transform 0.1s ease-in; /*animate transform property */
                -o-transition:-o-transform 0.1s ease-in; /*animate transform property in Opera */
            }

            .bubblewrap li .cnot:hover{
                -moz-transform:scale(1.5); /*scale up image 1.8x*/
                -webkit-transform:scale(1.5);
                -o-transform:scale(1.5);
            }

            html,body{
                width: 100%;
                height:100%;
                margin: 0px;
                padding: 0px;
                overflow: hidden;
                font-family: "Lucida Grande","Lucida Sans Unicode",Verdana,Arial,Helvetica,sans-serif!important;
            }
         
          
            .titleList{
                font-weight:  normal;
            }
            #logoUFPS{
                width:auto;
                height: 44px;
                position:absolute;
                left: 13px;
                top:10px;
                margin-bottom: 1px;
            }
            #logoING{
                width:44px;
                height: 44px;
                position:absolute;
                right: 13px;
                top:10px;
                margin-bottom: 1px;
            }
            #cnot[noti="0"]{
                display:none!important;
            }


        </style> 
        <style>
            fieldset{
                background: none repeat scroll 0 0 #EBF4FB;
                border: none;
                border-radius: 7px 7px 7px 7px;
                font-family: "Lucida Grande","Lucida Sans Unicode",Verdana,Arial,Helvetica,sans-serif;
                margin: 5px;
            }
            .inputForm{
                border: 1px solid #7997B1;
                border-radius: 4px 4px 4px 4px;
                font-size: 12px;
                width: 100px;

            }
            .inputForm2{
                border: 1px solid #7997B1;
                border-radius: 4px 4px 4px 4px;
                font-size: 14px;
                width: 100px;

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
                font-size: 12px; 
                font-weight: bold;
                text-align: left !important;               
            }        
            #mide{
                z-index: 99999999999999;
            }
            .qtip{
                z-index: 99999999999999;
            }

        </style>
        <script>
            var idS='<%=idSession%>';
            var user='<%=email%>';
            var programmer={
                name: '<%=name%>', 
                profile: '<%=profile%>',
                photo: '<%=photo%>', 
                dateMembership: '<%=dmem%>'
            };
           
        </script>

        <title>Index-IDE</title>
    </head>
    <body>
        
        <div id="content" style="width: 100%!important;height: 100%!important;margin: 0!important; background-color: #bababa;background-image: url('../Scripts/dhtmlxSuite/dhtmlxLayout/codebase/imgs/dhxlayout_dhx_skyblue/dhxlayout_bg50.gif'); background-repeat: repeat-x; border: groove;border: gainsboro 5px solid;margin: 4px auto ;">
            <a id="logoUFPS" href="http://www.ufps.edu.co"><img style="position:relative;width:100%;height:100%" src="../Images/SupportWindow/ufpshorizontal.png"/></a>
            <a id="logoING" href="http://ingsistemas.ufps.edu.co"><img style="position:relative;width:100%;height:100%" src="../Images/SupportWindow/ingsistemas2.png"/></a>
            
            <div id="encabezado" style="height: 35px;margin-bottom: 3px">

                <!--  <div style="width: 300px;height: 50px;float:right;">
      
                      <div>
                          <div style="float:right;margin-top: 3px;margin-right: 3px;margin-bottom: 3px;" id="fotoInicioPresentacion">
                              <img src="../photo/<%=email%>/<%=photo%>"  imgResizable="true" mw="40" mh="40"/>
                          </div>
                          <div style="float:right;margin-right: 10px;margin-top: 10px;">
                              <div align="right"><%=name%></div>
                              <a href="#" onclick="logout()">Cerrar sesion</a>
                          </div>
                          
                      </div>
                
                      
  
                  </div>-->

                <div style="width:200px;height: 30px;margin: 10px auto;z-index:700;">

                    <ul class="bubblewrap" id="mide" idm="mide" style="width:100%">

                        <li id="i0" idm="0" class="menuLiP" statico="false" msj="Iniciar IDE"><a href="#" onclick="getIDE()"><img src="../Images/MenuBar/runIDE.png" class="imge"/></a></li>
                        <li id="i1" idm="1" class="menuLiP" statico="false" msj="Crear Proyecto"><a href="#" onclick="uiCrearProyecto()"><img src="../Images/MenuBar/pack.png" class="imge"/></a></li>
                        <li id="i2" idm="2" class="menuLiP" statico="false" msj="Ver Notificaciones">
                            
                            <a href="#" onclick="verNotificaciones()">
                                <img src="../Images/MenuBar/notification.png" class="imge"/>
                            </a>
                           
                        </li>
                        <li id="i3" idm="3" class="menuLiP" msj="Cerra Sesion" onclick='logout()' ><a href="#" onclick=""><img src="../Images/MenuBar/personal.png" class="imge"/></a></li>
                    </ul>
                </div>


            </div>

            <div id="parentId" style="position: relative;width: 99.6%!important; height: 99%!important; border: #bababa 1px solid; margin: 0;" ></div>
            <div id="listadoSecciones" style="overflow:auto">
                <div id="menuPefil" class="divMenuList" >
                    <div class="barMenu"></div>
                    <ul align='left' class="ulOption">
                        <li align='left'><div  class='titleList'><b>Perfil</b></div>
                            <ul align='left'>
                                <li align='left' class='itemList' onclick="verPerfil()"><img src="../Images/SupportWindow/person.png" alt="perfil"/>&nbsp;Ver Perfil</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div id="menuProyectos" class="divMenuList" >
                    <div class="barMenu"></div>
                    <ul align='left' class="ulOption">
                        <li align='left'><div  class='titleList'><b>Proyectos</b></div>
                            <ul align='left'>
                                <li align='left' class='itemList' onclick="verProyectos()"><img src="../Images/Tree/project.png" alt="proyectos"/>&nbsp;Ver Todos</li>
                                <li align='left' class='itemList' onclick="verMisProyectos()"><img src="../Images/Tree/myproject.png" alt="misProyectos"/>&nbsp;Mis Proyectos</li>
                                <li align='left' class='itemList' onclick="verQMProyectos()"><img src="../Images/Tree/myprojectQM.png" alt="proyectosQcomparten"/>&nbsp;Que me comparten</li>
                                <li align='left' class='itemList' onclick="verQCProyectos()"><img src="../Images/Tree/myprojectQC.png" alt="proyectosQcomparto"/>&nbsp;Que comparto</li>
                            </ul>
                        </li>
                    </ul>
                </div>
               <!-- <div id="menuAyuda" class="divMenuList">
                    <div class="barMenu"></div>
                    <ul align='left' class="ulOption" >
                        <li align='left' ><div  class='titleList'><b>Ayuda</b></div>
                            <ul align='left'>
                                <li align='left' class='itemList'><img src="../Images/SupportWindow/help.png" alt="verVideos"/>&nbsp;Ver Videos</li>
                            </ul>
                        </li>
                    </ul>
                </div>-->
                <div id="menuDetalles" class="divMenuList" >
                    <div class="barMenu"></div>
                    <ul align='left' class="ulOption">
                        <li align='left' ><div  class='titleList'><b>Detalles</b></div>
                            <ul>
                                <li>
                                    <div id="itemDetalles" class='itemList' style="margin-bottom: 5px;overflow: auto;"></div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="divDespligue" style="width: 100%;height: 100%">

            </div>

            <script>
                
              
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
                   
                    function resizeWindow(){
                        var Tam=TamVentana();

                        var h=Tam[1]*0.97;
                        var w=Tam[0]*0.98;
                        $('#content').css('width',w);
                        $('#content').css('height',h);
                        $('#parentId').css('width',w);
                        $('#parentId').css('height',parseInt((h-50)));
                        return Tam;

                    }
                   $('#cnot').corner().hover(function(){
                         $(this).parent().css('-moz-transform','scale(1)' );
                        $(this).parent().css('-webkit-transform','scale(1)' );
                        $(this).parent().css('-o-transform','scale(1)' );
                    });
                
                
                
                
            
            /******
             *caso especial de la foto del estudiante
                    $('#mide .menuLiPS').tooltip({
                        track: true,
                        delay: 0, 
                        showURL: false, 
                        opacity: 1, 
                        fixPNG: true, 
                        showBody: " - ", 
                        extraClass: "pretty fancy", 
                        top: -15, 
                        left: 5 ,
                        bodyHandler: function() {
                            return $('<div><div style="float:left;margin-top: 3px;margin-right: 3px;margin-bottom: 3px;width:80px;" id="fotoInicioPresentacion">\n\
                                                <img src="../photo/<%=email%>/<%=photo%>"  imgResizable="true" mw="40" mh="40"/>\n\
                                            </div>\n\
                                            <div style="height:100%"><span><%=name%></span><br/><span><%=email%></span><br/><div style="bottom:-25px;right:-25px;position:relative;"><input id="botonAceptar" type="button" class="botonForm" value="Cerrar Session" onclick="logout()" /></div></div>\n\
                                    </div>');
                        }
                    }).hover(function(){$('#tooltip').show();});*******/
                    var t=resizeWindow();
                    var w=t[0];
                    var h=t[1]-70;
                    var as='dhx_skyblue';
                    window.dhxLayout = new dhtmlXLayoutObject("parentId", "2U",as);
                
                  
                    dhxLayout.cells("a").setHeight(h);
                    dhxLayout.cells("a").setWidth(parseInt(w*0.2));
                    dhxLayout.cells("a").attachObject("listadoSecciones");
                    //dhxLayout.cells("a").hideHeader();
                    dhxLayout.cells("a").setText("Opciones");
                
                    dhxLayout.cells("b").setHeight(h);
                    dhxLayout.cells("b").setWidth(parseInt(w*0.8));
                    dhxLayout.cells("b").attachObject("divDespligue");
                    //dhxLayout.cells("b").hideHeader();
                    dhxLayout.cells("b").setText("Bienvenido !!!");
                
                
                    $(window).resize(function (event) { 
                        var t=resizeWindow();
                    
                        dhxLayout.cells("a").setHeight(t[1]-70);
                        dhxLayout.cells("a").setWidth(parseInt((t[0])*0.2));
                        dhxLayout.cells("b").setHeight(t[1]-70);
                        dhxLayout.cells("b").setWidth(parseInt((t[0])*0.8));
                        dhxLayout.setSizes();
           
    }).click(function(){
        
        
    var left =document.getElementById('i2').offsetLeft+15;
	var top = document.getElementById('i2').offsetTop-15;
       
        $('#cnot').css('display','block');
        $('#cnot').css('top',top);
        $('#cnot').css('left',left);
        $('#cnot').css('position','absolute');
        
    }); 
                    verProyectos();
                });
            </script>

        </div>
     
       
       <div id="cnot" style="display:none;background-color: red;" noti="0">0</div>
       
    </body>
</html>