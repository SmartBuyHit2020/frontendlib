<!--<template>
	<div class="content">
		<ul><img v-bind:src="order.imageurl"/></ul>
		<ul class="info">
			<li>：{{order.name}}</li>
			<li>价格：{{order.price}}￥</li>
			<li>剩余数量：{{order.num}}</li>
			<li class="add"><a href="#" v-on:click="addToCar"  >加入购物车</a></li> 
			<li class="err"><router-link to="/order/list" class="btn btn-error">返回</router-link></li>
		</ul>
	</div>
</template>
<script>
	export default {
		name:"OrderView",
		data(){
			return {
				order: {
					id: '',
					detailsid: '',
					name: '',
					imageurl: '',
					price: '',
					num: ''
				}
			}
		},
		created(){ //组件的创建生命周期函数
			let orderNo=this.$route.params.id;
			this.getOrder(orderNo);
		},
		methods:{
			getOrder(no){
				this.axiosJSON.get("/order/get?id="+no).then(result=>{
					this.order=result.data.result;
				});
			},
			addToCar(){
				console.log(this.order.id);
					this.axiosJSON.get("/carts/add/",{
					params:{
						pid:this.order.id,
						amount:1,
					}
				}).then(result=>{
						alert(result.data.message);
						/*if(result.data.status=="OK"){
							this.getList();
						}*/
					});
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
	.add{
		width: 20;
		height: 20;
		//background-color: #00A4FF;
		color: #FFFFFF;
	}
	.err{
		width: 20;
		height: 20;
		font-weight: 600;
		font-size: 20px;
		color: #FFFFFF;
	}
</style>
