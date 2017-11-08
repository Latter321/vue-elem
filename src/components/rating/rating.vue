<template>
  <div class="rating">
    <div class="rating-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.servicesScore"></star>
            <span class="score">{{seller.servicesScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="score">{{seller.deliveryTime}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .rating
    &.view
      position: absolute
      top: 174px
      bottom: 0
      left: 0
      overflow: hidden
      width: 100%
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        padding: 6px 0
        flex: 0 0 137px
        width: 137px
        text-align: center
        border-right: 1px solid rgba(7,17,27,0.1)
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255,153,0)
        .title
          line-height: 12px
          font-size: 12px
          color: rgb(7,17,27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147,153,159)
      .overview-right
        flex: 1
        padding-left: 24px
        .score-wrapper
          margin-bottom: 8px
          line-height: 18px
          font-size: 0
          .title
            display: inline-block
            vertical-align: top
            line-height: 18px
            font-size: 12px
            color: rgb(7,17,27)
          .star
            display: inline-block
            vertical-align: top
            margin: 0 10px
            line-height: 18px
            font-size: 12px

        .delivery-wrapper
          font-size: 0
          .title
            display: inline-block
            vertical-align: top
            line-height: 18px
            font-size: 12px
            color: rgb(7,17,27)
</style>
