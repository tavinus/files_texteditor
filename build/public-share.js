!function(e){var t={};function s(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=t,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s="./js/public-share.js")}({"./js/public-share.js":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s("./node_modules/marked/src/marked.js"),n=s.n(r);$(document).ready(function(){var e=$("#isPublic").val(),t=$("#mimetype").val(),s=$("#filesize").val();if(e&&"text/markdown"===t&&s<524288){var r=$("#sharingToken").val(),i=OC.generateUrl("/s/{token}/download",{token:r}),l=$("#imgframe"),a=new n.a.Renderer;a.link=function(e,t,s){try{var r=decodeURIComponent(unescape(e)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(0!==r.indexOf("http:")&&0!==r.indexOf("https:"))return"";var n='<a href="'+e+'" rel="noreferrer noopener"';return t&&(n+=' title="'+t+'"'),n+=">"+s+"</a>"},a.image=function(e,t,s){return s||t},a.blockquote=function(e){return e},l.addClass("icon-loading").children().remove(),$.get(i).success(function(e){l.removeClass("icon-loading").addClass("preview formatted-text").html(DOMPurify.sanitize(n()(e,{renderer:a,smartLists:!0}),{SAFE_FOR_JQUERY:!0}))}).fail(function(e){l.removeClass("icon-loading")})}else if(e&&"text"===t.substr(0,t.indexOf("/"))){(l=$("#imgframe")).addClass("icon-loading").children().remove();var o=$(window).height()-350;o=Math.max(200,o);r=$("#sharingToken").val();$.ajax({url:OC.generateUrl("/apps/files_texteditor/public/{token}",{token:r}),headers:{Range:"bytes=0-524288"}}).success(function(e){var t=$("<div/>").addClass("text-preview default-overridden");t.text(e),l.removeClass("icon-loading").addClass("preview").append(t);var s=t.height();if(e.length>524289){var r=$("<div/>").addClass("ellipsis");r.html("(&#133;)"),r.appendTo("#imgframe")}s>o&&t.height(o)})}})},"./node_modules/marked/src/InlineLexer.js":function(e,t,s){const r=s("./node_modules/marked/src/Renderer.js"),{defaults:n}=s("./node_modules/marked/src/defaults.js"),{inline:i}=s("./node_modules/marked/src/rules.js"),{findClosingBracket:l,escape:a}=s("./node_modules/marked/src/helpers.js");e.exports=class e{constructor(e,t){if(this.options=t||n,this.links=e,this.rules=i.normal,this.options.renderer=this.options.renderer||new r,this.renderer=this.options.renderer,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.pedantic?this.rules=i.pedantic:this.options.gfm&&(this.options.breaks?this.rules=i.breaks:this.rules=i.gfm)}static get rules(){return i}static output(t,s,r){return new e(s,r).output(t)}output(t){let s,r,n,i,o,h,c="";for(;t;)if(o=this.rules.escape.exec(t))t=t.substring(o[0].length),c+=a(o[1]);else if(o=this.rules.tag.exec(t))!this.inLink&&/^<a /i.test(o[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(o[0])&&(this.inLink=!1),!this.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(o[0])?this.inRawBlock=!0:this.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(o[0])&&(this.inRawBlock=!1),t=t.substring(o[0].length),c+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(o[0]):a(o[0]):o[0];else if(o=this.rules.link.exec(t)){const r=l(o[2],"()");if(r>-1){const e=(0===o[0].indexOf("!")?5:4)+o[1].length+r;o[2]=o[2].substring(0,r),o[0]=o[0].substring(0,e).trim(),o[3]=""}t=t.substring(o[0].length),this.inLink=!0,n=o[2],this.options.pedantic?(s=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n))?(n=s[1],i=s[3]):i="":i=o[3]?o[3].slice(1,-1):"",n=n.trim().replace(/^<([\s\S]*)>$/,"$1"),c+=this.outputLink(o,{href:e.escapes(n),title:e.escapes(i)}),this.inLink=!1}else if((o=this.rules.reflink.exec(t))||(o=this.rules.nolink.exec(t))){if(t=t.substring(o[0].length),s=(o[2]||o[1]).replace(/\s+/g," "),!(s=this.links[s.toLowerCase()])||!s.href){c+=o[0].charAt(0),t=o[0].substring(1)+t;continue}this.inLink=!0,c+=this.outputLink(o,s),this.inLink=!1}else if(o=this.rules.strong.exec(t))t=t.substring(o[0].length),c+=this.renderer.strong(this.output(o[4]||o[3]||o[2]||o[1]));else if(o=this.rules.em.exec(t))t=t.substring(o[0].length),c+=this.renderer.em(this.output(o[6]||o[5]||o[4]||o[3]||o[2]||o[1]));else if(o=this.rules.code.exec(t))t=t.substring(o[0].length),c+=this.renderer.codespan(a(o[2].trim(),!0));else if(o=this.rules.br.exec(t))t=t.substring(o[0].length),c+=this.renderer.br();else if(o=this.rules.del.exec(t))t=t.substring(o[0].length),c+=this.renderer.del(this.output(o[1]));else if(o=this.rules.autolink.exec(t))t=t.substring(o[0].length),n="@"===o[2]?"mailto:"+(r=a(this.mangle(o[1]))):r=a(o[1]),c+=this.renderer.link(n,null,r);else if(this.inLink||!(o=this.rules.url.exec(t))){if(o=this.rules.text.exec(t))t=t.substring(o[0].length),this.inRawBlock?c+=this.renderer.text(this.options.sanitize?this.options.sanitizer?this.options.sanitizer(o[0]):a(o[0]):o[0]):c+=this.renderer.text(a(this.smartypants(o[0])));else if(t)throw new Error("Infinite loop on byte: "+t.charCodeAt(0))}else{if("@"===o[2])n="mailto:"+(r=a(o[0]));else{do{h=o[0],o[0]=this.rules._backpedal.exec(o[0])[0]}while(h!==o[0]);r=a(o[0]),n="www."===o[1]?"http://"+r:r}t=t.substring(o[0].length),c+=this.renderer.link(n,null,r)}return c}static escapes(t){return t?t.replace(e.rules._escapes,"$1"):t}outputLink(e,t){const s=t.href,r=t.title?a(t.title):null;return"!"!==e[0].charAt(0)?this.renderer.link(s,r,this.output(e[1])):this.renderer.image(s,r,a(e[1]))}smartypants(e){return this.options.smartypants?e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):e}mangle(e){if(!this.options.mangle)return e;const t=e.length;let s,r="",n=0;for(;n<t;n++)s=e.charCodeAt(n),Math.random()>.5&&(s="x"+s.toString(16)),r+="&#"+s+";";return r}}},"./node_modules/marked/src/Lexer.js":function(e,t,s){const{defaults:r}=s("./node_modules/marked/src/defaults.js"),{block:n}=s("./node_modules/marked/src/rules.js"),{rtrim:i,splitCells:l,escape:a}=s("./node_modules/marked/src/helpers.js");e.exports=class e{constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||r,this.rules=n.normal,this.options.pedantic?this.rules=n.pedantic:this.options.gfm&&(this.rules=n.gfm)}static get rules(){return n}static lex(t,s){return new e(s).lex(t)}lex(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    "),this.token(e,!0)}token(e,t){let s,r,o,h,c,u,p,d,g,m,f,k,x,b,_,w;for(e=e.replace(/^ +$/gm,"");e;)if((o=this.rules.newline.exec(e))&&(e=e.substring(o[0].length),o[0].length>1&&this.tokens.push({type:"space"})),o=this.rules.code.exec(e)){const t=this.tokens[this.tokens.length-1];e=e.substring(o[0].length),t&&"paragraph"===t.type?t.text+="\n"+o[0].trimRight():(o=o[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",codeBlockStyle:"indented",text:this.options.pedantic?o:i(o,"\n")}))}else if(o=this.rules.fences.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"code",lang:o[2]?o[2].trim():o[2],text:o[3]||""});else if(o=this.rules.heading.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"heading",depth:o[1].length,text:o[2]});else if((o=this.rules.nptable.exec(e))&&(u={type:"table",header:l(o[1].replace(/^ *| *\| *$/g,"")),align:o[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:o[3]?o[3].replace(/\n$/,"").split("\n"):[]}).header.length===u.align.length){for(e=e.substring(o[0].length),f=0;f<u.align.length;f++)/^ *-+: *$/.test(u.align[f])?u.align[f]="right":/^ *:-+: *$/.test(u.align[f])?u.align[f]="center":/^ *:-+ *$/.test(u.align[f])?u.align[f]="left":u.align[f]=null;for(f=0;f<u.cells.length;f++)u.cells[f]=l(u.cells[f],u.header.length);this.tokens.push(u)}else if(o=this.rules.hr.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"hr"});else if(o=this.rules.blockquote.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"blockquote_start"}),o=o[0].replace(/^ *> ?/gm,""),this.token(o,t),this.tokens.push({type:"blockquote_end"});else if(o=this.rules.list.exec(e)){for(e=e.substring(o[0].length),p={type:"list_start",ordered:b=(h=o[2]).length>1,start:b?+h:"",loose:!1},this.tokens.push(p),d=[],s=!1,x=(o=o[0].match(this.rules.item)).length,f=0;f<x;f++)m=(u=o[f]).length,~(u=u.replace(/^ *([*+-]|\d+\.) */,"")).indexOf("\n ")&&(m-=u.length,u=this.options.pedantic?u.replace(/^ {1,4}/gm,""):u.replace(new RegExp("^ {1,"+m+"}","gm"),"")),f!==x-1&&(c=n.bullet.exec(o[f+1])[0],(h.length>1?1===c.length:c.length>1||this.options.smartLists&&c!==h)&&(e=o.slice(f+1).join("\n")+e,f=x-1)),r=s||/\n\n(?!\s*$)/.test(u),f!==x-1&&(s="\n"===u.charAt(u.length-1),r||(r=s)),r&&(p.loose=!0),w=void 0,(_=/^\[[ xX]\] /.test(u))&&(w=" "!==u[1],u=u.replace(/^\[[ xX]\] +/,"")),g={type:"list_item_start",task:_,checked:w,loose:r},d.push(g),this.tokens.push(g),this.token(u,!1),this.tokens.push({type:"list_item_end"});if(p.loose)for(x=d.length,f=0;f<x;f++)d[f].loose=!0;this.tokens.push({type:"list_end"})}else if(o=this.rules.html.exec(e))e=e.substring(o[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&("pre"===o[1]||"script"===o[1]||"style"===o[1]),text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(o[0]):a(o[0]):o[0]});else if(t&&(o=this.rules.def.exec(e)))e=e.substring(o[0].length),o[3]&&(o[3]=o[3].substring(1,o[3].length-1)),k=o[1].toLowerCase().replace(/\s+/g," "),this.tokens.links[k]||(this.tokens.links[k]={href:o[2],title:o[3]});else if((o=this.rules.table.exec(e))&&(u={type:"table",header:l(o[1].replace(/^ *| *\| *$/g,"")),align:o[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:o[3]?o[3].replace(/\n$/,"").split("\n"):[]}).header.length===u.align.length){for(e=e.substring(o[0].length),f=0;f<u.align.length;f++)/^ *-+: *$/.test(u.align[f])?u.align[f]="right":/^ *:-+: *$/.test(u.align[f])?u.align[f]="center":/^ *:-+ *$/.test(u.align[f])?u.align[f]="left":u.align[f]=null;for(f=0;f<u.cells.length;f++)u.cells[f]=l(u.cells[f].replace(/^ *\| *| *\| *$/g,""),u.header.length);this.tokens.push(u)}else if(o=this.rules.lheading.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"heading",depth:"="===o[2].charAt(0)?1:2,text:o[1]});else if(t&&(o=this.rules.paragraph.exec(e)))e=e.substring(o[0].length),this.tokens.push({type:"paragraph",text:"\n"===o[1].charAt(o[1].length-1)?o[1].slice(0,-1):o[1]});else if(o=this.rules.text.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"text",text:o[0]});else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0));return this.tokens}}},"./node_modules/marked/src/Parser.js":function(e,t,s){const r=s("./node_modules/marked/src/Renderer.js"),n=s("./node_modules/marked/src/Slugger.js"),i=s("./node_modules/marked/src/InlineLexer.js"),l=s("./node_modules/marked/src/TextRenderer.js"),{defaults:a}=s("./node_modules/marked/src/defaults.js"),{merge:o,unescape:h}=s("./node_modules/marked/src/helpers.js");e.exports=class e{constructor(e){this.tokens=[],this.token=null,this.options=e||a,this.options.renderer=this.options.renderer||new r,this.renderer=this.options.renderer,this.renderer.options=this.options,this.slugger=new n}static parse(t,s){return new e(s).parse(t)}parse(e){this.inline=new i(e.links,this.options),this.inlineText=new i(e.links,o({},this.options,{renderer:new l})),this.tokens=e.reverse();let t="";for(;this.next();)t+=this.tok();return t}next(){return this.token=this.tokens.pop(),this.token}peek(){return this.tokens[this.tokens.length-1]||0}parseText(){let e=this.token.text;for(;"text"===this.peek().type;)e+="\n"+this.next().text;return this.inline.output(e)}tok(){let e="";switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,h(this.inlineText.output(this.token.text)),this.slugger);case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":{let t,s,r,n,i="";for(r="",t=0;t<this.token.header.length;t++)r+=this.renderer.tablecell(this.inline.output(this.token.header[t]),{header:!0,align:this.token.align[t]});for(i+=this.renderer.tablerow(r),t=0;t<this.token.cells.length;t++){for(s=this.token.cells[t],r="",n=0;n<s.length;n++)r+=this.renderer.tablecell(this.inline.output(s[n]),{header:!1,align:this.token.align[n]});e+=this.renderer.tablerow(r)}return this.renderer.table(i,e)}case"blockquote_start":for(e="";"blockquote_end"!==this.next().type;)e+=this.tok();return this.renderer.blockquote(e);case"list_start":{e="";const t=this.token.ordered,s=this.token.start;for(;"list_end"!==this.next().type;)e+=this.tok();return this.renderer.list(e,t,s)}case"list_item_start":{e="";const t=this.token.loose,s=this.token.checked,r=this.token.task;if(this.token.task)if(t)if("text"===this.peek().type){const e=this.peek();e.text=this.renderer.checkbox(s)+" "+e.text}else this.tokens.push({type:"text",text:this.renderer.checkbox(s)});else e+=this.renderer.checkbox(s);for(;"list_item_end"!==this.next().type;)e+=t||"text"!==this.token.type?this.tok():this.parseText();return this.renderer.listitem(e,r,s)}case"html":return this.renderer.html(this.token.text);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText());default:{const e='Token with "'+this.token.type+'" type was not found.';if(!this.options.silent)throw new Error(e);console.log(e)}}}}},"./node_modules/marked/src/Renderer.js":function(e,t,s){const{defaults:r}=s("./node_modules/marked/src/defaults.js"),{cleanUrl:n,escape:i}=s("./node_modules/marked/src/helpers.js");e.exports=class{constructor(e){this.options=e||r}code(e,t,s){const r=(t||"").match(/\S*/)[0];if(this.options.highlight){const t=this.options.highlight(e,r);null!=t&&t!==e&&(s=!0,e=t)}return r?'<pre><code class="'+this.options.langPrefix+i(r,!0)+'">'+(s?e:i(e,!0))+"</code></pre>\n":"<pre><code>"+(s?e:i(e,!0))+"</code></pre>"}blockquote(e){return"<blockquote>\n"+e+"</blockquote>\n"}html(e){return e}heading(e,t,s,r){return this.options.headerIds?"<h"+t+' id="'+this.options.headerPrefix+r.slug(s)+'">'+e+"</h"+t+">\n":"<h"+t+">"+e+"</h"+t+">\n"}hr(){return this.options.xhtml?"<hr/>\n":"<hr>\n"}list(e,t,s){const r=t?"ol":"ul";return"<"+r+(t&&1!==s?' start="'+s+'"':"")+">\n"+e+"</"+r+">\n"}listitem(e){return"<li>"+e+"</li>\n"}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "}paragraph(e){return"<p>"+e+"</p>\n"}table(e,t){return t&&(t="<tbody>"+t+"</tbody>"),"<table>\n<thead>\n"+e+"</thead>\n"+t+"</table>\n"}tablerow(e){return"<tr>\n"+e+"</tr>\n"}tablecell(e,t){const s=t.header?"th":"td";return(t.align?"<"+s+' align="'+t.align+'">':"<"+s+">")+e+"</"+s+">\n"}strong(e){return"<strong>"+e+"</strong>"}em(e){return"<em>"+e+"</em>"}codespan(e){return"<code>"+e+"</code>"}br(){return this.options.xhtml?"<br/>":"<br>"}del(e){return"<del>"+e+"</del>"}link(e,t,s){if(null===(e=n(this.options.sanitize,this.options.baseUrl,e)))return s;let r='<a href="'+i(e)+'"';return t&&(r+=' title="'+t+'"'),r+=">"+s+"</a>"}image(e,t,s){if(null===(e=n(this.options.sanitize,this.options.baseUrl,e)))return s;let r='<img src="'+e+'" alt="'+s+'"';return t&&(r+=' title="'+t+'"'),r+=this.options.xhtml?"/>":">"}text(e){return e}}},"./node_modules/marked/src/Slugger.js":function(e,t){e.exports=class{constructor(){this.seen={}}slug(e){let t=e.toLowerCase().trim().replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-");if(this.seen.hasOwnProperty(t)){const e=t;do{this.seen[e]++,t=e+"-"+this.seen[e]}while(this.seen.hasOwnProperty(t))}return this.seen[t]=0,t}}},"./node_modules/marked/src/TextRenderer.js":function(e,t){e.exports=class{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}text(e){return e}link(e,t,s){return""+s}image(e,t,s){return""+s}br(){return""}}},"./node_modules/marked/src/defaults.js":function(e,t){function s(){return{baseUrl:null,breaks:!1,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,xhtml:!1}}e.exports={defaults:{baseUrl:null,breaks:!1,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,xhtml:!1},getDefaults:s,changeDefaults:function(t){e.exports.defaults=t}}},"./node_modules/marked/src/helpers.js":function(e,t){const s=/[&<>"']/,r=/[&<>"']/g,n=/[<>"']|&(?!#?\w+;)/,i=/[<>"']|&(?!#?\w+;)/g,l={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},a=e=>l[e];const o=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;function h(e){return e.replace(o,(e,t)=>"colon"===(t=t.toLowerCase())?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):"")}const c=/(^|[^\[])\^/g;const u=/[^\w:]/g,p=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;const d={},g=/^[^:]+:\/*[^/]*$/,m=/^([^:]+:)[\s\S]*$/,f=/^([^:]+:\/*[^/]*)[\s\S]*$/;function k(e,t){d[" "+e]||(g.test(e)?d[" "+e]=e+"/":d[" "+e]=x(e,"/",!0));const s=-1===(e=d[" "+e]).indexOf(":");return"//"===t.substring(0,2)?s?t:e.replace(m,"$1")+t:"/"===t.charAt(0)?s?t:e.replace(f,"$1")+t:e+t}function x(e,t,s){const r=e.length;if(0===r)return"";let n=0;for(;n<r;){const i=e.charAt(r-n-1);if(i!==t||s){if(i===t||!s)break;n++}else n++}return e.substr(0,r-n)}e.exports={escape:function(e,t){if(t){if(s.test(e))return e.replace(r,a)}else if(n.test(e))return e.replace(i,a);return e},unescape:h,edit:function(e,t){e=e.source||e,t=t||"";const s={replace:(t,r)=>(r=(r=r.source||r).replace(c,"$1"),e=e.replace(t,r),s),getRegex:()=>new RegExp(e,t)};return s},cleanUrl:function(e,t,s){if(e){let e;try{e=decodeURIComponent(h(s)).replace(u,"").toLowerCase()}catch(e){return null}if(0===e.indexOf("javascript:")||0===e.indexOf("vbscript:")||0===e.indexOf("data:"))return null}t&&!p.test(s)&&(s=k(t,s));try{s=encodeURI(s).replace(/%25/g,"%")}catch(e){return null}return s},resolveUrl:k,noopTest:{exec:function(){}},merge:function(e){let t,s,r=1;for(;r<arguments.length;r++)for(s in t=arguments[r])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e},splitCells:function(e,t){const s=e.replace(/\|/g,(e,t,s)=>{let r=!1,n=t;for(;--n>=0&&"\\"===s[n];)r=!r;return r?"|":" |"}).split(/ \|/);let r=0;if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;r<s.length;r++)s[r]=s[r].trim().replace(/\\\|/g,"|");return s},rtrim:x,findClosingBracket:function(e,t){if(-1===e.indexOf(t[1]))return-1;const s=e.length;let r=0,n=0;for(;n<s;n++)if("\\"===e[n])n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&--r<0)return n;return-1},checkSanitizeDeprecation:function(e){e&&e.sanitize&&!e.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")}}},"./node_modules/marked/src/marked.js":function(e,t,s){const r=s("./node_modules/marked/src/Lexer.js"),n=s("./node_modules/marked/src/Parser.js"),i=s("./node_modules/marked/src/Renderer.js"),l=s("./node_modules/marked/src/TextRenderer.js"),a=s("./node_modules/marked/src/InlineLexer.js"),o=s("./node_modules/marked/src/Slugger.js"),{merge:h,checkSanitizeDeprecation:c,escape:u}=s("./node_modules/marked/src/helpers.js"),{getDefaults:p,changeDefaults:d,defaults:g}=s("./node_modules/marked/src/defaults.js");function m(e,t,s){if(void 0===e||null===e)throw new Error("marked(): input parameter is undefined or null");if("string"!=typeof e)throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");if(s||"function"==typeof t){s||(s=t,t=null),t=h({},m.defaults,t||{}),c(t);const i=t.highlight;let l,a,o=0;try{l=r.lex(e,t)}catch(e){return s(e)}a=l.length;const u=function(e){if(e)return t.highlight=i,s(e);let r;try{r=n.parse(l,t)}catch(t){e=t}return t.highlight=i,e?s(e):s(null,r)};if(!i||i.length<3)return u();if(delete t.highlight,!a)return u();for(;o<l.length;o++)!function(e){"code"!==e.type?--a||u():i(e.text,e.lang,function(t,s){return t?u(t):null==s||s===e.text?--a||u():(e.text=s,e.escaped=!0,void(--a||u()))})}(l[o])}else try{return t=h({},m.defaults,t||{}),c(t),n.parse(r.lex(e,t),t)}catch(e){if(e.message+="\nPlease report this to https://github.com/markedjs/marked.",(t||m.defaults).silent)return"<p>An error occurred:</p><pre>"+u(e.message+"",!0)+"</pre>";throw e}}m.options=m.setOptions=function(e){return h(m.defaults,e),d(m.defaults),m},m.getDefaults=p,m.defaults=g,m.Parser=n,m.parser=n.parse,m.Renderer=i,m.TextRenderer=l,m.Lexer=r,m.lexer=r.lex,m.InlineLexer=a,m.inlineLexer=a.output,m.Slugger=o,m.parse=m,e.exports=m},"./node_modules/marked/src/rules.js":function(e,t,s){const{noopTest:r,edit:n,merge:i}=s("./node_modules/marked/src/helpers.js"),l={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:/^ {0,3}(`{3,}|~{3,})([^`~\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,hr:/^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:"^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?\\?>\\n*|<![A-Z][\\s\\S]*?>\\n*|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))",def:/^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,nptable:r,table:r,lheading:/^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,text:/^[^\n]+/,_label:/(?!\s*\])(?:\\[\[\]]|[^\[\]])+/,_title:/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/};l.def=n(l.def).replace("label",l._label).replace("title",l._title).getRegex(),l.bullet=/(?:[*+-]|\d{1,9}\.)/,l.item=/^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/,l.item=n(l.item,"gm").replace(/bull/g,l.bullet).getRegex(),l.list=n(l.list).replace(/bull/g,l.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+l.def.source+")").getRegex(),l._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",l._comment=/<!--(?!-?>)[\s\S]*?-->/,l.html=n(l.html,"i").replace("comment",l._comment).replace("tag",l._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),l.paragraph=n(l._paragraph).replace("hr",l.hr).replace("heading"," {0,3}#{1,6} +").replace("|lheading","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}|~{3,})[^`\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag",l._tag).getRegex(),l.blockquote=n(l.blockquote).replace("paragraph",l.paragraph).getRegex(),l.normal=i({},l),l.gfm=i({},l.normal,{nptable:/^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,table:/^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/}),l.pedantic=i({},l.normal,{html:n("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",l._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,fences:r,paragraph:n(l.normal._paragraph).replace("hr",l.hr).replace("heading"," *#{1,6} *[^\n]").replace("lheading",l.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()});const a={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:r,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,nolink:/^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,strong:/^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,em:/^_([^\s_])_(?!_)|^\*([^\s*<\[])\*(?!\*)|^_([^\s<][\s\S]*?[^\s_])_(?!_|[^\spunctuation])|^_([^\s_<][\s\S]*?[^\s])_(?!_|[^\spunctuation])|^\*([^\s<"][\s\S]*?[^\s\*])\*(?!\*|[^\spunctuation])|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:r,text:/^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/,_punctuation:"!\"#$%&'()*+,\\-./:;<=>?@\\[^_{|}~"};a.em=n(a.em).replace(/punctuation/g,a._punctuation).getRegex(),a._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,a._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,a._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,a.autolink=n(a.autolink).replace("scheme",a._scheme).replace("email",a._email).getRegex(),a._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,a.tag=n(a.tag).replace("comment",l._comment).replace("attribute",a._attribute).getRegex(),a._label=/(?:\[[^\[\]]*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,a._href=/<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/,a._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,a.link=n(a.link).replace("label",a._label).replace("href",a._href).replace("title",a._title).getRegex(),a.reflink=n(a.reflink).replace("label",a._label).getRegex(),a.normal=i({},a),a.pedantic=i({},a.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,link:n(/^!?\[(label)\]\((.*?)\)/).replace("label",a._label).getRegex(),reflink:n(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",a._label).getRegex()}),a.gfm=i({},a.normal,{escape:n(a.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^~+(?=\S)([\s\S]*?\S)~+/,text:/^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/}),a.gfm.url=n(a.gfm.url,"i").replace("email",a.gfm._extended_email).getRegex(),a.breaks=i({},a.gfm,{br:n(a.br).replace("{2,}","*").getRegex(),text:n(a.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()}),e.exports={block:l,inline:a}}});
//# sourceMappingURL=public-share.js.map