<template>
	<div>
		<div class="box w">
		        <div class="box-head">
		            <h3>精品推荐</h3>
		           <ul v-for="item in itemList" v-bind:key="item.id">
		               <li> 
		           	 <a href="#" v-on:click="selectByItemId(item.id)"  >{{item.name}}</a>
		           	</li>
		             			
		           		
		           </ul>
					<router-link to="/goods/list" class="btn btn-outline-primary">管理商品</router-link>
		        </div>
				
		        <div class="box-content clearfix" >
		            <ul class="clearfix" v-for="goods in goodsList" v-bind:key="goods.id">
		                <li class="clearfix">
		                    <em>
								
		                        <img src="images/hot2.png" alt="">
		                    </em>
		                    
							 <img v-bind:src="goods.imageurl"  />
		                    <h4>{{goods.name}}热门</h4>
							
		                    <div class="info"><span>价格：{{goods.price}}￥</span> 月销量：{{goods.num}}
							 <button type="button"  v-on:click="addToCar(goods)" class="btn btn-warning">购买</button></div>
		               
						</li>
		               
		
		            </ul>
		        </div>
		    </div>
			
			<nav class="page">
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
	export default {
		name: "GoodsIndex",
		data() {
			return {
				goodsList:[],
				itemList:[],
				page:1,
				rows:10,
				count:0,
				pageCount:0,
				goods: {
					id: '',
					itemid: '',
					name: '',
					imageurl: '',
					price: '',
					num: ''
			
				}
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
			addToCar(goods){
				
					this.axiosJSON.get("/carts/add/",{
					params:{
						pid:goods.id,
						amount:1,
						
					}
				}).then(result=>{
						alert(result.data.message);
						/*if(result.data.status=="OK"){
							this.getList();
						}*/
						console.log(goods);
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
	li{
	     list-style: none;
	     }
	a{
	    text-decoration: none;
	}
	/* 清除浮动 */
	.clearfix:before,.clearfix:after {
	    content:"";
	    display:table; 
	
	    }
	.clearfix:after {
	    clear:both;
	 }
	.clearfix {
	     *zoom:1;
	    }
	.
	.box{
	    margin-top: 30px;
		margin-left: 30px;
	}
	.box-head{
	    height: 45px;
	}
	.box-head h3{
	    float: left;
	    font-size: 20px;
		font-weight: 600;
	    color: #ff5500;
	    /* margin-left: 30px; */
	}
	.box-head a{
	    float: right;
	    font-size: 12px;
	    color: #a5a5a5;
	    margin-right: 30px;
	    margin-top: 10px;
	}
	.box-content ul{
		float: left;
	   width: auto;
		border-right-color: #00A4FF;
	}
		
	.box-content{
		float: left;
		 width: 1700px;
	}
	.box-content ul li{
	   
	    float: right;
	    width: 250px;
	    height: 350px;
	    background-color: #fefffb;
	    margin-right: 15px;
	    margin-bottom: 15px;
	}
	.box-content ul li  img{
	    width: 100%;
		height: 200px;
	}
	.box-content ul li em{
	    position: absolute;
	    right: -4px;
	    top: 4px;
	}
	
	.box-content ul li h4{
	    margin: 20px 20px 20px 25px;
	    font-weight: normal;
	    font-size: 20px;
	}
	.box-content .info{
	    margin: 0 20px 0 25px;
	    font-size: 15px;
	    color: #999;
	}
	.box-content .info span{
	    color: #ff7c2d;
	}
	.page{
		margin-left: 700px;
	}
	
	
</style>
