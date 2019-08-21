<template>
  <div class="siderBar-page siderBar">
    <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
      :router="true"
      @open="handleOpen"
      @close="handleClose"
      @select="activeMenuSelect">
      <el-menu-item index="/home" route="/home">
        <span v-if="activeMenu == '/home'" class="icon"><img src="@/assets/globalPc/ic_b_main_w.png" alt=""></span>
        <span v-else class="icon"><img src="@/assets/globalPc/ic_b_main.png" alt=""></span>
        <span slot="title">商户主页</span>
      </el-menu-item>
      <el-submenu index="/merchantInfo">
        <template slot="title">
          <span class="icon"><img src="@/assets/globalPc/ic_b_info.png" alt=""></span>
          <span>商户信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/basicInfo" route="/basicInfo">基本资料</el-menu-item>
          <el-menu-item index="/addressInfo" route="/addressInfo">地址信息</el-menu-item>
          <el-menu-item index="/publicityFigure" route="/publicityFigure">宣传图片</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/mainBusiness" route="/mainBusiness">
        <span v-if="activeMenu == '/mainBusiness'" class="icon"><img src="@/assets/globalPc/ic_b_business_w.png" alt=""></span>
        <span v-else class="icon"><img src="@/assets/globalPc/ic_b_business.png" alt=""></span>
        <span slot="title">主营业务管理</span>
      </el-menu-item>
      <el-menu-item index="/serviceManager" route="/serviceManager">
        <span v-if="activeMenu == '/serviceManager'" class="icon"><img src="@/assets/globalPc/ic_b_service_w.png" alt=""></span>
        <span v-else class="icon"><img src="@/assets/globalPc/ic_b_service.png" alt=""></span>
        <span slot="title">服务管理</span>
      </el-menu-item>
      <el-menu-item index="/recordsCenter" route="/recordsCenter">
        <span v-if="activeMenu == '/recordsCenter'" class="icon"><img src="@/assets/globalPc/ic_b_data_w.png" alt=""></span>
        <span v-else class="icon"><img src="@/assets/globalPc/ic_b_data.png" alt=""></span>
        <span slot="title">数据中心</span>
      </el-menu-item>
      <el-menu-item class="msgUnreadItem" index="/messageCenter" route="/messageCenter">
        <span v-if="activeMenu == '/messageCenter'" class="icon"><img src="@/assets/globalPc/ic_b_message_w.png" alt=""></span>
        <span v-else class="icon"><img src="@/assets/globalPc/ic_b_message.png" alt=""></span>
        <span slot="title">消息中心 <span v-if="msg && unread > 0" class="msgUnread">{{unread}}</span></span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import router from '../../router/index.js'
import cookie from '@/utils/cookie.js'
import { config } from '@/utils/global.js'
export default {
  name: 'siderBar',
  data(){
    return {
      activeMenu: '',
      msg: true,
      unread: 0,
      sessionlist: []
    }
  },
  created () {
    console.log(this.$route)
    this.activeMenu = this.$route.meta.path ? this.$route.meta.path : this.$route.path
    router.beforeEach((to,from,next) => {
      this.activeMenu = to.meta.path ? to.meta.path : to.path
      next()
    })
    let that = this
    window.addEventListener("popstate", function() {
      that.activeMenu = that.$route.meta.path ? that.$route.meta.path : that.$route.path
    }, false)
    this.initIM()
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    },
    activeMenuSelect(index, indexPath) {
      this.initIM()
      // console.log(index, indexPath)
      if ( index == '/messageCenter') {
        this.msg = false
      } else {
        this.msg = true
      }
    },
    initIM(){
      let that = this
      // 提交sdk连接请求
      let nim = SDK.NIM.getInstance({
          // debug: true,
          appKey: config.IMAppKey,
          account: cookie.readCookie('imAccid'),
          token: cookie.readCookie('imToken'),
          syncSessionUnread: true,
          syncRobots: true,
          autoMarkRead: true, // 默认为true
          transports: ['websocket'],
          onsessions: onSessions,
          onupdatesession: onUpdateSession
      });
      function onSessions(sessions) {
        that.sessionlist = sessions
        for(let i=0;i<that.sessionlist.length;i++){
          if (that.sessionlist[i].to != '') {
            that.unread += Number(that.sessionlist[i].unread)
          }
        }
      }
      function onUpdateSession(session) {
        that.sessionlist = nim.mergeSessions(that.sessionlist, session)
        that.sessionlist.sort((a, b) => {
          return b.updateTime - a.updateTime
        })
        that.unread = 0
        for(let i=0;i<that.sessionlist.length;i++){
          that.unread += Number(that.sessionlist[i].unread)
        }
      }
      function updateSessionsUI() {
        // 刷新界面
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.siderBar {
  box-sizing: border-box;
  padding-top: 96Px;
  width: 184Px;
  height: 100%;
  background-color: #fff;
  font-size: 24Px;
  .el-submenu__title,
  .el-menu-item {
    height: 36Px;
    line-height: 36Px;
    margin: 14Px 0;
    width: 190Px;
  }
}
</style>
<style lang="scss">
.siderBar-page {
  .el-menu {
    border: 0;
    font-family: PingFangSC-Regular;
    font-size: 14Px;
    text-align: left;
    color: rgba(0,0,0,0.60);
    .el-menu-item.is-active {
      background-image: linear-gradient(135deg, #FFAD71 0%, #FF7F4A 100%);
      border-radius: 0 18Px 18Px 0;
      color: #fff;
    }
    .is-active.is-opened {
      background-image: none;
    }
    .el-menu--inline {
      background-color: #fafafa;
    }
    .el-menu-item-group .el-menu-item {
      padding-left: 56Px!important;
    }
    .icon {
      display: inline-block;
      width: 18Px;
      height: 18Px;
      margin-right: 16Px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .el-submenu__title,
  .el-menu-item {
    height: 64Px;
    line-height: 64Px;
    color: rgba(0,0,0,0.60);
    i {
      width: 17Px;
      height: 17Px;
      margin-right: 16Px;
    }
  }
  .el-submenu .el-menu-item {
    min-width: 184Px;
    color: rgba(0,0,0,0.60);
  }
  .msgUnreadItem {
    position: relative;
  }
  .msgUnread {
    display: block;
    position: absolute;
    top: 50%;
    right: 30Px;
    transform: translate(0, -50%);
    width: 20Px;
    height: 20Px;
    background-color: #FB5332;
    color: #fff;
    border-radius: 50%;
    font-size: 12Px;
    text-align: center;
    line-height: 20Px;
  }
}
</style>

