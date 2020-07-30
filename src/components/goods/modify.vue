<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">修改商品</h3>
		</div>
		<div class="box-body">
			<form method="post" v-on:submit.prevent="add()">
				<div class="form-group">

					<label for="exampleInputId1">商品分类</label>
					<input type="text" class="form-control" v-model="goods.itemid" required>
					<small id="emailHelp" class="form-text text-muted"></small>
				</div>
				<div class="form-group">
					<label for="exampleInputName1">商品名称</label>
					<input type="text" class="form-control" v-model="goods.name" required>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">商品价格</label>
					<input type="text" class="form-control" v-model="goods.price" required>
				</div>
				<div class="form-group">
					<label for="exampleInputSex1">商品的数量</label>
					<input type="text" class="form-control" v-model="goods.num" required>
				</div>
				<div class="form-group">
					<label for="exampleInputAge1">商品图片(url)</label>
					<input type="text" class="form-control" v-model="goods.imagurl" required>
				</div>

				<button type="submit" class="btn btn-primary">提交</button>
				<router-link to="/goods/list" class="btn btn-default">取消</router-link>
			</form>
		</div>
		<!-- /.box-body -->
		
		
	</div>
	
</template>

<script>
	export default {
		name: "GoodsModify",
		data() {
			return {
				goods: {
					id: '',
					itemid: '',
					name: '',
					imagurl: '',
					price: '',
					num: ''

				}
			}
		},
		created() { //组件的创建生命周期函数
			let goodsNo = this.$route.params.id;
			this.getGoods(goodsNo);

		},
		methods: {
			getGoods(no) {

				this.axiosJSON.get("/goods/get?id=" + no).then(result => {
					this.goods = result.data.result;
				});
			},
			modify() {
				this.axiosJSON.post("/goods/modify", this.goods).then(result => {
					if (result.data.status == "OK") {
						alert(result.data.message);
						this.$router.push("/goods/list"); //编程方式跳转到部门列表组件
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
