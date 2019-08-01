<template>
  <div class="recordsCenter">
    <div class="data monthData">
      <div class="title">每月数据</div>
      <div class="selectMonth">
        <div class="leftBtn" @click="clickLeftBtn">
          <img src="@/assets/globalPc/ic_b_scroll_left.png" alt="">
        </div>
        <ul>
          <li v-for="(item, index) in monthList" :key="'month' + index" >
            <span>{{item.month == '01月' || index == 0 ? item.year : ''}}</span>
            <div class="item" :style="item.active ? 'background-color: #FF7F4A;color: #fff;' : ''" @click="clickMonth(item.date, index)">{{item.month}}</div>
          </li>
        </ul>
        <div class="rightBtn" @click="clickRightBtn">
          <img src="@/assets/globalPc/ic_b_scroll_right.png" alt="">
        </div>
      </div>
      <div class="dataShow">
        <div class="dataShowItem">
          <span>{{monthPhoneCount}}</span>
          <div class="phoneData">
            <div class="phoneDataInner">
              <span><img src="@/assets/globalPc/ic_b_data_phone.png" alt=""></span><p>电话咨询量</p>
            </div>
          </div>
        </div>
        <div class="dataShowItem">
          <span>{{monthImCount}}</span>
          <div class="phoneData">
            <div class="phoneDataInner">
              <span><img src="@/assets/globalPc/ic_b_data_im.png" alt=""></span><p>IM咨询量</p>
            </div>
          </div>
        </div>
        <div class="dataShowItem">
          <span style="color: #5AB3A4;">{{monthViewCount}}</span>
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
            <div class="CalendarDataTitle">{{currentDate}} 数据</div>
            <ul>
              <li>
                <div class="itemCalendarItem">
                  <span><img src="@/assets/globalPc/ic_b_data_phone.png" alt=""></span><i>电话咨询量</i>
                </div>
                <div class="itemCalendarItemNum orangeColor">{{dayPhoneCount}}次</div>
              </li>
              <li>
                <div class="itemCalendarItem">
                  <span><img src="@/assets/globalPc/ic_b_data_im.png" alt=""></span><i>IM咨询量</i>
                </div>
                <div class="itemCalendarItemNum orangeColor">{{dayImCount}}次</div>
              </li>
              <li>
                <div class="itemCalendarItem">
                  <span><img src="@/assets/globalPc/ic_b_data_view.png" alt=""></span><i>浏览量</i>
                </div>
                <div class="itemCalendarItemNum greenColor">{{dayViewCount}}次</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="itemRow">
          <div class="phoneRecordsTitle">电话记录（{{phoneTotal}}）</div>
          <ul>
            <li v-for="(item, index) in phoneDataList" :key="'phoneData' + index"><span>{{item.consultUser | phoneFilter}}</span><span>发起时间 {{item.consultTime}}</span></li>
            <li class="loadMore" @click="getPhoneNextPageList"><i v-if="phoneDataList.length < phoneTotal">点击加载更多</i><i v-else>没有更多数据了</i></li>
          </ul>
        </div>
        <div class="itemRow">
          <div class="phoneRecordsTitle">IM咨询记录（{{imTotal}}）</div>
          <ul>
            <li v-for="(item, index) in imDataList" :key="'imData' + index"><span>{{item.consultUser | phoneFilter}}</span><span>发起时间 {{item.consultTime}}</span></li>
            <li class="loadMore" @click="getImNextPageList"><i v-if="imDataList.length < imTotal">点击加载更多</i><i v-else>没有更多数据了</i></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { List, Cell } from 'vant'
