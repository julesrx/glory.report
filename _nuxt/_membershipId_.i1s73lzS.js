import{_ as v}from"./ProfileCard.vue.zLPx-vvQ.js";import{n as x,C as g,B as k,$ as C,L as w,a0 as A,z as e,o as s,c as a,a as o,b as m,t as S,A as B,I,a1 as L}from"./entry.Dkfz3l7u.js";import{u as N,a as P}from"./useLoadingStore.S1Mp6rDK.js";import{a as R,b as V}from"./useReportStore.6-VinJ81.js";import{u as j}from"./asyncData.gVzUTnoq.js";import"./nuxt-link._h0ps89B.js";const z={key:0,class:"text-white-muted"},D={key:1},T={id:"profiles",class:"flex justify-between items-center"},$=o("hr",{class:"my-4 border-black-muted"},null,-1),E={class:"flex justify-between text-white-muted text-sm"},Q=x({__name:"[membershipId]",setup(F){const r=g(),t=k(),n=N(),l=R(),p=V(),d=P(),u=r.params.membershipId,_=+r.params.membershipType,{data:f,pending:c}=j("profile",()=>I(u,_));C(()=>!c.value,()=>{t.load(f.value.Response),l.clear(),n.load(t.characters)});const h=w(()=>d.loading),i=()=>p.abort();return A(()=>i()),(O,U)=>{const b=v,y=L;return e(c)?(s(),a("div",z,"Loading profile...")):(s(),a("div",D,[o("div",T,[m(b,{profile:e(t).profile,characters:e(t).characters},null,8,["profile","characters"])]),$,o("div",E,[o("div",null,"Found "+S(e(n).activityCount)+" activities",1),e(h)?(s(),a("button",{key:0,type:"button",onClick:i},"Abort")):B("",!0)]),m(y)]))}}});export{Q as default};