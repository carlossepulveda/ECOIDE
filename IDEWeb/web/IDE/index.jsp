<%-- 
    Document   : index
    Created on : 6/12/2011, 07:36:34 AM
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
    
 
        
         if(fwa.getTypeUser().equals("programmer")){
                %>
                        <jsp:forward page="../IDE/indexProgramador.jsp"></jsp:forward>
                <%
           }
         if(fwa.getTypeUser().equals("administrator")){
                %>
                        <jsp:forward page="../IDE/indexAdministrador.jsp"></jsp:forward>
                <%
           }
    

%>
