define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var politic = Backbone.Model.extend({
    urlRoot:'http://fathomless-brushlands-1572.herokuapp.com/policy/get/',
   
    initialize: function(){

    },
    load: function(successHandler,errorHandler){
    	//this.url=this.urlRoot;
    	var that=this;
    	this.fetch({

    		success: function(model,res,options){
    			if(successHandler){
    				
    				successHandler();
    			}
    		},
    		error: function(model, res, options){
    			if(errorHandler){
    				errorHandler();
    			}
    		}


    	});



    }
  
  

    
  });

  return politic;

});