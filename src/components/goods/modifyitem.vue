<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">修改商品类型</h3>
		</div>
		<div class="box-body">
			<form method="post" v-on:submit.prevent="modify()">
				
				<div class="form-group">
					<label for="exampleInputName1">商品类型名称</label>
					<input type="text" class="form-control" v-model="item.name" required>
				</div>
				
	
				<button type="submit" class="btn btn-primary">提交</button>
				<router-link to="/goods/item" class="btn btn-default">取消</router-link>
			</form>
		</div>
		<!-- /.box-body -->
		
		
	</div>
</template>

<script>
	export default {
		name: "ItemModify",
		data() {
			return {
				itemList:[],
				itemname:'食品',
				item:{
					id:'',
					name:'',
				}
			}
		},
		created() { //组件的创建生命周期函数
			let itemNo = this.$route.params.id;
			
			
			this.getItem(itemNo)
			//this.getItemName(this.goods.itemid);
		
		},
		methods:{
			getItem(no) {
			
				this.axiosJSON.get("/item/get?id=" + no).then(result => {
					this.item = result.data.result;
					
				});
			},
			modify() {
				console.log(this.item);
				this.axiosJSON.post("/item/modify", this.item).then(result => {
					if (result.data.status == "OK") {
						alert(result.data.message);
						this.$router.push("/goods/item"); //编程方式跳转到部门列表组件
					} else {
						alert(result.data.message);
					}
				});
			}
		}
		}
</script>

<style>
</style>
