webpackJsonp([1],{"5xYZ":function(e,t){},"7zck":function(e,t){},DdlD:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("7+uW"),r=n("Dd8w"),o=n.n(r),s=n("NYxO"),i=n("ytdl"),c=n.n(i),l=(n("mtWM"),n("6hKT")),d=n("/ocq"),u=(n("cHfL"),n("Zx67")),v=n.n(u),h=n("Zrlr"),p=n.n(h),f=n("wxAW"),m=n.n(f),b=n("zwoO"),g=n.n(b),_=n("Pf15"),k=n.n(_),x=(n("mtWM"),function(){function e(){p()(this,e),this.baseUri="https://challendar.herokuapp.com/api/"}return m()(e,null,[{key:"buildHeaders",value:function(){return{headers:{Authorization:"Bearer "+N()}}}}]),e}()),y=n("mtWM"),C=function(e){function t(){p()(this,t);var e=g()(this,(t.__proto__||v()(t)).call(this));return e.baseUri+="Chatters",e}return k()(t,e),m()(t,[{key:"chatterExists",value:function(e){return y.get(this.baseUri+"/"+e+"/exists",x.buildHeaders()).then(function(e){return e.data})}},{key:"getChatter",value:function(e){return y.get(this.baseUri+"/"+e,x.buildHeaders()).then(function(e){return e.data})}},{key:"postChatter",value:function(e){var t=e.sub,n=e.email,a=e.given_name,r=e.family_name,o=e.picture;return y({method:"post",url:""+this.baseUri,headers:{authorization:"Bearer "+N()},data:{id:t,email:n,firstName:a,lastName:r,picture:o}})}},{key:"putChatter",value:function(e){var t=e.sub,n=e.email,a=e.given_name,r=e.family_name,o=e.picture;return a||(a=r||(n||"Unknown")),y({method:"put",url:""+this.baseUri,headers:{authorization:"Bearer "+N()},data:{id:t,email:n,firstName:a,lastName:r,picture:o}})}}]),t}(x),E="id_token",M="access_token",w="https://challendar-ui.herokuapp.com/callback",S="openid profile email",U="https://chalendar.com/",G=new C,I=new l.default.WebAuth({clientID:"26K0G3dpKG3JVSMgDUCM2c4OUoxsDZY1",domain:"chalendar.eu.auth0.com"});new d.a({mode:"history"});function L(){localStorage.removeItem(E),localStorage.removeItem(M),window.location.href="/"}function N(){return localStorage.getItem(M)}function O(e){var t=RegExp("[#&]"+e+"=([^&]*)").exec(window.location.hash);return t&&decodeURIComponent(t[1].replace(/\+/g," "))}function $(e){I.client.userInfo(N(),function(t,n){e.$store.commit("userStore/setUserInfo",n),G.putChatter(n).catch(function(e){console.error(e.response?e.response:e)})})}function A(){var e,t=localStorage.getItem(E);return!(!t||(e=t,function(e){var t=c()(e);if(!t.exp)return null;var n=new Date(0);return n.setUTCSeconds(t.exp),n}(e)<new Date))}var R={name:"Group",data:function(){return{inputMessage:""}},created:function(){this.loadGroup(this.$route.params.id)},methods:o()({sendMessage:function(){this.postMessage(this.inputMessage).then(this.inputMessage="")}},Object(s.b)("groupStore",["loadGroup","postMessage"])),computed:Object(s.d)({loadedGroup:function(e){return e.groupStore.loadedGroup}})},D={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{fluid:""}},[n("h1",[e._v(e._s(e.loadedGroup.name))]),e._v(" "),n("v-list",[n("v-divider"),e._v(" "),e._l(e.loadedGroup.messages,function(t){return[n("v-list-tile",{key:t.id,on:{click:function(e){}}},[n("v-list-tile-avatar",[n("img",{attrs:{src:t.creatorPicture}})]),e._v(" "),n("v-list-tile-content",[n("v-list-tile-title",[e._v(e._s(t.text))]),e._v(" "),n("v-list-tile-sub-title",[e._v("By "+e._s(t.creatorName))])],1)],1),e._v(" "),n("v-divider")]})],2),e._v(" "),n("v-form",{staticClass:"pt-3"},[n("v-layout",{attrs:{column:""}},[n("v-layout",[n("v-textarea",{attrs:{rows:"1","single-line":"",box:"",label:"Enter your message ...",name:"inputMessage"},model:{value:e.inputMessage,callback:function(t){e.inputMessage=t},expression:"inputMessage"}}),e._v(" "),n("v-btn",{on:{click:function(t){e.sendMessage()}}},[e._v("Send")])],1)],1)],1)],1)},staticRenderFns:[]};var j=n("VU/8")(R,D,!1,function(e){n("VmP+")},"data-v-40de2760",null).exports,H={name:"App",components:{Group:j},data:function(){return{drawer:null}},mounted:function(){A()&&($(this),this.initGroups(),this.initCalendars())},methods:o()({handleLogin:function(){I.authorize({responseType:"token id_token",redirectUri:w,audience:U,scope:S}),A()&&($(this),this.initGroups(),this.initCalendars())},handleLogout:function(){L()},shouldLogin:function(){return!A()},toGroup:function(e){return"/group/"+e},toCalendar:function(e){return"/calendar/"+e}},Object(s.b)("groupStore",["initGroups"]),Object(s.b)("calendarStore",["initCalendars"])),computed:Object(s.d)({userInfo:function(e){return e.userStore.userInfo},groups:function(e){return e.groupStore.groups},calendars:function(e){return e.calendarStore.calendars}})},P={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{attrs:{dark:""}},[n("v-navigation-drawer",{attrs:{clipped:e.$vuetify.breakpoint.mdAndUp,app:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[n("v-divider"),e._v(" "),e.shouldLogin()?e._e():n("v-list",{staticClass:"pt-0",attrs:{dense:""}},e._l(e.groups,function(t){return n("v-list-tile",{key:t.id,attrs:{to:e.toGroup(t.id)},on:{click:function(e){}}},[n("v-list-tile-action",[n("v-icon",[e._v("group")])],1),e._v(" "),n("v-list-tile-content",[n("v-list-tile-title",[e._v(e._s(t.name))])],1)],1)})),e._v(" "),e.shouldLogin()?e._e():n("v-list",{staticClass:"pt-0",attrs:{dense:""}},e._l(e.calendars,function(t){return n("v-list-tile",{key:t.id,attrs:{to:e.toCalendar(t.id)},on:{click:function(e){}}},[n("v-list-tile-action",[n("v-icon",[e._v("calendar_today")])],1),e._v(" "),n("v-list-tile-content",[n("v-list-tile-title",[e._v(e._s(t.name))])],1)],1)}))],1),e._v(" "),n("v-toolbar",{attrs:{app:"","clipped-left":e.$vuetify.breakpoint.mdAndUp,fixed:""}},[n("v-toolbar-title",[n("v-toolbar-side-icon",{on:{click:function(t){t.stopPropagation(),e.drawer=!e.drawer}}}),e._v(" "),n("span",[n("a",{attrs:{href:"/"}},[e._v("Chalendar")])])],1),e._v(" "),e.shouldLogin()?n("v-toolbar-title",[n("v-btn",{on:{click:function(t){e.handleLogin()}}},[e._v("Login")])],1):e._e(),e._v(" "),n("v-spacer"),e._v(" "),e.userInfo?n("v-toolbar-title",[n("v-avatar",{attrs:{tile:!1,size:"56px",color:"grey lighten-4"}},[n("img",{attrs:{src:e.userInfo.picture,alt:"avatar"}})])],1):e._e(),e._v(" "),e.shouldLogin()?e._e():n("v-btn",{on:{click:function(t){e.handleLogout()}}},[e._v("Logout")])],1),e._v(" "),n("v-content",[n("router-view")],1),e._v(" "),n("v-footer",{attrs:{fixed:"",app:""}},[n("span",[e._v("© 2018 - Roel Van Zeebroeck")])])],1)},staticRenderFns:[]};var z=n("VU/8")(H,P,!1,function(e){n("5xYZ")},"data-v-363ec178",null).exports,V={name:"Main",components:{Group:j},data:function(){return{checked:!0}},methods:o()({},Object(s.b)("auth",["isLoggedIn"]))},F={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{fluid:""}},[n("h1",[e._v("Checklist")]),e._v(" "),n("v-checkbox",{attrs:{label:"Login",readonly:""},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}}),e._v(" "),n("v-checkbox",{attrs:{label:"Post messages in chat",readonly:""},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}}),e._v(" "),n("v-checkbox",{attrs:{label:"Post events in Calendar",readonly:""},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}}),e._v(" "),n("v-checkbox",{attrs:{label:"Post messages on events",readonly:""},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}}),e._v(" "),n("v-checkbox",{attrs:{label:"Desktop and mobile",readonly:""},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}}),e._v(" "),n("v-checkbox",{attrs:{label:"Make sure app can be tested locally",readonly:""},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}}),e._v(" "),n("v-checkbox",{attrs:{label:"Bug: when switching between events, messages from the preveious event are shown briefly",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Introduce Chat model",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Show # of unread items per chat",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"User rights: people should be invited to a chat/calendar before they can read/write",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Choose a catchy name :)",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Notifications",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Going/Not going",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Calendar: don't show old events",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Chats: don't show old messages",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Chats: don't abbreviate messages",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Chats: add date to messages",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Make calendar events look nicer",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Realtime chat (someone is typing ...)",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Likes",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Edit messages",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Edit events",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Event locations",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Chats: add @ pointers to people",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Create new chats",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Create new calendars",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Rate passed events",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"User profile management",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Native andriod app",readonly:""}}),e._v(" "),n("v-checkbox",{attrs:{label:"Native iOS app",readonly:""}})],1)},staticRenderFns:[]};var B=n("VU/8")(V,F,!1,function(e){n("RR68")},"data-v-616c05d2",null).exports,W={name:"Calendar",created:function(){this.loadCalendar(this.$route.params.id)},methods:o()({toAddEvent:function(){return"/calendar/"+this.$route.params.id+"/event/add"},toEvent:function(e){return"/calendar/"+this.$route.params.id+"/event/"+e}},Object(s.b)("calendarStore",["loadCalendar"])),computed:Object(s.d)({loadedCalendar:function(e){return e.calendarStore.loadedCalendar}})},Z={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{fluid:""}},[n("h1",[e._v(e._s(e.loadedCalendar.name))]),e._v(" "),n("v-btn",{attrs:{to:e.toAddEvent()}},[e._v("Add event")]),e._v(" "),n("v-list",[n("v-divider"),e._v(" "),e._l(e.loadedCalendar.events,function(t){return[n("v-list-tile",{key:t.id,attrs:{to:e.toEvent(t.id)}},[n("v-list-tile-content",[n("v-list-tile-title",[e._v(e._s(new Date(t.date).toDateString())+": "+e._s(t.name))])],1)],1),e._v(" "),n("v-divider")]})],2),e._v(" "),n("v-btn",{attrs:{to:e.toAddEvent()}},[e._v("Add event")])],1)},staticRenderFns:[]};var T=n("VU/8")(W,Z,!1,function(e){n("NPXp")},"data-v-7c9eeda7",null).exports,X={name:"Event",data:function(){return{inputMessage:""}},created:function(){this.setLoadedEvent(void 0),this.loadEvent(this.$route.params.id)},methods:o()({sendMessage:function(){this.postMessage(this.inputMessage).then(this.inputMessage="")}},Object(s.b)("calendarStore",["loadEvent","postMessage"]),Object(s.c)("calendarStore",["setLoadedEvent"])),computed:Object(s.d)({loadedEvent:function(e){return e.calendarStore.loadedEvent}})},Y={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.loadedEvent?n("v-container",{attrs:{fluid:""}},[n("h1",[e._v(e._s(new Date(e.loadedEvent.date).toLocaleDateString())+": "+e._s(e.loadedEvent.name))]),e._v(" "),n("v-list",[n("v-divider"),e._v(" "),e._l(e.loadedEvent.messages,function(t){return[n("v-list-tile",{key:t.id,on:{click:function(e){}}},[n("v-list-tile-avatar",[n("img",{attrs:{src:t.creatorPicture}})]),e._v(" "),n("v-list-tile-content",[n("v-list-tile-title",[e._v(e._s(t.text))]),e._v(" "),n("v-list-tile-sub-title",[e._v("By "+e._s(t.creatorName))])],1)],1),e._v(" "),n("v-divider")]})],2),e._v(" "),n("v-form",{staticClass:"pt-3"},[n("v-layout",{attrs:{column:""}},[n("v-layout",[n("v-textarea",{attrs:{rows:"1","single-line":"",box:"",label:"Enter your message ...",name:"inputMessage"},model:{value:e.inputMessage,callback:function(t){e.inputMessage=t},expression:"inputMessage"}}),e._v(" "),n("v-btn",{on:{click:function(t){e.sendMessage()}}},[e._v("Send")])],1)],1)],1)],1):e._e()},staticRenderFns:[]};var K=n("VU/8")(X,Y,!1,function(e){n("DdlD")},"data-v-21c9f8cf",null).exports,J={name:"AddEvent",data:function(){return{name:"",description:"",date:""}},methods:o()({addEvent:function(){var e=this;this.postEvent([this.name,this.description,this.date]).then(function(){return e.$router.push({path:e.toCalendar()})})},toCalendar:function(){return"/calendar/"+this.loadedCalendar.id}},Object(s.b)("calendarStore",["postEvent"])),computed:Object(s.d)({loadedCalendar:function(e){return e.calendarStore.loadedCalendar}})},q={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{fluid:"","grid-list-xl":""}},[n("v-form",[n("v-text-field",{attrs:{label:"name"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),n("v-textarea",{attrs:{label:"description"},model:{value:e.description,callback:function(t){e.description=t},expression:"description"}}),e._v(" "),n("v-date-picker",{attrs:{label:"date"},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}}),e._v(" "),n("v-btn",{on:{click:function(t){e.addEvent()}}},[e._v("Save")]),e._v(" "),n("v-btn",{attrs:{to:e.toCalendar()}},[e._v("Cancel")])],1)],1)},staticRenderFns:[]};var Q=n("VU/8")(J,q,!1,function(e){n("dFzX")},"data-v-531e4889",null).exports,ee={name:"",mounted:function(){var e=this;this.$nextTick(function(){var t,n;t=O("access_token"),localStorage.setItem(M,t),n=O("id_token"),localStorage.setItem(E,n),$(e)}),window.location.href="/"}},te={render:function(){var e=this.$createElement;return(this._self._c||e)("div")},staticRenderFns:[]},ne=n("VU/8")(ee,te,!1,null,null,null).exports;a.default.use(d.a);var ae=new d.a({mode:"history",routes:[{path:"/",name:"Main",component:B},{path:"/callback",name:"Callback",component:ne},{path:"/group/:id",name:"Group",component:j},{path:"/calendar/:id",name:"Calendar",component:T},{path:"/calendar/:calendarId/event/add",name:"AddEvent",component:Q},{path:"/calendar/:calendarId/event/:id",name:"Event",component:K}]}),re=n("//Fk"),oe=n.n(re),se=n("mtWM"),ie=new(function(e){function t(){p()(this,t);var e=g()(this,(t.__proto__||v()(t)).call(this));return e.baseUri+="Groups",e}return k()(t,e),m()(t,[{key:"getGroups",value:function(){return se.get(this.baseUri,x.buildHeaders()).then(function(e){return e.data})}},{key:"getGroup",value:function(e){return se.get(this.baseUri+"/"+e,x.buildHeaders()).then(function(e){return e.data})}},{key:"getMessages",value:function(e){return se.get(this.baseUri+"/"+e+"/messages",x.buildHeaders()).then(function(e){return e.data})}},{key:"postMessage",value:function(e,t){return se({method:"post",url:this.baseUri+"/"+e+"/messages",headers:{authorization:"Bearer "+N()},data:{text:t}}).then(function(e){return e.data})}}]),t}(x)),ce=new C;function le(e){return ce.getChatter(e.creatorId).then(function(t){e.creatorName=t.firstName,e.creatorPicture=t.picture})}var de={namespaced:!0,state:{groups:[],loadedGroup:{messages:[]}},getters:{},actions:{initGroups:function(e){var t=e.commit;ie.getGroups().then(function(e){t("setGroups",e)}).catch(function(e){console.error(e.response?e.response:e)})},loadGroup:function(e,t){var n=e.commit,a={},r=[];ie.getGroup(t).then(function(e){return a=e,ie.getMessages(e.id)}).then(function(e){for(var t=0;t<e.length;t++){var n=e[t];r.push(le(n))}a.messages=e}).then(function(e){oe.a.all(r).then(function(){n("setLoadedGroup",a)})}).catch(function(e){console.error(e.response?e.response:e)})},postMessage:function(e,t){var n=e.commit,a=e.state;e.rootState;a.loadedGroup?ie.postMessage(a.loadedGroup.id,t).then(function(e){le(e).then(function(){return n("addMessage",e)})}).catch(function(e){console.error(e.response?e.response:e)}):console.error("Could not post message: no group loaded")}},mutations:{setGroups:function(e,t){e.groups=t},setLoadedGroup:function(e,t){e.loadedGroup=t},addMessage:function(e,t){e.loadedGroup.messages.push(t)},reset:function(e){e.groups=[],e.loadedGroup={messages:[]}}}},ue=n("d7EF"),ve=n.n(ue),he=n("mtWM"),pe=function(e){function t(){p()(this,t);var e=g()(this,(t.__proto__||v()(t)).call(this));return e.baseUri+="Calendars",e}return k()(t,e),m()(t,[{key:"getCalendars",value:function(){return he.get(this.baseUri,x.buildHeaders()).then(function(e){return e.data})}},{key:"getCalendar",value:function(e){return he.get(this.baseUri+"/"+e,x.buildHeaders()).then(function(e){return e.data})}},{key:"getEvents",value:function(e){return he.get(this.baseUri+"/"+e+'/events?filter={"order": "date"}',x.buildHeaders()).then(function(e){return e.data})}},{key:"postEvent",value:function(e,t){var n=ve()(t,3),a=n[0],r=n[1],o=n[2];return he({method:"post",url:this.baseUri+"/"+e+"/events",headers:{authorization:"Bearer "+N()},data:{name:a,description:r,date:o}})}}]),t}(x),fe=n("mtWM"),me=function(e){function t(){p()(this,t);var e=g()(this,(t.__proto__||v()(t)).call(this));return e.baseUri+="Events",e}return k()(t,e),m()(t,[{key:"getEvent",value:function(e){return fe.get(this.baseUri+"/"+e,x.buildHeaders()).then(function(e){return e.data})}},{key:"getMessages",value:function(e){return fe.get(this.baseUri+"/"+e+"/messages",x.buildHeaders()).then(function(e){return e.data})}},{key:"postMessage",value:function(e,t){return fe({method:"post",url:this.baseUri+"/"+e+"/messages",headers:{authorization:"Bearer "+N()},data:{text:t}}).then(function(e){return e.data})}}]),t}(x),be=new pe,ge=new me,_e=new C;function ke(e){return _e.getChatter(e.creatorId).then(function(t){e.creatorName=t.firstName,e.creatorPicture=t.picture})}var xe={namespaced:!0,state:{calendars:[],loadedCalendar:{events:[]},loadedEvent:{messages:[]}},getters:{},actions:{initCalendars:function(e){var t=e.commit;be.getCalendars().then(function(e){t("setCalendars",e)}).catch(function(e){console.error(e.response?e.response:e)})},loadCalendar:function(e,t){var n=e.commit,a={},r=[];be.getCalendar(t).then(function(e){return a=e,be.getEvents(e.id)}).then(function(e){a.events=e}).then(function(e){oe.a.all(r).then(function(){n("setLoadedCalendar",a)})}).catch(function(e){console.error(e.response?e.response:e)})},loadEvent:function(e,t){var n=e.commit,a={},r=[];return ge.getEvent(t).then(function(e){return a=e,ge.getMessages(e.id)}).then(function(e){for(var t=0;t<e.length;t++){var n=e[t];r.push(ke(n))}a.messages=e}).then(function(e){oe.a.all(r).then(function(){n("setLoadedEvent",a)})}).catch(function(e){console.error(e.response?e.response:e)})},postEvent:function(e,t){var n=e.commit,a=e.state,r=(e.rootState,ve()(t,3)),o=r[0],s=r[1],i=r[2];a.loadedCalendar?be.postEvent(a.loadedCalendar.id,[o,s,i]).then(function(e){n("addEvent",e)}).catch(function(e){console.error(e.response?e.response:e)}):console.error("Could not post event: no calendar loaded")},postMessage:function(e,t){var n=e.commit,a=e.state;e.rootState;a.loadedEvent?ge.postMessage(a.loadedEvent.id,t).then(function(e){ke(e).then(function(){return n("addMessage",e)})}).catch(function(e){console.error(e.response?e.response:e)}):console.error("Could not post message: no event loaded")}},mutations:{setCalendars:function(e,t){e.calendars=t},setLoadedCalendar:function(e,t){e.loadedCalendar=t},setLoadedEvent:function(e,t){e.loadedEvent=t},addEvent:function(e,t){e.loadedCalendar.events.push(t)},addMessage:function(e,t){e.loadedEvent.messages.push(t)},reset:function(e){e.calendars=[],e.loadedCalendar={events:[]},e.loadedEvent={messages:[]}}}},ye={namespaced:!0,state:{userInfo:void 0},mutations:{setUserInfo:function(e,t){e.userInfo=t},reset:function(e){e.userInfo=void 0}}};a.default.use(s.a);var Ce=new s.a.Store({modules:{groupStore:de,calendarStore:xe,userStore:ye},strict:!1,actions:{clearAll:function(e){var t=e.commit;t("groupStore/reset"),t("calendarStore/reset"),t("userStore/reset")}}}),Ee=n("3EgV"),Me=n.n(Ee);n("7zck");a.default.use(Me.a),a.default.config.productionTip=!1,new a.default({el:"#app",router:ae,store:Ce,components:{App:z},template:"<App/>"})},NPXp:function(e,t){},RR68:function(e,t){},"VmP+":function(e,t){},dFzX:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.047cc3f53c4ce846be73.js.map