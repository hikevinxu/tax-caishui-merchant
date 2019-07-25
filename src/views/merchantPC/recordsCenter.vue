<template>
  <div class="recordsCenter">
    <div class="data monthData">
      <div class="title">每月数据</div>
      <div class="selectMonth">
        <div class="leftBtn" @click="clickLeftBtn">
          <img src="@/assets/globalPc/ic_b_scroll_left.png" alt="">
        </div>
        <ul>
          <li v-for="(item, index) in monthList2" :key="'month' + index" >
            <span>{{item.month == '1月' || index == 0 ? item.year : ''}}</span>
            <div class="item" :style="item.active ? 'background-color: #FF7F4A;color: #fff;' : ''" @click="clickMonth(index)">{{item.month}}</div>
          </li>
        </ul>
        <div class="rightBtn" @click="clickRightBtn">
          <img src="@/assets/globalPc/ic_b_scroll_right.png" alt="">
        </div>
      </div>
      <div class="dataShow">
        <div class="dataShowItem">
          <span>3816</span>
          <div class="phoneData">
            <div class="phoneDataInner">
              <span><img src="@/assets/globalPc/ic_b_data_phone.png" alt=""></span><p>电话咨询量</p>
            </div>
          </div>
        </div>
        <div class="dataShowItem">
          <span>625</span>
          <div class="phoneData">
            <div class="phoneDataInner">
              <span><img src="@/assets/globalPc/ic_b_data_im.png" alt=""></span><p>IM咨询量</p>
            </div>
          </div>
        </div>
        <div class="dataShowItem">
          <span style="color: #5AB3A4;">11862</span>
          <div class="phoneData">
            <div class="phoneDataInner">
              <span><img src="@/assets/globalPc/ic_b_data_view.png" alt=""></span><p>浏览量</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="data dateData">
      <div class="title">每日数据</div>
      <div class="dateDataContainer">
        <div class="itemRow">
          <div class="itemCalendar">
            <Calendar
              ref="Calendar"
              v-on:choseDay="clickDay"
              v-on:changeMonth="changeDate"
              :markDate="arr"
            ></Calendar>
          </div>
          <div class="itemCalendarData">
            <div class="CalendarDataTitle">2019-07-13 数据</div>
            <ul>
              <li>
                <div class="itemCalendarItem">
                  <span><img src="@/assets/globalPc/ic_b_data_phone.png" alt=""></span><i>电话咨询量</i>
                </div>
                <div class="itemCalendarItemNum orangeColor">4次</div>
              </li>
              <li>
                <div class="itemCalendarItem">
                  <span><img src="@/assets/globalPc/ic_b_data_im.png" alt=""></span><i>IM咨询量</i>
                </div>
                <div class="itemCalendarItemNum orangeColor">4次</div>
              </li>
              <li>
                <div class="itemCalendarItem">
                  <span><img src="@/assets/globalPc/ic_b_data_view.png" alt=""></span><i>浏览量</i>
                </div>
                <div class="itemCalendarItemNum greenColor">28次</div>
              </li>
            </ul>
          </div>
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
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li><span>187****7261</span><span>发起时间 12:32:92</span></li>
            <li class="loadMore"><i v-if="!phoneFinish">点击加载更多</i><i v-else>没有更多数据了</i></li>
          </ul>
        </div>
        <div class="itemRow">
          <div class="phoneRecordsTitle">IM咨询记录（6）</div>
          <!-- <ul>
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
          </ul> -->
          <van-list
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
          </van-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { List, Cell } from 'vant'
