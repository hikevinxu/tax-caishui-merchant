<template>
  <div class="siderBar-page siderBar">
    <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
      :router="true"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="/home" route="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">商户主页</span>
      </el-menu-item>
      <el-submenu index="/merchantInfo">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商户信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/basicInfo" route="/basicInfo">基本资料</el-menu-item>
          <el-menu-item index="/addressInfo" route="/addressInfo">地址信息</el-menu-item>
          <el-menu-item index="/publicityFigure" route="/publicityFigure">宣传图片</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/mainBusiness" route="/mainBusiness">
        <i class="el-icon-menu"></i>
        <span slot="title">主营业务管理</span>
      </el-menu-item>
      <el-menu-item index="/recordsCenter" route="/recordsCenter">
        <i class="el-icon-setting"></i>
        <span slot="title">数据中心</span>
      </el-menu-item>
      <el-menu-item class="msgUnreadItem" index="/messageCenter" route="/messageCenter">
        <i class="el-icon-document"></i>
        <span slot="title">消息中心 <span v-if="unread > 0" class="msgUnread">{{unread}}</span></span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import router from '../../router/index.js'
export default {
  name: 'siderBar',
  data(){
    return {
      activeMenu: '',
      unread: 0,
      sessionlist: []
    }
  },
  // 所有页面更新都会触发此函数
  updated () {
    let that = this
    // 提交sdk连接请求
    var nim = SDK.NIM.getInstance({
        // debug: true,
        appKey: "7cb7efab05029f8c18576aa98a9cce96",
        account: "15515268707",
        token: "b3e8d33f9cfbc94f4ea0e8b41c41fb1c",
        syncSessionUnread: true,
        syncRobots: true,
        autoMarkRead: true, // 默认为true
        transports: ['websocket'],
        onsessions: onSessions,
        onupdatesession: onUpdateSession
    });
    function onSessions(sessions) {
      console.log(sessions)
      that.sessionlist = sessions
      for(let i=0;i<that.sessionlist.length;i++){
        that.unread += Number(that.sessionlist[i].unread)
      }
    }
    function onUpdateSession(session) {
      console.log(session)
      that.sessionlist = nim.mergeSessions(that.sessionlist, session)
      that.sessionlist.sort((a, b) => {
        return b.updateTime - a.updateTime
      })
      console.log(that.sessionlist)
      that.unread = 0
      for(let i=0;i<that.sessionlist.length;i++){
        that.unread += Number(that.sessionlist[i].unread)
      }
    }
    function updateSessionsUI() {
      // 刷新界面
    }
  },
  created () {
    this.activeMenu = this.$route.path
    router.beforeEach((to,from,next) => {
      this.activeMenu = to.path ? to.path : this.$route.path
      next()
    })
    let that = this
    window.addEventListener("popstate", function() {
      that.activeMenu = that.$route.path
    }, false)
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
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
    background-color: red;
    color: #fff;
    border-radius: 50%;
    font-size: 12Px;
    text-align: center;
    line-height: 20Px;
  }
}
</style>

