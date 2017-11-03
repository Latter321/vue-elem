<template>
  <div class="header">
    <!--内容层 start-->
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}} / {{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count"
           v-if="seller.supports"
           @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <!--内容层 end-->
    <!-- 公告层 start-->
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <!--公告层 end-->
    <!--背景图 start-->
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <!--背景图 end-->
    <!-- 公告详情弹出框 start-->
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <header-title content="优惠信息"></header-title>
            <ul class="support" v-if="seller.supports">
              <li class="support-item" v-for="(item, index) in seller.supports">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <header-title content="商家公告"></header-title>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
    <!--公告详情弹出框 end-->
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue';
  import title from '../title/title.vue';

  export default {
    name: 'header',
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      };
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      star,
      'header-title': title
    },
    methods: {
      showDetail () {
        this.detailShow = true;
      },
      hideDetail () {
        this.detailShow = false;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .header
    position: relative
    overflow: hidden
    color: #fff
    background-color: rgba(7, 17, 27, .5)
    .content-wrapper
      position: relative
      padding: 24px 18px 12px 24px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-image('./images/brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            line-height: 18px
            font-size: 16px
            font-weight: 700

        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .support
          .icon
            display: inline-block
            vertical-align: top
            margin-right: 4px
            width: 12px
            height: 12px
            background-size: 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('./images/decrease_1')
            &.discount
              bg-image('./images/discount_1')
            &.guarantee
              bg-image('./images/guarantee_1')
            &.invoice
              bg-image('./images/invoice_1')
            &.special
              bg-image('./images/special_1')
          .text
            line-height: 12px
            font-size: 10px
      .support-count
        position: absolute
        right: 12px
        bottom: 14px
        padding: 6px 8px
        height: 12px
        line-height: 12px
        text-align: center
        border-radius: 14px
        background-color: rgba(0, 0, 0, .2)
        .count
          vertical-align: top
          font-size: 10px
        .icon-keyboard_arrow_right
          margin-left: 2px
          line-height: 12px
          font-size: 10px
    .bulletin-wrapper
      position: relative
      padding: 0 22px 0 12px
      height: 28px
      line-height: 28px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background-color: rgba(7, 17, 27, .2)
      .bulletin-title
        display: inline-block
        vertical-align: top
        margin-top: 9px
        width: 22px
        height: 12px
        bg-image('./images/bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        margin: 0 4px
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        right: 12px
        top: 8px
        font-size: 10px


    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      filter: blur(10px)
      z-index: -1
    .detail
      position: fixed
      top: 0
      left: 0
      overflow: auto
      width: 100%
      height: 100%
      background-color: rgba(7, 17, 27, .8)
      backdrop-filter: blur(10px)
      z-index: 100
      &.fade-enter-active, &.fade-leave-active
        transition: all 1s
      &.fade-enter, &.fade-leave-to
        opacity: 0
        background: rgba(7, 17, 27, 0)
      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          .name
            line-height: 16px
            text-align: center
            font-size: 16px
            font-weight: 700
            color: #fff
          .star-wrapper
            margin-top: 18px
            padding: 2px 0
            text-align: center
          .support
            margin: 0 auto
            width: 80%
            .support-item
              margin-bottom: 12px
              padding: 0 12px
              font-size: 0
              &.last-child
                margin-bottom: 0
              .icon
                display: inline-block
                vertical-align: top
                margin-right: 6px
                width: 16px
                height: 16px
                background-size: 16px
                background-repeat: no-repeat
                &.decrease
                  bg-image('./images/decrease_2')
                &.discount
                  bg-image('./images/discount_2')
                &.guarantee
                  bg-image('./images/guarantee_2')
                &.invoice
                  bg-image('./images/invoice_2')
                &.special
                  bg-image('./images/special_2')
              .text
                line-height: 16px
                font-size: 12px
          .bulletin
            margin: 0 auto
            width: 80%
            .content
              padding: 0 12px
              line-height: 24px
              font-size: 12px
      .detail-close
        position: relative
        margin: -64px auto 0
        width: 32px
        height: 32px
        clear: both
        font-size: 32px
</style>
