<%@ page contentType="text/html; charset=utf-8" language="java" %>
<%@ page import="java.sql.*,java.lang.*,java.util.*,org.apache.commons.fileupload.*,java.io.*" %>  
<%@ page errorPage="error.jsp" %>
<%@ page pageEncoding="UTF-8" %>
<%request.setCharacterEncoding("UTF-8"); %>


<% String usu="n"+session.getAttribute("usuario");
   String usuario=(String)session.getAttribute("usuario");
   String tipo="", tesis="",sigant2="", opc="",
	ruta="", descripcion="", formato="";
	 	
	DiskFileUpload upload = new DiskFileUpload();
	List items = upload.parseRequest(request);
	Iterator iter = items.iterator();
	while (iter.hasNext())
	 {
    	FileItem item = (FileItem) iter.next();
		if(item.isFormField())
		{	String name = item.getFieldName();
			String value =item.getString();   
			if(name.equals("sigant2"))sigant2=value;
			if(name.equals("opc"))opc=value;
		}else{  sigant2=sigant2.trim();
		       String fileName = item.getName();			
    		        int punto = fileName.lastIndexOf('.');
    		        formato = fileName.substring(punto + 1).toLowerCase();
		           if(formato.equals("pdf"))
			       {	String filePath = "/home/cas/Escritorio/"+fileName;
        		        item.write(new File(filePath));
        	      }else{ %><script >
		                    alert("El archivo debe ser pdf");
	 		             </script>
		              <%}
           }
  }%>
