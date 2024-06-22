(()=>{"use strict";var e={1763:(e,t,r)=>{r.r(t),r.d(t,{default:()=>S});var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"container"},[t("h1",{staticClass:"title"},[e._v("Main Page")]),t("RecipePreviewList",{staticClass:"RandomRecipes center",attrs:{title:"Randome Recipes"}}),e.$root.store.username?e._e():t("router-link",{attrs:{to:"/login",tag:"button"}},[e._v("You need to Login to vue this")]),e._v(" "+e._s(!e.$root.store.username)+" "),t("RecipePreviewList",{class:{RandomRecipes:!0,blur:!e.$root.store.username,center:!0},attrs:{title:"Last Viewed Recipes",disabled:""}})],1)},n=[],i=function(){var e=this,t=e._self._c;return t("b-container",[t("h3",[e._v(" "+e._s(e.title)+": "),e._t("default")],2),t("b-row",e._l(e.recipes,(function(e){return t("b-col",{key:e.id},[t("RecipePreview",{staticClass:"recipePreview",attrs:{recipe:e}})],1)})),1)],1)},o=[],s=r(459),l=r(5492),c=r(388),u=(r(4114),function(){var e=this,t=e._self._c;return t("router-link",{staticClass:"recipe-preview",attrs:{to:{name:"recipe",params:{recipeId:e.recipe.id}}}},[t("div",{staticClass:"recipe-body"},[e.image_load?t("img",{staticClass:"recipe-image",attrs:{src:e.recipe.image}}):e._e()]),t("div",{staticClass:"recipe-footer"},[t("div",{staticClass:"recipe-title",attrs:{title:e.recipe.title}},[e._v(" "+e._s(e.recipe.title)+" ")]),t("ul",{staticClass:"recipe-overview"},[t("li",[e._v(e._s(e.recipe.readyInMinutes)+" minutes")]),t("li",[e._v(e._s(e.recipe.aggregateLikes)+" likes")])])])])}),p=[];const d={mounted:function(){var e=this;this.axios.get(this.recipe.image).then((function(t){e.image_load=!0}))},data:function(){return{image_load:!0}},props:{recipe:{type:Object,required:!0}}},m=d;var v=r(1656),f=(0,v.A)(m,u,p,!1,null,"6f75911a",null);const h=f.exports,g=JSON.parse('{"id":716429,"image":"https://img.spoonacular.com/recipes/716429-556x370.jpg","title":"Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs","readyInMinutes":45,"aggregateLikes":209,"vegetarian":false,"vegan":false,"glutenFree":false,"summary":"You can never have too many main course recipes, so give Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs a try. One serving contains <b>543 calories</b>, <b>17g of protein</b>, and <b>16g of fat</b>. For <b>$1.57 per serving</b>, this recipe <b>covers 22%</b> of your daily requirements of vitamins and minerals. This recipe serves 2. A mixture of butter, white wine, pasta, and a handful of other ingredients are all it takes to make this recipe so yummy. 209 people have tried and liked this recipe. It is brought to you by fullbellysisters.blogspot.com. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 83%</b>, which is tremendous. If you like this recipe, take a look at these similar recipes: <a href=\\"https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1230187\\">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>, <a href=\\"https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1229807\\">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>, and <a href=\\"https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1229669\\">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>."}');function b(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=[],r=0;r<e;r++)t.push(g);return{data:{recipes:t}}}const y={name:"RecipePreviewList",components:{RecipePreview:h},props:{title:{type:String,required:!0}},data:function(){return{recipes:[]}},mounted:function(){this.updateRecipes()},methods:{updateRecipes:function(){var e=this;return(0,c.A)((0,s.A)().mark((function t(){var r,a,n,i;return(0,s.A)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:try{a=5,n=b(a),console.log(n),i=n.data.recipes,console.log(i),e.recipes=[],(r=e.recipes).push.apply(r,(0,l.A)(i))}catch(o){console.log(o)}case 1:case"end":return t.stop()}}),t)})))()}}},_=y;var w=(0,v.A)(_,i,o,!1,null,"61d9ae18",null);const k=w.exports,C={components:{RecipePreviewList:k}},A=C;var P=(0,v.A)(A,a,n,!1,null,"9bc62956",null);const S=P.exports},7664:(e,t,r)=>{r(3792),r(3362),r(9085),r(9391),r(1629),r(6099),r(3500);var a=r(5471),n=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("div",{attrs:{id:"nav"}},[t("b-navbar",{attrs:{type:"dark",variant:"dark",fixed:"top"}},[t("b-navbar-nav",[t("b-nav-item",[t("router-link",{staticClass:"nav-link1",attrs:{to:{name:"main"}}},[e._v("Main")])],1),t("b-nav-item",[t("router-link",{staticClass:"nav-link1",attrs:{to:{name:"search"}}},[e._v("Search")])],1),t("b-nav-item",[t("router-link",{staticClass:"nav-link1",attrs:{to:{name:"about"}}},[e._v("About")])],1)],1),t("b-navbar-nav",{staticClass:"ml-auto"},[e.$root.store.username?t("span",{staticClass:"nav-item nav-link2 user-menu"},[t("b-button",{staticClass:"nav-link2",attrs:{variant:"outline-success"},on:{click:e.showModal}},[e._v("Add Recipe")]),t("b-nav-item-dropdown",{staticStyle:{"font-size":"100%"},attrs:{text:e.$root.store.username,left:""}},[t("b-dropdown-item",{attrs:{href:"#"}},[t("router-link",{staticClass:"nav-link2",attrs:{to:{name:"my_favorite_recipes"}}},[e._v("My favorite recipes")])],1),t("b-dropdown-item",{attrs:{href:"#"}},[t("router-link",{staticClass:"nav-link2",attrs:{to:{name:"my_recipes"}}},[e._v("My recipes")])],1),t("b-dropdown-item",{attrs:{href:"#"}},[t("router-link",{staticClass:"nav-link2",attrs:{to:{name:"my_family_recipes"}}},[e._v("My family recipes")])],1)],1),t("b-button",{staticClass:"button-4 nav-link2",attrs:{variant:"outline-success"},on:{click:e.Logout}},[e._v("Logout")])],1):t("span",{staticClass:"nav-item nav-link2"},[t("span",{attrs:{id:"hello-text"}},[e._v("Hello Guest,")]),t("router-link",{staticClass:"nav-link1",attrs:{to:{name:"login"}}},[e._v(" Login")]),t("span",[e._v(" | ")]),t("router-link",{staticClass:"nav-link1",attrs:{to:{name:"register"}}},[e._v(" Register ")])],1)])],1),t("router-view")],1)])},i=[];r(4114);const o={name:"App",methods:{Logout:function(){var e=this;this.$root.store.logout(),this.$root.toast("Logout","User logged out successfully","success"),this.$router.push("/")["catch"]((function(){e.$forceUpdate()}))},IsUserLoggedIn:function(){return void 0!==this.$root.store.username}}},s=o;var l=r(1656),c=(0,l.A)(s,n,i,!1,null,null,null);const u=c.exports;var p=r(4804),d=r.n(p),m=r(2505),v=r.n(m),f=(r(7764),r(2953),r(1763),function(){var e=this,t=e._self._c;return t("div",{staticClass:"container"},[t("h1",[e._v("Gil you didn't implement it!")]),t("router-link",{attrs:{to:"/",exact:""}},[e._v("ET Go Home")])],1)}),h=[],g={},b=(0,l.A)(g,f,h,!1,null,null,null);const y=b.exports;var _=[{path:"/",name:"main",component:function(){return Promise.resolve().then(r.bind(r,1763))}},{path:"/register",name:"register",component:function(){return Promise.all([r.e(137),r.e(136)]).then(r.bind(r,2136))}},{path:"/login",name:"login",component:function(){return Promise.all([r.e(137),r.e(640)]).then(r.bind(r,3640))}},{path:"/search",name:"search",component:function(){return r.e(381).then(r.bind(r,1381))}},{path:"/about",name:"about",component:function(){return r.e(643).then(r.bind(r,2643))}},{path:"*",name:"notFound",component:y}];const w=_;var k=r(173),C=r(1380),A=(r(9313),r(4145)),P=r(9059),S=r(1970),x=r(2670),L=r(2593),O=r(2802),R=r(7681),j=r(8933),T=r(8730),E=r(5915);a["default"].use(k.Ay);var $=new k.Ay({routes:w});[A.Z,P.wv,S.e,x.sG,L.qc,O.q0,R.m0,j.q,T.Bf,E.CG].forEach((function(e){return a["default"].use(e)})),a["default"].use(C.Ay),v().interceptors.request.use((function(e){return e}),(function(e){return Promise.reject(e)})),v().interceptors.response.use((function(e){return e}),(function(e){return Promise.reject(e)})),a["default"].use(d(),v()),a["default"].config.productionTip=!1;var M={server_domain:"http://localhost:3000",username:localStorage.username,login:function(e){localStorage.setItem("username",e),this.username=e,console.log("login",this.username)},logout:function(){console.log("logout"),localStorage.removeItem("username"),this.username=void 0,this.LastSearchRecipes=[]}};console.log(M),new a["default"]({router:$,data:function(){return{store:M}},methods:{toast:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=arguments.length>3&&void 0!==arguments[3]&&arguments[3];this.$bvToast.toast("".concat(t),{title:"".concat(e),toaster:"b-toaster-top-center",variant:r,solid:!0,appendToast:a,autoHideDelay:3e3})}},render:function(e){return e(u)}}).$mount("#app")}},t={};function r(a){var n=t[a];if(void 0!==n)return n.exports;var i=t[a]={exports:{}};return e[a].call(i.exports,i,i.exports,r),i.exports}r.m=e,(()=>{var e=[];r.O=(t,a,n,i)=>{if(!a){var o=1/0;for(u=0;u<e.length;u++){for(var[a,n,i]=e[u],s=!0,l=0;l<a.length;l++)(!1&i||o>=i)&&Object.keys(r.O).every((e=>r.O[e](a[l])))?a.splice(l--,1):(s=!1,i<o&&(o=i));if(s){e.splice(u--,1);var c=n();void 0!==c&&(t=c)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[a,n,i]}})(),(()=>{r.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return r.d(t,{a:t}),t}})(),(()=>{r.d=(e,t)=>{for(var a in t)r.o(t,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}})(),(()=>{r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,a)=>(r.f[a](e,t),t)),[]))})(),(()=>{r.u=e=>"js/"+e+"."+{136:"bcad37e8",137:"027b3884",381:"c9c846d6",640:"185a3c60",643:"39305849"}[e]+".js"})(),(()=>{r.miniCssF=e=>"css/"+e+"."+{136:"e45c063d",640:"774a5946",643:"82971736"}[e]+".css"})(),(()=>{r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="assignment-2-1:";r.l=(a,n,i,o)=>{if(e[a])e[a].push(n);else{var s,l;if(void 0!==i)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var p=c[u];if(p.getAttribute("src")==a||p.getAttribute("data-webpack")==t+i){s=p;break}}s||(l=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,r.nc&&s.setAttribute("nonce",r.nc),s.setAttribute("data-webpack",t+i),s.src=a),e[a]=[n];var d=(t,r)=>{s.onerror=s.onload=null,clearTimeout(m);var n=e[a];if(delete e[a],s.parentNode&&s.parentNode.removeChild(s),n&&n.forEach((e=>e(r))),t)return t(r)},m=setTimeout(d.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=d.bind(null,s.onerror),s.onload=d.bind(null,s.onload),l&&document.head.appendChild(s)}}})(),(()=>{r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{r.p="/"})(),(()=>{if("undefined"!==typeof document){var e=(e,t,a,n,i)=>{var o=document.createElement("link");o.rel="stylesheet",o.type="text/css",r.nc&&(o.nonce=r.nc);var s=r=>{if(o.onerror=o.onload=null,"load"===r.type)n();else{var a=r&&r.type,s=r&&r.target&&r.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+a+": "+s+")");l.name="ChunkLoadError",l.code="CSS_CHUNK_LOAD_FAILED",l.type=a,l.request=s,o.parentNode&&o.parentNode.removeChild(o),i(l)}};return o.onerror=o.onload=s,o.href=t,a?a.parentNode.insertBefore(o,a.nextSibling):document.head.appendChild(o),o},t=(e,t)=>{for(var r=document.getElementsByTagName("link"),a=0;a<r.length;a++){var n=r[a],i=n.getAttribute("data-href")||n.getAttribute("href");if("stylesheet"===n.rel&&(i===e||i===t))return n}var o=document.getElementsByTagName("style");for(a=0;a<o.length;a++){n=o[a],i=n.getAttribute("data-href");if(i===e||i===t)return n}},a=a=>new Promise(((n,i)=>{var o=r.miniCssF(a),s=r.p+o;if(t(o,s))return n();e(a,s,null,n,i)})),n={524:0};r.f.miniCss=(e,t)=>{var r={136:1,640:1,643:1};n[e]?t.push(n[e]):0!==n[e]&&r[e]&&t.push(n[e]=a(e).then((()=>{n[e]=0}),(t=>{throw delete n[e],t})))}}})(),(()=>{var e={524:0};r.f.j=(t,a)=>{var n=r.o(e,t)?e[t]:void 0;if(0!==n)if(n)a.push(n[2]);else{var i=new Promise(((r,a)=>n=e[t]=[r,a]));a.push(n[2]=i);var o=r.p+r.u(t),s=new Error,l=a=>{if(r.o(e,t)&&(n=e[t],0!==n&&(e[t]=void 0),n)){var i=a&&("load"===a.type?"missing":a.type),o=a&&a.target&&a.target.src;s.message="Loading chunk "+t+" failed.\n("+i+": "+o+")",s.name="ChunkLoadError",s.type=i,s.request=o,n[1](s)}};r.l(o,l,"chunk-"+t,t)}},r.O.j=t=>0===e[t];var t=(t,a)=>{var n,i,[o,s,l]=a,c=0;if(o.some((t=>0!==e[t]))){for(n in s)r.o(s,n)&&(r.m[n]=s[n]);if(l)var u=l(r)}for(t&&t(a);c<o.length;c++)i=o[c],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return r.O(u)},a=self["webpackChunkassignment_2_1"]=self["webpackChunkassignment_2_1"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var a=r.O(void 0,[504],(()=>r(7664)));a=r.O(a)})();
//# sourceMappingURL=app.692075ba.js.map