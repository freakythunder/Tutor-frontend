(()=>{var e={};e.id=87,e.ids=[87,220],e.modules={671:(e,t)=>{"use strict";Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,s){return s in t?t[s]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,s)):"function"==typeof t&&"default"===s?t:void 0}}})},5441:e=>{e.exports={chatContainer:"ChatInterface_chatContainer__ys1vL",messagesContainer:"ChatInterface_messagesContainer__MmBzf",messageWrapper:"ChatInterface_messageWrapper__IRSjy",userMessage:"ChatInterface_userMessage__rJsan",aiMessage:"ChatInterface_aiMessage__ARGOu",timestamp:"ChatInterface_timestamp__XqMyo",errorMessage:"ChatInterface_errorMessage__Dw4xP",buttonContainer:"ChatInterface_buttonContainer__tzqxt",challengeButton:"ChatInterface_challengeButton__ClY_u",helpButton:"ChatInterface_helpButton__UVX1W",actionButton:"ChatInterface_actionButton__05xOH",aiResponseContainer:"ChatInterface_aiResponseContainer__N05JW",aiResponseHeader:"ChatInterface_aiResponseHeader__lw1sL",aiResponseText:"ChatInterface_aiResponseText__LsXbV",bulletPoints:"ChatInterface_bulletPoints__Wlxu_",bulletPoint:"ChatInterface_bulletPoint__oqK03",codeBlock:"ChatInterface_codeBlock__fqAQB",inlineCode:"ChatInterface_inlineCode__6wn34",challengePrompt:"ChatInterface_challengePrompt__81xni",hint:"ChatInterface_hint__eO2En",fadeIn:"ChatInterface_fadeIn__mbHph"}},6557:e=>{e.exports={splitter:"HorizontalSplitter_splitter__rM3CC",buttonContainer:"HorizontalSplitter_buttonContainer__DAXTC",button:"HorizontalSplitter_button__d4Jfz",challengeButton:"HorizontalSplitter_challengeButton__mj9C5",helpButton:"HorizontalSplitter_helpButton__mW5MX",beginButton:"HorizontalSplitter_beginButton__sDlOu",bookCallButton:"HorizontalSplitter_bookCallButton__Ur9DW"}},6616:e=>{e.exports={ideContainer:"IDE_ideContainer__ck297",placeholderOverlay:"IDE_placeholderOverlay__cvONI",editorContainer:"IDE_editorContainer__XP7Jo",buttonContainer:"IDE_buttonContainer__lxBCV",runButton:"IDE_runButton__vuIMn"}},1130:e=>{e.exports={container:"ResizableContainer_container___0lN7",leftPane:"ResizableContainer_leftPane__s9Tpr",rightPane:"ResizableContainer_rightPane__k7_hn",resizer:"ResizableContainer_resizer__ulrUo"}},4304:e=>{e.exports={outputContainer:"ResizableOutput_outputContainer__0oiwv",outputHeader:"ResizableOutput_outputHeader__uP_Vy",closeButton:"ResizableOutput_closeButton__rd6rX",outputContent:"ResizableOutput_outputContent__9A0Ev",loader:"ResizableOutput_loader__Ec2Dc"}},4177:(e,t,s)=>{"use strict";s.a(e,async(e,r)=>{try{s.r(t),s.d(t,{config:()=>f,default:()=>m,getServerSideProps:()=>g,getStaticPaths:()=>_,getStaticProps:()=>h,reportWebVitals:()=>v,routeModule:()=>P,unstable_getServerProps:()=>y,unstable_getServerSideProps:()=>w,unstable_getStaticParams:()=>b,unstable_getStaticPaths:()=>C,unstable_getStaticProps:()=>x});var a=s(3865),n=s(9455),i=s(671),o=s(781),l=s.n(o),c=s(3645),u=s.n(c),d=s(1780),p=e([d]);d=(p.then?(await p)():p)[0];let m=(0,i.M)(d,"default"),h=(0,i.M)(d,"getStaticProps"),_=(0,i.M)(d,"getStaticPaths"),g=(0,i.M)(d,"getServerSideProps"),f=(0,i.M)(d,"config"),v=(0,i.M)(d,"reportWebVitals"),x=(0,i.M)(d,"unstable_getStaticProps"),C=(0,i.M)(d,"unstable_getStaticPaths"),b=(0,i.M)(d,"unstable_getStaticParams"),y=(0,i.M)(d,"unstable_getServerProps"),w=(0,i.M)(d,"unstable_getServerSideProps"),P=new a.PagesRouteModule({definition:{kind:n.A.PAGES,page:"/main",pathname:"/main",bundlePath:"",filename:""},components:{App:u(),Document:l()},userland:d});r()}catch(e){r(e)}})},3645:(e,t,s)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return l}});let r=s(9929),a=s(8732),n=r._(s(2015)),i=s(2811);async function o(e){let{Component:t,ctx:s}=e;return{pageProps:await (0,i.loadGetInitialProps)(t,s)}}class l extends n.default.Component{render(){let{Component:e,pageProps:t}=this.props;return(0,a.jsx)(e,{...t})}}l.origGetInitialProps=o,l.getInitialProps=o,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1780:(e,t,s)=>{"use strict";s.a(e,async(e,r)=>{try{s.r(t),s.d(t,{default:()=>o});var a=s(8732);s(2015);var n=s(3238),i=e([n]);n=(i.then?(await i)():i)[0];let o=()=>(0,a.jsx)(n.A,{});r()}catch(e){r(e)}})},4667:(e,t,s)=>{"use strict";s.a(e,async(e,r)=>{try{s.d(t,{A:()=>m});var a=s(8732),n=s(2015),i=s(5441),o=s.n(i),l=s(2751),c=s(5443),u=s(6058),d=e([l,c]);[l,c]=d.then?(await d)():d;let p=(0,n.forwardRef)((e,t)=>{let[s,r]=(0,n.useState)([]),[i,d]=(0,n.useState)(!1),[p,m]=(0,n.useState)(null),h=(0,n.useRef)(null),{welcomeMessage:_,clearWelcomeMessage:g}=(0,u.A)(),f=localStorage.getItem("token"),v=f?JSON.parse(atob(f.split(".")[1])).username:null,x=(0,n.useCallback)(()=>{setTimeout(()=>{h.current?.scrollIntoView({behavior:"smooth"})},100)},[]);(0,n.useEffect)(()=>{C()},[]),(0,n.useEffect)(()=>{s.length>0&&x()},[s]),(0,n.useImperativeHandle)(t,()=>({addMessage(e){b(e)}}));let C=async()=>{try{let e=await (0,l.x)(),t=[];if(e.success){Array.isArray(e.data)?t=e.data:e.data&&"chats"in e.data&&(t=e.data.chats||[]);let s=t.map(e=>({_id:e._id||Date.now().toString(),user_id:e.user_id||e.userId||"",userMessage:e.userMessage||"",aiResponse:e.aiResponse||"",timestamp:e.timestamp||new Date().toISOString()})).sort((e,t)=>new Date(e.timestamp).getTime()-new Date(t.timestamp).getTime());if(r(s),_){let e={_id:Date.now().toString(),user_id:"AI",userMessage:"",aiResponse:_,timestamp:new Date().toISOString()};r(t=>[...t,e]),g()}}else console.error("Invalid response format:",e),m(e.message||"Failed to load conversations")}catch(e){console.error("Error loading conversations:",e),m("Failed to load past conversations")}},b=async e=>{if(!e.trim()||i)return;d(!0),m(null);let t=e.trim().toLowerCase(),s=e;s="next"===t?"Next":"let's begin"===t?"Let's begin":"Need help";let a={_id:Date.now().toString(),user_id:v||"",userMessage:s,aiResponse:"",timestamp:new Date().toISOString()};r(e=>[...e,a]);try{let t=await (0,l._)(e);if(t.success)r(e=>e.map(e=>e._id===a._id?{...e,aiResponse:t.data.aiResponse||"No response",timestamp:new Date().toISOString()}:e));else throw Error("Invalid response from server")}catch(e){console.error("Error sending message:",e),m("Failed to send message"),r(e=>e.map(e=>e._id===a._id?{...e,aiResponse:"Error: Failed to get response"}:e))}finally{d(!1)}},y=e=>"string"==typeof e?{user_id:"AI",userMessage:"",aiResponse:e,timestamp:new Date().toISOString()}:"object"==typeof e?{user_id:e.user_id||"AI",userMessage:e.userMessage||"",aiResponse:e.aiResponse||"",timestamp:e.timestamp||new Date().toISOString()}:{user_id:"AI",userMessage:"",aiResponse:"",timestamp:new Date().toISOString()},w=e=>new Date(e).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});return(0,a.jsxs)("div",{className:o().chatContainer,children:[(0,a.jsxs)("div",{className:o().messagesContainer,children:[s.map(e=>(0,a.jsxs)("div",{className:o().messageWrapper,children:[e.userMessage&&(0,a.jsxs)("div",{className:o().userMessage,children:[(0,a.jsx)("p",{className:o().messageContent,children:e.userMessage}),(0,a.jsx)("div",{className:o().timestamp,children:w(e.timestamp)})]}),e.aiResponse&&(0,a.jsxs)("div",{className:o().aiMessage,children:[(0,a.jsx)(c.A,{response:y(e.aiResponse)}),(0,a.jsx)("div",{className:o().timestamp,children:w(e.timestamp)})]})]},e._id)),(0,a.jsx)("div",{ref:h})]}),p&&(0,a.jsx)("div",{className:o().errorMessage,children:p})]})});p.displayName="ChatInterface";let m=p;r()}catch(e){r(e)}})},5443:(e,t,s)=>{"use strict";s.a(e,async(e,r)=>{try{s.d(t,{A:()=>h});var a=s(8732),n=s(2015),i=s.n(n),o=s(7981),l=s(6843),c=s(2001),u=s(2759),d=s(5441),p=s.n(d),m=e([o,u]);[o,u]=m.then?(await m)():m;let h=({response:e})=>{let t=(()=>{let t=e.aiResponse;return"string"==typeof t?t.trim():"object"==typeof t?(t.aiResponse||"").trim():""})();return t?(0,a.jsx)("div",{className:p().aiResponseContainer,children:(0,a.jsx)(o.default,{remarkPlugins:[u.default],components:{code({inline:e,className:t,children:s,...r}){let n=/language-(\w+)/.exec(t||"");return!e&&n?(0,a.jsx)(l.Prism,{style:c.vscDarkPlus,language:n[1],className:p().codeBlock,PreTag:"div",...r,children:String(s).replace(/\n$/,"")}):(0,a.jsx)("code",{className:e?p().inlineCode:"",...r,children:s})},h3:({...e})=>(0,a.jsx)("h3",{className:p().aiResponseHeader,...e}),p:({node:e,children:t,...s})=>{let r=String(t).toLowerCase(),n=r.includes("try this challenge")||r.includes("challenge:");return(0,a.jsx)("p",{className:n?p().challengePrompt:p().aiResponseText,...s,children:t})},ul:({...e})=>(0,a.jsx)("ul",{className:p().bulletPoints,...e}),li:({...e})=>(0,a.jsx)("li",{className:p().bulletPoint,...e}),blockquote:({node:e,...t})=>i().createElement("div",{className:p().hint,...t})},children:t})}):null};r()}catch(e){r(e)}})},744:(e,t,s)=>{"use strict";s.a(e,async(e,r)=>{try{s.d(t,{A:()=>m});var a=s(8732),n=s(2015),i=s(1859),o=s.n(i),l=s(6616),c=s.n(l),u=s(9880),d=e([u]);u=(d.then?(await d)():d)[0];let p=(0,n.forwardRef)(({height:e,onRun:t},s)=>{let r=`
  /*
  This is the code editor where you will practice writing code. 
  Just follow the instructions in the section to the left. 
  Once you are ready, click on "Let's begin" to the bottom right. 
  */
  `,[i,l]=(0,n.useState)(),[d,p]=(0,n.useState)(!1),[m,h]=(0,n.useState)(!0),_=(0,n.useRef)(null),g=(0,n.useRef)(!1),f=(0,n.useRef)(null);(0,n.useImperativeHandle)(s,()=>({getCode:()=>i||""}));let v=async()=>{if(!m){g.current=!0,p(!0);try{let e=await (0,u.V)(i),s=e.success?e.data.output:"Error while executing code.";t(s)}catch{t("Error while executing code.")}finally{p(!1)}}},x=e=>{let t=e.target;!_.current||_.current.getDomNode().contains(t)||f.current===t||f.current?.contains(t)||g.current||i&&i.trim()||h(!0)};return(0,n.useEffect)(()=>(document.addEventListener("click",x),()=>{document.removeEventListener("click",x)}),[i]),(0,a.jsxs)("div",{className:c().ideContainer,children:[(0,a.jsx)("div",{className:c().buttonContainer,children:(0,a.jsx)("button",{className:c().runButton,onClick:v,disabled:m||d,children:d?"Running...":"Run"})}),(0,a.jsxs)("div",{className:c().editorContainer,children:[(0,a.jsx)(o(),{defaultLanguage:"python",value:i,onChange:e=>{void 0!==e&&e!==r&&(l(e),h(!1))},theme:"vs-dark",options:{minimap:{enabled:!0},fontSize:14,lineNumbers:"on",scrollBeyondLastLine:!1,automaticLayout:!0},onMount:e=>{_.current=e,e.onDidFocusEditorWidget(()=>{})}}),m&&(0,a.jsx)("div",{className:c().placeholderOverlay,children:r})]})]})});p.displayName="IDE";let m=p;r()}catch(e){r(e)}})},2709:(e,t,s)=>{"use strict";s.d(t,{A:()=>c});var r=s(8732),a=s(2015),n=s(6843),i=s(2001),o=s(4304),l=s.n(o);let c=({output:e,isLoading:t,onClose:s,containerWidth:o,height:c})=>{let u=(0,a.useRef)(null);return(0,r.jsxs)("div",{ref:u,className:l().outputContainer,children:[(0,r.jsxs)("div",{className:l().outputHeader,children:[(0,r.jsx)("h3",{children:"Output"}),(0,r.jsx)("button",{onClick:s,className:l().closeButton,children:"Close"})]}),(0,r.jsx)("div",{className:l().outputContent,children:(0,r.jsx)(n.Prism,{language:"python",style:i.vscDarkPlus,wrapLines:!0,children:e})})]})}},3238:(e,t,s)=>{"use strict";s.a(e,async(e,r)=>{try{s.d(t,{A:()=>d});var a=s(8732),n=s(2015),i=s(9023),o=s(4667),l=s(1130),c=s.n(l),u=e([i,o]);[i,o]=u.then?(await u)():u;let d=()=>{let[e,t]=(0,n.useState)(30),s=(0,n.useRef)(null),r=(0,n.useRef)(!1),l=(0,n.useRef)(null),u=(0,n.useCallback)(e=>{if(!r.current||!s.current)return;let a=s.current.offsetWidth,n=e.clientX/a*100;n>20&&n<80&&t(n)},[]),d=(0,n.useCallback)(()=>{r.current=!1,document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",d)},[u]),p=(0,n.useCallback)(()=>{r.current=!0,document.addEventListener("mousemove",u),document.addEventListener("mouseup",d)},[u,d]);return(0,a.jsxs)("div",{className:c().container,ref:s,children:[(0,a.jsx)("div",{className:c().leftPane,style:{width:`${e}%`},children:(0,a.jsx)(o.A,{ref:l})}),(0,a.jsx)("div",{className:c().resizer,onMouseDown:p}),(0,a.jsx)("div",{className:c().rightPane,style:{width:`${100-e}%`},children:(0,a.jsx)(i.A,{chatInterfaceRef:l})})]})};r()}catch(e){r(e)}})},9023:(e,t,s)=>{"use strict";s.a(e,async(e,r)=>{try{s.d(t,{A:()=>d});var a=s(8732),n=s(2015),i=s(744),o=s(2709),l=s(6557),c=s.n(l),u=e([i]);i=(u.then?(await u)():u)[0];let d=({chatInterfaceRef:e})=>{let[t,s]=(0,n.useState)(30),[r,l]=(0,n.useState)(60),[u,d]=(0,n.useState)(""),p=(0,n.useRef)(null),m=(0,n.useRef)(null),h=(0,n.useRef)(!1),[_,g]=(0,n.useState)(!1),[f,v]=(0,n.useState)(!1),x=(0,n.useRef)(null);(0,n.useEffect)(()=>{"true"===localStorage.getItem("IsNewUser ")?g(!0):v(!0)},[]);let C=()=>p.current?.clientHeight||window.innerHeight;(0,n.useEffect)(()=>{C(),l(90-t)},[t]);let b=(0,n.useCallback)(e=>{d(e),console.log("output is :"+e),s(30)},[]),y=e=>{if(!h.current)return;let t=C(),r=(t-e.clientY)/t*100;r>=5&&r<=60&&(s(r),l(90-r))},w=()=>{h.current=!0,window.addEventListener("mousemove",y),window.addEventListener("mouseup",P)},P=()=>{h.current=!1,window.removeEventListener("mousemove",y),window.removeEventListener("mouseup",P)};return(0,n.useEffect)(()=>(m.current&&m.current.addEventListener("mousedown",w),()=>{m.current?.removeEventListener("mousedown",w),window.removeEventListener("mousemove",y),window.removeEventListener("mouseup",P)}),[]),(0,a.jsxs)("div",{ref:p,className:c().splitterContainer,style:{position:"relative",height:"100%"},children:[(0,a.jsx)("div",{className:c().ideSection,style:{height:`${r}%`,overflow:"hidden"},children:(0,a.jsx)(i.A,{ref:x,height:r,onRun:b})}),(0,a.jsx)("div",{ref:m,className:c().splitter}),(0,a.jsx)("div",{className:c().outputSection,style:{height:t?`${t}%`:"0",display:t?"block":"none"},children:(0,a.jsx)(o.A,{output:u,isLoading:!1,onClose:()=>{s(0),l(90)},containerWidth:p.current?.clientWidth||0,height:t})}),(0,a.jsxs)("div",{className:c().buttonContainer,style:{position:"absolute",bottom:0,right:0,padding:"10px",display:"flex",width:"100%"},children:[(0,a.jsxs)("p",{style:{fontFamily:"Sometype Mono",marginRight:"10px",fontSize:"18px",fontWeight:"600",color:"#000"},children:[" ","Have feedback for us?"]}),(0,a.jsx)("button",{onClick:()=>{window.open("https://calendly.com/adityaramteke-1357/30min","_blank")},className:`${c().bookCallButton} ${c().button}`,children:"Book a Call"}),(0,a.jsx)("div",{style:{flexGrow:1}})," ",(0,a.jsxs)("div",{style:{display:"flex",gap:"10px"},children:[_&&(0,a.jsx)("button",{onClick:()=>{e.current&&(e.current.addMessage("Let's Begin"),g(!1),setTimeout(()=>{v(!0)},1e3))},className:`${c().beginButton} ${c().button}`,children:"Let's Begin"}),f&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("button",{onClick:()=>{if(e.current){let t=x.current.getCode(),s=`Need Help: ${t}`;e.current.addMessage(s)}},className:`${c().helpButton} ${c().button}`,children:"Help"}),(0,a.jsx)("button",{onClick:()=>{e.current&&e.current.addMessage("Next")},className:`${c().challengeButton} ${c().button}`,children:"Next"})]})]})]})]})};r()}catch(e){r(e)}})},6058:(e,t,s)=>{"use strict";s.d(t,{A:()=>n}),s(8732);var r=s(2015);let a=(0,r.createContext)(void 0),n=()=>{let e=(0,r.useContext)(a);if(void 0===e)throw Error("useAuth must be used within an AuthProvider");return e}},6728:(e,t,s)=>{"use strict";s.a(e,async(e,r)=>{try{s.d(t,{A:()=>l});var a=s(1428),n=e([a]);a=(n.then?(await n)():n)[0];let i=process.env.REACT_APP_API_URL;console.log("API URL:",i);let o=a.default.create({baseURL:i,timeout:1e4,headers:{"Content-Type":"application/json"}});o.interceptors.request.use(e=>{let t=localStorage.getItem("token");return t&&(e.headers.Authorization=`Bearer ${t}`),e},e=>Promise.reject(e)),o.interceptors.response.use(e=>e,e=>(console.error("API Error:",e),e.response?.status===401&&(localStorage.removeItem("token"),localStorage.removeItem("username")),Promise.reject(e)));let l=o;r()}catch(e){r(e)}})},2751:(e,t,s)=>{"use strict";s.a(e,async(e,r)=>{try{s.d(t,{_:()=>i,x:()=>o});var a=s(6728),n=e([a]);a=(n.then?(await n)():n)[0];let i=async e=>{try{return(await a.A.post("/chat/send",{message:e})).data}catch(e){throw console.error("Error sending message:",e),e}},o=async()=>{try{let e=await a.A.get("/chat/past");return console.log("Raw API response:",e),console.log("Response data:",e.data),e.data}catch(e){throw console.error("Error fetching conversations:",e),e}};r()}catch(e){r(e)}})},9880:(e,t,s)=>{"use strict";s.a(e,async(e,r)=>{try{s.d(t,{V:()=>i});var a=s(6728),n=e([a]);a=(n.then?(await n)():n)[0];let i=async e=>{try{return(await a.A.post("/code/execute",{code:e})).data}catch(e){throw console.error("Error executing code:",e),e}};r()}catch(e){r(e)}})},9455:(e,t)=>{"use strict";Object.defineProperty(t,"A",{enumerable:!0,get:function(){return s}});var s=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},1859:e=>{"use strict";e.exports=require("@monaco-editor/react")},361:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},2015:e=>{"use strict";e.exports=require("react")},6843:e=>{"use strict";e.exports=require("react-syntax-highlighter")},2001:e=>{"use strict";e.exports=require("react-syntax-highlighter/dist/esm/styles/prism")},8732:e=>{"use strict";e.exports=require("react/jsx-runtime")},3873:e=>{"use strict";e.exports=require("path")},1428:e=>{"use strict";e.exports=import("axios")},7981:e=>{"use strict";e.exports=import("react-markdown")},2759:e=>{"use strict";e.exports=import("remark-gfm")}};var t=require("../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[781],()=>s(4177));module.exports=r})();