/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/IntervalTrigger","sap/ui/thirdparty/jquery","sap/ui/base/EventProvider","sap/ui/Device"],function(t,i,e,n){"use strict";var o=e.extend("sap.m._Ios7",{constructor:function(){var t=n.os.ios&&n.os.version>=7&&n.os.version<8&&n.browser.name==="sf";e.apply(this);if(!t){return}this._bIntervallAttached=false;this._bInputIsOpen=false;this._bNavigationBarEventFired=false;var o=window.orientation===90||window.orientation===-90;if(o){this._attachNavigationBarPolling()}n.orientation.attachHandler(this._onOrientationChange,this);this._onFocusin=i.proxy(this._onFocusin,this);document.addEventListener("focusin",this._onFocusin,true);this._onFocusout=i.proxy(this._onFocusout,this);document.addEventListener("focusout",this._onFocusout,true)}});o.prototype.getNavigationBarHeight=function(){if(!this._bNavigationBarEventFired){return 0}return this._iNavigationBarHeight};o.prototype._attachNavigationBarPolling=function(){if(!n.system.phone||this._bIntervallAttached){return}t.addListener(this._detectNavigationBar,this);this._bIntervallAttached=true};o.prototype._detachNavigationBarPolling=function(){if(!n.system.phone||!this._bIntervallAttached){return}t.removeListener(this._detectNavigationBar,this);this._bIntervallAttached=false};o.prototype._detectNavigationBar=function(){var t=window.outerHeight-window.innerHeight;if(t===0||this._bInputIsOpen||this._bNavigationBarEventFired){this._iPreviousHeight=null;return}if(this._iPreviousHeight===window.innerHeight){window.scrollTo(0,0);var i=window.outerHeight-window.innerHeight;if(t!==i){return}this._iNavigationBarHeight=t;this._bNavigationBarEventFired=true;this.fireEvent("navigationBarShownInLandscape",{barHeight:t});this._detachNavigationBarPolling();this._iPreviousHeight=null}else{this._iPreviousHeight=window.innerHeight}};o.prototype.destroy=function(){e.prototype.destroy.apply(this,arguments);document.removeEventListener("focusin",this._onFocusin,true);document.removeEventListener("focusout",this._onFocusout,true)};o.prototype._onFocusin=function(t){var i=t.target.tagName;if(!o._rTagRegex.test(i)){return}this._inputTarget=t.target;this._detachNavigationBarPolling();this._bInputIsOpen=true;this.fireEvent("inputOpened")};o._rTagRegex=/INPUT|TEXTAREA|SELECT/;o.prototype._onFocusout=function(t){var i=t.srcElement.tagName,e=t.relatedTarget,n=e&&e.getAttribute("readonly")===null&&e.getAttribute("disabled")===null?e.tagName:"";if(o._rTagRegex.test(i)&&!o._rTagRegex.test(n)){window.scrollTo(0,0);if(window.orientation===90||window.orientation===-90){this._attachNavigationBarPolling()}this._bInputIsOpen=false;this.fireEvent("inputClosed")}};o.prototype._onOrientationChange=function(t){var i=t.landscape;window.scrollTo(0,0);this._bNavigationBarEventFired=false;if(this._bInputIsOpen&&this._inputTarget&&this._inputTarget.blur){this._inputTarget.blur()}else if(i){this._attachNavigationBarPolling()}else if(!i){this._detachNavigationBarPolling()}};var a=new o;return a},true);