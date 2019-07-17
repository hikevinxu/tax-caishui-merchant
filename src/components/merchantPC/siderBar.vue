<template>
  <div class="siderBar">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">商户主页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商户信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">基本资料</el-menu-item>
          <el-menu-item index="2-2">地址信息</el-menu-item>
          <el-menu-item index="2-3">宣传图片</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">主营业务管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">数据中心</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-document"></i>
        <span slot="title">消息中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'siderBar',
  data(){
    return {

    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
<style lang="scss" scoped>
.siderBar {
  box-sizing: border-box;
  padding-top: 80Px;
  width: 180Px;
  height: 100%;
  background-color: #fff;
  font-size: 24Px;
}
</style>
