# This class exposes an authenticated interface to the model code.
#
# This is used by all the client frontends to interact with the server.

hat = require 'hat'
types = require '../types'


# This module exports a function which you can call with the model and options. Calling the function
# returns _another_ function which you can call when clients connect.
module.exports = (model, options) ->

  #pathUsers
  pathUsers= "Users"

  #manejador de lectura y escritura en disco
  fs=require('fs')

  # By default, accept any client's connection + data submission.
  # Don't let anyone delete documents though.
  auth =(client, action) ->
    if action.type in ['connect', 'read', 'create', 'update'] 
	    action.accept() 
	    console.warn JSON.stringify(action)
	    if action.name is 'create' 
               #model.applyOp action.docName, {op:[{i:"", p:0}], v:0} 
               t=fs.readFileSync __dirname + '/../../../../'+getPathFile(action.docName), "utf8"
               xn= action.docName.split ";"
               np=xn[3].split ":"
               ext=np[1].split "."
               #console.warn "********"+ext[1]+"   "+t
               if ext[1] is "frml" 
               	model.applyOp action.docName, {op:  [{p:[], od:null, oi: JSON.parse t }]   , v:0}, (error) ->  console.log error if error
                
               else
                model.applyOp action.docName, {op:[{i:t, p:0}], v:0}
              
	      

                           
    else action.reject()

  getPathFile= (idNodo)->
   
     xn= idNodo.split ";"
     np=xn[3].split ":"
     pack= "/"+np[0]
     packs=np[0].split "."
     for x in [1..packs.lenght-1]
       pack+="/"+packs[x]    


     pack="" if pack is "/Default Package" or pack is "/*.*"
     #if(xn[0] is 'GUINode')
        #console.warn "es una GUI"
        #np[1]="gui.frml"
     console.warn pathUsers+"/"+xn[2]+"/projects/"+xn[1]+"/src"+pack+"/"+np[1]
     return pathUsers+"/"+xn[2]+"/projects/"+xn[1]+"/src"+pack+"/"+np[1]


  # At some stage, I'll probably pull this out into a class. No rush though.
  class Client
    constructor: (data) ->
      @id = hat()
      @connectTime = new Date
      @headers = data.headers
      @remoteAddress = data.remoteAddress

      # This is a map from docName -> listener function
      @listeners = {}

      # We have access to these with socket.io, but I'm not sure we can support
      # these properties on the REST API or sockjs, etc.
      #xdomain: data.xdomain
      #secure: data.secure

    # This is a helper method which wraps auth() above. It creates the action and calls
    # auth. If authentication succeeds, acceptCallback() is called if it exists. otherwise
    # userCallback(true) is called.
    #
    # If authentication fails, userCallback('forbidden', null) is called.
    #
    # If supplied, actionData is turned into the action object passed to auth.
    doAuth: (actionData, name, userCallback, acceptCallback) ->
      action = actionData || {}
      action.name = name
      console.warn "nombre de la operacion es : "+name
      action.type = switch name
        when 'connect' then 'connect'
        when 'create' then 'create'
        when 'get snapshot', 'get ops', 'open' then 'read'
        when 'submit op' then 'update'
        when 'delete' then 'delete'
        else throw new Error "Invalid action name #{name}"

      responded = false
      action.reject = ->
        throw new Error 'Multiple accept/reject calls made' if responded
        responded = true
        userCallback 'forbidden', null
      action.accept = ->
        throw new Error 'Multiple accept/reject calls made' if responded
        responded = true
        acceptCallback()

      auth this, action

    disconnect: ->
      model.removeListener docName, listener for docName, listener of @listeners

    getOps: (docName, start, end, callback) ->
      @doAuth {docName, start, end}, 'get ops', callback, ->
        model.getOps docName, start, end, callback

    getSnapshot: (docName, callback) ->
      @doAuth {docName}, 'get snapshot', callback, ->
        model.getSnapshot docName, callback
    
    create: (docName, type, meta, callback) ->
      # We don't check that types[type.name] == type. That might be important at some point.
     
      type = types[type] if typeof type == 'string' 
      console.warn "Este es eltipo en el metodo create de auth: "+type.name
      # The action object has a 'type' property already. Hence the doc type is renamed to 'docType'
      @doAuth {docName, docType:type, meta}, 'create', callback, =>
        model.create docName, type, meta, callback

    submitOp: (docName, opData, callback) ->
      console.warn "SUBMITOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP"
      opData.meta ||= {}
      opData.meta.source = @id

      @doAuth {docName, op:opData.op, v:opData.v, meta:opData.meta}, 'submit op', callback, =>
        console.warn "doAuth  "+docName
        sdocname=docName.split ";"
        model.applyOp docName, opData, callback, getPathFile(docName), sdocname[0]

    # Delete the named operation.
    # Callback is passed (deleted?, error message)
    delete: (docName, callback) ->
      @doAuth {docName}, 'delete', callback, =>
        model.delete docName, callback
    
    # Open the named document for reading. Just like model.listen, version is optional.
    listen: (docName, version, listener, callback) ->
      authOps = if version?
        # If the specified version is older than the current version, we have to also check that the
        # client is allowed to get ops from the specified version.
        #
        # We _could_ check the version number of the document and then only check getOps if
        # the specified version is old, but an auth check is almost certainly faster than a db roundtrip.
        (c) => @doAuth {docName, start:version, end:null}, 'get ops', callback, c
      else
        (c) -> c()

      authOps =>
        @doAuth {docName, v:version if version?}, 'open', callback, =>
          return callback? 'Document is already open' if @listeners[docName]
          @listeners[docName] = listener

          model.listen docName, version, listener, (error, v) =>
            if error
              delete @listeners[docName]

            callback? error, v

    removeListener: (docName) ->
      console.warn "remove listener en authhhh : "+docName
      throw new Error 'Document is not open' unless @listeners[docName]
      model.removeListener docName, @listeners[docName]
      delete @listeners[docName]
    #Metodo personalizado que cierrar un documento, borrandolo de memoria
    closeDocument: (docName) ->
      console.warn "llego a eliminar documento"
      model.delete(docName,console.warn "elimino documento ")

  # Finally, return a function which takes client data and returns an authenticated client object
  # through a callback.
  (data, callback) ->
    client = new Client data
    client.doAuth null, 'connect', callback, ->
      # Maybe store a set of clients? Is that useful?
      callback null, client

