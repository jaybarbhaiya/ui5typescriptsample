/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/core/ResizeHandler","sap/ui/layout/library","./FormLayout","./ColumnLayoutRenderer","sap/ui/thirdparty/jquery"],function(e,t,a,i,l,s){"use strict";var r=i.extend("sap.ui.layout.form.ColumnLayout",{metadata:{library:"sap.ui.layout",properties:{columnsXL:{type:"sap.ui.layout.form.ColumnsXL",group:"Appearance",defaultValue:2},columnsL:{type:"sap.ui.layout.form.ColumnsL",group:"Appearance",defaultValue:2},columnsM:{type:"sap.ui.layout.form.ColumnsM",group:"Appearance",defaultValue:1},labelCellsLarge:{type:"sap.ui.layout.form.ColumnCells",group:"Appearance",defaultValue:4},emptyCellsLarge:{type:"sap.ui.layout.form.EmptyCells",group:"Appearance",defaultValue:0}}}});r.prototype.init=function(){i.prototype.init.apply(this,arguments);this._iBreakPointTablet=e.media._predefinedRangeSets[e.media.RANGESETS.SAP_STANDARD_EXTENDED].points[0];this._iBreakPointDesktop=e.media._predefinedRangeSets[e.media.RANGESETS.SAP_STANDARD_EXTENDED].points[1];this._iBreakPointLargeDesktop=e.media._predefinedRangeSets[e.media.RANGESETS.SAP_STANDARD_EXTENDED].points[2];this._resizeProxy=s.proxy(n,this);if(typeof ResizeObserver==="function"){this._oResizeObserver=new ResizeObserver(this._resizeProxy)}};r.prototype.exit=function(){o.call(this);this._oResizeObserver=undefined};r.prototype.onBeforeRendering=function(e){i.prototype.onBeforeRendering.apply(this,arguments);if(this.getColumnsM()>this.getColumnsL()||this.getColumnsL()>this.getColumnsXL()){throw new Error("Column size not correct defined for "+this)}o.call(this)};r.prototype.onAfterRendering=function(e){if(this._oResizeObserver){var a=this.getDomRef();this._oResizeObserver.observe(a)}else{this._sResizeListener=t.register(this,this._resizeProxy)}u.call(this)};r.prototype.toggleContainerExpanded=function(e){e.$().toggleClass("sapUiFormCLContainerColl",!e.getExpanded())};r.prototype.onLayoutDataChange=function(e){this.invalidate()};r.prototype.onsapup=function(e){this.onsapleft(e)};r.prototype.onsapdown=function(e){this.onsapright(e)};r.prototype.getContainerRenderedDomRef=function(e){return e.getDomRef()};r.prototype.getElementRenderedDomRef=function(e){return e.getDomRef()};r.prototype._getContainerSize=function(e){var t=this.getParent();var a=this.getLayoutDataForElement(e,"sap.ui.layout.form.ColumnContainerData");var i=t.getVisibleFormContainers();var l=i.length;var s=this.getColumnsM();var r=this.getColumnsL();var o=this.getColumnsXL();var n={S:{Size:1,Break:false,FirstRow:false},M:{Size:1,Break:false,FirstRow:false},L:{Size:1,Break:false,FirstRow:false},XL:{Size:1,Break:false,FirstRow:false}};var u=function(e,t,a,i,l){if(a<e){t.Size=Math.floor(e/a);if(l&&t.Size*a<e){t.Size=t.Size+e-t.Size*a}}t.Break=e>1&&i>0&&i%e===0;t.FirstRow=a>1&&i<e};if(a){n.M.Size=a.getColumnsM();n.L.Size=a.getColumnsL();n.XL.Size=a.getColumnsXL();if(n.M.Size>s||n.L.Size>r||n.XL.Size>o){throw new Error("More cells defined for FormContainer "+e.getId()+" than columns on "+this)}}if(l===1){if(!a){n.M.Size=s;n.L.Size=r;n.XL.Size=o}n.S.FirstRow=true;n.M.FirstRow=true;n.L.FirstRow=true;n.XL.FirstRow=true}else{var f=0;var g=0;var m=0;var p;var C=false;var L=0;var d=s;var S=r;var h=o;var v=0;for(v=0;v<l;v++){if(e===i[v]){f=v;p=a}else{p=this.getLayoutDataForElement(i[v],"sap.ui.layout.form.ColumnContainerData")}if(!p){var y=i[v].getVisibleFormElements();if(g<y.length){g=y.length;m=v}L++}else{C=true;d=d-p.getColumnsM();S=S-p.getColumnsL();h=h-p.getColumnsXL()}}n.S.FirstRow=l>1&&f===0;n.S.Break=f>0;if(!C){u(s,n.M,l,f,f===m);u(r,n.L,l,f,f===m);u(o,n.XL,l,f,f===m)}else{if(!a){if(L<d){u(d,n.M,L,f,f===m)}if(L<S){u(S,n.L,L,f,f===m)}if(L<h){u(h,n.XL,L,f,f===m)}}var c={M:{rowColumns:0,lineBreak:false,first:true},L:{rowColumns:0,lineBreak:false,first:true},XL:{rowColumns:0,lineBreak:false,first:true}};var D=function(e,t,a){if(a){if(e.rowColumns+a<=t){e.rowColumns=e.rowColumns+a;e.lineBreak=false}else{e.rowColumns=a;if(t>1){e.lineBreak=true}e.first=false}}else{if(e.rowColumns<t){e.rowColumns++;e.lineBreak=false}else{e.rowColumns=1;if(t>1){e.lineBreak=true}e.first=false}}};for(v=0;v<l;v++){if(e===i[v]){p=a}else{p=this.getLayoutDataForElement(i[v],"sap.ui.layout.form.ColumnContainerData")}D(c.M,s,p?p.getColumnsM():0);D(c.L,r,p?p.getColumnsL():0);D(c.XL,o,p?p.getColumnsXL():0);if(e===i[v]){n.M.Break=c.M.lineBreak;n.L.Break=c.L.lineBreak;n.XL.Break=c.XL.lineBreak;n.M.FirstRow=c.M.first;n.L.FirstRow=c.L.first;n.XL.FirstRow=c.XL.first;break}}}}return n};r.prototype._getFieldSize=function(e){var t=12;var a=this.getLayoutDataForElement(e,"sap.ui.layout.form.ColumnElementData");var i={S:{Size:t,Break:false,Space:0},L:{Size:t,Break:false,Space:0}};var l=t;var r=this.getLabelCellsLarge();if(a){i.S.Size=a.getCellsSmall()===-1?t:a.getCellsSmall();i.L.Size=a.getCellsLarge()===-1?t:a.getCellsLarge()}var o=e.getParent();var n=o.getLabelControl();if(n===e){if(!a||a.getCellsSmall()===-1){i.S.Size=l}if(!a||a.getCellsLarge()===-1){i.L.Size=r}}else{var u=o.getFieldsForRendering();var f=u.length;var g=t;var m=t-this.getEmptyCellsLarge();if(n){var p=this.getLayoutDataForElement(n,"sap.ui.layout.form.ColumnElementData");if(p){l=p.getCellsSmall()===-1?l:p.getCellsSmall();r=p.getCellsLarge()===-1?r:p.getCellsLarge()}if(l<t){g=g-l}if(r<t){m=m-r}}else{l=0;r=0}if(f===1){if(!a||a.getCellsSmall()===-1){i.S.Size=g}else if(n){if(i.S.Size>g){i.S.Break=true}}if(!a||a.getCellsLarge()===-1){i.L.Size=m}else if(n){if(i.L.Size>m){i.L.Break=true}}}else{var C=0;var L=[];var d=[];var S={availableCells:g,first:0,last:999,firstDefault:-1,defaultFields:0};var h=0;var v=0;var y=0;var c;L.push(s.extend({},S));S.availableCells=m;d.push(s.extend({},S));var D=function(e,t,a,i){e[t].last=a-1;e.push(s.extend({},S));t++;e[t].first=a;e[t].availableCells=i;return t};var F=function(e,a,i,l,s){if(e[a].availableCells-e[a].defaultFields<i){if(i<=l){a=D(e,a,s,l)}else{a=D(e,a,s,t)}}e[a].availableCells=e[a].availableCells-i;return a};var z=function(e,t,a,i){if(e[t].availableCells===e[t].defaultFields){t=D(e,t,i,a)}if(e[t].firstDefault<0){e[t].firstDefault=i}e[t].defaultFields++;return t};for(C=0;C<f;C++){if(e!==u[C]){c=this.getLayoutDataForElement(u[C],"sap.ui.layout.form.ColumnElementData")}else{c=a;y=C}if(c&&c.getCellsSmall()>0){h=F(L,h,c.getCellsSmall(),g,C)}else{h=z(L,h,g,C)}if(c&&c.getCellsLarge()>0){v=F(d,v,c.getCellsLarge(),m,C)}else{v=z(d,v,m,C)}}var k=function(e,a,i,l,s){var r=0;var o;for(C=0;C<e.length;C++){if(a>=e[C].first&&a<=e[C].last){o=e[C];break}}if(i<=0){l.Size=Math.floor(o.availableCells/o.defaultFields)}if(a===o.first&&a>0){l.Break=true;if(s>0&&s<t&&l.Size<=t-s){l.Space=s}}if(a===o.firstDefault){r=o.availableCells-o.defaultFields*l.Size;if(r>0){l.Size=l.Size+r}}};k(L,y,a?a.getCellsSmall():-1,i.S,l);k(d,y,a?a.getCellsLarge():-1,i.L,r)}}return i};function o(){if(this._oResizeObserver){this._oResizeObserver.disconnect()}if(this._sResizeListener){t.deregister(this._sResizeListener);this._sResizeListener=undefined}}function n(e,t){window.requestAnimationFrame(function(){u.call(this,e,t)}.bind(this))}function u(e,a){var i=this.getDomRef();if(!i){o.call(this);return}var l=this.$();if(!l.is(":visible")){return}if(t.isSuspended(i,this._resizeProxy)){return}var s=i.clientWidth;var r=1;if(s<=this._iBreakPointTablet){l.toggleClass("sapUiFormCLMedia-Std-Phone",true);l.toggleClass("sapUiFormCLMedia-Std-Desktop",false).toggleClass("sapUiFormCLMedia-Std-Tablet",false).toggleClass("sapUiFormCLMedia-Std-LargeDesktop",false)}else if(s>this._iBreakPointTablet&&s<=this._iBreakPointDesktop){l.toggleClass("sapUiFormCLMedia-Std-Tablet",true);l.toggleClass("sapUiFormCLMedia-Std-Desktop",false).toggleClass("sapUiFormCLMedia-Std-Phone",false).toggleClass("sapUiFormCLMedia-Std-LargeDesktop",false);r=this.getColumnsM()}else if(s>this._iBreakPointDesktop&&s<=this._iBreakPointLargeDesktop){l.toggleClass("sapUiFormCLMedia-Std-Desktop",true);l.toggleClass("sapUiFormCLMedia-Std-Phone",false).toggleClass("sapUiFormCLMedia-Std-Tablet",false).toggleClass("sapUiFormCLMedia-Std-LargeDesktop",false);r=this.getColumnsL()}else{l.toggleClass("sapUiFormCLMedia-Std-LargeDesktop",true);l.toggleClass("sapUiFormCLMedia-Std-Desktop",false).toggleClass("sapUiFormCLMedia-Std-Phone",false).toggleClass("sapUiFormCLMedia-Std-Tablet",false);r=this.getColumnsXL()}var n=this.getLabelCellsLarge()<12&&s/r>this._iBreakPointTablet;l.toggleClass("sapUiFormCLWideColumns",n);l.toggleClass("sapUiFormCLSmallColumns",!n)}r.prototype.getLayoutDataForDelimiter=function(){var e=sap.ui.require("sap/ui/layout/form/ColumnElementData");if(!e){var t;sap.ui.require(["sap/ui/layout/form/ColumnElementData"],function(e){t(new e({cellsLarge:1,cellsSmall:1}))});return new Promise(function(e){t=e})}else{return new e({cellsLarge:1,cellsSmall:1})}};r.prototype.getLayoutDataForSemanticField=function(e,t,a){if(a){if(a.isA("sap.ui.layout.form.ColumnElementData")){a.setCellsLarge(-1).setCellsSmall(11);return a}else{a.destroy()}}var i=sap.ui.require("sap/ui/layout/form/ColumnElementData");if(!i){var l;sap.ui.require(["sap/ui/layout/form/ColumnElementData"],function(e){l(new e({cellsLarge:-1,cellsSmall:11}))});return new Promise(function(e){l=e})}else{return new i({cellsLarge:-1,cellsSmall:11})}};return r});