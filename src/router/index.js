import Vue from 'vue'
import VueRouter from 'vue-router'

import store from "./../store/index";

import HomeMain from "./../components/home/main.vue";
import AdminLogin from "./../components/admin/login.vue";

//引入用户的组件
import UserMain  from "./../components/user/main.vue";
import UserList  from "./../components/user/list.vue";
import UserAdd  from "./../components/user/add.vue";
import UserModify  from "./../components/user/modify.vue";
import UserView  from "./../components/user/view.vue";

import GoodsMain  from "./../components/goods/main.vue";
import GoodsList  from "./../components/goods/list.vue";
import GoodsAdd  from "./../components/goods/add.vue";
import GoodsModify  from "./../components/goods/modify.vue";
import GoodsView  from "./../components/goods/view.vue";
import CartMain from "./../components/cart/main.vue";
import CartList from "./../components/cart/list.vue";
import ItemInfo  from "./../components/goods/item.vue";
import ItemAdd  from "./../components/goods/additem.vue";
import ItemModify  from "./../components/goods/modifyitem.vue";
import GoodsIndex from "./../components/goods/index.vue";




Vue.use(VueRouter)

  const routes = [
  
	{path:"/",name:"homemain",component:HomeMain},
	{path:"/login",name:"login",component:AdminLogin},
	{path:"/user",name:"usermain", component:UserMain,children:[
		{path:"list",name:"userlist",component:UserList},
		{path:"add",name:"useradd",component:UserAdd},
		{path:"modify/:no",name:"usermodify",component:UserModify},
		{path:"view/:no",name:"userview",component:UserView,props:true},
		{path:"", redirect: "list" }
	]},
	{path:"/goods",name:"goodsmain", component:GoodsMain,children:[
		{path:"list",name:"goodslist",component:GoodsList},
		{path:"add",name:"goodsadd",component:GoodsAdd},
		{path:"additem",name:"itemadd",component:ItemAdd},
		{path:"item",name:"iteminfo",component:ItemInfo},
		{path:"index",name:"goodsindex",component:GoodsIndex},
		{path:"modify/:id",name:"goodsmodify",component:GoodsModify},
		{path:"modifyitem/:id",name:"itemmodify",component:ItemModify},
		{path:"view/:id",name:"goodsview",component:GoodsView,props:true},
		{path:"", redirect: "index" }
	]},
	{path:"/cart",name:"cartmain", component:CartMain,children:[
		{path:"list",name:"cartlist",component:CartList},
		{path:"", redirect: "list" },
		{path:"", redirect: "index" }
	]}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:routes
})

router.beforeEach((to,from, next) => {
	if(to.path=="/login"){
		next();
	}
	else{
		 if(store.getters.loginuser!=null){
			 next();
		 }
		 else{
			 next("/login");
		 }
	}
})

export default router
