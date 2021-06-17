<template>
 <div class="article-container">
	 		<el-card class="filter-card">
  <div slot="header" class="clearfix">
    <!-- 面包屑效果 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <!-- form表单 -->
    <el-form ref="form" :model="form" label-width="60px" size="mini" class="form-style">
          <el-form-item label="状态：">
        			<el-radio-group v-model="status">
      					<el-radio :label="null">全部</el-radio>
      					<el-radio :label="0">草稿</el-radio>
      					<el-radio :label="1">待审核</el-radio>
      					<el-radio :label="2">审核通过</el-radio>
      					<el-radio :label="3">审核失败</el-radio>
      					<el-radio :label="4">已删除</el-radio>
    					</el-radio-group>
  				</el-form-item>
		<el-form-item label="频道：">
			<el-select v-model="channelId" placeholder="请选择频道">
				<el-option 
          label="全部" 
          :value="null" 
        >
        </el-option>
				<el-option 
          :label="channel.name" 
          :value="channel.id" 
          v-for="(channel, index)  in channels" 
          :key="index">
        </el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="日期：">
			 <el-date-picker
      	v-model="value1"
      	type="datetimerange"
      	start-placeholder="开始日期"
      	end-placeholder="结束日期"
      	:default-time="['12:00:00']">
    </el-date-picker>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="loadArticles(1)">筛选</el-button>
		</el-form-item>
</el-form>
</el-card>

<el-card class="box-card">
  <div slot="header" class="clearfix">
		根据筛选条件工查询到{{ totalCount }}条数据：
  </div>
	<!-- 用表格实现浏览 -->
  <!--
    表格组件
    1. 先绑定数据源到data属性
    2.
  -->
  <el-table
      :data="articles"
			stripe
      style="width: 100%"
			class="list-table">
      <el-table-column
        prop="images"
        label="封面"
        width="180">
        <!-- //文章列表图片显示 -->
        <template slot-scope="scope">
          <img class="articles-cover"  :src="scope.row.cover.images[0]" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <el-tag :type="articlesStatus[scope.row.status].type">{{ articlesStatus[scope.row.status].text }}</el-tag>
          <!-- <el-tag v-else-if="scope.row.status === 1" type="info">待审核</el-tag>
          <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
          <el-tag v-else-if="scope.row.status === 3" type="warning">审核失败</el-tag>
          <el-tag v-else-if="scope.row.status === 4" type="danger"> 已删除</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布时间">
      </el-table-column>
      <el-table-column
        label="操作">
         <template >
        <el-button
          size="mini" icon="el-icon-edit"  type="success" circle></el-button>
        <el-button
          size="mini"
          type="danger" icon="el-icon-delete" circle></el-button>
      </template>
      </el-table-column>
    </el-table>
		<!-- 分页效果 -->
		<el-pagination
			background
			layout="prev, pager, next"
			:total="totalCount"
      @current-change="onCurrentChange"
      :page-size="pageSize"> 
		</el-pagination>
</el-card>


 </div>
</template>

<script>
import { getArticles, getArticlesChannels } from '@/api/articles'

 export default {
   name:'ArticleIndex',
   data () {
     return {
          form: {
          name: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          desc: ''
        },
					value1: '',
          articles: [],
          articlesStatus: [
            {status: 0, text: '草稿',type: ''},
            {status: 1, text: '待审核',type: 'info'},
            {status: 2, text: '审核通过',type: 'success'},
            {status: 3, text: '审核失败',type: 'warning'},
            {status: 4, text: '已删除',type: 'danger'}
          ],
          totalCount: 0 ,//总数据量,
          pageSize: 10,
          status: null, //文章状态码
          channels: [],
          channelId: null,
     }
   },
   methods: {
     loadArticles(page = 1) {
       getArticles({
         page,
         per_page: this.pageSize,
         status: this.status,
         channel_id: this.channelId
       }).then(res => {
         //先不用传参，等到做分页的时候再传参
        //  console.log(res)
        const { results, total_count} = res.data.data
         this.articles = results
         this.totalCount = total_count
       })
     },
      // 分页处理函数
     onCurrentChange(page){
       this.loadArticles(page)
     },

      onSubmit() {
        console.log('submit!');
      },
      //获取文章频道
      loadChannels(){
        getArticlesChannels().then(res => {
          // console.log(res.data.data.channels)
          this.channels = res.data.data.channels
        })
      }
    },
		created(){
			this.loadArticles(1)
			this.loadChannels()
		},
   components: {

   }
 }
</script>

<style lang='less' scpoed>
.clearfix{
		text-align: left;
    line-height: 30px;
}
.form-style{
	text-align: left;
}
 .filter-card{
	 margin-bottom: 30px;
 }

 .list-table{
	 margin-bottom: 20px;
 }


 .articles-cover{
   width: 100px;
   height: 100px;
   background-size: cover;
 }
</style>
