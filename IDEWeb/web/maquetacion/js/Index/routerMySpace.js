// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/mySpace'
], function($, _, Backbone, mainHomeView,DB){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'closeSession':'closeSession',
      '*actions':'defaultAction'
      //al momento de enrutar, en necesario que guarde en DB la objeto oauth, para que puede ser leido por la sigiente pagina
      //que se cargue
      
    },
    //es necesario alamcenar el oauth object en memoria y no en disco
    defaultAction: function(actions){
  
      if(localStorage.getItem("logged")=='true'){

          mainHomeView.initialize(true); 

      }else{
          localStorage.removeItem('logged');
          alert('Acceso no permitido');
          location.href="../html/index.html";
      }

      
    },
    closeSession: function(){
      localStorage.removeItem('logged');
      location.href="../html/index.html";
    }


  });

  var initialize = function(){
    
    var app_router = new AppRouter;
    Backbone.history.start();

  };
  return { 
    initialize: initialize
  };
});
