<%@page contentType="text/html" pageEncoding="UTF-8"%>          <%                String clase=request.getParameter("clase");                String jar=request.getParameter("jar");           %>           <html>                 <applet CODE= "<%=clase%>.class"                 archive="<%=jar%>.jar,../lib/AbsoluteLayout.jar,../lib/mongo-2.10.1.jar"                 CODEBASE="." WIDTH="800"   HEIGHT="800" value="Su navegador debe soportar la visualizacion de applet para poder visualizar">           </html>
