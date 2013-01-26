(function(){
    var a=function(){
        return this
        }();
    if(typeof requirejs!="undefined")return;
    var b=function(a,c,d){
        if(typeof a!="string"){
            b.original?b.original.apply(window,arguments):(console.error("dropping module because define wasn't a string."),console.trace());
            return
        }
        arguments.length==2&&(d=c),define.modules||(define.modules={}),define.modules[a]=d
        };
        
    a.define&&(b.original=a.define),a.define=b;
    var c=function(a,b,d){
        if(Object.prototype.toString.call(b)==="[object Array]"){
            var f=[];
            for(var g=0,h=b.length;g<h;++g){
                var i=e(a,b[g]);
                if(!i&&c.original)return c.original.apply(window,arguments);
                f.push(i)
                }
                d&&d.apply(null,f)
            }else{
            if(typeof b=="string"){
                var j=e(a,b);
                return!j&&c.original?c.original.apply(window,arguments):(d&&d(),j)
                }
                if(c.original)return c.original.apply(window,arguments)
                }
            };
    
a.require&&(c.original=a.require),a.require=function(a,b){
    return c("",a,b)
    },a.require.packaged=!0;
var d=function(a,b){
    if(b.indexOf("!")!==-1){
        var c=b.split("!");
        return d(a,c[0])+"!"+d(a,c[1])
        }
        if(b.charAt(0)=="."){
        var e=a.split("/").slice(0,-1).join("/"),b=e+"/"+b;
        while(b.indexOf(".")!==-1&&f!=b)var f=b,b=b.replace(/\/\.\//,"/").replace(/[^\/]+\/\.\.\//,"")
            }
            return b
    },e=function(a,b){
    b=d(a,b);
    var e=define.modules[b];
    if(e==null)return null;
    if(typeof e=="function"){
        var f={},g={
            id:b,
            uri:"",
            exports:f
        },h=function(a,d){
            return c(b,a,d)
            },i=e(h,f,g);
        return f=i||g.exports,define.modules[b]=f,f
        }
        return e
    }
})(),define("ace/lib/fixoldbrowsers",["require","exports","module","ace/lib/regexp","ace/lib/es5-shim"],function(a,b,c){
    a("./regexp"),a("./es5-shim")
    }),define("ace/lib/regexp",["require","exports","module"],function(a,b,c){
    function g(a){
        return(a.global?"g":"")+(a.ignoreCase?"i":"")+(a.multiline?"m":"")+(a.extended?"x":"")+(a.sticky?"y":"")
        }
        function h(a,b,c){
        if(Array.prototype.indexOf)return a.indexOf(b,c);
        for(var d=c||0;d<a.length;d++)if(a[d]===b)return d;return-1
        }
        var d={
        exec:RegExp.prototype.exec,
        test:RegExp.prototype.test,
        match:String.prototype.match,
        replace:String.prototype.replace,
        split:String.prototype.split
        },e=d.exec.call(/()??/,"")[1]===undefined,f=function(){
        var a=/^/g;
        return d.test.call(a,""),!a.lastIndex
        }();
    RegExp.prototype.exec=function(a){
        var b=d.exec.apply(this,arguments),c,i;
        if(b){
            !e&&b.length>1&&h(b,"")>-1&&(i=RegExp(this.source,d.replace.call(g(this),"g","")),d.replace.call(a.slice(b.index),i,function(){
                for(var a=1;a<arguments.length-2;a++)arguments[a]===undefined&&(b[a]=undefined)
                    }));
            if(this._xregexp&&this._xregexp.captureNames)for(var j=1;j<b.length;j++)c=this._xregexp.captureNames[j-1],c&&(b[c]=b[j]);
            !f&&this.global&&!b[0].length&&this.lastIndex>b.index&&this.lastIndex--
        }
        return b
        },f||(RegExp.prototype.test=function(a){
        var b=d.exec.call(this,a);
        return b&&this.global&&!b[0].length&&this.lastIndex>b.index&&this.lastIndex--,!!b
        })
    }),define("ace/lib/es5-shim",["require","exports","module"],function(a,b,c){
    function p(a){
        try{
            return Object.defineProperty(a,"sentinel",{}),"sentinel"in a
            }catch(b){}
    }
    Function.prototype.bind||(Function.prototype.bind=function(a){
    var b=this;
    if(typeof b!="function")throw new TypeError;
    var c=g.call(arguments,1),d=function(){
        if(this instanceof d){
            var e=function(){};
            
            e.prototype=b.prototype;
            var f=new e,h=b.apply(f,c.concat(g.call(arguments)));
            return h!==null&&Object(h)===h?h:f
            }
            return b.apply(a,c.concat(g.call(arguments)))
        };
        
    return d
    });
var d=Function.prototype.call,e=Array.prototype,f=Object.prototype,g=e.slice,h=d.bind(f.toString),i=d.bind(f.hasOwnProperty),j,k,l,m,n;
    if(n=i(f,"__defineGetter__"))j=d.bind(f.__defineGetter__),k=d.bind(f.__defineSetter__),l=d.bind(f.__lookupGetter__),m=d.bind(f.__lookupSetter__);
    Array.isArray||(Array.isArray=function(a){
    return h(a)=="[object Array]"
    }),Array.prototype.forEach||(Array.prototype.forEach=function(a){
    var b=G(this),c=arguments[1],d=0,e=b.length>>>0;
    if(h(a)!="[object Function]")throw new TypeError;
    while(d<e)d in b&&a.call(c,b[d],d,b),d++
}),Array.prototype.map||(Array.prototype.map=function(a){
    var b=G(this),c=b.length>>>0,d=Array(c),e=arguments[1];
    if(h(a)!="[object Function]")throw new TypeError;
    for(var f=0;f<c;f++)f in b&&(d[f]=a.call(e,b[f],f,b));
    return d
    }),Array.prototype.filter||(Array.prototype.filter=function(a){
    var b=G(this),c=b.length>>>0,d=[],e=arguments[1];
    if(h(a)!="[object Function]")throw new TypeError;
    for(var f=0;f<c;f++)f in b&&a.call(e,b[f],f,b)&&d.push(b[f]);
    return d
    }),Array.prototype.every||(Array.prototype.every=function(a){
    var b=G(this),c=b.length>>>0,d=arguments[1];
    if(h(a)!="[object Function]")throw new TypeError;
    for(var e=0;e<c;e++)if(e in b&&!a.call(d,b[e],e,b))return!1;return!0
    }),Array.prototype.some||(Array.prototype.some=function(a){
    var b=G(this),c=b.length>>>0,d=arguments[1];
    if(h(a)!="[object Function]")throw new TypeError;
    for(var e=0;e<c;e++)if(e in b&&a.call(d,b[e],e,b))return!0;return!1
    }),Array.prototype.reduce||(Array.prototype.reduce=function(a){
    var b=G(this),c=b.length>>>0;
    if(h(a)!="[object Function]")throw new TypeError;
    if(!c&&arguments.length==1)throw new TypeError;
    var d=0,e;
    if(arguments.length>=2)e=arguments[1];else do{
        if(d in b){
            e=b[d++];
            break
        }
        if(++d>=c)throw new TypeError
            }while(!0);
    for(;d<c;d++)d in b&&(e=a.call(void 0,e,b[d],d,b));
    return e
    }),Array.prototype.reduceRight||(Array.prototype.reduceRight=function(a){
    var b=G(this),c=b.length>>>0;
    if(h(a)!="[object Function]")throw new TypeError;
    if(!c&&arguments.length==1)throw new TypeError;
    var d,e=c-1;
    if(arguments.length>=2)d=arguments[1];else do{
        if(e in b){
            d=b[e--];
            break
        }
        if(--e<0)throw new TypeError
            }while(!0);
    do e in this&&(d=a.call(void 0,d,b[e],e,b));while(e--);
    return d
    }),Array.prototype.indexOf||(Array.prototype.indexOf=function(a){
    var b=G(this),c=b.length>>>0;
    if(!c)return-1;
    var d=0;
    arguments.length>1&&(d=E(arguments[1])),d=d>=0?d:Math.max(0,c+d);
    for(;d<c;d++)if(d in b&&b[d]===a)return d;return-1
    }),Array.prototype.lastIndexOf||(Array.prototype.lastIndexOf=function(a){
    var b=G(this),c=b.length>>>0;
    if(!c)return-1;
    var d=c-1;
    arguments.length>1&&(d=Math.min(d,E(arguments[1]))),d=d>=0?d:c-Math.abs(d);
    for(;d>=0;d--)if(d in b&&a===b[d])return d;return-1
    }),Object.getPrototypeOf||(Object.getPrototypeOf=function(a){
    return a.__proto__||(a.constructor?a.constructor.prototype:f)
    });
if(!Object.getOwnPropertyDescriptor){
    var o="Object.getOwnPropertyDescriptor called on a non-object: ";
    Object.getOwnPropertyDescriptor=function(a,b){
        if(typeof a!="object"&&typeof a!="function"||a===null)throw new TypeError(o+a);
        if(!i(a,b))return;
        var c,d,e;
        c={
            enumerable:!0,
            configurable:!0
            };
            
        if(n){
            var g=a.__proto__;
            a.__proto__=f;
            var d=l(a,b),e=m(a,b);
            a.__proto__=g;
            if(d||e)return d&&(c.get=d),e&&(c.set=e),c
                }
                return c.value=a[b],c
        }
    }
Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(a){
    return Object.keys(a)
    }),Object.create||(Object.create=function(a,b){
    var c;
    if(a===null)c={
        "__proto__":null
    };
    else{
        if(typeof a!="object")throw new TypeError("typeof prototype["+typeof a+"] != 'object'");
        var d=function(){};
        
        d.prototype=a,c=new d,c.__proto__=a
        }
        return b!==void 0&&Object.defineProperties(c,b),c
    });
if(Object.defineProperty){
    var q=p({}),r=typeof document=="undefined"||p(document.createElement("div"));
    if(!q||!r)var s=Object.defineProperty
        }
        if(!Object.defineProperty||s){
    var t="Property description must be an object: ",u="Object.defineProperty called on non-object: ",v="getters & setters can not be defined on this javascript engine";
    Object.defineProperty=function(a,b,c){
        if(typeof a!="object"&&typeof a!="function"||a===null)throw new TypeError(u+a);
        if(typeof c!="object"&&typeof c!="function"||c===null)throw new TypeError(t+c);
        if(s)try{
            return s.call(Object,a,b,c)
            }catch(d){}
            if(i(c,"value"))if(n&&(l(a,b)||m(a,b))){
            var e=a.__proto__;
            a.__proto__=f,delete a[b],a[b]=c.value,a.__proto__=e
            }else a[b]=c.value;
        else{
            if(!n)throw new TypeError(v);
            i(c,"get")&&j(a,b,c.get),i(c,"set")&&k(a,b,c.set)
            }
            return a
        }
    }
Object.defineProperties||(Object.defineProperties=function(a,b){
    for(var c in b)i(b,c)&&Object.defineProperty(a,c,b[c]);return a
    }),Object.seal||(Object.seal=function(a){
    return a
    }),Object.freeze||(Object.freeze=function(a){
    return a
    });
try{
    Object.freeze(function(){})
    }catch(w){
    Object.freeze=function(a){
        return function b(b){
            return typeof b=="function"?b:a(b)
            }
        }(Object.freeze)
}
Object.preventExtensions||(Object.preventExtensions=function(a){
    return a
    }),Object.isSealed||(Object.isSealed=function(a){
    return!1
    }),Object.isFrozen||(Object.isFrozen=function(a){
    return!1
    }),Object.isExtensible||(Object.isExtensible=function(a){
    if(Object(a)===a)throw new TypeError;
    var b="";
    while(i(a,b))b+="?";
    a[b]=!0;
    var c=i(a,b);
    return delete a[b],c
    });
if(!Object.keys){
    var x=!0,y=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],z=y.length;
    for(var A in{
        toString:null
    })x=!1;Object.keys=function bd(a){
        if(typeof a!="object"&&typeof a!="function"||a===null)throw new TypeError("Object.keys called on a non-object");
        var bd=[];
        for(var b in a)i(a,b)&&bd.push(b);if(x)for(var c=0,d=z;c<d;c++){
            var e=y[c];
            i(a,e)&&bd.push(e)
            }
            return bd
        }
    }
if(!Date.prototype.toISOString||(new Date(-621987552e5)).toISOString().indexOf("-000001")===-1)Date.prototype.toISOString=function(){
    var a,b,c,d;
    if(!isFinite(this))throw new RangeError;
    a=[this.getUTCMonth()+1,this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds()],d=this.getUTCFullYear(),d=(d<0?"-":d>9999?"+":"")+("00000"+Math.abs(d)).slice(0<=d&&d<=9999?-4:-6),b=a.length;
    while(b--)c=a[b],c<10&&(a[b]="0"+c);
    return d+"-"+a.slice(0,2).join("-")+"T"+a.slice(2).join(":")+"."+("000"+this.getUTCMilliseconds()).slice(-3)+"Z"
    };
    
Date.now||(Date.now=function(){
    return(new Date).getTime()
    }),Date.prototype.toJSON||(Date.prototype.toJSON=function(a){
    if(typeof this.toISOString!="function")throw new TypeError;
    return this.toISOString()
    }),Date.parse("+275760-09-13T00:00:00.000Z")!==864e13&&(Date=function(a){
    var b=function e(b,c,d,f,g,h,i){
        var j=arguments.length;
        if(this instanceof a){
            var k=j==1&&String(b)===b?new a(e.parse(b)):j>=7?new a(b,c,d,f,g,h,i):j>=6?new a(b,c,d,f,g,h):j>=5?new a(b,c,d,f,g):j>=4?new a(b,c,d,f):j>=3?new a(b,c,d):j>=2?new a(b,c):j>=1?new a(b):new a;
            return k.constructor=e,k
            }
            return a.apply(this,arguments)
        },c=new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:\\.(\\d{3}))?)?(?:Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$");
    for(var d in a)b[d]=a[d];return b.now=a.now,b.UTC=a.UTC,b.prototype=a.prototype,b.prototype.constructor=b,b.parse=function f(b){
        var d=c.exec(b);
        if(d){
            d.shift();
            for(var e=1;e<7;e++)d[e]=+(d[e]||(e<3?1:0)),e==1&&d[e]--;
            var f=+d.pop(),g=+d.pop(),h=d.pop(),i=0;
            if(h){
                if(g>23||f>59)return NaN;
                i=(g*60+f)*6e4*(h=="+"?-1:1)
                }
                var j=+d[0];
            return 0<=j&&j<=99?(d[0]=j+400,a.UTC.apply(this,d)+i-126227808e5):a.UTC.apply(this,d)+i
            }
            return a.parse.apply(this,arguments)
        },b
    }(Date));
var B="\t\n\f\r   ᠎             　\u2028\u2029﻿";
if(!String.prototype.trim||B.trim()){
    B="["+B+"]";
    var C=new RegExp("^"+B+B+"*"),D=new RegExp(B+B+"*$");
    String.prototype.trim=function(){
        return String(this).replace(C,"").replace(D,"")
        }
    }
