import{ag as u,r as c,v as g,ah as h,a3 as y,ai as I}from"./uPkiCNGO.js";import{u as m,a as b}from"./-pxJYk5M.js";const A=u("activities",()=>{const r=m(),n=b(),o=c(0),a=c([]),i=t=>{a.value=a.value.filter(e=>e!==t)},v=g(()=>!a.value.length),f=t=>{o.value=0,a.value.push(...t.map(e=>e.characterId));for(const e of t)d(e,0)},d=async(t,e)=>{const l=(await Promise.all(new Array(3).fill(void 0).map((s,p)=>h(t.membershipId,t.membershipType,t.characterId,n.signal,e+p)))).map(s=>s.Response.activities).filter(s=>!!s).flat(1);if(!l.length){i(t.characterId);return}for(const s of l)r.fetchReport(s.activityDetails.instanceId);o.value+=l.length,d(t,e+3)};return{load:f,activityCount:o,done:v}}),R=u("loading",()=>{const r=A(),n=m(),o=c(!1);return y(()=>[r.done,n.idle],([a,i])=>{o.value=!a||!i},{throttle:500,immediate:!0}),{loading:I(o)}});export{R as a,A as u};
