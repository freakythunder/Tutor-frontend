(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[332],{2022:(e,t,a)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return a(8140)}])},8140:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>_});var o=a(4848),r=a(6540),s=a(148),n=a(4763),l=a(2798),i=a.n(l),c=a(3353),g=a(1988);let u={src:"/_next/static/media/icons8-google.c43e43a7.svg",height:48,width:48,blurWidth:0,blurHeight:0},d=e=>{let{message:t}=e;return(0,o.jsx)("div",{className:i().loadingScreen,"aria-live":"polite",children:(0,o.jsx)("h2",{children:t})})},m=()=>{let[e,t]=(0,r.useState)(""),[a,l]=(0,r.useState)(!1),[m,_]=(0,r.useState)("Logging you in..."),h=["Logging you in...","Fetching your data...","Almost there..."],{loginWithRedirect:p,user:P,isAuthenticated:v}=(0,g.WB)(),f=(0,s.Zp)(),{login:x}=(0,c.A)();return(0,r.useEffect)(()=>{let e=async function(){let a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if(!v||!P)return;l(!0);let o=0,r=setInterval(()=>{o=(o+1)%h.length,_(h[o])},1e3);try{let e=P.email,t=P.name,a=await n.A.post("/auth/login",{username:e,password:t});if(clearInterval(r),a.data?.data)x(e,a.data.data.token,a.data.message),f("/main");else throw Error("Invalid response from server")}catch(o){clearInterval(r),a<2?(console.log(`Retrying login... Attempt ${a+1}`),e(a+1)):(t(o.response?.data?.message||"Failed to authenticate after multiple attempts."),l(!1))}finally{l(!1)}};"true"!==localStorage.getItem("authenticated")&&v&&P&&(localStorage.setItem("authenticated","true"),e())},[v,P,x,f]),(0,o.jsxs)("main",{className:i().homePage,children:[a?(0,o.jsx)(d,{message:m}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("header",{className:i().header,children:(0,o.jsx)("div",{className:i().logo,children:"plato"})}),(0,o.jsxs)("div",{className:i().content,children:[(0,o.jsx)("h1",{className:i().title,children:"Welcome to Plato"}),(0,o.jsxs)("p",{className:i().subtitle,children:["We've built a personal tutor to help you learn JavaScript! This is our first prototype, and we'd love your feedback. Book a call with the founders to share your feedback"," ",(0,o.jsx)("a",{href:"https://calendly.com/adityaramteke-1357/30min",target:"_blank",rel:"noreferrer",children:"here"}),"."]}),(0,o.jsxs)("button",{className:i().tryButton,onClick:()=>{t(""),l(!0),p()},children:[(0,o.jsx)("img",{src:u,alt:"Google Icon",className:i().googleIcon}),"Signup or Login"]})]})]}),e&&(0,o.jsx)("div",{className:i().error,children:e})]})},_=()=>(0,o.jsx)(m,{})},3353:(e,t,a)=>{"use strict";a.d(t,{A:()=>s}),a(4848);var o=a(6540);let r=(0,o.createContext)(void 0),s=()=>{let e=(0,o.useContext)(r);if(void 0===e)throw Error("useAuth must be used within an AuthProvider");return e}},4763:(e,t,a)=>{"use strict";a.d(t,{A:()=>n});var o=a(4335);let r=a(7836).env.REACT_APP_API_URL;console.log("API URL:",r);let s=o.A.create({baseURL:r,timeout:1e4,headers:{"Content-Type":"application/json"}});s.interceptors.request.use(e=>{let t=localStorage.getItem("token");return t&&(e.headers.Authorization=`Bearer ${t}`),e},e=>Promise.reject(e)),s.interceptors.response.use(e=>e,e=>(console.error("API Error:",e),e.response?.status===401&&(localStorage.removeItem("token"),localStorage.removeItem("username")),Promise.reject(e)));let n=s},2798:e=>{e.exports={homePage:"HomePage_homePage__MOtKA",header:"HomePage_header__H9YGe",logo:"HomePage_logo__fYWFw",loginButton:"HomePage_loginButton__2TO_4",content:"HomePage_content__GAN_9",title:"HomePage_title__KwV5e",subtitle:"HomePage_subtitle__CmI8u",tryButton:"HomePage_tryButton__4EJ1A",googleIcon:"HomePage_googleIcon__q_hv7",loadingScreen:"HomePage_loadingScreen__GdgP1",fadeIn:"HomePage_fadeIn__aCQ5C",error:"HomePage_error__bH_ym"}}},e=>{var t=t=>e(e.s=t);e.O(0,[259,335,722,636,593,792],()=>t(2022)),_N_E=e.O()}]);