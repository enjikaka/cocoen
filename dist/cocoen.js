var Cocoen=(()=>{var v=Object.defineProperty;var g=(n,e)=>{for(var t in e)v(n,t,{get:e[t],enumerable:!0})};var E={};g(E,{create:()=>s,parse:()=>p});var a="cocoen",o=`${a}-component`;var l=n=>Number.parseInt(window.getComputedStyle(n).width,10);var h=({dragElementWidth:n,hostElementWidth:e,x:t})=>{let i=t;t<0?i=n:t>=e&&(i=e-n);let r=i+n/2;return r/=e,r*100};var d=(n,e)=>{let t=0;n instanceof MouseEvent?t=n.clientX:n instanceof TouchEvent&&(t=n.touches[0].clientX);let i=e?.getBoundingClientRect().left||0;return t-i};var u=(n,e)=>{let t;return(...i)=>{let r;return t&&clearTimeout(t),t=setTimeout(()=>{r=n(...i)},e),r}};var c=n=>`${n}%`;var b=`
  :host {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    cursor: pointer;
    display: block;
    overflow: hidden;
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -ms-user-select: none;
  }

  :host *,
  :host *:after,
  :host *:before {
    box-sizing: inherit;
    -moz-box-sizing: inherit;
    -webkit-box-sizing: inherit;
  }

  #before {
    height: 100%;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 50%;
  }

  #drag {
    background: var(--color, #fff);
    bottom: 0;
    cursor: ew-resize;
    left: 50%;
    margin-left: -1px;
    position: absolute;
    top: 0;
    width: 2px;
  }

  #drag:before {
    border: 3px solid var(--color, #fff);
    content: '';
    height: 30px;
    left: 50%;
    margin-left: -7px;
    margin-top: -15px;
    position: absolute;
    top: 50%;
    width: 14px;
  }

  ::slotted(img) {
    max-height: 100%;
    object-fit: contain;
    pointer-events: none;
  }

  ::slotted(img[slot=before]) {
    max-width: none;
  }

  ::slotted(img[slot=after]) {
    display: block;
    max-width: 100%;
    width: 100%;
  }
`,m=class extends HTMLElement{constructor(){super();this.colorValue="#fff";this.dragElementWidthValue=0;this.elementWidthValue=0;this.isDraggingValue=!1;this.openRatioValue=50;this.isRendered=!1;this.isVisible=!1;this.xValue=0;this.drag=null,this.shadowDOM=this.attachShadow({mode:"closed"}),this.onDragStartHandler=()=>this.onDragStart(),this.onDragEndHandler=()=>this.onDragEnd(),this.onDragHandler=e=>this.onDrag(e),this.onClickHandler=e=>this.onClick(e),this.onIntersectionHandler=(e,t)=>this.onIntersection(e,t),this.debouncedUpdateDimensions=u(()=>{this.updateDimensions()},250),this.intersectionObserver=new IntersectionObserver(this.onIntersectionHandler,{root:null,rootMargin:"0px",threshold:0})}get x(){return this.xValue}set x(e){this.xValue=e,window.requestAnimationFrame(()=>{this.openRatio=h({x:this.xValue,dragElementWidth:this.dragElementWidth,hostElementWidth:this.elementWidth})})}get elementWidth(){return this.elementWidthValue}set elementWidth(e){this.elementWidthValue=e}get dragElementWidth(){return this.dragElementWidthValue}set dragElementWidth(e){this.dragElementWidthValue=e}get isDragging(){return this.isDraggingValue}set isDragging(e){this.isDraggingValue=e}get openRatio(){return this.openRatioValue}set openRatio(e){this.openRatioValue=e,window.requestAnimationFrame(()=>{this.updateStyles()})}get color(){return this.colorValue}set color(e){this.colorValue=e,window.requestAnimationFrame(()=>{this.style.setProperty("--color",this.color)})}static get observedAttributes(){return["start","color"]}attributeChangedCallback(e,t,i){t!==i&&(e==="start"&&(this.shouldAnimateTo=Number.parseInt(String(this.getAttribute("start")),10),this.isVisible&&(this.openRatio=this.shouldAnimateTo)),e==="color"&&(this.color=String(this.getAttribute("color"))))}connectedCallback(){this.isRendered||(this.render(),this.isRendered=!0,this.dispatchEvent(new CustomEvent(`${o}:connected`,this.customEventPayload())),this.drag=this.shadowDOM.querySelector("#drag"),this.updateDimensions(),this.addEventListener("mousedown",this.onDragStartHandler,{passive:!0}),this.addEventListener("touchstart",this.onDragStartHandler,{passive:!0}),this.addEventListener("mousemove",this.onDragHandler,{passive:!0}),this.addEventListener("touchmove",this.onDragHandler,{passive:!0}),this.addEventListener("click",this.onClickHandler,{passive:!0}),window.addEventListener("resize",this.debouncedUpdateDimensions,{passive:!0}),window.addEventListener("mouseup",this.onDragEndHandler,{passive:!0}),window.addEventListener("touchend",this.onDragEndHandler,{passive:!0}),this.intersectionObserver.observe(this))}disconnectedCallback(){this.dispatchEvent(new CustomEvent(`${o}:disconnected`,this.customEventPayload())),this.removeEventListener("mousedown",this.onDragStartHandler),this.removeEventListener("touchstart",this.onDragStartHandler),this.removeEventListener("mousemove",this.onDragHandler),this.removeEventListener("touchmove",this.onDragHandler),this.removeEventListener("click",this.onClickHandler),window.removeEventListener("resize",this.debouncedUpdateDimensions),window.removeEventListener("mouseup",this.onDragEndHandler),window.removeEventListener("touchend",this.onDragEndHandler),this.intersectionObserver.unobserve(this)}render(){this.shadowDOM.innerHTML=`
      <style>${b}</style>
      <div id="before">
        <slot name="before"></slot>
      </div>
      <slot name="after"></slot>
      <div id="drag" part="drag"></div>
    `}updateDimensions(){this.elementWidth=l(this),this.drag&&(this.dragElementWidth=l(this.drag)),this.dispatchEvent(new CustomEvent(`${o}:resized`,this.customEventPayload()))}updateStyles(){let e=this.shadowDOM.querySelector("#before"),t=this.shadowDOM.querySelector("#drag"),i=c(this.openRatio);this.shouldAnimateTo?(e.style.transition="width .75s",t.style.transition="left .75s"):(e.style.transition="none",t.style.transition="none"),e.style.width=i,t.style.left=i,this.dispatchEvent(new CustomEvent(`${o}:updated`,this.customEventPayload()))}onDragStart(){this.isDragging=!0,this.shouldAnimateTo=0}onDrag(e){!this.isDragging||(this.x=d(e,this))}onDragEnd(){this.isDragging=!1}onClick(e){this.shouldAnimateTo=0,this.x=d(e,this)}onIntersection(e,t){e.forEach(i=>{i.isIntersecting&&(this.dispatchEvent(new CustomEvent(`${o}:visible`,this.customEventPayload())),this.shouldAnimateTo&&(this.openRatio=this.shouldAnimateTo),t.unobserve(this),this.isVisible=!0)})}calculateOpenRatio(e){let t=e;e<0?t=this.dragElementWidth:e>=this.elementWidth&&(t=this.elementWidth-this.dragElementWidth);let i=t+this.dragElementWidth/2;return i/=this.elementWidth,`${i*100}%`}customEventPayload(){return{bubbles:!0,composed:!0,detail:{elementWidth:this.elementWidth,openRatio:this.openRatio,isRendered:this.isRendered,isVisible:this.isVisible}}}};customElements.define(o,m);var s=n=>{let e=document.createElement(o),t=n.querySelectorAll("img")[0],i=n.querySelectorAll("img")[1];if(!t||!i)throw new Error("Cocoen needs two images");return t.setAttribute("slot","before"),i.setAttribute("slot","after"),e.append(t.cloneNode(!0)),e.append(i.cloneNode(!0)),Object.keys(n.dataset).forEach(r=>e.setAttribute(r,String(n.dataset[r]))),n.replaceWith(e),e};var p=n=>{[...n.querySelectorAll(`.${a}`)].map(t=>s(t))};return E;})();
//# sourceMappingURL=cocoen.js.map
