(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Account"],{"33b9":function(e,t,r){},"4fad":function(e,t,r){var a=r("23e7"),c=r("6f53").entries;a({target:"Object",stat:!0},{entries:function(e){return c(e)}})},"5c55":function(e,t,r){"use strict";r.r(t);r("b0c0"),r("a4d3"),r("e01a");var a=r("7a23"),c=Object(a["withScopeId"])("data-v-098d4104");Object(a["pushScopeId"])("data-v-098d4104");var o={class:"d-flex p-3 m-2 flex-column flex-md-row dashboard-morph user-row flex-grow-1"},s={class:"col-md-4 d-flex flex-column align-items-center"},n={class:"image-block"},d={class:"w-100 mt-3 p-0"},i={class:"d-flex w-100"},l={class:"col-2 d-flex justify-content-end"},u={class:"col-10 text-start user-info"},p={class:"d-flex w-100 mt-3"},m={class:"col-2 d-flex justify-content-end"},f={class:"col-10 text-start user-info"},b={class:"col-md-8 d-flex align-items-center text-start"},O={class:"user-desc w-100 text-break"},j=Object(a["createVNode"])("h5",null,"Description",-1),v={class:"col-md-6 text-start"},w={class:"form-group"},V=Object(a["createVNode"])("label",{for:"user-name"},"User Name",-1),N=Object(a["createVNode"])("small",{id:"nameHelp",class:"form-text text-muted"},"Enter another name and submit to change it",-1),x={class:"form-group"},g=Object(a["createVNode"])("label",{for:"user-email"},"User Email",-1),h=Object(a["createVNode"])("small",{id:"nameHelp",class:"form-text text-muted"},"Enter another email address and submit to change it",-1),y={class:"form-group"},U=Object(a["createVNode"])("label",{for:"user-desc"},"User Description",-1),C=Object(a["createVNode"])("small",{id:"nameHelp",class:"form-text text-muted"},"Enter some words to introduce yourself",-1),D={class:"form-group d-flex"},k=Object(a["createTextVNode"])("Change info"),E={class:"col-md-6 text-start"},S={class:"form-group"},T=Object(a["createVNode"])("label",{for:"user-password"},"Old password",-1),I=Object(a["createVNode"])("small",{id:"nameHelp",class:"form-text text-muted"},"Enter and submit to change your password",-1),M={class:"form-group"},H=Object(a["createVNode"])("label",{for:"user-password"},"Password",-1),P=Object(a["createVNode"])("small",{id:"nameHelp",class:"form-text text-muted"},"Enter and submit to change your password",-1),R={class:"form-group"},_=Object(a["createVNode"])("label",{for:"user-password-confirm"},"Password Confirm",-1),B=Object(a["createVNode"])("small",{id:"nameHelp",class:"form-text text-muted"},"Type your new password again",-1),A={class:"form-group d-flex"},J=Object(a["createTextVNode"])("Change password");Object(a["popScopeId"])();var q=c((function(e,t,r,q,F,L){var z=Object(a["resolveComponent"])("fa"),G=Object(a["resolveComponent"])("Button");return Object(a["openBlock"])(),Object(a["createBlock"])(a["Fragment"],null,[Object(a["createVNode"])("div",o,[Object(a["createVNode"])("div",{class:["user-role-tag","".concat(e.user.role,"-color")]},Object(a["toDisplayString"])(e.user.role),3),Object(a["createVNode"])("div",s,[Object(a["createVNode"])("div",n,[Object(a["createVNode"])("img",{class:"user-image",src:"".concat(e.user.photo?e.user.photo:"https://i.pinimg.com/564x/c4/0d/7a/c40d7a7060fb74926c257db982b6ddaf.jpg"),alt:""},null,8,["src"]),Object(a["createVNode"])("a",{href:"#",class:"image-btn",onClick:t[1]||(t[1]=Object(a["withModifiers"])((function(){return e.cropperOpen&&e.cropperOpen.apply(e,arguments)}),["prevent"]))},[Object(a["createVNode"])(z,{icon:"camera",type:"fas",class:"camera-icon"})])]),Object(a["createVNode"])("ul",d,[Object(a["createVNode"])("li",i,[Object(a["createVNode"])("span",l,[Object(a["createVNode"])(z,{icon:"envelope",type:"far",class:"account-icon"})]),Object(a["createVNode"])("span",u,Object(a["toDisplayString"])(e.user.email),1)]),Object(a["createVNode"])("li",p,[Object(a["createVNode"])("span",m,[Object(a["createVNode"])(z,{icon:"user",type:"far",class:"account-icon"})]),Object(a["createVNode"])("span",f,Object(a["toDisplayString"])(e.user.name),1)])])]),Object(a["createVNode"])("div",b,[Object(a["createVNode"])("div",O,[j,Object(a["createVNode"])("p",null,Object(a["toDisplayString"])(e.user.description||"Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, libero maiores. Recusandae facilis, non est fuga quis dolorem voluptas culpa cum, blanditiis nemo ad in commodi molestias dolore distinctio repellat."),1)])])]),Object(a["createVNode"])("div",v,[Object(a["createVNode"])("form",{class:"p-3 m-2 dashboard-morph",onSubmit:t[5]||(t[5]=Object(a["withModifiers"])((function(){return e.updateUserInfo&&e.updateUserInfo.apply(e,arguments)}),["prevent"]))},[Object(a["createVNode"])("div",w,[V,Object(a["withDirectives"])(Object(a["createVNode"])("input",{class:"form-control",id:"user-name","onUpdate:modelValue":t[2]||(t[2]=function(t){return e.name=t})},null,512),[[a["vModelText"],e.name]]),N]),Object(a["createVNode"])("div",x,[g,Object(a["withDirectives"])(Object(a["createVNode"])("input",{type:"email",class:"form-control",id:"user-email","onUpdate:modelValue":t[3]||(t[3]=function(t){return e.email=t})},null,512),[[a["vModelText"],e.email]]),h]),Object(a["createVNode"])("div",y,[U,Object(a["withDirectives"])(Object(a["createVNode"])("textarea",{class:"form-control",id:"user-desc","onUpdate:modelValue":t[4]||(t[4]=function(t){return e.description=t})},null,512),[[a["vModelText"],e.description]]),C]),Object(a["createVNode"])("div",D,[Object(a["createVNode"])(G,{class:"ml-auto",type:"submit"},{default:c((function(){return[k]})),_:1})])],32)]),Object(a["createVNode"])("div",E,[Object(a["createVNode"])("form",{class:"p-3 m-2 dashboard-morph",onSubmit:t[9]||(t[9]=Object(a["withModifiers"])((function(){return e.passwordUpdate&&e.passwordUpdate.apply(e,arguments)}),["prevent"]))},[Object(a["createVNode"])("div",S,[T,Object(a["withDirectives"])(Object(a["createVNode"])("input",{type:"password",class:"form-control",id:"user-old-password","onUpdate:modelValue":t[6]||(t[6]=function(t){return e.oldPass=t})},null,512),[[a["vModelText"],e.oldPass]]),I]),Object(a["createVNode"])("div",M,[H,Object(a["withDirectives"])(Object(a["createVNode"])("input",{type:"password",class:"form-control",id:"user-password","onUpdate:modelValue":t[7]||(t[7]=function(t){return e.password=t})},null,512),[[a["vModelText"],e.password]]),P]),Object(a["createVNode"])("div",R,[_,Object(a["withDirectives"])(Object(a["createVNode"])("input",{type:"password",class:"form-control",id:"user-password-confirm","onUpdate:modelValue":t[8]||(t[8]=function(t){return e.passwordConfirm=t})},null,512),[[a["vModelText"],e.passwordConfirm]]),B]),Object(a["createVNode"])("div",A,[Object(a["createVNode"])(G,{class:"ml-auto",type:"submit"},{default:c((function(){return[J]})),_:1})])],32)])],64)})),F=r("1da1"),L=(r("96cf"),r("c1f9"),r("4de4"),r("4fad"),r("5502")),z=r("79f6"),G=r("6c42"),K=r("0b26"),Q=r("6f93"),W=Object(a["defineComponent"])({components:{Button:Q["a"]},setup:function(){var e=Object(L["b"])(),t=Object(G["b"])(),r=Object(a["ref"])(""),c=Object(a["ref"])(""),o=Object(a["ref"])(""),s=Object(a["ref"])(""),n=Object(a["ref"])(""),d=Object(a["ref"])(""),i=function(){var a=Object(F["a"])(regeneratorRuntime.mark((function a(){var s,n,d,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return s=function(e){return Object.fromEntries(Object.entries(e).filter((function(e){return e[1]})))},n={name:r.value,email:c.value,description:o.value},d=s(n),a.prev=3,t.info("Updating new info"),a.next=7,Object(z["y"])(d);case 7:i=a.sent,200===i.status&&(e.dispatch("setUser",i.data.data.user),t.success("Info updated")),a.next=14;break;case 11:a.prev=11,a.t0=a["catch"](3),t.error(a.t0.response.data.message);case 14:case"end":return a.stop()}}),a,null,[[3,11]])})));return function(){return a.apply(this,arguments)}}(),l=function(){var e=Object(F["a"])(regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,r={oldpass:d.value,newpass:s.value,passwordConfirm:n.value},e.next=4,Object(z["w"])(r);case 4:a=e.sent,200===a.status&&(t.success("Password changed"),s.value="",n.value="",d.value=""),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),t.error(e.t0.response.data.message);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),u=function(){K["a"].emit("Cropper-open")},p=Object(a["computed"])((function(){return e.getters.getUser}));return{user:p,passwordUpdate:l,name:r,email:c,description:o,password:s,passwordConfirm:n,updateUserInfo:i,oldPass:d,cropperOpen:u}}});r("d307");W.render=q,W.__scopeId="data-v-098d4104";t["default"]=W},"6f53":function(e,t,r){var a=r("83ab"),c=r("df75"),o=r("fc6a"),s=r("d1e7").f,n=function(e){return function(t){var r,n=o(t),d=c(n),i=d.length,l=0,u=[];while(i>l)r=d[l++],a&&!s.call(n,r)||u.push(e?[r,n[r]]:n[r]);return u}};e.exports={entries:n(!0),values:n(!1)}},c1f9:function(e,t,r){var a=r("23e7"),c=r("2266"),o=r("8418");a({target:"Object",stat:!0},{fromEntries:function(e){var t={};return c(e,(function(e,r){o(t,e,r)}),{AS_ENTRIES:!0}),t}})},d307:function(e,t,r){"use strict";r("33b9")}}]);
//# sourceMappingURL=Account.5b4b959c.js.map