import requestApi from '@/api/requestApi'
import globalApi from '@/api/globalApi'
Vue.use(List).use(Cell)
import Calendar from 'vue-calendar-component'
import timeFormatter from '@/utils/timeFormatter'
export default {
  components: {
    Calendar
  },
  filters: {
    phoneFilter: (str) => {
      return str.substr(0,3)+'****'+str.substr(parseInt(str.split('').length/2+2),str.split('').length)
    }
  },
  data(){
    return {
      listPhoneQuery: {
        pageNum: 1,
        pageSize: 10,
        type: "phone",
        time: ''
      },
      listIMQuery: {
        pageNum: 1,
        pageSize: 10,
        type: "im",
        time: ''
      },
      phoneFinish: false,
      IMFinish: false,
      loading: false,
      finished: false,
      list: [],
      monthList: [],
      currentYear: '',
      phoneDataList: [],
      imDataList: [],
      monthImCount: 0,
      monthPhoneCount: 0,
      monthViewCount: 0,
      dayImCount: 0,
      dayPhoneCount: 0,
      dayViewCount: 0,
      imTotal: 0,
      phoneTotal: 0,
      currentDate: '',
      activeMonth: '',
      arr: []
    }
  },
  created() {
    let date = new Date()
    this.currentYear = date.getFullYear()
    this.monthList = this.initMonth(this.currentYear)
    // this.arr = ["2019/7/2","2019/7/6"]
    this.listPhoneQuery.time = this.getToday()
    this.listIMQuery.time = this.getToday()
    this.currentDate = this.getToday()
    this.activeMonth = this.getToday()
    this.getPhoneDatacenterConsultRecords()
    this.getIMDatacenterConsultRecords()
    this.getDatacenterStatistic(this.getToday(), 'month')
    this.getDatacenterStatistic(this.getToday(), 'day')
  },
  methods: {
    getToday(){
      let monthList = []
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth()+1
      var day = date.getDate()
      let today = year + '-' + (month >= 10 ? month : '0' + month) + '-' + (day >= 10 ? day : '0' + day)
      return today
    },
    initMonth () {
      let monthList = []
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth()+1
      var day = date.getDate()
      let today = year + '/' + (month >= 10 ? month : '0' + month) + '/' + (day >= 10 ? day : '0' + day)

      console.log(today)
      
      function getDate(s){
        return new Date(s)
      }

      let timer = timeFormatter.getPreMonthDay(today.replace(/\//g,'-'), 10)

      console.log(timer)

      var arr = [], startD = getDate(timer),endD = getDate(today)
      while(endD > startD){
        let d = startD.getDate()
        if(d === 1)arr.push(timeFormatter.formatter(startD))
        startD.setDate(startD.getDate() + 1)
      }

      console.log(arr)

      for (let i=0;i<arr.length;i++) {
        if (arr[i].split('-')[0] == today.split('/')[0] && arr[i].split('-')[1] == today.split('/')[1]) {
          monthList.push({
            date: arr[i],
            year: arr[i].split('-')[0],
            month: arr[i].split('-')[1] + '月',
            active: true
          })
        } else {
          monthList.push({
            date: arr[i],
            year: arr[i].split('-')[0],
            month: arr[i].split('-')[1] + '月',
            active: false
          })
        }
      }
      return monthList
    },
    clickMonth(date, index){
      for(let i=0;i<this.monthList.length;i++){
        this.monthList[i].active = false
      }
      this.monthList[index].active = true
      this.activeMonth = this.monthList[index].date
      this.getDatacenterStatistic(date.replace(/\//g,'-'), 'month')
      this.$refs.Calendar.ChoseMonth(date)
    },
    clickLeftBtn () {
      // console.log(this.monthList[0].date)
      this.monthList.splice(this.monthList.length - 1, 1)
      this.monthList = this.getlastMonth().concat(this.monthList)

    },
    clickRightBtn () {
      console.log(this.monthList[9])
      // this.$refs.Calendar.ChoseMonth('2018-12-12');
      let date = this.monthList[9].date
      let year = this.monthList[9].date.split('-')[0]
      let month = this.monthList[9].date.split('-')[1]
      if (this.getToday().split('-')[0] == year && this.getToday().split('-')[1] == month) {
        this.$message({
          message: '后面没有了！',
          type: 'warning',
          showClose: true,
          duration: 1000
        })
        return
      } else {
        // console.log(this.monthList[0].date)
        this.monthList.splice(0, 1)
        this.monthList = this.monthList.concat(this.getnextmonth())
      }
    },
    clickDay(data) {
      // console.log(data) //选中某天
      let timeFormatter = data.split('/')[0] + '-' + (parseInt(data.split('/')[1]) >= 10 ? data.split('/')[1] : '0' + data.split('/')[1]) + '-' + (parseInt(data.split('/')[2]) >= 10 ? data.split('/')[2] : '0' + data.split('/')[2])
      this.currentDate = timeFormatter.replace(/\//g,'-')
      this.listPhoneQuery.pageNum = 1
      this.listIMQuery.pageNum = 1
      this.listPhoneQuery.time = timeFormatter.replace(/\//g,'-')
      this.listIMQuery.time = timeFormatter.replace(/\//g,'-')
      this.getPhoneDatacenterConsultRecords()
      this.getIMDatacenterConsultRecords()
      this.getDatacenterStatistic(timeFormatter.replace(/\//g,'-'), 'day')
    },
    changeDate(data) {
      // console.log(data); //左右点击切换月份
    },
    clickToday(data) {
      // console.log(data); //跳到了本月
    },
    getPhoneDatacenterConsultRecords(){
      requestApi.datacenterConsult_records(this.listPhoneQuery).then(res => {
        if(res.code == 0){
          this.phoneDataList = res.data.items
          this.phoneTotal = res.data.total
        }
      })
    },
    getIMDatacenterConsultRecords(){
      requestApi.datacenterConsult_records(this.listIMQuery).then(res => {
        if(res.code == 0){
          this.imDataList = res.data.items
          this.imTotal = res.data.total
        }
      })
    },
    getImNextPageList(){
      this.listIMQuery.pageNum++
      requestApi.datacenterConsult_records(this.listIMQuery).then(res => {
        if(res.code == 0){
          this.imDataList = this.imDataList.concat(res.data.items)
          this.imTotal = res.data.total
        }
      })
    },
    getPhoneNextPageList(){
      this.listPhoneQuery.pageNum++
      requestApi.datacenterConsult_records(this.listPhoneQuery).then(res => {
        if(res.code == 0){
          this.phoneDataList = this.phoneDataList.concat(res.data.items)
          this.phoneTotal = res.data.total
        }
      })
    },
    getDatacenterStatistic(date, type){
      let params = {
        time: date,
        type: type
      }
      requestApi.datacenterStatistic(params).then(res => {
        if(res.code == 0){
          if(type == 'month'){
            this.monthImCount = res.data.imCount
            this.monthPhoneCount = res.data.phoneCount
            this.monthViewCount = res.data.viewCount
          }else if(type == 'day'){
            this.dayImCount = res.data.imCount
            this.dayPhoneCount = res.data.phoneCount
            this.dayViewCount = res.data.viewCount
          }
        }
      })
    },
    getnextmonth(){
      let nextArr = []
      // 现在的时间
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth()+1

      let time = this.monthList[this.monthList.length - 1].date
      let timeYear = time.split('-')[0]
      let timeMonth = time.split('-')[1]

      if(Number(timeMonth) == 12) {
        if ((Number(timeYear) + 1) == this.activeMonth.split('-')[0] && this.activeMonth.split('-')[1] == '01') {
          nextArr.push({
            date: (Number(timeYear) + 1) + '-' + '01' + '-' + '01',
            year: (Number(timeYear) + 1),
            month: '01' + '月',
            active: true
          })
        } else {
          nextArr.push({
            date: (Number(timeYear) + 1) + '-' + '01' + '-' + '01',
            year: (Number(timeYear) + 1),
            month: '01' + '月',
            active: false
          })
        }
      } else {
        let nextMonth = (Number(timeMonth) + 1) >= 10 ? (Number(timeMonth) + 1) :  "0" + (Number(timeMonth) + 1)
        if (timeYear == this.activeMonth.split('-')[0] && this.activeMonth.split('-')[1] == nextMonth) {
          nextArr.push({
            date: timeYear + '-' + nextMonth + '-' + '01',
            year: timeYear,
            month: nextMonth + '月',
            active: true
          })
        } else {
          nextArr.push({
            date: timeYear + '-' + nextMonth + '-' + '01',
            year: timeYear,
            month: nextMonth + '月',
            active: false
          })
        }
      }
      return nextArr
    },
    getlastMonth(){
      let lastArr = []
      // 现在的时间
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth()+1

      let time = this.monthList[0].date
      let timeYear = time.split('-')[0]
      let timeMonth = time.split('-')[1]

      if(Number(timeMonth) == 1) {
        lastArr.push({
          date: (Number(timeYear) - 1) + '-' + '12' + '-' + '01',
          year: (Number(timeYear) - 1),
          month: '12' + '月',
          active: false
        })
      } else {
        let nextMonth = (Number(timeMonth) - 1) >= 10 ? (Number(timeMonth) - 1) :  "0" + (Number(timeMonth) - 1)
        lastArr.push({
          date: timeYear + '-' + nextMonth + '-' + '01',
          year: timeYear,
          month: nextMonth + '月',
          active: false
        })
      }
      return lastArr
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
            .wh_jiantou2,
            .wh_jiantou1 {
              display: none;
            }
            .wh_top_changge {
              li:first-child {
                display: none;
              }
              li:last-child {
                display: none;
              }
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
