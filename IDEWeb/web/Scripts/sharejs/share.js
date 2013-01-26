((function(){
    var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q=function(a,b){
        return function(){
            return a.apply(b,arguments)
            }
        },r=Array.prototype.slice;
window.sharejs=h={
    version:"0.5.0-pre"
},k=function(a){
    return setTimeout(a,0)
    },c=function(){
    function a(){}
    return a.prototype.on=function(a,b){
        var c;
        return this._events||(this._events={}),(c=this._events)[a]||(c[a]=[]),this._events[a].push(b),this
        },a.prototype.removeListener=function(a,b){
        var c,d,e;
        this._events||(this._events={}),d=(e=this._events)[a]||(e[a]=[]),c=0;
        while(c<d.length)d[c]===b&&(d[c]=void 0),c++;
        return k(q(function(){
            var b;
            return this._events[a]=function(){
                var c,d,e=this._events[a],f=[];
                for(c=0,d=e.length;c<d;c++)b=e[c],b&&f.push(b);
                return f
                }.call(this)
            },this)),this
        },a.prototype.emit=function(){
        var a,b,c,d,e,f=arguments[0],g=2<=arguments.length?r.call(arguments,1):[];
        if((d=this._events)!=null?!d[f]:!void 0)return this;
        e=this._events[f];
        for(b=0,c=e.length;b<c;b++)a=e[b],a&&a.apply(this,g);
        return this
        },a
    }(),c.mixin=function(a){
    var b=a.prototype||a;
    return b.on=c.prototype.on,b.removeListener=c.prototype.removeListener,b.emit=c.prototype.emit,a
    },h._bt=e=function(a,b,c,d){
    var e,f=function(a,c,d,e){
        return b(d,a,c,"left"),b(e,c,a,"right")
        };
        
    return a.transformX=a.transformX=e=function(a,b){
        var g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y;
        c(a),c(b),k=[];
        for(p=0,t=b.length;p<t;p++){
            o=b[p],j=[],g=0;
            while(g<a.length){
                l=[],f(a[g],o,j,l),g++;
                if(l.length===1)o=l[0];
                else{
                    if(l.length===0){
                        x=a.slice(g);
                        for(q=0,u=x.length;q<u;q++)h=x[q],d(j,h);
                        o=null;
                        break
                    }
                    y=e(a.slice(g),l),i=y[0],n=y[1];
                    for(r=0,v=i.length;r<v;r++)h=i[r],d(j,h);
                    for(s=0,w=n.length;s<w;s++)m=n[s],d(k,m);
                    o=null;
                    break
                }
            }
            o!=null&&d(k,o),a=j
            }
            return[a,k]
    },a.transform=a.transform=function(a,c,d){
    var f,g,h,i,j;
    if(d!=="left"&&d!=="right")throw new Error("type must be 'left' or 'right'");
    return c.length===0?a:a.length===1&&c.length===1?b([],a[0],c[0],d):d==="left"?(i=e(a,c),f=i[0],h=i[1],f):(j=e(c,a),h=j[0],g=j[1],g)
    }
},m={},m.name="text",m.create=m.create=function(){
    return""
    },l=function(a,b,c){
    return a.slice(0,b)+c+a.slice(b)
    },f=function(a){
    var b,c;
    if(typeof a.p!="number")throw new Error("component missing position field");
    c=typeof a.i,b=typeof a.d;
    if(!(c==="string"^b==="string"))throw new Error("component needs an i or d field");
    if(!(a.p>=0))throw new Error("position cannot be negative")
        },g=function(a){
    var b,c,d;
    for(c=0,d=a.length;c<d;c++)b=a[c],f(b);
    return!0
    },m.apply=function(a,b){
    var c,d,e,f;
    g(b);
    for(e=0,f=b.length;e<f;e++){
        c=b[e];
        if(c.i!=null)a=l(a,c.p,c.i);
        else{
            d=a.slice(c.p,c.p+c.d.length);
            if(c.d!==d)throw new Error("Delete component '"+c.d+"' does not match deleted text '"+d+"'");
            a=a.slice(0,c.p)+a.slice(c.p+c.d.length)
            }
        }
    return a
},m._append=d=function(a,b){
    var c,d,e;
    if(b.i===""||b.d==="")return;
    return a.length===0?a.push(b):(c=a[a.length-1],c.i!=null&&b.i!=null&&c.p<=(d=b.p)&&d<=c.p+c.i.length?a[a.length-1]={
        i:l(c.i,b.p-c.p,b.i),
        p:c.p
        }:c.d!=null&&b.d!=null&&b.p<=(e=c.p)&&e<=b.p+b.d.length?a[a.length-1]={
        d:l(b.d,c.p-b.p,c.d),
        p:b.p
        }:a.push(b))
    },m.compose=function(a,b){
    var c,e,f,h;
    g(a),g(b),e=a.slice();
    for(f=0,h=b.length;f<h;f++)c=b[f],d(e,c);
    return e
    },m.compress=function(a){
    return m.compose([],a)
    },m.normalize=function(a){
    var b,c,e,f,g=[];
    if(a.i!=null||a.p!=null)a=[a];
    for(c=0,e=a.length;c<e;c++)b=a[c],(f=b.p)==null&&(b.p=0),d(g,b);
    return g
    },o=function(a,b,c){
    return b.i!=null?b.p<a||b.p===a&&c?a+b.i.length:a:a<=b.p?a:a<=b.p+b.d.length?b.p:a-b.d.length
    },m.transformCursor=function(a,b,c){
    var d,e,f;
    for(e=0,f=b.length;e<f;e++)d=b[e],a=o(a,d,c);
    return a
    },m._tc=n=function(a,b,c,e){
    var f,h,i,j,k,l;
    g([b]),g([c]);
    if(b.i!=null)d(a,{
        i:b.i,
        p:o(b.p,c,e==="right")
        });
    else if(c.i!=null)l=b.d,b.p<c.p&&(d(a,{
        d:l.slice(0,c.p-b.p),
        p:b.p
        }),l=l.slice(c.p-b.p)),l!==""&&d(a,{
        d:l,
        p:b.p+c.i.length
        });
    else if(b.p>=c.p+c.d.length)d(a,{
        d:b.d,
        p:b.p-c.d.length
        });
    else if(b.p+b.d.length<=c.p)d(a,b);
    else{
        j={
            d:"",
            p:b.p
            },b.p<c.p&&(j.d=b.d.slice(0,c.p-b.p)),b.p+b.d.length>c.p+c.d.length&&(j.d+=b.d.slice(c.p+c.d.length-b.p)),i=Math.max(b.p,c.p),h=Math.min(b.p+b.d.length,c.p+c.d.length),f=b.d.slice(i-b.p,h-b.p),k=c.d.slice(i-c.p,h-c.p);
        if(f!==k)throw new Error("Delete ops delete different text in the same region of the document");
        j.d!==""&&(j.p=o(j.p,c),d(a,j))
        }
        return a
    },i=function(a){
    return a.i!=null?{
        d:a.i,
        p:a.p
        }:{
        i:a.d,
        p:a.p
        }
    },m.invert=function(a){
    var b,c,d,e=a.slice().reverse(),f=[];
    for(c=0,d=e.length;c<d;c++)b=e[c],f.push(i(b));
    return f
    },h.types||(h.types={}),e(m,n,g,d),h.types.text=m,m.api={
    provides:{
        text:!0
        },
    getLength:function(){
        return this.snapshot.length
        },
    getText:function(){
        return this.snapshot
        },
    insert:function(a,b,c){
        var d=[{
            p:a,
            i:b
        }];
        return this.submitOp(d,c),d
        },
    del:function(a,b,c){
        var d=[{
            p:a,
            d:this.snapshot.slice(a,a+b)
            }];
        return this.submitOp(d,c),d
        },
    _register:function(){
        return this.on("remoteop",function(a){
            var b,c,d,e=[];
            for(c=0,d=a.length;c<d;c++)b=a[c],e.push(b.i!==void 0?this.emit("insert",b.p,b.i):this.emit("delete",b.p,b.d));
            return e
            })
        }
    },b=function(a,b,c,d,e){
    var f,g,h,i,j,k,l,m,n,o;
    this.name=b,this.version=c,this.type=d,this.snapshot=e;
    if(this.type.compose==null)throw new Error("Handling types without compose() defined is not currently implemented");
    g=null,f=[],k=null,j=[],l={},n=this.type.transformX||q(function(a,b){
        var c=this.type.transform(a,b,"left"),d=this.type.transform(b,a,"right");
        return[c,d]
        },this),i=q(function(a,b){
        var c=this.snapshot;
        this.snapshot=this.type.apply(this.snapshot,a),this.emit("change",a,c);
        if(b)return this.emit("remoteop",a,c)
            },this),this.flush=q(function(){
        if(g===null&&k!==null)return g=k,f=j,k=null,j=[],a.send({
            doc:this.name,
            op:g,
            v:this.version
            },q(function(a,b){
            var c,e,h,j,m,o,p,q=g;
            g=null;
            if(a){
                if(d.invert)e=this.type.invert(q),k&&(p=n(k,e),k=p[0],e=p[1]),i(e,!0);else throw new Error("Op apply failed ("+b.error+") and the OT type does not define an invert function.");
                for(h=0,m=f.length;h<m;h++)c=f[h],c(a)
                    }else{
                if(b.v!==this.version)throw new Error("Invalid version from server");
                l[this.version]=q,this.version++;
                for(j=0,o=f.length;j<o;j++)c=f[j],c(null,q)
                    }
                    return this.flush()
            },this))
        },this),this._onOpReceived=function(a){
        var b,c,d,e;
        if(a.v<this.version)return;
        if(a.doc!==this.name)throw new Error("Expected docName '"+this.name+"' but got "+a.doc);
        if(a.v!==this.version)throw new Error("Expected version "+this.version+" but got "+a.v);
        return c=a.op,l[this.version]=c,b=c,g!==null&&(d=n(g,b),g=d[0],b=d[1]),k!==null&&(e=n(k,b),k=e[0],b=e[1]),this.version++,i(b,!0)
        },this.submitOp=function(a,b){
        return this.type.normalize!=null&&(a=this.type.normalize(a)),this.snapshot=this.type.apply(this.snapshot,a),k!==null?k=this.type.compose(k,a):k=a,b&&j.push(b),this.emit("change",a),setTimeout(this.flush,0)
        },this.close=function(b){
        return a.socket===null?typeof b=="function"?b():void 0:(a.send({
            doc:this.name,
            open:!1
            },q(function(){
            typeof b=="function"&&b(),this.emit("closed")
            },this)),this.emit("closing"))
        },this.carlos=function(){a.send({open:!1,instruccion:'closeDocument'})};
        
    if(this.type.api){
        o=this.type.api;
        for(h in o)m=o[h],this[h]=m;typeof this._register=="function"&&this._register()
        }else this.provides={};
        
    return this
    },c.mixin(b),h.Doc=b,p||(p=h.types);
if(!window.io)throw new Error("Must load socket.io before this library");
j=window.io,a=function(){
    function a(a){
        this.onMessage=q(this.onMessage,this),this.connected=q(this.connected,this),this.disconnected=q(this.disconnected,this),this.docs={},this.handlers={},this.state="connecting",this.socket=j.connect(a,{
            "force new connection":!0
            }),this.socket.on("connect",this.connected),this.socket.on("disconnect",this.disconnected),this.socket.on("message",this.onMessage),this.socket.on("connect_failed",q(function(a){
            var b,c,d,e,f,g,h;
            a==="unauthorized"&&(a="forbidden"),this.socket=null,this.emit("connect failed",a),g=this.handlers,h=[];
            for(d in g)e=g[d],h.push(function(){
                var d=[];
                for(f in e)c=e[f],d.push(function(){
                    var d,e,f=[];
                    for(d=0,e=c.length;d<e;d++)b=c[d],f.push(b(a));
                    return f
                    }());return d
                }());return h
            },this))
        }
        return a.prototype.disconnected=function(){
        return this.emit("Se ha perdido la conexion con\nel servidor OT, no es posible\ngarantizar la edicion concurrente"),this.socket=null
        },a.prototype.connected=function(){
        return this.emit("connect")
        },a.prototype.send=function(a,b){
        var c,d,e,f,g;
        if(this.socket===null)throw new Error("Cannot send message "+JSON.stringify(a)+" to a closed connection");
        e=a.doc,e===this.lastSentDoc?delete a.doc:this.lastSentDoc=e,this.socket.json.send(a);
        if(b)return f=a.open===!0?"open":a.open===!1?"close":a.create?"create":a.snapshot===null?"snapshot":a.op?"op response":void 0,d=(g=this.handlers)[e]||(g[e]={}),c=d[f]||(d[f]=[]),c.push(b)
            },a.prototype.onMessage=function(a){
        var b,c,d,e,f,g,h,i=a.doc;
        i!==void 0?this.lastReceivedDoc=i:a.doc=i=this.lastReceivedDoc,this.emit("message",a),e=a.open===!0||a.open===!1&&a.error?"open":a.open===!1?"close":a.snapshot!==void 0?"snapshot":a.create?"create":a.op?"op":a.v!==void 0?"op response":void 0,c=(h=this.handlers[i])!=null?h[e]:void 0;
        if(c){
            delete this.handlers[i][e];
            for(f=0,g=c.length;f<g;f++)b=c[f],b(a.error,a)
                }
                if(e==="op"){
            d=this.docs[i];
            if(d)return d._onOpReceived(a)
                }
            },a.prototype.makeDoc=function(a){
    var c,d,e=a.doc;
    if(this.docs[e])throw new Error("Doc "+e+" already open");
    return d=a.type,typeof d=="string"&&(d=p[d]),c=new b(this,e,a.v,d,a.snapshot),c.created=!!a.create,this.docs[e]=c,c.on("closing",q(function(){
        return delete this.docs[e]
        },this)),c
    },a.prototype.openExisting=function(a,b){
    if(this.socket===null){
        b("connection closed");
        return
    }
    return this.docs[a]!=null?this.docs[a]:this.send({
        doc:a,
        open:!0,
        snapshot:null
    },q(function(a,c){
        return a?b(a):b(null,this.makeDoc(c))
        },this))
    },a.prototype.open=function(a,b,c){
    var d;
    if(this.socket===null){
        c("connection closed");
        return
    }
    typeof b=="function"&&(c=b,b="text"),c||(c=function(){}),typeof b=="string"&&(b=p[b]);
    if(!b)throw new Error("OT code for document type missing");
    if(a!=null&&this.docs[a]!=null){
        d=this.docs[a],d.type===b?c(null,d):c("Type mismatch",d);
        return
    }
    return this.send({
        doc:a,
        open:!0,
        create:!0,
        snapshot:null,
        type:b.name
        },q(function(a,d){
        return a?c(a):(d.snapshot===void 0&&(d.snapshot=b.create()),d.type=b,c(null,this.makeDoc(d)))
        },this))
    },a.prototype.create=function(a,b){
    return open(null,a,b)
    },a.prototype.disconnect=function(){
    if(this.socket)return this.emit("disconnecting"),this.socket.disconnect(),this.socket=null
        },a
}(),c.mixin(a),h.Connection=a,h.open=function(){
    var b={},c=function(c){
        var d,e,f;
        return f=window.location,c==null&&(c=""+f.protocol+"//"+f.hostname+"/sjs"),b[c]||(d=new a(c),d.numDocs=0,e=function(){
            return delete b[c]
            },d.on("disconnecting",e),d.on("connect failed",e),b[c]=d),b[c]
        };
        
    return function(a,b,d,e){
        var f;
        return typeof d=="function"&&(e=d,d=null),f=c(d),f.numDocs++,f.open(a,b,function(a,b){
            return a?(f.numDocs--,f.numDocs===0&&f.disconnect(),e(a)):(b.on("closed",function(){
                f.numDocs--;
                if(f.numDocs===0)return f.disconnect()
                    }),e(null,b))
            }),f.on("connect failed")
        }
    }()
})).call(this)