import{d as e,s as a,k as l,h as s,o as i,c as o,l as t,u as n,w as d,B as r,a as u,$ as c,E as v,D as m,ab as p,ac as f,ad as g,J as _,F as W,A as y,H as L,K as h,U as b,a1 as z}from"./vendor-178c6cbf.js";import{z as k}from"./zb-empty-147831cd.js";import{z as w}from"./zb-loadMore-81cb5e35.js";import{u as C,i as V,d as j,D as x,a as D,_ as I,v as M}from"./index-72685b17.js";import{g as U}from"./dayFormat-c374a561.js";import{u as A}from"./useInfiniteScroll-c83ba412.js";import"./zb-loading-f402cb15.js";const B={class:"leaveWord-item-container"},F={class:"avatar"},E=["src"],G={class:"box"},H={class:"info"},J={class:"topInfo"},K={class:"infoBox"},S={class:"user-name"},T={class:"time"},$={class:"content"},q=I(e({__name:"leaveWordItem",props:{item:{},type:{}},setup(e){const m=e,{leaveWord:p}=C(),{dianzanList:f}=a(p),g=l((()=>f.value.includes(m.item.id))),_=s(m.item.dianzan),W=async()=>{if(g.value){if(!(await p.cancelDianzanLeaveWord(m.item.id)))return;f.value=f.value.filter((e=>e!==m.item.id)),j.setCache(x,f.value),_.value--}else{if(!(await p.dianzanLeaveWord(m.item.id)))return;f.value.push(m.item.id),j.setCache(x,f.value||[]),v.success("点赞成功"),_.value++}};return(e,a)=>{const l=D;return i(),o("div",B,[t("div",F,[t("img",{src:n(V)(e.item.user.user_image),alt:""},null,8,E)]),t("div",G,[t("div",H,[t("div",J,[t("div",K,[t("div",S,d(e.item.user.name),1),t("div",T,d(n(U)(e.item.createdAt)),1)]),t("div",{class:r({operator:!0,active:g.value}),onClick:W},[u(l,{name:"like",color:g.value?"var(--theme-active-color)":""},null,8,["color"]),c(" "+d(_.value),1)],2)]),t("div",$,d(e.item.content),1)])])])}}}),[["__scopeId","data-v-81ea1512"]]),N={class:"addLeaveWord-container"},O={class:"comfirm"},P=I(e({__name:"addLeaveWord",emits:["closeDialog"],setup(e,{emit:l}){const n=l,{user:d,leaveWord:r}=C(),{userInfo:g}=a(d),_=s(""),W=async()=>{if(M(_.value))return v.warning("不能为空");const e={content:_.value};await r.addLeaveWord(e),v.success("发布留言成功"),_.value="",n("closeDialog")};return(e,a)=>{const l=p,s=f;return i(),o("div",N,[u(l,{rows:8,modelValue:_.value,"onUpdate:modelValue":a[0]||(a[0]=e=>_.value=e),maxlength:"255",placeholder:"留个言吧~","show-word-limit":"",type:"textarea"},null,8,["modelValue"]),t("div",O,[u(s,{onClick:W},{default:m((()=>[c("发布")])),_:1})])])}}}),[["__scopeId","data-v-e8cad9fc"]]),Q={class:"leaveWord-container"},R={class:"title"},X=["infinite-scroll-disabled"],Y=I(e({__name:"index",setup(e){const{leaveWord:r,common:v}=C(),{leaveWordList:p,leaveWordTotal:V}=a(r),{isMobile:j}=a(v),x=async e=>await r.getLeaveWord(e,9),{isLoading:D,loadMore:I}=A(x),M=l((()=>V.value>p.value.length)),U=s(!1),B=s(!1),F=()=>{j.value?U.value=!U.value:B.value=!B.value},E=async()=>{await x(1),B.value=!1,U.value=!1};return(e,a)=>{const l=f,s=w,r=k,v=h,C=b,j=z;return i(),o("div",Q,[t("div",R,[t("span",null,"全部留言 "+d(0===n(V)?"":n(V)),1),u(l,{link:"",icon:n(g),onClick:F},{default:m((()=>[c("留言")])),_:1},8,["icon"])]),_((i(),o("div",{class:"list","infinite-scroll-disabled":!M.value,"infinite-scroll-delay":600},[(i(!0),o(W,null,y(n(p),((e,a)=>(i(),o("div",{class:"comment",key:e.id},[u(q,{type:"leaveWord",item:e,onGetCommentList:x},null,8,["item"])])))),128))],8,X)),[[j,n(I)]]),0!==n(p).length?(i(),L(s,{key:0,isLoading:n(D),direction:"center",isLoadMore:M.value},null,8,["isLoading","isLoadMore"])):(i(),L(r,{key:1,height:400})),u(v,{modelValue:B.value,"onUpdate:modelValue":a[0]||(a[0]=e=>B.value=e),title:"留言",draggable:""},{default:m((()=>[u(P,{onCloseDialog:E})])),_:1},8,["modelValue"]),u(C,{title:"留言",modelValue:U.value,"onUpdate:modelValue":a[1]||(a[1]=e=>U.value=e),size:"100%",direction:"btt","lock-scroll":!1},{default:m((()=>[u(P,{onCloseDialog:E})])),_:1},8,["modelValue"])])}}}),[["__scopeId","data-v-f69aaba6"]]);export{Y as default};
