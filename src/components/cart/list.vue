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
				   <td>{{cart.num}}</td>
					<td>
					  <a href="#" v-on:click="deleteGoods(cart)"  class="btn btn-danger">删除</a> 
					</td>
				</tr>
			  </tbody>
			</table>
		</div>
	</div>
</template>

<script>
	//import axios from "axios";
	export default {
		name:"CartList",
		data(){
			return {
				cartList:[]
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
			deleteGoods(cart){
				let checkresult=confirm("您确认要删除此商品么");
				if(checkresult){
					this.axiosJSON.post("/carts/delete", cart).then(result => {
						if (result.data.status == "OK") {
							alert(result.data.message);
							this.$router.push("/cart/list"); //编程方式跳转到列表组件
						} else {
							alert(result.data.message);
						}
					});
				}
				
				
			}
			
		}
	}
</script>

<style>
	
</style>