<template>
	<div class="box">
		<div class="order w">
				<ul>
					<a href="#" v-on:click="getList"  >全部订单</a>
				</ul>
		        <ul v-for="details in detailsList" v-bind:key="details.id">
		            <li> 
					 <a href="#" v-on:click="selectByDetailsId(details.id)"  >{{details.name}}</a>
					</li>
		        </ul>
		    </div>
		<div class="box-header with-border">
		  <h3 class="box-title">订单管理</h3>	          
		</div>
		<div class="box-body">
			<table class="table table-bordered">
			  <thead>
				<tr>
				  <th scope="col">订单编号</th>
				  <th scope="col">商品总数</th>
				  <th scope="col">总金额</th>
				  <th scope="col">交易时间</th>
				  <th scope="col">用户</th>
				</tr>
			  </thead>
			  <tbody>
				<tr v-for="order in orderList" v-bind:key="order.id">
				  <td>{{order.id}}</td>
				  <td>{{order.name}}</td>
				  <td>{{order.price}}</td>
				   <td>{{order.num}}</td>
					<td>
					  <router-link v-bind:to="'/order/view/'+order.id" class="btn btn-default">查看详细信息</router-link>
					  <a href="#" v-on:click="deleteOrder(order.id)"  class="btn btn-danger">删除</a> 
					   <router-link v-bind:to="'/order/modify/'+order.id" class="btn btn-info">修改</router-link>
					</td>
				</tr>
			  </tbody>
			</table>
		</div>
		<!-- /.box-body -->
		<router-link to="/order/add" class="btn btn-default">增加订单</router-link>
		<nav class="page">
		  <ul class="pager">
		    <li><a href="#"  v-on:click="dowmPage">上一页</a></li>
			<span class="label label-info">{{page}}</span>
		    <li><a href="#"  v-on:click="uppPage">下一页</a></li>
			<li><a>总页数 {{pageCount}}</a></li>
			<li><a>跳转到</a></li>
			<li></li>
			 <router-link to="/order/index" class="btn btn-warning">返回订单首页</router-link>
		  </ul>
		  
		</nav>
	</div>
</template>

<script>
	export default {
		name:"OrderList",
		data(){
			return {
				orderList:[],
				detailsList:[],
				page:1,
				rows:10,
				count:0,
				pageCount:0
			};
		},
		created(){ //当前组件的生命周期方法，组件创建后
			this.getList();
			this.getDetailsList();
		},
		methods:{
			getList(){
				this.axiosJSON.get("/order/list/all/page",{
					params:{
						rows:this.rows,
						page:this.page
					}
				}).then(result=>{
					this.orderList=result.data.list;
					this.count=result.data.count;
					this.pageCount=result.data.pageCount;
				});
			},
			getDetailsList(){
				this.axiosJSON.get("/details/list/all"
				).then(result=>{
					this.detailsList=result.data.list;
					
				});
			},
			deleteOrder(id){
				let checkresult=confirm("您确认要删除此商品么");
				if(checkresult){
					this.axiosJSON.get("/order/delete/",{
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
			selectByDetailsId(id){
				///list/all/detailsid
				this.axiosJSON.get("/order/list/all/detailsid",{
					params:{
						detailsid:id
						
					}
				}).then(result=>{
						
						if(result.data.status=="OK"){
							this.orderList=result.data.list;
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
	.order{
		    margin-top: 10px;
		    height: 60px;
		    background-color: #fff;
		    box-shadow: 0 1px 3px 3px rgba(0, 0, 0, 0.1);
		    line-height: 60px;
		}
		.order h3{
		    float: left;
		   
		    padding: 0 30px;
		    color: #00a4ff;
		    font-size: 16px;
		}
		.order ul{
		
		    float: left;
		}
		.order ul li{
		    float: left;
		}
		.order ul li a{
		    padding: 0 30px;
		    font-size: 16px;
		    color: #050505;
		    border-left: 1px solid #ccc;
		}
		.order ul li a:hover{
		    color:#00a4ff ;
		}
		.order .mod{
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
