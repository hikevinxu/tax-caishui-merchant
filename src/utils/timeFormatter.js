const timeFormatter = {
  formatter: function(timeValue){
    let date = new Date(timeValue)
    let year = date.getFullYear()
    let month = date.getMonth()+1
    let day = date.getDate()
    month = month < 10 ? "0"+month:month
    day = day < 10 ? "0"+day:day
    return year+'-'+month+'-'+day
  },
  getPreMonthDay: function(date, monthNum){
    let dateArr = date.split('-')
    let year = dateArr[0] //获取当前日期的年份
    let month = dateArr[1] //获取当前日期的月份
    let day = dateArr[2] //获取当前日期的日
    let days = new Date(year, month, 0)
    days = days.getDate() //获取当前日期中月的天数
    let year2 = year
    let month2 = parseInt(month) - monthNum
    if (month2 <= 0) {
      year2 =
        parseInt(year2) -
        parseInt(month2 / 12 == 0 ? 1 : Math.abs(parseInt(month2 / 12)) + 1)
      month2 = 12 - (Math.abs(month2) % 12)
    }
    let day2 = day
    let days2 = new Date(year2, month2, 0)
    days2 = days2.getDate()
    if (day2 > days2) {
      day2 = days2
    }
    if (month2 < 10) {
      month2 = '0' + month2
    }
    let t2 = year2 + '-' + month2 + '-' + day2
    return t2
  }
}

export default timeFormatter