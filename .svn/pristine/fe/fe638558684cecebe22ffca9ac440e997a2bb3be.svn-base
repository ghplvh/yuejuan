<template>
  <div class="customer-service">
    <ul class="service-ul">
      <li class="service-ul-item">
        <el-popover placement="left" width="160" trigger="hover" content="点击图标，接入在线客服" popper-class="service-popper">
          <i class="icon el-icon-service" slot="reference"></i>
        </el-popover>
      </li>
      <li class="service-ul-item">
        <el-popover placement="left" width="260" trigger="hover" content="客服电话：0731-89717551" popper-class="service-popper">
          <i class="icon el-icon-phone" slot="reference"></i>
        </el-popover>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  }
}
</script>
<style lang="scss">
.customer-service {
  position: fixed;
  right: 3%;
  bottom: 120px;
  width: 35px;
  height: 100px;
  z-index: 10;
  .service-ul {
    list-style: none;
    padding: 0;
    .service-ul-item {
      position: relative;
      background-color: #ffffff;
      width: 35px;
      height: 35px;
      text-align: center;
      border: 1px solid #dbdbdb;
      margin-bottom: 5px;
      cursor: pointer;
      .icon {
        line-height: 35px;
        font-size: 25px;
        &:hover {
          color: #409eff;
        }
      }
    }
  }
}
.service-popper {
  width: auto !important;
  height: auto !important;
}
</style>