var E=function(a){
    return a=+a,a!==a?a=0:a!==0&&a!==1/0&&a!==-Infinity&&(a=(a>0||-1)*Math.floor(Math.abs(a))),a
    },F="a"[0]!="a",G=function(a){
    if(a==null)throw new TypeError;
    return F&&typeof a=="string"&&a?a.split(""):Object(a)
    }
}),define("ace/ace",["require","exports","module","ace/lib/fixoldbrowsers","ace/lib/dom","ace/lib/event","ace/editor","ace/edit_session","ace/undomanager","ace/virtual_renderer","ace/theme/textmate"],function(a,b,c){
    a("./lib/fixoldbrowsers");
    var d=a("./lib/dom"),e=a("./lib/event"),f=a("./editor").Editor,g=a("./edit_session").EditSession,h=a("./undomanager").UndoManager,i=a("./virtual_renderer").VirtualRenderer;
    b.edit=function(b){
        typeof b=="string"&&(b=document.getElementById(b));
        var c=new g(d.getInnerText(b));
        c.setUndoManager(new h),b.innerHTML="";
        var j=new f(new i(b,a("./theme/textmate")));
        j.setSession(c);
        var k={};
        
        return k.document=c,k.editor=j,j.resize(),e.addListener(window,"resize",function(){
            j.resize()
            }),b.env=k,j.env=k,j
        }
    }),define("ace/lib/dom",["require","exports","module"],function(a,b,c){
    var d="http://www.w3.org/1999/xhtml";
    b.createElement=function(a,b){
        return document.createElementNS?document.createElementNS(b||d,a):document.createElement(a)
        },b.setText=function(a,b){
        a.innerText!==undefined&&(a.innerText=b),a.textContent!==undefined&&(a.textContent=b)
        },document.documentElement.classList?(b.hasCssClass=function(a,b){
        return a.classList.contains(b)
        },b.addCssClass=function(a,b){
        a.classList.add(b)
        },b.removeCssClass=function(a,b){
        a.classList.remove(b)
        },b.toggleCssClass=function(a,b){
        return a.classList.toggle(b)
        }):(b.hasCssClass=function(a,b){
        var c=a.className.split(/\s+/g);
        return c.indexOf(b)!==-1
        },b.addCssClass=function(a,c){
        b.hasCssClass(a,c)||(a.className+=" "+c)
        },b.removeCssClass=function(a,b){
        var c=a.className.split(/\s+/g);
        for(;;){
            var d=c.indexOf(b);
            if(d==-1)break;
            c.splice(d,1)
            }
            a.className=c.join(" ")
        },b.toggleCssClass=function(a,b){
        var c=a.className.split(/\s+/g),d=!0;
        for(;;){
            var e=c.indexOf(b);
            if(e==-1)break;
            d=!1,c.splice(e,1)
            }
            return d&&c.push(b),a.className=c.join(" "),d
        }),b.setCssClass=function(a,c,d){
        d?b.addCssClass(a,c):b.removeCssClass(a,c)
        },b.hasCssString=function(a,b){
        var c=0,d;
        b=b||document;
        if(b.createStyleSheet&&(d=b.styleSheets)){
            while(c<d.length)if(d[c++].title===a)return!0
                }else if(d=b.getElementsByTagName("style"))while(c<d.length)if(d[c++].id===a)return!0;
        return!1
        },b.importCssString=function e(a,c,e){
        e=e||document;
        if(c&&b.hasCssString(c,e))return null;
        var f;
        if(e.createStyleSheet)f=e.createStyleSheet(),f.cssText=a,c&&(f.title=c);
        else{
            f=e.createElementNS?e.createElementNS(d,"style"):e.createElement("style"),f.appendChild(e.createTextNode(a)),c&&(f.id=c);
            var g=e.getElementsByTagName("head")[0]||e.documentElement;
            g.appendChild(f)
            }
        },b.importCssStylsheet=function(a,c){
    if(c.createStyleSheet)c.createStyleSheet(a);
    else{
        var d=b.createElement("link");
        d.rel="stylesheet",d.href=a;
        var e=c.getElementsByTagName("head")[0]||c.documentElement;
        e.appendChild(d)
        }
    },b.getInnerWidth=function(a){
    return parseInt(b.computedStyle(a,"paddingLeft"),10)+parseInt(b.computedStyle(a,"paddingRight"),10)+a.clientWidth
    },b.getInnerHeight=function(a){
    return parseInt(b.computedStyle(a,"paddingTop"),10)+parseInt(b.computedStyle(a,"paddingBottom"),10)+a.clientHeight
    },window.pageYOffset!==undefined?(b.getPageScrollTop=function(){
    return window.pageYOffset
    },b.getPageScrollLeft=function(){
    return window.pageXOffset
    }):(b.getPageScrollTop=function(){
    return document.body.scrollTop
    },b.getPageScrollLeft=function(){
    return document.body.scrollLeft
    }),window.getComputedStyle?b.computedStyle=function(a,b){
    return b?(window.getComputedStyle(a,"")||{})[b]||"":window.getComputedStyle(a,"")||{}
}:b.computedStyle=function(a,b){
    return b?a.currentStyle[b]:a.currentStyle
    },b.scrollbarWidth=function(a){
    var c=b.createElement("p");
    c.style.width="100%",c.style.minWidth="0px",c.style.height="200px";
    var d=b.createElement("div"),e=d.style;
    e.position="absolute",e.left="-10000px",e.overflow="hidden",e.width="200px",e.minWidth="0px",e.height="150px",d.appendChild(c);
    var f=a.body||a.documentElement;
    f.appendChild(d);
    var g=c.offsetWidth;
    e.overflow="scroll";
    var h=c.offsetWidth;
    return g==h&&(h=d.clientWidth),f.removeChild(d),g-h
    },b.setInnerHtml=function(a,b){
    var c=a.cloneNode(!1);
    return c.innerHTML=b,a.parentNode.replaceChild(c,a),c
    },b.setInnerText=function(a,b){
    var c=a.ownerDocument;
    c.body&&"textContent"in c.body?a.textContent=b:a.innerText=b
    },b.getInnerText=function(a){
    var b=a.ownerDocument;
    return b.body&&"textContent"in b.body?a.textContent:a.innerText||a.textContent||""
    },b.getParentWindow=function(a){
    return a.defaultView||a.parentWindow
    }
}),define("ace/lib/event",["require","exports","module","ace/lib/keys","ace/lib/useragent","ace/lib/dom"],function(a,b,c){
    function g(a,b,c){
        var f=0;
        e.isOpera&&e.isMac?f=0|(b.metaKey?1:0)|(b.altKey?2:0)|(b.shiftKey?4:0)|(b.ctrlKey?8:0):f=0|(b.ctrlKey?1:0)|(b.altKey?2:0)|(b.shiftKey?4:0)|(b.metaKey?8:0);
        if(c in d.MODIFIER_KEYS){
            switch(d.MODIFIER_KEYS[c]){
                case"Alt":
                    f=2;
                    break;
                case"Shift":
                    f=4;
                    break;
                case"Ctrl":
                    f=1;
                    break;
                default:
                    f=8
                    }
                    c=0
            }
            return f&8&&(c==91||c==93)&&(c=0),!!f||c in d.FUNCTION_KEYS||c in d.PRINTABLE_KEYS?a(b,f,c):!1
        }
        var d=a("./keys"),e=a("./useragent"),f=a("./dom");
    b.addListener=function(a,b,c){
        if(a.addEventListener)return a.addEventListener(b,c,!1);
        if(a.attachEvent){
            var d=function(){
                c(window.event)
                };
                
            c._wrapper=d,a.attachEvent("on"+b,d)
            }
        },b.removeListener=function(a,b,c){
    if(a.removeEventListener)return a.removeEventListener(b,c,!1);
    a.detachEvent&&a.detachEvent("on"+b,c._wrapper||c)
    },b.stopEvent=function(a){
    return b.stopPropagation(a),b.preventDefault(a),!1
    },b.stopPropagation=function(a){
    a.stopPropagation?a.stopPropagation():a.cancelBubble=!0
    },b.preventDefault=function(a){
    a.preventDefault?a.preventDefault():a.returnValue=!1
    },b.getDocumentX=function(a){
    return a.clientX?a.clientX+f.getPageScrollLeft():a.pageX
    },b.getDocumentY=function(a){
    return a.clientY?a.clientY+f.getPageScrollTop():a.pageY
    },b.getButton=function(a){
    return a.type=="dblclick"?0:a.type=="contextmenu"?2:a.preventDefault?a.button:{
        1:0,
        2:2,
        4:1
    }
    [a.button]
    },document.documentElement.setCapture?b.capture=function(a,c,d){
    function e(a){
        return c(a),b.stopPropagation(a)
        }
        function g(e){
        c(e),f||(f=!0,d(e)),b.removeListener(a,"mousemove",c),b.removeListener(a,"mouseup",g),b.removeListener(a,"losecapture",g),a.releaseCapture()
        }
        var f=!1;
    b.addListener(a,"mousemove",c),b.addListener(a,"mouseup",g),b.addListener(a,"losecapture",g),a.setCapture()
    }:b.capture=function(a,b,c){
    function d(a){
        b(a),a.stopPropagation()
        }
        function e(a){
        b&&b(a),c&&c(a),document.removeEventListener("mousemove",d,!0),document.removeEventListener("mouseup",e,!0),a.stopPropagation()
        }
        document.addEventListener("mousemove",d,!0),document.addEventListener("mouseup",e,!0)
    },b.addMouseWheelListener=function(a,c){
    var d=0,e=function(a){
        if(a.wheelDelta!==undefined){
            Math.abs(a.wheelDeltaY)>d&&(d=Math.abs(a.wheelDeltaY));
            if(d>5e3)var b=400;else var b=8;
            a.wheelDeltaX!==undefined?(a.wheelX=-a.wheelDeltaX/b,a.wheelY=-a.wheelDeltaY/b):(a.wheelX=0,a.wheelY=-a.wheelDelta/b)
            }else a.axis&&a.axis==a.HORIZONTAL_AXIS?(a.wheelX=(a.detail||0)*5,a.wheelY=0):(a.wheelX=0,a.wheelY=(a.detail||0)*5);
        c(a)
        };
        
    b.addListener(a,"DOMMouseScroll",e),b.addListener(a,"mousewheel",e)
    },b.addMultiMouseDownListener=function(a,c,d,f,g){
    var h=0,i,j,k=function(a){
        h+=1,h==1&&(i=a.clientX,j=a.clientY,setTimeout(function(){
            h=0
            },f||600));
        var e=b.getButton(a)==c;
        if(!e||Math.abs(a.clientX-i)>5||Math.abs(a.clientY-j)>5)h=0;
        h==d&&(h=0,g(a));
        if(e)return b.preventDefault(a)
            };
            
    b.addListener(a,"mousedown",k),e.isOldIE&&b.addListener(a,"dblclick",k)
    },b.addCommandKeyListener=function(a,c){
    var d=b.addListener;
    if(e.isOldGecko){
        var f=null;
        d(a,"keydown",function(a){
            f=a.keyCode
            }),d(a,"keypress",function(a){
            return g(c,a,f)
            })
        }else{
        var h=null;
        d(a,"keydown",function(a){
            return h=a.keyIdentifier||a.keyCode,g(c,a,a.keyCode)
            }),e.isMac&&e.isOpera&&d(a,"keypress",function(a){
            var b=a.keyIdentifier||a.keyCode;
            if(h!==b)return g(c,a,h);
            h=null
            })
        }
    };

if(window.postMessage){
    var h=1;
    b.nextTick=function(a,c){
        c=c||window;
        var d="zero-timeout-message-"+h;
        b.addListener(c,"message",function e(f){
            f.data==d&&(b.stopPropagation(f),b.removeListener(c,"message",e),a())
            }),c.postMessage(d,"*")
        }
    }else b.nextTick=function(a,b){
    b=b||window,window.setTimeout(a,0)
    }
}),define("ace/lib/keys",["require","exports","module","ace/lib/oop"],function(a,b,c){
    var d=a("./oop"),e=function(){
        var a={
            MODIFIER_KEYS:{
                16:"Shift",
                17:"Ctrl",
                18:"Alt",
                224:"Meta"
            },
            KEY_MODS:{
                ctrl:1,
                alt:2,
                option:2,
                shift:4,
                meta:8,
                command:8
            },
            FUNCTION_KEYS:{
                8:"Backspace",
                9:"Tab",
                13:"Return",
                19:"Pause",
                27:"Esc",
                32:"Space",
                33:"PageUp",
                34:"PageDown",
                35:"End",
                36:"Home",
                37:"Left",
                38:"Up",
                39:"Right",
                40:"Down",
                44:"Print",
                45:"Insert",
                46:"Delete",
                96:"Numpad0",
                97:"Numpad1",
                98:"Numpad2",
                99:"Numpad3",
                100:"Numpad4",
                101:"Numpad5",
                102:"Numpad6",
                103:"Numpad7",
                104:"Numpad8",
                105:"Numpad9",
                112:"F1",
                113:"F2",
                114:"F3",
                115:"F4",
                116:"F5",
                117:"F6",
                118:"F7",
                119:"F8",
                120:"F9",
                121:"F10",
                122:"F11",
                123:"F12",
                144:"Numlock",
                145:"Scrolllock"
            },
            PRINTABLE_KEYS:{
                32:" ",
                48:"0",
                49:"1",
                50:"2",
                51:"3",
                52:"4",
                53:"5",
                54:"6",
                55:"7",
                56:"8",
                57:"9",
                59:";",
                61:"=",
                65:"a",
                66:"b",
                67:"c",
                68:"d",
                69:"e",
                70:"f",
                71:"g",
                72:"h",
                73:"i",
                74:"j",
                75:"k",
                76:"l",
                77:"m",
                78:"n",
                79:"o",
                80:"p",
                81:"q",
                82:"r",
                83:"s",
                84:"t",
                85:"u",
                86:"v",
                87:"w",
                88:"x",
                89:"y",
                90:"z",
                107:"+",
                109:"-",
                110:".",
                188:",",
                190:".",
                191:"/",
                192:"`",
                219:"[",
                220:"\\",
                221:"]",
                222:'"'
            }
        };
        
    for(var b in a.FUNCTION_KEYS){
        var c=a.FUNCTION_KEYS[b].toUpperCase();
        a[c]=parseInt(b,10)
        }
        return d.mixin(a,a.MODIFIER_KEYS),d.mixin(a,a.PRINTABLE_KEYS),d.mixin(a,a.FUNCTION_KEYS),a
    }();
    d.mixin(b,e),b.keyCodeToString=function(a){
    return(e[a]||String.fromCharCode(a)).toLowerCase()
    }
}),define("ace/lib/oop",["require","exports","module"],function(a,b,c){
    b.inherits=function(){
        var a=function(){};
        
        return function(b,c){
            a.prototype=c.prototype,b.super_=c.prototype,b.prototype=new a,b.prototype.constructor=b
            }
        }(),b.mixin=function(a,b){
    for(var c in b)a[c]=b[c]
        },b.implement=function(a,c){
    b.mixin(a,c)
    }
}),define("ace/lib/useragent",["require","exports","module"],function(a,b,c){
    var d=(navigator.platform.match(/mac|win|linux/i)||["other"])[0].toLowerCase(),e=navigator.userAgent,f=navigator.appVersion;
    b.isWin=d=="win",b.isMac=d=="mac",b.isLinux=d=="linux",b.isIE=navigator.appName=="Microsoft Internet Explorer"&&parseFloat(navigator.userAgent.match(/MSIE ([0-9]+[\.0-9]+)/)[1]),b.isOldIE=b.isIE&&b.isIE<9,b.isGecko=b.isMozilla=window.controllers&&window.navigator.product==="Gecko",b.isOldGecko=b.isGecko&&parseInt((navigator.userAgent.match(/rv\:(\d+)/)||[])[1])<4,b.isOpera=window.opera&&Object.prototype.toString.call(window.opera)=="[object Opera]",b.isWebKit=parseFloat(e.split("WebKit/")[1])||undefined,b.isChrome=parseFloat(e.split(" Chrome/")[1])||undefined,b.isAIR=e.indexOf("AdobeAIR")>=0,b.isIPad=e.indexOf("iPad")>=0,b.isTouchPad=e.indexOf("TouchPad")>=0,b.OS={
        LINUX:"LINUX",
        MAC:"MAC",
        WINDOWS:"WINDOWS"
    },b.getOS=function(){
        return b.isMac?b.OS.MAC:b.isLinux?b.OS.LINUX:b.OS.WINDOWS
        }
    }),define("ace/editor",["require","exports","module","ace/lib/fixoldbrowsers","ace/lib/oop","ace/lib/lang","ace/lib/useragent","ace/keyboard/textinput","ace/mouse/mouse_handler","ace/keyboard/keybinding","ace/edit_session","ace/search","ace/range","ace/lib/event_emitter","ace/commands/command_manager","ace/commands/default_commands"],function(a,b,c){
    a("./lib/fixoldbrowsers");
    var d=a("./lib/oop"),e=a("./lib/lang"),f=a("./lib/useragent"),g=a("./keyboard/textinput").TextInput,h=a("./mouse/mouse_handler").MouseHandler,i=a("./keyboard/keybinding").KeyBinding,j=a("./edit_session").EditSession,k=a("./search").Search,l=a("./range").Range,m=a("./lib/event_emitter").EventEmitter,n=a("./commands/command_manager").CommandManager,o=a("./commands/default_commands").commands,p=function(a,b){
        var c=a.getContainerElement();
        this.container=c,this.renderer=a,this.textInput=new g(a.getTextAreaContainer(),this),this.keyBinding=new i(this),f.isIPad||(this.$mouseHandler=new h(this)),this.$blockScrolling=0,this.$search=(new k).set({
            wrap:!0
            }),this.commands=new n(f.isMac?"mac":"win",o),this.setSession(b||new j(""))
        };
    ((function(){
        d.implement(this,m),this.$forwardEvents={
            gutterclick:1,
            gutterdblclick:1
        },this.$originalAddEventListener=this.addEventListener,this.$originalRemoveEventListener=this.removeEventListener,this.addEventListener=function(a,b){
            return this.$forwardEvents[a]?this.renderer.addEventListener(a,b):this.$originalAddEventListener(a,b)
            },this.removeEventListener=function(a,b){
            return this.$forwardEvents[a]?this.renderer.removeEventListener(a,b):this.$originalRemoveEventListener(a,b)
            },this.setKeyboardHandler=function(a){
            this.keyBinding.setKeyboardHandler(a)
            },this.getKeyboardHandler=function(){
            return this.keyBinding.getKeyboardHandler()
            },this.setSession=function(a){
            if(this.session==a)return;
            if(this.session){
                var b=this.session;
                this.session.removeEventListener("change",this.$onDocumentChange),this.session.removeEventListener("changeMode",this.$onChangeMode),this.session.removeEventListener("tokenizerUpdate",this.$onTokenizerUpdate),this.session.removeEventListener("changeTabSize",this.$onChangeTabSize),this.session.removeEventListener("changeWrapLimit",this.$onChangeWrapLimit),this.session.removeEventListener("changeWrapMode",this.$onChangeWrapMode),this.session.removeEventListener("onChangeFold",this.$onChangeFold),this.session.removeEventListener("changeFrontMarker",this.$onChangeFrontMarker),this.session.removeEventListener("changeBackMarker",this.$onChangeBackMarker),this.session.removeEventListener("changeBreakpoint",this.$onChangeBreakpoint),this.session.removeEventListener("changeAnnotation",this.$onChangeAnnotation),this.session.removeEventListener("changeOverwrite",this.$onCursorChange);
                var c=this.session.getSelection();
                c.removeEventListener("changeCursor",this.$onCursorChange),c.removeEventListener("changeSelection",this.$onSelectionChange),this.session.setScrollTopRow(this.renderer.getScrollTopRow())
                }
                this.session=a,this.$onDocumentChange=this.onDocumentChange.bind(this),a.addEventListener("change",this.$onDocumentChange),this.renderer.setSession(a),this.$onChangeMode=this.onChangeMode.bind(this),a.addEventListener("changeMode",this.$onChangeMode),this.$onTokenizerUpdate=this.onTokenizerUpdate.bind(this),a.addEventListener("tokenizerUpdate",this.$onTokenizerUpdate),this.$onChangeTabSize=this.renderer.updateText.bind(this.renderer),a.addEventListener("changeTabSize",this.$onChangeTabSize),this.$onChangeWrapLimit=this.onChangeWrapLimit.bind(this),a.addEventListener("changeWrapLimit",this.$onChangeWrapLimit),this.$onChangeWrapMode=this.onChangeWrapMode.bind(this),a.addEventListener("changeWrapMode",this.$onChangeWrapMode),this.$onChangeFold=this.onChangeFold.bind(this),a.addEventListener("changeFold",this.$onChangeFold),this.$onChangeFrontMarker=this.onChangeFrontMarker.bind(this),this.session.addEventListener("changeFrontMarker",this.$onChangeFrontMarker),this.$onChangeBackMarker=this.onChangeBackMarker.bind(this),this.session.addEventListener("changeBackMarker",this.$onChangeBackMarker),this.$onChangeBreakpoint=this.onChangeBreakpoint.bind(this),this.session.addEventListener("changeBreakpoint",this.$onChangeBreakpoint),this.$onChangeAnnotation=this.onChangeAnnotation.bind(this),this.session.addEventListener("changeAnnotation",this.$onChangeAnnotation),this.$onCursorChange=this.onCursorChange.bind(this),this.session.addEventListener("changeOverwrite",this.$onCursorChange),this.selection=a.getSelection(),this.selection.addEventListener("changeCursor",this.$onCursorChange),this.$onSelectionChange=this.onSelectionChange.bind(this),this.selection.addEventListener("changeSelection",this.$onSelectionChange),this.onChangeMode(),this.onCursorChange(),this.onSelectionChange(),this.onChangeFrontMarker(),this.onChangeBackMarker(),this.onChangeBreakpoint(),this.onChangeAnnotation(),this.session.getUseWrapMode()&&this.renderer.adjustWrapLimit(),this.renderer.scrollToRow(a.getScrollTopRow()),this.renderer.updateFull(),this._dispatchEvent("changeSession",{
                session:a,
                oldSession:b
            })
            },this.getRenderer=function(){
                return this.renderer;
            },
            this.getSession=function(){
            return this.session
            },this.getSelection=function(){
            return this.selection
            },this.resize=function(){
            this.renderer.onResize()
            },this.setTheme=function(a){
            this.renderer.setTheme(a)
            },this.getTheme=function(){
            return this.renderer.getTheme()
            },this.setStyle=function(a){
            this.renderer.setStyle(a)
            },this.unsetStyle=function(a){
            this.renderer.unsetStyle(a)
            },this.setFontSize=function(a){
            this.container.style.fontSize=a
            },this.$highlightBrackets=function(){
            this.session.$bracketHighlight&&(this.session.removeMarker(this.session.$bracketHighlight),this.session.$bracketHighlight=null);
            if(this.$highlightPending)return;
            var a=this;
            this.$highlightPending=!0,setTimeout(function(){
                a.$highlightPending=!1;
                var b=a.session.findMatchingBracket(a.getCursorPosition());
                if(b){
                    var c=new l(b.row,b.column,b.row,b.column+1);
                    a.session.$bracketHighlight=a.session.addMarker(c,"ace_bracket","text")
                    }
                },10)
        },this.focus=function(){
        var a=this;
        setTimeout(function(){
            a.textInput.focus()
            }),this.textInput.focus()
        },this.isFocused=function(){
        return this.textInput.isFocused()
        },this.blur=function(){
        this.textInput.blur()
        },this.onFocus=function(){
        this.renderer.showCursor(),this.renderer.visualizeFocus(),this._dispatchEvent("focus")
        },this.onBlur=function(){
        this.renderer.hideCursor(),this.renderer.visualizeBlur(),this._dispatchEvent("blur")
        },this.onDocumentChange=function(a){
        var b=a.data,c=b.range,d;
        c.start.row==c.end.row&&b.action!="insertLines"&&b.action!="removeLines"?d=c.end.row:d=Infinity,this.renderer.updateLines(c.start.row,d),this._dispatchEvent("change",a),this.onCursorChange()
        },this.onTokenizerUpdate=function(a){
        var b=a.data;
        this.renderer.updateLines(b.first,b.last)
        },this.onCursorChange=function(){
        this.renderer.updateCursor(),this.$blockScrolling||this.renderer.scrollCursorIntoView(),this.renderer.moveTextAreaToCursor(this.textInput.getElement()),this.$highlightBrackets(),this.$updateHighlightActiveLine()
        },this.$updateHighlightActiveLine=function(){
        var a=this.getSession();
        a.$highlightLineMarker&&a.removeMarker(a.$highlightLineMarker),a.$highlightLineMarker=null;
        if(this.getHighlightActiveLine()&&(this.getSelectionStyle()!="line"||!this.selection.isMultiLine())){
            var b=this.getCursorPosition(),c=this.session.getFoldLine(b.row),d;
            c?d=new l(c.start.row,0,c.end.row+1,0):d=new l(b.row,0,b.row+1,0),a.$highlightLineMarker=a.addMarker(d,"ace_active_line","background")
            }
        },this.onSelectionChange=function(a){
        var b=this.getSession();
        b.$selectionMarker&&b.removeMarker(b.$selectionMarker),b.$selectionMarker=null;
        if(!this.selection.isEmpty()){
            var c=this.selection.getRange(),d=this.getSelectionStyle();
            b.$selectionMarker=b.addMarker(c,"ace_selection",d)
            }else this.$updateHighlightActiveLine();
        this.$highlightSelectedWord&&this.session.getMode().highlightSelection(this)
        },this.onChangeFrontMarker=function(){
        this.renderer.updateFrontMarkers()
        },this.onChangeBackMarker=function(){
        this.renderer.updateBackMarkers()
        },this.onChangeBreakpoint=function(){
        this.renderer.setBreakpoints(this.session.getBreakpoints())
        },this.onChangeAnnotation=function(){
        this.renderer.setAnnotations(this.session.getAnnotations())
        },this.onChangeMode=function(){
        this.renderer.updateText()
        },this.onChangeWrapLimit=function(){
        this.renderer.updateFull()
        },this.onChangeWrapMode=function(){
        this.renderer.onResize(!0)
        },this.onChangeFold=function(){
        this.$updateHighlightActiveLine(),this.renderer.updateFull()
        },this.getCopyText=function(){
        var a="";
        return this.selection.isEmpty()||(a=this.session.getTextRange(this.getSelectionRange())),this._emit("copy",a),a
        },this.onCut=function(){
        if(this.$readOnly)return;
        var a=this.getSelectionRange();
        this._emit("cut",a),this.selection.isEmpty()||(this.session.remove(a),this.clearSelection())
        },this.insert=function(a){
        var b=this.session,c=b.getMode(),d=this.getCursorPosition();
        if(this.getBehavioursEnabled()){
            var e=c.transformAction(b.getState(d.row),"insertion",this,b,a);
            e&&(a=e.text)
            }
            a=a.replace("\t",this.session.getTabString());
        if(!this.selection.isEmpty())d=this.session.remove(this.getSelectionRange()),this.clearSelection();
        else if(this.session.getOverwrite()){
            var f=new l.fromPoints(d,d);
            f.end.column+=a.length,this.session.remove(f)
            }
            this.clearSelection();
        var g=d.column,h=b.getState(d.row),i=c.checkOutdent(h,b.getLine(d.row),a),j=b.getLine(d.row),k=c.getNextLineIndent(h,j.slice(0,d.column),b.getTabString()),m=b.insert(d,a);
        e&&e.selection&&(e.selection.length==2?this.selection.setSelectionRange(new l(d.row,g+e.selection[0],d.row,g+e.selection[1])):this.selection.setSelectionRange(new l(d.row+e.selection[0],e.selection[1],d.row+e.selection[2],e.selection[3])));
        var h=b.getState(d.row);
        if(b.getDocument().isNewLine(a)){
            this.moveCursorTo(d.row+1,0);
            var n=b.getTabSize(),o=Number.MAX_VALUE;
            for(var p=d.row+1;p<=m.row;++p){
                var q=0;
                j=b.getLine(p);
                for(var r=0;r<j.length;++r)if(j.charAt(r)=="\t")q+=n;
                    else if(j.charAt(r)==" ")q+=1;else break;/[^\s]/.test(j)&&(o=Math.min(q,o))
                }
                for(var p=d.row+1;p<=m.row;++p){
                var s=o;
                j=b.getLine(p);
                for(var r=0;r<j.length&&s>0;++r)j.charAt(r)=="\t"?s-=n:j.charAt(r)==" "&&(s-=1);
                b.remove(new l(p,0,p,r))
                }
                b.indentRows(d.row+1,m.row,k)
            }
            i&&c.autoOutdent(h,b,d.row)
        },this.onTextInput=function(a,b){
        b&&this._emit("paste",a),this.keyBinding.onTextInput(a,b)
        },this.onCommandKey=function(a,b,c){
        this.keyBinding.onCommandKey(a,b,c)
        },this.setOverwrite=function(a){
        this.session.setOverwrite(a)
        },this.getOverwrite=function(){
        return this.session.getOverwrite()
        },this.toggleOverwrite=function(){
        this.session.toggleOverwrite()
        },this.setScrollSpeed=function(a){
        this.$mouseHandler.setScrollSpeed(a)
        },this.getScrollSpeed=function(){
        return this.$mouseHandler.getScrollSpeed()
        },this.$selectionStyle="line",this.setSelectionStyle=function(a){
        if(this.$selectionStyle==a)return;
        this.$selectionStyle=a,this.onSelectionChange(),this._dispatchEvent("changeSelectionStyle",{
            data:a
        })
        },this.getSelectionStyle=function(){
        return this.$selectionStyle
        },this.$highlightActiveLine=!0,this.setHighlightActiveLine=function(a){
            
        if(this.$highlightActiveLine==a)return;
        this.$highlightActiveLine=a,this.$updateHighlightActiveLine()
        },this.getHighlightActiveLine=function(){
        return this.$highlightActiveLine
        },this.$highlightSelectedWord=!0,this.setHighlightSelectedWord=function(a){
        if(this.$highlightSelectedWord==a)return;
        this.$highlightSelectedWord=a,a?this.session.getMode().highlightSelection(this):this.session.getMode().clearSelectionHighlight(this)
        },this.getHighlightSelectedWord=function(){
        return this.$highlightSelectedWord
        },this.setShowInvisibles=function(a){
        if(this.getShowInvisibles()==a)return;
        this.renderer.setShowInvisibles(a)
        },this.getShowInvisibles=function(){
        return this.renderer.getShowInvisibles()
        },this.setShowPrintMargin=function(a){
        this.renderer.setShowPrintMargin(a)
        },this.getShowPrintMargin=function(){
        return this.renderer.getShowPrintMargin()
        },this.setPrintMarginColumn=function(a){
        this.renderer.setPrintMarginColumn(a)
        },this.getPrintMarginColumn=function(){
        return this.renderer.getPrintMarginColumn()
        },this.$readOnly=!1,this.setReadOnly=function(a){
        this.$readOnly=a
        },this.getReadOnly=function(){
        return this.$readOnly
        },this.$modeBehaviours=!0,this.setBehavioursEnabled=function(a){
        this.$modeBehaviours=a
        },this.getBehavioursEnabled=function(){
        return this.$modeBehaviours
        },this.setShowFoldWidgets=function(a){
        var b=this.renderer.$gutterLayer;
        if(b.getShowFoldWidgets()==a)return;
        this.renderer.$gutterLayer.setShowFoldWidgets(a),this.$showFoldWidgets=a,this.renderer.updateFull()
        },this.getShowFoldWidgets=function(){
        return this.renderer.$gutterLayer.getShowFoldWidgets()
        },this.remove=function(a){
        this.selection.isEmpty()&&(a=="left"?this.selection.selectLeft():this.selection.selectRight());
        var b=this.getSelectionRange();
        if(this.getBehavioursEnabled()){
            var c=this.session,d=c.getState(b.start.row),e=c.getMode().transformAction(d,"deletion",this,c,b);
            e&&(b=e)
            }
            this.session.remove(b),this.clearSelection()
        },this.removeWordRight=function(){
        this.selection.isEmpty()&&this.selection.selectWordRight(),this.session.remove(this.getSelectionRange()),this.clearSelection()
        },this.removeWordLeft=function(){
        this.selection.isEmpty()&&this.selection.selectWordLeft(),this.session.remove(this.getSelectionRange()),this.clearSelection()
        },this.removeToLineStart=function(){
        this.selection.isEmpty()&&this.selection.selectLineStart(),this.session.remove(this.getSelectionRange()),this.clearSelection()
        },this.removeToLineEnd=function(){
        this.selection.isEmpty()&&this.selection.selectLineEnd();
        var a=this.getSelectionRange();
        a.start.column==a.end.column&&a.start.row==a.end.row&&(a.end.column=0,a.end.row++),this.session.remove(a),this.clearSelection()
        },this.splitLine=function(){
        this.selection.isEmpty()||(this.session.remove(this.getSelectionRange()),this.clearSelection());
        var a=this.getCursorPosition();
        this.insert("\n"),this.moveCursorToPosition(a)
        },this.transposeLetters=function(){
        if(!this.selection.isEmpty())return;
        var a=this.getCursorPosition(),b=a.column;
        if(b===0)return;
        var c=this.session.getLine(a.row),d,e;
        b<c.length?(d=c.charAt(b)+c.charAt(b-1),e=new l(a.row,b-1,a.row,b+1)):(d=c.charAt(b-1)+c.charAt(b-2),e=new l(a.row,b-2,a.row,b)),this.session.replace(e,d)
        },this.toLowerCase=function(){
        var a=this.getSelectionRange();
        this.selection.isEmpty()&&this.selection.selectWord();
        var b=this.getSelectionRange(),c=this.session.getTextRange(b);
        this.session.replace(b,c.toLowerCase()),this.selection.setSelectionRange(a)
        },this.toUpperCase=function(){
        var a=this.getSelectionRange();
        this.selection.isEmpty()&&this.selection.selectWord();
        var b=this.getSelectionRange(),c=this.session.getTextRange(b);
        this.session.replace(b,c.toUpperCase()),this.selection.setSelectionRange(a)
        },this.indent=function(){
        var a=this.session,b=this.getSelectionRange();
        if(!(b.start.row<b.end.row||b.start.column<b.end.column)){
            var d;
            if(this.session.getUseSoftTabs()){
                var f=a.getTabSize(),g=this.getCursorPosition(),h=a.documentToScreenColumn(g.row,g.column),i=f-h%f;
                d=e.stringRepeat(" ",i)
                }else d="\t";
            return this.insert(d)
            }
            var c=this.$getSelectedRows();
        a.indentRows(c.first,c.last,"\t")
        },this.blockOutdent=function(){
        var a=this.session.getSelection();
        this.session.outdentRows(a.getRange())
        },this.toggleCommentLines=function(){
        var a=this.session.getState(this.getCursorPosition().row),b=this.$getSelectedRows();
        this.session.getMode().toggleCommentLines(a,this.session,b.first,b.last)
        },this.removeLines=function(){
        var a=this.$getSelectedRows(),b;
        a.first===0||a.last+1<this.session.getLength()?b=new l(a.first,0,a.last+1,0):b=new l(a.first-1,this.session.getLine(a.first-1).length,a.last,this.session.getLine(a.last).length),this.session.remove(b),this.clearSelection()
        },this.moveLinesDown=function(){
        this.$moveLines(function(a,b){
            return this.session.moveLinesDown(a,b)
            })
        },this.moveLinesUp=function(){
        this.$moveLines(function(a,b){
            return this.session.moveLinesUp(a,b)
            })
        },this.moveText=function(a,b){
        return this.$readOnly?null:this.session.moveText(a,b)
        },this.copyLinesUp=function(){
        this.$moveLines(function(a,b){
            return this.session.duplicateLines(a,b),0
            })
        },this.copyLinesDown=function(){
        this.$moveLines(function(a,b){
            return this.session.duplicateLines(a,b)
            })
        },this.$moveLines=function(a){
        var b=this.$getSelectedRows(),c=this.selection;
        if(!c.isMultiLine())var d=c.getRange(),e=c.isBackwards();
        var f=a.call(this,b.first,b.last);
        d?(d.start.row+=f,d.end.row+=f,c.setSelectionRange(d,e)):(c.setSelectionAnchor(b.last+f+1,0),c.$moveSelection(function(){
            c.moveCursorTo(b.first+f,0)
            }))
        },this.$getSelectedRows=function(){
        var a=this.getSelectionRange().collapseRows();
        return{
            first:a.start.row,
            last:a.end.row
            }
        },this.onCompositionStart=function(a){
        this.renderer.showComposition(this.getCursorPosition())
        },this.onCompositionUpdate=function(a){
        this.renderer.setCompositionText(a)
        },this.onCompositionEnd=function(){
        this.renderer.hideComposition()
        },this.getFirstVisibleRow=function(){
        return this.renderer.getFirstVisibleRow()
        },this.getLastVisibleRow=function(){
        return this.renderer.getLastVisibleRow()
        },this.isRowVisible=function(a){
        return a>=this.getFirstVisibleRow()&&a<=this.getLastVisibleRow()
        },this.isRowFullyVisible=function(a){
        return a>=this.renderer.getFirstFullyVisibleRow()&&a<=this.renderer.getLastFullyVisibleRow()
        },this.$getVisibleRowCount=function(){
        return this.renderer.getScrollBottomRow()-this.renderer.getScrollTopRow()+1
        },this.$getPageDownRow=function(){
        return this.renderer.getScrollBottomRow()
        },this.$getPageUpRow=function(){
        var a=this.renderer.getScrollTopRow(),b=this.renderer.getScrollBottomRow();
        return a-(b-a)
        },this.selectPageDown=function(){
        var a=this.$getPageDownRow()+Math.floor(this.$getVisibleRowCount()/2);
        this.scrollPageDown();
        var b=this.getSelection(),c=this.session.documentToScreenPosition(b.getSelectionLead()),d=this.session.screenToDocumentPosition(a,c.column);
        b.selectTo(d.row,d.column)
        },this.selectPageUp=function(){
        var a=this.renderer.getScrollTopRow()-this.renderer.getScrollBottomRow(),b=this.$getPageUpRow()+Math.round(a/2);
        this.scrollPageUp();
        var c=this.getSelection(),d=this.session.documentToScreenPosition(c.getSelectionLead()),e=this.session.screenToDocumentPosition(b,d.column);
        c.selectTo(e.row,e.column)
        },this.gotoPageDown=function(){
        var a=this.$getPageDownRow(),b=this.getCursorPositionScreen().column;
        this.scrollToRow(a),this.getSelection().moveCursorToScreen(a,b)
        },this.gotoPageUp=function(){
        var a=this.$getPageUpRow(),b=this.getCursorPositionScreen().column;
        this.scrollToRow(a),this.getSelection().moveCursorToScreen(a,b)
        },this.scrollPageDown=function(){
        this.scrollToRow(this.$getPageDownRow())
        },this.scrollPageUp=function(){
        this.renderer.scrollToRow(this.$getPageUpRow())
        },this.scrollToRow=function(a){
        this.renderer.scrollToRow(a)
        },this.scrollToLine=function(a,b){
        this.renderer.scrollToLine(a,b)
        },this.centerSelection=function(){
        var a=this.getSelectionRange(),b=Math.floor(a.start.row+(a.end.row-a.start.row)/2);
        this.renderer.scrollToLine(b,!0)
        },this.getCursorPosition=function(){
        return this.selection.getCursor()
        },this.getCursorPositionScreen=function(){
        return this.session.documentToScreenPosition(this.getCursorPosition())
        },this.getSelectionRange=function(){
        return this.selection.getRange()
        },this.selectAll=function(){
        this.$blockScrolling+=1,this.selection.selectAll(),this.$blockScrolling-=1
        },this.clearSelection=function(){
        this.selection.clearSelection()
        },this.moveCursorTo=function(a,b){
        this.selection.moveCursorTo(a,b)
        },this.moveCursorToPosition=function(a){
        this.selection.moveCursorToPosition(a)
        },this.gotoLine=function(a,b){
        this.selection.clearSelection(),this.session.unfold({
            row:a-1,
            column:b||0
            }),this.$blockScrolling+=1,this.moveCursorTo(a-1,b||0),this.$blockScrolling-=1,this.isRowFullyVisible(this.getCursorPosition().row)||this.scrollToLine(a,!0)
        },this.navigateTo=function(a,b){
        this.clearSelection(),this.moveCursorTo(a,b)
        },this.navigateUp=function(a){
        this.selection.clearSelection(),a=a||1,this.selection.moveCursorBy(-a,0)
        },this.navigateDown=function(a){
        this.selection.clearSelection(),a=a||1,this.selection.moveCursorBy(a,0)
        },this.navigateLeft=function(a){
        if(!this.selection.isEmpty()){
            var b=this.getSelectionRange().start;
            this.moveCursorToPosition(b)
            }else{
            a=a||1;
            while(a--)this.selection.moveCursorLeft()
                }
                this.clearSelection()
        },this.navigateRight=function(a){
        if(!this.selection.isEmpty()){
            var b=this.getSelectionRange().end;
            this.moveCursorToPosition(b)
            }else{
            a=a||1;
            while(a--)this.selection.moveCursorRight()
                }
                this.clearSelection()
        },this.navigateLineStart=function(){
        this.selection.moveCursorLineStart(),this.clearSelection()
        },this.navigateLineEnd=function(){
        this.selection.moveCursorLineEnd(),this.clearSelection()
        },this.navigateFileEnd=function(){
        this.selection.moveCursorFileEnd(),this.clearSelection()
        },this.navigateFileStart=function(){
        this.selection.moveCursorFileStart(),this.clearSelection()
        },this.navigateWordRight=function(){
        this.selection.moveCursorWordRight(),this.clearSelection()
        },this.navigateWordLeft=function(){
        this.selection.moveCursorWordLeft(),this.clearSelection()
        },this.replace=function(a,b){
            b&&this.$search.set(b);
            var c=this.$search.find(this.session);   
            if(!c)return;
            this.$tryReplace(c,a),c!==null&&this.selection.setSelectionRange(c)
        },this.replaceAll=function(a,b){
            b&&this.$search.set(b);
            var c=this.$search.findAll(this.session);
            if(!c.length)return;
            var d=this.getSelectionRange();
            this.clearSelection(),this.selection.moveCursorTo(0,0),this.$blockScrolling+=1;
            for(var e=c.length-1;e>=0;--e)this.$tryReplace(c[e],a);
            this.selection.setSelectionRange(d),this.$blockScrolling-=1
        },this.$tryReplace=function(a,b){
            var c=this.session.getTextRange(a);
            return b=this.$search.replace(c,b),b!==null?(a.end=this.session.replace(a,b),a):null
        },this.getLastSearchOptions=function(){
        return this.$search.getOptions()
        },this.find=function(a,b){
            this.clearSelection(),b=b||{},b.needle=a,this.$search.set(b),this.$find()
        },this.findNext=function(a){
            a=a||{},typeof a.backwards=="undefined"&&(a.backwards=!1),this.$search.set(a),this.$find()
        },this.findPrevious=function(a){
            a=a||{},typeof a.backwards=="undefined"&&(a.backwards=!0),this.$search.set(a),this.$find()
        },this.$find=function(a){
            this.selection.isEmpty()||this.$search.set({
                needle:this.session.getTextRange(this.getSelectionRange())
                }),typeof a!="undefined"&&this.$search.set({
                backwards:a
            });
            var b=this.$search.find(this.session);
            b&&(this.session.unfold(b),this.gotoLine(b.end.row+1,b.end.column),this.selection.setSelectionRange(b))
        },
        this.undo=function(){
        this.session.getUndoManager().undo();       
        },this.redo=function(){
        this.session.getUndoManager().redo()
        },this.destroy=function(){
        this.renderer.destroy()
        }
    })).call(p.prototype),b.Editor=p
}),define("ace/lib/lang",["require","exports","module"],function(a,b,c){
    b.stringReverse=function(a){
        return a.split("").reverse().join("")
        },b.stringRepeat=function(a,b){
        return(new Array(b+1)).join(a)
        };
        
    var d=/^\s\s*/,e=/\s\s*$/;
    b.stringTrimLeft=function(a){
        return a.replace(d,"")
        },b.stringTrimRight=function(a){
        return a.replace(e,"")
        },b.copyObject=function(a){
        var b={};
        
        for(var c in a)b[c]=a[c];return b
        },b.copyArray=function(a){
        var b=[];
        for(var c=0,d=a.length;c<d;c++)a[c]&&typeof a[c]=="object"?b[c]=this.copyObject(a[c]):b[c]=a[c];
        return b
        },b.deepCopy=function(a){
        if(typeof a!="object")return a;
        var b=a.constructor();
        for(var c in a)typeof a[c]=="object"?b[c]=this.deepCopy(a[c]):b[c]=a[c];return b
        },b.arrayToMap=function(a){
        var b={};
        
        for(var c=0;c<a.length;c++)b[a[c]]=1;
        return b
        },b.arrayRemove=function(a,b){
        for(var c=0;c<=a.length;c++)b===a[c]&&a.splice(c,1)
            },b.escapeRegExp=function(a){
        return a.replace(/([.*+?^${}()|[\]\/\\])/g,"\\$1")
        },b.deferredCall=function(a){
        var b=null,c=function(){
            b=null,a()
            },d=function(a){
            return d.cancel(),b=setTimeout(c,a||0),d
            };
            
        return d.schedule=d,d.call=function(){
            return this.cancel(),a(),d
            },d.cancel=function(){
            return clearTimeout(b),b=null,d
            },d
        }
    }),define("ace/keyboard/textinput",["require","exports","module","ace/lib/event","ace/lib/useragent","ace/lib/dom"],function(a,b,c){
    var d=a("../lib/event"),e=a("../lib/useragent"),f=a("../lib/dom"),g=function(a,b){
        function l(){
            try{
                c.select()
                }catch(a){}
        }
        function m(a){
        if(!i){
            var d=a||c.value;
            if(d){
                d.charCodeAt(d.length-1)==g.charCodeAt(0)?(d=d.slice(0,-1),d&&b.onTextInput(d,j)):b.onTextInput(d,j);
                if(!v())return!1
                    }
                }
        i=!1,j=!1,c.value=g,l()
    }
    function v(){
    return document.activeElement===c
    }
    var c=f.createElement("textarea");
    e.isTouchPad&&c.setAttribute("x-palm-disable-auto-cap",!0),c.style.left="-10000px",a.appendChild(c);
    var g=String.fromCharCode(0);
    m();
    var h=!1,i=!1,j=!1,k="",n=function(a){
    setTimeout(function(){
        h||m(a.data)
        },0)
    },o=function(a){
    if(e.isOldIE&&c.value.charCodeAt(0)>128)return;
    setTimeout(function(){
        h||m()
        },0)
    },p=function(a){
    h=!0,b.onCompositionStart(),e.isGecko||setTimeout(q,0)
    },q=function(){
    if(!h)return;
    b.onCompositionUpdate(c.value)
    },r=function(a){
    h=!1,b.onCompositionEnd()
    },s=function(a){
    i=!0;
    var d=b.getCopyText();
    d?c.value=d:a.preventDefault(),l(),setTimeout(function(){
        m()
        },0)
    },t=function(a){
    i=!0;
    var d=b.getCopyText();
    d?(c.value=d,b.onCut()):a.preventDefault(),l(),setTimeout(function(){
        m()
        },0)
    };
    
d.addCommandKeyListener(c,b.onCommandKey.bind(b));
    if(e.isOldIE){
    var u={
        13:1,
        27:1
    };
    
    d.addListener(c,"keyup",function(a){
        h&&(!c.value||u[a.keyCode])&&setTimeout(r,0);
        if((c.value.charCodeAt(0)|0)<129)return;
        h?q():p()
        })
    }
    "onpropertychange"in c&&!("oninput"in c)?d.addListener(c,"propertychange",o):d.addListener(c,"input",n),d.addListener(c,"paste",function(a){
    j=!0,a.clipboardData&&a.clipboardData.getData?(m(a.clipboardData.getData("text/plain")),a.preventDefault()):o()
    }),"onbeforecopy"in c&&typeof clipboardData!="undefined"?(d.addListener(c,"beforecopy",function(a){
    var c=b.getCopyText();
    c?clipboardData.setData("Text",c):a.preventDefault()
    }),d.addListener(a,"keydown",function(a){
    if(a.ctrlKey&&a.keyCode==88){
        var c=b.getCopyText();
        c&&(clipboardData.setData("Text",c),b.onCut()),d.preventDefault(a)
        }
    })):(d.addListener(c,"copy",s),d.addListener(c,"cut",t)),d.addListener(c,"compositionstart",p),e.isGecko&&d.addListener(c,"text",q),e.isWebKit&&d.addListener(c,"keyup",q),d.addListener(c,"compositionend",r),d.addListener(c,"blur",function(){
    b.onBlur()
    }),d.addListener(c,"focus",function(){
    b.onFocus(),l()
    }),this.focus=function(){
    b.onFocus(),l(),c.focus()
    },this.blur=function(){
    c.blur()
    },this.isFocused=v,this.getElement=function(){
    return c
    },this.onContextMenu=function(a,b){
    a&&(k||(k=c.style.cssText),c.style.cssText="position:fixed; z-index:1000;left:"+(a.x-2)+"px; top:"+(a.y-2)+"px;"),b&&(c.value="")
    },this.onContextMenuClose=function(){
    setTimeout(function(){
        k&&(c.style.cssText=k,k=""),m()
        },0)
    }
};

b.TextInput=g
}),define("ace/mouse/mouse_handler",["require","exports","module","ace/lib/event","ace/mouse/default_handlers","ace/mouse/mouse_event"],function(a,b,c){
    var d=a("../lib/event"),e=a("./default_handlers").DefaultHandlers,f=a("./mouse_event").MouseEvent,g=function(a){
        this.editor=a,this.defaultHandlers=new e(a),d.addListener(a.container,"mousedown",function(b){
            return a.focus(),d.preventDefault(b)
            }),d.addListener(a.container,"selectstart",function(a){
            return d.preventDefault(a)
            });
        var b=a.renderer.getMouseEventTarget();
        d.addListener(b,"mousedown",this.onMouseDown.bind(this)),d.addListener(b,"click",this.onMouseClick.bind(this)),d.addListener(b,"mousemove",this.onMouseMove.bind(this)),d.addMultiMouseDownListener(b,0,2,500,this.onMouseDoubleClick.bind(this)),d.addMultiMouseDownListener(b,0,3,600,this.onMouseTripleClick.bind(this)),d.addMultiMouseDownListener(b,0,4,600,this.onMouseQuadClick.bind(this)),d.addMouseWheelListener(a.container,this.onMouseWheel.bind(this))
        };
    ((function(){
        this.$scrollSpeed=1,this.setScrollSpeed=function(a){
            this.$scrollSpeed=a
            },this.getScrollSpeed=function(){
            return this.$scrollSpeed
            },this.onMouseDown=function(a){
            this.editor._dispatchEvent("mousedown",new f(a,this.editor))
            },this.onMouseClick=function(a){
            this.editor._dispatchEvent("click",new f(a,this.editor))
            },this.onMouseMove=function(a){
            var b=this.editor._eventRegistry&&this.editor._eventRegistry.mousemove;
            if(!b||!b.length)return;
            this.editor._dispatchEvent("mousemove",new f(a,this.editor))
            },this.onMouseDoubleClick=function(a){
            this.editor._dispatchEvent("dblclick",new f(a,this.editor))
            },this.onMouseTripleClick=function(a){
            this.editor._dispatchEvent("tripleclick",new f(a,this.editor))
            },this.onMouseQuadClick=function(a){
            this.editor._dispatchEvent("quadclick",new f(a,this.editor))
            },this.onMouseWheel=function(a){
            var b=new f(a,this.editor);
            b.speed=this.$scrollSpeed*2,b.wheelX=a.wheelX,b.wheelY=a.wheelY,this.editor._dispatchEvent("mousewheel",b)
            }
        })).call(g.prototype),b.MouseHandler=g
    }),define("ace/mouse/default_handlers",["require","exports","module","ace/lib/event","ace/lib/dom","ace/lib/event_emitter","ace/lib/browser_focus"],function(a,b,c){
    function m(a){
        this.editor=a,this.$clickSelection=null,this.browserFocus=new g,a.setDefaultHandler("mousedown",this.onMouseDown.bind(this)),a.setDefaultHandler("dblclick",this.onDoubleClick.bind(this)),a.setDefaultHandler("tripleclick",this.onTripleClick.bind(this)),a.setDefaultHandler("quadclick",this.onQuadClick.bind(this)),a.setDefaultHandler("mousewheel",this.onScroll.bind(this))
        }
        function n(a,b,c,d){
        return Math.sqrt(Math.pow(c-a,2)+Math.pow(d-b,2))
        }
        var d=a("../lib/event"),e=a("../lib/dom"),f=a("../lib/event_emitter").EventEmitter,g=a("../lib/browser_focus").BrowserFocus,h=0,i=1,j=2,k=250,l=5;
    ((function(){
        this.onMouseDown=function(a){
            function E(b){
                a.getShiftKey()?m.selection.selectToPosition(b):o.$clickSelection||(m.moveCursorToPosition(b),m.selection.clearSelection(b.row,b.column)),r=i
                }
                var b=a.inSelection(),c=a.pageX,f=a.pageY,g=a.getDocumentPosition(),m=this.editor,o=this,p=m.getSelectionRange(),q=p.isEmpty(),r=h;
            if(b&&(!this.browserFocus.isFocused()||(new Date).getTime()-this.browserFocus.lastFocus<20||!m.isFocused())){
                m.focus();
                return
            }
            var s=a.getButton();
            if(s!==0){
                q&&m.moveCursorToPosition(g),s==2&&(m.textInput.onContextMenu({
                    x:a.clientX,
                    y:a.clientY
                    },q),d.capture(m.container,function(){},m.textInput.onContextMenuClose));
                return
            }
            var t=m.session.getFoldAt(g.row,g.column,1);
            if(t){
                m.selection.setSelectionRange(t.range);
                return
            }
            b||E(g);
            var u=c,v=f,w=m.getOverwrite(),x=(new Date).getTime(),y,z,A=function(a){
                u=d.getDocumentX(a),v=d.getDocumentY(a)
                },B=function(a){
                clearInterval(H),r==h?E(g):r==j&&C(a),o.$clickSelection=null,r=h
                },C=function(a){
                e.removeCssClass(m.container,"ace_dragging"),m.session.removeMarker(dragSelectionMarker),m.$mouseHandler.$clickSelection||y||(m.moveCursorToPosition(g),m.selection.clearSelection(g.row,g.column));
                if(!y)return;
                if(z.contains(y.row,y.column)){
                    y=null;
                    return
                }
                m.clearSelection();
                if(a&&(a.ctrlKey||a.altKey))var b=m.session,c=b.insert(y,b.getTextRange(z));else var c=m.moveText(z,y);
                if(!c){
                    y=null;
                    return
                }
                m.selection.setSelectionRange(c)
                },D=function(){
                if(r==h){
                    var a=n(c,f,u,v),b=(new Date).getTime();
                    if(a>l){
                        r=i;
                        var d=m.renderer.screenToTextCoordinates(u,v);
                        d.row=Math.max(0,Math.min(d.row,m.session.getLength()-1)),E(d)
                        }else if(b-x>k){
                        r=j,z=m.getSelectionRange();
                        var g=m.getSelectionStyle();
                        dragSelectionMarker=m.session.addMarker(z,"ace_selection",g),m.clearSelection(),e.addCssClass(m.container,"ace_dragging")
                        }
                    }
                r==j?G():r==i&&F()
            },F=function(){
            var a,b=m.renderer.screenToTextCoordinates(u,v);
            b.row=Math.max(0,Math.min(b.row,m.session.getLength()-1)),o.$clickSelection?o.$clickSelection.contains(b.row,b.column)?m.selection.setSelectionRange(o.$clickSelection):(o.$clickSelection.compare(b.row,b.column)==-1?a=o.$clickSelection.end:a=o.$clickSelection.start,m.selection.setSelectionAnchor(a.row,a.column),m.selection.selectToPosition(b)):m.selection.selectToPosition(b),m.renderer.scrollCursorIntoView()
            },G=function(){
            y=m.renderer.screenToTextCoordinates(u,v),y.row=Math.max(0,Math.min(y.row,m.session.getLength()-1)),m.moveCursorToPosition(y)
            };
            
        d.capture(m.container,A,B);
        var H=setInterval(D,20);
        return a.preventDefault()
        },this.onDoubleClick=function(a){
        var b=a.getDocumentPosition(),c=this.editor,d=c.session.getFoldAt(b.row,b.column,1);
        d?a.getAccelKey()?c.session.removeFold(d):c.session.expandFold(d):(c.moveCursorToPosition(b),c.selection.selectWord(),this.$clickSelection=c.getSelectionRange())
        },this.onTripleClick=function(a){
        var b=a.getDocumentPosition(),c=this.editor;
        c.moveCursorToPosition(b),c.selection.selectLine(),this.$clickSelection=c.getSelectionRange()
        },this.onQuadClick=function(a){
        var b=this.editor;
        b.selectAll(),this.$clickSelection=b.getSelectionRange()
        },this.onScroll=function(a){
        var b=this.editor;
        b.renderer.scrollBy(a.wheelX*a.speed,a.wheelY*a.speed);
        if(b.renderer.isScrollableBy(a.wheelX*a.speed,a.wheelY*a.speed))return a.preventDefault()
            }
        })).call(m.prototype),b.DefaultHandlers=m
}),define("ace/lib/event_emitter",["require","exports","module"],function(a,b,c){
    var d={};
    
    d._emit=d._dispatchEvent=function(a,b){
        this._eventRegistry=this._eventRegistry||{},this._defaultHandlers=this._defaultHandlers||{};
        
        var c=this._eventRegistry[a]||[],d=this._defaultHandlers[a];
        if(!c.length&&!d)return;
        b=b||{},b.type=a,b.stopPropagation||(b.stopPropagation=function(){
            this.propagationStopped=!0
            }),b.preventDefault||(b.preventDefault=function(){
            this.defaultPrevented=!0
            });
        for(var e=0;e<c.length;e++){
            c[e](b);
            if(b.propagationStopped)break
        }
        d&&!b.defaultPrevented&&d(b)
        },d.setDefaultHandler=function(a,b){
        this._defaultHandlers=this._defaultHandlers||{};
        
        if(this._defaultHandlers[a])throw new Error("The default handler for '"+a+"' is already set");
        this._defaultHandlers[a]=b
        },d.on=d.addEventListener=function(a,b){
        this._eventRegistry=this._eventRegistry||{};
        
        var c=this._eventRegistry[a];
        if(!c)var c=this._eventRegistry[a]=[];
        c.indexOf(b)==-1&&c.push(b)
        },d.removeListener=d.removeEventListener=function(a,b){
        this._eventRegistry=this._eventRegistry||{};
        
        var c=this._eventRegistry[a];
        if(!c)return;
        var d=c.indexOf(b);
        d!==-1&&c.splice(d,1)
        },d.removeAllListeners=function(a){
        this._eventRegistry&&(this._eventRegistry[a]=[])
        },b.EventEmitter=d
    }),define("ace/lib/browser_focus",["require","exports","module","ace/lib/oop","ace/lib/event","ace/lib/event_emitter"],function(a,b,c){
    var d=a("./oop"),e=a("./event"),f=a("./event_emitter").EventEmitter,g=function(a){
        a=a||window,this.lastFocus=(new Date).getTime(),this._isFocused=!0;
        var b=this;
        "onfocusin"in a.document?(e.addListener(a.document,"focusin",function(a){
            b._setFocused(!0)
            }),e.addListener(a.document,"focusout",function(a){
            b._setFocused(!!a.toElement)
            })):(e.addListener(a,"blur",function(a){
            b._setFocused(!1)
            }),e.addListener(a,"focus",function(a){
            b._setFocused(!0)
            }))
        };
    ((function(){
        d.implement(this,f),this.isFocused=function(){
            return this._isFocused
            },this._setFocused=function(a){
            if(this._isFocused==a)return;
            a&&(this.lastFocus=(new Date).getTime()),this._isFocused=a,this._emit("changeFocus")
            }
        })).call(g.prototype),b.BrowserFocus=g
    }),define("ace/mouse/mouse_event",["require","exports","module","ace/lib/event","ace/lib/dom"],function(a,b,c){
    var d=a("../lib/event"),e=a("../lib/dom"),f=b.MouseEvent=function(a,b){
        this.domEvent=a,this.editor=b,this.pageX=d.getDocumentX(a),this.pageY=d.getDocumentY(a),this.clientX=a.clientX,this.clientY=a.clientY,this.$pos=null,this.$inSelection=null,this.propagationStopped=!1,this.defaultPrevented=!1
        };
    ((function(){
        this.stopPropagation=function(){
            d.stopPropagation(this.domEvent),this.propagationStopped=!0
            },this.preventDefault=function(){
            d.preventDefault(this.domEvent),this.defaultPrevented=!0
            },this.getDocumentPosition=function(){
            if(this.$pos)return this.$pos;
            var a=d.getDocumentX(this.domEvent),b=d.getDocumentY(this.domEvent);
            return this.$pos=this.editor.renderer.screenToTextCoordinates(a,b),this.$pos.row=Math.max(0,Math.min(this.$pos.row,this.editor.session.getLength()-1)),this.$pos
            },this.inSelection=function(){
            if(this.$inSelection!==null)return this.$inSelection;
            var a=this.editor;
            if(a.getReadOnly())this.$inSelection=!1;
            else{
                var b=a.getSelectionRange();
                if(b.isEmpty())this.$inSelection=!1;
                else{
                    var c=this.getDocumentPosition();
                    this.$inSelection=b.contains(c.row,c.column)
                    }
                }
            return this.$inSelection
        },this.getButton=function(){
        return d.getButton(this.domEvent)
        },this.getShiftKey=function(){
        return this.domEvent.shiftKey
        },this.getAccelKey=function(){
        return this.domEvent.ctrlKey||this.domEvent.metaKey
        }
    })).call(f.prototype)
}),define("ace/keyboard/keybinding",["require","exports","module","ace/lib/keys","ace/lib/event","ace/commands/default_commands"],function(a,b,c){
    var d=a("../lib/keys"),e=a("../lib/event");
    a("../commands/default_commands");
    var f=function(a){
        this.$editor=a,this.$data={},this.$handlers=[this]
        };
    ((function(){
        this.setKeyboardHandler=function(a){
            if(this.$handlers[this.$handlers.length-1]==a)return;
            this.$data={},this.$handlers=a?[this,a]:[this]
            },this.addKeyboardHandler=function(a){
            this.removeKeyboardHandler(a),this.$handlers.push(a)
            },this.removeKeyboardHandler=function(a){
            var b=this.$handlers.indexOf(a);
            return b==-1?!1:(this.$handlers.splice(b,1),!0)
            },this.getKeyboardHandler=function(){
            return this.$handlers[this.$handlers-1]
            },this.$callKeyboardHandlers=function(a,b,c,d){
            var f;
            for(var g=this.$handlers.length;g--;){
                f=this.$handlers[g].handleKeyboard(this.$data,a,b,c,d);
                if(f&&f.command)break
            }
            if(!f||!f.command)return!1;
            var h=!1,i=this.$editor.commands;
            return f.command!="null"?h=i.exec(f.command,this.$editor,f.args):h=!0,h&&d&&e.stopEvent(d),h
            },this.handleKeyboard=function(a,b,c){
            return{
                command:this.$editor.commands.findKeyCommand(b,c)
                }
            },this.onCommandKey=function(a,b,c){
        var e=d.keyCodeToString(c);
        this.$callKeyboardHandlers(b,e,c,a)
        },this.onTextInput=function(a,b){
        var c=!1;
        !b&&a.length==1&&(c=this.$callKeyboardHandlers(0,a)),c||this.$editor.commands.exec("insertstring",this.$editor,a)
        }
    })).call(f.prototype),b.KeyBinding=f
}),define("ace/commands/default_commands",["require","exports","module","ace/lib/lang"],function(a,b,c){
    function e(a,b){
        return{
            win:a,
            mac:b
        }
    }
    var d=a("../lib/lang");
    b.commands=[{
    name:"selectall",
    bindKey:e("Ctrl-A","Command-A"),
    exec:function(a){
        a.selectAll()
        },
    readOnly:!0
    },{
    name:"centerselection",
    bindKey:e(null,"Ctrl-L"),
    exec:function(a){
        a.centerSelection()
        },
    readOnly:!0
    },{
    name:"gotoline",
    bindKey:e("Ctrl-L","Command-L"),
    exec:function(a){
        var b=parseInt(prompt("Enter line number:"));
        isNaN(b)||a.gotoLine(b)
        },
    readOnly:!0
    },{
    name:"fold",
    bindKey:e("Alt-L","Alt-L"),
    exec:function(a){
        a.session.toggleFold(!1)
        },
    readOnly:!0
    },{
    name:"unfold",
    bindKey:e("Alt-Shift-L","Alt-Shift-L"),
    exec:function(a){
        a.session.toggleFold(!0)
        },
    readOnly:!0
    },{
    name:"foldall",
    bindKey:e("Alt-0","Alt-0"),
    exec:function(a){
        a.session.foldAll()
        },
    readOnly:!0
    },{
    name:"unfoldall",
    bindKey:e("Alt-Shift-0","Alt-Shift-0"),
    exec:function(a){
        a.session.unfold()
        },
    readOnly:!0
    },{
    name:"findnext",
    bindKey:e("Ctrl-K","Command-G"),
    exec:function(a){
        a.findNext()
        },
    readOnly:!0
    },{
    name:"findprevious",
    bindKey:e("Ctrl-Shift-K","Command-Shift-G"),
    exec:function(a){
        a.findPrevious()
        },
    readOnly:!0
    },{
    name:"find",
    bindKey:e("Ctrl-F","Command-F"),
    exec:function(a){
        var b=prompt("Find:",a.getCopyText());
        a.find(b)
        },
    readOnly:!0
    },{
    name:"overwrite",
    bindKey:e("Insert","Insert"),
    exec:function(a){
        a.toggleOverwrite()
        },
    readOnly:!0
    },{
    name:"selecttostart",
    bindKey:e("Ctrl-Shift-Home|Alt-Shift-Up","Command-Shift-Up"),
    exec:function(a){
        a.getSelection().selectFileStart()
        },
    readOnly:!0
    },{
    name:"gotostart",
    bindKey:e("Ctrl-Home|Ctrl-Up","Command-Home|Command-Up"),
    exec:function(a){
        a.navigateFileStart()
        },
    readOnly:!0
    },{
    name:"selectup",
    bindKey:e("Shift-Up","Shift-Up"),
    exec:function(a){
        a.getSelection().selectUp()
        },
    readOnly:!0
    },{
    name:"golineup",
    bindKey:e("Up","Up|Ctrl-P"),
    exec:function(a,b){
        a.navigateUp(b.times)
        },
    readOnly:!0
    },{
    name:"selecttoend",
    bindKey:e("Ctrl-Shift-End|Alt-Shift-Down","Command-Shift-Down"),
    exec:function(a){
        a.getSelection().selectFileEnd()
        },
    readOnly:!0
    },{
    name:"gotoend",
    bindKey:e("Ctrl-End|Ctrl-Down","Command-End|Command-Down"),
    exec:function(a){
        a.navigateFileEnd()
        },
    readOnly:!0
    },{
    name:"selectdown",
    bindKey:e("Shift-Down","Shift-Down"),
    exec:function(a){
        a.getSelection().selectDown()
        },
    readOnly:!0
    },{
    name:"golinedown",
    bindKey:e("Down","Down|Ctrl-N"),
    exec:function(a,b){
        a.navigateDown(b.times)
        },
    readOnly:!0
    },{
    name:"selectwordleft",
    bindKey:e("Ctrl-Shift-Left","Option-Shift-Left"),
    exec:function(a){
        a.getSelection().selectWordLeft()
        },
    readOnly:!0
    },{
    name:"gotowordleft",
    bindKey:e("Ctrl-Left","Option-Left"),
    exec:function(a){
        a.navigateWordLeft()
        },
    readOnly:!0
    },{
    name:"selecttolinestart",
    bindKey:e("Alt-Shift-Left","Command-Shift-Left"),
    exec:function(a){
        a.getSelection().selectLineStart()
        },
    readOnly:!0
    },{
    name:"gotolinestart",
    bindKey:e("Alt-Left|Home","Command-Left|Home|Ctrl-A"),
    exec:function(a){
        a.navigateLineStart()
        },
    readOnly:!0
    },{
    name:"selectleft",
    bindKey:e("Shift-Left","Shift-Left"),
    exec:function(a){
        a.getSelection().selectLeft()
        },
    readOnly:!0
    },{
    name:"gotoleft",
    bindKey:e("Left","Left|Ctrl-B"),
    exec:function(a,b){
        a.navigateLeft(b.times)
        },
    readOnly:!0
    },{
    name:"selectwordright",
    bindKey:e("Ctrl-Shift-Right","Option-Shift-Right"),
    exec:function(a){
        a.getSelection().selectWordRight()
        },
    readOnly:!0
    },{
    name:"gotowordright",
    bindKey:e("Ctrl-Right","Option-Right"),
    exec:function(a){
        a.navigateWordRight()
        },
    readOnly:!0
    },{
    name:"selecttolineend",
    bindKey:e("Alt-Shift-Right","Command-Shift-Right"),
    exec:function(a){
        a.getSelection().selectLineEnd()
        },
    readOnly:!0
    },{
    name:"gotolineend",
    bindKey:e("Alt-Right|End","Command-Right|End|Ctrl-E"),
    exec:function(a){
        a.navigateLineEnd()
        },
    readOnly:!0
    },{
    name:"selectright",
    bindKey:e("Shift-Right","Shift-Right"),
    exec:function(a){
        a.getSelection().selectRight()
        },
    readOnly:!0
    },{
    name:"gotoright",
    bindKey:e("Right","Right|Ctrl-F"),
    exec:function(a,b){
        a.navigateRight(b.times)
        },
    readOnly:!0
    },{
    name:"selectpagedown",
    bindKey:e("Shift-PageDown","Shift-PageDown"),
    exec:function(a){
        a.selectPageDown()
        },
    readOnly:!0
    },{
    name:"pagedown",
    bindKey:e(null,"PageDown"),
    exec:function(a){
        a.scrollPageDown()
        },
    readOnly:!0
    },{
    name:"gotopagedown",
    bindKey:e("PageDown","Option-PageDown|Ctrl-V"),
    exec:function(a){
        a.gotoPageDown()
        },
    readOnly:!0
    },{
    name:"selectpageup",
    bindKey:e("Shift-PageUp","Shift-PageUp"),
    exec:function(a){
        a.selectPageUp()
        },
    readOnly:!0
    },{
    name:"pageup",
    bindKey:e(null,"PageUp"),
    exec:function(a){
        a.scrollPageUp()
        },
    readOnly:!0
    },{
    name:"gotopageup",
    bindKey:e("PageUp","Option-PageUp"),
    exec:function(a){
        a.gotoPageUp()
        },
    readOnly:!0
    },{
    name:"selectlinestart",
    bindKey:e("Shift-Home","Shift-Home"),
    exec:function(a){
        a.getSelection().selectLineStart()
        },
    readOnly:!0
    },{
    name:"selectlineend",
    bindKey:e("Shift-End","Shift-End"),
    exec:function(a){
        a.getSelection().selectLineEnd()
        },
    readOnly:!0
    },{
    name:"togglerecording",
    bindKey:e("Ctrl-Alt-E","Command-Option-E"),
    exec:function(a){
        a.commands.toggleRecording()
        },
    readOnly:!0
    },{
    name:"replaymacro",
    bindKey:e("Ctrl-Shift-E","Command-Shift-E"),
    exec:function(a){
        a.commands.replay(a)
        },
    readOnly:!0
    },{
    name:"removeline",
    bindKey:e("Ctrl-D","Command-D"),
    exec:function(a){
        a.removeLines()
        }
    },{
    name:"togglecomment",
    bindKey:e("Ctrl-7","Command-7"),
    exec:function(a){
        a.toggleCommentLines()
        }
    },{
    name:"replace",
    bindKey:e("Ctrl-R","Command-Option-F"),
    exec:function(a){
        var b=prompt("Find:",a.getCopyText());
        if(!b)return;
        var c=prompt("Replacement:");
        if(!c)return;
        a.replace(c,{
            needle:b
        })
        }
    },{
    name:"replaceall",
    bindKey:e("Ctrl-Shift-R","Command-Shift-Option-F"),
    exec:function(a){
        var b=prompt("Find:");
        if(!b)return;
        var c=prompt("Replacement:");
        if(!c)return;
        a.replaceAll(c,{
            needle:b
        })
        }
    },{
    name:"undo",
    bindKey:e("Ctrl-Z","Command-Z"),
    exec:function(a){
        a.undo()
        }
    },{
    name:"redo",
    bindKey:e("Ctrl-Shift-Z|Ctrl-Y","Command-Shift-Z|Command-Y"),
    exec:function(a){
        a.redo()
        }
    },{
    name:"copylinesup",
    bindKey:e("Ctrl-Alt-Up","Command-Option-Up"),
    exec:function(a){
        a.copyLinesUp()
        }
    },{
    name:"movelinesup",
    bindKey:e("Alt-Up","Option-Up"),
    exec:function(a){
        a.moveLinesUp()
        }
    },{
    name:"copylinesdown",
    bindKey:e("Ctrl-Alt-Down","Command-Option-Down"),
    exec:function(a){
        a.copyLinesDown()
        }
    },{
    name:"movelinesdown",
    bindKey:e("Alt-Down","Option-Down"),
    exec:function(a){
        a.moveLinesDown()
        }
    },{
    name:"del",
    bindKey:e("Delete","Delete|Ctrl-D"),
    exec:function(a){
        a.remove("right")
        }
    },{
    name:"backspace",
    bindKey:e("Ctrl-Backspace|Command-Backspace|Option-Backspace|Shift-Backspace|Backspace","Ctrl-Backspace|Command-Backspace|Shift-Backspace|Backspace|Ctrl-H"),
    exec:function(a){
        a.remove("left")
        }
    },{
    name:"removetolinestart",
    bindKey:e("Alt-Backspace","Option-Backspace"),
    exec:function(a){
        a.removeToLineStart()
        }
    },{
    name:"removetolineend",
    bindKey:e("Alt-Delete","Ctrl-K"),
    exec:function(a){
        a.removeToLineEnd()
        }
    },{
    name:"removewordleft",
    bindKey:e("Ctrl-Backspace","Alt-Backspace|Ctrl-Alt-Backspace"),
    exec:function(a){
        a.removeWordLeft()
        }
    },{
    name:"removewordright",
    bindKey:e("Ctrl-Delete","Alt-Delete"),
    exec:function(a){
        a.removeWordRight()
        }
    },{
    name:"outdent",
    bindKey:e("Shift-Tab","Shift-Tab"),
    exec:function(a){
        a.blockOutdent()
        }
    },{
    name:"indent",
    bindKey:e("Tab","Tab"),
    exec:function(a){
        a.indent()
        }
    }, 
    {
    name:"insertstring",
    exec:function(a,b){console.log('ace linea 2001...insertstring ');
        a.insert(b)
        }
    },{
    name:"inserttext",
    exec:function(a,b){console.log('ace linea 2006...inserttext ');
        a.insert(d.stringRepeat(b.text||"",b.times||1))
        }
    },{
    name:"splitline",
    bindKey:e(null,"Ctrl-O"),
    exec:function(a){
        a.splitLine()
        }
    },{
    name:"transposeletters",
    bindKey:e("Ctrl-T","Ctrl-T"),
    exec:function(a){
        a.transposeLetters()
        }
    },{
    name:"touppercase",
    bindKey:e("Ctrl-U","Ctrl-U"),
    exec:function(a){
        a.toUpperCase()
        }
    },{
    name:"tolowercase",
    bindKey:e("Ctrl-Shift-U","Ctrl-Shift-U"),
    exec:function(a){
        a.toLowerCase()
        }
    }]
}),define("ace/edit_session",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/lib/event_emitter","ace/selection","ace/mode/text","ace/range","ace/document","ace/background_tokenizer","ace/edit_session/folding","ace/edit_session/bracket_match"],function(a,b,c){
    var d=a("./lib/oop"),e=a("./lib/lang"),f=a("./lib/event_emitter").EventEmitter,g=a("./selection").Selection,h=a("./mode/text").Mode,i=a("./range").Range,j=a("./document").Document,k=a("./background_tokenizer").BackgroundTokenizer,l=function(a,b){
        this.$modified=!0,this.$breakpoints=[],this.$frontMarkers={},this.$backMarkers={},this.$markerId=1,this.$rowCache=[],this.$wrapData=[],this.$foldData=[],this.$foldData.toString=function(){
            var a="";
            return this.forEach(function(b){
                a+="\n"+b.toString()
                }),a
            },a instanceof j?this.setDocument(a):this.setDocument(new j(a)),this.selection=new g(this),b?this.setMode(b):this.setMode(new h)
        };
    ((function(){
        function o(a){
            return a<4352?!1:a>=4352&&a<=4447||a>=4515&&a<=4519||a>=4602&&a<=4607||a>=9001&&a<=9002||a>=11904&&a<=11929||a>=11931&&a<=12019||a>=12032&&a<=12245||a>=12272&&a<=12283||a>=12288&&a<=12350||a>=12353&&a<=12438||a>=12441&&a<=12543||a>=12549&&a<=12589||a>=12593&&a<=12686||a>=12688&&a<=12730||a>=12736&&a<=12771||a>=12784&&a<=12830||a>=12832&&a<=12871||a>=12880&&a<=13054||a>=13056&&a<=19903||a>=19968&&a<=42124||a>=42128&&a<=42182||a>=43360&&a<=43388||a>=44032&&a<=55203||a>=55216&&a<=55238||a>=55243&&a<=55291||a>=63744&&a<=64255||a>=65040&&a<=65049||a>=65072&&a<=65106||a>=65108&&a<=65126||a>=65128&&a<=65131||a>=65281&&a<=65376||a>=65504&&a<=65510
            }
            d.implement(this,f),this.setDocument=function(a){
            if(this.doc)throw new Error("Document is already set");
            this.doc=a,a.on("change",this.onChange.bind(this)),this.on("changeFold",this.onChangeFold.bind(this)),this.bgTokenizer&&(this.bgTokenizer.setDocument(this.getDocument()),this.bgTokenizer.start(0))
            },this.getDocument=function(){
            return this.doc
            },this.$resetRowCache=function(a){
            if(a==0){
                this.$rowCache=[];
                return
            }
            var b=this.$rowCache;
            for(var c=0;c<b.length;c++)if(b[c].docRow>=a){
                b.splice(c,b.length);
                return
            }
            },this.onChangeFold=function(a){
        var b=a.data;
        this.$resetRowCache(b.start.row)
        },this.onChange=function(a){
        var b=a.data;
        this.$modified=!0,this.$resetRowCache(b.range.start.row);
        var c=this.$updateInternalDataOnChange(a);
        !this.$fromUndo&&this.$undoManager&&!b.ignore&&(this.$deltasDoc.push(b),c&&c.length!=0&&this.$deltasFold.push({
            action:"removeFolds",
            folds:c
        }),this.$informUndoManager.schedule()),this.bgTokenizer.start(b.range.start.row),this._dispatchEvent("change",a)
        },this.setValue=function(a){
        this.doc.setValue(a),this.selection.moveCursorTo(0,0),this.selection.clearSelection(),this.$resetRowCache(0),this.$deltas=[],this.$deltasDoc=[],this.$deltasFold=[],this.getUndoManager().reset()
        },this.getValue=this.toString=function(){
        return this.doc.getValue()
        },this.getSelection=function(){
        return this.selection
        },this.getState=function(a){
        return this.bgTokenizer.getState(a)
        },this.getTokens=function(a,b){
        return this.bgTokenizer.getTokens(a,b)
        },this.getTokenAt=function(a,b){
        var c=this.bgTokenizer.getTokens(a,a)[0].tokens,d,e=0;
        if(b==null)f=c.length-1,e=this.getLine(a).length;else for(var f=0;f<c.length;f++){
            e+=c[f].value.length;
            if(e>=b)break
        }
        return d=c[f],d?(d.index=f,d.start=e-d.value.length,d):null
        },this.setUndoManager=function(a){
        this.$undoManager=a,this.$resetRowCache(0),this.$deltas=[],this.$deltasDoc=[],this.$deltasFold=[],this.$informUndoManager&&this.$informUndoManager.cancel();
        if(a){
            var b=this;
            this.$syncInformUndoManager=function(){
                b.$informUndoManager.cancel(),b.$deltasFold.length&&(b.$deltas.push({
                    group:"fold",
                    deltas:b.$deltasFold
                    }),b.$deltasFold=[]),b.$deltasDoc.length&&(b.$deltas.push({
                    group:"doc",
                    deltas:b.$deltasDoc
                    }),b.$deltasDoc=[]),b.$deltas.length>0&&a.execute({
                    action:"aceupdate",
                    args:[b.$deltas,b]
                    }),b.$deltas=[]
                },this.$informUndoManager=e.deferredCall(this.$syncInformUndoManager)
            }
        },this.$defaultUndoManager={
        undo:function(){},
        redo:function(){},
        reset:function(){}
    },this.getUndoManager=function(){
        return this.$undoManager||this.$defaultUndoManager
        },this.getTabString=function(){
        return this.getUseSoftTabs()?e.stringRepeat(" ",this.getTabSize()):"\t"
        },this.$useSoftTabs=!0,this.setUseSoftTabs=function(a){
        if(this.$useSoftTabs===a)return;
        this.$useSoftTabs=a
        },this.getUseSoftTabs=function(){
        return this.$useSoftTabs
        },this.$tabSize=4,this.setTabSize=function(a){
        if(isNaN(a)||this.$tabSize===a)return;
        this.$modified=!0,this.$tabSize=a,this._dispatchEvent("changeTabSize")
        },this.getTabSize=function(){
        return this.$tabSize
        },this.isTabStop=function(a){
        return this.$useSoftTabs&&a.column%this.$tabSize==0
        },this.$overwrite=!1,this.setOverwrite=function(a){
        if(this.$overwrite==a)return;
        this.$overwrite=a,this._dispatchEvent("changeOverwrite")
        },this.getOverwrite=function(){
        return this.$overwrite
        },this.toggleOverwrite=function(){
        this.setOverwrite(!this.$overwrite)
        },this.getBreakpoints=function(){
        return this.$breakpoints
        },this.setBreakpoints=function(a){
        this.$breakpoints=[];
        for(var b=0;b<a.length;b++)this.$breakpoints[a[b]]=!0;
        this._dispatchEvent("changeBreakpoint",{})
        },this.clearBreakpoints=function(){
        this.$breakpoints=[],this._dispatchEvent("changeBreakpoint",{})
        },this.setBreakpoint=function(a){
        this.$breakpoints[a]=!0,this._dispatchEvent("changeBreakpoint",{})
        },this.clearBreakpoint=function(a){
        delete this.$breakpoints[a],this._dispatchEvent("changeBreakpoint",{})
        },this.getBreakpoints=function(){
        return this.$breakpoints
        },this.addMarker=function(a,b,c,d){
        var e=this.$markerId++,f={
            range:a,
            type:c||"line",
            renderer:typeof c=="function"?c:null,
            clazz:b,
            inFront:!!d
            };
            
        return d?(this.$frontMarkers[e]=f,this._dispatchEvent("changeFrontMarker")):(this.$backMarkers[e]=f,this._dispatchEvent("changeBackMarker")),e
        },this.removeMarker=function(a){
        var b=this.$frontMarkers[a]||this.$backMarkers[a];
        if(!b)return;
        var c=b.inFront?this.$frontMarkers:this.$backMarkers;
        b&&(delete c[a],this._dispatchEvent(b.inFront?"changeFrontMarker":"changeBackMarker"))
        },this.getMarkers=function(a){
        return a?this.$frontMarkers:this.$backMarkers
        },this.setAnnotations=function(a){
        this.$annotations={};
        
        for(var b=0;b<a.length;b++){
            var c=a[b],d=c.row;
            this.$annotations[d]?this.$annotations[d].push(c):this.$annotations[d]=[c]
            }
            this._dispatchEvent("changeAnnotation",{})
        },this.getAnnotations=function(){
        return this.$annotations||{}
    },this.clearAnnotations=function(){
    this.$annotations={},this._dispatchEvent("changeAnnotation",{})
    },this.$detectNewLine=function(a){
    var b=a.match(/^.*?(\r?\n)/m);
    b?this.$autoNewLine=b[1]:this.$autoNewLine="\n"
    },this.getWordRange=function(a,b){
    var c=this.getLine(a),d=!1;
    b>0&&(d=!!c.charAt(b-1).match(this.tokenRe)),d||(d=!!c.charAt(b).match(this.tokenRe));
    var e=d?this.tokenRe:this.nonTokenRe,f=b;
    if(f>0){
        do f--;while(f>=0&&c.charAt(f).match(e));
        f++
    }
    var g=b;
    while(g<c.length&&c.charAt(g).match(e))g++;
    return new i(a,f,a,g)
    },this.getAWordRange=function(a,b){
    var c=this.getWordRange(a,b),d=this.getLine(c.end.row);
    while(d.charAt(c.end.column).match(/[ \t]/))c.end.column+=1;
    return c
    },this.setNewLineMode=function(a){
    this.doc.setNewLineMode(a)
    },this.getNewLineMode=function(){
    return this.doc.getNewLineMode()
    },this.$useWorker=!0,this.setUseWorker=function(a){
    if(this.$useWorker==a)return;
    this.$useWorker=a,this.$stopWorker(),a&&this.$startWorker()
    },this.getUseWorker=function(){
    return this.$useWorker
    },this.onReloadTokenizer=function(a){
    var b=a.data;
    this.bgTokenizer.start(b.first),this._dispatchEvent("tokenizerUpdate",a)
    },this.$mode=null,this.setMode=function(a){
    if(this.$mode===a)return;
    this.$mode=a,this.$stopWorker(),this.$useWorker&&this.$startWorker();
    var b=a.getTokenizer();
    if(b.addEventListener!==undefined){
        var c=this.onReloadTokenizer.bind(this);
        b.addEventListener("update",c)
        }
        if(!this.bgTokenizer){
        this.bgTokenizer=new k(b);
        var d=this;
        this.bgTokenizer.addEventListener("update",function(a){
            d._dispatchEvent("tokenizerUpdate",a)
            })
        }else this.bgTokenizer.setTokenizer(b);
    this.bgTokenizer.setDocument(this.getDocument()),this.bgTokenizer.start(0),this.tokenRe=a.tokenRe,this.nonTokenRe=a.nonTokenRe,this.$setFolding(a.foldingRules),this._dispatchEvent("changeMode")
    },this.$stopWorker=function(){
    this.$worker&&this.$worker.terminate(),this.$worker=null
    },this.$startWorker=function(){
    if(typeof Worker!="undefined"&&!a.noWorker)try{
        this.$worker=this.$mode.createWorker(this)
        }catch(b){
        console.log("Could not load worker"),console.log(b),this.$worker=null
        }else this.$worker=null
        },this.getMode=function(){
    return this.$mode
    },this.$scrollTop=0,this.setScrollTopRow=function(a){
    if(this.$scrollTop===a)return;
    this.$scrollTop=a,this._dispatchEvent("changeScrollTop")
    },this.getScrollTopRow=function(){
    return this.$scrollTop
    },this.getWidth=function(){
    return this.$computeWidth(),this.width
    },this.getScreenWidth=function(){
    return this.$computeWidth(),this.screenWidth
    },this.$computeWidth=function(a){
    if(this.$modified||a){
        this.$modified=!1;
        var b=this.doc.getAllLines(),c=0,d=0;
        for(var e=0;e<b.length;e++){
            var f=this.getFoldLine(e),g,h;
            g=b[e];
            if(f){
                var i=f.range.end;
                g=this.getFoldDisplayLine(f),e=i.row
                }
                h=g.length,c=Math.max(c,h),this.$useWrapMode||(d=Math.max(d,this.$getStringScreenWidth(g)[0]))
            }
            this.width=c,this.$useWrapMode?this.screenWidth=this.$wrapLimit:this.screenWidth=d
        }
    },this.getLine=function(a){
    return this.doc.getLine(a)
    },this.getLines=function(a,b){
    return this.doc.getLines(a,b)
    },this.getLength=function(){
    return this.doc.getLength()
    },this.getTextRange=function(a){
    return this.doc.getTextRange(a)
    },this.insert=function(a,b){
    return this.doc.insert(a,b)
    },this.remove=function(a){
    return this.doc.remove(a)
    },this.undoChanges=function(a,b){
        
    if(!a.length)return;
    this.$fromUndo=!0;
    var c=null;
    for(var d=a.length-1;d!=-1;d--){
        var e=a[d];
        e.group=="doc"?(this.doc.revertDeltas(e.deltas),c=this.$getUndoSelection(e.deltas,!0,c)):e.deltas.forEach(function(a){
            this.addFolds(a.folds)
            },this)
        }
        return this.$fromUndo=!1,c&&!b&&this.selection.setSelectionRange(c),c
    },this.redoChanges=function(a,b){
    if(!a.length)return;
    this.$fromUndo=!0;
    var c=null;
    for(var d=0;d<a.length;d++){
        var e=a[d];
        e.group=="doc"&&(this.doc.applyDeltas(e.deltas),c=this.$getUndoSelection(e.deltas,!1,c))
        }
        return this.$fromUndo=!1,c&&!b&&this.selection.setSelectionRange(c),c
    },this.$getUndoSelection=function(a,b,c){
    function d(a){
        var c=a.action=="insertText"||a.action=="insertLines";
        return b?!c:c
        }
        var e=a[0],f,g,h=!1;
    d(e)?(f=e.range.clone(),h=!0):(f=i.fromPoints(e.range.start,e.range.start),h=!1);
    for(var j=1;j<a.length;j++)e=a[j],d(e)?(g=e.range.start,f.compare(g.row,g.column)==-1&&f.setStart(e.range.start),g=e.range.end,f.compare(g.row,g.column)==1&&f.setEnd(e.range.end),h=!0):(g=e.range.start,f.compare(g.row,g.column)==-1&&(f=i.fromPoints(e.range.start,e.range.start)),h=!1);
    if(c!=null){
        var k=c.compareRange(f);
        k==1?f.setStart(c.start):k==-1&&f.setEnd(c.end)
        }
        return f
    },this.replace=function(a,b){
        return this.doc.replace(a,b)
    },this.moveText=function(a,b){
    var c=this.getTextRange(a);
    this.remove(a);
    var d=b.row,e=b.column;
    !a.isMultiLine()&&a.start.row==d&&a.end.column<e&&(e-=c.length);
    if(a.isMultiLine()&&a.end.row<d){
        var f=this.doc.$split(c);
        d-=f.length-1
        }
        var g=d+a.end.row-a.start.row,h=a.isMultiLine()?a.end.column:e+a.end.column-a.start.column,j=new i(d,e,g,h);
    return this.insert(j.start,c),j
    },this.indentRows=function(a,b,c){
    c=c.replace(/\t/g,this.getTabString());
    for(var d=a;d<=b;d++)this.insert({
        row:d,
        column:0
    },c)
    },this.outdentRows=function(a){
    var b=a.collapseRows(),c=new i(0,0,0,0),d=this.getTabSize();
    for(var e=b.start.row;e<=b.end.row;++e){
        var f=this.getLine(e);
        c.start.row=e,c.end.row=e;
        for(var g=0;g<d;++g)if(f.charAt(g)!=" ")break;g<d&&f.charAt(g)=="\t"?(c.start.column=g,c.end.column=g+1):(c.start.column=0,c.end.column=g),this.remove(c)
        }
    },this.moveLinesUp=function(a,b){
    if(a<=0)return 0;
    var c=this.doc.removeLines(a,b);
    return this.doc.insertLines(a-1,c),-1
    },this.moveLinesDown=function(a,b){
    if(b>=this.doc.getLength()-1)return 0;
    var c=this.doc.removeLines(a,b);
    return this.doc.insertLines(a+1,c),1
    },this.duplicateLines=function(a,b){
    var a=this.$clipRowToDocument(a),b=this.$clipRowToDocument(b),c=this.getLines(a,b);
    this.doc.insertLines(a,c);
    var d=b-a+1;
    return d
    },this.$clipRowToDocument=function(a){
    return Math.max(0,Math.min(a,this.doc.getLength()-1))
    },this.$clipColumnToRow=function(a,b){
    return b<0?0:Math.min(this.doc.getLine(a).length,b)
    },this.$clipPositionToDocument=function(a,b){
    b=Math.max(0,b);
    if(a<0)a=0,b=0;
    else{
        var c=this.doc.getLength();
        a>=c?(a=c-1,b=this.doc.getLine(c-1).length):b=Math.min(this.doc.getLine(a).length,b)
        }
        return{
        row:a,
        column:b
    }
},this.$clipRangeToDocument=function(a){
    a.start.row<0?(a.start.row=0,a.start.column=0):a.start.column=this.$clipColumnToRow(a.start.row,a.start.column);
    var b=this.doc.getLength()-1;
    return a.end.row>b?(a.end.row=b,a.end.column=this.doc.getLine(b).length):a.end.column=this.$clipColumnToRow(a.end.row,a.end.column),a
    },this.$wrapLimit=80,this.$useWrapMode=!1,this.$wrapLimitRange={
    min:null,
    max:null
},this.setUseWrapMode=function(a){
    if(a!=this.$useWrapMode){
        this.$useWrapMode=a,this.$modified=!0,this.$resetRowCache(0);
        if(a){
            var b=this.getLength();
            this.$wrapData=[];
            for(var c=0;c<b;c++)this.$wrapData.push([]);
            this.$updateWrapData(0,b-1)
            }
            this._dispatchEvent("changeWrapMode")
        }
    },this.getUseWrapMode=function(){
    return this.$useWrapMode
    },this.setWrapLimitRange=function(a,b){
    if(this.$wrapLimitRange.min!==a||this.$wrapLimitRange.max!==b)this.$wrapLimitRange.min=a,this.$wrapLimitRange.max=b,this.$modified=!0,this._dispatchEvent("changeWrapMode")
        },this.adjustWrapLimit=function(a){
    var b=this.$constrainWrapLimit(a);
    return b!=this.$wrapLimit&&b>0?(this.$wrapLimit=b,this.$modified=!0,this.$useWrapMode&&(this.$updateWrapData(0,this.getLength()-1),this.$resetRowCache(0),this._dispatchEvent("changeWrapLimit")),!0):!1
    },this.$constrainWrapLimit=function(a){
    var b=this.$wrapLimitRange.min;
    b&&(a=Math.max(b,a));
    var c=this.$wrapLimitRange.max;
    return c&&(a=Math.min(c,a)),Math.max(1,a)
    },this.getWrapLimit=function(){
    return this.$wrapLimit
    },this.getWrapLimitRange=function(){
    return{
        min:this.$wrapLimitRange.min,
        max:this.$wrapLimitRange.max
        }
    },this.$updateInternalDataOnChange=function(a){
    var b=this.$useWrapMode,c,d=a.data.action,e=a.data.range.start.row,f=a.data.range.end.row,g=a.data.range.start,h=a.data.range.end,i=null;
    d.indexOf("Lines")!=-1?(d=="insertLines"?f=e+a.data.lines.length:f=e,c=a.data.lines?a.data.lines.length:f-e):c=f-e;
    if(c!=0)if(d.indexOf("remove")!=-1){
        b&&this.$wrapData.splice(e,c);
        var j=this.$foldData;
        i=this.getFoldsInRange(a.data.range),this.removeFolds(i);
        var k=this.getFoldLine(h.row),l=0;
        if(k){
            k.addRemoveChars(h.row,h.column,g.column-h.column),k.shiftRow(-c);
            var m=this.getFoldLine(e);
            m&&m!==k&&(m.merge(k),k=m),l=j.indexOf(k)+1
            }
            for(l;l<j.length;l++){
            var k=j[l];
            k.start.row>=h.row&&k.shiftRow(-c)
            }
            f=e
        }else{
        var n;
        if(b){
            n=[e,0];
            for(var o=0;o<c;o++)n.push([]);
            this.$wrapData.splice.apply(this.$wrapData,n)
            }
            var j=this.$foldData,k=this.getFoldLine(e),l=0;
        if(k){
            var p=k.range.compareInside(g.row,g.column);
            p==0?(k=k.split(g.row,g.column),k.shiftRow(c),k.addRemoveChars(f,0,h.column-g.column)):p==-1&&(k.addRemoveChars(e,0,h.column-g.column),k.shiftRow(c)),l=j.indexOf(k)+1
            }
            for(l;l<j.length;l++){
            var k=j[l];
            k.start.row>=e&&k.shiftRow(c)
            }
        }else{
    c=Math.abs(a.data.range.start.column-a.data.range.end.column),d.indexOf("remove")!=-1&&(i=this.getFoldsInRange(a.data.range),this.removeFolds(i),c=-c);
    var k=this.getFoldLine(e);
    k&&k.addRemoveChars(e,g.column,c)
    }
    return b&&this.$wrapData.length!=this.doc.getLength()&&console.error("doc.getLength() and $wrapData.length have to be the same!"),b&&this.$updateWrapData(e,f),i
},this.$updateWrapData=function(a,b){
    var c=this.doc.getAllLines(),d=this.getTabSize(),f=this.$wrapData,i=this.$wrapLimit,j,k,m=a;
    b=Math.min(b,c.length-1);
    while(m<=b){
        k=this.getFoldLine(m,k);
        if(!k)j=this.$getDisplayTokens(e.stringTrimRight(c[m])),f[m]=this.$computeWrapSplits(j,i,d),m++;
        else{
            j=[],k.walk(function(a,b,d,e){
                var f;
                if(a){
                    f=this.$getDisplayTokens(a,j.length),f[0]=g;
                    for(var i=1;i<f.length;i++)f[i]=h
                        }else f=this.$getDisplayTokens(c[b].substring(e,d),j.length);
                j=j.concat(f)
                }.bind(this),k.end.row,c[k.end.row].length+1);
            while(j.length!=0&&j[j.length-1]>=l)j.pop();
            f[k.start.row]=this.$computeWrapSplits(j,i,d),m=k.end.row+1
            }
        }
};

var b=1,c=2,g=3,h=4,j=9,l=10,m=11,n=12;
this.$computeWrapSplits=function(a,b,c){
    function k(b){
        var c=a.slice(f,b),e=c.length;
        c.join("").replace(/12/g,function(a){
            e-=1
            }).replace(/2/g,function(a){
            e-=1
            }),i+=e,d.push(i),f=b
        }
        if(a.length==0)return[];
    var d=[],e=a.length,f=0,i=0;
    while(e-f>b){
        var m=f+b;
        if(a[m]>=l){
            while(a[m]>=l)m++;
            k(m);
            continue
        }
        if(a[m]==g||a[m]==h){
            for(m;m!=f-1;m--)if(a[m]==g)break;if(m>f){
                k(m);
                continue
            }
            m=f+b;
            for(m;m<a.length;m++)if(a[m]!=h)break;if(m==a.length)break;
            k(m);
            continue
        }
        var n=Math.max(m-10,f-1);
        while(m>n&&a[m]<g)m--;
        while(m>n&&a[m]==j)m--;
        if(m>n){
            k(++m);
            continue
        }
        m=f+b,k(m)
        }
        return d
    },this.$getDisplayTokens=function(a,d){
    var e=[],f;
    d=d||0;
    for(var g=0;g<a.length;g++){
        var h=a.charCodeAt(g);
        if(h==9){
            f=this.getScreenTabSize(e.length+d),e.push(m);
            for(var i=1;i<f;i++)e.push(n)
                }else h==32?e.push(l):h>39&&h<48||h>57&&h<64?e.push(j):h>=4352&&o(h)?e.push(b,c):e.push(b)
            }
            return e
    },this.$getStringScreenWidth=function(a,b,c){
    if(b==0)return[0,0];
    b==null&&(b=c+a.length*Math.max(this.getTabSize(),2)),c=c||0;
    var d,e;
    for(e=0;e<a.length;e++){
        d=a.charCodeAt(e),d==9?c+=this.getScreenTabSize(c):d>=4352&&o(d)?c+=2:c+=1;
        if(c>b)break
    }
    return[c,e]
    },this.getRowLength=function(a){
    return!this.$useWrapMode||!this.$wrapData[a]?1:this.$wrapData[a].length+1
    },this.getRowHeight=function(a,b){
    return this.getRowLength(b)*a.lineHeight
    },this.getScreenLastRowColumn=function(a){
    return this.documentToScreenColumn(a,this.doc.getLine(a).length)
    },this.getDocumentLastRowColumn=function(a,b){
    var c=this.documentToScreenRow(a,b);
    return this.getScreenLastRowColumn(c)
    },this.getDocumentLastRowColumnPosition=function(a,b){
    var c=this.documentToScreenRow(a,b);
    return this.screenToDocumentPosition(c,Number.MAX_VALUE/10)
    },this.getRowSplitData=function(a){
    return this.$useWrapMode?this.$wrapData[a]:undefined
    },this.getScreenTabSize=function(a){
    return this.$tabSize-a%this.$tabSize
    },this.screenToDocumentRow=function(a,b){
    return this.screenToDocumentPosition(a,b).row
    },this.screenToDocumentColumn=function(a,b){
    return this.screenToDocumentPosition(a,b).column
    },this.screenToDocumentPosition=function(a,b){
    if(a<0)return{
        row:0,
        column:0
    };
    
    var c,d=0,e=0,f,g=0,h=0,i=this.$rowCache;
    for(var j=0;j<i.length;j++)if(i[j].screenRow<a)g=i[j].screenRow,d=i[j].docRow;else break;var k=!i.length||j==i.length,l=this.getLength()-1,m=this.getNextFoldLine(d),n=m?m.start.row:Infinity;
    while(g<=a){
        h=this.getRowLength(d);
        if(g+h-1>=a||d>=l)break;
        g+=h,d++,d>n&&(d=m.end.row+1,m=this.getNextFoldLine(d,m),n=m?m.start.row:Infinity),k&&i.push({
            docRow:d,
            screenRow:g
        })
        }
        if(m&&m.start.row<=d)c=this.getFoldDisplayLine(m),d=m.start.row;
    else{
        if(g+h<=a||d>l)return{
            row:l,
            column:this.getLine(l).length
            };
            
        c=this.getLine(d),m=null
        }
        if(this.$useWrapMode){
        var o=this.$wrapData[d];
        o&&(f=o[a-g],a>g&&o.length&&(e=o[a-g-1]||o[o.length-1],c=c.substring(e)))
        }
        return e+=this.$getStringScreenWidth(c,b)[1],this.$useWrapMode?e>=f&&(e=f-1):e=Math.min(e,c.length),m?m.idxToPosition(e):{
        row:d,
        column:e
    }
},this.documentToScreenPosition=function(a,b){
    if(typeof b=="undefined")var c=this.$clipPositionToDocument(a.row,a.column);else c=this.$clipPositionToDocument(a,b);
    a=c.row,b=c.column;
    var d;
    if(this.$useWrapMode){
        d=this.$wrapData;
        if(a>d.length-1)return{
            row:this.getScreenLength(),
            column:d.length==0?0:d[d.length-1].length-1
            }
        }
        var e=0,f=null,g=null;
g=this.getFoldAt(a,b,1),g&&(a=g.start.row,b=g.start.column);
var h,i=0,j=this.$rowCache;
for(var k=0;k<j.length;k++)if(j[k].docRow<a)e=j[k].screenRow,i=j[k].docRow;else break;var l=!j.length||k==j.length,m=this.getNextFoldLine(i),n=m?m.start.row:Infinity;
while(i<a){
    if(i>=n){
        h=m.end.row+1;
        if(h>a)break;
        m=this.getNextFoldLine(h,m),n=m?m.start.row:Infinity
        }else h=i+1;
    e+=this.getRowLength(i),i=h,l&&j.push({
        docRow:i,
        screenRow:e
    })
    }
    var o="";
m&&i>=n?(o=this.getFoldDisplayLine(m,a,b),f=m.start.row):(o=this.getLine(a).substring(0,b),f=a);
if(this.$useWrapMode){
    var p=d[f],q=0;
    while(o.length>=p[q])e++,q++;
    o=o.substring(p[q-1]||0,o.length)
    }
    return{
    row:e,
    column:this.$getStringScreenWidth(o)[0]
    }
},this.documentToScreenColumn=function(a,b){
    return this.documentToScreenPosition(a,b).column
    },this.documentToScreenRow=function(a,b){
    return this.documentToScreenPosition(a,b).row
    },this.getScreenLength=function(){
    var a=0,b=null;
    if(!this.$useWrapMode){
        a=this.getLength();
        var c=this.$foldData;
        for(var d=0;d<c.length;d++)b=c[d],a-=b.end.row-b.start.row
            }else{
        var e=this.$wrapData.length,f=0,d=0,b=this.$foldData[d++],g=b?b.start.row:Infinity;
        while(f<e)a+=this.$wrapData[f].length+1,f++,f>g&&(f=b.end.row+1,b=this.$foldData[d++],g=b?b.start.row:Infinity)
            }
            return a
    }
})).call(l.prototype),a("./edit_session/folding").Folding.call(l.prototype),a("./edit_session/bracket_match").BracketMatch.call(l.prototype),b.EditSession=l
}),define("ace/selection",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/lib/event_emitter","ace/range"],function(a,b,c){
    var d=a("./lib/oop"),e=a("./lib/lang"),f=a("./lib/event_emitter").EventEmitter,g=a("./range").Range,h=function(a){
        this.session=a,this.doc=a.getDocument(),this.clearSelection(),this.selectionLead=this.doc.createAnchor(0,0),this.selectionAnchor=this.doc.createAnchor(0,0);
        var b=this;
        this.selectionLead.on("change",function(a){
            b._dispatchEvent("changeCursor"),b.$isEmpty||b._dispatchEvent("changeSelection"),!b.$preventUpdateDesiredColumnOnChange&&a.old.column!=a.value.column&&b.$updateDesiredColumn()
            }),this.selectionAnchor.on("change",function(){
            b.$isEmpty||b._dispatchEvent("changeSelection")
            })
        };
    ((function(){
        d.implement(this,f),this.isEmpty=function(){
            return this.$isEmpty||this.selectionAnchor.row==this.selectionLead.row&&this.selectionAnchor.column==this.selectionLead.column
            },this.isMultiLine=function(){
            return this.isEmpty()?!1:this.getRange().isMultiLine()
            },this.getCursor=function(){
            return this.selectionLead.getPosition()
            },this.setSelectionAnchor=function(a,b){
            this.selectionAnchor.setPosition(a,b),this.$isEmpty&&(this.$isEmpty=!1,this._dispatchEvent("changeSelection"))
            },this.getSelectionAnchor=function(){
            return this.$isEmpty?this.getSelectionLead():this.selectionAnchor.getPosition()
            },this.getSelectionLead=function(){
            return this.selectionLead.getPosition()
            },this.shiftSelection=function(a){
            if(this.$isEmpty){
                this.moveCursorTo(this.selectionLead.row,this.selectionLead.column+a);
                return
            }
            var b=this.getSelectionAnchor(),c=this.getSelectionLead(),d=this.isBackwards();
            (!d||b.column!==0)&&this.setSelectionAnchor(b.row,b.column+a),(d||c.column!==0)&&this.$moveSelection(function(){
                this.moveCursorTo(c.row,c.column+a)
                })
            },this.isBackwards=function(){
            var a=this.selectionAnchor,b=this.selectionLead;
            return a.row>b.row||a.row==b.row&&a.column>b.column
            },this.getRange=function(){
            var a=this.selectionAnchor,b=this.selectionLead;
            return this.isEmpty()?g.fromPoints(b,b):this.isBackwards()?g.fromPoints(b,a):g.fromPoints(a,b)
            },this.clearSelection=function(){
            this.$isEmpty||(this.$isEmpty=!0,this._dispatchEvent("changeSelection"))
            },this.selectAll=function(){
            var a=this.doc.getLength()-1;
            this.setSelectionAnchor(a,this.doc.getLine(a).length),this.moveCursorTo(0,0)
            },this.setSelectionRange=function(a,b){
            b?(this.setSelectionAnchor(a.end.row,a.end.column),this.selectTo(a.start.row,a.start.column)):(this.setSelectionAnchor(a.start.row,a.start.column),this.selectTo(a.end.row,a.end.column)),this.$updateDesiredColumn()
            },this.$updateDesiredColumn=function(){
            var a=this.getCursor();
            this.$desiredColumn=this.session.documentToScreenColumn(a.row,a.column)
            },this.$moveSelection=function(a){
            var b=this.selectionLead;
            this.$isEmpty&&this.setSelectionAnchor(b.row,b.column),a.call(this)
            },this.selectTo=function(a,b){
            this.$moveSelection(function(){
                this.moveCursorTo(a,b)
                })
            },this.selectToPosition=function(a){
            this.$moveSelection(function(){
                this.moveCursorToPosition(a)
                })
            },this.selectUp=function(){
            this.$moveSelection(this.moveCursorUp)
            },this.selectDown=function(){
            this.$moveSelection(this.moveCursorDown)
            },this.selectRight=function(){
            this.$moveSelection(this.moveCursorRight)
            },this.selectLeft=function(){
            this.$moveSelection(this.moveCursorLeft)
            },this.selectLineStart=function(){
            this.$moveSelection(this.moveCursorLineStart)
            },this.selectLineEnd=function(){
            this.$moveSelection(this.moveCursorLineEnd)
            },this.selectFileEnd=function(){
            this.$moveSelection(this.moveCursorFileEnd)
            },this.selectFileStart=function(){
            this.$moveSelection(this.moveCursorFileStart)
            },this.selectWordRight=function(){
            this.$moveSelection(this.moveCursorWordRight)
            },this.selectWordLeft=function(){
            this.$moveSelection(this.moveCursorWordLeft)
            },this.selectWord=function(){
            var a=this.getCursor(),b=this.session.getWordRange(a.row,a.column);
            this.setSelectionRange(b)
            },this.selectAWord=function(){
            var a=this.getCursor(),b=this.session.getAWordRange(a.row,a.column);
            this.setSelectionRange(b)
            },this.selectLine=function(){
            var a=this.selectionLead.row,b,c=this.session.getFoldLine(a);
            c?(a=c.start.row,b=c.end.row):b=a,this.setSelectionAnchor(a,0),this.$moveSelection(function(){
                this.moveCursorTo(b+1,0)
                })
            },this.moveCursorUp=function(){
            this.moveCursorBy(-1,0)
            },this.moveCursorDown=function(){
            this.moveCursorBy(1,0)
            },this.moveCursorLeft=function(){
            var a=this.selectionLead.getPosition(),b;
            if(b=this.session.getFoldAt(a.row,a.column,-1))this.moveCursorTo(b.start.row,b.start.column);
            else if(a.column==0)a.row>0&&this.moveCursorTo(a.row-1,this.doc.getLine(a.row-1).length);
            else{
                var c=this.session.getTabSize();
                this.session.isTabStop(a)&&this.doc.getLine(a.row).slice(a.column-c,a.column).split(" ").length-1==c?this.moveCursorBy(0,-c):this.moveCursorBy(0,-1)
                }
            },this.moveCursorRight=function(){
        var a=this.selectionLead.getPosition(),b;
        if(b=this.session.getFoldAt(a.row,a.column,1))this.moveCursorTo(b.end.row,b.end.column);
        else if(this.selectionLead.column==this.doc.getLine(this.selectionLead.row).length)this.selectionLead.row<this.doc.getLength()-1&&this.moveCursorTo(this.selectionLead.row+1,0);
        else{
            var c=this.session.getTabSize(),a=this.selectionLead;
            this.session.isTabStop(a)&&this.doc.getLine(a.row).slice(a.column,a.column+c).split(" ").length-1==c?this.moveCursorBy(0,c):this.moveCursorBy(0,1)
            }
        },this.moveCursorLineStart=function(){
        var a=this.selectionLead.row,b=this.selectionLead.column,c=this.session.documentToScreenRow(a,b),d=this.session.screenToDocumentPosition(c,0),e=this.session.getDisplayLine(a,null,d.row,d.column),f=e.match(/^\s*/);
        f[0].length==b?this.moveCursorTo(d.row,d.column):this.moveCursorTo(d.row,d.column+f[0].length)
        },this.moveCursorLineEnd=function(){
        var a=this.selectionLead,b=this.session.getDocumentLastRowColumnPosition(a.row,a.column);
        this.moveCursorTo(b.row,b.column)
        },this.moveCursorFileEnd=function(){
        var a=this.doc.getLength()-1,b=this.doc.getLine(a).length;
        this.moveCursorTo(a,b)
        },this.moveCursorFileStart=function(){
        this.moveCursorTo(0,0)
        },this.moveCursorWordRight=function(){
        var a=this.selectionLead.row,b=this.selectionLead.column,c=this.doc.getLine(a),d=c.substring(b),e;
        this.session.nonTokenRe.lastIndex=0,this.session.tokenRe.lastIndex=0;
        var f;
        if(f=this.session.getFoldAt(a,b,1)){
            this.moveCursorTo(f.end.row,f.end.column);
            return
        }
        if(b==c.length){
            this.moveCursorRight();
            return
        }
        if(e=this.session.nonTokenRe.exec(d))b+=this.session.nonTokenRe.lastIndex,this.session.nonTokenRe.lastIndex=0;
        else if(e=this.session.tokenRe.exec(d))b+=this.session.tokenRe.lastIndex,this.session.tokenRe.lastIndex=0;
        this.moveCursorTo(a,b)
        },this.moveCursorWordLeft=function(){
        var a=this.selectionLead.row,b=this.selectionLead.column,c;
        if(c=this.session.getFoldAt(a,b,-1)){
            this.moveCursorTo(c.start.row,c.start.column);
            return
        }
        if(b==0){
            this.moveCursorLeft();
            return
        }
        var d=this.session.getFoldStringAt(a,b,-1);
        d==null&&(d=this.doc.getLine(a).substring(0,b));
        var f=e.stringReverse(d),g;
        this.session.nonTokenRe.lastIndex=0,this.session.tokenRe.lastIndex=0;
        if(g=this.session.nonTokenRe.exec(f))b-=this.session.nonTokenRe.lastIndex,this.session.nonTokenRe.lastIndex=0;
        else if(g=this.session.tokenRe.exec(f))b-=this.session.tokenRe.lastIndex,this.session.tokenRe.lastIndex=0;
        this.moveCursorTo(a,b)
        },this.moveCursorBy=function(a,b){
        var c=this.session.documentToScreenPosition(this.selectionLead.row,this.selectionLead.column),d=b===0&&this.$desiredColumn||c.column,e=this.session.screenToDocumentPosition(c.row+a,d);
        this.moveCursorTo(e.row,e.column+b,b===0)
        },this.moveCursorToPosition=function(a){
        this.moveCursorTo(a.row,a.column)
        },this.moveCursorTo=function(a,b,c){
        var d=this.session.getFoldAt(a,b,1);
        d&&(a=d.start.row,b=d.start.column),this.$preventUpdateDesiredColumnOnChange=!0,this.selectionLead.setPosition(a,b),this.$preventUpdateDesiredColumnOnChange=!1,c||this.$updateDesiredColumn(this.selectionLead.column)
        },this.moveCursorToScreen=function(a,b,c){
        var d=this.session.screenToDocumentPosition(a,b);
        a=d.row,b=d.column,this.moveCursorTo(a,b,c)
        }
    })).call(h.prototype),b.Selection=h
}),define("ace/range",["require","exports","module"],function(a,b,c){
    var d=function(a,b,c,d){
        this.start={
            row:a,
            column:b
        },this.end={
            row:c,
            column:d
        }
    };
((function(){
    this.isEequal=function(a){
        return this.start.row==a.start.row&&this.end.row==a.end.row&&this.start.column==a.start.column&&this.end.column==a.end.column
        },this.toString=function(){
        return"Range: ["+this.start.row+"/"+this.start.column+"] -> ["+this.end.row+"/"+this.end.column+"]"
        },this.contains=function(a,b){
        return this.compare(a,b)==0
        },this.compareRange=function(a){
        var b,c=a.end,d=a.start;
        return b=this.compare(c.row,c.column),b==1?(b=this.compare(d.row,d.column),b==1?2:b==0?1:0):b==-1?-2:(b=this.compare(d.row,d.column),b==-1?-1:b==1?42:0)
        },this.comparePoint=function(a){
        return this.compare(a.row,a.column)
        },this.containsRange=function(a){
        return this.comparePoint(a.start)==0&&this.comparePoint(a.end)==0
        },this.isEnd=function(a,b){
        return this.end.row==a&&this.end.column==b
        },this.isStart=function(a,b){
        return this.start.row==a&&this.start.column==b
        },this.setStart=function(a,b){
        typeof a=="object"?(this.start.column=a.column,this.start.row=a.row):(this.start.row=a,this.start.column=b)
        },this.setEnd=function(a,b){
        typeof a=="object"?(this.end.column=a.column,this.end.row=a.row):(this.end.row=a,this.end.column=b)
        },this.inside=function(a,b){
        return this.compare(a,b)==0?this.isEnd(a,b)||this.isStart(a,b)?!1:!0:!1
        },this.insideStart=function(a,b){
        return this.compare(a,b)==0?this.isEnd(a,b)?!1:!0:!1
        },this.insideEnd=function(a,b){
        return this.compare(a,b)==0?this.isStart(a,b)?!1:!0:!1
        },this.compare=function(a,b){
        return!this.isMultiLine()&&a===this.start.row?b<this.start.column?-1:b>this.end.column?1:0:a<this.start.row?-1:a>this.end.row?1:this.start.row===a?b>=this.start.column?0:-1:this.end.row===a?b<=this.end.column?0:1:0
        },this.compareStart=function(a,b){
        return this.start.row==a&&this.start.column==b?-1:this.compare(a,b)
        },this.compareEnd=function(a,b){
        return this.end.row==a&&this.end.column==b?1:this.compare(a,b)
        },this.compareInside=function(a,b){
        return this.end.row==a&&this.end.column==b?1:this.start.row==a&&this.start.column==b?-1:this.compare(a,b)
        },this.clipRows=function(a,b){
        if(this.end.row>b)var c={
            row:b+1,
            column:0
        };
        
        if(this.start.row>b)var e={
            row:b+1,
            column:0
        };
        
        if(this.start.row<a)var e={
            row:a,
            column:0
        };
        
        if(this.end.row<a)var c={
            row:a,
            column:0
        };
        
        return d.fromPoints(e||this.start,c||this.end)
        },this.extend=function(a,b){
        var c=this.compare(a,b);
        if(c==0)return this;
        if(c==-1)var e={
            row:a,
            column:b
        };else var f={
            row:a,
            column:b
        };
        
        return d.fromPoints(e||this.start,f||this.end)
        },this.isEmpty=function(){
        return this.start.row==this.end.row&&this.start.column==this.end.column
        },this.isMultiLine=function(){
        return this.start.row!==this.end.row
        },this.clone=function(){
        return d.fromPoints(this.start,this.end)
        },this.collapseRows=function(){
        return this.end.column==0?new d(this.start.row,0,Math.max(this.start.row,this.end.row-1),0):new d(this.start.row,0,this.end.row,0)
        },this.toScreenRange=function(a){
        var b=a.documentToScreenPosition(this.start),c=a.documentToScreenPosition(this.end);
        return new d(b.row,b.column,c.row,c.column)
        }
    })).call(d.prototype),d.fromPoints=function(a,b){
    return new d(a.row,a.column,b.row,b.column)
    },b.Range=d
}),define("ace/mode/text",["require","exports","module","ace/tokenizer","ace/mode/text_highlight_rules","ace/mode/behaviour","ace/unicode"],function(a,b,c){
    var d=a("../tokenizer").Tokenizer,e=a("./text_highlight_rules").TextHighlightRules,f=a("./behaviour").Behaviour,g=a("../unicode"),h=function(){
        this.$tokenizer=new d((new e).getRules()),this.$behaviour=new f
        };
    ((function(){
        this.tokenRe=new RegExp("^["+g.packages.L+g.packages.Mn+g.packages.Mc+g.packages.Nd+g.packages.Pc+"\\$_]+","g"),this.nonTokenRe=new RegExp("^(?:[^"+g.packages.L+g.packages.Mn+g.packages.Mc+g.packages.Nd+g.packages.Pc+"\\$_]|s])+","g"),this.getTokenizer=function(){
            return this.$tokenizer
            },this.toggleCommentLines=function(a,b,c,d){},this.getNextLineIndent=function(a,b,c){
            return""
            },this.checkOutdent=function(a,b,c){
            return!1
            },this.autoOutdent=function(a,b,c){},this.$getIndent=function(a){
            var b=a.match(/^(\s+)/);
            return b?b[1]:""
            },this.createWorker=function(a){
            return null
            },this.highlightSelection=function(a){
            var b=a.session;
            b.$selectionOccurrences||(b.$selectionOccurrences=[]),b.$selectionOccurrences.length&&this.clearSelectionHighlight(a);
            var c=a.getSelectionRange();
            if(c.isEmpty()||c.isMultiLine())return;
            var d=c.start.column-1,e=c.end.column+1,f=b.getLine(c.start.row),g=f.length,h=f.substring(Math.max(d,0),Math.min(e,g));
            if(d>=0&&/^[\w\d]/.test(h)||e<=g&&/[\w\d]$/.test(h))return;
            h=f.substring(c.start.column,c.end.column);
            if(!/^[\w\d]+$/.test(h))return;
            var i=a.getCursorPosition(),j={
                wrap:!0,
                wholeWord:!0,
                caseSensitive:!0,
                needle:h
            },k=a.$search.getOptions();
            a.$search.set(j);
            var l=a.$search.findAll(b);
            l.forEach(function(a){
                if(!a.contains(i.row,i.column)){
                    var c=b.addMarker(a,"ace_selected_word","text");
                    b.$selectionOccurrences.push(c)
                    }
                }),a.$search.set(k)
        },this.clearSelectionHighlight=function(a){
        if(!a.session.$selectionOccurrences)return;
        a.session.$selectionOccurrences.forEach(function(b){
            a.session.removeMarker(b)
            }),a.session.$selectionOccurrences=[]
        },this.createModeDelegates=function(a){
        if(!this.$embeds)return;
        this.$modes={};
        
        for(var b=0;b<this.$embeds.length;b++)a[this.$embeds[b]]&&(this.$modes[this.$embeds[b]]=new a[this.$embeds[b]]);
        var c=["toggleCommentLines","getNextLineIndent","checkOutdent","autoOutdent","transformAction"];
        for(var b=0;b<c.length;b++)(function(a){
            var d=c[b],e=a[d];
            a[c[b]]=function(){
                return this.$delegator(d,arguments,e)
                }
            })(this)
        },this.$delegator=function(a,b,c){
        var d=b[0];
        for(var e=0;e<this.$embeds.length;e++){
            if(!this.$modes[this.$embeds[e]])continue;
            var f=d.split(this.$embeds[e]);
            if(!f[0]&&f[1]){
                b[0]=f[1];
                var g=this.$modes[this.$embeds[e]];
                return g[a].apply(g,b)
                }
            }
        var h=c.apply(this,b);
        return c?h:undefined
        },this.transformAction=function(a,b,c,d,e){
        if(this.$behaviour){
            var f=this.$behaviour.getBehaviours();
            for(var g in f)if(f[g][b]){
                var h=f[g][b].apply(this,arguments);
                if(h)return h
                    }
                }
            }
})).call(h.prototype),b.Mode=h
}),define("ace/tokenizer",["require","exports","module"],function(a,b,c){
    var d=function(a){
        this.rules=a,this.regExps={},this.matchMappings={};
        
        for(var b in this.rules){
            var c=this.rules[b],d=c,e=[],f=0,g=this.matchMappings[b]={};
            
            for(var h=0;h<d.length;h++){
                var i=(new RegExp("(?:("+d[h].regex+")|(.))")).exec("a").length-2,j=d[h].regex.replace(/\\([0-9]+)/g,function(a,b){
                    return"\\"+(parseInt(b,10)+f+1)
                    });
                g[f]={
                    rule:h,
                    len:i
                },f+=i,e.push(j)
                }
                this.regExps[b]=new RegExp("(?:("+e.join(")|(")+")|(.))","g")
            }
        };
((function(){
    this.getLineTokens=function(a,b){
        var c=b,d=this.rules[c],e=this.matchMappings[c],f=this.regExps[c];
        f.lastIndex=0;
        var g,h=[],i=0,j={
            type:null,
            value:""
        };
        while(g=f.exec(a)){
            var k="text",l=null,m=[g[0]];
            for(var n=0;n<g.length-2;n++)if(g[n+1]!==undefined){
                l=d[e[n].rule],e[n].len>1&&(m=g.slice(n+2,n+1+e[n].len)),typeof l.token=="function"?k=l.token.apply(this,m):k=l.token;
                var o=l.next;
                o&&o!==c&&(c=o,d=this.rules[c],e=this.matchMappings[c],i=f.lastIndex,f=this.regExps[c],f.lastIndex=i);
                break
            }
            if(m[0]){
                typeof k=="string"&&(m=[m.join("")],k=[k]);
                for(var n=0;n<m.length;n++)(!l||l.merge||k[n]==="text")&&j.type===k[n]?j.value+=m[n]:(j.type&&h.push(j),j={
                    type:k[n],
                    value:m[n]
                    })
                }
                if(i==a.length)break;
            i=f.lastIndex
            }
            return j.type&&h.push(j),{
            tokens:h,
            state:c
        }
    }
})).call(d.prototype),b.Tokenizer=d
}),define("ace/mode/text_highlight_rules",["require","exports","module","ace/lib/lang"],function(a,b,c){
    var d=a("../lib/lang"),e=function(){
        this.$rules={
            start:[{
                token:"empty_line",
                regex:"^$"
            },{
                token:"text",
                regex:".+"
            }]
            }
        };
((function(){
    this.addRules=function(a,b){
        for(var c in a){
            var d=a[c];
            for(var e=0;e<d.length;e++){
                var f=d[e];
                f.next?f.next=b+f.next:f.next=b+c
                }
                this.$rules[b+c]=d
            }
        },this.getRules=function(){
    return this.$rules
    },this.embedRules=function(a,b,c,e){
    var f=(new a).getRules();
    if(e)for(var g=0;g<e.length;g++)e[g]=b+e[g];
    else{
        e=[];
        for(var h in f)e.push(b+h)
            }
            this.addRules(f,b);
    for(var g=0;g<e.length;g++)Array.prototype.unshift.apply(this.$rules[e[g]],d.deepCopy(c));
    this.$embeds||(this.$embeds=[]),this.$embeds.push(b)
    },this.getEmbeds=function(){
    return this.$embeds
    }
})).call(e.prototype),b.TextHighlightRules=e
}),define("ace/mode/behaviour",["require","exports","module"],function(a,b,c){
    var d=function(){
        this.$behaviours={}
    };
((function(){
    this.add=function(a,b,c){
        switch(undefined){
            case this.$behaviours:
                this.$behaviours={};
                
            case this.$behaviours[a]:
                this.$behaviours[a]={}
            }
            this.$behaviours[a][b]=c
    },this.addBehaviours=function(a){
    for(var b in a)for(var c in a[b])this.add(b,c,a[b][c])
        },this.remove=function(a){
    this.$behaviours&&this.$behaviours[a]&&delete this.$behaviours[a]
},this.inherit=function(a,b){
    if(typeof a=="function")var c=(new a).getBehaviours(b);else var c=a.getBehaviours(b);
    this.addBehaviours(c)
    },this.getBehaviours=function(a){
    if(!a)return this.$behaviours;
    var b={};
    
    for(var c=0;c<a.length;c++)this.$behaviours[a[c]]&&(b[a[c]]=this.$behaviours[a[c]]);
    return b
    }
})).call(d.prototype),b.Behaviour=d
}),define("ace/unicode",["require","exports","module"],function(a,b,c){
    function d(a){
        var c=/\w{4}/g;
        for(var d in a)b.packages[d]=a[d].replace(c,"\\u$&")
            }
            b.packages={},d({
        L:"0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
        Ll:"0061-007A00AA00B500BA00DF-00F600F8-00FF01010103010501070109010B010D010F01110113011501170119011B011D011F01210123012501270129012B012D012F01310133013501370138013A013C013E014001420144014601480149014B014D014F01510153015501570159015B015D015F01610163016501670169016B016D016F0171017301750177017A017C017E-0180018301850188018C018D019201950199-019B019E01A101A301A501A801AA01AB01AD01B001B401B601B901BA01BD-01BF01C601C901CC01CE01D001D201D401D601D801DA01DC01DD01DF01E101E301E501E701E901EB01ED01EF01F001F301F501F901FB01FD01FF02010203020502070209020B020D020F02110213021502170219021B021D021F02210223022502270229022B022D022F02310233-0239023C023F0240024202470249024B024D024F-02930295-02AF037103730377037B-037D039003AC-03CE03D003D103D5-03D703D903DB03DD03DF03E103E303E503E703E903EB03ED03EF-03F303F503F803FB03FC0430-045F04610463046504670469046B046D046F04710473047504770479047B047D047F0481048B048D048F04910493049504970499049B049D049F04A104A304A504A704A904AB04AD04AF04B104B304B504B704B904BB04BD04BF04C204C404C604C804CA04CC04CE04CF04D104D304D504D704D904DB04DD04DF04E104E304E504E704E904EB04ED04EF04F104F304F504F704F904FB04FD04FF05010503050505070509050B050D050F05110513051505170519051B051D051F0521052305250561-05871D00-1D2B1D62-1D771D79-1D9A1E011E031E051E071E091E0B1E0D1E0F1E111E131E151E171E191E1B1E1D1E1F1E211E231E251E271E291E2B1E2D1E2F1E311E331E351E371E391E3B1E3D1E3F1E411E431E451E471E491E4B1E4D1E4F1E511E531E551E571E591E5B1E5D1E5F1E611E631E651E671E691E6B1E6D1E6F1E711E731E751E771E791E7B1E7D1E7F1E811E831E851E871E891E8B1E8D1E8F1E911E931E95-1E9D1E9F1EA11EA31EA51EA71EA91EAB1EAD1EAF1EB11EB31EB51EB71EB91EBB1EBD1EBF1EC11EC31EC51EC71EC91ECB1ECD1ECF1ED11ED31ED51ED71ED91EDB1EDD1EDF1EE11EE31EE51EE71EE91EEB1EED1EEF1EF11EF31EF51EF71EF91EFB1EFD1EFF-1F071F10-1F151F20-1F271F30-1F371F40-1F451F50-1F571F60-1F671F70-1F7D1F80-1F871F90-1F971FA0-1FA71FB0-1FB41FB61FB71FBE1FC2-1FC41FC61FC71FD0-1FD31FD61FD71FE0-1FE71FF2-1FF41FF61FF7210A210E210F2113212F21342139213C213D2146-2149214E21842C30-2C5E2C612C652C662C682C6A2C6C2C712C732C742C76-2C7C2C812C832C852C872C892C8B2C8D2C8F2C912C932C952C972C992C9B2C9D2C9F2CA12CA32CA52CA72CA92CAB2CAD2CAF2CB12CB32CB52CB72CB92CBB2CBD2CBF2CC12CC32CC52CC72CC92CCB2CCD2CCF2CD12CD32CD52CD72CD92CDB2CDD2CDF2CE12CE32CE42CEC2CEE2D00-2D25A641A643A645A647A649A64BA64DA64FA651A653A655A657A659A65BA65DA65FA663A665A667A669A66BA66DA681A683A685A687A689A68BA68DA68FA691A693A695A697A723A725A727A729A72BA72DA72F-A731A733A735A737A739A73BA73DA73FA741A743A745A747A749A74BA74DA74FA751A753A755A757A759A75BA75DA75FA761A763A765A767A769A76BA76DA76FA771-A778A77AA77CA77FA781A783A785A787A78CFB00-FB06FB13-FB17FF41-FF5A",
        Lu:"0041-005A00C0-00D600D8-00DE01000102010401060108010A010C010E01100112011401160118011A011C011E01200122012401260128012A012C012E01300132013401360139013B013D013F0141014301450147014A014C014E01500152015401560158015A015C015E01600162016401660168016A016C016E017001720174017601780179017B017D018101820184018601870189-018B018E-0191019301940196-0198019C019D019F01A001A201A401A601A701A901AC01AE01AF01B1-01B301B501B701B801BC01C401C701CA01CD01CF01D101D301D501D701D901DB01DE01E001E201E401E601E801EA01EC01EE01F101F401F6-01F801FA01FC01FE02000202020402060208020A020C020E02100212021402160218021A021C021E02200222022402260228022A022C022E02300232023A023B023D023E02410243-02460248024A024C024E03700372037603860388-038A038C038E038F0391-03A103A3-03AB03CF03D2-03D403D803DA03DC03DE03E003E203E403E603E803EA03EC03EE03F403F703F903FA03FD-042F04600462046404660468046A046C046E04700472047404760478047A047C047E0480048A048C048E04900492049404960498049A049C049E04A004A204A404A604A804AA04AC04AE04B004B204B404B604B804BA04BC04BE04C004C104C304C504C704C904CB04CD04D004D204D404D604D804DA04DC04DE04E004E204E404E604E804EA04EC04EE04F004F204F404F604F804FA04FC04FE05000502050405060508050A050C050E05100512051405160518051A051C051E0520052205240531-055610A0-10C51E001E021E041E061E081E0A1E0C1E0E1E101E121E141E161E181E1A1E1C1E1E1E201E221E241E261E281E2A1E2C1E2E1E301E321E341E361E381E3A1E3C1E3E1E401E421E441E461E481E4A1E4C1E4E1E501E521E541E561E581E5A1E5C1E5E1E601E621E641E661E681E6A1E6C1E6E1E701E721E741E761E781E7A1E7C1E7E1E801E821E841E861E881E8A1E8C1E8E1E901E921E941E9E1EA01EA21EA41EA61EA81EAA1EAC1EAE1EB01EB21EB41EB61EB81EBA1EBC1EBE1EC01EC21EC41EC61EC81ECA1ECC1ECE1ED01ED21ED41ED61ED81EDA1EDC1EDE1EE01EE21EE41EE61EE81EEA1EEC1EEE1EF01EF21EF41EF61EF81EFA1EFC1EFE1F08-1F0F1F18-1F1D1F28-1F2F1F38-1F3F1F48-1F4D1F591F5B1F5D1F5F1F68-1F6F1FB8-1FBB1FC8-1FCB1FD8-1FDB1FE8-1FEC1FF8-1FFB21022107210B-210D2110-211221152119-211D212421262128212A-212D2130-2133213E213F214521832C00-2C2E2C602C62-2C642C672C692C6B2C6D-2C702C722C752C7E-2C802C822C842C862C882C8A2C8C2C8E2C902C922C942C962C982C9A2C9C2C9E2CA02CA22CA42CA62CA82CAA2CAC2CAE2CB02CB22CB42CB62CB82CBA2CBC2CBE2CC02CC22CC42CC62CC82CCA2CCC2CCE2CD02CD22CD42CD62CD82CDA2CDC2CDE2CE02CE22CEB2CEDA640A642A644A646A648A64AA64CA64EA650A652A654A656A658A65AA65CA65EA662A664A666A668A66AA66CA680A682A684A686A688A68AA68CA68EA690A692A694A696A722A724A726A728A72AA72CA72EA732A734A736A738A73AA73CA73EA740A742A744A746A748A74AA74CA74EA750A752A754A756A758A75AA75CA75EA760A762A764A766A768A76AA76CA76EA779A77BA77DA77EA780A782A784A786A78BFF21-FF3A",
        Lt:"01C501C801CB01F21F88-1F8F1F98-1F9F1FA8-1FAF1FBC1FCC1FFC",
        Lm:"02B0-02C102C6-02D102E0-02E402EC02EE0374037A0559064006E506E607F407F507FA081A0824082809710E460EC610FC17D718431AA71C78-1C7D1D2C-1D611D781D9B-1DBF2071207F2090-20942C7D2D6F2E2F30053031-3035303B309D309E30FC-30FEA015A4F8-A4FDA60CA67FA717-A71FA770A788A9CFAA70AADDFF70FF9EFF9F",
        Lo:"01BB01C0-01C3029405D0-05EA05F0-05F20621-063F0641-064A066E066F0671-06D306D506EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA0800-08150904-0939093D09500958-096109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E450E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10D0-10FA1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317DC1820-18421844-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C771CE9-1CEC1CEE-1CF12135-21382D30-2D652D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE3006303C3041-3096309F30A1-30FA30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A014A016-A48CA4D0-A4F7A500-A60BA610-A61FA62AA62BA66EA6A0-A6E5A7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2AA00-AA28AA40-AA42AA44-AA4BAA60-AA6FAA71-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADBAADCABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF66-FF6FFF71-FF9DFFA0-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
        M:"0300-036F0483-04890591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DE-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0903093C093E-094E0951-0955096209630981-098309BC09BE-09C409C709C809CB-09CD09D709E209E30A01-0A030A3C0A3E-0A420A470A480A4B-0A4D0A510A700A710A750A81-0A830ABC0ABE-0AC50AC7-0AC90ACB-0ACD0AE20AE30B01-0B030B3C0B3E-0B440B470B480B4B-0B4D0B560B570B620B630B820BBE-0BC20BC6-0BC80BCA-0BCD0BD70C01-0C030C3E-0C440C46-0C480C4A-0C4D0C550C560C620C630C820C830CBC0CBE-0CC40CC6-0CC80CCA-0CCD0CD50CD60CE20CE30D020D030D3E-0D440D46-0D480D4A-0D4D0D570D620D630D820D830DCA0DCF-0DD40DD60DD8-0DDF0DF20DF30E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F3E0F3F0F71-0F840F860F870F90-0F970F99-0FBC0FC6102B-103E1056-1059105E-10601062-10641067-106D1071-10741082-108D108F109A-109D135F1712-17141732-1734175217531772177317B6-17D317DD180B-180D18A91920-192B1930-193B19B0-19C019C819C91A17-1A1B1A55-1A5E1A60-1A7C1A7F1B00-1B041B34-1B441B6B-1B731B80-1B821BA1-1BAA1C24-1C371CD0-1CD21CD4-1CE81CED1CF21DC0-1DE61DFD-1DFF20D0-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66F-A672A67CA67DA6F0A6F1A802A806A80BA823-A827A880A881A8B4-A8C4A8E0-A8F1A926-A92DA947-A953A980-A983A9B3-A9C0AA29-AA36AA43AA4CAA4DAA7BAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE3-ABEAABECABEDFB1EFE00-FE0FFE20-FE26",
        Mn:"0300-036F0483-04870591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DF-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0902093C0941-0948094D0951-095509620963098109BC09C1-09C409CD09E209E30A010A020A3C0A410A420A470A480A4B-0A4D0A510A700A710A750A810A820ABC0AC1-0AC50AC70AC80ACD0AE20AE30B010B3C0B3F0B41-0B440B4D0B560B620B630B820BC00BCD0C3E-0C400C46-0C480C4A-0C4D0C550C560C620C630CBC0CBF0CC60CCC0CCD0CE20CE30D41-0D440D4D0D620D630DCA0DD2-0DD40DD60E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F71-0F7E0F80-0F840F860F870F90-0F970F99-0FBC0FC6102D-10301032-10371039103A103D103E10581059105E-10601071-1074108210851086108D109D135F1712-17141732-1734175217531772177317B7-17BD17C617C9-17D317DD180B-180D18A91920-19221927192819321939-193B1A171A181A561A58-1A5E1A601A621A65-1A6C1A73-1A7C1A7F1B00-1B031B341B36-1B3A1B3C1B421B6B-1B731B801B811BA2-1BA51BA81BA91C2C-1C331C361C371CD0-1CD21CD4-1CE01CE2-1CE81CED1DC0-1DE61DFD-1DFF20D0-20DC20E120E5-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66FA67CA67DA6F0A6F1A802A806A80BA825A826A8C4A8E0-A8F1A926-A92DA947-A951A980-A982A9B3A9B6-A9B9A9BCAA29-AA2EAA31AA32AA35AA36AA43AA4CAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE5ABE8ABEDFB1EFE00-FE0FFE20-FE26",
        Mc:"0903093E-09400949-094C094E0982098309BE-09C009C709C809CB09CC09D70A030A3E-0A400A830ABE-0AC00AC90ACB0ACC0B020B030B3E0B400B470B480B4B0B4C0B570BBE0BBF0BC10BC20BC6-0BC80BCA-0BCC0BD70C01-0C030C41-0C440C820C830CBE0CC0-0CC40CC70CC80CCA0CCB0CD50CD60D020D030D3E-0D400D46-0D480D4A-0D4C0D570D820D830DCF-0DD10DD8-0DDF0DF20DF30F3E0F3F0F7F102B102C10311038103B103C105610571062-10641067-106D108310841087-108C108F109A-109C17B617BE-17C517C717C81923-19261929-192B193019311933-193819B0-19C019C819C91A19-1A1B1A551A571A611A631A641A6D-1A721B041B351B3B1B3D-1B411B431B441B821BA11BA61BA71BAA1C24-1C2B1C341C351CE11CF2A823A824A827A880A881A8B4-A8C3A952A953A983A9B4A9B5A9BAA9BBA9BD-A9C0AA2FAA30AA33AA34AA4DAA7BABE3ABE4ABE6ABE7ABE9ABEAABEC",
        Me:"0488048906DE20DD-20E020E2-20E4A670-A672",
        N:"0030-003900B200B300B900BC-00BE0660-066906F0-06F907C0-07C90966-096F09E6-09EF09F4-09F90A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BF20C66-0C6F0C78-0C7E0CE6-0CEF0D66-0D750E50-0E590ED0-0ED90F20-0F331040-10491090-10991369-137C16EE-16F017E0-17E917F0-17F91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C5920702074-20792080-20892150-21822185-21892460-249B24EA-24FF2776-27932CFD30073021-30293038-303A3192-31953220-32293251-325F3280-328932B1-32BFA620-A629A6E6-A6EFA830-A835A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",
        Nd:"0030-00390660-066906F0-06F907C0-07C90966-096F09E6-09EF0A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BEF0C66-0C6F0CE6-0CEF0D66-0D6F0E50-0E590ED0-0ED90F20-0F291040-10491090-109917E0-17E91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C59A620-A629A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",
        Nl:"16EE-16F02160-21822185-218830073021-30293038-303AA6E6-A6EF",
        No:"00B200B300B900BC-00BE09F4-09F90BF0-0BF20C78-0C7E0D70-0D750F2A-0F331369-137C17F0-17F920702074-20792080-20892150-215F21892460-249B24EA-24FF2776-27932CFD3192-31953220-32293251-325F3280-328932B1-32BFA830-A835",
        P:"0021-00230025-002A002C-002F003A003B003F0040005B-005D005F007B007D00A100AB00B700BB00BF037E0387055A-055F0589058A05BE05C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F3A-0F3D0F850FD0-0FD4104A-104F10FB1361-13681400166D166E169B169C16EB-16ED1735173617D4-17D617D8-17DA1800-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD32010-20272030-20432045-20512053-205E207D207E208D208E2329232A2768-277527C527C627E6-27EF2983-299829D8-29DB29FC29FD2CF9-2CFC2CFE2CFF2E00-2E2E2E302E313001-30033008-30113014-301F3030303D30A030FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFD3EFD3FFE10-FE19FE30-FE52FE54-FE61FE63FE68FE6AFE6BFF01-FF03FF05-FF0AFF0C-FF0FFF1AFF1BFF1FFF20FF3B-FF3DFF3FFF5BFF5DFF5F-FF65",
        Pd:"002D058A05BE140018062010-20152E172E1A301C303030A0FE31FE32FE58FE63FF0D",
        Ps:"0028005B007B0F3A0F3C169B201A201E2045207D208D23292768276A276C276E27702772277427C527E627E827EA27EC27EE2983298529872989298B298D298F299129932995299729D829DA29FC2E222E242E262E283008300A300C300E3010301430163018301A301DFD3EFE17FE35FE37FE39FE3BFE3DFE3FFE41FE43FE47FE59FE5BFE5DFF08FF3BFF5BFF5FFF62",
        Pe:"0029005D007D0F3B0F3D169C2046207E208E232A2769276B276D276F27712773277527C627E727E927EB27ED27EF298429862988298A298C298E2990299229942996299829D929DB29FD2E232E252E272E293009300B300D300F3011301530173019301B301E301FFD3FFE18FE36FE38FE3AFE3CFE3EFE40FE42FE44FE48FE5AFE5CFE5EFF09FF3DFF5DFF60FF63",
        Pi:"00AB2018201B201C201F20392E022E042E092E0C2E1C2E20",
        Pf:"00BB2019201D203A2E032E052E0A2E0D2E1D2E21",
        Pc:"005F203F20402054FE33FE34FE4D-FE4FFF3F",
        Po:"0021-00230025-0027002A002C002E002F003A003B003F0040005C00A100B700BF037E0387055A-055F058905C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F850FD0-0FD4104A-104F10FB1361-1368166D166E16EB-16ED1735173617D4-17D617D8-17DA1800-18051807-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD3201620172020-20272030-2038203B-203E2041-20432047-205120532055-205E2CF9-2CFC2CFE2CFF2E002E012E06-2E082E0B2E0E-2E162E182E192E1B2E1E2E1F2E2A-2E2E2E302E313001-3003303D30FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFE10-FE16FE19FE30FE45FE46FE49-FE4CFE50-FE52FE54-FE57FE5F-FE61FE68FE6AFE6BFF01-FF03FF05-FF07FF0AFF0CFF0EFF0FFF1AFF1BFF1FFF20FF3CFF61FF64FF65",
        S:"0024002B003C-003E005E0060007C007E00A2-00A900AC00AE-00B100B400B600B800D700F702C2-02C502D2-02DF02E5-02EB02ED02EF-02FF03750384038503F604820606-0608060B060E060F06E906FD06FE07F609F209F309FA09FB0AF10B700BF3-0BFA0C7F0CF10CF20D790E3F0F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-139917DB194019E0-19FF1B61-1B6A1B74-1B7C1FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE20442052207A-207C208A-208C20A0-20B8210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B2140-2144214A-214D214F2190-2328232B-23E82400-24262440-244A249C-24E92500-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE27C0-27C427C7-27CA27CC27D0-27E527F0-29822999-29D729DC-29FB29FE-2B4C2B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F309B309C319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A700-A716A720A721A789A78AA828-A82BA836-A839AA77-AA79FB29FDFCFDFDFE62FE64-FE66FE69FF04FF0BFF1C-FF1EFF3EFF40FF5CFF5EFFE0-FFE6FFE8-FFEEFFFCFFFD",
        Sm:"002B003C-003E007C007E00AC00B100D700F703F60606-060820442052207A-207C208A-208C2140-2144214B2190-2194219A219B21A021A321A621AE21CE21CF21D221D421F4-22FF2308-230B23202321237C239B-23B323DC-23E125B725C125F8-25FF266F27C0-27C427C7-27CA27CC27D0-27E527F0-27FF2900-29822999-29D729DC-29FB29FE-2AFF2B30-2B442B47-2B4CFB29FE62FE64-FE66FF0BFF1C-FF1EFF5CFF5EFFE2FFE9-FFEC",
        Sc:"002400A2-00A5060B09F209F309FB0AF10BF90E3F17DB20A0-20B8A838FDFCFE69FF04FFE0FFE1FFE5FFE6",
        Sk:"005E006000A800AF00B400B802C2-02C502D2-02DF02E5-02EB02ED02EF-02FF0375038403851FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE309B309CA700-A716A720A721A789A78AFF3EFF40FFE3",
        So:"00A600A700A900AE00B000B60482060E060F06E906FD06FE07F609FA0B700BF3-0BF80BFA0C7F0CF10CF20D790F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-1399194019E0-19FF1B61-1B6A1B74-1B7C210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B214A214C214D214F2195-2199219C-219F21A121A221A421A521A7-21AD21AF-21CD21D021D121D321D5-21F32300-2307230C-231F2322-2328232B-237B237D-239A23B4-23DB23E2-23E82400-24262440-244A249C-24E92500-25B625B8-25C025C2-25F72600-266E2670-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE2800-28FF2B00-2B2F2B452B462B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A828-A82BA836A837A839AA77-AA79FDFDFFE4FFE8FFEDFFEEFFFCFFFD",
        Z:"002000A01680180E2000-200A20282029202F205F3000",
        Zs:"002000A01680180E2000-200A202F205F3000",
        Zl:"2028",
        Zp:"2029",
        C:"0000-001F007F-009F00AD03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-0605061C061D0620065F06DD070E070F074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17B417B517DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF200B-200F202A-202E2060-206F20722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-F8FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFD-FF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFFBFFFEFFFF",
        Cc:"0000-001F007F-009F",
        Cf:"00AD0600-060306DD070F17B417B5200B-200F202A-202E2060-2064206A-206FFEFFFFF9-FFFB",
        Co:"E000-F8FF",
        Cs:"D800-DFFF",
        Cn:"03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-05FF06040605061C061D0620065F070E074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF2065-206920722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-D7FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFDFEFEFF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFF8FFFEFFFF"
    })
    }),define("ace/document",["require","exports","module","ace/lib/oop","ace/lib/event_emitter","ace/range","ace/anchor"],function(a,b,c){
    var d=a("./lib/oop"),e=a("./lib/event_emitter").EventEmitter,f=a("./range").Range,g=a("./anchor").Anchor,h=function(a){
        this.$lines=[],Array.isArray(a)?this.insertLines(0,a):a.length==0?this.$lines=[""]:this.insert({
            row:0,
            column:0
        },a)
        };
    ((function(){
        d.implement(this,e),this.setValue=function(a){
            var b=this.getLength();
            this.remove(new f(0,0,b,this.getLine(b-1).length)),this.insert({
                row:0,
                column:0
            },a)
            },this.getValue=function(){
            return this.getAllLines().join(this.getNewLineCharacter())
            },this.createAnchor=function(a,b){
            return new g(this,a,b)
            },"aaa".split(/a/).length==0?this.$split=function(a){
            return a.replace(/\r\n|\r/g,"\n").split("\n")
            }:this.$split=function(a){
            return a.split(/\r\n|\r|\n/)
            },this.$detectNewLine=function(a){
            var b=a.match(/^.*?(\r\n|\r|\n)/m);
            b?this.$autoNewLine=b[1]:this.$autoNewLine="\n"
            },this.getNewLineCharacter=function(){
            switch(this.$newLineMode){
                case"windows":
                    return"\r\n";
                case"unix":
                    return"\n";
                case"auto":
                    return this.$autoNewLine
                    }
                },this.$autoNewLine="\n",this.$newLineMode="auto",this.setNewLineMode=function(a){
        if(this.$newLineMode===a)return;
        this.$newLineMode=a
        },this.getNewLineMode=function(){
        return this.$newLineMode
        },this.isNewLine=function(a){
        return a=="\r\n"||a=="\r"||a=="\n"
        },this.getLine=function(a){
        return this.$lines[a]||""
        },this.getLines=function(a,b){
        return this.$lines.slice(a,b+1)
        },this.getAllLines=function(){
        return this.getLines(0,this.getLength())
        },this.getLength=function(){
        return this.$lines.length
        },this.getTextRange=function(a){
        if(a.start.row==a.end.row)return this.$lines[a.start.row].substring(a.start.column,a.end.column);
        var b=[];
        return b.push(this.$lines[a.start.row].substring(a.start.column)),b.push.apply(b,this.getLines(a.start.row+1,a.end.row-1)),b.push(this.$lines[a.end.row].substring(0,a.end.column)),b.join(this.getNewLineCharacter())
        },this.$clipPosition=function(a){
        var b=this.getLength();
        return a.row>=b&&(a.row=Math.max(0,b-1),a.column=this.getLine(b-1).length),a
        },this.insert=function(a,b){
        if(b.length==0)return a;
        a=this.$clipPosition(a),this.getLength()<=1&&this.$detectNewLine(b);
        var c=this.$split(b),d=c.splice(0,1)[0],e=c.length==0?null:c.splice(c.length-1,1)[0];
        return a=this.insertInLine(a,d),e!==null&&(a=this.insertNewLine(a),a=this.insertLines(a.row,c),a=this.insertInLine(a,e||"")),a
        },this.insertLines=function(a,b){
        if(b.length==0)return{
            row:a,
            column:0
        };
        
        var c=[a,0];
        c.push.apply(c,b),this.$lines.splice.apply(this.$lines,c);
        var d=new f(a,0,a+b.length,0),e={
            action:"insertLines",
            range:d,
            lines:b
        };
        
        return this._dispatchEvent("change",{
            data:e
        }),d.end
        },this.insertNewLine=function(a){
        a=this.$clipPosition(a);
        var b=this.$lines[a.row]||"";
        this.$lines[a.row]=b.substring(0,a.column),this.$lines.splice(a.row+1,0,b.substring(a.column,b.length));
        var c={
            row:a.row+1,
            column:0
        },d={
            action:"insertText",
            range:f.fromPoints(a,c),
            text:this.getNewLineCharacter()
            };
            
        return this._dispatchEvent("change",{
            data:d
        }),c
        },this.insertInLine=function(a,b){
        if(b.length==0)return a;
        var c=this.$lines[a.row]||"";
        this.$lines[a.row]=c.substring(0,a.column)+b+c.substring(a.column);
        var d={
            row:a.row,
            column:a.column+b.length
            },e={
            action:"insertText",
            range:f.fromPoints(a,d),
            text:b
        };
        
        return this._dispatchEvent("change",{
            data:e
        }),d
        },this.remove=function(a){
        a.start=this.$clipPosition(a.start),a.end=this.$clipPosition(a.end);
        if(a.isEmpty())return a.start;
        var b=a.start.row,c=a.end.row;
        if(a.isMultiLine()){
            var d=a.start.column==0?b:b+1,e=c-1;
            a.end.column>0&&this.removeInLine(c,0,a.end.column),e>=d&&this.removeLines(d,e),d!=b&&(this.removeInLine(b,a.start.column,this.getLine(b).length),this.removeNewLine(a.start.row))
            }else this.removeInLine(b,a.start.column,a.end.column);
        return a.start
        },this.removeInLine=function(a,b,c){
        if(b==c)return;
        var d=new f(a,b,a,c),e=this.getLine(a),g=e.substring(b,c),h=e.substring(0,b)+e.substring(c,e.length);
        this.$lines.splice(a,1,h);
        var i={
            action:"removeText",
            range:d,
            text:g
        };
        
        return this._dispatchEvent("change",{
            data:i
        }),d.start
        },this.removeLines=function(a,b){
        var c=new f(a,0,b+1,0),d=this.$lines.splice(a,b-a+1),e={
            action:"removeLines",
            range:c,
            nl:this.getNewLineCharacter(),
            lines:d
        };
        
        return this._dispatchEvent("change",{
            data:e
        }),d
        },this.removeNewLine=function(a){
        var b=this.getLine(a),c=this.getLine(a+1),d=new f(a,b.length,a+1,0),e=b+c;
        this.$lines.splice(a,2,e);
        var g={
            action:"removeText",
            range:d,
            text:this.getNewLineCharacter()
            };
            
        this._dispatchEvent("change",{
            data:g
        })
        },this.replace=function(a,b){
            
            if(b.length==0&&a.isEmpty())return a.start;
            if(b==this.getTextRange(a))return a.end;
            this.remove(a);
            if(b)var c=this.insert(a.start,b);else c=a.start;
            return c
        },this.applyDeltas=function(a){
        for(var b=0;b<a.length;b++){
            var c=a[b],d=f.fromPoints(c.range.start,c.range.end);
            c.action=="insertLines"?this.insertLines(d.start.row,c.lines):c.action=="insertText"?this.insert(d.start,c.text):c.action=="removeLines"?this.removeLines(d.start.row,d.end.row-1):c.action=="removeText"&&this.remove(d)
            }
        },this.revertDeltas=function(a){
        for(var b=a.length-1;b>=0;b--){
            var c=a[b],d=f.fromPoints(c.range.start,c.range.end);
            c.action=="insertLines"?this.removeLines(d.start.row,d.end.row-1):c.action=="insertText"?this.remove(d):c.action=="removeLines"?this.insertLines(d.start.row,c.lines):c.action=="removeText"&&this.insert(d.start,c.text)
            }
        }
    })).call(h.prototype),b.Document=h
}),define("ace/anchor",["require","exports","module","ace/lib/oop","ace/lib/event_emitter"],function(a,b,c){
    var d=a("./lib/oop"),e=a("./lib/event_emitter").EventEmitter,f=b.Anchor=function(a,b,c){
        this.document=a,typeof c=="undefined"?this.setPosition(b.row,b.column):this.setPosition(b,c),this.$onChange=this.onChange.bind(this),a.on("change",this.$onChange)
        };
    ((function(){
        d.implement(this,e),this.getPosition=function(){
            return this.$clipPositionToDocument(this.row,this.column)
            },this.getDocument=function(){
            return this.document
            },this.onChange=function(a){
            var b=a.data,c=b.range;
            if(c.start.row==c.end.row&&c.start.row!=this.row)return;
            if(c.start.row>this.row)return;
            if(c.start.row==this.row&&c.start.column>this.column)return;
            var d=this.row,e=this.column;
            b.action==="insertText"?c.start.row===d&&c.start.column<=e?c.start.row===c.end.row?e+=c.end.column-c.start.column:(e-=c.start.column,d+=c.end.row-c.start.row):c.start.row!==c.end.row&&c.start.row<d&&(d+=c.end.row-c.start.row):b.action==="insertLines"?c.start.row<=d&&(d+=c.end.row-c.start.row):b.action=="removeText"?c.start.row==d&&c.start.column<e?c.end.column>=e?e=c.start.column:e=Math.max(0,e-(c.end.column-c.start.column)):c.start.row!==c.end.row&&c.start.row<d?(c.end.row==d&&(e=Math.max(0,e-c.end.column)+c.start.column),d-=c.end.row-c.start.row):c.end.row==d&&(d-=c.end.row-c.start.row,e=Math.max(0,e-c.end.column)+c.start.column):b.action=="removeLines"&&c.start.row<=d&&(c.end.row<=d?d-=c.end.row-c.start.row:(d=c.start.row,e=0)),this.setPosition(d,e,!0)
            },this.setPosition=function(a,b,c){
            var d;
            c?d={
                row:a,
                column:b
            }:d=this.$clipPositionToDocument(a,b);
            if(this.row==d.row&&this.column==d.column)return;
            var e={
                row:this.row,
                column:this.column
                };
                
            this.row=d.row,this.column=d.column,this._dispatchEvent("change",{
                old:e,
                value:d
            })
            },this.detach=function(){
            this.document.removeEventListener("change",this.$onChange)
            },this.$clipPositionToDocument=function(a,b){
            var c={};
            
            return a>=this.document.getLength()?(c.row=Math.max(0,this.document.getLength()-1),c.column=this.document.getLine(c.row).length):a<0?(c.row=0,c.column=0):(c.row=a,c.column=Math.min(this.document.getLine(c.row).length,Math.max(0,b))),b<0&&(c.column=0),c
            }
        })).call(f.prototype)
    }),define("ace/background_tokenizer",["require","exports","module","ace/lib/oop","ace/lib/event_emitter"],function(a,b,c){
    var d=a("./lib/oop"),e=a("./lib/event_emitter").EventEmitter,f=function(a,b){
        this.running=!1,this.lines=[],this.currentLine=0,this.tokenizer=a;
        var c=this;
        this.$worker=function(){
            if(!c.running)return;
            var a=new Date,b=c.currentLine,d=c.doc,e=0,f=d.getLength();
            while(c.currentLine<f){
                c.lines[c.currentLine]=c.$tokenizeRows(c.currentLine,c.currentLine)[0],c.currentLine++,e+=1;
                if(e%5==0&&new Date-a>20){
                    c.fireUpdateEvent(b,c.currentLine-1),c.running=setTimeout(c.$worker,20);
                    return
                }
            }
            c.running=!1,c.fireUpdateEvent(b,f-1)
        }
    };
((function(){
    d.implement(this,e),this.setTokenizer=function(a){
        this.tokenizer=a,this.lines=[],this.start(0)
        },this.setDocument=function(a){
        this.doc=a,this.lines=[],this.stop()
        },this.fireUpdateEvent=function(a,b){
        var c={
            first:a,
            last:b
        };
        
        this._dispatchEvent("update",{
            data:c
        })
        },this.start=function(a){
        this.currentLine=Math.min(a||0,this.currentLine,this.doc.getLength()),this.lines.splice(this.currentLine,this.lines.length),this.stop(),this.running=setTimeout(this.$worker,700)
        },this.stop=function(){
        this.running&&clearTimeout(this.running),this.running=!1
        },this.getTokens=function(a,b){
        return this.$tokenizeRows(a,b)
        },this.getState=function(a){
        return this.$tokenizeRows(a,a)[0].state
        },this.$tokenizeRows=function(a,b){
        if(!this.doc)return[];
        var c=[],d="start",e=!1;
        a>0&&this.lines[a-1]?(d=this.lines[a-1].state,e=!0):a==0?(d="start",e=!0):this.lines.length>0&&(d=this.lines[this.lines.length-1].state);
        var f=this.doc.getLines(a,b);
        for(var g=a;g<=b;g++)if(!this.lines[g]){
            var h=this.tokenizer.getLineTokens(f[g-a]||"",d),d=h.state;
            c.push(h),e&&(this.lines[g]=h)
            }else{
            var h=this.lines[g];
            d=h.state,c.push(h)
            }
            return c
        }
    })).call(f.prototype),b.BackgroundTokenizer=f
}),define("ace/edit_session/folding",["require","exports","module","ace/range","ace/edit_session/fold_line","ace/edit_session/fold","ace/token_iterator"],function(a,b,c){
    function h(){
        this.getFoldAt=function(a,b,c){
            var d=this.getFoldLine(a);
            if(!d)return null;
            var e=d.folds;
            for(var f=0;f<e.length;f++){
                var g=e[f];
                if(g.range.contains(a,b)){
                    if(c==1&&g.range.isEnd(a,b))continue;
                    if(c==-1&&g.range.isStart(a,b))continue;
                    return g
                    }
                }
            },this.getFoldsInRange=function(a){
    a=a.clone();
    var b=a.start,c=a.end,d=this.$foldData,e=[];
    b.column+=1,c.column-=1;
    for(var f=0;f<d.length;f++){
        var g=d[f].range.compareRange(a);
        if(g==2)continue;
        if(g==-2)break;
        var h=d[f].folds;
        for(var i=0;i<h.length;i++){
            var j=h[i];
            g=j.range.compareRange(a);
            if(g==-2)break;
            if(g==2)continue;
            if(g==42)break;
            e.push(j)
            }
        }
        return e
},this.getAllFolds=function(){
    function c(b){
        a.push(b);
        if(!b.subFolds)return;
        for(var d=0;d<b.subFolds.length;d++)c(b.subFolds[d])
            }
            var a=[],b=this.$foldData;
    for(var d=0;d<b.length;d++)for(var e=0;e<b[d].folds.length;e++)c(b[d].folds[e]);
    return a
    },this.getFoldStringAt=function(a,b,c,d){
    d=d||this.getFoldLine(a);
    if(!d)return null;
    var e={
        end:{
            column:0
        }
    },f,g;
for(var h=0;h<d.folds.length;h++){
    g=d.folds[h];
    var i=g.range.compareEnd(a,b);
    if(i==-1){
        f=this.getLine(g.start.row).substring(e.end.column,g.start.column);
        break
    }
    if(i===0)return null;
    e=g
    }
    return f||(f=this.getLine(g.start.row).substring(e.end.column)),c==-1?f.substring(0,b-e.end.column):c==1?f.substring(b-e.end.column):f
},this.getFoldLine=function(a,b){
    var c=this.$foldData,d=0;
    b&&(d=c.indexOf(b)),d==-1&&(d=0);
    for(d;d<c.length;d++){
        var e=c[d];
        if(e.start.row<=a&&e.end.row>=a)return e;
        if(e.end.row>a)return null
            }
            return null
    },this.getNextFoldLine=function(a,b){
    var c=this.$foldData,d=0;
    b&&(d=c.indexOf(b)),d==-1&&(d=0);
    for(d;d<c.length;d++){
        var e=c[d];
        if(e.end.row>=a)return e
            }
            return null
    },this.getFoldedRowCount=function(a,b){
    var c=this.$foldData,d=b-a+1;
    for(var e=0;e<c.length;e++){
        var f=c[e],g=f.end.row,h=f.start.row;
        if(g>=b){
            h<b&&(h>=a?d-=b-h:d=0);
            break
        }
        g>=a&&(h>=a?d-=g-h:d-=g-a+1)
        }
        return d
    },this.$addFoldLine=function(a){
    return this.$foldData.push(a),this.$foldData.sort(function(a,b){
        return a.start.row-b.start.row
        }),a
    },this.addFold=function(a,b){
    var c=this.$foldData,d=!1,g;
    a instanceof f?g=a:g=new f(b,a),this.$clipRangeToDocument(g.range);
    var h=g.start.row,i=g.start.column,j=g.end.row,k=g.end.column;
    if(g.placeholder.length<2)throw"Placeholder has to be at least 2 characters";
    if(h==j&&k-i<2)throw"The range has to be at least 2 characters width";
    var l=this.getFoldAt(h,i,1),m=this.getFoldAt(j,k,-1);
    if(l&&m==l)return l.addSubFold(g);
    if(l&&!l.range.isStart(h,i)||m&&!m.range.isEnd(j,k))throw"A fold can't intersect already existing fold"+g.range+l.range;
    var n=this.getFoldsInRange(g.range);
    n.length>0&&(this.removeFolds(n),g.subFolds=n);
    for(var o=0;o<c.length;o++){
        var p=c[o];
        if(j==p.start.row){
            p.addFold(g),d=!0;
            break
        }
        if(h==p.end.row){
            p.addFold(g),d=!0;
            if(!g.sameRow){
                var q=c[o+1];
                if(q&&q.start.row==j){
                    p.merge(q);
                    break
                }
            }
            break
    }
    if(j<=p.start.row)break
    }
    return d||(p=this.$addFoldLine(new e(this.$foldData,g))),this.$useWrapMode&&this.$updateWrapData(p.start.row,p.start.row),this.$modified=!0,this._dispatchEvent("changeFold",{
    data:g
}),g
},this.addFolds=function(a){
    a.forEach(function(a){
        this.addFold(a)
        },this)
    },this.removeFold=function(a){
    var b=a.foldLine,c=b.start.row,d=b.end.row,e=this.$foldData,f=b.folds;
    if(f.length==1)e.splice(e.indexOf(b),1);
    else if(b.range.isEnd(a.end.row,a.end.column))f.pop(),b.end.row=f[f.length-1].end.row,b.end.column=f[f.length-1].end.column;
    else if(b.range.isStart(a.start.row,a.start.column))f.shift(),b.start.row=f[0].start.row,b.start.column=f[0].start.column;
    else if(a.sameRow)f.splice(f.indexOf(a),1);
    else{
        var g=b.split(a.start.row,a.start.column);
        f=g.folds,f.shift(),g.start.row=f[0].start.row,g.start.column=f[0].start.column
        }
        this.$useWrapMode&&this.$updateWrapData(c,d),this.$modified=!0,this._dispatchEvent("changeFold",{
        data:a
    })
    },this.removeFolds=function(a){
    var b=[];
    for(var c=0;c<a.length;c++)b.push(a[c]);
    b.forEach(function(a){
        this.removeFold(a)
        },this),this.$modified=!0
    },this.expandFold=function(a){
    this.removeFold(a),a.subFolds.forEach(function(a){
        this.addFold(a)
        },this),a.subFolds=[]
    },this.expandFolds=function(a){
    a.forEach(function(a){
        this.expandFold(a)
        },this)
    },this.unfold=function(a,b){
    var c,e;
    a==null?c=new d(0,0,this.getLength(),0):typeof a=="number"?c=new d(a,0,a,this.getLine(a).length):"row"in a?c=d.fromPoints(a,a):c=a,e=this.getFoldsInRange(c);
    if(b)this.removeFolds(e);else while(e.length)this.expandFolds(e),e=this.getFoldsInRange(c)
        },this.isRowFolded=function(a,b){
    return!!this.getFoldLine(a,b)
    },this.getRowFoldEnd=function(a,b){
    var c=this.getFoldLine(a,b);
    return c?c.end.row:a
    },this.getFoldDisplayLine=function(a,b,c,d,e){
    d==null&&(d=a.start.row,e=0),b==null&&(b=a.end.row,c=this.getLine(b).length);
    var f=this.doc,g="";
    return a.walk(function(a,b,c,h,i){
        if(b<d)return;
        if(b==d){
            if(c<e)return;
            h=Math.max(e,h)
            }
            a?g+=a:g+=f.getLine(b).substring(h,c)
        }.bind(this),b,c),g
    },this.getDisplayLine=function(a,b,c,d){
    var e=this.getFoldLine(a);
    if(!e){
        var f;
        return f=this.doc.getLine(a),f.substring(d||0,b||f.length)
        }
        return this.getFoldDisplayLine(e,a,b,c,d)
    },this.$cloneFoldData=function(){
    var a=[];
    return a=this.$foldData.map(function(b){
        var c=b.folds.map(function(a){
            return a.clone()
            });
        return new e(a,c)
        }),a
    },this.toggleFold=function(a){
    var b=this.selection,c=b.getRange();
    if(c.isEmpty()){
        var d=c.start,e=this.getFoldAt(d.row,d.column),f;
        if(e){
            this.expandFold(e);
            return
        }(f=this.findMatchingBracket(d))?c.comparePoint(f)==1?c.end=f:(c.start=f,c.start.column++,c.end.column--):(f=this.findMatchingBracket({
            row:d.row,
            column:d.column+1
            }))?(c.comparePoint(f)==1?c.end=f:c.start=f,c.start.column++):c=this.getCommentFoldRange(d.row,d.column)||c
        }else{
        var g=this.getFoldsInRange(c);
        if(a&&g.length){
            this.expandFolds(g);
            return
        }
        g.length==1&&(e=g[0])
        }
        e||(e=this.getFoldAt(c.start.row,c.start.column));
    if(e&&e.range.toString()==c.toString()){
        this.expandFold(e);
        return
    }
    var h="...";
    if(!c.isMultiLine()){
        h=this.getTextRange(c);
        if(h.length<4)return;
        h=h.trim().substring(0,2)+".."
        }
        this.addFold(h,c)
    },this.getCommentFoldRange=function(a,b){
    var c=new g(this,a,b),e=c.getCurrentToken();
    if(e&&/^comment|string/.test(e.type)){
        var f=new d,h=new RegExp(e.type.replace(/\..*/,"\\."));
        do e=c.stepBackward();while(e&&h.test(e.type));
        c.stepForward(),f.start.row=c.getCurrentTokenRow(),f.start.column=c.getCurrentTokenColumn()+2,c=new g(this,a,b);
        do e=c.stepForward();while(e&&h.test(e.type));
        return e=c.stepBackward(),f.end.row=c.getCurrentTokenRow(),f.end.column=c.getCurrentTokenColumn()+e.value.length-1,f
        }
    },this.foldAll=function(a,b){
    var c=this.foldWidgets;
    b=b||c.length;
    for(var d=a||0;d<b;d++){
        c[d]==null&&(c[d]=this.getFoldWidget(d));
        if(c[d]!="start")continue;
        var e=this.getFoldWidgetRange(d);
        if(e&&e.end.row<b)try{
            this.addFold("...",e)
            }catch(f){}
        }
    },this.$foldStyles={
    manual:1,
    markbegin:1,
    markbeginend:1
},this.$foldStyle="markbegin",this.setFoldStyle=function(a){
    if(!this.$foldStyles[a])throw new Error("invalid fold style: "+a+"["+Object.keys(this.$foldStyles).join(", ")+"]");
    if(this.$foldStyle==a)return;
    this.$foldStyle=a;
    var b=this.$foldMode;
    this.$setFolding(null),this.$setFolding(b)
    },this.$setFolding=function(a){
    if(this.$foldMode==a)return;
    this.$foldMode=a,this.removeListener("change",this.$updateFoldWidgets),this._emit("changeAnnotation");
    if(!a||this.$foldStyle=="manual"){
        this.foldWidgets=null;
        return
    }
    this.foldWidgets=[],this.getFoldWidget=a.getFoldWidget.bind(a,this,this.$foldStyle),this.getFoldWidgetRange=a.getFoldWidgetRange.bind(a,this,this.$foldStyle),this.$updateFoldWidgets=this.updateFoldWidgets.bind(this),this.on("change",this.$updateFoldWidgets)
    },this.onFoldWidgetClick=function(a,b){
    var c=this.getFoldWidget(a),d=this.getLine(a),e=b.shiftKey,f=e||b.ctrlKey||b.altKey||b.metaKey,g;
    c=="end"?g=this.getFoldAt(a,0,-1):g=this.getFoldAt(a,d.length,1);
    if(g){
        f?this.removeFold(g):this.expandFold(g);
        return
    }
    var h=this.getFoldWidgetRange(a);
    h&&(e||this.addFold("...",h),f&&this.foldAll(h.start.row+1,h.end.row))
    },this.updateFoldWidgets=function(a){
    var b=a.data,c=b.range,d=c.start.row,e=c.end.row-d;
    if(e===0)this.foldWidgets[d]=null;
    else if(b.action=="removeText"||b.action=="removeLines")this.foldWidgets.splice(d,e+1,null);
    else{
        var f=Array(e+1);
        f.unshift(d,1),this.foldWidgets.splice.apply(this.foldWidgets,f)
        }
    }
}
var d=a("../range").Range,e=a("./fold_line").FoldLine,f=a("./fold").Fold,g=a("../token_iterator").TokenIterator;
b.Folding=h
}),define("ace/edit_session/fold_line",["require","exports","module","ace/range"],function(a,b,c){
    function e(a,b){
        this.foldData=a,Array.isArray(b)?this.folds=b:b=this.folds=[b];
        var c=b[b.length-1];
        this.range=new d(b[0].start.row,b[0].start.column,c.end.row,c.end.column),this.start=this.range.start,this.end=this.range.end,this.folds.forEach(function(a){
            a.setFoldLine(this)
            },this)
        }
        var d=a("../range").Range;
    ((function(){
        this.shiftRow=function(a){
            this.start.row+=a,this.end.row+=a,this.folds.forEach(function(b){
                b.start.row+=a,b.end.row+=a
                })
            },this.addFold=function(a){
            if(a.sameRow){
                if(a.start.row<this.startRow||a.endRow>this.endRow)throw"Can't add a fold to this FoldLine as it has no connection";
                this.folds.push(a),this.folds.sort(function(a,b){
                    return-a.range.compareEnd(b.start.row,b.start.column)
                    }),this.range.compareEnd(a.start.row,a.start.column)>0?(this.end.row=a.end.row,this.end.column=a.end.column):this.range.compareStart(a.end.row,a.end.column)<0&&(this.start.row=a.start.row,this.start.column=a.start.column)
                }else if(a.start.row==this.end.row)this.folds.push(a),this.end.row=a.end.row,this.end.column=a.end.column;
            else if(a.end.row==this.start.row)this.folds.unshift(a),this.start.row=a.start.row,this.start.column=a.start.column;else throw"Trying to add fold to FoldRow that doesn't have a matching row";
            a.foldLine=this
            },this.containsRow=function(a){
            return a>=this.start.row&&a<=this.end.row
            },this.walk=function(a,b,c){
            var d=0,e=this.folds,f,g,h,i=!0;
            b==null&&(b=this.end.row,c=this.end.column);
            for(var j=0;j<e.length;j++){
                f=e[j],g=f.range.compareStart(b,c);
                if(g==-1){
                    a(null,b,c,d,i);
                    return
                }
                h=a(null,f.start.row,f.start.column,d,i),h=!h&&a(f.placeholder,f.start.row,f.start.column,d);
                if(h||g==0)return;
                i=!f.sameRow,d=f.end.column
                }
                a(null,b,c,d,i)
            },this.getNextFoldTo=function(a,b){
            var c,d;
            for(var e=0;e<this.folds.length;e++){
                c=this.folds[e],d=c.range.compareEnd(a,b);
                if(d==-1)return{
                    fold:c,
                    kind:"after"
                };
                
                if(d==0)return{
                    fold:c,
                    kind:"inside"
                }
                }
                return null
        },this.addRemoveChars=function(a,b,c){
        var d=this.getNextFoldTo(a,b),e,f;
        if(d){
            e=d.fold;
            if(d.kind=="inside"&&e.start.column!=b&&e.start.row!=a)throw"Moving characters inside of a fold should never be reached";
            if(e.start.row==a){
                f=this.folds;
                var g=f.indexOf(e);
                g==0&&(this.start.column+=c);
                for(g;g<f.length;g++){
                    e=f[g],e.start.column+=c;
                    if(!e.sameRow)return;
                    e.end.column+=c
                    }
                    this.end.column+=c
                }
            }
    },this.split=function(a,b){
        var c=this.getNextFoldTo(a,b).fold,d=this.folds,f=this.foldData;
        if(!c)return null;
        var g=d.indexOf(c),h=d[g-1];
        this.end.row=h.end.row,this.end.column=h.end.column,d=d.splice(g,d.length-g);
        var i=new e(f,d);
        return f.splice(f.indexOf(this)+1,0,i),i
        },this.merge=function(a){
        var b=a.folds;
        for(var c=0;c<b.length;c++)this.addFold(b[c]);
        var d=this.foldData;
        d.splice(d.indexOf(a),1)
        },this.toString=function(){
        var a=[this.range.toString()+": ["];
        return this.folds.forEach(function(b){
            a.push("  "+b.toString())
            }),a.push("]"),a.join("\n")
        },this.idxToPosition=function(a){
        var b=0,c;
        for(var d=0;d<this.folds.length;d++){
            var c=this.folds[d];
            a-=c.start.column-b;
            if(a<0)return{
                row:c.start.row,
                column:c.start.column+a
                };
                
            a-=c.placeholder.length;
            if(a<0)return c.start;
            b=c.end.column
            }
            return{
            row:this.end.row,
            column:this.end.column+a
            }
        }
})).call(e.prototype),b.FoldLine=e
}),define("ace/edit_session/fold",["require","exports","module"],function(a,b,c){
    var d=b.Fold=function(a,b){
        this.foldLine=null,this.placeholder=b,this.range=a,this.start=a.start,this.end=a.end,this.sameRow=a.start.row==a.end.row,this.subFolds=[]
        };
    ((function(){
        this.toString=function(){
            return'"'+this.placeholder+'" '+this.range.toString()
            },this.setFoldLine=function(a){
            this.foldLine=a,this.subFolds.forEach(function(b){
                b.setFoldLine(a)
                })
            },this.clone=function(){
            var a=this.range.clone(),b=new d(a,this.placeholder);
            return this.subFolds.forEach(function(a){
                b.subFolds.push(a.clone())
                }),b
            },this.addSubFold=function(a){
            if(this.range.isEequal(a))return this;
            if(!this.range.containsRange(a))throw"A fold can't intersect already existing fold"+a.range+this.range;
            var b=a.range.start.row,c=a.range.start.column;
            for(var d=0,e=-1;d<this.subFolds.length;d++){
                e=this.subFolds[d].range.compare(b,c);
                if(e!=1)break
            }
            var f=this.subFolds[d];
            if(e==0)return f.addSubFold(a);
            var b=a.range.end.row,c=a.range.end.column;
            for(var g=d,e=-1;g<this.subFolds.length;g++){
                e=this.subFolds[g].range.compare(b,c);
                if(e!=1)break
            }
            var h=this.subFolds[g];
            if(e==0)throw"A fold can't intersect already existing fold"+a.range+this.range;
            var i=this.subFolds.splice(d,g-d,a);
            return a.setFoldLine(this.foldLine),a
            }
        })).call(d.prototype)
    }),define("ace/token_iterator",["require","exports","module"],function(a,b,c){
    var d=function(a,b,c){
        this.$session=a,this.$row=b,this.$rowTokens=a.getTokens(b,b)[0].tokens;
        var d=a.getTokenAt(b,c);
        this.$tokenIndex=d?d.index:-1
        };
    ((function(){
        this.stepBackward=function(){
            this.$tokenIndex-=1;
            while(this.$tokenIndex<0){
                this.$row-=1;
                if(this.$row<0)return null;
                this.$rowTokens=this.$session.getTokens(this.$row,this.$row)[0].tokens,this.$tokenIndex=this.$rowTokens.length-1
                }
                return this.$rowTokens[this.$tokenIndex]
            },this.stepForward=function(){
            var a=this.$session.getLength();
            this.$tokenIndex+=1;
            while(this.$tokenIndex>=this.$rowTokens.length){
                this.$row+=1;
                if(this.$row>=a)return null;
                this.$rowTokens=this.$session.getTokens(this.$row,this.$row)[0].tokens,this.$tokenIndex=0
                }
                return this.$rowTokens[this.$tokenIndex]
            },this.getCurrentToken=function(){
            return this.$rowTokens[this.$tokenIndex]
            },this.getCurrentTokenRow=function(){
            return this.$row
            },this.getCurrentTokenColumn=function(){
            var a=this.$rowTokens,b=this.$tokenIndex,c=a[b].start;
            if(c!==undefined)return c;
            c=0;
            while(b>0)b-=1,c+=a[b].value.length;
            return c
            }
        })).call(d.prototype),b.TokenIterator=d
    }),define("ace/edit_session/bracket_match",["require","exports","module","ace/token_iterator"],function(a,b,c){
    function e(){
        this.findMatchingBracket=function(a){
            if(a.column==0)return null;
            var b=this.getLine(a.row).charAt(a.column-1);
            if(b=="")return null;
            var c=b.match(/([\(\[\{])|([\)\]\}])/);
            return c?c[1]?this.$findClosingBracket(c[1],a):this.$findOpeningBracket(c[2],a):null
            },this.$brackets={
            ")":"(",
            "(":")",
            "]":"[",
            "[":"]",
            "{":"}",
            "}":"{"
        },this.$findOpeningBracket=function(a,b){
            var c=this.$brackets[a],e=1,f=new d(this,b.row,b.column),g=f.getCurrentToken();
            if(!g)return null;
            var h=new RegExp("(\\.?"+g.type.replace(".","|").replace("rparen","lparen|rparen")+")+"),i=b.column-f.getCurrentTokenColumn()-2,j=g.value;
            for(;;){
                while(i>=0){
                    var k=j.charAt(i);
                    if(k==c){
                        e-=1;
                        if(e==0)return{
                            row:f.getCurrentTokenRow(),
                            column:i+f.getCurrentTokenColumn()
                            }
                        }else k==a&&(e+=1);
                i-=1
                }
                do g=f.stepBackward();while(g&&!h.test(g.type));
                if(g==null)break;
                j=g.value,i=j.length-1
                }
                return null
        },this.$findClosingBracket=function(a,b){
        var c=this.$brackets[a],e=1,f=new d(this,b.row,b.column),g=f.getCurrentToken();
        if(!g)return null;
        var h=new RegExp("(\\.?"+g.type.replace(".","|").replace("lparen","lparen|rparen")+")+"),i=b.column-f.getCurrentTokenColumn();
        for(;;){
            var j=g.value,k=j.length;
            while(i<k){
                var l=j.charAt(i);
                if(l==c){
                    e-=1;
                    if(e==0)return{
                        row:f.getCurrentTokenRow(),
                        column:i+f.getCurrentTokenColumn()
                        }
                    }else l==a&&(e+=1);
            i+=1
            }
            do g=f.stepForward();while(g&&!h.test(g.type));
            if(g==null)break;
            i=0
            }
            return null
    }
}
var d=a("../token_iterator").TokenIterator;
b.BracketMatch=e
}),define("ace/search",["require","exports","module","ace/lib/lang","ace/lib/oop","ace/range"],function(a,b,c){
    var d=a("./lib/lang"),e=a("./lib/oop"),f=a("./range").Range,g=function(){
        this.$options={
            needle:"",
            backwards:!1,
            wrap:!1,
            caseSensitive:!1,
            wholeWord:!1,
            scope:g.ALL,
            regExp:!1
            }
        };
    
g.ALL=1,g.SELECTION=2,function(){
    this.set=function(a){
            return e.mixin(this.$options,a),this
        },this.getOptions=function(){
            return d.copyObject(this.$options)
        },this.find=function(a){
            if(!this.$options.needle)return null;
            if(this.$options.backwards){
                var b=this.$backwardMatchIterator(a);
            }else b=this.$forwardMatchIterator(a);
           
           var c=null;
            return b.forEach(function(a){
                return c=a,!0
            }),c
        },this.findAll=function(a){
            var b=this.$options;
            if(!b.needle)return[];
            if(b.backwards)var c=this.$backwardMatchIterator(a);else c=this.$forwardMatchIterator(a);
            var d=!b.start&&b.wrap&&b.scope==g.ALL;
            d&&(b.start={
                row:0,
                column:0
            });
            var e=[];
            return c.forEach(function(a){
                e.push(a)
            }),d&&(b.start=null),e
        },this.replace=function(a,b){
            var c=this.$assembleRegExp(),d=c.exec(a);
            return d&&d[0].length==a.length?this.$options.regExp?a.replace(c,b):b:null
        },this.$forwardMatchIterator=function(a){
        var b=this.$assembleRegExp(),c=this;
        return{
            forEach:function(d){
                c.$forwardLineIterator(a).forEach(function(a,e,f){
                    e&&(a=a.substring(e));
                    var g=[];
                    a.replace(b,function(a){
                        var b=arguments[arguments.length-2];
                        return g.push({
                            str:a,
                            offset:e+b
                            }),a
                        });
                    for(var h=0;h<g.length;h++){
                        var i=g[h],j=c.$rangeFromMatch(f,i.offset,i.str.length);
                        if(d(j))return!0
                            }
                        })
            }
        }
},this.$backwardMatchIterator=function(a){
    var b=this.$assembleRegExp(),c=this;
    return{
        forEach:function(d){
            c.$backwardLineIterator(a).forEach(function(a,e,f){
                e&&(a=a.substring(e));
                var g=[];
                a.replace(b,function(a,b){
                    return g.push({
                        str:a,
                        offset:e+b
                        }),a
                    });
                for(var h=g.length-1;h>=0;h--){
                    var i=g[h],j=c.$rangeFromMatch(f,i.offset,i.str.length);
                    if(d(j))return!0
                        }
                    })
        }
    }
},this.$rangeFromMatch=function(a,b,c){
    return new f(a,b,a,b+c)
    },this.$assembleRegExp=function(){
        if(this.$options.regExp)var a=this.$options.needle;else a=d.escapeRegExp(this.$options.needle);
        this.$options.wholeWord&&(a="\\b"+a+"\\b");
        var b="g";
        this.$options.caseSensitive||(b+="i");
        var c=new RegExp(a,b);
        return c
    },this.$forwardLineIterator=function(a){
    function k(e){
        var f=a.getLine(e);
        return b&&e==c.end.row&&(f=f.substring(0,c.end.column)),j&&e==d.row&&(f=f.substring(0,d.column)),f
        }
        var b=this.$options.scope==g.SELECTION,c=this.$options.range||a.getSelection().getRange(),d=this.$options.start||c[b?"start":"end"],e=b?c.start.row:0,f=b?c.start.column:0,h=b?c.end.row:a.getLength()-1,i=this.$options.wrap,j=!1;
    return{
        forEach:function(a){
            var b=d.row,c=k(b),g=d.column,l=!1;
            j=!1;
            while(!a(c,g,b)){
                if(l)return;
                b++,g=0;
                if(b>h)if(i)b=e,g=f,j=!0;else return;
                b==d.row&&(l=!0),c=k(b)
                }
            }
    }
},this.$backwardLineIterator=function(a){
    var b=this.$options.scope==g.SELECTION,c=this.$options.range||a.getSelection().getRange(),d=this.$options.start||c[b?"end":"start"],e=b?c.start.row:0,f=b?c.start.column:0,h=b?c.end.row:a.getLength()-1,i=this.$options.wrap;
    return{
        forEach:function(g){
            var j=d.row,k=a.getLine(j).substring(0,d.column),l=0,m=!1,n=!1;
            while(!g(k,l,j)){
                if(m)return;
                j--,l=0;
                if(j<e)if(i)j=h,n=!0;else return;
                j==d.row&&(m=!0),k=a.getLine(j),b&&(j==e?l=f:j==h&&(k=k.substring(0,c.end.column))),n&&j==d.row&&(l=d.column)
                }
            }
    }
}
}.call(g.prototype),b.Search=g
}),define("ace/commands/command_manager",["require","exports","module","ace/lib/keys"],function(a,b,c){
    var d=a("../lib/keys"),e=function(a,b){
        if(typeof a!="string")throw new TypeError("'platform' argument must be either 'mac' or 'win'");
        this.platform=a,this.commands={},this.commmandKeyBinding={},b&&b.forEach(this.addCommand,this)
        };
    ((function(){
        function a(a,c,e){
            var f,g=0,h=b(a);
            for(var i=0,j=h.length;i<j;i++)d.KEY_MODS[h[i]]?g|=d.KEY_MODS[h[i]]:f=h[i]||"-";
            return{
                key:f,
                hashId:g
            }
        }
        function b(a,b){
        return a.toLowerCase().trim().split(new RegExp("[\\s ]*\\-[\\s ]*","g"),999)
        }
        this.addCommand=function(a){
        this.commands[a.name]&&this.removeCommand(a),this.commands[a.name]=a,a.bindKey&&this._buildKeyHash(a)
        },this.removeCommand=function(a){
        var b=typeof a=="string"?a:a.name;
        a=this.commands[b],delete this.commands[b];
        var c=this.commmandKeyBinding;
        for(var d in c)for(var e in c[d])c[d][e]==a&&delete c[d][e]
            },this.addCommands=function(a){
        Object.keys(a).forEach(function(b){
            var c=a[b];
            if(typeof c=="string")return this.bindKey(c,b);
            typeof c=="function"&&(c={
                exec:c
            }),c.name||(c.name=b),this.addCommand(c)
            },this)
        },this.removeCommands=function(a){
        Object.keys(a).forEach(function(b){
            this.removeCommand(a[b])
            },this)
        },this.bindKey=function(b,c){
        if(!b)return;
        var d=this.commmandKeyBinding;
        b.split("|").forEach(function(b){
            var e=a(b,c),f=e.hashId;
            (d[f]||(d[f]={}))[e.key]=c
            })
        },this.bindKeys=function(a){
        Object.keys(a).forEach(function(b){
            this.bindKey(b,a[b])
            },this)
        },this._buildKeyHash=function(a){
        var b=a.bindKey;
        if(!b)return;
        var c=typeof b=="string"?b:b[this.platform];
        this.bindKey(c,a)
        },this.findKeyCommand=function c(a,b){
        typeof b=="number"&&(b=d.keyCodeToString(b));
        var c=this.commmandKeyBinding;
        return c[a]&&c[a][b.toLowerCase()]
        },this.exec=function(a,b,c){
        return typeof a=="string"&&(a=this.commands[a]),a?b&&b.$readOnly&&!a.readOnly?!1:(a.exec(b,c||{}),!0):!1
        },this.toggleRecording=function(){
        if(this.$inReplay)return;
        return this.recording?(this.macro.pop(),this.exec=this.normal_exec,this.recording=!1):(this.macro=[],this.normal_exec=this.exec,this.exec=function(a,b,c){
            return this.macro.push([a,c]),this.normal_exec(a,b,c)
            },this.recording=!0)
        },this.replay=function(a){
        if(this.$inReplay)return;
        if(!this.macro||this.recording)return this.toggleRecording();
        try{
            this.$inReplay=!0,this.macro.forEach(function(b){
                typeof b=="string"?this.exec(b,a):this.exec(b[0],a,b[1])
                },this)
            }finally{
            this.$inReplay=!1
            }
        },this.trimMacro=function(a){
        return a.map(function(a){
            return typeof a[0]!="string"&&(a[0]=a[0].name),a[1]||(a=a[0]),a
            })
        }
    })).call(e.prototype),b.CommandManager=e
}),define("ace/undomanager",["require","exports","module"],function(a,b,c){
    var d=function(){
        this.reset()
        };
    ((function(){
        this.execute=function(a){
            var b=a.args[0];
            this.$doc=a.args[1],this.$undoStack.push(b),this.$redoStack=[]
            },this.undo=function(a){
            var b=this.$undoStack.pop(),c=null;
            return b&&(c=this.$doc.undoChanges(b,a),this.$redoStack.push(b)),c
            },this.redo=function(a){
            var b=this.$redoStack.pop(),c=null;
            return b&&(c=this.$doc.redoChanges(b,a),this.$undoStack.push(b)),c
            },this.reset=function(){
            this.$undoStack=[],this.$redoStack=[]
            },this.hasUndo=function(){
            return this.$undoStack.length>0;
            },this.hasRedo=function(){
            return this.$redoStack.length>0
            }
        })).call(d.prototype),b.UndoManager=d
    }),define("ace/virtual_renderer",["require","exports","module","ace/lib/oop","ace/lib/dom","ace/lib/event","ace/lib/useragent","ace/layer/gutter","ace/layer/marker","ace/layer/text","ace/layer/cursor","ace/scrollbar","ace/renderloop","ace/lib/event_emitter","text!ace/css/editor.css"],function(a,b,c){
    var d=a("./lib/oop"),e=a("./lib/dom"),f=a("./lib/event"),g=a("./lib/useragent"),h=a("./layer/gutter").Gutter,i=a("./layer/marker").Marker,j=a("./layer/text").Text,k=a("./layer/cursor").Cursor,l=a("./scrollbar").ScrollBar,m=a("./renderloop").RenderLoop,n=a("./lib/event_emitter").EventEmitter,o=a("text!./css/editor.css");
    e.importCssString(o,"ace_editor");
    var p=function(a,b){
        this.container=a,setTimeout(function(){
            e.addCssClass(a,"ace_editor")
            },0),this.setTheme(b),this.$gutter=e.createElement("div"),this.$gutter.className="ace_gutter",this.container.appendChild(this.$gutter),this.scroller=e.createElement("div"),this.scroller.className="ace_scroller",this.container.appendChild(this.scroller),this.content=e.createElement("div"),this.content.className="ace_content",this.scroller.appendChild(this.content),this.$gutterLayer=new h(this.$gutter),this.$markerBack=new i(this.content);
        var c=this.$textLayer=new j(this.content);
        this.canvas=c.element,this.$markerFront=new i(this.content),this.characterWidth=c.getCharacterWidth(),this.lineHeight=c.getLineHeight(),this.$cursorLayer=new k(this.content),this.$cursorPadding=8,this.$horizScroll=!0,this.$horizScrollAlwaysVisible=!0,this.scrollBar=new l(a),this.scrollBar.addEventListener("scroll",this.onScroll.bind(this)),this.scrollTop=0,this.cursorPos={
            row:0,
            column:0
        };
        
        var d=this;
        this.$textLayer.addEventListener("changeCharaterSize",function(){
            d.characterWidth=c.getCharacterWidth(),d.lineHeight=c.getLineHeight(),d.$updatePrintMargin(),d.onResize(!0),d.$loop.schedule(d.CHANGE_FULL)
            }),f.addListener(this.$gutter,"click",this.$onGutterClick.bind(this)),f.addListener(this.$gutter,"dblclick",this.$onGutterClick.bind(this)),this.$size={
            width:0,
            height:0,
            scrollerHeight:0,
            scrollerWidth:0
        },this.layerConfig={
            width:1,
            padding:0,
            firstRow:0,
            firstRowScreen:0,
            lastRow:0,
            lineHeight:1,
            characterWidth:1,
            minHeight:1,
            maxHeight:1,
            offset:0,
            height:1
        },this.$loop=new m(this.$renderChanges.bind(this),this.container.ownerDocument.defaultView),this.$loop.schedule(this.CHANGE_FULL),this.setPadding(4),this.$updatePrintMargin()
        };
    ((function(){
        this.showGutter=!0,this.CHANGE_CURSOR=1,this.CHANGE_MARKER=2,this.CHANGE_GUTTER=4,this.CHANGE_SCROLL=8,this.CHANGE_LINES=16,this.CHANGE_TEXT=32,this.CHANGE_SIZE=64,this.CHANGE_MARKER_BACK=128,this.CHANGE_MARKER_FRONT=256,this.CHANGE_FULL=512,d.implement(this,n),this.setSession=function(a){
            this.session=a,this.$cursorLayer.setSession(a),this.$markerBack.setSession(a),this.$markerFront.setSession(a),this.$gutterLayer.setSession(a),this.$textLayer.setSession(a),this.$loop.schedule(this.CHANGE_FULL)
            },this.updateLines=function(a,b){
            b===undefined&&(b=Infinity),this.$changedLines?(this.$changedLines.firstRow>a&&(this.$changedLines.firstRow=a),this.$changedLines.lastRow<b&&(this.$changedLines.lastRow=b)):this.$changedLines={
                firstRow:a,
                lastRow:b
            },this.$loop.schedule(this.CHANGE_LINES)
            },this.updateText=function(){
            this.$loop.schedule(this.CHANGE_TEXT)
            },this.updateFull=function(){
            this.$loop.schedule(this.CHANGE_FULL)
            },this.updateFontSize=function(){
            this.$textLayer.checkForSizeChanges()
            },this.onResize=function(a){
            var b=this.CHANGE_SIZE,c=this.$size,d=e.getInnerHeight(this.container);
            if(a||c.height!=d)c.height=d,this.scroller.style.height=d+"px",c.scrollerHeight=this.scroller.clientHeight,this.scrollBar.setHeight(c.scrollerHeight),this.session&&(this.scrollToY(this.getScrollTop()),b|=this.CHANGE_FULL);
            var f=e.getInnerWidth(this.container);
            if(a||c.width!=f){
                c.width=f;
                var g=this.showGutter?this.$gutter.offsetWidth:0;
                this.scroller.style.left=g+"px",c.scrollerWidth=Math.max(0,f-g-this.scrollBar.getWidth()),this.scroller.style.width=c.scrollerWidth+"px";
                if(this.session.getUseWrapMode()&&this.adjustWrapLimit()||a)b|=this.CHANGE_FULL
                    }
                    this.$loop.schedule(b)
            },this.adjustWrapLimit=function(){
            var a=this.$size.scrollerWidth-this.$padding*2,b=Math.floor(a/this.characterWidth)-1;
            return this.session.adjustWrapLimit(b)
            },this.$onGutterClick=function(a){
            var b=f.getDocumentY(a),c=this.screenToTextCoordinates(0,b).row;
            var nombreClase;
            if(navigator.appName.indexOf("xplorer")!=-1){
                nombreClase=a.srcElement.className;
            }else{
                nombreClase=a.target.className;
            }         
            if(nombreClase.indexOf("ace_fold-widget")!=-1)return this.session.onFoldWidgetClick(c,a);
            this._dispatchEvent("gutter"+a.type,{
                row:c,
                htmlEvent:a
            })
            },this.setShowInvisibles=function(a){
            this.$textLayer.setShowInvisibles(a)&&this.$loop.schedule(this.CHANGE_TEXT)
            },this.getShowInvisibles=function(){
            return this.$textLayer.showInvisibles
            },this.$showPrintMargin=!0,this.setShowPrintMargin=function(a){
            this.$showPrintMargin=a,this.$updatePrintMargin()
            },this.getShowPrintMargin=function(){
            return this.$showPrintMargin
            },this.$printMarginColumn=80,this.setPrintMarginColumn=function(a){
            this.$printMarginColumn=a,this.$updatePrintMargin()
            },this.getPrintMarginColumn=function(){
            return this.$printMarginColumn
            },this.getShowGutter=function(){
            return this.showGutter
            },this.setShowGutter=function(a){
            if(this.showGutter===a)return;
            this.$gutter.style.display=a?"block":"none",this.showGutter=a,this.onResize(!0)
            },this.$updatePrintMargin=function(){
            var a;
            if(!this.$showPrintMargin&&!this.$printMarginEl)return;
            this.$printMarginEl||(a=e.createElement("div"),a.className="ace_print_margin_layer",this.$printMarginEl=e.createElement("div"),this.$printMarginEl.className="ace_print_margin",a.appendChild(this.$printMarginEl),this.content.insertBefore(a,this.$textLayer.element));
            var b=this.$printMarginEl.style;
            b.left=this.characterWidth*this.$printMarginColumn+this.$padding*2+"px",b.visibility=this.$showPrintMargin?"visible":"hidden"
            },this.getContainerElement=function(){
            return this.container
            },this.getMouseEventTarget=function(){
            return this.content
            },this.getTextAreaContainer=function(){
            return this.container
            },this.moveTextAreaToCursor=function(a){
            if(g.isIE)return;
            var b=this.$cursorLayer.getPixelPosition();
            if(!b)return;
            var c=this.content.getBoundingClientRect(),d=this.layerConfig.offset;
            a.style.left=c.left+b.left+this.$padding+"px",a.style.top=c.top+b.top-this.scrollTop+d+"px"
            },this.getFirstVisibleRow=function(){
            return this.layerConfig.firstRow
            },this.getFirstFullyVisibleRow=function(){
            return this.layerConfig.firstRow+(this.layerConfig.offset===0?0:1)
            },this.getLastFullyVisibleRow=function(){
            var a=Math.floor((this.layerConfig.height+this.layerConfig.offset)/this.layerConfig.lineHeight);
            return this.layerConfig.firstRow-1+a
            },this.getLastVisibleRow=function(){
            return this.layerConfig.lastRow
            },this.$padding=null,this.setPadding=function(a){
            this.$padding=a,this.$textLayer.setPadding(a),this.$cursorLayer.setPadding(a),this.$markerFront.setPadding(a),this.$markerBack.setPadding(a),this.$loop.schedule(this.CHANGE_FULL),this.$updatePrintMargin()
            },this.getHScrollBarAlwaysVisible=function(){
            return this.$horizScrollAlwaysVisible
            },this.setHScrollBarAlwaysVisible=function(a){
            this.$horizScrollAlwaysVisible!=a&&(this.$horizScrollAlwaysVisible=a,(!this.$horizScrollAlwaysVisible||!this.$horizScroll)&&this.$loop.schedule(this.CHANGE_SCROLL))
            },this.onScroll=function(a){
            this.scrollToY(a.data)
            },this.$updateScrollBar=function(){
            this.scrollBar.setInnerHeight(this.layerConfig.maxHeight),this.scrollBar.setScrollTop(this.scrollTop)
            },this.$renderChanges=function(a){
            if(!a||!this.session)return;
            (a&this.CHANGE_FULL||a&this.CHANGE_SIZE||a&this.CHANGE_TEXT||a&this.CHANGE_LINES||a&this.CHANGE_SCROLL)&&this.$computeLayerConfig();
            if(a&this.CHANGE_FULL){
                this.$textLayer.update(this.layerConfig),this.showGutter&&this.$gutterLayer.update(this.layerConfig),this.$markerBack.update(this.layerConfig),this.$markerFront.update(this.layerConfig),this.$cursorLayer.update(this.layerConfig),this.$updateScrollBar();
                return
            }
            if(a&this.CHANGE_SCROLL){
                a&this.CHANGE_TEXT||a&this.CHANGE_LINES?this.$textLayer.update(this.layerConfig):this.$textLayer.scrollLines(this.layerConfig),this.showGutter&&this.$gutterLayer.update(this.layerConfig),this.$markerBack.update(this.layerConfig),this.$markerFront.update(this.layerConfig),this.$cursorLayer.update(this.layerConfig),this.$updateScrollBar();
                return
            }
            a&this.CHANGE_TEXT?(this.$textLayer.update(this.layerConfig),this.showGutter&&this.$gutterLayer.update(this.layerConfig)):a&this.CHANGE_LINES?(this.$updateLines(),this.$updateScrollBar(),this.showGutter&&this.$gutterLayer.update(this.layerConfig)):a&this.CHANGE_GUTTER&&this.showGutter&&this.$gutterLayer.update(this.layerConfig),a&this.CHANGE_CURSOR&&this.$cursorLayer.update(this.layerConfig),a&(this.CHANGE_MARKER|this.CHANGE_MARKER_FRONT)&&this.$markerFront.update(this.layerConfig),a&(this.CHANGE_MARKER|this.CHANGE_MARKER_BACK)&&this.$markerBack.update(this.layerConfig),a&this.CHANGE_SIZE&&this.$updateScrollBar()
            },this.$computeLayerConfig=function(){
            var a=this.session,b=this.scrollTop%this.lineHeight,c=this.$size.scrollerHeight+this.lineHeight,d=this.$getLongestLine(),e=this.layerConfig.width!=d,f=this.$horizScrollAlwaysVisible||this.$size.scrollerWidth-d<0,g=this.$horizScroll!==f;
            this.$horizScroll=f,g&&(this.scroller.style.overflowX=f?"scroll":"hidden");
            var h=this.session.getScreenLength()*this.lineHeight;
            this.scrollTop=Math.max(0,Math.min(this.scrollTop,h-this.$size.scrollerHeight));
            var i=Math.ceil(c/this.lineHeight)-1,j=Math.max(0,Math.round((this.scrollTop-b)/this.lineHeight)),k=j+i,l,m,n={
                lineHeight:this.lineHeight
                };
                
            j=a.screenToDocumentRow(j,0);
            var o=a.getFoldLine(j);
            o&&(j=o.start.row),l=a.documentToScreenRow(j,0),m=a.getRowHeight(n,j),k=Math.min(a.screenToDocumentRow(k,0),a.getLength()-1),c=this.$size.scrollerHeight+a.getRowHeight(n,k)+m,b=this.scrollTop-l*this.lineHeight,this.layerConfig={
                width:d,
                padding:this.$padding,
                firstRow:j,
                firstRowScreen:l,
                lastRow:k,
                lineHeight:this.lineHeight,
                characterWidth:this.characterWidth,
                minHeight:c,
                maxHeight:h,
                offset:b,
                height:this.$size.scrollerHeight
                },this.$gutterLayer.element.style.marginTop=-b+"px",this.content.style.marginTop=-b+"px",this.content.style.width=d+"px",this.content.style.height=c+"px",this.$desiredScrollLeft&&(this.scrollToX(this.$desiredScrollLeft),this.$desiredScrollLeft=0),g&&this.onResize(!0)
            },this.$updateLines=function(){
            var a=this.$changedLines.firstRow,b=this.$changedLines.lastRow;
            this.$changedLines=null;
            var c=this.layerConfig;
            if(c.width!=this.$getLongestLine())return this.$textLayer.update(c);
            if(a>c.lastRow+1)return;
            if(b<c.firstRow)return;
            if(b===Infinity){
                this.showGutter&&this.$gutterLayer.update(c),this.$textLayer.update(c);
                return
            }
            this.$textLayer.updateLines(c,a,b)
            },this.$getLongestLine=function(){
            var a=this.session.getScreenWidth()+1;
            return this.$textLayer.showInvisibles&&(a+=1),Math.max(this.$size.scrollerWidth,Math.round(a*this.characterWidth))
            },this.updateFrontMarkers=function(){
            this.$markerFront.setMarkers(this.session.getMarkers(!0)),this.$loop.schedule(this.CHANGE_MARKER_FRONT)
            },this.updateBackMarkers=function(){
            this.$markerBack.setMarkers(this.session.getMarkers()),this.$loop.schedule(this.CHANGE_MARKER_BACK)
            },this.addGutterDecoration=function(a,b){
            this.$gutterLayer.addGutterDecoration(a,b),this.$loop.schedule(this.CHANGE_GUTTER)
            },this.removeGutterDecoration=function(a,b){
            this.$gutterLayer.removeGutterDecoration(a,b),this.$loop.schedule(this.CHANGE_GUTTER)
            },this.setBreakpoints=function(a){
            this.$gutterLayer.setBreakpoints(a),this.$loop.schedule(this.CHANGE_GUTTER)
            },this.setAnnotations=function(a){
            this.$gutterLayer.setAnnotations(a),this.$loop.schedule(this.CHANGE_GUTTER)
            },this.updateCursor=function(){
            this.$loop.schedule(this.CHANGE_CURSOR)
            },this.hideCursor=function(){
            this.$cursorLayer.hideCursor()
            },this.showCursor=function(){
            this.$cursorLayer.showCursor()
            },this.scrollCursorIntoView=function(){
            if(this.$size.scrollerHeight===0)return;
            var a=this.$cursorLayer.getPixelPosition(),b=a.left,c=a.top;
            this.scrollTop>c&&this.scrollToY(c),this.scrollTop+this.$size.scrollerHeight<c+this.lineHeight&&this.scrollToY(c+this.lineHeight-this.$size.scrollerHeight);
            var d=this.scroller.scrollLeft;
            d>b&&this.scrollToX(b),d+this.$size.scrollerWidth<b+this.characterWidth&&(b>this.layerConfig.width?this.$desiredScrollLeft=b+2*this.characterWidth:this.scrollToX(Math.round(b+this.characterWidth-this.$size.scrollerWidth)))
            },this.getScrollTop=function(){
            return this.scrollTop
            },this.getScrollLeft=function(){
            return this.scroller.scrollLeft
            },this.getScrollTopRow=function(){
            return this.scrollTop/this.lineHeight
            },this.getScrollBottomRow=function(){
            return Math.max(0,Math.floor((this.scrollTop+this.$size.scrollerHeight)/this.lineHeight)-1)
            },this.scrollToRow=function(a){
            this.scrollToY(a*this.lineHeight)
            },this.scrollToLine=function(a,b){
            var c={
                lineHeight:this.lineHeight
                },d=0;
            for(var e=1;e<a;e++)d+=this.session.getRowHeight(c,e-1);
            b&&(d-=this.$size.scrollerHeight/2),this.scrollToY(d)
            },this.scrollToY=function(a){
            a=Math.max(0,a),this.scrollTop!==a&&(this.$loop.schedule(this.CHANGE_SCROLL),this.scrollTop=a)
            },this.scrollToX=function(a){
            a<=this.$padding&&(a=0),this.scroller.scrollLeft=a
            },this.scrollBy=function(a,b){
            b&&this.scrollToY(this.scrollTop+b),a&&this.scrollToX(this.scroller.scrollLeft+a)
            },this.isScrollableBy=function(a,b){
            if(b<0&&this.scrollTop>0)return!0;
            if(b>0&&this.scrollTop+this.$size.scrollerHeight<this.layerConfig.maxHeight)return!0
                },this.screenToTextCoordinates=function(a,b){
            var c=this.scroller.getBoundingClientRect(),d=Math.round((a+this.scroller.scrollLeft-c.left-this.$padding-e.getPageScrollLeft())/this.characterWidth),f=Math.floor((b+this.scrollTop-c.top-e.getPageScrollTop())/this.lineHeight);
            return this.session.screenToDocumentPosition(f,Math.max(d,0))
            },this.textToScreenCoordinates=function(a,b){
            var c=this.scroller.getBoundingClientRect(),d=this.session.documentToScreenPosition(a,b),e=this.$padding+Math.round(d.column*this.characterWidth),f=d.row*this.lineHeight;
            return{
                pageX:c.left+e-this.getScrollLeft(),
                pageY:c.top+f-this.getScrollTop()
                }
            },this.visualizeFocus=function(){
        e.addCssClass(this.container,"ace_focus")
        },this.visualizeBlur=function(){
        e.removeCssClass(this.container,"ace_focus")
        },this.showComposition=function(a){
        this.$composition||(this.$composition=e.createElement("div"),this.$composition.className="ace_composition",this.content.appendChild(this.$composition)),this.$composition.innerHTML="&#160;";
        var b=this.$cursorLayer.getPixelPosition(),c=this.$composition.style;
        c.top=b.top+"px",c.left=b.left+this.$padding+"px",c.height=this.lineHeight+"px",this.hideCursor()
        },this.setCompositionText=function(a){
        e.setInnerText(this.$composition,a)
        },this.hideComposition=function(){
        this.showCursor();
        if(!this.$composition)return;
        var a=this.$composition.style;
        a.top="-10000px",a.left="-10000px"
        },this.setTheme=function(b){
        function d(a){
            e.importCssString(a.cssText,a.cssClass,c.container.ownerDocument),c.$theme&&e.removeCssClass(c.container,c.$theme),c.$theme=a?a.cssClass:null,c.$theme&&e.addCssClass(c.container,c.$theme),a&&a.isDark?e.addCssClass(c.container,"ace_dark"):e.removeCssClass(c.container,"ace_dark"),c.$size&&(c.$size.width=0,c.onResize())
            }
            var c=this;
        this.$themeValue=b,!b||typeof b=="string"?(b=b||"ace/theme/textmate",a([b],function(a){
            d(a)
            })):d(b)
        },this.getTheme=function(){
        return this.$themeValue
        },this.setStyle=function(a){
        e.addCssClass(this.container,a)
        },this.unsetStyle=function(a){
        e.removeCssClass(this.container,a)
        },this.destroy=function(){
        this.$textLayer.destroy(),this.$cursorLayer.destroy()
        }
    })).call(p.prototype),b.VirtualRenderer=p
}),define("ace/layer/gutter",["require","exports","module","ace/lib/dom"],function(a,b,c){
    var d=a("../lib/dom"),e=function(a){
        this.element=d.createElement("div"),this.element.className="ace_layer ace_gutter-layer",a.appendChild(this.element),this.setShowFoldWidgets(this.$showFoldWidgets),this.$breakpoints=[],this.$annotations=[],this.$decorations=[]
        };
    ((function(){
        this.setSession=function(a){
            this.session=a
            },this.addGutterDecoration=function(a,b){
            this.$decorations[a]||(this.$decorations[a]=""),this.$decorations[a]+=" ace_"+b
            },this.removeGutterDecoration=function(a,b){
            this.$decorations[a]=this.$decorations[a].replace(" ace_"+b,"")
            },this.setBreakpoints=function(a){
            this.$breakpoints=a.concat()
            },this.setAnnotations=function(a){
            this.$annotations=[];
            for(var b in a)if(a.hasOwnProperty(b)){
                var c=a[b];
                if(!c)continue;
                var d=this.$annotations[b]={
                    text:[]
                };
                
                for(var e=0;e<c.length;e++){
                    var f=c[e],g=f.text.replace(/"/g,"&quot;").replace(/'/g,"&#8217;").replace(/</,"&lt;");
                    d.text.indexOf(g)===-1&&d.text.push(g);
                    var h=f.type;
                    h=="error"?d.className="ace_error":h=="warning"&&d.className!="ace_error"?d.className="ace_warning":h=="info"&&!d.className&&(d.className="ace_info")
                    }
                }
            },this.update=function(a){
        this.$config=a;
        var b={
            className:"",
            text:[]
        },c=[],e=a.firstRow,f=a.lastRow,g=this.session.getNextFoldLine(e),h=g?g.start.row:Infinity,i=this.$showFoldWidgets&&this.session.foldWidgets;
        for(;;){
            e>h&&(e=g.end.row+1,g=this.session.getNextFoldLine(e,g),h=g?g.start.row:Infinity);
            if(e>f)break;
            var j=this.$annotations[e]||b;
            c.push("<div class='ace_gutter-cell",this.$decorations[e]||"",this.$breakpoints[e]?" ace_breakpoint ":" ",j.className,"' title='",j.text.join("\n"),"' style='height:",a.lineHeight,"px;'>",e+1);
            if(i){
                var k=i[e];
                k==null&&(k=i[e]=this.session.getFoldWidget(e)),k&&c.push("<span class='ace_fold-widget ",k,k=="start"&&e==h&&e<g.end.row?" closed":" open","'></span>")
                }
                var l=this.session.getRowLength(e)-1;
            while(l--)c.push("</div><div class='ace_gutter-cell' style='height:",a.lineHeight,"px'>¦");
            c.push("</div>"),e++
        }
        this.element=d.setInnerHtml(this.element,c.join("")),this.element.style.height=a.minHeight+"px"
        },this.$showFoldWidgets=!0,this.setShowFoldWidgets=function(a){
        a?d.addCssClass(this.element,"ace_folding-enabled"):d.removeCssClass(this.element,"ace_folding-enabled"),this.$showFoldWidgets=a
        },this.getShowFoldWidgets=function(){
        return this.$showFoldWidgets
        }
    })).call(e.prototype),b.Gutter=e
}),define("ace/layer/marker",["require","exports","module","ace/range","ace/lib/dom"],function(a,b,c){
    var d=a("../range").Range,e=a("../lib/dom"),f=function(a){
        this.element=e.createElement("div"),this.element.className="ace_layer ace_marker-layer",a.appendChild(this.element)
        };
    ((function(){
        this.$padding=0,this.setPadding=function(a){
            this.$padding=a
            },this.setSession=function(a){
            this.session=a
            },this.setMarkers=function(a){
            this.markers=a
            },this.update=function(a){
            var a=a||this.config;
            if(!a)return;
            this.config=a;
            var b=[];
            for(var c in this.markers){
                var d=this.markers[c],f=d.range.clipRows(a.firstRow,a.lastRow);
                if(f.isEmpty())continue;
                f=f.toScreenRange(this.session);
                if(d.renderer){
                    var g=this.$getTop(f.start.row,a),h=Math.round(this.$padding+f.start.column*a.characterWidth);
                    d.renderer(b,f,h,g,a)
                    }else f.isMultiLine()?d.type=="text"?this.drawTextMarker(b,f,d.clazz,a):this.drawMultiLineMarker(b,f,d.clazz,a,d.type):this.drawSingleLineMarker(b,f,d.clazz,a,null,d.type)
                    }
                    this.element=e.setInnerHtml(this.element,b.join(""))
            },this.$getTop=function(a,b){
            return(a-b.firstRowScreen)*b.lineHeight
            },this.drawTextMarker=function(a,b,c,e){
            var f=b.start.row,g=new d(f,b.start.column,f,this.session.getScreenLastRowColumn(f));
            this.drawSingleLineMarker(a,g,c,e,1,"text"),f=b.end.row,g=new d(f,0,f,b.end.column),this.drawSingleLineMarker(a,g,c,e,0,"text");
            for(f=b.start.row+1;f<b.end.row;f++)g.start.row=f,g.end.row=f,g.end.column=this.session.getScreenLastRowColumn(f),this.drawSingleLineMarker(a,g,c,e,1,"text")
                },this.drawMultiLineMarker=function(a,b,c,d,e){
            var f=e==="background"?0:this.$padding,g=d.lineHeight,h=Math.round(d.width-b.start.column*d.characterWidth),i=this.$getTop(b.start.row,d),j=Math.round(f+b.start.column*d.characterWidth);
            a.push("<div class='",c,"' style='","height:",g,"px;","width:",h,"px;","top:",i,"px;","left:",j,"px;'></div>"),i=this.$getTop(b.end.row,d),h=Math.round(b.end.column*d.characterWidth),a.push("<div class='",c,"' style='","height:",g,"px;","width:",h,"px;","top:",i,"px;","left:",f,"px;'></div>"),g=(b.end.row-b.start.row-1)*d.lineHeight;
            if(g<0)return;
            i=this.$getTop(b.start.row+1,d),h=d.width,a.push("<div class='",c,"' style='","height:",g,"px;","width:",h,"px;","top:",i,"px;","left:",f,"px;'></div>")
            },this.drawSingleLineMarker=function(a,b,c,d,e,f){
            var g=f==="background"?0:this.$padding,h=d.lineHeight;
            if(f==="background")var i=d.width;else i=Math.round((b.end.column+(e||0)-b.start.column)*d.characterWidth);
            var j=this.$getTop(b.start.row,d),k=Math.round(g+b.start.column*d.characterWidth);
            a.push("<div class='",c,"' style='","height:",h,"px;","width:",i,"px;","top:",j,"px;","left:",k,"px;'></div>")
            }
        })).call(f.prototype),b.Marker=f
    }),define("ace/layer/text",["require","exports","module","ace/lib/oop","ace/lib/dom","ace/lib/lang","ace/lib/useragent","ace/lib/event_emitter"],function(a,b,c){
    var d=a("../lib/oop"),e=a("../lib/dom"),f=a("../lib/lang"),g=a("../lib/useragent"),h=a("../lib/event_emitter").EventEmitter,i=function(a){
        this.element=e.createElement("div"),this.element.className="ace_layer ace_text-layer",a.appendChild(this.element),this.$characterSize=this.$measureSizes()||{
            width:0,
            height:0
        },this.$pollSizeChanges()
        };
    ((function(){
        d.implement(this,h),this.EOF_CHAR="¶",this.EOL_CHAR="¬",this.TAB_CHAR="→",this.SPACE_CHAR="·",this.$padding=0,this.setPadding=function(a){
            this.$padding=a,this.element.style.padding="0 "+a+"px"
            },this.getLineHeight=function(){
            return this.$characterSize.height||1
            },this.getCharacterWidth=function(){
            return this.$characterSize.width||1
            },this.checkForSizeChanges=function(){
            var a=this.$measureSizes();
            a&&(this.$characterSize.width!==a.width||this.$characterSize.height!==a.height)&&(this.$characterSize=a,this._dispatchEvent("changeCharaterSize",{
                data:a
            }))
            },this.$pollSizeChanges=function(){
            var a=this;
            this.$pollSizeChangesTimer=setInterval(function(){
                a.checkForSizeChanges()
                },500)
            },this.$fontStyles={
            fontFamily:1,
            fontSize:1,
            fontWeight:1,
            fontStyle:1,
            lineHeight:1
        },this.$measureSizes=function(){
            var a=1e3;
            if(!this.$measureNode){
                var b=this.$measureNode=e.createElement("div"),c=b.style;
                c.width=c.height="auto",c.left=c.top=-a*40+"px",c.visibility="hidden",c.position="absolute",c.overflow="visible",c.whiteSpace="nowrap",b.innerHTML=f.stringRepeat("Xy",a);
                if(this.element.ownerDocument.body)this.element.ownerDocument.body.appendChild(b);
                else{
                    var d=this.element.parentNode;
                    while(!e.hasCssClass(d,"ace_editor"))d=d.parentNode;
                    d.appendChild(b)
                    }
                }
            var c=this.$measureNode.style,g=e.computedStyle(this.element);
        for(var h in this.$fontStyles)c[h]=g[h];var i={
            height:this.$measureNode.offsetHeight,
            width:this.$measureNode.offsetWidth/(a*2)
            };
            
        return i.width==0&&i.height==0?null:i
        },this.setSession=function(a){
        this.session=a
        },this.showInvisibles=!1,this.setShowInvisibles=function(a){
        return this.showInvisibles==a?!1:(this.showInvisibles=a,!0)
        },this.$tabStrings=[],this.$computeTabString=function(){
        var a=this.session.getTabSize(),b=this.$tabStrings=[0];
        for(var c=1;c<a+1;c++)this.showInvisibles?b.push("<span class='ace_invisible'>"+this.TAB_CHAR+(new Array(c)).join("&#160;")+"</span>"):b.push((new Array(c+1)).join("&#160;"))
            },this.updateLines=function(a,b,c){
        this.$computeTabString(),(this.config.lastRow!=a.lastRow||this.config.firstRow!=a.firstRow)&&this.scrollLines(a),this.config=a;
        var d=Math.max(b,a.firstRow),f=Math.min(c,a.lastRow),g=this.element.childNodes,h=0;
        for(var i=a.firstRow;i<d;i++){
            var j=this.session.getFoldLine(i);
            if(j){
                if(j.containsRow(d)){
                    d=j.start.row;
                    break
                }
                i=j.end.row
                }
                h++
        }
        for(var k=d;k<=f;k++){
            var l=g[h++];
            if(!l)continue;
            var m=[],n=this.session.getTokens(k,k);
            this.$renderLine(m,k,n[0].tokens,!this.$useLineGroups()),l=e.setInnerHtml(l,m.join("")),k=this.session.getRowFoldEnd(k)
            }
        },this.scrollLines=function(a){
        this.$computeTabString();
        var b=this.config;
        this.config=a;
        if(!b||b.lastRow<a.firstRow)return this.update(a);
        if(a.lastRow<b.firstRow)return this.update(a);
        var c=this.element;
        if(b.firstRow<a.firstRow)for(var d=this.session.getFoldedRowCount(b.firstRow,a.firstRow-1);d>0;d--)c.removeChild(c.firstChild);
        if(b.lastRow>a.lastRow)for(var d=this.session.getFoldedRowCount(a.lastRow+1,b.lastRow);d>0;d--)c.removeChild(c.lastChild);
        if(a.firstRow<b.firstRow){
            var e=this.$renderLinesFragment(a,a.firstRow,b.firstRow-1);
            c.firstChild?c.insertBefore(e,c.firstChild):c.appendChild(e)
            }
            if(a.lastRow>b.lastRow){
            var e=this.$renderLinesFragment(a,b.lastRow+1,a.lastRow);
            c.appendChild(e)
            }
        },this.$renderLinesFragment=function(a,b,c){
        var d=this.element.ownerDocument.createDocumentFragment(),f=b,g=this.session.getNextFoldLine(f),h=g?g.start.row:Infinity;
        for(;;){
            f>h&&(f=g.end.row+1,g=this.session.getNextFoldLine(f,g),h=g?g.start.row:Infinity);
            if(f>c)break;
            var i=e.createElement("div"),j=[],k=this.session.getTokens(f,f);
            k.length==1&&this.$renderLine(j,f,k[0].tokens,!1),i.innerHTML=j.join("");
            if(this.$useLineGroups())i.className="ace_line_group",d.appendChild(i);
            else{
                var l=i.childNodes;
                while(l.length)d.appendChild(l[0])
                    }
                    f++
        }
        return d
        },this.update=function(a){
        this.$computeTabString(),this.config=a;
        var b=[],c=a.firstRow,d=a.lastRow,f=c,g=this.session.getNextFoldLine(f),h=g?g.start.row:Infinity;
        for(;;){
            f>h&&(f=g.end.row+1,g=this.session.getNextFoldLine(f,g),h=g?g.start.row:Infinity);
            if(f>d)break;
            this.$useLineGroups()&&b.push("<div class='ace_line_group'>");
            var i=this.session.getTokens(f,f);
            i.length==1&&this.$renderLine(b,f,i[0].tokens,!1),this.$useLineGroups()&&b.push("</div>"),f++
        }
        this.element=e.setInnerHtml(this.element,b.join(""))
        },this.$textToken={
        text:!0,
        rparen:!0,
        lparen:!0
        },this.$renderToken=function(a,b,c,d){
        var e=this,f=/\t|&|<|( +)|([\v\f \u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000])|[\u1100-\u115F]|[\u11A3-\u11A7]|[\u11FA-\u11FF]|[\u2329-\u232A]|[\u2E80-\u2E99]|[\u2E9B-\u2EF3]|[\u2F00-\u2FD5]|[\u2FF0-\u2FFB]|[\u3000-\u303E]|[\u3041-\u3096]|[\u3099-\u30FF]|[\u3105-\u312D]|[\u3131-\u318E]|[\u3190-\u31BA]|[\u31C0-\u31E3]|[\u31F0-\u321E]|[\u3220-\u3247]|[\u3250-\u32FE]|[\u3300-\u4DBF]|[\u4E00-\uA48C]|[\uA490-\uA4C6]|[\uA960-\uA97C]|[\uAC00-\uD7A3]|[\uD7B0-\uD7C6]|[\uD7CB-\uD7FB]|[\uF900-\uFAFF]|[\uFE10-\uFE19]|[\uFE30-\uFE52]|[\uFE54-\uFE66]|[\uFE68-\uFE6B]|[\uFF01-\uFF60]|[\uFFE0-\uFFE6]/g,h=function(a,c,d,f,h){
            if(a.charCodeAt(0)==32)return(new Array(a.length+1)).join("&#160;");
            if(a=="\t"){
                var i=e.session.getScreenTabSize(b+f);
                return b+=i-1,e.$tabStrings[i]
                }
                if(a=="&")return g.isOldGecko?"&":"&amp;";
            if(a=="<")return"&lt;";
            if(a=="　"){
                var j=e.showInvisibles?"ace_cjk ace_invisible":"ace_cjk",k=e.showInvisibles?e.SPACE_CHAR:"";
                return b+=1,"<span class='"+j+"' style='width:"+e.config.characterWidth*2+"px'>"+k+"</span>"
                }
                if(a.match(/[\v\f \u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]/)){
                if(e.showInvisibles){
                    var k=(new Array(a.length+1)).join(e.SPACE_CHAR);
                    return"<span class='ace_invisible'>"+k+"</span>"
                    }
                    return"&#160;"
                }
                return b+=1,"<span class='ace_cjk' style='width:"+e.config.characterWidth*2+"px'>"+a+"</span>"
            },i=d.replace(f,h);
        if(!this.$textToken[c.type]){
            var j="ace_"+c.type.replace(/\./g," ace_");
            a.push("<span class='",j,"'>",i,"</span>")
            }else a.push(i);
        return b+d.length
        },this.$renderLineCore=function(a,b,c,d,e){
        var f=0,g=0,h,i=this.config.characterWidth,j=0,k=this;
        !d||d.length==0?h=Number.MAX_VALUE:h=d[0],e||a.push("<div class='ace_line' style='height:",this.config.lineHeight,"px","'>");
        for(var l=0;l<c.length;l++){
            var m=c[l],n=m.value;
            if(f+n.length<h)j=k.$renderToken(a,j,m,n),f+=n.length;
            else{
                while(f+n.length>=h)j=k.$renderToken(a,j,m,n.substring(0,h-f)),n=n.substring(h-f),f=h,e||a.push("</div>","<div class='ace_line' style='height:",this.config.lineHeight,"px","'>"),g++,j=0,h=d[g]||Number.MAX_VALUE;
                n.length!=0&&(f+=n.length,j=k.$renderToken(a,j,m,n))
                }
            }
        this.showInvisibles&&(b!==this.session.getLength()-1?a.push("<span class='ace_invisible'>"+this.EOL_CHAR+"</span>"):a.push("<span class='ace_invisible'>"+this.EOF_CHAR+"</span>")),e||a.push("</div>")
    },this.$renderLine=function(a,b,c,d){
    if(!this.session.isRowFolded(b)){
        var e=this.session.getRowSplitData(b);
        this.$renderLineCore(a,b,c,e,d)
        }else this.$renderFoldLine(a,b,c,d)
        },this.$renderFoldLine=function(a,b,c,d){
    function h(a,b,c){
        var d=0,e=0;
        while(e+a[d].value.length<b){
            e+=a[d].value.length,d++;
            if(d==a.length)return
        }
        if(e!=b){
            var f=a[d].value.substring(b-e);
            f.length>c-b&&(f=f.substring(0,c-b)),g.push({
                type:a[d].type,
                value:f
            }),e=b+f.length,d+=1
            }while(e<c){
            var f=a[d].value;
            f.length+e>c&&(f=f.substring(0,c-e)),g.push({
                type:a[d].type,
                value:f
            }),e+=f.length,d+=1
            }
        }
    var e=this.session,f=e.getFoldLine(b),g=[];
    f.walk(function(a,b,d,e,f){
    a?g.push({
        type:"fold",
        value:a
    }):(f&&(c=this.session.getTokens(b,b)[0].tokens),c.length!=0&&h(c,e,d))
    }.bind(this),f.end.row,this.session.getLine(f.end.row).length);
    var i=this.session.$useWrapMode?this.session.$wrapData[b]:null;
    this.$renderLineCore(a,b,g,i,d)
    },this.$useLineGroups=function(){
    return this.session.getUseWrapMode()
    },this.destroy=function(){
    clearInterval(this.$pollSizeChangesTimer),this.$measureNode&&this.$measureNode.parentNode.removeChild(this.$measureNode),delete this.$measureNode
    }
})).call(i.prototype),b.Text=i
}),define("ace/layer/cursor",["require","exports","module","ace/lib/dom"],function(a,b,c){
    var d=a("../lib/dom"),e=function(a){
        this.element=d.createElement("div"),this.element.className="ace_layer ace_cursor-layer",a.appendChild(this.element),this.cursor=d.createElement("div"),this.cursor.className="ace_cursor ace_hidden",this.element.appendChild(this.cursor),this.isVisible=!1
        };
    ((function(){
        this.$padding=0,this.setPadding=function(a){
            this.$padding=a
            },this.setSession=function(a){
            this.session=a
            },this.hideCursor=function(){
            this.isVisible=!1,d.addCssClass(this.cursor,"ace_hidden"),clearInterval(this.blinkId)
            },this.showCursor=function(){
            this.isVisible=!0,d.removeCssClass(this.cursor,"ace_hidden"),this.cursor.style.visibility="visible",this.restartTimer()
            },this.restartTimer=function(){
            clearInterval(this.blinkId);
            if(!this.isVisible)return;
            var a=this.cursor;
            this.blinkId=setInterval(function(){
                a.style.visibility="hidden",setTimeout(function(){
                    a.style.visibility="visible"
                    },400)
                },1e3)
            },this.getPixelPosition=function(a){
            if(!this.config||!this.session)return{
                left:0,
                top:0
            };
            
            var b=this.session.selection.getCursor(),c=this.session.documentToScreenPosition(b),d=Math.round(this.$padding+c.column*this.config.characterWidth),e=(c.row-(a?this.config.firstRowScreen:0))*this.config.lineHeight;
            return{
                left:d,
                top:e
            }
        },this.update=function(a){
        this.config=a,this.pixelPos=this.getPixelPosition(!0),this.cursor.style.left=this.pixelPos.left+"px",this.cursor.style.top=this.pixelPos.top+"px",this.cursor.style.width=a.characterWidth+"px",this.cursor.style.height=a.lineHeight+"px";
        var b=this.session.getOverwrite();
        b!=this.overwrite&&(this.overwrite=b,b?d.addCssClass(this.cursor,"ace_overwrite"):d.removeCssClass(this.cursor,"ace_overwrite")),this.restartTimer()
        },this.destroy=function(){
        clearInterval(this.blinkId)
        }
    })).call(e.prototype),b.Cursor=e
}),define("ace/scrollbar",["require","exports","module","ace/lib/oop","ace/lib/dom","ace/lib/event","ace/lib/event_emitter"],function(a,b,c){
    var d=a("./lib/oop"),e=a("./lib/dom"),f=a("./lib/event"),g=a("./lib/event_emitter").EventEmitter,h=function(a){
        this.element=e.createElement("div"),this.element.className="ace_sb",this.inner=e.createElement("div"),this.element.appendChild(this.inner),a.appendChild(this.element),this.width=e.scrollbarWidth(a.ownerDocument),this.element.style.width=(this.width||15)+5+"px",f.addListener(this.element,"scroll",this.onScroll.bind(this))
        };
    ((function(){
        d.implement(this,g),this.onScroll=function(){
            this._dispatchEvent("scroll",{
                data:this.element.scrollTop
                })
            },this.getWidth=function(){
            return this.width
            },this.setHeight=function(a){
            this.element.style.height=a+"px"
            },this.setInnerHeight=function(a){
            this.inner.style.height=a+"px"
            },this.setScrollTop=function(a){
            this.element.scrollTop=a
            }
        })).call(h.prototype),b.ScrollBar=h
    }),define("ace/renderloop",["require","exports","module","ace/lib/event"],function(a,b,c){
    var d=a("./lib/event"),e=function(a,b){
        this.onRender=a,this.pending=!1,this.changes=0,this.window=b||window
        };
    ((function(){
        this.schedule=function(a){
            this.changes=this.changes|a;
            if(!this.pending){
                this.pending=!0;
                var b=this;
                d.nextTick(function(){
                    b.pending=!1;
                    var a=b.changes;
                    b.changes=0,b.onRender(a)
                    },this.window)
                }
            }
    })).call(e.prototype),b.RenderLoop=e
}),define("text!ace/css/editor.css",[],'@import url(//fonts.googleapis.com/css?family=Droid+Sans+Mono);\n\n\n.ace_editor {\n    position: absolute;\n    overflow: hidden;\n    font-family: \'Monaco\', \'Menlo\', \'Ubuntu Mono\', \'Droid Sans Mono\', \'Courier New\', monospace;\n    font-size: 12px;\n}\n\n.ace_scroller {\n    position: absolute;\n    overflow-x: scroll;\n    overflow-y: hidden;\n}\n\n.ace_content {\n    position: absolute;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    cursor: text;\n}\n\n/* setting pointer-events: auto; on node under the mouse, which changes during scroll,\n  will break mouse wheel scrolling in Safari */\n.ace_content * {\n     pointer-events: none;\n}\n\n.ace_composition {\n    position: absolute;\n    background: #555;\n    color: #DDD;\n    z-index: 4;\n}\n\n.ace_gutter {\n    position: absolute;\n    overflow-x: hidden;\n    overflow-y: hidden;\n    height: 100%;\n    cursor: default;\n}\n\n.ace_gutter-cell.ace_error {\n    background-image: url("data:image/gif,GIF89a%10%00%10%00%D5%00%00%F5or%F5%87%88%F5nr%F4ns%EBmq%F5z%7F%DDJT%DEKS%DFOW%F1Yc%F2ah%CE(7%CE)8%D18E%DD%40M%F2KZ%EBU%60%F4%60m%DCir%C8%16(%C8%19*%CE%255%F1%3FR%F1%3FS%E6%AB%B5%CA%5DI%CEn%5E%F7%A2%9A%C9G%3E%E0a%5B%F7%89%85%F5yy%F6%82%80%ED%82%80%FF%BF%BF%E3%C4%C4%FF%FF%FF%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%25%00%2C%00%00%00%00%10%00%10%00%00%06p%C0%92pH%2C%1A%8F%C8%D2H%93%E1d4%23%E4%88%D3%09mB%1DN%B48%F5%90%40%60%92G%5B%94%20%3E%22%D2%87%24%FA%20%24%C5%06A%00%20%B1%07%02B%A38%89X.v%17%82%11%13q%10%0Fi%24%0F%8B%10%7BD%12%0Ei%09%92%09%0EpD%18%15%24%0A%9Ci%05%0C%18F%18%0B%07%04%01%04%06%A0H%18%12%0D%14%0D%12%A1I%B3%B4%B5IA%00%3B");\n    background-repeat: no-repeat;\n    background-position: 4px center;\n}\n\n.ace_gutter-cell.ace_warning {\n    background-image: url("data:image/gif,GIF89a%10%00%10%00%D5%00%00%FF%DBr%FF%DE%81%FF%E2%8D%FF%E2%8F%FF%E4%96%FF%E3%97%FF%E5%9D%FF%E6%9E%FF%EE%C1%FF%C8Z%FF%CDk%FF%D0s%FF%D4%81%FF%D5%82%FF%D5%83%FF%DC%97%FF%DE%9D%FF%E7%B8%FF%CCl%7BQ%13%80U%15%82W%16%81U%16%89%5B%18%87%5B%18%8C%5E%1A%94d%1D%C5%83-%C9%87%2F%C6%84.%C6%85.%CD%8B2%C9%871%CB%8A3%CD%8B5%DC%98%3F%DF%9BB%E0%9CC%E1%A5U%CB%871%CF%8B5%D1%8D6%DB%97%40%DF%9AB%DD%99B%E3%B0p%E7%CC%AE%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%2F%00%2C%00%00%00%00%10%00%10%00%00%06a%C0%97pH%2C%1A%8FH%A1%ABTr%25%87%2B%04%82%F4%7C%B9X%91%08%CB%99%1C!%26%13%84*iJ9(%15G%CA%84%14%01%1A%97%0C%03%80%3A%9A%3E%81%84%3E%11%08%B1%8B%20%02%12%0F%18%1A%0F%0A%03\'F%1C%04%0B%10%16%18%10%0B%05%1CF%1D-%06%07%9A%9A-%1EG%1B%A0%A1%A0U%A4%A5%A6BA%00%3B");\n    background-repeat: no-repeat;\n    background-position: 4px center;\n}\n\n.ace_editor .ace_sb {\n    position: absolute;\n    overflow-x: hidden;\n    overflow-y: scroll;\n    right: 0;\n}\n\n.ace_editor .ace_sb div {\n    position: absolute;\n    width: 1px;\n    left: 0;\n}\n\n.ace_editor .ace_print_margin_layer {\n    z-index: 0;\n    position: absolute;\n    overflow: hidden;\n    margin: 0;\n    left: 0;\n    height: 100%;\n    width: 100%;\n}\n\n.ace_editor .ace_print_margin {\n    position: absolute;\n    height: 100%;\n}\n\n.ace_editor textarea {\n    position: fixed;\n    z-index: -1;\n    width: 10px;\n    height: 30px;\n    opacity: 0;\n    background: transparent;\n    appearance: none;\n    -moz-appearance: none;\n    border: none;\n    resize: none;\n    outline: none;\n    overflow: hidden;\n}\n\n.ace_layer {\n    z-index: 1;\n    position: absolute;\n    overflow: hidden;\n    white-space: nowrap;\n    height: 100%;\n    width: 100%;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n}\n\n.ace_text-layer {\n    color: black;\n}\n\n.ace_cjk {\n    display: inline-block;\n    text-align: center;\n}\n\n.ace_cursor-layer {\n    z-index: 4;\n}\n\n.ace_cursor {\n    z-index: 4;\n    position: absolute;\n}\n\n.ace_cursor.ace_hidden {\n    opacity: 0.2;\n}\n\n.ace_line {\n    white-space: nowrap;\n}\n\n.ace_marker-layer .ace_step {\n    position: absolute;\n    z-index: 3;\n}\n\n.ace_marker-layer .ace_selection {\n    position: absolute;\n    z-index: 4;\n}\n\n.ace_marker-layer .ace_bracket {\n    position: absolute;\n    z-index: 5;\n}\n\n.ace_marker-layer .ace_active_line {\n    position: absolute;\n    z-index: 2;\n}\n\n.ace_marker-layer .ace_selected_word {\n    position: absolute;\n    z-index: 6;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n}\n\n.ace_line .ace_fold {\n    cursor: pointer;\n    color: darkred;\n    -moz-outline-radius: 4px;\n    outline-radius: 4px;\n    border-radius: 4px;\n    outline: 1px solid #1C00FF;\n    outline-offset: -2px;\n    pointer-events: auto;\n}\n\n.ace_dark .ace_fold {\n    color: #E6E1DC;\n    outline-color: #FC6F09;\n}\n\n.ace_fold:hover{\n    background: gold!important;\n}\n\n.ace_dragging .ace_content {\n    cursor: move;\n}\n\n.ace_folding-enabled .ace_gutter-cell {\n    padding-right: 9px!important;\n}\n\n.ace_fold-widget {\n    margin-right: -9px;\n    display: inline-block;\n    height: 9px;\n    width: 9px;\n    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAbUlEQVQoU2NgoBqIiIibCcRn0tPzbufmlt4uKam+XVXVdLuhoeN2UVHlGSCeCbYsMTHjdlxcSjOyzSB+a2vvbbhYXV2rGsgkoIQvSBBEg0wCiaM4GSQAsg5kAsg6DAUw1SAJkJtwKkBWSFaoAADKrzXSD2pEpgAAAABJRU5ErkJggg==") no-repeat;\n    background-origin: content-box;\n    padding: 1px 0;\n}\n\n.ace_fold-widget.end{\n    transform: scaleY(-1);\n    -moz-transform: scaleY(-1);\n    -webkit-transform: scaleY(-1);\n    opacity:0.8;\n}\n\n.ace_fold-widget.closed{\n    -moz-transform: none;\n    -webkit-transform: none;\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJBAMAAAASvxsjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC1QTFRF////fn6FXl5kXl5kWFhecnJ5WFhecnJ5YWFoZ2dubW11dHR7enqCgICIhYWNjO3uwQAAAA90Uk5TACZNg5mZzMzb29vb29vbP7t0EwAAACtJREFUCFtjYAhgAIE6ARB5+SKIPKAD4mxg3ggkF2iB2JMngsQzwGocgBgA2zEHmb0961QAAAAASUVORK5CYII=");\n}\n\n.ace_fold-widget:hover {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAASklEQVQoU2NgoBqQWHFlJhD/lzny/TY6BomD5MGWgSQPvPj5H4bXP4GwQeJw1wA5augKoaaqoTgZWSFWBTDVMIUgGq+nCSrApRsAuCZYT+KbmI0AAAAASUVORK5CYII=");\n}\n\n.ace_fold-widget.closed:hover {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJBAMAAAASvxsjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABVQTFRF////HMT3GKjUHMT3GKjUr+T5wOj5rFcpYAAAAAR0Uk5TACaZ2z7RZscAAAAkSURBVAhbY2BQYAABZwEQaWYIIk2TQRyzNBDHDMI2RKgBqQcAaNgD0/oixWYAAAAASUVORK5CYII=");\n}\n\n'),define("ace/theme/textmate",["require","exports","module","ace/lib/dom"],function(a,b,c){
    b.isDark=!1,b.cssClass="ace-tm",b.cssText=".ace-tm .ace_editor {  border: 2px solid rgb(159, 159, 159);}.ace-tm .ace_editor.ace_focus {  border: 2px solid #327fbd;}.ace-tm .ace_gutter {  width: 50px;  background: #e8e8e8;  color: #333;  overflow : hidden;}.ace-tm .ace_gutter-layer {  width: 100%;  text-align: right;}.ace-tm .ace_gutter-layer .ace_gutter-cell {  padding-right: 6px;}.ace-tm .ace_print_margin {  width: 1px;  background: #e8e8e8;}.ace-tm .ace_text-layer {  cursor: text;}.ace-tm .ace_cursor {  border-left: 2px solid black;}.ace-tm .ace_cursor.ace_overwrite {  border-left: 0px;  border-bottom: 1px solid black;}        .ace-tm .ace_line .ace_invisible {  color: rgb(191, 191, 191);}.ace-tm .ace_line .ace_keyword {  color: blue;}.ace-tm .ace_line .ace_constant.ace_buildin {  color: rgb(88, 72, 246);}.ace-tm .ace_line .ace_constant.ace_language {  color: rgb(88, 92, 246);}.ace-tm .ace_line .ace_constant.ace_library {  color: rgb(6, 150, 14);}.ace-tm .ace_line .ace_invalid {  background-color: rgb(153, 0, 0);  color: white;}.ace-tm .ace_line .ace_fold {    outline-color: #1C00FF;}.ace-tm .ace_line .ace_support.ace_function {  color: rgb(60, 76, 114);}.ace-tm .ace_line .ace_support.ace_constant {  color: rgb(6, 150, 14);}.ace-tm .ace_line .ace_support.ace_type,.ace-tm .ace_line .ace_support.ace_class {  color: rgb(109, 121, 222);}.ace-tm .ace_line .ace_keyword.ace_operator {  color: rgb(104, 118, 135);}.ace-tm .ace_line .ace_string {  color: rgb(3, 106, 7);}.ace-tm .ace_line .ace_comment {  color: rgb(76, 136, 107);}.ace-tm .ace_line .ace_comment.ace_doc {  color: rgb(0, 102, 255);}.ace-tm .ace_line .ace_comment.ace_doc.ace_tag {  color: rgb(128, 159, 191);}.ace-tm .ace_line .ace_constant.ace_numeric {  color: rgb(0, 0, 205);}.ace-tm .ace_line .ace_variable {  color: rgb(49, 132, 149);}.ace-tm .ace_line .ace_xml_pe {  color: rgb(104, 104, 91);}.ace-tm .ace_entity.ace_name.ace_function {  color: #0000A2;}.ace-tm .ace_markup.ace_markupine {    text-decoration:underline;}.ace-tm .ace_markup.ace_heading {  color: rgb(12, 7, 255);}.ace-tm .ace_markup.ace_list {  color:rgb(185, 6, 144);}.ace-tm .ace_marker-layer .ace_selection {  background: rgb(181, 213, 255);}.ace-tm .ace_marker-layer .ace_step {  background: rgb(252, 255, 0);}.ace-tm .ace_marker-layer .ace_stack {  background: rgb(164, 229, 101);}.ace-tm .ace_marker-layer .ace_bracket {  margin: -1px 0 0 -1px;  border: 1px solid rgb(192, 192, 192);}.ace-tm .ace_marker-layer .ace_active_line {  background: rgba(0, 0, 0, 0.07);}.ace-tm .ace_marker-layer .ace_selected_word {  background: rgb(250, 250, 255);  border: 1px solid rgb(200, 200, 250);}.ace-tm .ace_meta.ace_tag {  color:rgb(28, 2, 255);}.ace-tm .ace_string.ace_regex {  color: rgb(255, 0, 0)}";
    var d=a("../lib/dom");
    d.importCssString(b.cssText)
    }),define("text!ace/css/editor.css",[],'@import url(//fonts.googleapis.com/css?family=Droid+Sans+Mono);\n\n\n.ace_editor {\n    position: absolute;\n    overflow: hidden;\n    font-family: \'Monaco\', \'Menlo\', \'Ubuntu Mono\', \'Droid Sans Mono\', \'Courier New\', monospace;\n    font-size: 12px;\n}\n\n.ace_scroller {\n    position: absolute;\n    overflow-x: scroll;\n    overflow-y: hidden;\n}\n\n.ace_content {\n    position: absolute;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    cursor: text;\n}\n\n/* setting pointer-events: auto; on node under the mouse, which changes during scroll,\n  will break mouse wheel scrolling in Safari */\n.ace_content * {\n     pointer-events: none;\n}\n\n.ace_composition {\n    position: absolute;\n    background: #555;\n    color: #DDD;\n    z-index: 4;\n}\n\n.ace_gutter {\n    position: absolute;\n    overflow-x: hidden;\n    overflow-y: hidden;\n    height: 100%;\n    cursor: default;\n}\n\n.ace_gutter-cell.ace_error {\n    background-image: url("data:image/gif,GIF89a%10%00%10%00%D5%00%00%F5or%F5%87%88%F5nr%F4ns%EBmq%F5z%7F%DDJT%DEKS%DFOW%F1Yc%F2ah%CE(7%CE)8%D18E%DD%40M%F2KZ%EBU%60%F4%60m%DCir%C8%16(%C8%19*%CE%255%F1%3FR%F1%3FS%E6%AB%B5%CA%5DI%CEn%5E%F7%A2%9A%C9G%3E%E0a%5B%F7%89%85%F5yy%F6%82%80%ED%82%80%FF%BF%BF%E3%C4%C4%FF%FF%FF%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%25%00%2C%00%00%00%00%10%00%10%00%00%06p%C0%92pH%2C%1A%8F%C8%D2H%93%E1d4%23%E4%88%D3%09mB%1DN%B48%F5%90%40%60%92G%5B%94%20%3E%22%D2%87%24%FA%20%24%C5%06A%00%20%B1%07%02B%A38%89X.v%17%82%11%13q%10%0Fi%24%0F%8B%10%7BD%12%0Ei%09%92%09%0EpD%18%15%24%0A%9Ci%05%0C%18F%18%0B%07%04%01%04%06%A0H%18%12%0D%14%0D%12%A1I%B3%B4%B5IA%00%3B");\n    background-repeat: no-repeat;\n    background-position: 4px center;\n}\n\n.ace_gutter-cell.ace_warning {\n    background-image: url("data:image/gif,GIF89a%10%00%10%00%D5%00%00%FF%DBr%FF%DE%81%FF%E2%8D%FF%E2%8F%FF%E4%96%FF%E3%97%FF%E5%9D%FF%E6%9E%FF%EE%C1%FF%C8Z%FF%CDk%FF%D0s%FF%D4%81%FF%D5%82%FF%D5%83%FF%DC%97%FF%DE%9D%FF%E7%B8%FF%CCl%7BQ%13%80U%15%82W%16%81U%16%89%5B%18%87%5B%18%8C%5E%1A%94d%1D%C5%83-%C9%87%2F%C6%84.%C6%85.%CD%8B2%C9%871%CB%8A3%CD%8B5%DC%98%3F%DF%9BB%E0%9CC%E1%A5U%CB%871%CF%8B5%D1%8D6%DB%97%40%DF%9AB%DD%99B%E3%B0p%E7%CC%AE%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%2F%00%2C%00%00%00%00%10%00%10%00%00%06a%C0%97pH%2C%1A%8FH%A1%ABTr%25%87%2B%04%82%F4%7C%B9X%91%08%CB%99%1C!%26%13%84*iJ9(%15G%CA%84%14%01%1A%97%0C%03%80%3A%9A%3E%81%84%3E%11%08%B1%8B%20%02%12%0F%18%1A%0F%0A%03\'F%1C%04%0B%10%16%18%10%0B%05%1CF%1D-%06%07%9A%9A-%1EG%1B%A0%A1%A0U%A4%A5%A6BA%00%3B");\n    background-repeat: no-repeat;\n    background-position: 4px center;\n}\n\n.ace_editor .ace_sb {\n    position: absolute;\n    overflow-x: hidden;\n    overflow-y: scroll;\n    right: 0;\n}\n\n.ace_editor .ace_sb div {\n    position: absolute;\n    width: 1px;\n    left: 0;\n}\n\n.ace_editor .ace_print_margin_layer {\n    z-index: 0;\n    position: absolute;\n    overflow: hidden;\n    margin: 0;\n    left: 0;\n    height: 100%;\n    width: 100%;\n}\n\n.ace_editor .ace_print_margin {\n    position: absolute;\n    height: 100%;\n}\n\n.ace_editor textarea {\n    position: fixed;\n    z-index: -1;\n    width: 10px;\n    height: 30px;\n    opacity: 0;\n    background: transparent;\n    appearance: none;\n    -moz-appearance: none;\n    border: none;\n    resize: none;\n    outline: none;\n    overflow: hidden;\n}\n\n.ace_layer {\n    z-index: 1;\n    position: absolute;\n    overflow: hidden;\n    white-space: nowrap;\n    height: 100%;\n    width: 100%;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n}\n\n.ace_text-layer {\n    color: black;\n}\n\n.ace_cjk {\n    display: inline-block;\n    text-align: center;\n}\n\n.ace_cursor-layer {\n    z-index: 4;\n}\n\n.ace_cursor {\n    z-index: 4;\n    position: absolute;\n}\n\n.ace_cursor.ace_hidden {\n    opacity: 0.2;\n}\n\n.ace_line {\n    white-space: nowrap;\n}\n\n.ace_marker-layer .ace_step {\n    position: absolute;\n    z-index: 3;\n}\n\n.ace_marker-layer .ace_selection {\n    position: absolute;\n    z-index: 4;\n}\n\n.ace_marker-layer .ace_bracket {\n    position: absolute;\n    z-index: 5;\n}\n\n.ace_marker-layer .ace_active_line {\n    position: absolute;\n    z-index: 2;\n}\n\n.ace_marker-layer .ace_selected_word {\n    position: absolute;\n    z-index: 6;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n}\n\n.ace_line .ace_fold {\n    cursor: pointer;\n    color: darkred;\n    -moz-outline-radius: 4px;\n    outline-radius: 4px;\n    border-radius: 4px;\n    outline: 1px solid #1C00FF;\n    outline-offset: -2px;\n    pointer-events: auto;\n}\n\n.ace_dark .ace_fold {\n    color: #E6E1DC;\n    outline-color: #FC6F09;\n}\n\n.ace_fold:hover{\n    background: gold!important;\n}\n\n.ace_dragging .ace_content {\n    cursor: move;\n}\n\n.ace_folding-enabled .ace_gutter-cell {\n    padding-right: 9px!important;\n}\n\n.ace_fold-widget {\n    margin-right: -9px;\n    display: inline-block;\n    height: 9px;\n    width: 9px;\n    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAbUlEQVQoU2NgoBqIiIibCcRn0tPzbufmlt4uKam+XVXVdLuhoeN2UVHlGSCeCbYsMTHjdlxcSjOyzSB+a2vvbbhYXV2rGsgkoIQvSBBEg0wCiaM4GSQAsg5kAsg6DAUw1SAJkJtwKkBWSFaoAADKrzXSD2pEpgAAAABJRU5ErkJggg==") no-repeat;\n    background-origin: content-box;\n    padding: 1px 0;\n}\n\n.ace_fold-widget.end{\n    transform: scaleY(-1);\n    -moz-transform: scaleY(-1);\n    -webkit-transform: scaleY(-1);\n    opacity:0.8;\n}\n\n.ace_fold-widget.closed{\n    -moz-transform: none;\n    -webkit-transform: none;\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJBAMAAAASvxsjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC1QTFRF////fn6FXl5kXl5kWFhecnJ5WFhecnJ5YWFoZ2dubW11dHR7enqCgICIhYWNjO3uwQAAAA90Uk5TACZNg5mZzMzb29vb29vbP7t0EwAAACtJREFUCFtjYAhgAIE6ARB5+SKIPKAD4mxg3ggkF2iB2JMngsQzwGocgBgA2zEHmb0961QAAAAASUVORK5CYII=");\n}\n\n.ace_fold-widget:hover {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAASklEQVQoU2NgoBqQWHFlJhD/lzny/TY6BomD5MGWgSQPvPj5H4bXP4GwQeJw1wA5augKoaaqoTgZWSFWBTDVMIUgGq+nCSrApRsAuCZYT+KbmI0AAAAASUVORK5CYII=");\n}\n\n.ace_fold-widget.closed:hover {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJBAMAAAASvxsjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABVQTFRF////HMT3GKjUHMT3GKjUr+T5wOj5rFcpYAAAAAR0Uk5TACaZ2z7RZscAAAAkSURBVAhbY2BQYAABZwEQaWYIIk2TQRyzNBDHDMI2RKgBqQcAaNgD0/oixWYAAAAASUVORK5CYII=");\n}\n\n'),define("text!ace/ext/static.css",[],".ace_editor {\n   font-family: 'Monaco', 'Menlo', 'Droid Sans Mono', 'Courier New', monospace;\n   font-size: 12px;\n}\n\n.ace_editor .ace_gutter { \n    width: 25px !important;\n    display: block;\n    float: left;\n    text-align: right; \n    padding: 0 3px 0 0; \n    margin-right: 3px;\n}\n\n.ace-row { clear: both; }\n\n*.ace_gutter-cell {\n  -moz-user-select: -moz-none;\n  -khtml-user-select: none;\n  -webkit-user-select: none;\n  user-select: none;\n}"),define("text!kitchen-sink/docs/css.css",[],'.text-layer {\n    font-family: Monaco, "Courier New", monospace;\n    font-size: 12px;\n    cursor: text;\n}'),define("text!kitchen-sink/styles.css",[],"html {\n    height: 100%;\n    width: 100%;\n    overflow: hidden;\n}\n\nbody {\n    overflow: hidden;\n    margin: 0;\n    padding: 0;\n    height: 100%;\n    width: 100%;\n    font-family: Arial, Helvetica, sans-serif, Tahoma, Verdana, sans-serif;\n    font-size: 12px;\n    background: rgb(14, 98, 165);\n    color: white;\n}\n\n#logo {\n    padding: 15px;\n    margin-left: 70px;\n}\n\n#editor {\n    position: absolute;\n    top:  0px;\n    left: 300px;\n    bottom: 0px;\n    right: 0px;\n    background: white;\n}\n\n#controls {\n    padding: 5px;\n}\n\n#controls td {\n    text-align: right;\n}\n\n#controls td + td {\n    text-align: left;\n}"),require(["ace/ace"],function(a){
    window.ace=a
    })