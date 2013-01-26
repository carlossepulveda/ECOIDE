
define([
  'jquery', 
  'underscore', 
  'backbone',
  'routerMySpace' 
], function($, _, Backbone, Router){
  var initialize = function(){  	
  
    Router.initialize();
  }  

  return { 
    initialize: initialize
  };
});