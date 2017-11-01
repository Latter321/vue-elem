import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const Goods = (resolve) => {
  import('../components/goods/goods').then((module) => {
    resolve(module);
  });
};

const Ratings = (resolve) => {
  import('../components/rating/rating').then((module) => {
    resolve(module);
  });
};

const Seller = (resolve) => {
  import('../components/seller/seller').then((module) => {
    resolve(module);
  });
};

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    }, {
      path: '/goods',
      component: Goods
    }, {
      path: '/rating',
      component: Ratings
    }, {
      path: '/seller',
      component: Seller
    }
  ]
});
