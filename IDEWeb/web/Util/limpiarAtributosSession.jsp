<%-- 
    Document   : limpiarAtributosSession
    Created on : 22/12/2011, 06:17:24 PM
    Author     : cas
--%>

<%@page import="java.util.Enumeration"%>
<%@page contentType="text/plain" pageEncoding="UTF-8"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>

<%


String answ="wrong";


Facade_WEBApplication fwa=(Facade_WEBApplication)request.getSession().getAttribute("fwa");

if(fwa==null){
    


}
else{

        Enumeration<String> x=request.getSession().getAttributeNames();
            while(x.hasMoreElements()){
                String n=x.nextElement();
                
                if(!n.equals("fwa")){
                    request.getSession().removeAttribute(n);
                                       }
            }
}
%>
