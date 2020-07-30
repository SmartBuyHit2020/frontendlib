<template>
	<div class="box">
		<div class="box-header with-border">
		  <h3 class="box-title">购物车</h3>	          
		</div>
		<div class="box-body">
			<table class="table table-bordered">
			  <thead>
				<tr>
				  <th scope="col">商品名称</th>
				  <th scope="col">价格</th>
				  <th scope="col">数量</th>
				</tr>
			  </thead>
			  <tbody>
				<tr v-for="cart in cartList" v-bind:key="cart.name">
				  <td>{{cart.name}}</td>
				  <td>{{cart.price}}</td>
				   <td>
				   <a href="#" v-on:click="minusNum(cart.num,cart.pid)"  class="btn btn-default">-</a>
				   {{cart.num}}</td>
				   <a href="#" v-on:click="addNum(cart.num,cart.pid)"  class="btn btn-default">+</a>
					<td>
					  <a href="#" v-on:click="deleteGoods(cart.uid,cart.pid)"  class="btn btn-danger">删除</a> 
					</td>
				</tr>
			  </tbody>
			</table>
		</div>
		<a href="#" v-on:click="pay" class="btn btn-default">付款</a>
		
	</div>
</template>

<script>
	//import axios from "axios";
	export default {
		name:"CartList",
		data(){
			return {
				cartList:[],
				order:{
					id: '',
					detailsid: '',
					name: '',
					price: '',
					num: ''
				}
			};
		},
		created(){ //当前组件的生命周期方法，组件创建后
			this.getList();
		},
		methods:{
			getList(){
				this.axiosJSON.get("/carts/list",{
					params:{
						uid:0
					}
				}).then(result=>{
					this.cartList=result.data.list;
				});
			},
			deleteGoods(uid,pid){
				let checkresult=confirm("您确认要删除此商品么");
				if(checkresult){
					this.axiosJSON.get("/carts/delete",{
					params:{
						uid:uid,
						pid:pid
						
					}
					}).then(result=>{
						alert(result.data.message);
						if(result.data.status=="OK"){
							this.getList();
						}
					});
				}
				
				
			},
			cleanGoods(uid){
				let checkresult=confirm("您确认要提交购物车么");
				if(checkresult){
					this.axiosJSON.get("/carts/clean",{
					params:{
						uid:uid,
						
					}
					}).then(result=>{
						alert(result.data.message);
						if(result.data.status=="OK"){
							this.$router.push("/goods/list");
						}
					});
				}
				
				
			},
			addNum(amount,pid){
				this.axiosJSON.get("/carts/add",{
					params:{
						amount:amount+1,
						pid:pid
						
					}
					}).then(result=>{
						//alert(result.data.message);
						if(result.data.status=="OK"){
							this.getList();
						}
					});
			},
			minusNum(amount,pid){
				this.axiosJSON.get("/carts/add",{
					params:{
						amount:amount-1,
						pid:pid
						
					}
					}).then(result=>{
						//alert(result.data.message);
						if(result.data.status=="OK"){
							this.getList();
						}
					});
			},
			pay(){
				/*for (var i=0;i<=this.cartList.length;i++) {
					this.order.id=this.cartList[i].pid;
						this.order.name=this.cartList[i].name;
						this.order.price=this.cartlist[i].price,
						this.order.num=this.cartList[i].num;
					this.axiosJSON.post("/order/add",this.order);
				}*/
				this.cleanGoods(this.cartList[0].uid);
			}
				
				
	}
}
</script>

<style>
	
</style>