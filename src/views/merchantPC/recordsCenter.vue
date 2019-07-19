<template>
  <div class="recordsCenter">
    <div class="data monthData">
      <div class="title">每月数据</div>
      <div class="selectMonth">
        <div class="leftBtn">
          123
        </div>
        <ul>
          <li>
            <span>2018</span>
            <div class="item">123</div>
          </li>
          <li>
            <span>2018</span>
            <div class="item">123</div>
          </li>
          <li>
            <span>2018</span>
            <div class="item">123</div>
          </li>
          <li>
            <span>2018</span>
            <div class="item">123</div>
          </li>
          <li>
            <span>2018</span>
            <div class="item">123</div>
          </li>
          <li>
            <span>2018</span>
            <div class="item">123</div>
          </li>
          <li>
            <span>2018</span>
            <div class="item">123</div>
          </li>
          <li>
            <span>2018</span>
            <div class="item">123</div>
          </li>
          <li>
            <span>2018</span>
            <div class="item">123</div>
          </li>
          <li>
            <span>2018</span>
            <div class="item">123</div>
          </li>
        </ul>
        <div class="rightBtn">
          456
        </div>
      </div>
      <div class="dataShow">
        <div class="dataShowItem">
          <span>3816</span>
          <div class="phoneData">
            <div class="phoneDataInner">
              <span></span><p>电话咨询量</p>
            </div>
          </div>
        </div>
        <div class="dataShowItem">
          <span>625</span>
          <div class="phoneData">
            <div class="phoneDataInner">
              <span></span><p>IM咨询量</p>
            </div>
          </div>
        </div>
        <div class="dataShowItem">
          <span style="color: #5AB3A4;">11862</span>
          <div class="phoneData">
            <div class="phoneDataInner">
              <span></span><p>浏览量</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="data dateData">
      <div class="title">每日数据</div>
      <div class="dateDataContainer">
        <div class="itemRow">
          
        </div>
        <div class="itemRow">
          <div class="phoneRecordsTitle">电话记录（6）</div>
          <ul>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li class="loadMore"><i v-if="!phoneFinish">点击加载更多</i><i v-else>没有更多数据了</i></li>
          </ul>
        </div>
        <div class="itemRow">
          <div class="phoneRecordsTitle">IM咨询记录（6）</div>
          <ul>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li class="loadMore"><i v-if="!IMFinish">点击加载更多</i><i v-else>没有更多数据了</i></li>
          </ul>
          <!-- <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="(item, index) in list"
              :key="index"
            >
              <div class="listItem"><span>{{item.name}}</span><span>{{item.date}}</span></div>
            </van-cell>
          </van-list> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { List, Cell } from 'vant'
Vue.use(List).use(Cell)

