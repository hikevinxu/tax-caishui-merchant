<template>
  <div class="index">
    <div class="merchant-h5">
      <div class="merchant-h5-header">
        <div class="header">
            <div class="headerContent">
                <div class="steps">
                    <div class="number one">1</div>
                    <span class="acitve">注册账号</span>
                </div>
                <div class="steps">
                    <div class="number one two">2</div>
                    <span class="acitve">认领企业</span>
                </div>
                <div class="steps">
                    <div class="number">3</div>
                    <span>提交资质</span>
                </div>
            </div>
        </div>
      </div>
      <div class="enterpriseInfo">
        <div class="title">完善企业基本资料</div>
        <div class="form">
          <div class="formItem">
            <label for="name">机构名称<span class="notNull">*</span></label>
            <div class="input">
              <van-field v-model="name" placeholder="机构名称不能为空" />
            </div>
          </div>
          <!-- <div class="formItem">
            <label for="name">机构类型<span class="notNull">*</span></label>
            <div class="input">
                <van-field readonly v-model="name" placeholder="请选择" @click="showPicker = true"/>
            </div>
            <div class="picker">
              <van-popup v-model="showPicker" position="bottom">
                  <van-picker
                    show-toolbar
                    :columns="columns"
                    @cancel="showPicker = false"
                    @confirm="onConfirm"
                  />
                </van-popup>
            </div>
          </div>
          <div class="formItem upload">
            <label for="name">机构Logo<span class="notNull">*</span></label>
            <div class="input">
              <van-uploader v-model="fileList" multiple :max-count="2" :before-read="beforeRead" />
            </div>
            <div class="prompt">
              <p>请上传图片</p>
              <p>尺寸240*240px</p>
            </div>
          </div>
          <div class="formItem">
            <label for="name">所在地区<span class="notNull">*</span></label>
            <div class="input">
                <van-field readonly v-model="name" placeholder="请选择" @click="showPicker = true"/>
            </div>
            <div class="picker">
              <van-popup v-model="showPicker" position="bottom">
                  <van-picker
                    show-toolbar
                    :columns="columns"
                    @cancel="showPicker = false"
                    @confirm="onConfirm"
                  />
                </van-popup>
            </div>
          </div>
          <div class="formItem">
            <label for="name">地图定位<span class="notNull">*</span></label>
            <div class="input">
                <van-field readonly v-model="name" placeholder="请选择" @click="showMapDialog"/>
            </div>
            <div class="picker">
              <van-popup v-model="showMap" position="bottom" :style="{ height: '100%' }">
                <div id="container">
                  <el-amap vid="amap" ref="map" vid="amapDemo" :center="center" :zoom="zoom" :plugin="plugin" :events="events"></el-amap>
                  <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
                  <div class="point"></div>
                  <div class="selectAddress">
                    <div class="text">{{address}}</div>
                    <div class="btn" @click="getLagLng">确定</div>
                  </div>
                </div>
              </van-popup>
            </div>
          </div>
          <div class="formItem">
            <label for="name">联系人</label>
            <div class="input">
                <van-field v-model="name" placeholder="请填写联系人" />
            </div>
          </div>
          <div class="formItem">
            <label for="name">联系电话<span class="notNull">*</span></label>
            <div class="input">
                <van-field v-model="name" placeholder="联系电话不能为空" />
            </div>
          </div>
          <div class="formItem">
            <label for="name">QQ号</label>
            <div class="input">
                <van-field v-model="name" placeholder="请填写QQ号" />
            </div>
          </div>
          <div class="formItem">
            <label for="name">电子邮箱</label>
            <div class="input">
              <van-field v-model="name" placeholder="请填写电子邮箱" />
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <button @click="goChat">去聊天</button>
  </div>
</template>

