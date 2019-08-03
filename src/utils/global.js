export let config = {
  // IM即时通信的 key
  IMAppKey: '7cb7efab05029f8c18576aa98a9cce96',
  // 高德地图的 key
  amapKey: '54f7b2ff0b18deaefc0fd1925e434ead',
  // 网易云盾的 key
  captchaId: 'ed852fa384a14b579172a3f93ba4c934'
}
export let regExp = {
  // 上传图片 名字中含有非法字符
  imgNameEx: /\*|\?|<|>|\\|\/|:|"|\|/
}
export let getQueryString = function (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}
export let Terminal = {
  // 辨别移动终端类型
  platform : function () {
    var u = navigator.userAgent, app = navigator.appVersion;
    return {
        // android终端或者uc浏览器
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        // 是否为iPhone或者QQHD浏览器
        iPhone: u.indexOf('iPhone') > -1 ,
        // 是否iPad
        iPad: u.indexOf('iPad') > -1,
        weixin: u.indexOf('MicroMessenger') > -1
    };
  }(),
  // 辨别移动终端的语言：zh-cn、en-us、ko-kr、ja-jp...
  language : (navigator.browserLanguage || navigator.language).toLowerCase(),
  deviceInfo: function () {
    let ww = window.innerWidth
    let deviceType
    if (ww > 750) {
      deviceType = 'pc'
    } else {
      deviceType = 'phone'
    }
    return {
      deviceWidth: ww,
      deviceType: deviceType
    }
  } 
}

export let eventManager = {
  handlers: {},
  addEvent: function (eventName, callback) {
    // 添加自定义事件
    let self = this
    if (self.handlers[eventName] == undefined) {
      window.addEventListener(eventName, (e) => {
        e.preventDefault()
        if(callback) {
          callback(self.extdata);
          self.handlers[eventName] = (callback)
        }
      }, false)
    }
  },
  returnEvent: function (eventName, extdata){
    let self = this
    let event = new Event(eventName)
    self.extdata = extdata
    window.dispatchEvent(event)
  },
  removeEvent: function(eventName, callback){
    let self = this
    if (self.handlers[eventName] instanceof Array) {
      // window.removeEventListener(eventName, self.handlers[eventName], false)
    }
  }
}