import { setCookie } from '@/utils/cookie.js'
export default {
  data(){
    return {
      phoneFinish: false,
      IMFinish: false,
      loading: false,
      finished: false,
      list: []
    }
  },
  methods: {
    toChat: function(){
      setCookie('uid', '15515268707')
      setCookie("sdktoken", "b3e8d33f9cfbc94f4ea0e8b41c41fb1c")
      window.open('./IM/im/main.html')
    },
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push({
            name: '187****7261',
            date: '发起时间 12:32:92'
          });
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    }
  }
}
</script>
<style lang="scss">
.recordsCenter {
  // width: 100vw;
  min-height: 100vh;
  font-size: 16PX;
  display: flex;
  flex-direction: column;
  padding-bottom: 32Px;
  .data {
    min-width: 1040Px;
    .title {
      margin-top: 24Px;
      margin-left: 32Px;
      font-family: PingFangSC-Medium;
      font-size: 16Px;
      color: rgba(0,0,0,0.87);
      line-height: 22Px;
    }
  }
  .monthData {
    width: 100%;
    // height: 306Px;
    background: #FFFFFF;
    box-shadow: 0 4Px 8Px 0 rgba(0,0,0,0.04);
    .selectMonth {
      text-align: center;
      margin: 0 32Px;
      margin-top: 24Px;
      display: flex;
      .rightBtn {
        width: 60Px;
        height: 92Px;
        padding-top: 20Px;
        box-sizing: border-box;
        background-color: green;
      }
      .leftBtn {
        width: 60Px;
        height: 92Px;
        padding-top: 20Px;
        box-sizing: border-box;
        background-color: green;
      }
      ul {
        flex: 1;
        display: flex;
        li {
          flex: 1;
          height: 92Px;
          span {
            display: block;
            width: 100%;
            margin-bottom: 8Px;
          }
          .item {
            margin-top: 28Px;
            width: 64Px;
            height: 64Px;
            margin: 0 auto;
            line-height: 64Px;
            background-color: pink;
            border-radius: 50%;
          }
        }
      }
    }
    .dataShow {
      width: 100%;
      height: 144Px;
      box-sizing: border-box;
      padding: 24Px 32Px;
      display: flex;
      .dataShowItem {
        flex: 1;
        box-sizing: border-box;
        border-right: 1Px solid rgba(0,0,0,0.08);
        padding-top: 16Px;
        &:last-child {
          border-right: 0;
        }
        span {
          display: block;
          font-family: PingFangSC-Medium;
          font-size: 30Px;
          color: #FF7F4A;
          text-align: center;
          line-height: 36Px;
        }
        .phoneData {
          position: relative;
          margin-top: 8Px;
          .phoneDataInner {
            overflow: hidden;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, 0);
            font-family: PingFangSC-Regular;
            font-size: 14Px;
            color: rgba(0,0,0,0.60);
            text-align: center;
            line-height: 16Px;
            span {
              display: block;
              float: left;
              width: 16Px;
              height: 16Px;
              background-color: green;
              border-radius: 50%;
              margin-right: 8Px;
            }
            p {
              display: block;
              float: left;
            }
          }
        }
      }
    }
  }
  .dateData {
    width: 100%;
    min-height: 580Px;
    flex: 1;
    margin-top: 16Px;
    background: #FFFFFF;
    box-shadow: 0 4Px 8Px 0 rgba(0,0,0,0.04);
    display: flex;
    flex-direction: column;
    .dateDataContainer {
      flex: 1;
      max-height: 510Px;
      box-sizing: border-box;
      padding: 16Px 32Px;
      display: flex;
      justify-content: space-between;
      .itemRow {
        flex: 1;
        border: 1px solid rgba(0,0,0,0.04);
        border-right: 0;
        display: flex;
        flex-direction: column;
        &:first-child {
          background: #F5F5F5;
          flex: none;
          width: 304Px;
          border: 0;
        }
        .phoneRecordsTitle {
          height: 60Px;
          box-sizing: border-box;
          font-family: PingFangSC-Medium;
          font-size: 14Px;
          color: rgba(0,0,0,0.60);
          line-height: 60Px;
          padding-left: 24Px;
          border-bottom: 1px solid rgba(0,0,0,0.04);
        }
        ul {
          flex: 1;
          display: block;
          margin: 0 24Px;
          overflow: scroll;
          &::-webkit-scrollbar {
            display: none;
          }
          li {
            display: block;
            height: 40Px;
            border-bottom: 1px solid rgba(0,0,0,0.04);
            font-family: PingFangSC-Regular;
            font-size: 12Px;
            color: rgba(0,0,0,0.38);
            text-align: left;
            line-height: 40Px;
            span {
              float: left;
            }
            span:last-child {
              float: right;
            }
          }
          li.loadMore {

            text-align: center;
          }
        }
        .van-list {
          flex: 1;
          display: block;
          margin: 0 24Px;
          overflow: scroll;
          &::-webkit-scrollbar {
            display: none;
          }
          .van-cell {
            padding: 0;
            height: 40Px;
            border-bottom: 1px solid rgba(0,0,0,0.04);
            font-family: PingFangSC-Regular;
            font-size: 12Px;
            color: rgba(0,0,0,0.38);
            text-align: left;
            line-height: 40Px;
          }
          .van-cell:not(:last-child)::after {
            border: 0;
          }
          .van-list__loading,
          .van-loading__text,
          .van-list__finished-text {
            padding: 0;
            height: 40Px;
            font-family: PingFangSC-Regular;
            font-size: 12Px;
            color: rgba(0,0,0,0.38);
            text-align: left;
            line-height: 40Px;
            text-align: center;
          }
          .van-loading__text {
            margin-left: 10Px;
          }
          .listItem {
            padding: 0;
            height: 40Px;
            border-bottom: 1px solid rgba(0,0,0,0.04);
            font-family: PingFangSC-Regular;
            font-size: 12Px;
            color: rgba(0,0,0,0.38);
            text-align: left;
            line-height: 40Px;
            span {
              float: left;
            }
            span:last-child {
              float: right;
            }
          }
        }
      }
    }
  }
}
</style>
