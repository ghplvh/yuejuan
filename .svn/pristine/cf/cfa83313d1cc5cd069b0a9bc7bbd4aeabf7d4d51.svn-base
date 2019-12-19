const Utils = {
  /**
   * 格式化时间
   * @param date 原始时间
   * @param noHours 是否需要时分秒
   * @param symbol 拼接符号
   */
  formatTime: (date, noHours = false, symbol = '-') => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    if (noHours) {
      return [year, month, day].map(Utils.formatNumber).join(symbol)
    } else {
      return [year, month, day].map(Utils.formatNumber).join(symbol) + ' ' + [hour, minute, second].map(Utils.formatNumber).join(':')
    }
  },
  /**
   * 保持两位数字
   * @param n 数字
   */
  formatNumber: n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  },
  /**
   * 判断是否是json格式的字符串
   * @param str 字符串
   */
  isJsonString: (str) => {
    try {
      if (typeof JSON.parse(str) === 'object') {
        return true
      }
    } catch (e) {}
    return false
  },
  /**
   * 对象深拷贝
   * @param obj 被拷贝的对象
   */
  deepCopy: obj => {
    if (typeof obj !== 'object') {
      return
    }
    var newObj = obj.constructor === Array ? [] : {}
    for (var i in obj) {
      newObj[i] = typeof obj[i] === 'object' ? Utils.deepCopy(obj[i]) : obj[i]
    }
    return newObj
  },
  /**
   * 下载文件
   * @param {*} url 文件下载链接
   */
  download: (url) => {
    const elink = document.createElement('a')
    elink.style.display = 'none'
    elink.target = '_blank'
    elink.href = url
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
  },
  /**
   * Vue新窗口打开路由
   * @param {Vue} vue vue实例
   * @param {VueRouter} router 路由对象
   */
  openTarget: (vue, router) => {
    let routeUrl = vue.$router.resolve(router)
    window.open(routeUrl.href, '_blank')
  },
  /**
   * 计算平均数,eval()函数可计算某个字符串，并执行其中的的 JavaScript 代码。~~运算符，简单一点就是将一些变量转化为Number（数字）类型的；
   * @param {Array} arr 数字数组如 [1,2,3]
   */
  arrAverageNum2: (arr) => {
    /* eslint-disable */
    let sum = eval(arr.join('+'))
    /* eslint-enable */
    return ~~(sum / arr.length * 100) / 100
  },
  arrAverageNum: (arr) => {
    let sum = arr.reduce((x, y) => {
      return x + y
    })
    return ~~(sum / arr.length * 100) / 100
  },
  /**
   * 返回数组中最大的数字
   * @param {Array} arr 数字数组如 [1,2,3]
   */
  arrMaxNum: (arr) => {
    var maxNum = -Infinity
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxNum) {
        maxNum = arr[i]
      }
    };
    return maxNum
  },
  arrMaxNum2: (arr) => {
    return Math.max.apply(null, arr)
  },
  /**
   * 返回数组中最小的数字
   * @param {Array} arr 数字数组如 [1,2,3]
   */
  arrMinNum: (arr) => {
    var minNum = Infinity
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] < minNum) {
        minNum = arr[i]
      }
    };
    return minNum
  },
  arrMinNum2: (arr) => {
    return Math.min.apply(null, arr)
  },
  /**
   * 计算数组中大于等于min小于max的个数
   * @param {Array} arr 数字数组如 [1,2,3]
   * @param {Number} min 区间最小数
   * @param {Number} max 区间最大数
   * @param {Boolean} includeMin 是否包含最小值min
   * @param {Boolean} includeMax 是否包含最大值max
   */
  arrInRangeCount: (arr, min, max, includeMin = false, includeMax = false) => {
    let count = 0
    for (let i = 0; i < arr.length; i++) {
      let number = arr[i]
      if (includeMin && includeMax) {
        if (number >= min && number <= max) {
          count++
        }
      } else if (includeMin && !includeMax) {
        if (number >= min && number < max) {
          count++
        }
      } else if (!includeMin && includeMax) {
        if (number > min && number <= max) {
          count++
        }
      } else if (!includeMin && !includeMax) {
        if (number > min && number < max) {
          count++
        }
      }
    }
    return count
  },
  /**
   * 两数求和
   * @param {Number} x
   * @param {Number} y
   */
  sum: (x, y) => {
    return x + y
  },
  /**
   * 求数字平方
   * @param {Number} x
   */
  square: (x) => {
    return Math.pow(x, 2)
  },
  /**
   * 求数组偏差
   * @param {Array} arr 数字数组如 [1,2,3]
   */
  deviations: (arr) => {
    let mean = Utils.arrAverageNum(arr)
    return arr.map(number => {
      return number - mean
    })
  },
  /**
   * 求标准差,可能需要 Math.sqrt(deviations.map(Utils.square).reduce(Utils.sum) / (arr.length - 1))
   * @param {Array} arr 数字数组如 [1,2,3]
   */
  standardDeviation: (arr) => {
    let deviations = Utils.deviations(arr)
    return Math.sqrt(deviations.map(Utils.square).reduce(Utils.sum) / (arr.length))
  },
  /**
   * min到max之间的数字分段
   * @param {Number} min 区间最小数
   * @param {Number} max 区间最大数
   * @param {Number} step 区间大小
   * @returns {Array} arr [{low:0,high:1,includeLow:true,includeHigh:true}]
   * @description {Boolean} includeLow 是否包含每段最小值low
   * @description {Boolean} includeHigh 是否包含每段最大值high
   */
  rangeSection: (min, max, step) => {
    let arr = []
    for (let i = max; i > min; i = i - step) {
      arr.push({
        low: i - step,
        high: i,
        includeHigh: i === max,
        includeLow: true
      })
    }
    return arr
  }
}
export default Utils
