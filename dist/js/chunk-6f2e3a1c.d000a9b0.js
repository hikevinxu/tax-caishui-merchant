(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6f2e3a1c"],{1079:function(e,t,n){e.exports=n.p+"img/body_02_pc.2838ba4e.png"},"2c13":function(e,t,n){e.exports=n.p+"img/body_02.9e7fbd71.png"},"724c":function(e,t,n){},9945:function(e,t,n){e.exports=n.p+"img/body_01_pc.af95c439.png"},"9dd3":function(e,t,n){"use strict";var a=n("0d5e");n("4328");t["a"]={getCertificationStatus:function(){return Object(a["a"])("/merchant/apply/status")},merchantRegister:function(e){return Object(a["b"])("/merchant/register",e)},merchantCode:function(e){return Object(a["b"])("/merchant/register/send_verifycode",e)},passwordCode:function(e){return Object(a["b"])("/password/send_verifycode",e)},passwordReset:function(e){return Object(a["b"])("/password/reset",e)},merchantCompanyTypes:function(){return Object(a["a"])("/merchant/apply/company_types")},getMerchantCompanyDetail:function(e){return Object(a["a"])("/merchant/apply/company_detail",e)},merchantSaveCompany:function(e){return Object(a["b"])("/merchant/apply/save_company",e)},merchantSaveCertification:function(e){return Object(a["b"])("/merchant/apply/save_qualification",e)},merchantSearch:function(e){return Object(a["b"])("/merchant/apply/search_company",e)},merchantApplyReset:function(){return Object(a["a"])("/merchant/apply/reset")}}},ccba:function(e,t,n){"use strict";var a=n("724c"),i=n.n(a);i.a},ce64:function(e,t,n){e.exports=n.p+"img/body_01.9f20595a.png"},d6fb:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"merchantHome-h5"},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.h5,expression:"h5"}],staticStyle:{"padding-bottom":"78px"}},[a("img",{attrs:{src:n("ce64"),alt:"",srcset:""}}),a("img",{attrs:{src:n("2c13"),alt:"",srcset:""}}),a("div",{staticClass:"merchantHome-footer"},[a("span",{staticClass:"btn",on:{click:e.goRegisterH5}},[e._v("立即入驻")])])]),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.h5,expression:"!h5"}],staticClass:"merchantHome-pc"},[a("head-nav",{attrs:{isLogin:!1,title:e.title,id:"mainHeader"}}),a("div",{staticClass:"merchantHomeContainer"},[a("img",{attrs:{src:n("9945"),alt:""}}),a("span",{on:{click:e.goRegisterPC}},[e._v("商户入驻")]),a("img",{attrs:{src:n("1079"),alt:""}})])],1)])},i=[],r=n("f822"),c=(n("9dd3"),n("f3e4")),s=(n("403a"),{name:"merchantHome-h5",components:{headNav:r["a"]},data:function(){return{title:"",h5:!1,inviteCode:""}},created:function(){var e=this.$route.query.inviteCode;e&&(this.inviteCode=e,c["a"].setCookie("inviteCode",e)),this.resize(),window.addEventListener("resize",this.resize)},methods:{goRegisterH5:function(){this.$router.push({path:"/register-h5",query:{inviteCode:this.inviteCode}})},goRegisterPC:function(){this.$router.push({path:"/register-pc",query:{inviteCode:this.inviteCode}})},resize:function(){var e=window.innerWidth;this.h5=e<750}}}),o=s,p=(n("ccba"),n("2877")),u=Object(p["a"])(o,a,i,!1,null,"569cdf5f",null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-6f2e3a1c.d000a9b0.js.map