<template>
  <div class="mainFrame">
    <sider-bar id="mainSider"></sider-bar>
    <head-nav id="mainHeader"></head-nav>
    <router-view id="mainContent"></router-view>
  </div>
</template>
<script>
import headNav from '@/components/merchantPC/headNav.vue'
import siderBar from '@/components/merchantPC/siderBar.vue'
export default {
  name: 'mainFrame',
  components: {
    headNav,
    siderBar
  },
  data(){
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.mainFrame {
  position: relative;
  #mainHeader {
    position: fixed;
    top: 0;
    left: 0;
  }
  #mainSider {
    position: fixed;
    top: 0;
    left: 0;
  }
  #mainContent {
    // min-height: 100vh;
    // min-width: 100vw;
    box-sizing: border-box;
    background: rgba(0,0,0,0.04);
    padding-top: 96Px;
    padding-left: 212Px;
    padding-right: 28Px;
  }
}
</style>
