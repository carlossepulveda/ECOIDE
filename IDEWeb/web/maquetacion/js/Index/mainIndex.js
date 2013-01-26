
require.config({
  paths: {
    jquery : '../libs/jquery/jquery-min',
    underscore : '../libs/underscore/underscore-min',
    backbone : '../libs/backbone/backbone',
    text : '../libs/require/text',
    templates: '../../templates'
  },

  shim : {
    'backbone' : {
    
      deps : ['underscore', 'jquery'],
     
      exports : 'Backbone'
    }
  }

});

require([

 
  'appIndex',

], function(App){

  App.initialize();
});