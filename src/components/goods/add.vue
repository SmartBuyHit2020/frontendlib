<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">增加商品</h3>
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
	<!-- /.box -->
</template>

<script>
	import axios from "axios";
	export default {
		name: "GoodsAdd",
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
			};
		},
	},
	methods: {
		add() {
			axios.post("http://localhost:8080/goods/add", this.goods).then(result => {
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
