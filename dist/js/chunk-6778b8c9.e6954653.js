(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6778b8c9"],{"28a5":function(e,t,a){"use strict";var s=a("aae3"),n=a("cb7c"),i=a("ebd6"),o=a("0390"),r=a("9def"),c=a("5f1b"),d=a("520a"),l=a("79e5"),u=Math.min,p=[].push,v="split",h="length",f="lastIndex",g=4294967295,C=!l(function(){RegExp(g,"y")});a("214f")("split",2,function(e,t,a,l){var b;return b="c"=="abbc"[v](/(b)*/)[1]||4!="test"[v](/(?:)/,-1)[h]||2!="ab"[v](/(?:ab)*/)[h]||4!="."[v](/(.?)(.?)/)[h]||"."[v](/()()/)[h]>1||""[v](/.?/)[h]?function(e,t){var n=String(this);if(void 0===e&&0===t)return[];if(!s(e))return a.call(n,e,t);var i,o,r,c=[],l=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),u=0,v=void 0===t?g:t>>>0,C=new RegExp(e.source,l+"g");while(i=d.call(C,n)){if(o=C[f],o>u&&(c.push(n.slice(u,i.index)),i[h]>1&&i.index<n[h]&&p.apply(c,i.slice(1)),r=i[0][h],u=o,c[h]>=v))break;C[f]===i.index&&C[f]++}return u===n[h]?!r&&C.test("")||c.push(""):c.push(n.slice(u)),c[h]>v?c.slice(0,v):c}:"0"[v](void 0,0)[h]?function(e,t){return void 0===e&&0===t?[]:a.call(this,e,t)}:a,[function(a,s){var n=e(this),i=void 0==a?void 0:a[t];return void 0!==i?i.call(a,n,s):b.call(String(n),a,s)},function(e,t){var s=l(b,e,this,t,b!==a);if(s.done)return s.value;var d=n(e),p=String(this),v=i(d,RegExp),h=d.unicode,f=(d.ignoreCase?"i":"")+(d.multiline?"m":"")+(d.unicode?"u":"")+(C?"y":"g"),m=new v(C?d:"^(?:"+d.source+")",f),y=void 0===t?g:t>>>0;if(0===y)return[];if(0===p.length)return null===c(m,p)?[p]:[];var A=0,L=0,k=[];while(L<p.length){m.lastIndex=C?L:0;var M,w=c(m,C?p:p.slice(L));if(null===w||(M=u(r(m.lastIndex+(C?0:L)),p.length))===A)L=o(p,L,h);else{if(k.push(p.slice(A,L)),k.length===y)return k;for(var O=1;O<=w.length-1;O++)if(k.push(w[O]),k.length===y)return k;L=A=M}}return k.push(p.slice(A)),k}]})},"63b9":function(e,t,a){},"76ef":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"addressInfo"},[s("div",{staticClass:"address"},[s("div",{staticClass:"title"},[e._v("\n      地址信息\n    ")]),s("div",{staticClass:"content"},[s("div",{staticClass:"item info"},[s("div",{staticClass:"editAddress"},[s("el-select",{attrs:{disabled:e.editMark,placeholder:"请选择"},on:{change:e.provinceCodeChange},model:{value:e.provinceCode,callback:function(t){e.provinceCode=t},expression:"provinceCode"}},e._l(e.provinceList,function(e){return s("el-option",{key:e.code,attrs:{label:e.name,value:e.code}})}),1),s("el-select",{staticClass:"selectCity",attrs:{disabled:e.editMark,placeholder:"请选择"},on:{change:e.cityCodeChange},model:{value:e.cityCode,callback:function(t){e.cityCode=t},expression:"cityCode"}},e._l(e.cityList,function(e){return s("el-option",{key:e.code,attrs:{label:e.name,value:e.code}})}),1),s("el-select",{staticClass:"selectArea",attrs:{disabled:e.editMark,placeholder:"请选择"},model:{value:e.areaCode,callback:function(t){e.areaCode=t},expression:"areaCode"}},e._l(e.areaList,function(e){return s("el-option",{key:e.code,attrs:{label:e.name,value:e.code}})}),1),s("el-input",{staticClass:"addressInput",attrs:{disabled:e.editMark,placeholder:"请输入内容"},model:{value:e.address,callback:function(t){e.address=t},expression:"address"}})],1)]),s("div",{staticClass:"item map"},[s("div",{staticClass:"itemTitle"},[e._v("地图信息")]),s("el-select",{staticClass:"selectAddress",attrs:{loading:e.loading,"remote-method":e.selectAddressInput,"reserve-keyword":"",filterable:"",remote:"",placeholder:"请选择"},on:{change:e.selectAddressChange},model:{value:e.searchInput,callback:function(t){e.searchInput=t},expression:"searchInput"}},e._l(e.searchResult,function(e){return s("el-option",{key:e.id,attrs:{label:e.name,value:e.lnglat}})}),1),s("div",{staticClass:"map"},[s("el-amap",{ref:"map",attrs:{vid:"amap",center:e.center,zoom:e.zoom,plugin:e.plugin,events:e.events}}),e._m(0),s("div",{staticClass:"location",on:{click:e.getCurrentPositionLaglng}},[s("img",{attrs:{src:a("4ed0"),alt:""}})])],1)],1)]),e.editMark?s("div",{staticClass:"editBtn"},[s("button",{on:{click:e.editAddress}},[e._v("编辑地址")])]):s("div",{staticClass:"saveBtn"},[s("button",{staticClass:"cancel",on:{click:e.canael}},[e._v("取消")]),s("button",{staticClass:"save",on:{click:e.save}},[e._v("保存")])])])])},n=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"point"},[s("img",{attrs:{src:a("8520"),alt:""}})])}],i=(a("386d"),a("28a5"),a("2b0e")),o=a("8f9b"),r=a.n(o),c=a("403a"),d=a("8fa2"),l=a("8c4e");i["default"].use(r.a),r.a.initAMapApiLoader({key:c["b"].amapKey,plugin:["AMap.Autocomplete","AMap.PlaceSearch","AMap.Scale","AMap.OverView","AMap.ToolBar","AMap.MapType","AMap.PolyEditor","AMap.CircleEditor","AMap.Geocoder","AMap.Geolocation"],v:"1.4.4"});var u={data:function(){var e=this;return{loading:!1,temp:{},searchResult:[],provinceCode:"",provinceList:[],cityCode:"",cityList:[],areaCode:"",areaList:[],searchInput:"",editMark:!0,address:"",center:[116.397477,39.908692],zoom:16,events:{init:function(e){console.log(e)},dragend:function(t){var a=e.$refs.map.$$getCenter();e.center=a;var s=new AMap.Geocoder({radius:1e3,extensions:"all"});s.getAddress(a,function(e,t){"complete"==e&&console.log(t.regeocode)})}},plugin:["ToolBar",{pName:"Scale",events:{init:function(e){}}},{pName:"Geolocation",events:{init:function(e){console.log(123)}}}]}},created:function(){this.companyAddressGet(),this.getProvinceList()},methods:{companyAddressGet:function(){var e=this;d["a"].companyAddressGet().then(function(t){if(0==t.code){if(console.log(t),e.address=t.data.address,e.provinceCode=t.data.provinceCode,e.cityCode=t.data.cityCode,e.areaCode=t.data.areaCode,""!=t.data.location){e.center[1]=t.data.location.split(",")[0],e.center[0]=t.data.location.split(",")[1];try{e.selectAddressChange(e.center)}catch(n){}}else e.getCurrentPositionLaglng();var a={provinceCode:e.provinceCode};l["a"].getAddressCitys(a).then(function(t){0==t.code&&(e.cityList=t.data)});var s={provinceCode:e.provinceCode,cityCode:e.cityCode};l["a"].getAddressAreas(s).then(function(t){0==t.code&&(e.areaList=t.data)})}})},getProvinceList:function(){var e=this;l["a"].getAddressProvinces().then(function(t){0==t.code&&(e.provinceList=t.data)})},getCurrentPositionLaglng:function(){var e=this;console.log(222),this.getLocationLoading=!0;var t=new AMap.Geolocation({enableHighAccuracy:!0,timeout:1e4,buttonOffset:new AMap.Pixel(10,20),zoomToAccuracy:!0,buttonPosition:"RB"});t.getCurrentPosition(),AMap.event.addListener(t,"complete",function(t){e.center=[t.position.lng,t.position.lat],e.getLocationLoading=!1}),AMap.event.addListener(t,"error",function(t){console.log(t),e.$message({message:"获取位置信息超时",type:"error",showClose:!0,duration:1e3})})},selectAddressChange:function(e){console.log(e),this.center=[e[0],e[1]];var t=new AMap.Geocoder({radius:1e3,extensions:"all"});t.getAddress(e,function(e,t){})},selectAddressInput:function(e){var t=this;if(""!==e){this.loading=!0;var a={city:"全国"},s=new AMap.PlaceSearch(a);s.search(e,function(e,a){if(console.log(a),"OK"==a.info){t.loading=!1,t.searchResult=a.poiList.pois;for(var s=0;s<t.searchResult.length;s++)t.searchResult[s].lnglat=[t.searchResult[s].location.lng,t.searchResult[s].location.lat]}else t.searchResult=[]})}else this.searchResult=[]},provinceCodeChange:function(e){var t=this;this.cityCode="",this.areaCode="",this.cityList=[],this.areaList=[];var a={provinceCode:e};l["a"].getAddressCitys(a).then(function(e){0==e.code&&(t.cityList=e.data)})},cityCodeChange:function(e){var t=this;this.areaCode="",this.areaList=[];var a={provinceCode:this.provinceCode,cityCode:e};l["a"].getAddressAreas(a).then(function(e){0==e.code&&(t.areaList=e.data)})},editAddress:function(){this.companyAddressGet(),this.getProvinceList(),this.editMark=!1},save:function(){var e=this,t={address:this.address,provinceCode:this.provinceCode,cityCode:this.cityCode,areaCode:this.areaCode,location:this.center[1]+","+this.center[0]};d["a"].companyAddressUpdate(t).then(function(t){0==t.code&&(e.$message({message:"修改成功",type:"success",showClose:!0,duration:1e3}),e.companyAddressGet(),e.getProvinceList(),e.editMark=!0)})},canael:function(){this.companyAddressGet(),this.getProvinceList(),this.editMark=!0}}},p=u,v=(a("c041"),a("2877")),h=Object(v["a"])(p,s,n,!1,null,null,null);t["default"]=h.exports},"8c4e":function(e,t,a){"use strict";var s=a("0d5e");t["a"]={getAddressAreas:function(e){return Object(s["a"])("/address/areas",e)},getAddressCitys:function(e){return Object(s["a"])("/address/citys",e)},getAddressProvinces:function(e){return Object(s["a"])("/address/provinces",e)},getAddressTrees:function(e){return Object(s["a"])("/address/trees",e)},getAddressCityTrees:function(e){return Object(s["a"])("/address/city_trees",e)},getGlobalTrees:function(e){return Object(s["a"])("/address/globalTrees",e)},getFileuploadUpload:function(e){return Object(s["b"])("/fileupload/upload",e)},authLogin:function(e){return Object(s["b"])("/auth/login",e)},loginOut:function(){return Object(s["a"])("/auth/logout")},fileUploadGetUrl:function(e){return Object(s["b"])("/service/upload",e)}}},"8fa2":function(e,t,a){"use strict";var s=a("0d5e");t["a"]={datacenterConsult_records:function(e){return Object(s["b"])("/datacenter/consult_records",e)},datacenterStatistic:function(e){return Object(s["b"])("/datacenter/statistic",e)},companyAddressUpdate:function(e){return Object(s["b"])("/company/address/update",e)},companyAddressGet:function(e){return Object(s["a"])("/company/address/get",e)}}},c041:function(e,t,a){"use strict";var s=a("63b9"),n=a.n(s);n.a}}]);
//# sourceMappingURL=chunk-6778b8c9.e6954653.js.map