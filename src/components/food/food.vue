<template>
    <transition name="move">
      <div class="food" v-show="showFlag" ref="food">
        <div class="food-content">
          <div class="img-header">
            <img :src="food.image" alt="">
            <div class="icon-wrapper" @click="hide">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月销量{{food.sellCount}}</span>
              <span class="sell-rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">{{food.price}}</span>
              <span class="old" v-if="food.oldPrice">{{food.oldPrice}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
            <!--添加fade动画是为了使小球动画有效-->
            <transition name="fade">
              <div class="buy"
                   v-show="!food.count || food.count === 0"
                   @click.stop.prevent="addFirst($event)">加入购物车</div>
            </transition>
          </div>
          <split v-show="food.info"></split>
          <div class="info" v-show="food.info">
            <h1 class="title">商品详情</h1>
            <p class="text">{{food.info}}</p>
          </div>
          <split></split>
          <div class="rating">
            <h1 class="title">商品评价</h1>
            <ratingselect
              :selectType="selectType"
              :onlyContent="onlyContent"
              :desc="desc" :ratings="food.ratings"></ratingselect>
          </div>
        </div>
      </div>
    </transition>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import cartcontrol from '../../components/cartcontrol/cartcontrol.vue';
  import split from '../../components/split/split.vue';
  import ratingselect from '../../components/ratingselect/ratingselect.vue';

  const ALL = 2;
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    },
    methods: {
      show () {
        this.showFlag = true;
        // 每次show时需要重新赋值，因为是多个组件复用，值不同
        this.selectType = ALL;
        this.onlyContent = true;
        this.desc = {
          all: '全部',
            positive: '推荐',
            negative: '吐槽'
        };
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh(); // 重新做一次计算
          }
        });
      },
      hide () {
        this.showFlag = false;
      },
      addFirst (event) {
        if (!event._constructed) {
          return;
        }
        Vue.set(this.food, 'count', 1);
        console.log(event.target);
        this.$emit('cartAdd', event.target);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    width: 100%
    z-index: 40
    background-color: #fff
    transition: all .4s linear
    transform: translate3D(0,0,0)
    /*组价入场动画，从右向左*/
    &.move-enter-active, &.move-leave-active
      transition: all .4s linear
    &.move-enter,&.move-leave-to
      transform: translate3D(100%,0,0)
    .img-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .icon-wrapper
        position: absolute;
        top: 10px
        left: 0
      .icon-arrow_lift
        display: block
        padding: 10px
        font-size: 18px
        color:#fff
    .content
      position: relative
      padding: 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        font-size: 14px
        font-weight: 700
        color:rgb(7,17,27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        font-size: 0
        color: rgb(147,153,159)
        .sell-count
          margin-right: 12px
          font-size: 10px
        .sell-rating
          margin-right: 12px
          font-size: 10px

      .price
        line-height: 24px
        font-weight: 700
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
    .cartcontrol-wrapper
      position: absolute
      right: 12px
      bottom: 12px
    .buy
      position: absolute
      right: 18px
      bottom: 18px
      padding:0 12px
      line-height: 24px
      box-sizing: border-box
      font-size: 10px
      border-radius: 12px
      color: #fff
      background-color: rgb(0,160,220)
      z-index: 10
      transition: all .2s
      /*组价入场动画，从右向左*/
      &.fade-enter-active, &.fade-leave-active
        transition: all .2s
      &.fade-enter,&.fade-leave-to
        opacity: 0
        z-index: -1
    .info
      padding: 18px
      .title
        margin-bottom: 6px
        line-height: 14px
        font-size: 14px
        color: rgb(7,17,27)
      .text
        padding: 0 8px
        line-height: 14px
        font-size: 12px
        color: rgb(77,85,93)
    .rating
      padding-top: 18px
      .title
        margin-left: 18px
        line-height: 14px
        font-size: 14px
        color: rgb(7,17,27)
</style>