<script>
import Vue from 'vue'
import { setCookie } from '@/utils/cookie.js'
import { Field, Picker } from 'vant'
Vue.use(Field).use(Picker);
export default {
  data (){
    return {
      name: '',
    columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    showPicker: false,
    username: '',
    password: '',
    fileList: [],
    phone: '',
    showMap: false,
    searchOption: {
      city: '杭州',
      citylimit: true
    },
    center: [121.59996, 31.197646],
    zoom: 16,
    events: {
      init: (o) => {
        console.log(o)
      },
      'dragend': (e) => {
        var centerPoint = self.app.$refs.map.$$getCenter()
        self.app.center = centerPoint
        var geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: 'all'
        })
        geocoder.getAddress(centerPoint, function(status, result){
          if (status == 'complete') {
            console.log(result.regeocode)
            self.app.address = result.regeocode.formattedAddress
          }
        })
      }
    },
    plugin: [
      'ToolBar', 
      {
        pName: 'Scale',
        events: {
          init(o) {
            // console.log(o);
          }
        }
      },
      {
        pName: 'Geolocation',
        events: {
          init(o) {
            // o 是高德地图定位插件实例
            o.getCurrentPosition((status, result) => {
              if (result && result.position) {
                self.app.center = [result.position.lng, result.position.lat];
                console.log(self.app.center)
                vant.Toast.clear()
              }
            });
          }
        }
      }
    ],
    address: ''
    }
  },
  methods: {
    goChat(){
      setCookie('uid', '15515268707')
      setCookie("sdktoken", "b3e8d33f9cfbc94f4ea0e8b41c41fb1c")
      window.open('./IM/im/main.html')
    },
    onConfirm(val){
      console.log(val)
      this.showPicker = false
    },
    // 返回布尔值
    beforeRead(file) {
      console.log(file)
      var reader = new FileReader()
      reader.onload = function(evt){
        console.log(evt)
				var image = new Image();
        image.src=evt.target.result;
        image.onload = function(){
          var height = image.height;
          var width = image.width;
          var filesize = image.fileSize;
          console.log(height)
          console.log(width)
        }
      }
      reader.readAsDataURL(file)
      // if (file.type !== 'image/jpeg') {
      //   vant.Toast('请上传 jpg 格式图片');
      //   return false;
      // }
      return true;
    },
    showMapDialog(){
      this.showMap = true;
      vant.Toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '正在获取当前位置'
      });
    },
    onSearchResult(pois) {
      console.log(pois)
      if (pois.length > 0) {
        let center = {
          lng: pois[0].lng,
          lat: pois[0].lat
        };
        this.center = [center.lng, center.lat];
        var geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: 'all'
        })
        geocoder.getAddress(this.center, (status, result) => {
          if (status == 'complete') {
            console.log(result.regeocode)
            this.address = result.regeocode.formattedAddress
          }
        })
      }
    },
    getLagLng(){
      alert('当前地址为：' + this.address + ',当前经纬度为：' + this.center)
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  background-color: #f5f5f5;
}
.merchant-h5-header {
  width: 100%;
  height: 100px;
  background-color: #fff;
}
.merchant-h5-header .header .headerContent .steps .two::before {
  background: #FFAD71;
}
/* .enterpriseInfo {

} */
.enterpriseInfo .title {
  height: 52px;
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: rgba(0,0,0,0.87);
  text-align: left;
  line-height: 52px;
  margin-left: 16px;
}
.enterpriseInfo .form {
  background-color: #fff;
}
.enterpriseInfo .form .formItem {
  height: 48px;
  display: flex;
}
.enterpriseInfo .form .formItem.upload {
  height: 104px;
}
.enterpriseInfo .form .formItem.upload .input {
  margin-top: 16px;
  flex: 0;
}
.enterpriseInfo .form .formItem.upload .van-uploader__upload {
  background-color: #f5f5f5;
  border: 0;
}
.enterpriseInfo .form .formItem.upload .van-uploader__upload .van-icon-plus:before {
  content: "\F098";
}
.enterpriseInfo .form .formItem.upload .prompt {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: rgba(0,0,0,0.26);
  text-align: left;
  line-height: 18px;
}
.enterpriseInfo .form .formItem.upload .prompt p {
  margin: 0;
  padding: 0;
}
.enterpriseInfo .form .formItem label {
  box-sizing: border-box;
  width: 120px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: rgba(0,0,0,0.60);
  text-align: left;
  line-height: 48px;
  padding-left: 16px;
}
.formItem .input {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  text-align: left;
}
.notNull {
  color: #FF7F4A;
}
.merchant-h5 .van-action-sheet {
	height: 100%;
	max-height: 100%;
}
#container {
  height: 100%;
  position: relative;
}
.search-box {
  position: absolute;
  top: 25px;
  left: 20px;
}
#container .el-vue-search-box-container {
	position: absolute;
	width: 90%;
	left: 50%;
	transform: translate(-50%, 0);
}
#container .el-vue-search-box-container .search-tips {
	width: 100%;
}
#container .amap-touch-toolbar .amap-zoomcontrol {
	bottom: 0px;
}
#container .amap-geolocation-con {
	bottom: 130px!important;
}
#container .amap-scalecontrol {
	left: 10px!important;
	bottom: 100px!important;
}
.point {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -100%);
	width: 10px;
	height: 50px;
	background-color: pink;
}
.selectAddress {
	width: 300px;
	height: 50px;
	background-color: #fff;
	position: absolute;
  	bottom: 25px;
  	left: 50%;
	transform: translate(-50%, 0);
	display: flex;
}
.selectAddress .text {
	flex: 1;
}
.selectAddress .btn {
	width: 80px;
	height: 50px;
	background-color: green;
}

input::-webkit-input-placeholder{
  color: rgba(0,0,0,0.26);
}
input::-moz-placeholder{
  color: rgba(0,0,0,0.26);      
}
input:-ms-input-placeholder{ 
  color: rgba(0,0,0,0.26);
}

</style>
