/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/date/UniversalDate","sap/ui/unified/CalendarAppointment","sap/ui/unified/CalendarLegendRenderer","sap/ui/Device","sap/ui/unified/library","sap/ui/core/InvisibleText","sap/base/Log"],function(e,t,a,n,i,r,s){"use strict";var l=i.CalendarDayType;var o=i.CalendarIntervalType;var p=i.CalendarAppointmentVisualization;var d=i.CalendarAppointmentHeight;var g={apiVersion:2};g.render=function(e,t){var a=t.getTooltip_AsString();var i=t.getAppointmentsVisualization();var r=this.getLegendItems(t);e.openStart("div",t);e.class("sapUiCalendarRow");if(!n.system.phone&&t.getAppointmentsReducedHeight()){e.class("sapUiCalendarRowAppsRedHeight")}if(i!=p.Standard){e.class("sapUiCalendarRowVis"+i)}if(a){e.attr("title",a)}var s=t.getWidth();if(s){e.style("width",s)}var l=t.getHeight();if(l){e.style("height",l)}e.accessibilityState(t);e.openEnd();this.renderAppointmentsRow(e,t,r);e.close("div")};g.renderAppointmentsRow=function(e,t,a){var n=t.getId();e.openStart("div",n+"-Apps");e.class("sapUiCalendarRowApps");e.openEnd();this.renderBeforeAppointments(e,t);this.renderAppointments(e,t,a);this.renderAfterAppointments(e,t);e.close("div")};g.renderBeforeAppointments=function(e,t){};g.renderAfterAppointments=function(e,t){};g.renderResizeHandle=function(e,t,a){};g.renderAppointments=function(t,a,n){var i=a._getVisibleAppointments();var r=a._getVisibleIntervalHeaders();var s=a._getStartDate();var l=[];var p=0;var d=0;var g=[];var c=0;var v=0;var f=a.getIntervals();var A=a.getIntervalType();var u=100/f;var C=0;var T=new e(s);var I=false;var h=false;switch(A){case o.Hour:l=a.getNonWorkingHours()||[];p=s.getUTCHours();d=24;break;case o.Day:case o.Week:case o.OneMonth:l=a._getNonWorkingDays();p=s.getUTCDay();d=7;g=a.getNonWorkingHours()||[];c=s.getUTCHours();v=24;break;case o.Month:g=a._getNonWorkingDays();c=s.getUTCDay();v=7;break;default:break}if(a._isOneMonthsRowOnSmallSizes()){this.renderSingleDayInterval(t,a,i,n,r,l,p,d,g,c,v,true,true)}else{for(C=0;C<f;C++){if(h){I=true}else{I=false}h=false;switch(A){case o.Hour:T.setUTCHours(T.getUTCHours()+1);if(T.getUTCHours()==0){h=true}break;case o.Day:case o.Week:case o.OneMonth:T.setUTCDate(T.getUTCDate()+1);if(T.getUTCDate()==1){h=true}break;case o.Month:c=T.getUTCDay();T.setUTCMonth(T.getUTCMonth()+1);if(T.getUTCMonth()==0){h=true}break;default:break}this.renderInterval(t,a,C,u,r,l,p,d,g,c,v,I,h)}this.renderIntervalHeaders(t,a,u,r,f);if(!(a._getRelativeInfo&&a._getRelativeInfo().bIsRelative)){t.openStart("div",a.getId()+"-Now");t.class("sapUiCalendarRowNow");t.openEnd();t.close("div")}for(C=0;C<i.length;C++){var U=i[C];this.renderAppointment(t,a,U,n)}t.openStart("div",a.getId()+"-DummyApp");t.class("sapUiCalendarApp");t.class("sapUiCalendarAppTitleOnly");t.class("sapUiCalendarAppDummy");t.class("sapUiCalendarAppHeight1");t.openEnd();t.close("div")}};g.writeCustomAttributes=function(e,t){};g.renderInterval=function(t,a,n,i,r,s,l,p,d,g,c,v,f,A){var u=a.getId()+"-AppsInt"+n;var C;var T=a.getShowIntervalHeaders()&&(a.getShowEmptyIntervalHeaders()||r.length>0);var I=a.getStartDate().getMonth();var h=new Date(a.getStartDate().getFullYear(),I+1,0).getDate();t.openStart("div",u);t.class("sapUiCalendarRowAppsInt");if(A){t.class(A)}t.style("width",i+"%");if(n>=h&&a.getIntervalType()===o.OneMonth){t.class("sapUiCalItemOtherMonth")}for(C=0;C<s.length;C++){if((n+l)%p==s[C]){t.class("sapUiCalendarRowAppsNoWork");break}}if(!T){t.class("sapUiCalendarRowAppsIntNoHead")}if(v){t.class("sapUiCalendarRowAppsIntFirst")}if(f){t.class("sapUiCalendarRowAppsIntLast")}this.writeCustomAttributes(t,a);t.openEnd();if(T){t.openStart("div");t.class("sapUiCalendarRowAppsIntHead");t.openEnd();t.close("div")}if(a.getShowSubIntervals()){var U=a.getIntervalType();var b=0;switch(U){case o.Hour:b=4;break;case o.Day:case o.Week:case o.OneMonth:b=24;break;case o.Month:var m=a._getStartDate();var S=new e(m);S.setUTCMonth(S.getUTCMonth()+n+1,0);b=S.getUTCDate();S.setUTCDate(1);l=S.getUTCDay();break;default:break}var R=100/b;for(C=0;C<b;C++){t.openStart("div");t.class("sapUiCalendarRowAppsSubInt");t.style("width",R+"%");for(var w=0;w<d.length;w++){if((C+g)%c==d[w]){t.class("sapUiCalendarRowAppsNoWork");break}}t.openEnd();t.close("div")}}t.close("div")};g.renderIntervalHeaders=function(e,t,a,n,i){var r=t.getShowIntervalHeaders()&&(t.getShowEmptyIntervalHeaders()||n.length>0);if(r){for(var s=0;s<n.length;s++){var l=n[s],o,p;if(t._bRTL){p=a*l.interval;o=a*(i-l.last-1)}else{o=a*l.interval;p=a*(i-l.last-1)}this.renderIntervalHeader(e,t,l,t._bRTL,o,p)}}};g.renderIntervalHeader=function(e,t,a,n,i,r){var s=a.appointment.getId(),o={labelledby:{value:s+"-Descr",append:true}},p;var d=t._calculateAppoitnmentVisualCue(a.appointment);e.openStart("div",a.appointment);e.class("sapUiCalendarRowAppsIntHead");if(i!==undefined){e.style("left",i+"%")}if(r!==undefined){e.style("right",r+"%")}e.class("sapUiCalendarRowAppsIntHeadFirst");if(a.appointment.getSelected()){e.class("sapUiCalendarRowAppsIntHeadSel")}if(a.appointment.getTentative()){e.class("sapUiCalendarRowAppsIntHeadTent")}var g=a.appointment.getTooltip_AsString();if(g){e.attr("title",g)}var c=a.appointment.getType();var v=a.appointment.getColor();if(!v&&c&&c!=l.None){e.class("sapUiCalendarRowAppsIntHead"+c)}if(v){if(n){e.style("border-right-color",v)}else{e.style("border-left-color",v)}}e.accessibilityState(a.appointment,o);e.openEnd();e.openStart("div");e.class("sapUiCalendarIntervalHeaderCont");if(v){e.style("background-color",a.appointment._getCSSColorForBackground(v))}e.openEnd();if(d.appTimeUnitsDifRowStart>0){e.icon("sap-icon://arrow-left",["sapUiCalendarAppArrowIconLeft"],{title:null})}var f=a.appointment.getIcon();if(f){var A=["sapUiCalendarRowAppsIntHeadIcon"];var u={};u["id"]=s+"-Icon";u["title"]=null;e.icon(f,A,u)}var C=a.appointment.getTitle();if(C){e.openStart("span",s+"-Title");e.class("sapUiCalendarRowAppsIntHeadTitle");e.openEnd();e.text(C);e.close("span")}var T=a.appointment.getText();if(T){e.openStart("span",s+"-Text");e.class("sapUiCalendarRowAppsIntHeadText");e.openEnd();e.text(T);e.close("span")}if(d.appTimeUnitsDifRowEnd>0){e.icon("sap-icon://arrow-right",["sapUiCalendarAppArrowIconRight"],{title:null})}p=t._oRb.getText("CALENDAR_START_TIME")+": "+t._oFormatAria.format(a.appointment.getStartDate())+"; "+t._oRb.getText("CALENDAR_END_TIME")+": "+t._oFormatAria.format(a.appointment.getEndDate());if(c&&c!==l.None){p+="; "+this.getAriaTextForType(c,this.getLegendItems(t))}e.openStart("span",s+"-Descr");e.class("sapUiInvisibleText");e.openEnd();e.text(p);e.close("span");e.close("div");e.close("div")};g.renderAppointment=function(e,t,a,n,i){var s=a.appointment;var o=s.getTooltip_AsString();var g=s.getType();var c=s.getColor();var v=s.getTitle();var f=s.getText();var A=s.getDescription();var u=s.getIcon();var C=s.getId();var T=t._getAppointmentReducedHeight(a);var I={labelledby:{value:r.getStaticId("sap.ui.unified","APPOINTMENT")+" "+C+"-Descr",append:true},selected:null};var h=t._getAppointmentRowCount(a,T);var U=t.getAriaLabelledBy();var b=t._calculateAppoitnmentVisualCue(s);if(U.length>0){I["labelledby"].value=I["labelledby"].value+" "+U.join(" ")}if(v){I["labelledby"].value=I["labelledby"].value+" "+C+"-Title"}if(f){I["labelledby"].value=I["labelledby"].value+" "+C+"-Text"}e.openStart("div",s);e.class("sapUiCalendarApp");e.class("sapUiCalendarAppHeight"+h);if(s.getSelected()){e.class("sapUiCalendarAppSel");I["labelledby"].value=I["labelledby"].value+" "+r.getStaticId("sap.ui.unified","APPOINTMENT_SELECTED")}if(s.getTentative()){e.class("sapUiCalendarAppTent");I["labelledby"].value=I["labelledby"].value+" "+r.getStaticId("sap.ui.unified","APPOINTMENT_TENTATIVE")}if(h===1){e.class("sapUiCalendarAppTitleOnly")}if(u){e.class("sapUiCalendarAppWithIcon")}if(!i){if(t._bRTL){e.style("right",a.begin+"%");e.style("left",a.end+"%")}else{e.style("left",a.begin+"%");e.style("right",a.end+"%")}}e.attr("data-sap-level",a.level);if(t._sFocusedAppointmentId==C){e.attr("tabindex","0")}else{e.attr("tabindex","-1")}if(o){e.attr("title",o)}if(!c&&g&&g!=l.None){e.class("sapUiCalendarApp"+g)}if(c){if(t._bRTL){e.style("border-right-color",c)}else{e.style("border-left-color",c)}}e.accessibilityState(s,I);e.openEnd();e.openStart("div");e.class("sapUiCalendarAppCont");if(c&&t.getAppointmentsVisualization()===p.Filled){e.style("background-color",s._getCSSColorForBackground(c))}e.openEnd();if(s.getCustomContent().length){s.getCustomContent().forEach(function(t){e.renderControl(t)})}else{if(b.appTimeUnitsDifRowStart>0){e.icon("sap-icon://arrow-left",["sapUiCalendarAppArrowIconLeft"],{title:null})}if(u){var m=["sapUiCalendarAppIcon"];var S={};S["id"]=C+"-Icon";S["title"]=null;e.icon(u,m,S)}e.openStart("div");e.class("sapUiCalendarAppTitleWrapper");e.openEnd();if(v){e.openStart("span",C+"-Title");e.class("sapUiCalendarAppTitle");e.openEnd();e.text(v);e.close("span")}if(f&&a.size!==d.HalfSize){e.openStart("span",C+"-Text");e.class("sapUiCalendarAppText");e.openEnd();e.text(f);e.close("span")}if(A&&a.size!==d.HalfSize&&(a.size!==d.Regular||!f)){e.openStart("span",C+"-Info");e.class("sapUiCalendarAppDescription");e.openEnd();e.text(A);e.close("span")}e.close("div");if(b.appTimeUnitsDifRowEnd>0){e.icon("sap-icon://arrow-right",["sapUiCalendarAppArrowIconRight"],{title:null})}var R=t._oRb.getText("CALENDAR_START_TIME")+": "+t._oFormatAria.format(s.getStartDate());R=R+"; "+t._oRb.getText("CALENDAR_END_TIME")+": "+t._oFormatAria.format(s.getEndDate());if(t._getRelativeInfo&&t._getRelativeInfo().bIsRelative){var w=t._getRelativeInfo();R=t._oRb.getText("CALENDAR_START_TIME")+": "+w.intervalLabelFormatter(w._getIndexFromDate(s.getStartDate()));R=R+"; "+t._oRb.getText("CALENDAR_END_TIME")+": "+w.intervalLabelFormatter(w._getIndexFromDate(s.getEndDate()))}if(g&&g!=l.None){R=R+"; "+this.getAriaTextForType(g,n)}e.openStart("span",C+"-Descr");e.class("sapUiInvisibleText");e.openEnd();e.text(R);e.close("span")}e.close("div");this.renderResizeHandle(e,t,s);e.close("div")};g.renderSingleDayInterval=function(a,n,i,r,s,l,p,d,g,c,v,f,A){var u=1,C=100,T=n.getId()+"-AppsInt"+u,I,h=n.getShowIntervalHeaders()&&(n.getShowEmptyIntervalHeaders()||s.length>0),U=new Date(n.getStartDate()),b=U.getMonth(),m=new Date(U.getFullYear(),b+1,0).getDate(),S,R=n._getPlanningCalendar(),w,y,D=[];U.setHours(0,0,0,0);w=i.concat(n.getIntervalHeaders().filter(function(e){var t=e.getStartDate().getTime(),a=e.getEndDate().getTime(),n=U.getTime(),i=n+1e3*60*60*24;return!(t>=i||a<=n)}).map(function(e){return{appointment:e,isHeader:true}})).sort(t._getComparer(U));if(R){D=R._getSelectedDates()}a.openStart("div",T);a.class("sapUiCalendarRowAppsInt");a.class("sapUiCalendarMonthRowAppsS");a.style("width",C+"%");if(u>=m&&n.getIntervalType()===o.OneMonth){a.class("sapUiCalItemOtherMonth")}for(I=0;I<l.length;I++){if((u+p)%d==l[I]){a.class("sapUiCalendarRowAppsNoWork");break}}if(!h){a.class("sapUiCalendarRowAppsIntNoHead")}if(f){a.class("sapUiCalendarRowAppsIntFirst")}if(A){a.class("sapUiCalendarRowAppsIntLast")}a.openEnd();if(h){a.openStart("div");a.class("sapUiCalendarRowAppsIntHead");a.openEnd();a.close("div")}if(D.length>0){var E=0,_=w.length;if(R.getRows()[0]._calculateVisibleAppointments){var H=R.getRows()[0]._calculateVisibleAppointments(D,w);E=H.iStart;_=H.iEnd}for(I=E;I<_;I++){y=w[I];a.openStart("div");a.class("sapUiCalendarAppContainer");a.openEnd();a.openStart("div");a.class("sapUiCalendarAppContainerLeft");a.openEnd();a.openStart("div");a.class("sapUiCalendarAppStart");a.openEnd();a.text(y.appointment._getDateRangeIntersectionText(U).start);a.close("div");a.openStart("div");a.class("sapUiCalendarAppEnd");a.openEnd();a.text(y.appointment._getDateRangeIntersectionText(U).end);a.close("div");a.close("div");a.openStart("div");a.class("sapUiCalendarAppContainerRight");a.openEnd();if(y.isHeader){this.renderIntervalHeader(a,n,y)}else{this.renderAppointment(a,n,y,r,true)}a.close("div");a.close("div")}}if(i.length===0||D.length===0){a.openStart("div");a.class("sapUiCalendarNoApps");a.openEnd();var N=sap.ui.getCore().byId(n.getAssociation("row"));S=N.getNoAppointmentsText()?N.getNoAppointmentsText():sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("PLANNINGCALENDAR_ROW_NO_APPOINTMENTS");a.text(S);a.close("div")}if(!(n._getRelativeInfo&&n._getRelativeInfo().bIsRelative)){a.openStart("div",n.getId()+"-Now");a.class("sapUiCalendarRowNow");a.openEnd()}a.close("div");a.openStart("div",n.getId()+"-DummyApp");a.class("sapUiCalendarApp");a.class("sapUiCalendarAppTitleOnly");a.class("sapUiCalendarAppDummy");a.style("margin","0");a.style("height","0px");a.openEnd();a.close("div");if(n.getShowSubIntervals()){var x=n.getIntervalType();var k=0;switch(x){case o.Hour:k=4;break;case o.Day:case o.Week:case o.OneMonth:k=24;break;case o.Month:var M=new e(U);M.setUTCMonth(M.getUTCMonth()+u+1,0);k=M.getUTCDate();M.setUTCDate(1);p=M.getUTCDay();break;default:break}var L=100/k;for(I=0;I<k;I++){a.openStart("div");a.class("sapUiCalendarRowAppsSubInt");a.style("width",L+"%");for(var F=0;F<g.length;F++){if((I+c)%v==g[F]){a.class("sapUiCalendarRowAppsNoWork");break}}a.openEnd();a.close("div")}}a.close("div")};g.getLegendItems=function(e){var t=[],a,n=e.getLegend();if(n){a=sap.ui.getCore().byId(n);if(a){t=a.getItems()}else{s.error("CalendarLegend with id '"+n+"' does not exist!",e)}}return t};g.getAriaTextForType=function(e,t){var n,i,r,s;if(t&&t.length){for(var s=0;s<t.length;s++){r=t[s];if(r.getType()===e){n=r.getText();break}}}if(!n){i=a.getTypeAriaText(e);if(i){n=i.getText()}}return n};return g},true);