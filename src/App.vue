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
    <!--keep-alive 生命周期不会被重新加载，数据请求也不会再次被触发，还会记录组件的位置和状态-->
    <keep-alive>
      <!--路由外链-->
      <router-view class="view" :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue';
  import axios from 'axios';
  import {urlParse} from './common/js/util';
  const ERR_OK = 0;
  export default {
    name: 'elem',
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      };
    },
    created () {
      axios.get('/api/seller').then((response) => {
        if (response.data.errno === ERR_OK) {
          this.seller = Object.assign({}, response.data.data, {id: this.seller.id}); // 需要额外添加属性时用这个方法 Object.assign() ES6的语法
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
