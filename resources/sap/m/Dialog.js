/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Bar","./InstanceManager","./AssociativeOverflowToolbar","./ToolbarSpacer","./Title","./library","sap/m/Image","sap/ui/core/Control","sap/ui/core/IconPool","sap/ui/core/Popup","sap/ui/core/delegate/ScrollEnablement","sap/ui/core/RenderManager","sap/ui/core/InvisibleText","sap/ui/core/ResizeHandler","sap/ui/core/theming/Parameters","sap/ui/core/util/ResponsivePaddingsEnablement","sap/ui/Device","sap/ui/core/library","sap/ui/events/KeyCodes","./TitlePropagationSupport","./DialogRenderer","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/core/Core","sap/ui/core/Configuration","sap/ui/dom/units/Rem","sap/ui/dom/jquery/control","sap/ui/dom/jquery/Focusable"],function(t,e,i,o,s,n,a,r,l,h,p,u,g,c,d,f,_,y,m,b,S,v,R,C,D,I){"use strict";var T=y.OpenState;var A=n.DialogType;var M=n.DialogRoleType;var P=y.ValueState;var B=y.TitleLevel;var w=n.TitleAlignment;var H=C.getConfiguration().getAnimationMode();var z=H!==D.AnimationMode.none&&H!==D.AnimationMode.minimal;var O=z?300:10;var x=17;var E=I.toPx(1);var F=5;var $=d.get({name:"_sap_m_Dialog_VerticalMargin",callback:function(t){$=parseFloat(t)}});if($){$=parseFloat($)}else{$=3}var W=r.extend("sap.m.Dialog",{metadata:{interfaces:["sap.ui.core.PopupInterface"],library:"sap.m",properties:{icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},title:{type:"string",group:"Appearance",defaultValue:null},showHeader:{type:"boolean",group:"Appearance",defaultValue:true},type:{type:"sap.m.DialogType",group:"Appearance",defaultValue:A.Standard},state:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:P.None},stretchOnPhone:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},stretch:{type:"boolean",group:"Appearance",defaultValue:false},contentWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},contentHeight:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},horizontalScrolling:{type:"boolean",group:"Behavior",defaultValue:true},verticalScrolling:{type:"boolean",group:"Behavior",defaultValue:true},resizable:{type:"boolean",group:"Behavior",defaultValue:false},draggable:{type:"boolean",group:"Behavior",defaultValue:false},escapeHandler:{type:"function",group:"Behavior",defaultValue:null},role:{type:"sap.m.DialogRoleType",group:"Data",defaultValue:M.Dialog,visibility:"hidden"},closeOnNavigation:{type:"boolean",group:"Behavior",defaultValue:true},titleAlignment:{type:"sap.m.TitleAlignment",group:"Misc",defaultValue:w.Auto}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},subHeader:{type:"sap.m.IBar",multiple:false},customHeader:{type:"sap.m.IBar",multiple:false},beginButton:{type:"sap.m.Button",multiple:false},endButton:{type:"sap.m.Button",multiple:false},buttons:{type:"sap.m.Button",multiple:true,singularName:"button"},_header:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_icon:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_toolbar:{type:"sap.m.OverflowToolbar",multiple:false,visibility:"hidden"},_valueState:{type:"sap.ui.core.InvisibleText",multiple:false,visibility:"hidden"}},associations:{leftButton:{type:"sap.m.Button",multiple:false,deprecated:true},rightButton:{type:"sap.m.Button",multiple:false,deprecated:true},initialFocus:{type:"sap.ui.core.Control",multiple:false},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{beforeOpen:{},afterOpen:{},beforeClose:{parameters:{origin:{type:"sap.m.Button"}}},afterClose:{parameters:{origin:{type:"sap.m.Button"}}}},designtime:"sap/m/designtime/Dialog.designtime"}});f.call(W.prototype,{header:{suffix:"header"},subHeader:{selector:".sapMDialogSubHeader .sapMIBar"},content:{selector:".sapMDialogScrollCont"},footer:{suffix:"footer"}});b.call(W.prototype,"content",function(){return this._headerTitle?this._headerTitle.getId():false});W._bPaddingByDefault=C.getConfiguration().getCompatibilityVersion("sapMDialogWithPadding").compareTo("1.16")<0;W._mIcons={};W._mIcons[P.Success]=l.getIconURI("sys-enter-2");W._mIcons[P.Warning]=l.getIconURI("alert");W._mIcons[P.Error]=l.getIconURI("error");W._mIcons[P.Information]=l.getIconURI("information");W.prototype.init=function(){var t=this;this._oManuallySetSize=null;this._oManuallySetPosition=null;this._bRTL=C.getConfiguration().getRTL();this._scrollContentList=["sap.m.NavContainer","sap.m.Page","sap.m.ScrollContainer","sap.m.SplitContainer","sap.m.MultiInput","sap.m.SimpleFixFlex"];this.oPopup=new h;this.oPopup.setShadow(true);this.oPopup.setNavigationMode("SCOPE");this.oPopup.setModal(true);this.oPopup.setAnimations(R.proxy(this._openAnimation,this),R.proxy(this._closeAnimation,this));this.oPopup._applyPosition=function(e,i){t._setDimensions();t._adjustScrollingPane();if(t._oManuallySetPosition){e.at={left:t._oManuallySetPosition.x,top:t._oManuallySetPosition.y}}else{e.at=t._calcPosition()}t._deregisterContentResizeHandler();h.prototype._applyPosition.call(this,e);t._registerContentResizeHandler()};if(W._bPaddingByDefault){this.addStyleClass("sapUiPopupWithPadding")}this._initTitlePropagationSupport();this._initResponsivePaddingsEnablement()};W.prototype.onBeforeRendering=function(){var t=this._getAnyHeader();if(!W._bPaddingByDefault&&this.hasStyleClass("sapUiPopupWithPadding")){v.warning("Usage of CSS class 'sapUiPopupWithPadding' is deprecated. Use 'sapUiContentPadding' instead",null,"sap.m.Dialog")}if(this._hasSingleScrollableContent()){this.setVerticalScrolling(false);this.setHorizontalScrolling(false);v.info("VerticalScrolling and horizontalScrolling in sap.m.Dialog with ID "+this.getId()+" has been disabled because there's scrollable content inside")}else if(!this._oScroller){this._oScroller=new p(this,this.getId()+"-scroll",{horizontal:this.getHorizontalScrolling(),vertical:this.getVerticalScrolling()})}if(this._oScroller){this._oScroller.setVertical(this.getVerticalScrolling());this._oScroller.setHorizontal(this.getHorizontalScrolling())}this._createToolbarButtons();if(C.getConfiguration().getAccessibility()&&this.getState()!=P.None){var e=new g({text:this.getValueStateString(this.getState())});this.setAggregation("_valueState",e);this.addAriaLabelledBy(e.getId())}if(t&&t.setTitleAlignment){t.setProperty("titleAlignment",this.getTitleAlignment(),true)}if(t&&this._getTitles(t).length===0){t._setRootAccessibilityRole("heading");t._setRootAriaLevel("2")}};W.prototype.onAfterRendering=function(){this._$scrollPane=this.$("scroll");this._$content=this.$("cont");this._$dialog=this.$();if(this.isOpen()){this._setInitialFocus()}};W.prototype.exit=function(){e.removeDialogInstance(this);this._deregisterContentResizeHandler();this._deregisterResizeHandler();if(this.oPopup){this.oPopup.detachOpened(this._handleOpened,this);this.oPopup.detachClosed(this._handleClosed,this);this.oPopup.destroy();this.oPopup=null}if(this._oScroller){this._oScroller.destroy();this._oScroller=null}if(this._header){this._header.destroy();this._header=null}if(this._headerTitle){this._headerTitle.destroy();this._headerTitle=null}if(this._iconImage){this._iconImage.destroy();this._iconImage=null}if(this._toolbarSpacer){this._toolbarSpacer.destroy();this._toolbarSpacer=null}};W.prototype.open=function(){var t=this.oPopup;t.setInitialFocusId(this.getId());var i=t.getOpenState();switch(i){case T.OPEN:case T.OPENING:return this;case T.CLOSING:this._bOpenAfterClose=true;break;default:}this._oCloseTrigger=null;this.fireBeforeOpen();t.attachOpened(this._handleOpened,this);this._iLastWidthAndHeightWithScroll=null;t.setContent(this);t.open();this._registerResizeHandler();e.addDialogInstance(this);return this};W.prototype.close=function(){this._bOpenAfterClose=false;this.$().removeClass("sapDialogDisableTransition");this._deregisterResizeHandler();var t=this.oPopup;var e=this.oPopup.getOpenState();if(!(e===T.CLOSED||e===T.CLOSING)){n.closeKeyboard();this.fireBeforeClose({origin:this._oCloseTrigger});t.attachClosed(this._handleClosed,this);this._bDisableRepositioning=false;this._oManuallySetPosition=null;this._oManuallySetSize=null;t.close();this._deregisterContentResizeHandler()}return this};W.prototype.isOpen=function(){return!!this.oPopup&&this.oPopup.isOpen()};W.prototype.setIcon=function(t){this._bHasCustomIcon=true;return this.setProperty("icon",t)};W.prototype.setState=function(t){var e;this.setProperty("state",t);if(this._bHasCustomIcon){return this}if(t===P.None){e=""}else{e=W._mIcons[t]}this.setProperty("icon",e);return this};W.prototype._handleOpened=function(){this.oPopup.detachOpened(this._handleOpened,this);this._setInitialFocus();this.fireAfterOpen()};W.prototype._handleClosed=function(){if(!this.oPopup){return}this.oPopup.detachClosed(this._handleClosed,this);if(this.getDomRef()){u.preserveContent(this.getDomRef());this.$().remove()}e.removeDialogInstance(this);this.fireAfterClose({origin:this._oCloseTrigger});if(this._bOpenAfterClose){this._bOpenAfterClose=false;this.open()}};W.prototype.onfocusin=function(t){var e=t.target;if(e.id===this.getId()+"-firstfe"){var i=this.$("footer").lastFocusableDomRef()||this.$("cont").lastFocusableDomRef()||this.getSubHeader()&&this.getSubHeader().$().firstFocusableDomRef()||this._getAnyHeader()&&this._getAnyHeader().$().lastFocusableDomRef();if(i){i.focus()}}else if(e.id===this.getId()+"-lastfe"){var o=this._getFocusableHeader()||this._getAnyHeader()&&this._getAnyHeader().$().firstFocusableDomRef()||this.getSubHeader()&&this.getSubHeader().$().firstFocusableDomRef()||this.$("cont").firstFocusableDomRef()||this.$("footer").firstFocusableDomRef();if(o){o.focus()}}};W.prototype._getPromiseWrapper=function(){var t=this;return{reject:function(){t.currentPromise.reject()},resolve:function(){t.currentPromise.resolve()}}};W.prototype.onsapescape=function(t){var e=this.getEscapeHandler(),i={},o=this;if(this._isSpaceOrEnterPressed){return}if(t.originalEvent&&t.originalEvent._sapui_handledByControl){return}this._oCloseTrigger=null;if(typeof e==="function"){new Promise(function(t,s){i.resolve=t;i.reject=s;o.currentPromise=i;e(o._getPromiseWrapper())}).then(function(t){o.close()}).catch(function(){v.info("Disallow dialog closing")})}else{this.close()}t.stopPropagation()};W.prototype.onkeyup=function(t){if(this._isSpaceOrEnter(t)){this._isSpaceOrEnterPressed=false}};W.prototype.onkeydown=function(t){if(this._isSpaceOrEnter(t)){this._isSpaceOrEnterPressed=true}this._handleKeyboardDragResize(t)};W.prototype._handleKeyboardDragResize=function(t){if(t.target!==this._getFocusableHeader()||[m.ARROW_LEFT,m.ARROW_RIGHT,m.ARROW_UP,m.ARROW_DOWN].indexOf(t.keyCode)===-1){return}if(!this.getResizable()&&t.shiftKey||!this.getDraggable()&&!t.shiftKey){return}var e=this._$dialog,i=this.getDomRef().getBoundingClientRect(),o={left:i.x,top:i.y},s=this._getAreaDimensions(),n=e.width(),a=e.height(),r=e.outerHeight(true),l=t.shiftKey,h,p;this._bDisableRepositioning=true;e.addClass("sapDialogDisableTransition");if(l){this._oManuallySetSize=true;this.$("cont").height("").width("")}switch(t.keyCode){case m.ARROW_LEFT:if(l){n-=E}else{o.left-=E}break;case m.ARROW_RIGHT:if(l){n+=E}else{o.left+=E}break;case m.ARROW_UP:if(l){a-=E}else{o.top-=E}break;case m.ARROW_DOWN:if(l){a+=E}else{o.top+=E}break}if(l){p=s.bottom-o.top-r+a;if(t.keyCode===m.ARROW_DOWN){p-=E}h={width:Math.min(n,s.right-o.left),height:Math.min(a,p)}}else{h={left:Math.min(Math.max(s.left,o.left),s.right-n),top:Math.min(Math.max(s.top,o.top),s.bottom-r)}}e.css(h)};W.prototype._isSpaceOrEnter=function(t){var e=t.which||t.keyCode;return e==m.SPACE||e==m.ENTER};W.prototype._openAnimation=function(t,e,i){t.addClass("sapMDialogOpen");setTimeout(i,O)};W.prototype._closeAnimation=function(t,e,i){t.removeClass("sapMDialogOpen");setTimeout(i,O)};W.prototype._setDimensions=function(){var t=this.$(),e=this.getStretch(),i=this.getStretchOnPhone()&&_.system.phone,o=this.getType()===A.Message,s={};if(!e){if(!this._oManuallySetSize){s.width=this.getContentWidth()||undefined;s.height=this.getContentHeight()||undefined}else{s.width=this._oManuallySetSize.width;s.height=this._oManuallySetSize.height}}if(s.width=="auto"){s.width=undefined}if(s.height=="auto"){s.height=undefined}if(e&&!o||i){this.$().addClass("sapMDialogStretched")}t.css(s);if(!this._oManuallySetSize&&!this._bDisableRepositioning){this._positionDialog()}if(window.navigator.userAgent.toLowerCase().indexOf("chrome")!==-1&&this.getStretch()){t.find("> footer").css({bottom:"0.001px"})}};W.prototype._adjustScrollingPane=function(){if(this._oScroller){this._oScroller.refresh()}};W.prototype._onResize=function(){var t=this.$(),e=this.$("cont"),i=this.getContentWidth(),o=this._calcMaxSizes().maxWidth;if(this._oManuallySetSize){e.css({width:"auto"});return}if(_.system.desktop&&!_.browser.chrome){var s=e.width()+"x"+e.height(),n=t.css("min-width")!==t.css("width");if(s!==this._iLastWidthAndHeightWithScroll&&n){if(this._hasVerticalScrollbar()&&(!i||i=="auto")&&!this.getStretch()&&e.width()<o){t.addClass("sapMDialogVerticalScrollIncluded");e.css({"padding-right":x});this._iLastWidthAndHeightWithScroll=s}else{t.removeClass("sapMDialogVerticalScrollIncluded");e.css({"padding-right":""});this._iLastWidthAndHeightWithScroll=null}}}if(!this._oManuallySetSize&&!this._bDisableRepositioning){this._positionDialog()}};W.prototype._hasVerticalScrollbar=function(){var t=this.$("cont");return t[0].clientHeight<t[0].scrollHeight};W.prototype._positionDialog=function(){var t=this.$();t.css(this._calcMaxSizes());t.css(this._calcPosition())};W.prototype._calcPosition=function(){var t=this._getAreaDimensions(),e=this.$(),i,o,s;if(_.system.phone&&this.getStretch()){i=0;o=0}else if(this.getStretch()){i=this._percentOfSize(t.width,F);o=this._percentOfSize(t.height,$)}else{i=(t.width-e.outerWidth())/2;o=(t.height-e.outerHeight())/2}s={top:Math.round(t.top+o)};s[this._bRTL?"right":"left"]=Math.round(t.left+i);return s};W.prototype._calcMaxSizes=function(){var t=this._getAreaDimensions(),e=this.$(),i=e.find(".sapMDialogTitle").height()||0,o=e.find(".sapMDialogSubHeader").height()||0,s=e.find("footer").height()||0,n=i+o+s,a,r;if(_.system.phone&&this.getStretch()){r=t.width;a=t.height-n}else{r=this._percentOfSize(t.width,100-2*F);a=this._percentOfSize(t.height,100-2*$)-n}if(a<parseInt(e.css("min-height"))){v.error("Height of Within Area is not enough to fit dialog")}if(r<parseInt(e.css("min-width"))){v.error("Width of Within Area is not enough to fit dialog")}return{maxWidth:Math.floor(r),maxHeight:Math.floor(a)}};W.prototype._getAreaDimensions=function(){var t=h.getWithinAreaDomRef(),e;if(t===window){e={left:0,top:0,width:t.innerWidth,height:t.innerHeight}}else{var i=t.getBoundingClientRect(),o=R(t);e={left:i.left+parseFloat(o.css("border-left-width")),top:i.top+parseFloat(o.css("border-top-width")),width:t.clientWidth,height:t.clientHeight}}e.right=e.left+e.width;e.bottom=e.top+e.height;return e};W.prototype._percentOfSize=function(t,e){return Math.round(t*e/100)};W.prototype._createHeader=function(){if(!this._header){this._header=new t(this.getId()+"-header",{titleAlignment:this.getTitleAlignment()});this.setAggregation("_header",this._header)}};W.prototype._applyTitleToHeader=function(){var t=this.getProperty("title");if(this._headerTitle){this._headerTitle.setText(t)}else{this._headerTitle=new s(this.getId()+"-title",{text:t,level:B.H2}).addStyleClass("sapMDialogTitle");this._header.addContentMiddle(this._headerTitle)}};W.prototype._hasSingleScrollableContent=function(){var t=this.getContent();while(t.length===1&&t[0]instanceof r&&t[0].isA("sap.ui.core.mvc.View")){t=t[0].getContent()}if(t.length===1&&t[0]instanceof r&&t[0].isA(this._scrollContentList)){return true}return false};W.prototype._getFocusDomRef=function(){var t=this.getInitialFocus();if(t){return document.getElementById(t)}return this._getFocusableHeader()||this._getFirstFocusableContentSubHeader()||this._getFirstFocusableContentElement()||this._getFirstVisibleButtonDomRef()||this.getDomRef()};W.prototype._getFirstVisibleButtonDomRef=function(){var t=this.getBeginButton(),e=this.getEndButton(),i=this.getButtons(),o;if(t&&t.getVisible()){o=t.getDomRef()}else if(e&&e.getVisible()){o=e.getDomRef()}else if(i&&i.length>0){for(var s=0;s<i.length;s++){if(i[s].getVisible()){o=i[s].getDomRef();break}}}return o};W.prototype._getFocusableHeader=function(){if(!this._isDraggableOrResizable()){return null}return this.$().find("header.sapMDialogTitle")[0]};W.prototype._getFirstFocusableContentSubHeader=function(){var t=this.$().find(".sapMDialogSubHeader");return t.firstFocusableDomRef()};W.prototype._getFirstFocusableContentElement=function(){var t=this.$("cont");return t.firstFocusableDomRef()};W.prototype._setInitialFocus=function(){var t=this._getFocusDomRef(),e;if(t&&t.id){e=C.byId(t.id)}if(e){if(e.getVisible&&!e.getVisible()){this.focus();return}t=e.getFocusDomRef()}if(!t){this.setInitialFocus("");t=this._getFocusDomRef()}if(!this.getInitialFocus()){this.setAssociation("initialFocus",t?t.id:this.getId(),true)}if(_.system.desktop||t&&!/input|textarea|select/i.test(t.tagName)){if(t){t.focus()}}else{this.focus()}};W.prototype.getScrollDelegate=function(){return this._oScroller};W.prototype._isToolbarEmpty=function(){var t=this._oToolbar.getContent().filter(function(t){return t.getMetadata().getName()!=="sap.m.ToolbarSpacer"});return t.length===0};W.prototype._getAnyHeader=function(){var t=this.getCustomHeader();if(t){return t}else{var e=this.getShowHeader();if(!e){return null}this._createHeader();this._applyTitleToHeader();this._applyIconToHeader();return this._header}};W.prototype._deregisterResizeHandler=function(){var t=h.getWithinAreaDomRef();if(t===window){_.resize.detachHandler(this._onResize,this)}else{c.deregister(this._withinResizeListenerId);this._withinResizeListenerId=null}};W.prototype._registerResizeHandler=function(){var t=h.getWithinAreaDomRef();if(t===window){_.resize.attachHandler(this._onResize,this)}else{this._withinResizeListenerId=c.register(t,this._onResize.bind(this))}this._onResize()};W.prototype._deregisterContentResizeHandler=function(){if(this._sContentResizeListenerId){c.deregister(this._sContentResizeListenerId);this._sContentResizeListenerId=null}};W.prototype._registerContentResizeHandler=function(){if(!this._sContentResizeListenerId){this._sContentResizeListenerId=c.register(this.getDomRef("scrollCont"),R.proxy(this._onResize,this))}this._onResize()};W.prototype._attachHandler=function(t){var e=this;if(!this._oButtonDelegate){this._oButtonDelegate={ontap:function(){e._oCloseTrigger=this},onkeyup:function(){e._oCloseTrigger=this},onkeydown:function(){e._oCloseTrigger=this}}}if(t){t.addDelegate(this._oButtonDelegate,true,t)}};W.prototype._createToolbarButtons=function(){var t=this._getToolbar();var e=this.getButtons();var i=this.getBeginButton();var s=this.getEndButton(),n=this,a=[i,s];a.forEach(function(t){if(t&&n._oButtonDelegate){t.removeDelegate(n._oButtonDelegate)}});t.removeAllContent();if(!("_toolbarSpacer"in this)){this._toolbarSpacer=new o}t.addContent(this._toolbarSpacer);a.forEach(function(t){n._attachHandler(t)});if(e&&e.length){e.forEach(function(e){t.addContent(e)})}else{if(i){t.addContent(i)}if(s){t.addContent(s)}}};W.prototype._getToolbar=function(){if(!this._oToolbar){this._oToolbar=new i(this.getId()+"-footer").addStyleClass("sapMTBNoBorders");this._oToolbar.addDelegate({onAfterRendering:function(){if(this.getType()===A.Message){this.$("footer").removeClass("sapContrast sapContrastPlus")}}},false,this);this.setAggregation("_toolbar",this._oToolbar)}return this._oToolbar};W.prototype.getValueStateString=function(t){var e=C.getLibraryResourceBundle("sap.m");switch(t){case P.Success:return e.getText("LIST_ITEM_STATE_SUCCESS");case P.Warning:return e.getText("LIST_ITEM_STATE_WARNING");case P.Error:return e.getText("LIST_ITEM_STATE_ERROR");case P.Information:return e.getText("LIST_ITEM_STATE_INFORMATION");default:return""}};W.prototype._isDraggableOrResizable=function(){return!this.getStretch()&&(this.getDraggable()||this.getResizable())};W.prototype.setSubHeader=function(t){this.setAggregation("subHeader",t);if(t){t.setVisible=function(e){t.setProperty("visible",e);this.invalidate()}.bind(this)}return this};W.prototype.setLeftButton=function(t){if(typeof t==="string"){t=C.byId(t)}this.setBeginButton(t);return this.setAssociation("leftButton",t)};W.prototype.setRightButton=function(t){if(typeof t==="string"){t=C.byId(t)}this.setEndButton(t);return this.setAssociation("rightButton",t)};W.prototype.getLeftButton=function(){var t=this.getBeginButton();return t?t.getId():null};W.prototype.getRightButton=function(){var t=this.getEndButton();return t?t.getId():null};W.prototype.setBeginButton=function(t){if(t&&t.isA("sap.m.Button")){t.addStyleClass("sapMDialogBeginButton")}return this.setAggregation("beginButton",t)};W.prototype.setEndButton=function(t){if(t&&t.isA("sap.m.Button")){t.addStyleClass("sapMDialogEndButton")}return this.setAggregation("endButton",t)};W.prototype.getAggregation=function(t,e,i){var o=r.prototype.getAggregation.apply(this,Array.prototype.slice.call(arguments,0,2));if(t==="buttons"&&o&&o.length===0){this.getBeginButton()&&o.push(this.getBeginButton());this.getEndButton()&&o.push(this.getEndButton())}return o};W.prototype.getAriaLabelledBy=function(){var t=this._getAnyHeader(),e=this.getAssociation("ariaLabelledBy",[]).slice();var i=this.getSubHeader();if(i){var o=this._getTitles(i);if(o.length){e=o.map(function(t){return t.getId()}).concat(e)}}if(t){var s=this._getTitles(t);if(s.length){e=s.map(function(t){return t.getId()}).concat(e)}else{e.unshift(t.getId())}}return e};W.prototype._applyIconToHeader=function(){var t=this.getIcon();if(!t){if(this._iconImage){this._iconImage.destroy();this._iconImage=null}return}if(!this._iconImage){this._iconImage=l.createControlByURI({id:this.getId()+"-icon",src:t,useIconTooltip:false},a).addStyleClass("sapMDialogIcon");this._header.insertAggregation("contentMiddle",this._iconImage,0)}this._iconImage.setSrc(t)};W.prototype.setInitialFocus=function(t){return this.setAssociation("initialFocus",t,true)};W.prototype.invalidate=function(t){if(this.isOpen()){r.prototype.invalidate.call(this,t)}};function L(t){var e=R(t);var i=e.control(0);if(e.parents(".sapMDialogSection").length){return false}if(!i||i.getMetadata().getInterfaces().indexOf("sap.m.IBar")>-1){return true}return e.hasClass("sapMDialogTitle")}if(_.system.desktop){W.prototype.ondblclick=function(t){if(L(t.target)){var e=this.$("cont");this._bDisableRepositioning=false;this._oManuallySetPosition=null;this._oManuallySetSize=null;this.oPopup&&this.oPopup._applyPosition(this.oPopup._oLastPosition,true);e.css({height:"100%"})}};W.prototype.onmousedown=function(t){if(t.which===3){return}if(!this._isDraggableOrResizable()){return}var e;var i=this;var o=R(document);var s=R(t.target);var n=s.hasClass("sapMDialogResizeHandler")&&this.getResizable();var a=function(t){e=e?clearTimeout(e):setTimeout(function(){t()},0)};var r=this._getAreaDimensions();var l=this.getDomRef().getBoundingClientRect();var h={x:t.pageX,y:t.pageY,width:i._$dialog.width(),height:i._$dialog.height(),outerHeight:i._$dialog.outerHeight(),offset:{x:t.offsetX?t.offsetX:t.originalEvent.layerX,y:t.offsetY?t.offsetY:t.originalEvent.layerY},position:{x:l.x,y:l.y}};var p;function u(){var t=i.$(),e=i.$("cont"),s,a;o.off("mouseup",u);o.off("mousemove",p);if(n){i._$dialog.removeClass("sapMDialogResizing");s=parseInt(t.height());a=parseInt(t.css("border-top-width"))+parseInt(t.css("border-bottom-width"));e.height(s+a)}}if(L(t.target)&&this.getDraggable()||n){i._bDisableRepositioning=true;i._$dialog.addClass("sapDialogDisableTransition");i._oManuallySetPosition={x:h.position.x,y:h.position.y};i._$dialog.css({left:Math.min(Math.max(r.left,i._oManuallySetPosition.x),r.right-h.width),top:Math.min(Math.max(r.top,i._oManuallySetPosition.y),r.bottom-h.height),width:h.width})}if(L(t.target)&&this.getDraggable()){p=function(e){e.preventDefault();if(e.buttons===0){u();return}a(function(){i._bDisableRepositioning=true;i._oManuallySetPosition={x:Math.max(r.left,Math.min(e.pageX-t.pageX+h.position.x,r.right-h.width)),y:Math.max(r.top,Math.min(e.pageY-t.pageY+h.position.y,r.bottom-h.outerHeight))};i._$dialog.css({top:i._oManuallySetPosition.y,left:i._oManuallySetPosition.x,right:i._bRTL?"":undefined})})};o.on("mousemove",p)}else if(n){i._$dialog.addClass("sapMDialogResizing");var g={};var c=parseInt(i._$dialog.css("min-width"));var d=h.x+h.width-c;var f=s.width()-t.offsetX;var _=s.height()-t.offsetY;p=function(t){a(function(){i._bDisableRepositioning=true;i.$("cont").height("").width("");if(t.pageY+_>r.bottom){t.pageY=r.bottom-_}if(t.pageX+f>r.right){t.pageX=r.right-f}i._oManuallySetSize={width:h.width+t.pageX-h.x,height:h.height+t.pageY-h.y};if(i._bRTL){g.left=Math.min(Math.max(t.pageX,0),d);i._oManuallySetSize.width=h.width+h.x-Math.max(t.pageX,0)}g.width=i._oManuallySetSize.width;g.height=i._oManuallySetSize.height;i._$dialog.css(g)})};o.on("mousemove",p)}else{return}o.on("mouseup",u);t.stopPropagation()}}W.prototype._applyContextualSettings=function(){r.prototype._applyContextualSettings.call(this)};W.prototype._getTitles=function(t){return t.findAggregatedObjects(true,function(t){return t.isA("sap.m.Title")})};return W});