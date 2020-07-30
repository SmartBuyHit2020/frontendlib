<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">修改商品</h3>
		</div>
		<div class="box-body">
			<form method="post" v-on:submit.prevent="modify()">
				<div class="form-group">
					
					
					
					<div class="dropdown">
					  <button class="dropbtn">商品分类</button>
					  <div class="dropdown-content">
						  <ul v-for="item in itemList" v-bind:key="item.id">
						      <li> 
						  	 <a href="#" v-on:click="setGoodsItemid(item.id)"  >{{item.name}}</a>
						  	</li>
						    			
						  		
						  </ul>
					   
					  </div>
					</div>

					
					<input type="text" class="form-control" v-model="itemname" required>
					
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
					<input type="text" class="form-control" v-model="goods.imageurl" required>
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
				itemList:[],
				itemname:'食品',
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
		created() { //组件的创建生命周期函数
			let goodsNo = this.$route.params.id;
			
			this.getItemList();
			this.getGoods(goodsNo);
			//this.getItemName(this.goods.itemid);
		
		},
		methods: {
			getGoods(no) {

				this.axiosJSON.get("/goods/get?id=" + no).then(result => {
					this.goods = result.data.result;
					
				});
			},
			getItemList(){
				this.axiosJSON.get("/item/list/all"
				).then(result=>{
					this.itemList=result.data.list;
					//console.log(this.itemList);
				});
			},
				
			setGoodsItemid( id){
				this.goods.itemid=id;
				this.getItemName(id);
			},
			getItemName(id){
				for (var i=0;i<=this.itemList.length;i++) {
					console.log(this.itemList);
					if(this.itemList[i].id==id)
					this.itemname=this.itemList[i].name;
				}
				
			},
			modify() {
				console.log(this.goods);
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
	/* 下拉按钮样式 */
	.dropbtn {
	    background-color: #81a3ff;
	    color: white;
	    padding: 16px;
	    font-size: 16px;
	    border: none;
	    cursor: pointer;
	}
	
	/* 容器 <div> - 需要定位下拉内容 */
	.dropdown {
	    position: relative;
	    display: inline-block;
	}
	
	/* 下拉内容 (默认隐藏) */
	.dropdown-content {
	    display: none;
	    position: absolute;
	    background-color: #f9f9f9;
	    min-width: 160px;
	    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
	}
	
	/* 下拉菜单的链接 */
	.dropdown-content a {
	    color: black;
	    padding: 12px 16px;
	    text-decoration: none;
	    display: block;
	}
	
	/* 鼠标移上去后修改下拉菜单链接颜色 */
	.dropdown-content a:hover {background-color: #f1f1f1}
	
	/* 在鼠标移上去后显示下拉菜单 */
	.dropdown:hover .dropdown-content {
	    display: block;
	}
	
	/* 当下拉内容显示后修改下拉按钮的背景颜色 */
	.dropdown:hover .dropbtn {
	    background-color: #10ffec;
	}
</style>
