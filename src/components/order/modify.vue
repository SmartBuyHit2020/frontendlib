<!--<template>
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
						  <ul v-for="details in detailsList" v-bind:key="details.id">
						      <li> 
						  	 <a href="#" v-on:click="setOrderDetailsid(details.id)"  >{{details.name}}</a>
						  	</li>
						    			
						  		
						  </ul>
					   
					  </div>
					</div>
	
					
					<input type="text" class="form-control" v-model="detailsname" required>
					
					<small id="emailHelp" class="form-text text-muted"></small>
				</div>
				<div class="form-group">
					<label for="exampleInputName1">商品名称</label>
					<input type="text" class="form-control" v-model="order.name" required>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">商品价格</label>
					<input type="text" class="form-control" v-model="order.price" required>
				</div>
				<div class="form-group">
					<label for="exampleInputSex1">商品的数量</label>
					<input type="text" class="form-control" v-model="order.num" required>
				</div>
				<div class="form-group">
					<label for="exampleInputAge1">商品图片(url)</label>
					<input type="text" class="form-control" v-model="order.imageurl" required>
				</div>
	
				<button type="submit" class="btn btn-primary">提交</button>
				<router-link to="/order/list" class="btn btn-default">取消</router-link>
			</form>
		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "OrderModify",
		data() {
			return {
				detailsList:[],
				detailsname:'食品',
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
		created() { //组件的创建生命周期函数
			let orderNo = this.$route.params.id;
			
			this.getDetailsList();
			this.getOrder(orderNo);
			//this.getDetailsName(this.order.detailsid);
		
		},
		methods: {
			getOrder(no) {
	
				this.axiosJSON.get("/order/get?id=" + no).then(result => {
					this.order = result.data.result;
					
				});
			},
			getDetailsList(){
				this.axiosJSON.get("/details/list/all"
				).then(result=>{
					this.detailsList=result.data.list;
					//console.log(this.detailsList);
				});
			},
				
			setOrderDetailsid( id){
				this.order.detailsid=id;
				this.getDetailsName(id);
			},
			getDetailsName(id){
				for (var i=0;i<=this.detailsList.length;i++) {
					console.log(this.detailsList);
					if(this.detailsList[i].id==id)
					this.detailsname=this.detailsList[i].name;
				}
				
			},
			modify() {
				console.log(this.order);
				this.axiosJSON.post("/order/modify", this.order).then(result => {
					if (result.data.status == "OK") {
						alert(result.data.message);
						this.$router.push("/order/list"); //编程方式跳转到部门列表组件
					} else {
						alert(result.data.message);
					}
				});
			}
		}
	}
</script>

<style>
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
