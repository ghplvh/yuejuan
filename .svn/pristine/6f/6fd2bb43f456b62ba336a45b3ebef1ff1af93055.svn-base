/**
 * 作者： 谢厂节
 * 来源： CSDN
 * 原文： https: //blog.csdn.net/xundh/article/details/77563075
 */
/*
 * 函数定义
 * 入口参数data,平行数组
 * key，id字段
 * parentKey，父字段
 * map,需要将原始属性名称转换为什么名称
 * childrenName 子树的属性名
 */
class TreeUtil {
  constructor (data, key, parentKey, map, childrenName = 'children') {
    this.data = data
    this.key = key
    this.parentKey = parentKey
    this.treeParentKey = parentKey // parentKey要转换成什么属性名称
    this.treeKey = key // key要转换成什么属性名称
    this.map = map
    if (map) {
      if (map[key]) this.treeKey = map[key]
    }
    this.toTree = function () {
      let data = this.data
      let pos = {}
      let tree = []
      let i = 0
      while (data.length !== 0) {
        if (data[i][this.parentKey] === data[i][this.key] || data[i][this.parentKey] === '') {
          let _temp = this.copy(data[i])
          tree.push(_temp)
          pos[data[i][this.key]] = [tree.length - 1]
          data.splice(i, 1)
          i--
        } else {
          let posArr = pos[data[i][this.parentKey]]
          if (posArr !== undefined) {
            let obj = tree[posArr[0]]
            for (let j = 1; j < posArr.length; j++) {
              obj = obj[childrenName][posArr[j]]
            }
            let _temp = this.copy(data[i])
            obj[childrenName].push(_temp)
            pos[data[i][this.key]] = posArr.concat([obj[childrenName].length - 1])
            data.splice(i, 1)
            i--
          }
        }
        i++
        if (i > data.length - 1) {
          i = 0
        }
      }
      return tree
    }
    this.copy = function (item) {
      let _temp = {}
      _temp[childrenName] = []
      _temp[this.treeKey] = item[this.key]
      for (let _index in item) {
        if (_index !== this.key && _index !== this.parentKey) {
          let _property = item[_index]
          if ((!!this.map) && this.map[_index]) {
            _temp[this.map[_index]] = _property
          } else {
            _temp[_index] = _property
          }
        }
      }
      return _temp
    }
  }
}
export default TreeUtil
