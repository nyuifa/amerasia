(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{203:function(e,t,a){e.exports=a(339)},208:function(e,t,a){},211:function(e,t){e.exports='<h1>America</h1>\n<p>Test</p>\n<a href="#asia">Go to asia</a>\n<img src="favicon.ico"/>\n'},212:function(e,t){e.exports='<h1>Asia</h1>\n<p>abc 123</p>\n<img src="favicon.ico"/>\n'},339:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(16),i=a.n(o),c=a(20),s=a(21),l=a(23),m=a(22),u=a(24),h=a(17),p=a(18),d=a(341),v=a(343),b=a(342),f=(a(208),a(104)),w=a(48),E=a(47),O=a(112),g=a.n(O),y=a(26),j=a.n(y),k=a(52),C=a.n(k),x=a(35),z=a(108),T=a.n(z),B=a(109),H=a.n(B),M=a(110),N=a.n(M),I=a(111),P=a.n(I),S=a(50),D=a(51),A=a.n(D),F=[{id:"america",x:.2,y:.2,html:a(211)},{id:"asia",x:.5,y:.5,html:a(212)}],L=a(106),R=a.n(L),U=a(71),W=a.n(U),Z=a(107),_=a.n(Z),J=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement(p.a,{className:e.root,position:"absolute",color:"default"},r.a.createElement(R.a,null,r.a.createElement(W.a,{variant:"h4"},"Amerasia"),r.a.createElement(j.a,null,r.a.createElement(_.a,null))))}}]),t}(n.Component),G=Object(h.withStyles)(function(e){return{root:{zIndex:e.zIndex.drawer+1}}})(J),$=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(a=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(o)))).container=r.a.createRef(),a.state={drawerOpen:!1,selectedHtml:"",canvasHovered:!1},a.navigateTo=function(e){var t=new A.a.Point(e.x,e.y);a.viewer.viewport.zoomTo(2,t),a.viewer.viewport.panTo(t),a.setState({drawerOpen:!0,selectedHtml:e.html})},a.makeMarkerClickHandler=function(e){return function(t){t.preventDefault(),t.stopPropagation(),a.props.history.push(e.id)}},a.createOverlaysFromData=function(){return F.map(function(e){var t=r.a.createElement(j.a,{id:e.id,onClick:a.makeMarkerClickHandler(e),"aria-label":e.id},r.a.createElement(T.a,{style:{fontSize:"1.2em",color:E.yellow[400],cursor:"pointer"}})),n=document.createElement("div");return i.a.render(t,n),Object(f.a)({},e,{placement:A.a.Placement.CENTER,element:n})})},a.onDrawerClose=function(){a.setState({drawerOpen:!1})},a.onCanvasEnter=function(){a.setState({canvasHovered:!0})},a.onCanvasLeave=function(){a.setState({canvasHovered:!1})},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;if(this.viewer=A()({element:this.container.current,prefixUrl:"".concat("/ifa-amerasia","/tiles_files/"),tileSources:"".concat("/ifa-amerasia","/tiles.dzi"),overlays:this.createOverlaysFromData(),zoomPerClick:1.5,zoomInButton:"zoom-in-button",zoomOutButton:"zoom-out-button",homeButton:"home-button"}),this.viewer.viewport.minZoomLevel=.5,this.props.match.params.id){var t=Object(S.find)(F,{id:this.props.match.params.id});t&&setTimeout(function(){return e.navigateTo(t)},700)}}},{key:"componentDidUpdate",value:function(e){if(e.match.params.id!==this.props.match.params.id){var t=Object(S.find)(F,{id:this.props.match.params.id});t&&this.navigateTo(t)}}},{key:"render",value:function(){var e=this.props,t=e.classes,a=e.width;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{ref:this.container,id:"test",className:t.mapContainer,style:{width:Object(x.isWidthUp)("sm",a)&&this.state.drawerOpen?"calc(100vw - ".concat(500,"px"):"100vw"},onMouseEnter:this.onCanvasEnter,onMouseLeave:this.onCanvasLeave},r.a.createElement("div",{className:t.buttons,style:{opacity:this.state.canvasHovered?1:0}},r.a.createElement(C.a,{title:"Zoom In"},r.a.createElement(j.a,{className:t.actionButton,id:"zoom-in-button","aria-label":"zoom-in"},r.a.createElement(H.a,{className:t.icon}))),r.a.createElement(C.a,{title:"Zoom Out"},r.a.createElement(j.a,{className:t.actionButton,id:"zoom-out-button","aria-label":"zoom-out"},r.a.createElement(N.a,{className:t.icon}))),r.a.createElement(C.a,{title:"Reset Zoom"},r.a.createElement(j.a,{className:t.actionButton,id:"home-button","aria-label":"home"},r.a.createElement(P.a,{className:t.icon}))))),r.a.createElement(g.a,{variant:"persistent",anchor:Object(x.isWidthUp)("sm",a)?"right":"bottom",open:this.state.drawerOpen,onClose:this.onDrawerClose,BackdropProps:{invisible:!0},classes:{paper:t.drawerPaper}},r.a.createElement("div",{dangerouslySetInnerHTML:{__html:this.state.selectedHtml}})))}}]),t}(n.Component),q=Object(S.flow)([Object(p.d)(),Object(h.withStyles)(function(e){return Object(w.a)({buttons:{position:"absolute",display:"flex",alignItems:"flex-start",justifyContent:"flex-start",zIndex:e.zIndex.appBar},actionButton:{margin:4,transition:e.transitions.create(["background"]),background:"rgba(255, 255, 255, 0.7)","&:hover":{background:"rgba(255, 255, 255, 1)"}},icon:{width:20,height:20},drawerPaper:{width:"100vw",height:"50vh",marginTop:0},mapContainer:{width:"100vw",height:"50vh"}},e.breakpoints.up("sm"),{drawerPaper:{marginTop:64,width:500,height:"100vh"},mapContainer:{height:"calc(100vh - ".concat(64,"px)"),marginTop:64,transition:e.transitions.create(["width"])}})},{withTheme:!0})])($),K=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(p.c,{variant:"h2"},"Amerasia Map"),r.a.createElement(p.c,{variant:"subtitle1"},"Debug Mode"))}}]),t}(n.Component),Q=(a(336),Object(h.createMuiTheme)({typography:{fontFamily:'"Crimson", "Roboto", "Helvetica", "Arial", sans-serif"'}})),V=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(h.MuiThemeProvider,{theme:Q},r.a.createElement(p.b,null),r.a.createElement(G,null),r.a.createElement(d.a,{hashType:"noslash"},r.a.createElement(v.a,null,r.a.createElement(b.a,{exact:!0,path:"/",component:q}),r.a.createElement(b.a,{path:"/:id",component:q}),r.a.createElement(b.a,{exact:!0,path:"/debug",component:K})))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(V,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[203,2,1]]]);
//# sourceMappingURL=main.b6321cd7.chunk.js.map