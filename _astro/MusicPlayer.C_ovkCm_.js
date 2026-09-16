import{$ as g,B as q,D as k,F as L,G as ye,H as De,J as se,L as ze,M as E,N as Ie,O as re,P as n,Q as Ve,R as v,S as Re,T as U,U as He,V as y,W as me,X as ee,Y as te,Z as Be,_ as qe,b as we,c as H,d as F,f as Fe,g as Ae,j as O,k as C,m as ke,p as Ne,q as de,r as Ke,t as Z,tt as Xe,u as pe,v as B,y as Pe,z as $}from"./client.CX21IPif.js";import"./disclose-version.DwdwGuwu.js";import{n as J,t as Q}from"./translation.CZfk_5KH.js";import{n as ge}from"./config.CP1YHML_.js";import{t as z}from"./Icon.Bv6xgBwB.js";import{n as je,t as w}from"./musicPlayerStore.DZcepVmm.js";import{a as Ue,c as Ye,i as Oe,l as ve,n as We,o as Ge,r as Je,s as Qe,t as Ze}from"./SidebarTrackInfo.CszjDTAI.js";Be();function $e(l){const e=l-1;return e*e*e+1}function Ce(l){const e=l-1;return e*e*e+1}function be(l){const e=typeof l=="string"&&l.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return e?[parseFloat(e[1]),e[2]||"px"]:[l,"px"]}function ne(l,e,t){return Number.isNaN(e)?"":`${l}: ${t*e}px;`}function et(l,{delay:e=0,duration:t=400,easing:a=Ce,x:o=0,y:r=0,opacity:b=0}={}){const c=getComputedStyle(l),p=+c.opacity,i=c.transform==="none"?"":c.transform,d=p*(1-b),[m,f]=be(o),[h,P]=be(r);return{delay:e,duration:t,easing:a,css:(u,S)=>`
			transform: ${i} translate(${(1-u)*m}${f}, ${(1-u)*h}${P});
			opacity: ${p-d*S}`}}function tt(l,{delay:e=0,duration:t=400,easing:a=Ce,axis:o="y"}={}){const r=getComputedStyle(l),b=+r.opacity,c=o==="y"?"height":"width",p=parseFloat(r[c]),i=o==="y"?["top","bottom"]:["left","right"],d=i.map(x=>`${x[0].toUpperCase()}${x.slice(1)}`),m=parseFloat(r[`padding${d[0]}`]),f=parseFloat(r[`padding${d[1]}`]),h=parseFloat(r[`margin${d[0]}`]),P=parseFloat(r[`margin${d[1]}`]),u=parseFloat(r[`border${d[0]}Width`]),S=parseFloat(r[`border${d[1]}Width`]);return{delay:e,duration:t,easing:a,css:x=>`overflow: hidden;opacity: ${Math.min(x*20,1)*b};`+ne(c,p,x)+ne(`padding-${i[0]}`,m,x)+ne(`padding-${i[1]}`,f,x)+ne(`margin-${i[0]}`,h,x)+ne(`margin-${i[1]}`,P,x)+ne(`border-${i[0]}-width`,u,x)+ne(`border-${i[1]}-width`,S,x)+`min-${c}: 0`}}var nt=C('<div class="fab-music-panel card-base shadow-xl rounded-2xl p-4 w-[20rem] max-w-[80vw] svelte-1lty5dg"><div class="fab-music-header svelte-1lty5dg"><!> <!></div> <!> <!> <!></div>');function it(l,e){ee(e,!0);let t=ye(De(w.getState())),a=ye(!1);function o(D){const K=D;K.detail&&me(t,K.detail,!0)}we(()=>{window.addEventListener("music-sidebar:state",o)}),Pe(()=>{typeof window<"u"&&window.removeEventListener("music-sidebar:state",o)});function r(){w.toggle()}function b(){w.prev()}function c(){w.next()}function p(){w.toggleMode()}function i(){me(a,!n(a))}function d(D){w.playIndex(D)}function m(D){w.seek(D)}function f(){w.toggleMute()}function h(D){w.setVolume(D)}var P=nt(),u=v(P),S=v(u);Oe(S,{get currentSong(){return n(t).currentSong},get isPlaying(){return n(t).isPlaying},get isLoading(){return n(t).isLoading}});var x=y(S,2);Ze(x,{get currentSong(){return n(t).currentSong},get currentTime(){return n(t).currentTime},get duration(){return n(t).duration},get volume(){return n(t).volume},get isMuted(){return n(t).isMuted},onToggleMute:f,onSetVolume:h}),g(u);var V=y(u,2);We(V,{get currentTime(){return n(t).currentTime},get duration(){return n(t).duration},onSeek:m});var s=y(V,2);Ue(s,{get isPlaying(){return n(t).isPlaying},get isShuffled(){return n(t).isShuffled},get repeatMode(){return n(t).isRepeating},onToggleMode:p,onPrev:b,onNext:c,onTogglePlay:r,onTogglePlaylist:i});var I=y(s,2);Je(I,{get playlist(){return n(t).playlist},get currentIndex(){return n(t).currentIndex},get isPlaying(){return n(t).isPlaying},get show(){return n(a)},onClose:i,onPlaySong:d}),g(P),k(l,P),te()}var rt=C('<div class="flex-1 min-w-0"><div class="text-sm font-medium text-90 truncate"> </div> <div class="text-xs text-50 truncate"> </div></div>'),at=C('<div class="text-xs text-30 mt-1"> </div>'),ot=C('<div class="flex-1 min-w-0"><div class="song-title text-lg font-bold text-90 truncate mb-1"> </div> <div class="song-artist text-sm text-50 truncate"> </div> <!></div>');function he(l,e){ee(e,!0);const t=Z(e,"showTime",3,!1),a=Z(e,"size",3,"mini");function o(i){return!Number.isFinite(i)||i<0?"0:00":`${Math.floor(i/60)}:${Math.floor(i%60).toString().padStart(2,"0")}`}var r=re(),b=$(r),c=i=>{var d=rt(),m=v(d),f=q(m,!0),h=y(m,2),P=q(h,!0);g(d),L(()=>{U(f,e.song.title),U(P,e.song.artist)}),k(i,d)},p=i=>{var d=ot(),m=v(d),f=q(m,!0),h=y(m,2),P=q(h,!0),u=y(h,2),S=x=>{var V=at(),s=q(V);L((I,D)=>U(s,`${I??""} / ${D??""}`),[()=>o(e.currentTime),()=>o(e.duration)]),k(x,V)};B(u,x=>{t()&&x(S)}),g(d),L(()=>{U(f,e.song.title),U(P,e.song.artist)}),k(i,d)};B(b,i=>{a()==="mini"?i(c):i(p,-1)}),k(l,r),te()}var lt=C('<!> <div class="flex-1 min-w-0 cursor-pointer" role="button" tabindex="0"><!></div> <div class="flex items-center gap-1"><button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center"><!></button> <button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center"><!></button></div>',1),st=C('<div class="flex items-center gap-1"><button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center"><!></button> <button><!></button></div>'),ut=C("<!> <!> <!>",1),ct=C("<div><!></div>");function Se(l,e){ee(e,!0);const t=Z(e,"size",3,"mini"),a=Z(e,"showControls",3,!1),o=Z(e,"showPlaylist",3,!1);var r=ct(),b=v(r),c=i=>{var d=lt(),m=$(d);ve(m,{get cover(){return e.song.cover},get isPlaying(){return e.isPlaying},get isLoading(){return e.isLoading},size:"mini",interactive:!0,get onclick(){return e.onCoverClick}});var f=y(m,2),h=v(f);he(h,{get song(){return e.song},get currentTime(){return e.currentTime},get duration(){return e.duration},size:"mini"}),g(f);var P=y(f,2),u=v(P),S=v(u);z(S,{icon:"material-symbols:visibility-off",class:"text-lg"}),g(u);var x=y(u,2),V=v(x);z(V,{icon:"material-symbols:expand-less",class:"text-lg"}),g(x),g(P),L((s,I)=>{H(f,"aria-label",s),H(u,"title",I)},[()=>Q(J.musicPlayerExpand),()=>Q(J.musicPlayerHide)]),E("click",f,function(...s){e.onInfoClick?.apply(this,s)}),E("keydown",f,s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),e.onInfoClick?.())}),E("click",u,s=>{s.stopPropagation(),e.onHideClick?.()}),E("click",x,s=>{s.stopPropagation(),e.onExpandClick?.()}),k(i,d)},p=i=>{var d=ut(),m=$(d);ve(m,{get cover(){return e.song.cover},get isPlaying(){return e.isPlaying},get isLoading(){return e.isLoading},size:"expanded"});var f=y(m,2);he(f,{get song(){return e.song},get currentTime(){return e.currentTime},get duration(){return e.duration},showTime:!0,size:"expanded"});var h=y(f,2),P=u=>{var S=st(),x=v(S),V=v(x);z(V,{icon:"material-symbols:visibility-off",class:"text-lg"}),g(x);var s=y(x,2);let I;var D=v(s);z(D,{icon:"material-symbols:queue-music",class:"text-lg"}),g(s),g(S),L((K,ue)=>{H(x,"title",K),I=F(s,1,"btn-plain w-8 h-8 rounded-lg flex items-center justify-center",null,I,{"text-[var(--primary)]":o()}),H(s,"title",ue)},[()=>Q(J.musicPlayerHide),()=>Q(J.musicPlayerPlaylist)]),E("click",x,function(...K){e.onHideClick?.apply(this,K)}),E("click",s,function(...K){e.onPlaylistClick?.apply(this,K)}),k(u,S)};B(h,u=>{a()&&u(P)}),k(i,d)};B(b,i=>{t()==="mini"?i(c):i(p,-1)}),g(r),L(()=>F(r,1,Fe(t()==="mini"?"flex items-center gap-3 mb-0":"flex items-center gap-4 mb-4"))),k(l,r),te()}O(["click","keydown"]);var dt=C("<div><!></div>");function gt(l,e){var t=dt();let a;var o=v(t);Se(o,{get song(){return e.song},get currentTime(){return e.currentTime},get duration(){return e.duration},get isPlaying(){return e.isPlaying},get isLoading(){return e.isLoading},size:"mini",get onCoverClick(){return e.onCoverClick},get onInfoClick(){return e.onInfoClick},get onHideClick(){return e.onHideClick},get onExpandClick(){return e.onExpandClick}}),g(t),L(()=>a=F(t,1,"mini-player card-base shadow-xl rounded-2xl p-3 absolute bottom-0 right-0 w-70 svelte-g9ac72",null,a,{"mini-enter":!e.isHidden,"mini-leave":e.isHidden,"pointer-events-none":e.isHidden})),k(l,t)}var xe=C("<button><!></button>");function _e(l,e){const t=Z(e,"repeatMode",3,0),a=Z(e,"disabled",3,!1);var o=re(),r=$(o),b=p=>{var i=xe();let d;var m=v(i);z(m,{icon:"material-symbols:shuffle",class:"text-lg"}),g(i),L(()=>{d=F(i,1,"w-10 h-10 rounded-lg",null,d,{"btn-regular":e.isActive,"btn-plain":!e.isActive}),i.disabled=a()}),E("click",i,function(...f){e.onclick?.apply(this,f)}),k(p,i)},c=p=>{var i=xe();let d;var m=v(i),f=u=>{z(u,{icon:"material-symbols:repeat-one",class:"text-lg"})},h=u=>{z(u,{icon:"material-symbols:repeat",class:"text-lg"})},P=u=>{z(u,{icon:"material-symbols:repeat",class:"text-lg opacity-50"})};B(m,u=>{t()===1?u(f):t()===2?u(h,1):u(P,-1)}),g(i),L(()=>d=F(i,1,"w-10 h-10 rounded-lg",null,d,{"btn-regular":e.isActive,"btn-plain":!e.isActive})),E("click",i,function(...u){e.onclick?.apply(this,u)}),k(p,i)};B(r,p=>{e.mode==="shuffle"?p(b):p(c,-1)}),k(l,o)}O(["click"]);var mt=C('<div class="controls flex items-center justify-center gap-2 mb-4"><!> <!> <!> <!> <!></div>');function vt(l,e){var t=mt(),a=v(t);_e(a,{mode:"shuffle",get isActive(){return e.isShuffled},get onclick(){return e.onShuffleClick}});var o=y(a,2);Ge(o,{get onclick(){return e.onPrevClick},disabled:!1});var r=y(o,2);Qe(r,{get isPlaying(){return e.isPlaying},get isLoading(){return e.isLoading},get onclick(){return e.onPlayClick}});var b=y(r,2);Ye(b,{get onclick(){return e.onNextClick},disabled:!1});var c=y(b,2);{let p=se(()=>e.isRepeating>0);_e(c,{mode:"repeat",get isActive(){return n(p)},get repeatMode(){return e.isRepeating},get onclick(){return e.onRepeatClick}})}g(t),k(l,t)}var ft=C('<div class="progress-bar flex-1 h-2 bg-(--btn-regular-bg) rounded-full cursor-pointer" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="100"><div class="h-full bg-(--primary) rounded-full transition-all duration-100"></div></div>');function yt(l,e){ee(e,!0);var t=ft(),a=q(t);L(o=>{H(t,"aria-label",o),H(t,"aria-valuenow",e.duration>0?e.currentTime/e.duration*100:0),pe(a,`width: ${e.duration>0?e.currentTime/e.duration*100:0}%`)},[()=>Q(J.musicPlayerProgress)]),E("click",t,function(...o){e.onclick?.apply(this,o)}),E("keydown",t,function(...o){e.onkeydown?.apply(this,o)}),k(l,t),te()}O(["click","keydown"]);var bt=C('<div class="progress-section mb-4"><!></div>');function ht(l,e){var t=bt(),a=v(t);yt(a,{get currentTime(){return e.currentTime},get duration(){return e.duration},get onclick(){return e.onProgressClick},get onkeydown(){return e.onProgressKeyDown}}),g(t),k(l,t)}var xt=C('<button class="btn-plain w-8 h-8 rounded-lg"><!></button>');function _t(l,e){var t=xt(),a=v(t),o=c=>{z(c,{icon:"material-symbols:volume-off",class:"text-lg"})},r=c=>{z(c,{icon:"material-symbols:volume-down",class:"text-lg"})},b=c=>{z(c,{icon:"material-symbols:volume-up",class:"text-lg"})};B(a,c=>{e.isMuted||e.volume===0?c(o):e.volume<.5?c(r,1):c(b,-1)}),g(t),E("click",t,function(...c){e.onclick?.apply(this,c)}),k(l,t)}O(["click"]);var wt=C('<div class="flex-1 h-2 bg-(--btn-regular-bg) rounded-full cursor-pointer touch-none" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="100"><div></div></div>');function kt(l,e){var t=wt(),a=v(t);let o;g(t),Ne(t,r=>e.volumeBarRef?.(r)),L(()=>{H(t,"aria-label",e.ariaLabel),H(t,"aria-valuenow",e.volume*100),o=F(a,1,"h-full bg-(--primary) rounded-full transition-all",null,o,{"duration-100":!e.isVolumeDragging,"duration-0":e.isVolumeDragging}),pe(a,`width: ${e.volume*100}%`)}),E("pointerdown",t,function(...r){e.onpointerdown?.apply(this,r)}),E("keydown",t,function(...r){e.onkeydown?.apply(this,r)}),k(l,t)}O(["pointerdown","keydown"]);var pt=C('<div class="bottom-controls flex items-center gap-2"><!> <!> <!></div>');function Pt(l,e){var t=pt(),a=v(t);_t(a,{get volume(){return e.volume},get isMuted(){return e.isMuted},get onclick(){return e.onVolumeButtonClick}});var o=y(a,2);{let b=se(()=>e.isMuted?0:e.volume);kt(o,{get volume(){return n(b)},get isVolumeDragging(){return e.isVolumeDragging},get volumeBarRef(){return e.volumeBarRef},get onpointerdown(){return e.onSliderPointerDown},get onkeydown(){return e.onSliderKeyDown},get ariaLabel(){return e.ariaLabel}})}var r=y(o,2);Re(r,()=>e.children??Xe),g(t),k(l,t)}var Ct=C('<button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center"><!></button>'),St=C("<div><!> <!> <!> <!></div>");function Tt(l,e){ee(e,!0);var t=St();let a;var o=v(t);Se(o,{get song(){return e.song},get currentTime(){return e.currentTime},get duration(){return e.duration},get isPlaying(){return e.isPlaying},get isLoading(){return e.isLoading},size:"expanded",showControls:!0,get showPlaylist(){return e.showPlaylist},get onHideClick(){return e.onHideClick},get onPlaylistClick(){return e.onPlaylistClick}});var r=y(o,2);ht(r,{get currentTime(){return e.currentTime},get duration(){return e.duration},get onProgressClick(){return e.onProgressClick},get onProgressKeyDown(){return e.onProgressKeyDown}});var b=y(r,2);vt(b,{get isPlaying(){return e.isPlaying},get isLoading(){return e.isLoading},get isShuffled(){return e.isShuffled},get isRepeating(){return e.isRepeating},get canSkip(){return e.canSkip},get onPlayClick(){return e.onPlayClick},get onPrevClick(){return e.onPrevClick},get onNextClick(){return e.onNextClick},get onShuffleClick(){return e.onShuffleClick},get onRepeatClick(){return e.onRepeatClick}});var c=y(b,2);{let p=se(()=>Q(J.musicPlayerVolume));Pt(c,{get volume(){return e.volume},get isMuted(){return e.isMuted},get isVolumeDragging(){return e.isVolumeDragging},get volumeBarRef(){return e.volumeBarRef},get onVolumeButtonClick(){return e.onVolumeButtonClick},get onSliderPointerDown(){return e.onSliderPointerDown},get onSliderKeyDown(){return e.onSliderKeyDown},get ariaLabel(){return n(p)},children:(i,d)=>{var m=Ct(),f=v(m);z(f,{icon:"material-symbols:expand-more",class:"text-lg"}),g(m),L(h=>H(m,"title",h),[()=>Q(J.musicPlayerCollapse)]),E("click",m,function(...h){e.onCollapseClick?.apply(this,h)}),k(i,m)},$$slots:{default:!0}})}g(t),L(()=>a=F(t,1,"expanded-player card-base shadow-xl rounded-2xl p-4 transition-all duration-500 ease-in-out absolute bottom-0 right-0 w-80",null,a,{"opacity-0":e.isHidden,"scale-95":e.isHidden,"pointer-events-none":e.isHidden})),k(l,t),te()}O(["click"]);var Mt=C('<span class="text-sm text-[var(--content-meta)]"> </span>'),Et=C('<div role="button" tabindex="0"><div class="w-6 h-6 flex items-center justify-center"><!></div> <div class="w-10 h-10 rounded-lg overflow-hidden bg-[var(--btn-regular-bg)] flex-shrink-0"><img decoding="async" class="w-full h-full object-cover"/></div> <div class="flex-1 min-w-0"><div> </div> <div> </div></div></div>');function Lt(l,e){ee(e,!0);const t=Z(e,"lazy",3,!0);var a=Et();let o;var r=v(a),b=v(r),c=s=>{z(s,{icon:"material-symbols:graphic-eq",class:"text-[var(--primary)] animate-pulse"})},p=s=>{z(s,{icon:"material-symbols:pause",class:"text-[var(--primary)]"})},i=s=>{var I=Mt(),D=q(I,!0);L(()=>U(D,e.index+1)),k(s,I)};B(b,s=>{e.isCurrent&&e.isPlaying?s(c):e.isCurrent?s(p,1):s(i,-1)}),g(r);var d=y(r,2),m=q(d),f=y(d,2),h=v(f);let P;var u=q(h,!0),S=y(h,2);let x;var V=q(S,!0);g(f),g(a),L(s=>{o=F(a,1,"playlist-item flex items-center gap-3 p-3 hover:bg-[var(--btn-plain-bg-hover)] cursor-pointer transition-colors",null,o,{"bg-[var(--btn-plain-bg)]":e.isCurrent,"text-[var(--primary)]":e.isCurrent}),H(a,"aria-label",`播放 ${e.song.title??""} - ${e.song.artist??""}`),H(m,"src",s),H(m,"alt",e.song.title),H(m,"loading",t()?"lazy":"eager"),P=F(h,1,"font-medium truncate",null,P,{"text-[var(--primary)]":e.isCurrent,"text-90":!e.isCurrent}),U(u,e.song.title),x=F(S,1,"text-sm text-[var(--content-meta)] truncate",null,x,{"text-[var(--primary)]":e.isCurrent}),U(V,e.song.artist)},[()=>je(e.song.cover||"/favicon/favicon.ico")]),E("click",a,function(...s){e.onclick?.apply(this,s)}),E("keydown",a,s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),e.onclick())}),k(l,a),te()}O(["click","keydown"]);var Dt=C('<div class="playlist-panel card-base-transparent fixed bottom-70 right-4 w-80 max-h-96 overflow-hidden z-50 svelte-1v267om"><div class="playlist-header flex items-center justify-between p-4 border-b border-(--line-divider)"><h3 class="text-lg font-semibold text-90"> </h3> <button class="btn-plain w-8 h-8 rounded-lg"><!></button></div> <div class="playlist-content overflow-y-auto max-h-80 hide-scrollbar" role="presentation"></div></div>');function zt(l,e){ee(e,!0);var t=re(),a=$(t),o=r=>{var b=Dt(),c=v(b),p=v(c),i=q(p,!0),d=y(p,2),m=v(d);z(m,{icon:"material-symbols:close",class:"text-lg"}),g(d),g(c);var f=y(c,2);Ae(f,21,()=>e.playlist,qe,(h,P,u)=>{{let S=se(()=>u===e.currentIndex);Lt(h,{get song(){return n(P)},index:u,get isCurrent(){return n(S)},get isPlaying(){return e.isPlaying},onclick:()=>e.onPlaySong(u),lazy:u!==0})}}),g(f),g(b),L(h=>U(i,h),[()=>Q(J.musicPlayerPlaylist)]),E("click",d,function(...h){e.onClose?.apply(this,h)}),ke(3,b,()=>tt,()=>({duration:300,axis:"y"})),k(r,b)};B(a,r=>{e.show&&r(o)}),k(l,t),te()}O(["click"]);var It=C('<div class="fixed bottom-20 right-4 z-60 max-w-sm"><div class="bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up"><!> <span class="text-sm flex-1"> </span> <button class="text-white/80 hover:text-white transition-colors"><!></button></div></div>'),Vt=C('<div class="music-player-fab-anchor fixed z-55"><div class="music-player-fab-shell"><!></div></div>'),Rt=C("<div><div><!></div> <!> <!> <!></div>"),Ht=C(`<!> <!> <style>.music-player-fab-anchor {
			right: var(--fab-group-right, 1.5rem);
			bottom: calc(
				var(--fab-group-bottom, 10rem) +
					(
						var(--fab-button-size, 3rem) *
							var(--fab-visible-count, 1)
					) +
					(
						var(--fab-group-gap, 0.5rem) *
							(var(--fab-visible-count, 1) - 1)
					)
			);
			width: 0;
			height: 0;
			pointer-events: none;
		}

		.music-player-fab-shell {
			position: absolute;
			right: 0;
			bottom: 0.75rem;
			transform-origin: bottom right;
			pointer-events: auto;
			will-change: transform, opacity;
		}

		.orb-player-container {
			position: absolute;
			bottom: 0;
			right: 0;
		}

		.orb-enter {
			animation: orbElasticIn 460ms cubic-bezier(0.22, 1.25, 0.36, 1)
				forwards;
		}

		.orb-leave {
			animation: orbElasticOut 360ms cubic-bezier(0.4, 0, 1, 1) forwards;
		}

		@keyframes orbElasticIn {
			0% {
				opacity: 0;
				transform: translateX(0) scale(0.55);
			}
			70% {
				opacity: 1;
				transform: translateX(0) scale(1.12);
			}
			100% {
				opacity: 1;
				transform: translateX(0) scale(1);
			}
		}

		@keyframes orbElasticOut {
			0% {
				opacity: 1;
				transform: translateX(0) scale(1);
			}
			100% {
				opacity: 0;
				transform: translateX(0) scale(0.6);
			}
		}

		.music-player.hidden-mode {
			width: 3rem;
			height: 3rem;
		}

		.music-player {
			width: 20rem;
			max-width: 20rem;
			min-width: 20rem;
			user-select: none;
		}

		:global(.mini-player) {
			position: absolute;
			bottom: 0;
			right: 0;
		}

		:global(.expanded-player) {
			position: absolute;
			bottom: 0;
			right: 0;
		}

		:global(.orb-player) {
			position: relative;
			backdrop-filter: blur(10px);
			-webkit-backdrop-filter: blur(10px);
		}

		:global(.orb-player::before) {
			content: "";
			position: absolute;
			inset: -0.125rem;
			background: linear-gradient(
				45deg,
				var(--primary),
				transparent,
				var(--primary)
			);
			border-radius: 50%;
			z-index: -1;
			opacity: 0;
			transition: opacity 0.3s ease;
		}

		:global(.orb-player:hover::before) {
			opacity: 0.3;
			animation: rotate 2s linear infinite;
		}

		:global(.orb-player .animate-pulse) {
			animation: musicWave 1.5s ease-in-out infinite;
		}

		@keyframes rotate {
			from {
				transform: rotate(0deg);
			}
			to {
				transform: rotate(360deg);
			}
		}

		@keyframes musicWave {
			0%,
			100% {
				transform: scaleY(0.5);
			}
			50% {
				transform: scaleY(1);
			}
		}

		:global(.animate-pulse) {
			animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
		}

		@keyframes pulse {
			0%,
			100% {
				opacity: 1;
			}
			50% {
				opacity: 0.5;
			}
		}

		:global(.progress-section div:hover),
		:global(.bottom-controls > div:hover) {
			transform: scaleY(1.2);
			transition: transform 0.2s ease;
		}

		@media (width < 768px) {
			.music-player-fab-anchor {
				right: var(--fab-group-right, 0.75rem) !important;
				bottom: calc(
					var(--fab-group-bottom, 5rem) +
						(
							var(--fab-button-size, 2.75rem) *
								var(--fab-visible-count, 1)
						) +
						(
							var(--fab-group-gap, 0.5rem) *
								(var(--fab-visible-count, 1) - 1)
						)
				) !important;
			}

			.music-player-fab-shell {
				right: 0 !important;
				bottom: 0.75rem !important;
			}

			.music-player {
				width: 280px !important;
				min-width: 280px !important;
				max-width: 280px !important;
				bottom: 0.5rem !important;
				right: 0.5rem !important;
			}
			:global(.mini-player) {
				width: 280px !important;
			}
			:global(.expanded-player) {
				width: 280px !important;
				max-width: 280px !important;
			}
			.music-player.expanded {
				width: 280px !important;
				min-width: 280px !important;
				max-width: 280px !important;
				right: 0.5rem !important;
			}
			:global(.playlist-panel) {
				width: 280px !important;
				right: 0.5rem !important;
				max-width: 280px !important;
			}
			:global(.controls) {
				gap: 8px;
			}
			:global(.controls button) {
				width: 36px;
				height: 36px;
			}
			:global(.controls button:nth-child(3)) {
				width: 44px;
				height: 44px;
			}
		}

		@media (width < 480px) {
			.music-player-fab-anchor {
				right: var(--fab-group-right, 0.5rem) !important;
				bottom: calc(
					var(--fab-group-bottom, 4.5rem) +
						(
							var(--fab-button-size, 2.5rem) *
								var(--fab-visible-count, 1)
						) +
						(
							var(--fab-group-gap, 0.5rem) *
								(var(--fab-visible-count, 1) - 1)
						)
				) !important;
			}

			.music-player-fab-shell {
				right: 0 !important;
				bottom: 0.75rem !important;
			}

			.music-player {
				width: 260px !important;
				min-width: 260px !important;
				max-width: 260px !important;
			}
			:global(.expanded-player) {
				width: 260px !important;
				max-width: 260px !important;
			}
			:global(.playlist-panel) {
				width: 260px !important;
				max-width: 260px !important;
				right: 0.5rem !important;
			}
			:global(.song-title) {
				font-size: 14px;
			}
			:global(.song-artist) {
				font-size: 12px;
			}
			:global(.controls) {
				gap: 6px;
				margin-bottom: 12px;
			}
			:global(.controls button) {
				width: 32px;
				height: 32px;
			}
			:global(.controls button:nth-child(3)) {
				width: 40px;
				height: 40px;
			}
			:global(.playlist-item) {
				padding: 8px 12px;
			}
			:global(.playlist-item .w-10) {
				width: 32px;
				height: 32px;
			}
		}

		@keyframes slide-up {
			from {
				transform: translateY(100%);
				opacity: 0;
			}
			to {
				transform: translateY(0);
				opacity: 1;
			}
		}

		.animate-slide-up {
			animation: slide-up 0.3s ease-out;
		}

		@media (hover: none) and (pointer: coarse) {
			:global(.music-player button),
			:global(.playlist-item) {
				min-height: 44px;
			}
			:global(.progress-section > div),
			:global(.bottom-controls > div:nth-child(2)) {
				height: 12px;
			}
		}

		@keyframes spin-continuous {
			from {
				transform: rotate(0deg);
			}
			to {
				transform: rotate(360deg);
			}
		}

		:global(.cover-container img) {
			animation: spin-continuous 3s linear infinite;
			animation-play-state: paused;
		}

		:global(.cover-container img.spinning) {
			animation-play-state: running;
		}

		:global(button.bg-\\\\[var\\\\(--primary\\\\)\\\\]) {
			box-shadow: 0 0 0 2px var(--primary);
			border: none;
		}</style>`,1);function Yt(l,e){ee(e,!1);let t=He(w.getState());const a=ge.showFloatingPlayer,o=(ge.floatingEntryMode??"default")==="fab",r=a&&ge.enable;let b;function c(){w.toggle()}function p(){w.prev()}function i(){w.next()}function d(){w.toggleShuffle()}function m(){w.toggleRepeat()}function f(_){w.playIndex(_)}function h(_){const T=_.currentTarget;if(!T)return;const Y=T.getBoundingClientRect(),X=(_.clientX-Y.left)/Y.width;w.setProgress(X)}function P(_){(_.key==="Enter"||_.key===" ")&&(_.preventDefault(),w.setProgress(.5))}function u(){w.toggleMute()}function S(){w.toggleMute()}function x(_){const T=_.currentTarget;if(!T)return;const Y=M=>{const A=T.getBoundingClientRect();if(A.width<=0)return;const N=Math.max(0,Math.min(1,(M-A.left)/A.width));w.setVolume(N)};Y(_.clientX);const X=_.pointerId;T.setPointerCapture(X);const ae=M=>{M.pointerId===X&&Y(M.clientX)},oe=()=>{T.removeEventListener("pointermove",ae),T.removeEventListener("pointerup",le),T.removeEventListener("pointercancel",R),T.hasPointerCapture(X)&&T.releasePointerCapture(X)},le=M=>{M.pointerId===X&&(Y(M.clientX),oe())},R=M=>{M.pointerId===X&&oe()};T.addEventListener("pointermove",ae),T.addEventListener("pointerup",le),T.addEventListener("pointercancel",R)}function V(_){const T=_.target;if(!(T?.tagName==="INPUT"||T?.tagName==="TEXTAREA"||T?.contentEditable==="true")){if(_.key==="ArrowLeft"||_.key==="ArrowDown"){_.preventDefault(),w.setVolume(n(t).volume-.05);return}if(_.key==="ArrowRight"||_.key==="ArrowUp"){_.preventDefault(),w.setVolume(n(t).volume+.05);return}(_.key==="Enter"||_.key===" "||_.key==="m"||_.key==="M")&&(_.preventDefault(),u())}}function s(){w.togglePlaylist()}function I(){w.toggleExpanded()}function D(){w.toggleHidden()}function K(){w.hideError()}function ue(_){}function Te(){return w.canSkip()}we(()=>{b=w.subscribe(_=>{me(t,_)}),w.initialize()}),Pe(()=>{b&&b(),w.destroy()}),Ke();var fe=re();Ie("keydown",ze,V);var Me=$(fe),Ee=_=>{var T=Ht(),Y=$(T),X=R=>{var M=It(),A=v(M),N=v(A);z(N,{icon:"material-symbols:error",class:"text-xl shrink-0"});var W=y(N,2),G=q(W,!0),j=y(W,2),ie=v(j);z(ie,{icon:"material-symbols:close",class:"text-lg"}),g(j),g(A),g(M),L(()=>U(G,n(t).errorMessage)),E("click",j,K),k(R,M)};B(Y,R=>{n(t).showError&&R(X)});var ae=y(Y,2),oe=R=>{var M=re(),A=$(M),N=W=>{var G=Vt(),j=v(G),ie=v(j);it(ie,{}),g(j),g(G),ke(3,j,()=>et,()=>({y:16,duration:280,opacity:.12,easing:$e})),k(W,G)};B(A,W=>{n(t).isExpanded&&W(N)}),k(R,M)},le=R=>{var M=Rt();let A;var N=v(M),W=v(N);ve(W,{get cover(){return n(t).currentSong.cover},get isPlaying(){return n(t).isPlaying},get isLoading(){return n(t).isLoading},size:"orb",onclick:D}),g(N);var G=y(N,2);{let ce=de(()=>n(t).isExpanded||n(t).isHidden);gt(G,{get song(){return n(t).currentSong},get currentTime(){return n(t).currentTime},get duration(){return n(t).duration},get isPlaying(){return n(t).isPlaying},get isLoading(){return n(t).isLoading},get isHidden(){return n(ce)},onCoverClick:c,onInfoClick:I,onHideClick:D,onExpandClick:I})}var j=y(G,2);{let ce=de(Te),Le=de(()=>!n(t).isExpanded);Tt(j,{get song(){return n(t).currentSong},get currentTime(){return n(t).currentTime},get duration(){return n(t).duration},get isPlaying(){return n(t).isPlaying},get isLoading(){return n(t).isLoading},get isShuffled(){return n(t).isShuffled},get isRepeating(){return n(t).isRepeating},get showPlaylist(){return n(t).showPlaylist},get canSkip(){return n(ce)},get volume(){return n(t).volume},get isMuted(){return n(t).isMuted},isVolumeDragging:!1,get isHidden(){return n(Le)},volumeBarRef:ue,onPlayClick:c,onPrevClick:p,onNextClick:()=>i(),onShuffleClick:d,onRepeatClick:m,onProgressClick:h,onProgressKeyDown:P,onVolumeButtonClick:S,onSliderPointerDown:x,onSliderKeyDown:V,onHideClick:D,onPlaylistClick:s,onCollapseClick:I})}var ie=y(j,2);zt(ie,{get playlist(){return n(t).playlist},get currentIndex(){return n(t).currentIndex},get isPlaying(){return n(t).isPlaying},get show(){return n(t).showPlaylist},onClose:s,onPlaySong:f}),g(M),L(()=>{A=F(M,1,"music-player fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out",null,A,{expanded:n(t).isExpanded,"hidden-mode":n(t).isHidden}),F(N,1,`orb-player-container ${n(t).isHidden?"orb-enter pointer-events-auto":"orb-leave pointer-events-none"}`)}),k(R,M)};B(ae,R=>{o?R(oe):R(le,-1)}),Ve(2),k(_,T)};B(Me,_=>{r&&_(Ee)}),k(l,fe),te()}O(["click"]);export{Yt as default};
