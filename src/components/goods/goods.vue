<template>
  <div>
    <div class="goods">
      <!--左侧列表 start-->
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item"
              v-for="(item, index) in goods"
              :class="{'current' : currentIndex === index}"
              @click="selectMenu(index, $event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
          </li>
        </ul>
      </div>
      <!--左侧列表 end-->
      <!--右侧列表 start-->
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <!--food-list-hook 表明是被js选择的样式（编程习惯）-->
          <li class="food-list food-list-hook"
              v-for="item in goods">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li class="food-item border-1px" v-for="food in item.foods" @click="selectFood(food,$event)">
                <div class="icon">
                  <img :src="food.icon" alt="" width="57" height="57">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <!--控制商品数量组件-->
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food" @cartAdd="_drop"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!--右侧列表 end-->
      <shopcart
        ref="shopcart"
        :delivery-price="seller.deliveryPrice"
        :min-price="seller.minPrice"
        :select-foods="selectFoods"></shopcart>
    </div>
    <!--food组件，详情页-->
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import food from '../food/food.vue';

  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [], // 每个区间的高度
        scrollY: 0,
        selectedFood: {}
      };
    },
    components: {
      shopcart,
      cartcontrol,
      food
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      axios.get('/api/goods').then((response) => {
        if (response.data.errno === ERR_OK) {
          this.goods = response.data.data;
          this.$nextTick(() => { // dom发生真正变化是在nextTick之后，而不是数据改变之后
            this._initScroll();// 必须等dom都渲染结束才能初始化bscroll，因为要计算高度
            this._calculateHeight();
          });
        }
      });
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods () { // 联动cartcontrol和shopcart组件
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food); // 找到所有被选择的food
            }
          });
        });
        return foods;
      }
    },
    methods: {
      selectFood (food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      },
      _initScroll () { // 初始化bscroll
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true // 避免因bscroll阻止了默认自带的click事件
        });
        this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3 // 希望scroll在滚动时能告诉实时高度，探针效果
        });
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y)); // Math.round(pos.y) 取整数  Math.abs(Math.round(pos.y)) 取正数
        });
      },
      _calculateHeight () {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook'); // 取区间
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]; // 区间
          height += item.clientHeight; // 拿到每一个区间的高度然后进行累加
          this.listHeight.push(height);
        }
      },
      selectMenu (index, event) { // 左侧列表选择
        if (!event._constructed) { // 只认bscroll派发的事件
          return;
        }
        // 通过左侧选择，让右侧滚动到对应的内容
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodScroll.scrollToElement(el, 300);
      },
      _drop (target) {
        this.$refs.shopcart.drop(target);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .goods
    display: flex
    position: absolute
    top: 168px
    bottom: 46px
    overflow: hidden
    width: 100%
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background-color: #f3f5f7
      .menu-item
        display: table
        padding: 0 12px
        width: 56px
        height: 54px
        line-height: 14px
        &.current
          position: relative
          margin-top: -1px
          background-color: #fff
          z-index: 10
          .text
            font-weight: 700
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          margin-right: 2px
          width: 12px
          height: 12px
          background-size: 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('./images/decrease_3')
          &.discount
            bg-image('./images/discount_3')
          &.guarantee
            bg-image('./images/guarantee_3')
          &.invoice
            bg-image('./images/invoice_3')
          &.special
            bg-image('./images/special_3')
        .text
          display: table-cell
          vertical-align: middle
          width: 56px
          border-1px(rgba(7, 17, 27, .1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background-color: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, .1))
        &:last-child
          margin-bottom: 0
          border-none()
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            margin-bottom: 8px
            line-height: 12px
          .extra
            .count
              margin-right: 12px
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
            bottom: 0
            right: 0
</style>
