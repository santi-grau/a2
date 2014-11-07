(function(e,t,n,r,i,s){function o(n){if(Object.prototype.toString.apply(n)==="[object Array]"){if(typeof n[0]=="string"&&typeof o[n[0]]=="function")return new o[n[0]](n.slice(1,n.length));if(n.length===4)return new o.RGB(n[0]/255,n[1]/255,n[2]/255,n[3]/255)}else if(typeof n=="string"){var r=n.toLowerCase();f[r]&&(n="#"+f[r]),r==="transparent"&&(n="rgba(0,0,0,0)");var i=n.match(p);if(i){var s=i[1].toUpperCase(),u=l(i[8])?i[8]:e(i[8]),a=s[0]==="H",c=i[3]?100:a?360:255,h=i[5]||a?100:255,d=i[7]||a?100:255;if(l(o[s]))throw new Error("one.color."+s+" is not installed.");return new o[s](e(i[2])/c,e(i[4])/h,e(i[6])/d,u)}n.length<6&&(n=n.replace(/^#?([0-9a-f])([0-9a-f])([0-9a-f])$/i,"$1$1$2$2$3$3"));var v=n.match(/^#?([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])$/i);if(v)return new o.RGB(t(v[1],16)/255,t(v[2],16)/255,t(v[3],16)/255)}else if(typeof n=="object"&&n.isColor)return n;return!1}function u(e,t,i){function s(e,t){var r={};r[t.toLowerCase()]=new n("return this.rgb()."+t.toLowerCase()+"();"),o[t].propertyNames.forEach(function(e,i){r[e]=r[e==="black"?"k":e[0]]=new n("value","isDelta","return this."+t.toLowerCase()+"()."+e+"(value, isDelta);")});for(var i in r)r.hasOwnProperty(i)&&o[e].prototype[i]===undefined&&(o[e].prototype[i]=r[i])}o[e]=new n(t.join(","),"if (Object.prototype.toString.apply("+t[0]+") === '[object Array]') {"+t.map(function(e,n){return e+"="+t[0]+"["+n+"];"}).reverse().join("")+"}"+"if ("+t.filter(function(e){return e!=="alpha"}).map(function(e){return"isNaN("+e+")"}).join("||")+"){"+'throw new Error("['+e+']: Invalid color: ("+'+t.join('+","+')+'+")");}'+t.map(function(e){return e==="hue"?"this._hue=hue<0?hue-Math.floor(hue):hue%1":e==="alpha"?"this._alpha=(isNaN(alpha)||alpha>1)?1:(alpha<0?0:alpha);":"this._"+e+"="+e+"<0?0:("+e+">1?1:"+e+")"}).join(";")+";"),o[e].propertyNames=t;var u=o[e].prototype;["valueOf","hex","hexa","css","cssa"].forEach(function(t){u[t]=u[t]||(e==="RGB"?u.hex:new n("return this.rgb()."+t+"();"))}),u.isColor=!0,u.equals=function(n,i){l(i)&&(i=1e-10),n=n[e.toLowerCase()]();for(var s=0;s<t.length;s+=1)if(r.abs(this["_"+t[s]]-n["_"+t[s]])>i)return!1;return!0},u.toJSON=new n("return ['"+e+"', "+t.map(function(e){return"this._"+e},this).join(", ")+"];");for(var f in i)if(i.hasOwnProperty(f)){var c=f.match(/^from(.*)$/);c?o[c[1].toUpperCase()].prototype[e.toLowerCase()]=i[f]:u[f]=i[f]}u[e.toLowerCase()]=function(){return this},u.toString=new n('return "[one.color.'+e+':"+'+t.map(function(e,n){return'" '+t[n]+'="+this._'+e}).join("+")+'+"]";'),t.forEach(function(e,r){u[e]=u[e==="black"?"k":e[0]]=new n("value","isDelta","if (typeof value === 'undefined') {return this._"+e+";"+"}"+"if (isDelta) {"+"return new this.constructor("+t.map(function(t,n){return"this._"+t+(e===t?"+value":"")}).join(", ")+");"+"}"+"return new this.constructor("+t.map(function(t,n){return e===t?"value":"this._"+t}).join(", ")+");")}),a.forEach(function(t){s(e,t),s(t,e)}),a.push(e)}var a=[],f={},l=function(e){return typeof e=="undefined"},c=/\s*(\.\d+|\d+(?:\.\d+)?)(%)?\s*/,h=/\s*(\.\d+|\d+(?:\.\d+)?)\s*/,p=new RegExp("^(rgb|hsl|hsv)a?\\("+c.source+","+c.source+","+c.source+"(?:,"+h.source+")?"+"\\)$","i");o.installMethod=function(e,t){a.forEach(function(n){o[n].prototype[e]=t})},u("RGB",["red","green","blue","alpha"],{hex:function(){var e=(i(255*this._red)*65536+i(255*this._green)*256+i(255*this._blue)).toString(16);return"#"+"00000".substr(0,6-e.length)+e},hexa:function(){var e=i(this._alpha*255).toString(16);return"#"+"00".substr(0,2-e.length)+e+this.hex().substr(1,6)},css:function(){return"rgb("+i(255*this._red)+","+i(255*this._green)+","+i(255*this._blue)+")"},cssa:function(){return"rgba("+i(255*this._red)+","+i(255*this._green)+","+i(255*this._blue)+","+this._alpha+")"}}),typeof define=="function"&&!l(define.amd)?define([],function(){return o}):typeof exports=="object"?module.exports=o:(one=window.one||{},one.color=o),typeof jQuery!="undefined"&&l(jQuery.color)&&(jQuery.color=o),u("HSV",["hue","saturation","value","alpha"],{rgb:function(){var e=this._hue,t=this._saturation,n=this._value,i=s(5,r.floor(e*6)),u=e*6-i,a=n*(1-t),f=n*(1-u*t),l=n*(1-(1-u)*t),c,h,p;switch(i){case 0:c=n,h=l,p=a;break;case 1:c=f,h=n,p=a;break;case 2:c=a,h=n,p=l;break;case 3:c=a,h=f,p=n;break;case 4:c=l,h=a,p=n;break;case 5:c=n,h=a,p=f}return new o.RGB(c,h,p,this._alpha)},hsl:function(){var e=(2-this._saturation)*this._value,t=this._saturation*this._value,n=e<=1?e:2-e,r;return n<1e-9?r=0:r=t/n,new o.HSL(this._hue,r,e/2,this._alpha)},fromRgb:function(){var e=this._red,t=this._green,n=this._blue,i=r.max(e,t,n),u=s(e,t,n),a=i-u,f,l=i===0?0:a/i,c=i;if(a===0)f=0;else switch(i){case e:f=(t-n)/a/6+(t<n?1:0);break;case t:f=(n-e)/a/6+1/3;break;case n:f=(e-t)/a/6+2/3}return new o.HSV(f,l,c,this._alpha)}}),u("HSL",["hue","saturation","lightness","alpha"],{hsv:function(){var e=this._lightness*2,t=this._saturation*(e<=1?e:2-e),n;return e+t<1e-9?n=0:n=2*t/(e+t),new o.HSV(this._hue,n,(e+t)/2,this._alpha)},rgb:function(){return this.hsv().rgb()},fromRgb:function(){return this.hsv().hsl()}})})(parseFloat,parseInt,Function,Math,Math.round,Math.min);