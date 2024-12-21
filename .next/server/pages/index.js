(()=>{var e={};e.id=332,e.ids=[220,332],e.modules={671:(e,t)=>{"use strict";Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},5746:e=>{e.exports={homePage:"HomePage_homePage__MOtKA",header:"HomePage_header__H9YGe",logo:"HomePage_logo__fYWFw",loginButton:"HomePage_loginButton__2TO_4",content:"HomePage_content__GAN_9",title:"HomePage_title__KwV5e",subtitle:"HomePage_subtitle__CmI8u",tryButton:"HomePage_tryButton__4EJ1A",googleIcon:"HomePage_googleIcon__q_hv7",loadingScreen:"HomePage_loadingScreen__GdgP1",fadeIn:"HomePage_fadeIn__aCQ5C",error:"HomePage_error__bH_ym"}},8639:(e,t,r)=>{"use strict";r.d(t,{A:()=>a});let a={src:"/_next/static/media/icons8-google.c43e43a7.svg",height:48,width:48,blurWidth:0,blurHeight:0}},2003:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.r(t),r.d(t,{config:()=>_,default:()=>m,getServerSideProps:()=>P,getStaticPaths:()=>h,getStaticProps:()=>p,reportWebVitals:()=>f,routeModule:()=>x,unstable_getServerProps:()=>b,unstable_getServerSideProps:()=>y,unstable_getStaticParams:()=>S,unstable_getStaticPaths:()=>A,unstable_getStaticProps:()=>v});var o=r(3865),s=r(9455),n=r(671),i=r(781),l=r.n(i),u=r(3645),c=r.n(u),d=r(879),g=e([d]);d=(g.then?(await g)():g)[0];let m=(0,n.M)(d,"default"),p=(0,n.M)(d,"getStaticProps"),h=(0,n.M)(d,"getStaticPaths"),P=(0,n.M)(d,"getServerSideProps"),_=(0,n.M)(d,"config"),f=(0,n.M)(d,"reportWebVitals"),v=(0,n.M)(d,"unstable_getStaticProps"),A=(0,n.M)(d,"unstable_getStaticPaths"),S=(0,n.M)(d,"unstable_getStaticParams"),b=(0,n.M)(d,"unstable_getServerProps"),y=(0,n.M)(d,"unstable_getServerSideProps"),x=new o.PagesRouteModule({definition:{kind:s.A.PAGES,page:"/index",pathname:"/",bundlePath:"",filename:""},components:{App:c(),Document:l()},userland:d});a()}catch(e){a(e)}})},3645:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return l}});let a=r(9929),o=r(8732),s=a._(r(2015)),n=r(2811);async function i(e){let{Component:t,ctx:r}=e;return{pageProps:await (0,n.loadGetInitialProps)(t,r)}}class l extends s.default.Component{render(){let{Component:e,pageProps:t}=this.props;return(0,o.jsx)(e,{...t})}}l.origGetInitialProps=i,l.getInitialProps=i,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},879:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.r(t),r.d(t,{default:()=>i});var o=r(8732);r(2015);var s=r(5302),n=e([s]);s=(n.then?(await n)():n)[0];let i=()=>(0,o.jsx)(s.A,{});a()}catch(e){a(e)}})},5302:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.d(t,{A:()=>h});var o=r(8732),s=r(2015),n=r(4822),i=r(6728),l=r(5746),u=r.n(l),c=r(6058),d=r(2665),g=r(8639),m=e([i]);i=(m.then?(await m)():m)[0];let p=({message:e})=>(0,o.jsx)("div",{className:u().loadingScreen,"aria-live":"polite",children:(0,o.jsx)("h2",{children:e})}),h=()=>{let[e,t]=(0,s.useState)(""),[r,a]=(0,s.useState)(!1),[l,m]=(0,s.useState)("Logging you in..."),h=["Logging you in...","Fetching your data...","Almost there..."],{loginWithRedirect:P,user:_,isAuthenticated:f}=(0,d.useAuth0)(),v=(0,n.useNavigate)(),{login:A}=(0,c.A)();return(0,s.useEffect)(()=>{let e=async(r=0)=>{if(!f||!_)return;a(!0);let o=0,s=setInterval(()=>{o=(o+1)%h.length,m(h[o])},1e3);try{let e=_.email,t=_.name,r=await i.A.post("/auth/login",{username:e,password:t});if(clearInterval(s),r.data?.data)A(e,r.data.data.token,r.data.message),v("/main");else throw Error("Invalid response from server")}catch(o){clearInterval(s),r<2?(console.log(`Retrying login... Attempt ${r+1}`),e(r+1)):(t(o.response?.data?.message||"Failed to authenticate after multiple attempts."),a(!1))}finally{a(!1)}};"true"!==localStorage.getItem("authenticated")&&f&&_&&(localStorage.setItem("authenticated","true"),e())},[f,_,A,v]),(0,o.jsxs)("main",{className:u().homePage,children:[r?(0,o.jsx)(p,{message:l}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("header",{className:u().header,children:(0,o.jsx)("div",{className:u().logo,children:"plato"})}),(0,o.jsxs)("div",{className:u().content,children:[(0,o.jsx)("h1",{className:u().title,children:"Welcome to Plato"}),(0,o.jsxs)("p",{className:u().subtitle,children:["We've built a personal tutor to help you learn JavaScript! This is our first prototype, and we'd love your feedback. Book a call with the founders to share your feedback"," ",(0,o.jsx)("a",{href:"https://calendly.com/adityaramteke-1357/30min",target:"_blank",rel:"noreferrer",children:"here"}),"."]}),(0,o.jsxs)("button",{className:u().tryButton,onClick:()=>{t(""),a(!0),P()},children:[(0,o.jsx)("img",{src:g.A,alt:"Google Icon",className:u().googleIcon}),"Signup or Login"]})]})]}),e&&(0,o.jsx)("div",{className:u().error,children:e})]})};a()}catch(e){a(e)}})},6058:(e,t,r)=>{"use strict";r.d(t,{A:()=>s}),r(8732);var a=r(2015);let o=(0,a.createContext)(void 0),s=()=>{let e=(0,a.useContext)(o);if(void 0===e)throw Error("useAuth must be used within an AuthProvider");return e}},6728:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.d(t,{A:()=>l});var o=r(1428),s=e([o]);o=(s.then?(await s)():s)[0];let n=process.env.REACT_APP_API_URL;console.log("API URL:",n);let i=o.default.create({baseURL:n,timeout:1e4,headers:{"Content-Type":"application/json"}});i.interceptors.request.use(e=>{let t=localStorage.getItem("token");return t&&(e.headers.Authorization=`Bearer ${t}`),e},e=>Promise.reject(e)),i.interceptors.response.use(e=>e,e=>(console.error("API Error:",e),e.response?.status===401&&(localStorage.removeItem("token"),localStorage.removeItem("username")),Promise.reject(e)));let l=i;a()}catch(e){a(e)}})},9455:(e,t)=>{"use strict";Object.defineProperty(t,"A",{enumerable:!0,get:function(){return r}});var r=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},2665:e=>{"use strict";e.exports=require("@auth0/auth0-react")},361:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},2015:e=>{"use strict";e.exports=require("react")},4822:e=>{"use strict";e.exports=require("react-router-dom")},8732:e=>{"use strict";e.exports=require("react/jsx-runtime")},3873:e=>{"use strict";e.exports=require("path")},1428:e=>{"use strict";e.exports=import("axios")}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[781],()=>r(2003));module.exports=a})();