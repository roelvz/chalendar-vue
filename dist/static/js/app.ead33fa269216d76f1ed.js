webpackJsonp([1],{"7zck":function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("7+uW"),r=n("Dd8w"),o=n.n(r),s=n("NYxO"),i=n("ytdl"),c=n.n(i),l=(n("mtWM"),n("6hKT")),d=n("/ocq"),u=(n("cHfL"),n("Zx67")),v=n.n(u),h=n("Zrlr"),f=n.n(h),p=n("wxAW"),m=n.n(p),b=n("zwoO"),g=n.n(b),_=n("Pf15"),k=n.n(_),C=(n("mtWM"),function(){function e(){f()(this,e),this.baseUri="https://challendar.herokuapp.com/api/"}return m()(e,null,[{key:"buildHeaders",value:function(){return{headers:{Authorization:"Bearer "+L()}}}}]),e}()),x=n("mtWM"),y=function(e){function t(){f()(this,t);var e=g()(this,(t.__proto__||v()(t)).call(this));return e.baseUri+="Chatters",e}return k()(t,e),m()(t,[{key:"chatterExists",value:function(e){return x.get(this.baseUri+"/"+e+"/exists",C.buildHeaders()).then(function(e){return e.data})}},{key:"getChatters",value:function(){return x.get(""+this.baseUri,C.buildHeaders()).then(function(e){return e.data})}},{key:"getChatter",value:function(e){return x.get(this.baseUri+"/"+e,C.buildHeaders()).then(function(e){return e.data})}},{key:"getGroups",value:function(e){return x.get(this.baseUri+"/"+e+"/groups",C.buildHeaders()).then(function(e){return e.data})}},{key:"getCalendars",value:function(e){return x.get(this.baseUri+"/"+e+"/calendars",C.buildHeaders()).then(function(e){return e.data})}},{key:"postChatter",value:function(e){var t=e.sub,n=e.email,a=e.given_name,r=e.family_name,o=e.picture;return x({method:"post",url:""+this.baseUri,headers:{authorization:"Bearer "+L()},data:{id:t,email:n,firstName:a,lastName:r,picture:o}}).then(function(e){return e.data})}},{key:"putChatter",value:function(e){var t=e.sub,n=e.email,a=e.given_name,r=e.family_name,o=e.picture;return a||(a=r||(n||"Unknown")),x({method:"put",url:""+this.baseUri,headers:{authorization:"Bearer "+L()},data:{id:t,email:n,firstName:a,lastName:r,picture:o}})}}]),t}(C),E="id_token",G="access_token",M="https://challendar-ui.herokuapp.com/callback",w="openid profile email",U="https://chalendar.com/",S=new y,A=new l.default.WebAuth({clientID:"26K0G3dpKG3JVSMgDUCM2c4OUoxsDZY1",domain:"chalendar.eu.auth0.com"});new d.a({mode:"history"});function I(){localStorage.removeItem(E),localStorage.removeItem(G),window.location.href="/"}function L(){return localStorage.getItem(G)}function O(e){var t=RegExp("[#&]"+e+"=([^&]*)").exec(window.location.hash);return t&&decodeURIComponent(t[1].replace(/\+/g," "))}function T(e){A.client.userInfo(L(),function(t,n){e.$store.commit("userStore/setUserInfo",n),S.putChatter(n).catch(function(e){console.error(e.response?e.response:e)})})}function N(){var e,t=localStorage.getItem(E);return!(!t||(e=t,function(e){var t=c()(e);if(!t.exp)return null;var n=new Date(0);return n.setUTCSeconds(t.exp),n}(e)<new Date))}var j={name:"Group",data:function(){return{inputMessage:""}},created:function(){this.loadGroup(this.$route.params.id)},methods:o()({sendMessage:function(){this.postMessage(this.inputMessage).then(this.inputMessage="")}},Object(s.b)("groupStore",["loadGroup","postMessage"])),computed:Object(s.d)({loadedGroup:function(e){return e.groupStore.loadedGroup}})},H={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{fluid:""}},[n("h1",[e._v(e._s(e.loadedGroup.name))]),e._v(" "),n("v-list",[n("v-divider"),e._v(" "),e._l(e.loadedGroup.messages,function(t){return[n("v-list-tile",{key:t.id,on:{click:function(e){}}},[n("v-list-tile-avatar",[n("img",{attrs:{src:t.creatorPicture}})]),e._v(" "),n("v-list-tile-content",[n("v-list-tile-title",[e._v(e._s(t.text))]),e._v(" "),n("v-list-tile-sub-title",[n("timeago",{attrs:{datetime:t.creationDate}})],1)],1)],1),e._v(" "),n("v-divider")]})],2),e._v(" "),n("v-form",{staticClass:"pt-3"},[n("v-layout",{attrs:{column:""}},[n("v-layout",[n("v-textarea",{attrs:{rows:"1","single-line":"",box:"",label:"Enter your message ...",name:"inputMessage"},model:{value:e.inputMessage,callback:function(t){e.inputMessage=t},expression:"inputMessage"}}),e._v(" "),n("v-btn",{on:{click:function(t){e.sendMessage()}}},[e._v("Send")])],1)],1)],1)],1)},staticRenderFns:[]};var $=n("VU/8")(j,H,!1,function(e){n("UKxm")},"data-v-04e843a8",null).exports,R={name:"App",components:{Group:$},data:function(){return{drawer:null}},mounted:function(){N()&&T(this)},methods:o()({handleLogin:function(){A.authorize({responseType:"token id_token",redirectUri:M,audience:U,scope:w}),N()&&T(this)},handleLogout:function(){I()},shouldLogin:function(){return!N()},isAdmin:function(){return this.userInfo&&"facebook|10217066011620498"===this.userInfo.sub},toGroup:function(e){return"/group/"+e},toCalendar:function(e){return"/calendar/"+e}},Object(s.b)("groupStore",["initGroups"]),Object(s.b)("calendarStore",["initCalendars"])),computed:Object(s.d)({userInfo:function(e){return e.userStore.userInfo},groups:function(e){return e.groupStore.groups},calendars:function(e){return e.calendarStore.calendars}}),watch:{userInfo:function(e){e&&(this.initGroups(this.userInfo),this.initCalendars(this.userInfo))}}},z={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{attrs:{dark:""}},[n("v-navigation-drawer",{attrs:{clipped:e.$vuetify.breakpoint.mdAndUp,app:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[n("v-divider"),e._v(" "),e.shouldLogin()?e._e():n("v-list",{staticClass:"pt-0",attrs:{dense:""}},e._l(e.groups,function(t){return n("v-list-tile",{key:t.id,attrs:{to:e.toGroup(t.id)},on:{click:function(e){}}},[n("v-list-tile-action",[n("v-icon",[e._v("group")])],1),e._v(" "),n("v-list-tile-content",[n("v-list-tile-title",[e._v(e._s(t.name))])],1)],1)})),e._v(" "),e.shouldLogin()?e._e():n("v-list",{staticClass:"pt-0",attrs:{dense:""}},e._l(e.calendars,function(t){return n("v-list-tile",{key:t.id,attrs:{to:e.toCalendar(t.id)},on:{click:function(e){}}},[n("v-list-tile-action",[n("v-icon",[e._v("calendar_today")])],1),e._v(" "),n("v-list-tile-content",[n("v-list-tile-title",[e._v(e._s(t.name))])],1)],1)})),e._v(" "),e.isAdmin()?n("v-list",[n("v-list-tile",{attrs:{to:"/admin"}},[n("v-list-tile-action",[n("v-icon",[e._v("settings")])],1),e._v(" "),n("v-list-tile-content",[n("v-list-tile-title",[e._v("Admin")])],1)],1)],1):e._e()],1),e._v(" "),n("v-toolbar",{attrs:{app:"","clipped-left":e.$vuetify.breakpoint.mdAndUp,fixed:""}},[n("v-toolbar-title",[n("v-toolbar-side-icon",{on:{click:function(t){t.stopPropagation(),e.drawer=!e.drawer}}}),e._v(" "),n("span",[n("a",{attrs:{href:"/"}},[e._v("Chalendar")])])],1),e._v(" "),e.shouldLogin()?n("v-toolbar-title",[n("v-btn",{on:{click:function(t){e.handleLogin()}}},[e._v("Login")])],1):e._e(),e._v(" "),n("v-spacer"),e._v(" "),e.userInfo?n("v-toolbar-title",[n("v-avatar",{attrs:{tile:!1,size:"56px",color:"grey lighten-4"}},[n("img",{attrs:{src:e.userInfo.picture,alt:"avatar"}})])],1):e._e(),e._v(" "),e.shouldLogin()?e._e():n("v-btn",{on:{click:function(t){e.handleLogout()}}},[e._v("Logout")])],1),e._v(" "),n("v-content",[n("router-view")],1),e._v(" "),n("v-footer",{attrs:{fixed:"",app:""}},[n("span",[e._v("© 2018 - Roel Van Zeebroeck")])])],1)},staticRenderFns:[]};var D=n("VU/8")(R,z,!1,function(e){n("inba")},"data-v-d09cfc66",null).exports,P={name:"Main",components:{Group:$},data:function(){return{checked:!0}},methods:o()({},Object(s.b)("auth",["isLoggedIn"]))},F={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{fluid:""}},[n("h1",[e._v("Checklist")]),e._v(" "),n("v-checkbox",{attrs:{label:"Login",readonly:""},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}}),e._v(" "),n("v-checkbox",{attrs:{label:"Post messages in chat",readonly:""},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}}),e._v(" "),n("v-checkbox",{attrs:{label:"Post events in Calendar",readonly:""},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}}),e._v(" "),n("v-checkbox",{attrs:{label:"Post messages on events",readonly:""},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}}),e._v(" "),n("v-checkbox",{attrs:{label:"Desktop and mobile",readonly:""},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}}),e._v(" "),n("v-checkbox",{attrs:{label:"Make sure app can be tested locally",readonly:""},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}}),e._v(" "),n("v-checkbox",{attrs:{label:"Bug: when switching between events, messages from the previous event are shown briefly",readonly:""},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}}),e._v(" "),n("v-checkbox",{attrs:{label:"Bug: chat/calendar items on the left sometimes not shown",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Bug: cannot enter enters in messages",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Make the ENTER key send the message by default",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Introduce Chat model",readonly:""},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}}),e._v(" "),n("v-checkbox",{attrs:{label:"Test API without having to login each time",readonly:""},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}}),e._v(" "),n("v-checkbox",{attrs:{label:"Show # of unread items per chat",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Notifications",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"User rights: people should be invited to a chat/calendar before they can read/write",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Choose a catchy name :)",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Going/Not going",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Calendar: don't show old events",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Chats: don't show old messages",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Chats: don't abbreviate messages",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Chats: add date to messages",readonly:""},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}}),e._v(" "),n("v-checkbox",{attrs:{label:"Make calendar events look nicer",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Realtime chat (someone is typing ...)",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Likes",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Edit messages",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Edit events",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Event locations",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Chats: add @ pointers to people",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Create new chats",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Create new calendars",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Rate passed events",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"User profile management",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Native android app",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Native iOS app",readonly:""}})],1)},staticRenderFns:[]};var B=n("VU/8")(P,F,!1,function(e){n("iJsJ")},"data-v-74e1c231",null).exports,V={name:"Calendar",created:function(){this.loadCalendar(this.$route.params.id)},methods:o()({toAddEvent:function(){return"/calendar/"+this.$route.params.id+"/event/add"},toEvent:function(e){return"/calendar/"+this.$route.params.id+"/event/"+e}},Object(s.b)("calendarStore",["loadCalendar"])),computed:Object(s.d)({loadedCalendar:function(e){return e.calendarStore.loadedCalendar}})},W={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{fluid:""}},[n("h1",[e._v(e._s(e.loadedCalendar.name))]),e._v(" "),n("v-btn",{attrs:{to:e.toAddEvent()}},[e._v("Add event")]),e._v(" "),n("v-list",[n("v-divider"),e._v(" "),e._l(e.loadedCalendar.events,function(t){return[n("v-list-tile",{key:t.id,attrs:{to:e.toEvent(t.id)}},[n("v-list-tile-content",[n("v-list-tile-title",[e._v(e._s(new Date(t.date).toDateString())+": "+e._s(t.name))])],1)],1),e._v(" "),n("v-divider")]})],2),e._v(" "),n("v-btn",{attrs:{to:e.toAddEvent()}},[e._v("Add event")])],1)},staticRenderFns:[]};var J=n("VU/8")(V,W,!1,function(e){n("NPXp")},"data-v-7c9eeda7",null).exports,K={name:"Event",data:function(){return{inputMessage:""}},created:function(){this.setLoadedEvent(void 0),this.loadEvent(this.$route.params.id)},methods:o()({sendMessage:function(){this.postMessage(this.inputMessage).then(this.inputMessage="")}},Object(s.b)("calendarStore",["loadEvent","postMessage"]),Object(s.c)("calendarStore",["setLoadedEvent"])),computed:Object(s.d)({loadedEvent:function(e){return e.calendarStore.loadedEvent}})},X={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.loadedEvent?n("v-container",{attrs:{fluid:""}},[n("h1",[e._v(e._s(new Date(e.loadedEvent.date).toLocaleDateString())+": "+e._s(e.loadedEvent.name))]),e._v(" "),n("v-list",[n("v-divider"),e._v(" "),e._l(e.loadedEvent.messages,function(t){return[n("v-list-tile",{key:t.id,on:{click:function(e){}}},[n("v-list-tile-avatar",[n("img",{attrs:{src:t.creatorPicture}})]),e._v(" "),n("v-list-tile-content",[n("v-list-tile-title",[e._v(e._s(t.text))]),e._v(" "),n("v-list-tile-sub-title",[n("timeago",{attrs:{datetime:t.creationDate}})],1)],1)],1),e._v(" "),n("v-divider")]})],2),e._v(" "),n("v-form",{staticClass:"pt-3"},[n("v-layout",{attrs:{column:""}},[n("v-layout",[n("v-textarea",{attrs:{rows:"1","single-line":"",box:"",label:"Enter your message ...",name:"inputMessage"},model:{value:e.inputMessage,callback:function(t){e.inputMessage=t},expression:"inputMessage"}}),e._v(" "),n("v-btn",{on:{click:function(t){e.sendMessage()}}},[e._v("Send")])],1)],1)],1)],1):e._e()},staticRenderFns:[]};var Z=n("VU/8")(K,X,!1,function(e){n("lKTR")},"data-v-6af2c127",null).exports,Q={name:"AddEvent",data:function(){return{name:"",description:"",date:""}},methods:o()({addEvent:function(){var e=this;this.postEvent([this.name,this.description,this.date]).then(function(){return e.$router.push({path:e.toCalendar()})})},toCalendar:function(){return"/calendar/"+this.loadedCalendar.id}},Object(s.b)("calendarStore",["postEvent"])),computed:Object(s.d)({loadedCalendar:function(e){return e.calendarStore.loadedCalendar}})},Y={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{fluid:"","grid-list-xl":""}},[n("v-form",[n("v-text-field",{attrs:{label:"name"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),n("v-textarea",{attrs:{label:"description"},model:{value:e.description,callback:function(t){e.description=t},expression:"description"}}),e._v(" "),n("v-date-picker",{attrs:{label:"date"},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}}),e._v(" "),n("v-btn",{on:{click:function(t){e.addEvent()}}},[e._v("Save")]),e._v(" "),n("v-btn",{attrs:{to:e.toCalendar()}},[e._v("Cancel")])],1)],1)},staticRenderFns:[]};var q=n("VU/8")(Q,Y,!1,function(e){n("dFzX")},"data-v-531e4889",null).exports,ee={name:"Admin",data:function(){return{selectedChatter:void 0,selectedGroup:void 0,selectedCalendar:void 0}},mounted:function(){this.initAllChatters(),this.initAllGroups(),this.initAllCalendars()},methods:o()({isAdmin:function(){return this.userInfo&&"facebook|10217066011620498"===this.userInfo.sub},addToGroup:function(){this.addChatterToGroup([this.selectedGroup.id,this.selectedChatter.id])},addToCalendar:function(){this.addChatterToCalendar([this.selectedCalendar,this.selectedChatter])}},Object(s.b)("userStore",["initAllChatters"]),Object(s.b)("groupStore",["initAllGroups","addChatterToGroup"]),Object(s.b)("calendarStore",["initAllCalendars","addChatterToCalendar"])),computed:Object(s.d)({userInfo:function(e){return e.userStore.userInfo},allChatters:function(e){return e.userStore.allChatters},allGroups:function(e){return e.groupStore.allGroups},allCalendars:function(e){return e.calendarStore.allCalendars}})},te={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.isAdmin()?n("v-container",[n("v-form",[n("v-select",{attrs:{label:"user","item-text":"firstName","item-value":"id",items:e.allChatters},model:{value:e.selectedChatter,callback:function(t){e.selectedChatter=t},expression:"selectedChatter"}}),e._v(" "),n("v-select",{attrs:{label:"group","item-text":"name","item-value":"id",items:e.allGroups},model:{value:e.selectedGroup,callback:function(t){e.selectedGroup=t},expression:"selectedGroup"}}),e._v(" "),n("v-btn",{on:{click:function(t){e.addToGroup()}}},[e._v("Add user to group")]),e._v(" "),n("v-select",{attrs:{label:"calendar","item-text":"name","item-value":"id",items:e.allCalendars},model:{value:e.selectedCalendar,callback:function(t){e.selectedCalendar=t},expression:"selectedCalendar"}}),e._v(" "),n("v-btn",{on:{click:function(t){e.addToCalendar()}}},[e._v("Add user to calendar")])],1)],1):e._e()},staticRenderFns:[]};var ne=n("VU/8")(ee,te,!1,function(e){n("QbLa")},"data-v-04626082",null).exports,ae={name:"",mounted:function(){var e=this;this.$nextTick(function(){var t,n;t=O("access_token"),localStorage.setItem(G,t),n=O("id_token"),localStorage.setItem(E,n),T(e)}),window.location.href="/"}},re={render:function(){var e=this.$createElement;return(this._self._c||e)("div")},staticRenderFns:[]},oe=n("VU/8")(ae,re,!1,null,null,null).exports;a.default.use(d.a);var se=new d.a({mode:"history",routes:[{path:"/",name:"Main",component:B},{path:"/callback",name:"Callback",component:oe},{path:"/group/:id",name:"Group",component:$},{path:"/calendar/:id",name:"Calendar",component:J},{path:"/calendar/:calendarId/event/add",name:"AddEvent",component:q},{path:"/calendar/:calendarId/event/:id",name:"Event",component:Z},{path:"/admin",name:"Admin",component:ne}]}),ie=n("d7EF"),ce=n.n(ie),le=n("//Fk"),de=n.n(le),ue=n("mtWM"),ve=function(e){function t(){f()(this,t);var e=g()(this,(t.__proto__||v()(t)).call(this));return e.baseUri+="Groups",e}return k()(t,e),m()(t,[{key:"getGroups",value:function(){return ue.get(this.baseUri,C.buildHeaders()).then(function(e){return e.data})}},{key:"getGroup",value:function(e){return ue.get(this.baseUri+"/"+e,C.buildHeaders()).then(function(e){return e.data})}},{key:"getChat",value:function(e){return ue.get(this.baseUri+"/"+e+"/chat",C.buildHeaders()).then(function(e){return e.data})}},{key:"addMember",value:function(e,t){return ue({method:"put",url:this.baseUri+"/"+e+"/members/rel/"+t,headers:{authorization:"Bearer "+L()}}).then(function(e){return e.data})}}]),t}(C),he=n("mtWM"),fe=function(e){function t(){f()(this,t);var e=g()(this,(t.__proto__||v()(t)).call(this));return e.baseUri+="Chats",e}return k()(t,e),m()(t,[{key:"getMessages",value:function(e){return he.get(this.baseUri+"/"+e+"/messages",C.buildHeaders()).then(function(e){return e.data})}},{key:"postMessage",value:function(e,t){return he({method:"post",url:this.baseUri+"/"+e+"/messages",headers:{authorization:"Bearer "+L()},data:{text:t}}).then(function(e){return e.data})}}]),t}(C),pe=new ve,me=new y,be=new fe;function ge(e){return me.getChatter(e.creatorId).then(function(t){e.creatorName=t.firstName,e.creatorPicture=t.picture})}var _e={namespaced:!0,state:{allGroups:[],groups:[],loadedGroup:{chatId:void 0,messages:[]}},getters:{},actions:{initAllGroups:function(e){var t=e.commit;pe.getGroups().then(function(e){t("setAllGroups",e)}).catch(function(e){console.error(e.response?e.response:e)})},initGroups:function(e,t){var n=e.commit;e.state;me.getGroups(t.sub).then(function(e){n("setGroups",e)}).catch(function(e){console.error(e.response?e.response:e)})},loadGroup:function(e,t){var n=e.commit,a={},r=[];pe.getGroup(t).then(function(e){return a=e,pe.getChat(e.id)}).then(function(e){return a.chatId=e.id,be.getMessages(e.id)}).then(function(e){for(var t=0;t<e.length;t++){var n=e[t];r.push(ge(n))}a.messages=e}).then(function(e){de.a.all(r).then(function(){n("setLoadedGroup",a)})}).catch(function(e){console.error(e.response?e.response:e)})},postMessage:function(e,t){var n=e.commit,a=e.state;e.rootState;a.loadedGroup?be.postMessage(a.loadedGroup.chatId,t).then(function(e){ge(e).then(function(){return n("addMessage",e)})}).catch(function(e){console.error(e.response?e.response:e)}):console.error("Could not post message: no group loaded")},addChatterToGroup:function(e,t){e.commit;var n=ce()(t,2),a=n[0],r=n[1];a&&r&&pe.addMember(a,r).catch(function(e){console.error(e.response?e.response:e)})}},mutations:{setAllGroups:function(e,t){e.allGroups=t},setGroups:function(e,t){e.groups=t},setLoadedGroup:function(e,t){e.loadedGroup=t},addMessage:function(e,t){e.loadedGroup.messages.push(t)},reset:function(e){e.groups=[],e.loadedGroup={chatId:void 0,messages:[]}}}},ke=n("mtWM"),Ce=function(e){function t(){f()(this,t);var e=g()(this,(t.__proto__||v()(t)).call(this));return e.baseUri+="Calendars",e}return k()(t,e),m()(t,[{key:"getCalendars",value:function(){return ke.get(this.baseUri,C.buildHeaders()).then(function(e){return e.data})}},{key:"getCalendar",value:function(e){return ke.get(this.baseUri+"/"+e,C.buildHeaders()).then(function(e){return e.data})}},{key:"getEvents",value:function(e){return ke.get(this.baseUri+"/"+e+'/events?filter={"order": "date"}',C.buildHeaders()).then(function(e){return e.data})}},{key:"postEvent",value:function(e,t){var n=ce()(t,3),a=n[0],r=n[1],o=n[2];return ke({method:"post",url:this.baseUri+"/"+e+"/events",headers:{authorization:"Bearer "+L()},data:{name:a,description:r,date:o}}).then(function(e){return e.data})}},{key:"addMember",value:function(e,t){return ke({method:"put",url:this.baseUri+"/"+e+"/members/rel/"+t,headers:{authorization:"Bearer "+L()}}).then(function(e){return e.data})}}]),t}(C),xe=n("mtWM"),ye=function(e){function t(){f()(this,t);var e=g()(this,(t.__proto__||v()(t)).call(this));return e.baseUri+="Events",e}return k()(t,e),m()(t,[{key:"getEvent",value:function(e){return xe.get(this.baseUri+"/"+e,C.buildHeaders()).then(function(e){return e.data})}},{key:"getChat",value:function(e){return xe.get(this.baseUri+"/"+e+"/chat",C.buildHeaders()).then(function(e){return e.data})}},{key:"postChat",value:function(e){return xe({method:"post",url:this.baseUri+"/"+e+"/chat",headers:{authorization:"Bearer "+L()}}).then(function(e){return e.data})}}]),t}(C),Ee=new Ce,Ge=new ye,Me=new y,we=new fe;function Ue(e){return Me.getChatter(e.creatorId).then(function(t){e.creatorName=t.firstName,e.creatorPicture=t.picture})}var Se={namespaced:!0,state:{allCalendars:[],calendars:[],loadedCalendar:{events:[]},loadedEvent:{chatId:void 0,messages:[]}},getters:{},actions:{initAllCalendars:function(e){var t=e.commit;Ee.getCalendars().then(function(e){t("setAllCalendars",e)}).catch(function(e){console.error(e.response?e.response:e)})},initCalendars:function(e,t){var n=e.commit;Me.getCalendars(t.sub).then(function(e){n("setCalendars",e)}).catch(function(e){console.error(e.response?e.response:e)})},loadCalendar:function(e,t){var n=e.commit,a={},r=[];Ee.getCalendar(t).then(function(e){return a=e,Ee.getEvents(e.id)}).then(function(e){a.events=e}).then(function(e){de.a.all(r).then(function(){n("setLoadedCalendar",a)})}).catch(function(e){console.error(e.response?e.response:e)})},loadEvent:function(e,t){var n=e.commit,a={},r=[];return Ge.getEvent(t).then(function(e){return a=e,Ge.getChat(e.id)}).then(function(e){return a.chatId=e.id,we.getMessages(e.id)}).then(function(e){for(var t=0;t<e.length;t++){var n=e[t];r.push(Ue(n))}a.messages=e}).then(function(e){de.a.all(r).then(function(){n("setLoadedEvent",a)})}).catch(function(e){console.error(e.response?e.response:e)})},postEvent:function(e,t){var n=e.commit,a=e.state,r=(e.rootState,ce()(t,3)),o=r[0],s=r[1],i=r[2];a.loadedCalendar?Ee.postEvent(a.loadedCalendar.id,[o,s,i]).then(function(e){Ge.postChat(e.id),n("addEvent",e)}).catch(function(e){console.error(e.response?e.response:e)}):console.error("Could not post event: no calendar loaded")},postMessage:function(e,t){var n=e.commit,a=e.state;e.rootState;a.loadedEvent?we.postMessage(a.loadedEvent.chatId,t).then(function(e){Ue(e).then(function(){return n("addMessage",e)})}).catch(function(e){console.error(e.response?e.response:e)}):console.error("Could not post message: no event loaded")},addChatterToCalendar:function(e,t){e.commit;var n=ce()(t,2),a=n[0],r=n[1];a&&r&&Ee.addMember(a,r).catch(function(e){console.error(e.response?e.response:e)})}},mutations:{setAllCalendars:function(e,t){e.allCalendars=t},setCalendars:function(e,t){e.calendars=t},setLoadedCalendar:function(e,t){e.loadedCalendar=t},setLoadedEvent:function(e,t){e.loadedEvent=t},addEvent:function(e,t){e.loadedCalendar.events.push(t)},addMessage:function(e,t){e.loadedEvent.messages.push(t)},reset:function(e){e.calendars=[],e.loadedCalendar={events:[]},e.loadedEvent={chatId:void 0,messages:[]}}}},Ae=new y,Ie={namespaced:!0,state:{allChatters:[],userInfo:void 0},actions:{initAllChatters:function(e){var t=e.commit;Ae.getChatters().then(function(e){t("setAllChatters",e)}).catch(function(e){console.error(e.response?e.response:e)})}},mutations:{setAllChatters:function(e,t){e.allChatters=t},setUserInfo:function(e,t){e.userInfo=t},reset:function(e){e.allChatters=[],e.userInfo=void 0}}};a.default.use(s.a);var Le=new s.a.Store({modules:{userStore:Ie,groupStore:_e,calendarStore:Se},strict:!1,actions:{clearAll:function(e){var t=e.commit;t("groupStore/reset"),t("calendarStore/reset"),t("userStore/reset")}}}),Oe=n("3EgV"),Te=n.n(Oe),Ne=(n("7zck"),n("J/A3"));a.default.use(Te.a),a.default.use(Ne.a,{name:"Timeago",locale:"en",locales:{"en-US":n("uyaC")}}),a.default.config.productionTip=!1,new a.default({el:"#app",router:se,store:Le,components:{App:D},template:"<App/>"})},NPXp:function(e,t){},QbLa:function(e,t){},UKxm:function(e,t){},dFzX:function(e,t){},iJsJ:function(e,t){},inba:function(e,t){},lKTR:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.ead33fa269216d76f1ed.js.map