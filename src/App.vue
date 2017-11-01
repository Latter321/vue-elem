<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <v-header :seller="seller"/>
    <div class="tab border-1px">
      <router-link class="tab-item" to="/goods">
        商品
      </router-link>
      <router-link class="tab-item" to="/rating">
        评论
      </router-link>
      <router-link class="tab-item" to="/seller">
        商家
      </router-link>
    </div>
    <!--路由外链-->
    <router-view class="view"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue';
  import axios from 'axios';
  const ERR_OK = 0;
  export default {
    name: 'elem',
    data () {
      return {
        seller: {}
      };
    },
    created () {
      axios.get('/api/seller').then((response) => {
        if (response.data.errno === ERR_OK) {
//          this.seller = Object.assign({}, response.data.data);
          this.seller = response.data.data;
        }
      });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl";
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7,17,27,.1))
      .tab-item
        flex: 1
        font-size: 14px
        text-align: center
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)

</style>
