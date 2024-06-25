"use strict";(self["webpackChunkassignment_2_1"]=self["webpackChunkassignment_2_1"]||[]).push([[94],{3094:(e,r,t)=>{t.r(r),t.d(r,{default:()=>d});var n=function(){var e=this,r=e._self._c;return r("div",{staticClass:"container"},[e.recipe?r("div",[r("div",{staticClass:"recipe-header mt-3 mb-4"},[r("h1",[e._v(e._s(e.recipe.title))]),r("img",{staticClass:"center",attrs:{src:e.recipe.image}})]),r("div",{staticClass:"recipe-body"},[r("div",{staticClass:"wrapper"},[r("div",{staticClass:"wrapped"},[r("div",{staticClass:"mb-3"},[r("div",[e._v("Ready in "+e._s(e.recipe.readyInMinutes)+" minutes")]),r("div",[e._v("Likes: "+e._s(e.recipe.aggregateLikes)+" likes")])]),e._v(" Ingredients: "),r("ul",e._l(e.recipe.extendedIngredients,(function(t,n){return r("li",{key:n+"_"+t.id},[e._v(" "+e._s(t.original)+" ")])})),0)]),r("div",{staticClass:"wrapped"},[e._v(" Instructions: "),r("ol",e._l(e.recipe._instructions,(function(t){return r("li",{key:t.number},[e._v(" "+e._s(t.step)+" ")])})),0)])])])]):e._e()])},a=[],i=t(459),s=t(5492),c=t(388),o=(t(8706),t(2062),t(2712),t(2010),t(6099),t(7495),t(5440),t(520));const u={data:function(){return{recipe:null}},created:function(){var e=this;return(0,c.A)((0,i.A)().mark((function r(){var t,n,a,c,u,l,v,p,d,f,g;return(0,i.A)().wrap((function(r){while(1)switch(r.prev=r.next){case 0:r.prev=0,r.prev=1,t=(0,o.Ge)(e.$route.params.recipeId),200!==t.status&&e.$router.replace("/NotFound"),r.next=11;break;case 6:return r.prev=6,r.t0=r["catch"](1),console.log("error.response.status",r.t0.response.status),e.$router.replace("/NotFound"),r.abrupt("return");case 11:n=t.data.recipe,a=n.analyzedInstructions,c=n.instructions,u=n.extendedIngredients,l=n.aggregateLikes,v=n.readyInMinutes,p=n.image,d=n.title,f=a.map((function(e){return e.steps[0].step=e.name+e.steps[0].step,e.steps})).reduce((function(e,r){return[].concat((0,s.A)(e),(0,s.A)(r))}),[]),g={instructions:c,_instructions:f,analyzedInstructions:a,extendedIngredients:u,aggregateLikes:l,readyInMinutes:v,image:p,title:d},e.recipe=g,r.next=20;break;case 17:r.prev=17,r.t1=r["catch"](0),console.log(r.t1);case 20:case"end":return r.stop()}}),r,null,[[0,17],[1,6]])})))()}},l=u;var v=t(1656),p=(0,v.A)(l,n,a,!1,null,"b1bb2200",null);const d=p.exports},7829:(e,r,t)=>{var n=t(8183).charAt;e.exports=function(e,r,t){return r+(t?n(e,r).length:1)}},926:(e,r,t)=>{var n=t(9306),a=t(8981),i=t(7055),s=t(6198),c=TypeError,o="Reduce of empty array with no initial value",u=function(e){return function(r,t,u,l){var v=a(r),p=i(v),d=s(v);if(n(t),0===d&&u<2)throw new c(o);var f=e?d-1:0,g=e?-1:1;if(u<2)while(1){if(f in p){l=p[f],f+=g;break}if(f+=g,e?f<0:d<=f)throw new c(o)}for(;e?f>=0:d>f;f+=g)f in p&&(l=t(l,p[f],f,v));return l}};e.exports={left:u(!1),right:u(!0)}},9228:(e,r,t)=>{t(7495);var n=t(9565),a=t(6840),i=t(7323),s=t(9039),c=t(8227),o=t(6699),u=c("species"),l=RegExp.prototype;e.exports=function(e,r,t,v){var p=c(e),d=!s((function(){var r={};return r[p]=function(){return 7},7!==""[e](r)})),f=d&&!s((function(){var r=!1,t=/a/;return"split"===e&&(t={},t.constructor={},t.constructor[u]=function(){return t},t.flags="",t[p]=/./[p]),t.exec=function(){return r=!0,null},t[p](""),!r}));if(!d||!f||t){var g=/./[p],h=r(p,""[e],(function(e,r,t,a,s){var c=r.exec;return c===i||c===l.exec?d&&!s?{done:!0,value:n(g,r,t,a)}:{done:!0,value:n(e,t,r,a)}:{done:!1}}));a(String.prototype,e,h[0]),a(l,p,h[1])}v&&o(l[p],"sham",!0)}},2478:(e,r,t)=>{var n=t(9504),a=t(8981),i=Math.floor,s=n("".charAt),c=n("".replace),o=n("".slice),u=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,l=/\$([$&'`]|\d{1,2})/g;e.exports=function(e,r,t,n,v,p){var d=t+e.length,f=n.length,g=l;return void 0!==v&&(v=a(v),g=u),c(p,g,(function(a,c){var u;switch(s(c,0)){case"$":return"$";case"&":return e;case"`":return o(r,0,t);case"'":return o(r,d);case"<":u=v[o(c,1,-1)];break;default:var l=+c;if(0===l)return a;if(l>f){var p=i(l/10);return 0===p?a:p<=f?void 0===n[p-1]?s(c,1):n[p-1]+s(c,1):a}u=n[l-1]}return void 0===u?"":u}))}},6682:(e,r,t)=>{var n=t(9565),a=t(8551),i=t(4901),s=t(4576),c=t(7323),o=TypeError;e.exports=function(e,r){var t=e.exec;if(i(t)){var u=n(t,e,r);return null!==u&&a(u),u}if("RegExp"===s(e))return n(c,e,r);throw new o("RegExp#exec called on incompatible receiver")}},8706:(e,r,t)=>{var n=t(6518),a=t(9039),i=t(4376),s=t(34),c=t(8981),o=t(6198),u=t(6837),l=t(2278),v=t(1469),p=t(597),d=t(8227),f=t(7388),g=d("isConcatSpreadable"),h=f>=51||!a((function(){var e=[];return e[g]=!1,e.concat()[0]!==e})),x=function(e){if(!s(e))return!1;var r=e[g];return void 0!==r?!!r:i(e)},_=!h||!p("concat");n({target:"Array",proto:!0,arity:1,forced:_},{concat:function(e){var r,t,n,a,i,s=c(this),p=v(s,0),d=0;for(r=-1,n=arguments.length;r<n;r++)if(i=-1===r?s:arguments[r],x(i))for(a=o(i),u(d+a),t=0;t<a;t++,d++)t in i&&l(p,d,i[t]);else u(d+1),l(p,d++,i);return p.length=d,p}})},2062:(e,r,t)=>{var n=t(6518),a=t(9213).map,i=t(597),s=i("map");n({target:"Array",proto:!0,forced:!s},{map:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}})},2712:(e,r,t)=>{var n=t(6518),a=t(926).left,i=t(4598),s=t(7388),c=t(9088),o=!c&&s>79&&s<83,u=o||!i("reduce");n({target:"Array",proto:!0,forced:u},{reduce:function(e){var r=arguments.length;return a(this,e,r,r>1?arguments[1]:void 0)}})},5440:(e,r,t)=>{var n=t(8745),a=t(9565),i=t(9504),s=t(9228),c=t(9039),o=t(8551),u=t(4901),l=t(4117),v=t(1291),p=t(8014),d=t(655),f=t(7750),g=t(7829),h=t(5966),x=t(2478),_=t(6682),m=t(8227),y=m("replace"),b=Math.max,k=Math.min,w=i([].concat),$=i([].push),I=i("".indexOf),A=i("".slice),C=function(e){return void 0===e?e:String(e)},M=function(){return"$0"==="a".replace(/./,"$0")}(),E=function(){return!!/./[y]&&""===/./[y]("a","$0")}(),R=!c((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}));s("replace",(function(e,r,t){var i=E?"$":"$0";return[function(e,t){var n=f(this),i=l(e)?void 0:h(e,y);return i?a(i,e,n,t):a(r,d(n),e,t)},function(e,a){var s=o(this),c=d(e);if("string"==typeof a&&-1===I(a,i)&&-1===I(a,"$<")){var l=t(r,s,c,a);if(l.done)return l.value}var f=u(a);f||(a=d(a));var h,m=s.global;m&&(h=s.unicode,s.lastIndex=0);var y,M=[];while(1){if(y=_(s,c),null===y)break;if($(M,y),!m)break;var E=d(y[0]);""===E&&(s.lastIndex=g(c,p(s.lastIndex),h))}for(var R="",L=0,S=0;S<M.length;S++){y=M[S];for(var z,F=d(y[0]),N=b(k(v(y.index),c.length),0),T=[],G=1;G<y.length;G++)$(T,C(y[G]));var O=y.groups;if(f){var j=w([F],T,N,c);void 0!==O&&$(j,O),z=d(n(a,void 0,j))}else z=x(F,c,N,T,O,a);N>=L&&(R+=A(c,L,N)+z,L=N+F.length)}return R+A(c,L)}]}),!R||!M||E)}}]);
//# sourceMappingURL=94.f61d17d2.js.map