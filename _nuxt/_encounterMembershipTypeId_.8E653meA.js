import{n as A,u as R,q as S,s as B,v as E,x as V,o as t,y as k,w as $,z as e,c as p,A as v,t as f,a,B as z,C as F,D as H,E as j,F as G,r as P,b,T as K,G as q,H as J,I as U,J as O,d as Q,S as W,K as X}from"./entry.Dkfz3l7u.js";import{_ as L}from"./nuxt-link._h0ps89B.js";import{_ as Y}from"./ProfileCard.vue.zLPx-vvQ.js";import{u as Z}from"./useReportStore.6-VinJ81.js";import{c as ee,u as te}from"./useLazyDatabaseData.VUCewaHo.js";import{u as se}from"./asyncData.gVzUTnoq.js";const M=Symbol("membershipId"),ae=["src"],ne={class:"text-white-muted text-sm"},oe=a("div",{class:"flex-1"},null,-1),ie={class:"text-end"},ce={class:"text-white-muted text-sm"},re=A({__name:"EncounterActivityItem",props:{instanceId:{}},async setup(T){let o,i;const I=Z(),c=R(),w=T,x=S(M),n=([o,i]=B(()=>E(w.instanceId,I)),o=await o,i(),o),r=n.entries.find(s=>s.player.destinyUserInfo.membershipId===x),u=V.format(new Date(n.period)),g=r&&r.values.standing.basic.value===0,d=c.getRef(n.activityDetails.directorActivityHash),m=ee(async()=>{if(!d.value)return null;const s=d.value.directActivityModeHash;return s?await c.getRaw(s):null});return(s,l)=>{const C=L;return t(),k(C,{to:`https://www.bungie.net/7/en/Pgcr/${s.instanceId}`,target:"_blank",class:"flex items-center space-x-2"},{default:$(()=>{var _,h,y;return[(_=e(m))!=null&&_.displayProperties.hasIcon?(t(),p("img",{key:0,src:`https://www.bungie.net${e(m).displayProperties.icon}`,class:"h-16 w-16"},null,8,ae)):v("",!0),a("div",null,[a("div",null,f((h=e(m))==null?void 0:h.displayProperties.name),1),a("div",ne,f((y=e(d))==null?void 0:y.displayProperties.name),1)]),oe,a("div",ie,[a("div",null,f(e(g)?"Victory":"Defeat"),1),a("div",ce,f(e(u)),1)])]}),_:1},8,["to"])}}}),de={class:"space-y-2"},le={key:0},pe=a("div",{class:"text-white-muted"},"vs",-1),me={key:1,class:"space-y-2"},ue=["disabled"],Ie=A({__name:"[encounterMembershipTypeId]",setup(T){const o=z(),i=F(),I=H();j(M,o.membershipTypeId[1]);const c=i.params.encounterMembershipTypeId,[w,x]=G(c),{data:n}=se(c,async()=>{const l=await U(x,w);return O(l.Response)},{deep:!1}),r=P(25),u=P(!0),g=()=>{r.value+=25,m()},{data:d,refresh:m,pending:s}=te("details",()=>{const l=I.getEncounterInstanceIds(c,r.value);return l.length<r.value&&(u.value=!1),l});return(l,C)=>{const _=X,h=L,y=Y,N=re;return t(),p("div",de,[b(h,{class:"text-white-muted text-sm mb-4",to:`/${e(i).params.membershipType}/${e(i).params.membershipId}`},{default:$(()=>[b(_,{name:"material-symbols-light:keyboard-backspace"}),Q(" back ")]),_:1},8,["to"]),e(n)?(t(),p("div",le,[(t(),k(K,{to:"#profiles"},[pe,b(y,{profile:e(n)[0],characters:e(n)[1],rtl:""},null,8,["profile","characters"])]))])):v("",!0),e(d)?(t(),p("div",me,[(t(!0),p(q,null,J(e(d),D=>(t(),k(W,{key:D.instanceId},{default:$(()=>[b(N,{"instance-id":D.instanceId},null,8,["instance-id"])]),_:2},1024))),128)),e(u)?(t(),p("button",{key:0,type:"button",disabled:e(s),class:"w-full py-4 text-white-muted",onClick:g}," Load more ",8,ue)):v("",!0)])):v("",!0)])}}});export{Ie as default};