Vue.use(List).use(Cell)
import Calendar from 'vue-calendar-component'
export default {
  components: {
    Calendar
  },
  data(){
    return {
      phoneFinish: false,
      IMFinish: false,
      loading: false,
      finished: false,
      list: [],
      monthList: [
        {month: '1月', year: '2018'},
        {month: '2月', year: '2018'},
        {month: '3月', year: '2018'},
        {month: '4月', year: '2018'},
        {month: '5月', year: '2018'},
        {month: '6月', year: '2018'},
        {month: '7月', year: '2018'},
        {month: '8月', year: '2018'},
        {month: '9月', year: '2018'},
        {month: '10月', year: '2018'},
        {month: '11月', year: '2018'},
        {month: '12月', year: '2018'},
        {month: '1月', year: '2019'},
        {month: '2月', year: '2019'},
        {month: '3月', year: '2019'},
        {month: '4月', year: '2019'},
        {month: '5月', year: '2019'},
        {month: '6月', year: '2019'},
        {month: '7月', year: '2019'},
        {month: '8月', year: '2019'},
        {month: '9月', year: '2019'},
        {month: '10月', year: '2019'},
        {month: '11月', year: '2019'},
        {month: '12月', year: '2019'}
      ],
      monthList2: [],
      currentYear: '',
      arr: []
    }
  },
  created() {
    let date = new Date()
    this.currentYear = date.getFullYear()
    this.monthList2 = this.initMonth(this.currentYear)
    this.arr = ["2019/7/2","2019/7/6"]
  },
  methods: {
    initMonth (year) {
      let arr = []
      let date = new Date()
      let month = Number(date.getMonth()) + 1
      for(let j=month;j<12;j++){
        arr.push({
          month: j + 1 + '月',
          year: year-1,
          active: false
        })
      }
      for(let i=0;i<month;i++){
        arr.push({
          month: i + 1 + '月',
          year: year,
          active: false
        })
      }
      console.log(arr)
      return arr
    },
    clickMonth(index){
      for(let i=0;i<this.monthList2.length;i++){
        this.monthList2[i].active = false
      }
      this.monthList2[index].active = true
    },
    clickLeftBtn () {
      this.currentYear--
      this.monthList2 = this.initMonth(this.currentYear)
    },
    clickRightBtn () {
      // this.$refs.Calendar.ChoseMonth('2018-12-12');
      let date = new Date()
      let year = date.getFullYear()
      if (this.currentYear == year) {
        alert('后面没有了！')
      } else {
        this.currentYear++
        this.monthList2 = this.initMonth(this.currentYear)
      }
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
    },
    clickDay(data) {
      console.log(data); //选中某天
    },
    changeDate(data) {
      console.log(data); //左右点击切换月份
    },
    clickToday(data) {
      console.log(data); //跳到了本月
    }
  }
}
</script>
<style lang="scss">
.recordsCenter {
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
        padding-left: 25Px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .leftBtn {
        width: 60Px;
        height: 92Px;
        padding-top: 20Px;
        padding-right: 25Px;
        box-sizing: border-box;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
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
            height: 20Px;
            margin-bottom: 8Px;
          }
          .item {
            margin-top: 28Px;
            width: 64Px;
            height: 64Px;
            margin: 0 auto;
            line-height: 64Px;
            background: #F5F5F5;
            border-radius: 50%;
            color: rgba(0,0,0,0.38);
            cursor: pointer;
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
              border-radius: 50%;
              margin-right: 8Px;
              img {
                display: block;
                width: 100%;
                height: 100%;
              }
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
          padding-top: 5Px;
          border: 0;
          .itemCalendar {
            width: 100%;
            box-sizing: border-box;
            min-height: 330Px;
            padding: 0 12Px;
            .wh_content_all {
              background-color: #F5F5F5;
              font-family: PingFangSC-Regular;
              font-size: 12Px;
              color: rgba(0,0,0,0.87);
              text-align: center;
              line-height: 18Px;
              padding-bottom: 0;
            }
            .wh_top_changge li {
              font-family: PingFangSC-Regular;
              font-size: 14Px;
              color: rgba(0,0,0,0.87);
              text-align: center;
              line-height: 18Px;
            }
            .wh_jiantou1,
            .wh_jiantou2 {
              border-width: 2Px;
              border-color: rgba(0,0,0,0.60);
            }
            .wh_content_item {
              color: rgba(0,0,0,0.60);
              font-family: PingFangSC-Regular;
              font-size: 12Px;
              color: rgba(0,0,0,0.60);
              text-align: center;
              line-height: 18Px;
              .wh_top_tag {
                color: rgba(0,0,0,0.87);
              }
              .wh_item_date {
                width: 32Px;
                height: 32Px;
              }
            }
            .wh_content_item>.wh_isMark {
              background: #f5f5f5;
              position: relative;
            }
            .wh_content_item .wh_item_date.wh_isMark:after {
              content: '';
              width: 4Px;
              height: 4Px;
              border-radius: 50%;
              background-color: #FF7F4A;
              position: absolute;
              top: 28Px;
              left: 50%;
              transform: translate(-50%, 0)
            }
            .wh_content_item .wh_isToday {
              background: #f5f5f5;
              color:  #FF7F4A;
            }
            .wh_content_item  .wh_chose_day {
              background: #FF7F4A;
              color: #fff;
              &:hover {
                background: #FF7F4A;
                color: #fff;
              }
            }
            .wh_item_date:hover {
              background: #f5f5f5;
              color: rgba(0,0,0,0.60);
              border-radius: 50%;
            }
          }
          .itemCalendarData {
            .CalendarDataTitle {
              font-family: PingFangSC-Medium;
              font-size: 14Px;
              color: rgba(0,0,0,0.87);
              text-align: center;
              line-height: 20Px;
            }
            ul {
              display: block;
              margin-top: 16Px;
              li {
                display: block;
                height: 28Px;
                line-height: 28Px;
                overflow: hidden;
                border-bottom: 0;
                .itemCalendarItem {
                  float: left;
                  span {
                    float: left;
                    width: 16Px;
                    height: 16Px;
                    margin-right: 8Px;
                    margin-top: 6Px;
                    img {
                      display: block;
                      width: 100%;
                      height: 100%;
                    }
                  }
                  i {
                    float: left;
                    font-family: PingFangSC-Medium;
                    font-size: 14Px;
                    color: rgba(0,0,0,0.60);
                    font-weight: 400;
                  }
                }
                .itemCalendarItemNum {
                  float: right;
                }
              }
            }
          }
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
.orangeColor {
  color: #FF7F4A;
}
.greenColor {
  color: #5AB3A4;
}
</style>
