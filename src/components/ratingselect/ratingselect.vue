<template>
    <div class="rating-select">
      <div class="rating-type">
        <span class="block positive"
              @click="select(2,$event)"
              :class="{active:selectType===2}">
          {{desc.all}} <span class="count">{{ratings.length}}</span>
        </span>
        <span class="block positive"
              @click="select(0,$event)"
              :class="{active:selectType===0}">{{desc.positive}}
        <span class="count">47</span></span>
        <span class="block negative"
              @click="select(1,$event)"
              :class="{active:selectType===1}">{{desc.negative}}
        <span class="count">47</span></span>
      </div>
      <div class="switch"
           :class="{on:onlyContent}"
           @click="toggleContent($event)">
        <span class="icon-check_circle"></span>
        <span class="text">只看有内容的评价</span>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
//  const POSITIVE = 0;
//  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    methods: {
      select (type, e) {
        if (!e._constructed) {
          return;
        }
        this.selectType = type;
        this.$emit('ratingType', type); // 把值传出去，父组件就会监听发生实时改变
      },
      toggleContent (e) {
        if (!e._constructed) {
          return;
        }
        this.onlyContent = !this.onlyContent;
        this.$emit('toggleContent', this.onlyContent);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .rating-select
    color: #333
    .rating-type
      padding:18px 0
      margin: 0 18px
      font-size: 0
      border-1px(rgba(7,17,27,.1))
      .block
        display: inline-block
        margin-right: 8px
        padding: 8px 12px
        border-radius: 1px
        font-size: 12px
        color: rgb(77,85,93)
        &.active
          color: #fff
        .count
          margin-left: 2px
          line-height: 16px
          font-size: 8px
        &.positive
          background-color: rgba(0,160,220,.2)
          &.active
            background-color: rgb(0,160,220)
        &.negative
          background-color: rgba(77,85,93,.2)
          &.active
            background-color: rgb(77,85,93)
    .switch
      padding:12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7,17,27,.1)
      font-size: 0
      color: rgb(147,153,159)
      &.on .icon-check_circle
        color: #00c850
      .icon-check_circle
        display: inline-block
        margin-right: 4px
        vertical-align: top
        font-size: 24px
      .text
        vertical-align: top
        font-size: 12px


</style>
