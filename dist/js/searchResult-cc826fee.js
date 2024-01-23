import{d as a,Q as e,h as s,Z as l,E as t,o,c as i,l as n,a as r,D as c,F as d,A as g,ab as u,B as v,w as p,I as b,u as m,J as h,x as _,y,s as z,z as f,V as C,T as S,R as k,a7 as x}from"./vendor-178c6cbf.js";import{v as B,_ as I,i as R,u as j}from"./index-72685b17.js";import{g as q}from"./dayFormat-c374a561.js";import{z as A}from"./zb-loading-f402cb15.js";import{z as L}from"./zb-empty-147831cd.js";import{u as V}from"./usePagination-7e1e4286.js";const w={class:"searchArea-container"},P={class:"search-input"},U={class:"search-filter"},E=["onClick"],F=I(a({__name:"zb-search-area",emits:["getSearchBlog"],setup(a,{emit:b}){const m=b,h=e().query.query,_=s(1),y=s({querySearch:h,orderByRead:!1});l((()=>{z()}));const z=async()=>{B(y.value.querySearch)?t.warning("不能为空"):m("getSearchBlog",y.value)},f=[{id:1,text:"最新优先"},{id:2,text:"最热优先"}];return(a,e)=>{const s=u;return o(),i("div",w,[n("div",P,[r(s,{modelValue:y.value.querySearch,"onUpdate:modelValue":e[0]||(e[0]=a=>y.value.querySearch=a),clearable:"",onChange:z},{append:c((()=>[n("button",{class:"search-button",onClick:z},"搜索")])),_:1},8,["modelValue"])]),n("div",U,[(o(),i(d,null,g(f,(a=>n("div",{class:v(["filter",{active:a.id===_.value}]),key:a.id,onClick:e=>(async a=>{_.value=a,y.value.orderByRead=2===_.value,await z()})(a.id)},p(a.text),11,E))),64))])])}}}),[["__scopeId","data-v-67aecf62"]]),T={class:"item-container"},D={class:"left"},G={class:"top-info"},J={class:"title"},N={class:"description"},Q=(a=>(_("data-v-ba5a7d15"),a=a(),y(),a))((()=>n("div",{class:"tool"},null,-1))),Z={class:"right"},H={alt:""},K=I(a({__name:"zb-searchResult-blogItem",props:{blog:{}},setup:a=>(a,e)=>{const s=b("lazy");return o(),i("div",T,[n("div",D,[n("div",G,p(a.blog.author+" & "+m(q)(a.blog.createdAt)),1),n("div",J,p(a.blog.title),1),n("div",N,p((l=a.blog.content_text,l.replace(/#/g,""))),1),Q]),n("div",Z,[h(n("img",H,null,512),[[s,m(R)(a.blog.blog_image)]])])]);var l}}),[["__scopeId","data-v-ba5a7d15"]]),M={class:"item-container"},O={class:"top"},W={alt:""},X={class:"bottom"},Y={class:"top-info"},$={class:"title"},aa={class:"description"},ea=(a=>(_("data-v-eadc06fd"),a=a(),y(),a))((()=>n("div",{class:"tool"},null,-1))),sa=I(a({__name:"zb-searchResult-blogItem-mobile",props:{blog:{}},setup:a=>(a,e)=>{const s=b("lazy");return o(),i("div",M,[n("div",O,[h(n("img",W,null,512),[[s,m(R)(a.blog.blog_image)]])]),n("div",X,[n("div",Y,p(a.blog.author+" & "+m(q)(a.blog.createdAt)),1),n("div",$,p(a.blog.title),1),n("div",aa,p((l=a.blog.content_text,l.replace(/#/g,""))),1),ea])]);var l}}),[["__scopeId","data-v-eadc06fd"]]),la={class:"searchResult-container"},ta={class:"blog-area"},oa=["onClick"],ia={class:"result-item-pc"},na={class:"result-item-mobile"},ra={class:"loading"},ca={key:0,class:"pagination"},da=I(a({__name:"searchResult",setup(a){const{blog:e}=j(),{blogList:s,blogTotal:t}=z(e),{pageNum:c,pageSize:u,handleSizeChange:v,handleCurrentChange:p,isLoading:b,getBlogListParams:_}=V(e.getBlogList),y=f();l((()=>{}));const B=async a=>{a&&(_.value=a),p(1)};return(a,e)=>{const l=x;return o(),i("div",la,[r(F,{onGetSearchBlog:B}),h(n("div",ta,[(o(!0),i(d,null,g(m(s),(a=>(o(),i("div",{class:"item",key:a.id,onClick:e=>{var s;(s=a.id)&&y.push("/blog/detail?id="+s)}},[n("div",ia,[r(K,{blog:a},null,8,["blog"])]),n("div",na,[r(sa,{blog:a},null,8,["blog"])])],8,oa)))),128))],512),[[C,!m(b)&&m(s).length>0]]),h(r(L,{height:500},null,512),[[C,!m(b)&&0===m(s).length]]),h(n("div",ra,[r(A)],512),[[C,m(b)]]),!m(b)&&m(s).length>0?(o(),i("div",ca,[r(l,{"current-page":m(c),"onUpdate:currentPage":e[0]||(e[0]=a=>S(c)?c.value=a:null),"page-size":m(u),"onUpdate:pageSize":e[1]||(e[1]=a=>S(u)?u.value=a:null),"page-sizes":[9,12,15,18,36],background:!0,layout:"sizes, prev, pager, next",total:m(t),onSizeChange:m(v),onCurrentChange:m(p)},null,8,["current-page","page-size","total","onSizeChange","onCurrentChange"])])):k("",!0)])}}}),[["__scopeId","data-v-fef4f77c"]]);export{da as default};
