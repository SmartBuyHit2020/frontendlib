<template>
	<div class="box">
		<div class="goods w">
		        
				<ul>
					<a href="#" v-on:click="getList"  >全部商品</a>
				</ul>
		        <ul v-for="item in itemList" v-bind:key="item.id">
		            <li> 
					 <a href="#" v-on:click="selectByItemId(item.id)"  >{{item.name}}</a>
					</li>
		          			
		
		        </ul>
		        <a href="#" class="mod">修改分类</a>
		    </div>
		<div class="box-header with-border">
		  <h3 class="box-title">商品管理</h3>	          
		</div>
		<div class="box-body">
			<table class="table table-bordered">
			  <thead>
				<tr>
				  <th scope="col">编号</th>
				  <th scope="col">商品名称</th>
				  <th scope="col">价格</th>
				  <th scope="col">库存</th>
				  <th scope="col">操作</th>
				</tr>
			  </thead>
			  <tbody>
				<tr v-for="goods in goodsList" v-bind:key="goods.id">
				  <td>{{goods.id}}</td>
				  <td>{{goods.name}}</td>
				  <td>{{goods.price}}</td>
				   <td>{{goods.num}}</td>
					<td>
					  <router-link v-bind:to="'/goods/view/'+goods.id" class="btn btn-default">查看详细信息</router-link>
					  <a href="#" v-on:click="deleteGoods(goods.id)"  class="btn btn-danger">删除</a> 
					   <router-link v-bind:to="'/goods/modify/'+goods.id" class="btn btn-info">修改</router-link>
					</td>
				</tr>
			  </tbody>
			</table>
		</div>
		<!-- /.box-body -->
		<router-link to="/goods/add" class="btn btn-default">增加商品</router-link>
		<nav >
		  <ul class="pager">
		    <li><a href="#"  v-on:click="dowmPage">上一页</a></li>
			<span class="label label-info">{{page}}</span>
		    <li><a href="#"  v-on:click="uppPage">下一页</a></li>
			<li><a>总页数 {{pageCount}}</a></li>
			<li><a>跳转到</a></li>
			<li></li>
			
		  </ul>
		</nav>
	</div>
</template>

<script>
	//import axios from "axios";
	export default {
		name:"GoodsList",
		data(){
			return {
				goodsList:[],
				itemList:[],
				page:1,
				rows:10,
				count:0,
				pageCount:0
			};
		},
		created(){ //当前组件的生命周期方法，组件创建后
			this.getList();
			this.getItemList();
		},
		methods:{
			getList(){
				this.axiosJSON.get("/goods/list/all/page",{
					params:{
						rows:this.rows,
						page:this.page
					}
				}).then(result=>{
					this.goodsList=result.data.list;
					this.count=result.data.count;
					this.pageCount=result.data.pageCount;
				});
			},
			getItemList(){
				this.axiosJSON.get("/item/list/all"
				).then(result=>{
					this.itemList=result.data.list;
					
				});
			},
			deleteGoods(id){
				let checkresult=confirm("您确认要删除此商品么");
				if(checkresult){
					this.axiosJSON.get("/goods/delete/",{
					params:{
						id:id
						
					}
				}).then(result=>{
						alert(result.data.message);
						if(result.data.status=="OK"){
							this.getList();
						}
					});
				}
				
				
			},
			selectByItemId(id){
				///list/all/itemid
				this.axiosJSON.get("/goods/list/all/itemid",{
					params:{
						itemid:id
						
					}
				}).then(result=>{
						
						if(result.data.status=="OK"){
							this.goodsList=result.data.list;
						}
					});
			},
			uppPage(){
				if(this.page<this.pageCount){
					this.page++;
				}
				
				this.getList();
			
			},
			dowmPage(){
				if(this.page>1){
					this.page--;
				}
				
				this.getList();
			
			}
		}
	}
</script>

<style>
	.goods{
	    margin-top: 10px;
	    height: 60px;
	    background-color: #fff;
	    box-shadow: 0 1px 3px 3px rgba(0, 0, 0, 0.1);
	    line-height: 60px;
	}
	.goods h3{
	    float: left;
	   
	    padding: 0 30px;
	    color: #00a4ff;
	    font-size: 16px;
	}
	.goods ul{
	
	    float: left;
	}
	.goods ul li{
	    float: left;
	}
	.goods ul li a{
	    padding: 0 30px;
	    font-size: 16px;
	    color: #050505;
	    border-left: 1px solid #ccc;
	}
	.goods ul li a:hover{
	    color:#00a4ff ;
	}
	.goods .mod{
	    float: right;
	    margin-right: 30px;
	    color: #00a4ff;
	    font-size: 14px;
	}
	.box-content ul{
    width: 1225px;
}
.box-content ul li{
    position: relative;
    float: left;
    width: 230px;
    height: 270px;
    background-color: #fff;
    margin-right: 15px;
    margin-bottom: 15px;
}
.box-content ul li > img{
    width: 100%;
}
.box-content ul li em{
    position: absolute;
    right: -4px;
    top: 4px;
}

.box-content ul li h4{
    margin: 20px 20px 20px 25px;
    font-weight: normal;
    font-size: 14px;
}
.box-content .info{
    margin: 0 20px 0 25px;
    font-size: 12px;
    color: #999;
}
.box-content .info span{
    color: #ff7c2d;
}
</style>
