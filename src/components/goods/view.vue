<template>
	<!-- Default box -->
	<div class="content">
		<ul><img v-bind:src="goods.imageurl"  /></ul>
		<ul class="info">
			
			<li>商品名称：{{goods.name}}</li>
			<li>价格：{{goods.price}}￥</li>
			<li>剩余数量：{{goods.num}}</li>
			<router-link to="/goods/add" class="label label-warning">加入购物车</router-link>
		</ul>
		
		
		
		
	</div>
</template>

<script>
	export default {
		name:"GoodsView",
		data(){
			return {
				goods: {
					id: '',
					itemid: '',
					name: '',
					imageurl: '',
					price: '',
					num: ''
			
				}
			}
		},
		created(){ //组件的创建生命周期函数
			let goodsNo=this.$route.params.id;
			this.getGoods(goodsNo);
		},
		methods:{
			getGoods(no){
				
				this.axiosJSON.get("/goods/get?id="+no).then(result=>{
					this.goods=result.data.result;
				});
			},
				
			addToCar(){
				
			}
			
		}
		}
</script>

<style>
	.content{

	}
		
	.content ul{
		float: left;
	}
	.info{
		 margin: 50px 20px 20px 25px;
		   
		    font-weight: 600;
		    font-size: 20px;
			
			
	}
	.info li{
		 margin: 20px 20px 20px 25px;
	}
	
	
</style>
