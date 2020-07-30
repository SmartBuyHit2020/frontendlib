<template>
	<div>
		<div class="details">
			<ul v-for="details in detailsList" v-bind:key="details.id">
			    <li> 
				 <a href="#"  >{{details.name}}</a>
				</li>
			  			
					
			</ul>
		</div>
		
		<router-link to="/goods/list" class="btn btn-default">返回</router-link>
	</div>
</template>

<script>
	export default {
		name: "DetailsInfo",
		data() {
			return {
				detailsList:[],
				detailsname:'食品',
				details: {
					id: '',
				
					name: '',
					
				}
			}
		},
		created(){ //当前组件的生命周期方法，组件创建后
		
			this.getDetailsList();
		},
		methods:{
			getDetailsList(){
				this.axiosJSON.get("/details/list/all"
				).then(result=>{
					this.detailsList=result.data.list;
					console.log(this.detailsList);
				});
				console.log(this.detailsList);
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
	.details{
		background-color: #55ffff;
	}
</style>
