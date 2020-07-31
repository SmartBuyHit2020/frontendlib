<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">增加商品分类</h3>
		</div>
		<div class="box-body">
			<form method="post" v-on:submit.prevent="add()">
				
				<div class="form-group">
					<label for="exampleInputName1">商品分类名称</label>
					<input type="text" class="form-control" v-model="item.name" required>
				</div>
				
	
				<button type="submit" class="btn btn-primary">提交</button>
				<router-link to="/goods/itemt" class="btn btn-default">取消</router-link>
			</form>
		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "ItemAdd",
		data() {
			return {
				itemList:[],
				item:{
					id:'',
					name:'',
				},
				itemname:'食品',
				
			};
			},
			methods:{
					add(){
						this.axiosJSON.post("/item/add",this.item).then(result=>{
							if(result.data.status=="OK"){
								alert(result.data.message);
								this.$router.push("/goods/item"); //编程方式跳转到部门列表组件
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
	
</style>
