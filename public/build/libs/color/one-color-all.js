(function(e,t,n,r,i,s,o,u){function a(e){if(Object.prototype.toString.apply(e)==="[object Array]"){if(typeof e[0]=="string"&&typeof a[e[0]]=="function")return new a[e[0]](e.slice(1,e.length));if(e.length===4)return new a.RGB(e[0]/255,e[1]/255,e[2]/255,e[3]/255)}else if(typeof e=="string"){var r=e.toLowerCase();h[r]&&(e="#"+h[r]),r==="transparent"&&(e="rgba(0,0,0,0)");var i=e.match(m);if(i){var s=i[1].toUpperCase(),o=p(i[8])?i[8]:t(i[8]),u=s[0]==="H",f=i[3]?100:u?360:255,l=i[5]||u?100:255,c=i[7]||u?100:255;if(p(a[s]))throw new Error("one.color."+s+" is not installed.");return new a[s](t(i[2])/f,t(i[4])/l,t(i[6])/c,o)}e.length<6&&(e=e.replace(/^#?([0-9a-f])([0-9a-f])([0-9a-f])$/i,"$1$1$2$2$3$3"));var d=e.match(/^#?([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])$/i);if(d)return new a.RGB(n(d[1],16)/255,n(d[2],16)/255,n(d[3],16)/255)}else if(typeof e=="object"&&e.isColor)return e;return!1}function f(t,n,i){function s(e,t){var n={};n[t.toLowerCase()]=new r("return this.rgb()."+t.toLowerCase()+"();"),a[t].propertyNames.forEach(function(e,i){n[e]=n[e==="black"?"k":e[0]]=new r("value","isDelta","return this."+t.toLowerCase()+"()."+e+"(value, isDelta);")});for(var i in n)n.hasOwnProperty(i)&&a[e].prototype[i]===undefined&&(a[e].prototype[i]=n[i])}a[t]=new r(n.join(","),"if (Object.prototype.toString.apply("+n[0]+") === '[object Array]') {"+n.map(function(e,t){return e+"="+n[0]+"["+t+"];"}).reverse().join("")+"}"+"if ("+n.filter(function(e){return e!=="alpha"}).map(function(e){return"isNaN("+e+")"}).join("||")+"){"+'throw new Error("['+t+']: Invalid color: ("+'+n.join('+","+')+'+")");}'+n.map(function(e){return e==="hue"?"this._hue=hue<0?hue-Math.floor(hue):hue%1":e==="alpha"?"this._alpha=(isNaN(alpha)||alpha>1)?1:(alpha<0?0:alpha);":"this._"+e+"="+e+"<0?0:("+e+">1?1:"+e+")"}).join(";")+";"),a[t].propertyNames=n;var o=a[t].prototype;["valueOf","hex","hexa","css","cssa"].forEach(function(e){o[e]=o[e]||(t==="RGB"?o.hex:new r("return this.rgb()."+e+"();"))}),o.isColor=!0,o.equals=function(r,i){p(i)&&(i=1e-10),r=r[t.toLowerCase()]();for(var s=0;s<n.length;s+=1)if(e.abs(this["_"+n[s]]-r["_"+n[s]])>i)return!1;return!0},o.toJSON=new r("return ['"+t+"', "+n.map(function(e){return"this._"+e},this).join(", ")+"];");for(var u in i)if(i.hasOwnProperty(u)){var f=u.match(/^from(.*)$/);f?a[f[1].toUpperCase()].prototype[t.toLowerCase()]=i[u]:o[u]=i[u]}o[t.toLowerCase()]=function(){return this},o.toString=new r('return "[one.color.'+t+':"+'+n.map(function(e,t){return'" '+n[t]+'="+this._'+e}).join("+")+'+"]";'),n.forEach(function(e,t){o[e]=o[e==="black"?"k":e[0]]=new r("value","isDelta","if (typeof value === 'undefined') {return this._"+e+";"+"}"+"if (isDelta) {"+"return new this.constructor("+n.map(function(t,n){return"this._"+t+(e===t?"+value":"")}).join(", ")+");"+"}"+"return new this.constructor("+n.map(function(t,n){return e===t?"value":"this._"+t}).join(", ")+");")}),c.forEach(function(e){s(t,e),s(e,t)}),c.push(t)}function l(){var e=this.rgb(),t=e._red*.3+e._green*.59+e._blue*.11;return new a.RGB(t,t,t,this._alpha)}var c=[],h={},p=function(e){return typeof e=="undefined"},d=/\s*(\.\d+|\d+(?:\.\d+)?)(%)?\s*/,v=/\s*(\.\d+|\d+(?:\.\d+)?)\s*/,m=new RegExp("^(rgb|hsl|hsv)a?\\("+d.source+","+d.source+","+d.source+"(?:,"+v.source+")?"+"\\)$","i");a.installMethod=function(e,t){c.forEach(function(n){a[n].prototype[e]=t})},f("RGB",["red","green","blue","alpha"],{hex:function(){var e=(s(255*this._red)*65536+s(255*this._green)*256+s(255*this._blue)).toString(16);return"#"+"00000".substr(0,6-e.length)+e},hexa:function(){var e=s(this._alpha*255).toString(16);return"#"+"00".substr(0,2-e.length)+e+this.hex().substr(1,6)},css:function(){return"rgb("+s(255*this._red)+","+s(255*this._green)+","+s(255*this._blue)+")"},cssa:function(){return"rgba("+s(255*this._red)+","+s(255*this._green)+","+s(255*this._blue)+","+this._alpha+")"}}),typeof define=="function"&&!p(define.amd)?define([],function(){return a}):typeof exports=="object"?module.exports=a:(one=window.one||{},one.color=a),typeof jQuery!="undefined"&&p(jQuery.color)&&(jQuery.color=a),h={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgrey:"a9a9a9",darkgreen:"006400",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",grey:"808080",green:"008000",greenyellow:"adff2f",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgrey:"d3d3d3",lightgreen:"90ee90",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370d8",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"d87093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"639",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"},f("XYZ",["x","y","z","alpha"],{fromRgb:function(){var e=function(e){return e>.04045?o((e+.055)/1.055,2.4):e/12.92},t=e(this._red),n=e(this._green),r=e(this._blue);return new a.XYZ(t*.4124564+n*.3575761+r*.1804375,t*.2126729+n*.7151522+r*.072175,t*.0193339+n*.119192+r*.9503041,this._alpha)},rgb:function(){var e=this._x,t=this._y,n=this._z,r=function(e){return e>.0031308?1.055*o(e,1/2.4)-.055:12.92*e};return new a.RGB(r(e*3.2404542+t*-1.5371385+n*-0.4985314),r(e*-0.969266+t*1.8760108+n*.041556),r(e*.0556434+t*-0.2040259+n*1.0572252),this._alpha)},lab:function(){var e=function(e){return e>.008856?o(e,1/3):7.787037*e+4/29},t=e(this._x/95.047),n=e(this._y/100),r=e(this._z/108.883);return new a.LAB(116*n-16,500*(t-n),200*(n-r),this._alpha)}}),f("LAB",["l","a","b","alpha"],{fromRgb:function(){return this.xyz().lab()},rgb:function(){return this.xyz().rgb()},xyz:function(){var e=function(e){var t=o(e,3);return t>.008856?t:(e-16/116)/7.87},t=(this._l+16)/116,n=this._a/500+t,r=t-this._b/200;return new a.XYZ(e(n)*95.047,e(t)*100,e(r)*108.883,this._alpha)}}),f("HSV",["hue","saturation","value","alpha"],{rgb:function(){var t=this._hue,n=this._saturation,r=this._value,i=u(5,e.floor(t*6)),s=t*6-i,o=r*(1-n),f=r*(1-s*n),l=r*(1-(1-s)*n),c,h,p;switch(i){case 0:c=r,h=l,p=o;break;case 1:c=f,h=r,p=o;break;case 2:c=o,h=r,p=l;break;case 3:c=o,h=f,p=r;break;case 4:c=l,h=o,p=r;break;case 5:c=r,h=o,p=f}return new a.RGB(c,h,p,this._alpha)},hsl:function(){var e=(2-this._saturation)*this._value,t=this._saturation*this._value,n=e<=1?e:2-e,r;return n<1e-9?r=0:r=t/n,new a.HSL(this._hue,r,e/2,this._alpha)},fromRgb:function(){var t=this._red,n=this._green,r=this._blue,i=e.max(t,n,r),s=u(t,n,r),o=i-s,f,l=i===0?0:o/i,c=i;if(o===0)f=0;else switch(i){case t:f=(n-r)/o/6+(n<r?1:0);break;case n:f=(r-t)/o/6+1/3;break;case r:f=(t-n)/o/6+2/3}return new a.HSV(f,l,c,this._alpha)}}),f("HSL",["hue","saturation","lightness","alpha"],{hsv:function(){var e=this._lightness*2,t=this._saturation*(e<=1?e:2-e),n;return e+t<1e-9?n=0:n=2*t/(e+t),new a.HSV(this._hue,n,(e+t)/2,this._alpha)},rgb:function(){return this.hsv().rgb()},fromRgb:function(){return this.hsv().hsl()}}),f("CMYK",["cyan","magenta","yellow","black","alpha"],{rgb:function(){return new a.RGB(1-this._cyan*(1-this._black)-this._black,1-this._magenta*(1-this._black)-this._black,1-this._yellow*(1-this._black)-this._black,this._alpha)},fromRgb:function(){var e=this._red,t=this._green,n=this._blue,r=1-e,i=1-t,s=1-n,o=1;return e||t||n?(o=u(r,u(i,s)),r=(r-o)/(1-o),i=(i-o)/(1-o),s=(s-o)/(1-o)):o=1,new a.CMYK(r,i,s,o,this._alpha)}}),a.installMethod("clearer",function(e){return this.alpha(i(e)?-0.1:-e,!0)}),a.installMethod("darken",function(e){return this.lightness(i(e)?-0.1:-e,!0)}),a.installMethod("desaturate",function(e){return this.saturation(i(e)?-0.1:-e,!0)}),a.installMethod("greyscale",l),a.installMethod("grayscale",l),a.installMethod("lighten",function(e){return this.lightness(i(e)?.1:e,!0)}),a.installMethod("mix",function(e,t){e=a(e).rgb(),t=1-(i(t)?.5:t);var n=t*2-1,r=this._alpha-e._alpha,s=((n*r===-1?n:(n+r)/(1+n*r))+1)/2,o=1-s,u=this.rgb();return new a.RGB(u._red*s+e._red*o,u._green*s+e._green*o,u._blue*s+e._blue*o,u._alpha*t+e._alpha*(1-t))}),a.installMethod("negate",function(){var e=this.rgb();return new a.RGB(1-e._red,1-e._green,1-e._blue,this._alpha)}),a.installMethod("opaquer",function(e){return this.alpha(i(e)?.1:e,!0)}),a.installMethod("rotate",function(e){return this.hue((e||0)/360,!0)}),a.installMethod("saturate",function(e){return this.saturation(i(e)?.1:e,!0)}),a.installMethod("toAlpha",function(e){var t=this.rgb(),n=a(e).rgb(),r=1e-10,i=new a.RGB(0,0,0,t._alpha),s=["_red","_green","_blue"];return s.forEach(function(e){t[e]<r?i[e]=t[e]:t[e]>n[e]?i[e]=(t[e]-n[e])/(1-n[e]):t[e]>n[e]?i[e]=(n[e]-t[e])/n[e]:i[e]=0}),i._red>i._green?i._red>i._blue?t._alpha=i._red:t._alpha=i._blue:i._green>i._blue?t._alpha=i._green:t._alpha=i._blue,t._alpha<r?t:(s.forEach(function(e){t[e]=(t[e]-n[e])/t._alpha+n[e]}),t._alpha*=i._alpha,t)})})(Math,parseFloat,parseInt,Function,isNaN,Math.round,Math.pow,Math.min);