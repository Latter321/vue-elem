<template>
    <div class="cartcontrol">
      <transition name="move">
        <div class="cart-decrease"
             v-show="food.count>0"
             @click="decreaseCart($event)">
          <span class="inner icon-remove_circle_outline"></span>
        </div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click="addCart($event)"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (event) {
        if (!event._constructed) return; // 若不控制是bscroll派发的点击事件，那么会在pc端触发两次click事件
//        console.log('222');// bscrool影响，会无法点击，在foodWrapper设置click为true
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);// 当需要给原有对象增加或者删除属性时，需要用Vue的set方法，其后才会响应
        } else {
          this.food.count++;
        }

        this.$emit('cartAdd', event.target);
      },
      decreaseCart (event) {
        if (!event._constructed) return;
        if (this.food.count > 0) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease,.cart-add
      display: inline-block
      padding: 6px
      .inner
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
    .cart-decrease
      opacity: 1
      transform: translate3D(0, 0, 0)
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        transition: all 0.4s linear
        transform: rotate(0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
      &.move-enter, &.move-leave-to
        opacity:0
        transform: translate3D(24px, 0, 0)
        .inner
          transform:rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      padding-top: 6px
      width: 12px
      line-height: 24px
      font-size: 10px
      color: rgb(0, 153, 159)
    .cart-add
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)


</style>
