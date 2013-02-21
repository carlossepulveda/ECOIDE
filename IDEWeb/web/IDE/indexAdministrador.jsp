<%-- 
    Document   : indexAdministrador
    Created on : Mar 28, 2012, 2:30:46 PM
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

    //  Document d = fwa.getProgrammerDataXML(user);
    String email = "admin";//d.getElementsByTagName("email").item(0).getTextContent();
    String name = "admin";//d.getElementsByTagName("name").item(0).getTextContent();
    String profile = "admin";//d.getElementsByTagName("profile").item(0).getTextContent();
    String photo = "admin";//d.getElementsByTagName("photo").item(0).getTextContent();

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
        <script src="../Scripts/sharejs/socket.io.js"></script>
        <script src="../Scripts/sharejs/socket.js"></script>




        <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>
        <script  src="../Scripts/jquery/jquery.min.js"></script>

        <script  src="../Scripts/jquery/jquery-ui.min.js"></script>
        <script  src="../Scripts/jquery/jquery.corner.js"></script>


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


        <script src="../Scripts/webSite/indexAdmin.js"></script>
        <link rel="stylesheet" href="../CSS/SupportWindow/viewIndex.css" type="text/css" media="screen" />

        <script src="../Scripts/jquery/tooltip.js" type="text/javascript"></script>
        <style type="text/css">

            html,body{
                width: 100%;
                height:100%;
                margin: 0px;
                padding: 0px;
                overflow: hidden;
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
            #logoUFPS{
                width:auto;
                height: 42px;
                position:absolute;
                left: 13px;
                top:10px;
                margin-bottom: 1px;
            }
            #logoING{
                width:42px;
                height: 42px;
                position:absolute;
                right: 13px;
                top:10px;
                margin-bottom: 1px;
            }
            .lostConexionBall{
                background-color: rgba(255,0,0,0.3);
                z-index:99999;
                top:15px;
                position:absolute;
                border-radius : 10px;
                display: none;
                padding: 15px 20px;
                font-size: 10px;
            }

        </style>
        <script>
            var idS='<%=idSession%>';
            var user='<%=email%>';
            
        </script>

        <title>Index-IDE</title>
    </head>
    <body>
        <div id="content" style="background-color: rgb(186, 186, 186);
             width: 1200px;height: 650px; border: groove;border: gainsboro 5px solid; background-repeat: repeat-x;margin: 4px auto ;">
            <a id="logoUFPS" href="http://www.ufps.edu.co">
                <img style="position:relative;width:100%;height:100%" src="../Images/SupportWindow/ufpshorizontal.png"/>
            </a>
            <a id="logoING" href="http://ingsistemas.ufps.edu.co">
                <img style="position:relative;width:100%;height:100%" src="../Images/SupportWindow/ing_sistemas.png"/>
            </a>
            <div id="encabezado" style="background-color: rgb(186, 186, 186);
                 height: 50px">

                <div style="background-color: rgb(186, 186, 186);
                     background-image: url(../Scripts/dhtmlxSuite/dhtmlxLayout/codebase/imgs/dhxlayout_dhx_skyblue/dhxlayout_bg50.gif);
                     ;width: 500px;height: 50px;float:right;">


                    <div class="divUserInfo" style="float:right;margin-right: 70px;margin-top:15px;color: #871528!important;text-align: center;font-size: 12px">
                        <div style="height:13px;">
                            <img class="iconConexionState" src="../Images/SupportWindow/redBall.png" style="height:17px;width:17px;float:right;position:relative; top:-3px;">
                            <pre style="position:relative;float:right;">Bienvenido !!</pre>
                        </div>
                        <div>

                            <pre><%=name%></pre>

                        </div>
                    </div>

                    <div class="menuLiP" msj="Ayuda" onclick='verAyuda()' style="margin-right: 8px;float:right;position:relative;top: 5px;height:40px;cursor:pointer"><img src="../Images/MenuBar/help.png" class="imge" style="height:100%" /></div>
                    <div class="menuLiP" msj="Cerrar Sesion" onclick='logout()' style="float:right;position:relative;top: 5px;height:40px;cursor:pointer"><img src="../Images/MenuBar/personal.png" class="imge" style="height:100%" /></div>





                </div>

                <div style="background-color: rgb(186, 186, 186);
                     background-image: url(http://localhost:8084/IDEWeb/Scripts/dhtmlxSuite/dhtmlxLayout/codebase/imgs/dhxlayout_dhx_skyblue/dhxlayout_bg50.gif);
                     width: 100px;height: 50px;float:left;">

                </div>

                <div style="background-color: rgb(186, 186, 186);
                     background-image: url(http://localhost:8084/IDEWeb/Scripts/dhtmlxSuite/dhtmlxLayout/codebase/imgs/dhxlayout_dhx_skyblue/dhxlayout_bg50.gif);
                     height: 50px;">

                </div>



            </div>

            <div id="parentId" style="position: relative;width: 1195px; height: 585px; border: #bababa 1px solid; margin: 0px auto;" ></div>
            <div id="listadoSecciones">

                <div id="menuUsuarios" class="divMenuList" >
                    <div class="barMenu"></div>
                    <ul align='left' class="ulOption">
                        <li align='left'><div  class='titleList'><b>Usuarios</b></div>
                            <ul align='left'>
                                <li align='left' class='itemList' onclick="verUsuarios()"><img src="../Images/SupportWindow/userm.png" alt="usuarios"/>&nbsp;Activos</li>
                                <li align='left' class='itemList' onclick="verUsuariosEspera()"><img src="../Images/SupportWindow/usermW.png" alt="usuarios"/>&nbsp;En espera</li>
                                <li align='left' class='itemList' onclick="InformeAcceso()"><img src="../Images/SupportWindow/report.png" alt="informe"/>&nbsp;Informe de Acceso</li>
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
                                <li align='left' class='itemList' onclick="verProyectosCompartidos()"><img src="../Images/Tree/myprojectQC.png" alt="proyectosQcomparto"/>&nbsp;Compartidos</li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div id="menuDetalles" class="divMenuList" >
                    <div class="barMenu"></div>
                    <ul align='left' class="ulOption">
                        <li align='left' ><div  class='titleList'><b>Detalles</b></div>
                            <ul>
                                <li>
                                    <div id="itemDetalles" class='itemList' style="margin-bottom: 5px;overflow: auto;font: 70% sans-serif; "></div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="divDespligue" style="width: 100%">

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
      
                    $('#mide li').hover(function(){
             
                        var index=parseInt($(this).attr('idm'));
              
                        $(this).css('-moz-transform','scale(1.7)' );
                        $(this).css('-webkit-transform','scale(1.7)' );
                        $(this).css('-o-transform','scale(1.7)' );
        
           
            
                    },function(){
             
                        var index=parseInt($(this).attr('idm'));
                        // $('#mide li span').css('display','none');
                        $(this).css('-moz-transform','scale(1)' );
                        $(this).css('-webkit-transform','scale(1)' );
                        $(this).css('-o-transform','scale(1)' );
          
                    });
                    var t=resizeWindow();
                    var w=t[0];
                    var h=t[1]-50;
                
                
                    window.dhxLayout = new dhtmlXLayoutObject("parentId", "2U");
                  
                    dhxLayout.cells("a").setHeight(h);
                    dhxLayout.cells("a").setWidth(parseInt(w*0.2));
                    dhxLayout.cells("a").attachObject("listadoSecciones");
                    dhxLayout.cells("a").setText("Opciones");
                
                    dhxLayout.cells("b").setHeight(h);
                    dhxLayout.cells("b").setWidth(parseInt(w*0.8));
                    dhxLayout.cells("b").attachObject("divDespligue");
                    //dhxLayout.cells("b").hideHeader();
                    dhxLayout.cells("b").setText("");
                   
                    $(window).resize(function (event) {
                        var t=resizeWindow();
                        dhxLayout.cells("a").setHeight(t[1]-50);
                        dhxLayout.cells("a").setWidth(parseInt((t[0])*0.2));
                        dhxLayout.cells("b").setHeight(t[1]-50);
                        dhxLayout.cells("b").setWidth(parseInt((t[0])*0.8));
                        dhxLayout.setSizes();
                    
                    });
                   
                   
                    verUsuarios();
                   
                });
                
            </script>

        </div>
    </body>
</html>
