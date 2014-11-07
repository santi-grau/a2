function ONECOLOR(e){if(Object.prototype.toString.apply(e)==="[object Array]"){if(typeof e[0]=="string"&&typeof ONECOLOR[e[0]]=="function")return new ONECOLOR[e[0]](e.slice(1,e.length));if(e.length===4)return new ONECOLOR.RGB(e[0]/255,e[1]/255,e[2]/255,e[3]/255)}else if(typeof e=="string"){var t=e.toLowerCase();namedColors[t]&&(e="#"+namedColors[t]),t==="transparent"&&(e="rgba(0,0,0,0)");var n=e.match(cssColorRegExp);if(n){var r=n[1].toUpperCase(),i=undef(n[8])?n[8]:parseFloat(n[8]),s=r[0]==="H",o=n[3]?100:s?360:255,u=n[5]||s?100:255,a=n[7]||s?100:255;if(undef(ONECOLOR[r]))throw new Error("one.color."+r+" is not installed.");return new ONECOLOR[r](parseFloat(n[2])/o,parseFloat(n[4])/u,parseFloat(n[6])/a,i)}e.length<6&&(e=e.replace(/^#?([0-9a-f])([0-9a-f])([0-9a-f])$/i,"$1$1$2$2$3$3"));var f=e.match(/^#?([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])$/i);if(f)return new ONECOLOR.RGB(parseInt(f[1],16)/255,parseInt(f[2],16)/255,parseInt(f[3],16)/255)}else if(typeof e=="object"&&e.isColor)return e;return!1}function installColorSpace(e,t,n){function o(e,t){var n={};n[t.toLowerCase()]=new Function("return this.rgb()."+t.toLowerCase()+"();"),ONECOLOR[t].propertyNames.forEach(function(e,r){n[e]=n[e==="black"?"k":e[0]]=new Function("value","isDelta","return this."+t.toLowerCase()+"()."+e+"(value, isDelta);")});for(var r in n)n.hasOwnProperty(r)&&ONECOLOR[e].prototype[r]===undefined&&(ONECOLOR[e].prototype[r]=n[r])}ONECOLOR[e]=new Function(t.join(","),"if (Object.prototype.toString.apply("+t[0]+") === '[object Array]') {"+t.map(function(e,n){return e+"="+t[0]+"["+n+"];"}).reverse().join("")+"}"+"if ("+t.filter(function(e){return e!=="alpha"}).map(function(e){return"isNaN("+e+")"}).join("||")+"){"+'throw new Error("['+e+']: Invalid color: ("+'+t.join('+","+')+'+")");}'+t.map(function(e){return e==="hue"?"this._hue=hue<0?hue-Math.floor(hue):hue%1":e==="alpha"?"this._alpha=(isNaN(alpha)||alpha>1)?1:(alpha<0?0:alpha);":"this._"+e+"="+e+"<0?0:("+e+">1?1:"+e+")"}).join(";")+";"),ONECOLOR[e].propertyNames=t;var r=ONECOLOR[e].prototype;["valueOf","hex","hexa","css","cssa"].forEach(function(t){r[t]=r[t]||(e==="RGB"?r.hex:new Function("return this.rgb()."+t+"();"))}),r.isColor=!0,r.equals=function(n,r){undef(r)&&(r=1e-10),n=n[e.toLowerCase()]();for(var i=0;i<t.length;i+=1)if(Math.abs(this["_"+t[i]]-n["_"+t[i]])>r)return!1;return!0},r.toJSON=new Function("return ['"+e+"', "+t.map(function(e){return"this._"+e},this).join(", ")+"];");for(var i in n)if(n.hasOwnProperty(i)){var s=i.match(/^from(.*)$/);s?ONECOLOR[s[1].toUpperCase()].prototype[e.toLowerCase()]=n[i]:r[i]=n[i]}r[e.toLowerCase()]=function(){return this},r.toString=new Function('return "[one.color.'+e+':"+'+t.map(function(e,n){return'" '+t[n]+'="+this._'+e}).join("+")+'+"]";'),t.forEach(function(e,n){r[e]=r[e==="black"?"k":e[0]]=new Function("value","isDelta","if (typeof value === 'undefined') {return this._"+e+";"+"}"+"if (isDelta) {"+"return new this.constructor("+t.map(function(t,n){return"this._"+t+(e===t?"+value":"")}).join(", ")+");"+"}"+"return new this.constructor("+t.map(function(t,n){return e===t?"value":"this._"+t}).join(", ")+");")}),installedColorSpaces.forEach(function(t){o(e,t),o(t,e)}),installedColorSpaces.push(e)}var installedColorSpaces=[],namedColors={},undef=function(e){return typeof e=="undefined"},channelRegExp=/\s*(\.\d+|\d+(?:\.\d+)?)(%)?\s*/,alphaChannelRegExp=/\s*(\.\d+|\d+(?:\.\d+)?)\s*/,cssColorRegExp=new RegExp("^(rgb|hsl|hsv)a?\\("+channelRegExp.source+","+channelRegExp.source+","+channelRegExp.source+"(?:,"+alphaChannelRegExp.source+")?"+"\\)$","i");ONECOLOR.installMethod=function(e,t){installedColorSpaces.forEach(function(n){ONECOLOR[n].prototype[e]=t})},installColorSpace("RGB",["red","green","blue","alpha"],{hex:function(){var e=(Math.round(255*this._red)*65536+Math.round(255*this._green)*256+Math.round(255*this._blue)).toString(16);return"#"+"00000".substr(0,6-e.length)+e},hexa:function(){var e=Math.round(this._alpha*255).toString(16);return"#"+"00".substr(0,2-e.length)+e+this.hex().substr(1,6)},css:function(){return"rgb("+Math.round(255*this._red)+","+Math.round(255*this._green)+","+Math.round(255*this._blue)+")"},cssa:function(){return"rgba("+Math.round(255*this._red)+","+Math.round(255*this._green)+","+Math.round(255*this._blue)+","+this._alpha+")"}}),typeof define=="function"&&!undef(define.amd)?define([],function(){return ONECOLOR}):typeof exports=="object"?module.exports=ONECOLOR:(one=window.one||{},one.color=ONECOLOR),typeof jQuery!="undefined"&&undef(jQuery.color)&&(jQuery.color=ONECOLOR),installColorSpace("HSV",["hue","saturation","value","alpha"],{rgb:function(){var e=this._hue,t=this._saturation,n=this._value,r=Math.min(5,Math.floor(e*6)),i=e*6-r,s=n*(1-t),o=n*(1-i*t),u=n*(1-(1-i)*t),a,f,l;switch(r){case 0:a=n,f=u,l=s;break;case 1:a=o,f=n,l=s;break;case 2:a=s,f=n,l=u;break;case 3:a=s,f=o,l=n;break;case 4:a=u,f=s,l=n;break;case 5:a=n,f=s,l=o}return new ONECOLOR.RGB(a,f,l,this._alpha)},hsl:function(){var e=(2-this._saturation)*this._value,t=this._saturation*this._value,n=e<=1?e:2-e,r;return n<1e-9?r=0:r=t/n,new ONECOLOR.HSL(this._hue,r,e/2,this._alpha)},fromRgb:function(){var e=this._red,t=this._green,n=this._blue,r=Math.max(e,t,n),i=Math.min(e,t,n),s=r-i,o,u=r===0?0:s/r,a=r;if(s===0)o=0;else switch(r){case e:o=(t-n)/s/6+(t<n?1:0);break;case t:o=(n-e)/s/6+1/3;break;case n:o=(e-t)/s/6+2/3}return new ONECOLOR.HSV(o,u,a,this._alpha)}}),installColorSpace("HSL",["hue","saturation","lightness","alpha"],{hsv:function(){var e=this._lightness*2,t=this._saturation*(e<=1?e:2-e),n;return e+t<1e-9?n=0:n=2*t/(e+t),new ONECOLOR.HSV(this._hue,n,(e+t)/2,this._alpha)},rgb:function(){return this.hsv().rgb()},fromRgb:function(){return this.hsv().hsl()}});