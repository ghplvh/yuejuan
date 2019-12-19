<template>
  <div class="foot-bar">
    <template v-for="(item,index) in footData">
      <a v-if="item.href" :href="item.href" :key="index">{{item.title}}{{index != (footData.length-1) ? '&nbsp;|&nbsp;':''}}</a>
      <a v-else :key="index">{{item.title}}{{index != (footData.length-1) ? '&nbsp;|&nbsp;':''}}</a>
    </template>
  </div>
</template>
<script>
export default {
  data () {
    return {
      footData: []
    }
  },
  created () {
    this.footData = [
      {
        href: '#',
        title: '©2018-2019  湖南都成科技有限公司'
      },
      {
        href: '#',
        title: '湘ICP备12345678-9号'
      }, {
        href: '#',
        title: '湘公网安备12345678901234'
      }, {
        href: '',
        title: '公司名公司名公司名公司名 ©2018-' + new Date().getFullYear()
      }
    ]
  }
}
</script>
<style lang="scss" scoped>
.foot-bar {
  margin: 30px 0 20px 0;
  height: 30px;
  text-align: center;
  font-size: 12px;
  color: gray;
  a {
    text-decoration: none;
    color: gray;
  }
}
</style>
