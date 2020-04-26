(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{297:function(t,o,e){},332:function(t,o,e){"use strict";var n=e(297);e.n(n).a},335:function(t,o,e){"use strict";e.r(o);e(273),e(134);var n={name:"vetooltip",props:{position:{type:String,default:"top",validator:function(t){return["top","bottom","left","right"].indexOf(t)>=0}},trigger:{type:String,default:"hover",validator:function(t){return["click","hover"].indexOf(t)>=0}},effect:{type:Boolean,default:!0}},data:function(){return{visible:!1}},computed:{styleEffect:function(){return this.effect?"ve-position-border":"ve-position-no-border"}},mounted:function(){var t=this;"click"===this.trigger?this.$refs.veTooltip.addEventListener("click",(function(o){t.showtooltip(o)})):(this.$refs.veTooltip.addEventListener("mouseenter",(function(){t.open()})),this.$refs.veTooltip.addEventListener("mouseleave",(function(){t.close()})))},destroyed:function(){var t=this;this.$refs.veTooltip&&("click"===this.trigger?this.$refs.veTooltip.removeEventListener("click",(function(o){t.showtooltip(o)})):(this.$refs.veTooltip.removeEventListener("mouseenter",(function(){t.open()})),this.$refs.veTooltip.removeEventListener("mouseleave",(function(){t.close()}))))},methods:{positionContent:function(){var t=this.$refs,o=t.contentWrapper,e=t.triggerWrapper;document.body.appendChild(o);var n=e.getBoundingClientRect(),i=n.width,l=n.height,s=n.left,p=n.top,r=o.getBoundingClientRect(),c=r.height,h=r.width,a={top:{top:p+window.scrollY,left:s+(i-h)/2},bottom:{top:p+l+window.scrollY,left:s+(i-h)/2},left:{top:p+window.scrollY+(l-c)/2,left:s+window.screenX},right:{top:p+window.scrollY+(l-c)/2,left:s+i+window.screenX}};o.style.top=a[this.position].top+"px",o.style.left=a[this.position].left+"px"},eventHandler:function(t){this.$refs.veTooltip&&(this.$refs.veTooltip===t.target||this.$refs.veTooltip.contains(t.target))||this.$refs.contentWrapper&&(this.$refs.contentWrapper===t.target||this.$refs.contentWrapper.contains(t.target))||this.close()},close:function(){this.visible=!1,document.removeEventListener("click",this.eventHandler)},open:function(){var t=this;this.visible=!0,this.$nextTick((function(){t.positionContent(),document.addEventListener("click",t.eventHandler)}))},showtooltip:function(t){this.$refs.triggerWrapper.contains(t.target)&&(!0===this.visible?this.close():this.open())}}},i=(e(332),e(33)),l=Object(i.a)(n,(function(){var t,o=this.$createElement,e=this._self._c||o;return e("div",{ref:"veTooltip",staticClass:"ve-tooltip"},[this.visible?e("div",{ref:"contentWrapper",staticClass:"content-wrapper",class:[(t={},t["ve-position-"+this.position]=!0,t),this.styleEffect]},[this._t("content",null,{close:this.close})],2):this._e(),this._v(" "),e("span",{ref:"triggerWrapper",staticStyle:{display:"inline-block"}},[this._t("default")],2)])}),[],!1,null,"108ee3ca",null).exports,s=e(305),p=e(299),r={name:"tooltip",components:{"hy-tooltip":l,"hy-button":s.a,SwitchCode:p.default},data:function(){return{seletedTab:"tab1",content:'\n<hy-tooltip position="top">\n    <template slot="content">\n        tooltip\n    </template>\n    <hy-button>tooltip</hy-button>\n</hy-tooltip>\n<hy-tooltip position="bottom">\n    <template slot="content">\n        tooltip\n    </template>\n    <hy-button>tooltip</hy-button>\n</hy-tooltip>\n<hy-tooltip position="left">\n    <template slot="content">\n        tooltip\n    </template>\n    <hy-button>tooltip</hy-button>\n</hy-tooltip>\n<hy-tooltip position="right">\n    <template slot="content" slot-scope="{close}">\n        tooltip\n        <hy-button @click="close">关闭</hy-button>\n    </template>\n    <hy-button>tooltip</hy-button>\n</hy-tooltip>\n<hr style="margin:10px 0 10px">\n<hy-tooltip position="top" trigger="hover">\n    <template slot="content">\n        tooltip\n    </template>\n    <hy-button>tooltip</hy-button>\n</hy-tooltip>\n<hy-tooltip position="bottom" trigger="hover">\n    <template slot="content">\n        tooltip\n    </template>\n    <hy-button>tooltip</hy-button>\n</hy-tooltip>\n<hy-tooltip position="left" trigger="hover">\n    <template slot="content">\n        tooltip\n    </template>\n    <hy-button>tooltip</hy-button>\n</hy-tooltip>\n<hy-tooltip position="right" trigger="hover">\n    <template slot="content">\n        tooltip\n    </template>\n    <hy-button>tooltip</hy-button>\n</hy-tooltip>'.trim(),showCode:!1}}},c=Object(i.a)(r,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("SwitchCode",{attrs:{content:t.content}},[e("h3",[t._v("tooltip hover")]),t._v(" "),e("hy-tooltip",{attrs:{position:"top"}},[e("template",{slot:"content"},[t._v("tooltip")]),t._v(" "),e("hy-button",[t._v("上边")])],2),t._v(" "),e("hy-tooltip",{attrs:{position:"bottom"}},[e("template",{slot:"content"},[t._v("tooltip")]),t._v(" "),e("hy-button",[t._v("下边")])],2),t._v(" "),e("hy-tooltip",{attrs:{position:"left"}},[e("template",{slot:"content"},[t._v("tooltip")]),t._v(" "),e("hy-button",[t._v("左边")])],2),t._v(" "),e("hy-tooltip",{attrs:{position:"right"}},[e("template",{slot:"content"},[t._v("tooltip")]),t._v(" "),e("hy-button",[t._v("右边")])],2),t._v(" "),e("hr",{staticStyle:{margin:"20px 0"}}),t._v(" "),e("h3",[t._v("tooltip click")]),t._v(" "),e("hy-tooltip",{attrs:{position:"top",trigger:"click"}},[e("template",{slot:"content"},[t._v("tooltip")]),t._v(" "),e("hy-button",[t._v("上边")])],2),t._v(" "),e("hy-tooltip",{attrs:{position:"bottom",trigger:"click"}},[e("template",{slot:"content"},[t._v("tooltip")]),t._v(" "),e("hy-button",[t._v("下边")])],2),t._v(" "),e("hy-tooltip",{attrs:{position:"left",trigger:"click"}},[e("template",{slot:"content"},[t._v("tooltip")]),t._v(" "),e("hy-button",[t._v("左边")])],2),t._v(" "),e("hy-tooltip",{attrs:{position:"right",trigger:"click"},scopedSlots:t._u([{key:"content",fn:function(o){var n=o.close;return[t._v("\n      tooltip\n      "),e("hy-button",{on:{click:n}},[t._v("关闭")])]}}])},[t._v(" "),e("hy-button",[t._v("右边")])],1)],1)}),[],!1,null,"70a2a41e",null);o.default=c.exports}}]);