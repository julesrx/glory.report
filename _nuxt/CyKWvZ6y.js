import{u as A,a as g}from"./-pxJYk5M.js";import{u as E}from"./BR2-AKzM.js";import{Y as y,h as L,Z as b,$ as C,a0 as m,X as D,r as v,a1 as z,f as R,v as W,a2 as $,a3 as j}from"./uPkiCNGO.js";function S(n,t,e){let a;D(e)?a={evaluating:e}:a={};const{lazy:o=!1,evaluating:r=void 0,shallow:c=!0,onError:f=y}=a,p=v(!o),d=c?z(t):v(t);let s=0;return R(async u=>{if(!p.value)return;s++;const l=s;let i=!1;r&&Promise.resolve().then(()=>{r.value=!0});try{const h=await n(w=>{u(()=>{r&&(r.value=!1),i||w()})});l===s&&(d.value=h)}catch(h){f(h)}finally{r&&l===s&&(r.value=!1),i=!0}}),o?W(()=>(p.value=!0,d.value)):d}function x(n){var t;const e=m(n);return(t=e==null?void 0:e.$el)!=null?t:e}const B=$?window:void 0;function F(...n){let t,e,a,o;if(typeof n[0]=="string"||Array.isArray(n[0])?([e,a,o]=n,t=B):[t,e,a,o]=n,!t)return y;Array.isArray(e)||(e=[e]),Array.isArray(a)||(a=[a]);const r=[],c=()=>{r.forEach(s=>s()),r.length=0},f=(s,u,l,i)=>(s.addEventListener(u,l,i),()=>s.removeEventListener(u,l,i)),p=L(()=>[x(t),m(o)],([s,u])=>{if(c(),!s)return;const l=C(u)?{...u}:u;r.push(...e.flatMap(i=>a.map(h=>f(s,i,h,l))))},{immediate:!0,flush:"post"}),d=()=>{p(),c()};return b(d),d}const T=(n,t,e=1e3)=>{const a=A(),o=g(),{data:r,pending:c,refresh:f}=E(n,async()=>await t(),{deep:!1}),p=j(()=>a.fetchedCount,()=>f(),{throttle:e,immediate:!0});return F(o.signal,"abort",p),{data:r,pending:c,refresh:f}};export{S as c,T as u};
