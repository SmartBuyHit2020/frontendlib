<template>
	<div>
		<div class="item">
			<ul v-for="item in itemList" v-bind:key="item.id">
			    <li> 
				 <a href="#"  >{{item.name}}</a>
				</li>
			  			
					
			</ul>
		</div>
		
		<router-link to="/goods/list" class="btn btn-default">返回</router-link>
	</div>
	
</template>

<script>
	//import axios from "axios";
	export default {
		name: "ItemInfo",
		data() {
			return {
				itemList:[],
				itemname:'食品',
				item: {
					id: '',
				
					name: '',
					
				}
			}
		},
		created(){ //当前组件的生命周期方法，组件创建后
		
			this.getItemList();
		},
		methods:{
			getItemList(){
				this.axiosJSON.get("/item/list/all"
				).then(result=>{
					this.itemList=result.data.list;
					console.log(this.itemList);
				});
				console.log(this.itemList);
			},
			
			add(){
				this.axiosJSON.post("/goods/add",this.goods).then(result=>{
					if(result.data.status=="OK"){
						alert(result.data.message);
						this.$router.push("/goods/list"); //编程方式跳转到部门列表组件
					}
					else{
						alert(result.data.message);
					}
				});
			}
		}
	
	
	}
</script>

<style>
		
	.item{
		background-color: #55ffff;
	}
</style>
