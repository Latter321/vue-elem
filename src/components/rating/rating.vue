<template>
  <div class="rating" ref="ratings">
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
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingelect @ratingType="ratingType"
                   @toggleContent = "toggleContent"
                   :selectType="selectType"
                   :onlyContent="onlyContent"
                   :desc="desc"
                   :ratings="ratings"></ratingelect>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item border-1px"
              v-for="rating in ratings"
              v-show="needShow(rating.rateType, rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" alt="" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length > 0">
                <span class="icon-thumb_up"></span>
                <span class="item border-1px" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue';
  import split from '../split/split.vue';
  import ratingelect from '../ratingselect/ratingselect.vue';
  import axios from 'axios';
  import BScroll from 'better-scroll';
  import {formatDate} from '../../common/js/date';

  const ALL = 2;
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      };
    },
    created () {
      axios.get('/api/ratings').then((response) => {
        if (response.data.errno === ERR_OK) {
          this.ratings = response.data.data;
          this.$nextTick(() => { // dom发生真正变化是在nextTick之后，而不是数据改变之后
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.ratings, {
                click: true
              });
            }
          });
        }
      });
    },
    methods: {
      ratingType (type) { // 监听子组件评价类型选择
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent () { // 监听子组件是否展示无内容评价
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    components: {
      star,
      split,
      ratingelect
    },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  @import "../../common/stylus/base.styl";
  .rating
    &.view
      position: absolute
      top: 168px
      bottom: 0
      left: 0
      overflow: hidden
      width: 100%
    .rating-content
      min-height: 100%
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        padding: 8px 0
        flex: 0 0 137px
        width: 137px
        text-align: center
        border-right: 1px solid rgba(7,17,27,0.1)
        @media only screen and (max-width: 320px)
          flex: 0 0 110px
          width: 110px
        .score
          margin-bottom: 8px
          line-height: 28px
          font-size: 24px
          color: rgb(255,153,0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7,17,27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147,153,159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 14px
        .score-wrapper
          margin-bottom: 8px
          line-height: 18px
          font-size: 0
          .score
            line-height: 18px
            font-size: 12px
            color: #f90
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
        .delivery-wrapper
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7,17,27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(7,17,27)
    .rating-wrapper
      padding:0 18px
      .rating-item
        display: flex
        padding: 18px 0
        border-1px(rgba(7,17,27,.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right:12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7,17,27)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: rgb(7,17,27)
          .text
            margin-bottom: 8px
            line-height: 18px
            font-size: 12px
            color: rgb(7,17,27)
          .recommend
            line-height: 16px
            font-size: 0
            .icon-thumb_up,.item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb_up
              color: rgb(0,160,220)
            .item
              padding: 0 6px
              border: 1px solid rgba(7,17,27,0.1)
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            color: rgba(7,17,27,.4)

</style>
