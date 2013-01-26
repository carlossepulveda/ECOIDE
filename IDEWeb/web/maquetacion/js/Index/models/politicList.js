define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var politicList = Backbone.Model.extend({
    urlRoot:'http://fathomless-brushlands-1572.herokuapp.com/policy/list/', 
   
    initialize: function(){

    },
    load: function(to,from,successHandler,errorHandler){
        this.url=this.urlRoot+to+'/'+from+'/test/test';
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

  return politicList;

});