(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4e881551"],{"9dd3":function(e,t,s){"use strict";var a=s("0d5e");s("4328");t["a"]={getCertificationStatus:function(){return Object(a["a"])("/merchant/apply/status")},merchantRegister:function(e){return Object(a["b"])("/merchant/register",e)},merchantCode:function(e){return Object(a["b"])("/merchant/register/send_verifycode",e)},passwordCode:function(e){return Object(a["b"])("/password/send_verifycode",e)},passwordReset:function(e){return Object(a["b"])("/password/reset",e)},merchantCompanyTypes:function(){return Object(a["a"])("/merchant/apply/company_types")},getMerchantCompanyDetail:function(e){return Object(a["a"])("/merchant/apply/company_detail",e)},merchantSaveCompany:function(e){return Object(a["b"])("/merchant/apply/save_company",e)},merchantSaveCertification:function(e){return Object(a["b"])("/merchant/apply/save_qualification",e)},merchantSearch:function(e){return Object(a["b"])("/merchant/apply/search_company",e)},merchantApplyReset:function(){return Object(a["a"])("/merchant/apply/reset")}}},b2f2:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"resetPc"},[s("div",{staticClass:"resetPc_container"},[s("head-nav",{attrs:{isLogin:!1,title:e.title,id:"mainHeader"}}),s("div",{staticClass:"resetContent"},[s("div",{staticClass:"resetForm"},[s("h4",[e._v("重置登录密码")]),s("div",{staticClass:"inputBox"},[s("span",{staticClass:"label"},[e._v("财税鱼账号")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],attrs:{type:"text",placeholder:"请输入需重置密码的账号(手机号)"},domProps:{value:e.phone},on:{input:[function(t){t.target.composing||(e.phone=t.target.value)},e.phoneInput]}})]),s("div",{staticClass:"inputBox"},[s("span",{staticClass:"label"},[e._v("验证码")]),s("div",{staticClass:"codeInputBox",staticStyle:{width:"50%"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.code,expression:"code"}],staticClass:"codeInput",attrs:{type:"text",maxlength:"4",placeholder:"验证码"},domProps:{value:e.code},on:{input:[function(t){t.target.composing||(e.code=t.target.value)},e.codeInput]}})]),s("div",{attrs:{id:"captcha"}}),s("span",{directives:[{name:"show",rawName:"v-show",value:1==e.codeStart,expression:"codeStart == true"}],staticClass:"codeStart"},[e._v("获取验证码")]),s("span",{directives:[{name:"show",rawName:"v-show",value:1==e.isCode&&0==e.codeStart,expression:"isCode == true && codeStart == false"}],staticClass:"isCode",on:{click:e.codeClick}},[e._v("获取验证码")]),s("span",{directives:[{name:"show",rawName:"v-show",value:0==e.isCode&&0==e.codeStart,expression:"isCode == false && codeStart == false"}],staticClass:"count"},[e._v(e._s(e.count)+"s后获取")])]),s("div",{staticClass:"inputBox"},[s("span",{staticClass:"label"},[e._v("新密码")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"password",placeholder:"请输入新密码"},domProps:{value:e.password},on:{input:[function(t){t.target.composing||(e.password=t.target.value)},e.passwordInput]}})]),s("div",{staticClass:"inputBox"},[s("span",{staticClass:"label"},[e._v("确认密码")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.repassword,expression:"repassword"}],attrs:{type:"password",placeholder:"再次确认新密码"},domProps:{value:e.repassword},on:{input:[function(t){t.target.composing||(e.repassword=t.target.value)},e.repasswordInput]}})]),s("button",{staticClass:"next",attrs:{disabled:e.disabled},on:{click:e.reset}},[e._v("重置")]),s("span",{staticClass:"explain"},[e._v("若手机号已停用请联系客服处理")])])]),e._m(0)],1)])},o=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"footer"},[s("div",{staticClass:"footerContent"},[s("div",{staticClass:"qrcode"}),s("span",{staticClass:"line"},[e._v("Copyright 2019  |  杭州税牛科技有限公司  |  浙ICP备19028668号  |  "),s("a",{staticStyle:{"text-decoration-line":"none",color:"#ffffff"},attrs:{href:"https://res.caishuiyu.com/common/h5/privacy_agreement.html"}},[e._v("用户隐私协议")]),e._v("  |  All Rights Reserved")]),s("span",{staticClass:"line"},[e._v("  地址：杭州市西湖区金色西溪商务中心B座")])])])}],n=s("f822"),i=s("9dd3"),r=(s("f3e4"),s("403a")),c={name:"reset",components:{headNav:n["a"]},data:function(){return{title:"返回登录",phone:"",codeStart:!0,isCode:!0,count:0,disabled_code:!0,disabled:!0,code:"",password:"",repassword:"",timer:null,captchaIns:""}},created:function(){var e=this;initNECaptcha({captchaId:r["b"].captchaId,element:"#captcha",mode:"bind",width:"320px",enableClose:!0,onVerify:function(t,s){t?console.log(t):(e.captchaIns.close(),s&&e.sendCode(s))}},function(t){console.log(t),e.captchaIns=t},function(e){})},methods:{getCode:function(){var e=this,t=60;this.timer||(this.count=t,this.timer=setInterval(function(){e.count>0&&e.count<=t?(e.count--,console.log(e.count)):(clearInterval(e.timer),e.timer=null,e.isCode=!0,e.codeStart=!1)},1e3))},phoneInput:function(e){this.codeStart=!1,""==this.phone?(this.codeStart=!0,this.disabled=!0):(this.codeStart=!1,""!=this.code&&""!=this.password&&""!=this.repassword?this.disabled=!1:this.disabled=!0)},passwordInput:function(e){""!=this.code&&""!=this.phone&&""!=this.password&&""!=this.repassword?this.disabled=!1:this.disabled=!0},codeInput:function(e){""!=this.code&&""!=this.phone&&""!=this.password&&""!=this.repassword?this.disabled=!1:this.disabled=!0},repasswordInput:function(e){""!=this.code&&""!=this.phone&&""!=this.password&&""!=this.repassword?this.disabled=!1:this.disabled=!0},codeClick:function(){this.isCode=!1;var e=this.phone;if(!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(e))return this.$message({message:"请输入正确的手机号",type:"error",showClose:!0,duration:1e3}),void(this.isCode=!0);this.captchaIns&&this.captchaIns.verify()},sendCode:function(e){var t=this,s=this.phone,a={phone:s,captchaValidate:e.validate};i["a"].passwordCode(a).then(function(e){t.captchaIns&&t.captchaIns.refresh(),0==e.code&&t.getCode()}).catch(function(e){t.captchaIns&&t.captchaIns.refresh(),t.isCode=!0})},reset:function(){var e=this;if(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/.test(this.password))if(this.password==this.repassword)if(this.password.length>=6){var t=this.phone,s=this.password,a={phone:t,password:s,verifycode:this.code};console.log(a),i["a"].passwordReset(a).then(function(t){console.log(t),0==t.code&&(e.$message({message:"重置成功",type:"success",showClose:!0,duration:1e3}),e.$router.push({path:"/login"}))}).catch(function(t){console.log(res),e.isCode=!0})}else this.$message({message:"密码6~16位",type:"error",showClose:!0,duration:1e3});else this.$message({message:"两次密码输入不一致",type:"error",showClose:!0,duration:1e3});else this.$message({message:"密码需6~16位字母数字组合",type:"error",showClose:!0,duration:1e3})}}},d=c,p=(s("e863"),s("2877")),l=Object(p["a"])(d,a,o,!1,null,"0492c89a",null);t["default"]=l.exports},c93f:function(e,t,s){},e863:function(e,t,s){"use strict";var a=s("c93f"),o=s.n(a);o.a}}]);
//# sourceMappingURL=chunk-4e881551.c185c298.js.map