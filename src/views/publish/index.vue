<template>
 <div class="publish-container">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
							<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
							<el-breadcrumb-item>{{ $route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
    				</el-breadcrumb>
        </div>
				<el-form  :model="article" label-width="60px" :rules="formRules" ref="publish-form">
					<el-form-item label="标题" prop="title">
						<el-input v-model="article.title" ></el-input>
					</el-form-item>
						<el-form-item label="内容" prop="content">
						<el-tiptap lang="zh" v-model="article.content" :extensions="extensions"  height="350"  placeholder="请输入文章内容 …"></el-tiptap>
					</el-form-item>
						<el-form-item label="封面">
							<el-radio-group v-model="article.cover.type">
								<el-radio :label="1">单图</el-radio>
								<el-radio :label="3">双图</el-radio>
								<el-radio :label="0">无图</el-radio>
								<el-radio :label="-1">自动</el-radio>
							</el-radio-group>
					</el-form-item>
					<el-form-item label="频道" prop="channel_id">
						<el-select v-model="article.channel_id" placeholder="请选择频道">
							<el-option :label="channel.name" :value="channel.id" v-for="(channel, index) in channels" :key="index"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onPublish(false)">发表</el-button>
						<el-button @click="onPublish(true)">存入草稿</el-button>
					</el-form-item>
			</el-form>
    </el-card>
 </div>
</template>

<script>
import { getArticlesChannels, addArticles, updateArticles, getArticle } from '@/api/articles'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
	Image,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
	Fullscreen
} from 'element-tiptap';
import 'element-tiptap/lib/index.css';
import { uploadImage } from '@/api/images'


 export default {
   name:'PublishIndex',
   data () {
     return {
				channels: [],
				article: {
					title: "",
					content: '',
					cover: {
						type: 0,
						images: []
					},
					channel_id: null
				},
				extensions: [
					new Doc(),
					new Image({
						//图片上传方法
						uploadRequest(file){
							const fd = new FormData()
							fd.append('image', file)
							 return uploadImage(fd).then( res => {
								return res.data.data.url
							})
						}
					}),
					new Text(),
					new Paragraph(),
					new Heading({ level: 5 }),
					new Bold({ bubble: true }), // render command-button in bubble menu.
					new Underline({ bubble: true, menubar: false }), // render command-button in bubble menu but not in menubar.
					new Italic(),
					new Strike(),
					new ListItem(),
					new BulletList(),
					new OrderedList(),
					new Fullscreen(),
      ],
				formRules: {
					title: [
						{ required: true, message: '请输入文章标题', trigger: 'blur' },
						{ min: 3, max: 30, message: '长度在 3 到 30个字符', trigger: 'blur' }
					],
					content: [
							// { required: true, message: '请输入文章内容', trigger: 'blur' },
						{	
							validator(rule, value, callback) {
								if(value === '<p></p>') {
									// 验证不通过
									callback(new Error('请再次输入文章内容'));
								}else {
									// 验证通过
									callback()
								}
							} 
						},
						{ required: true, message: '请输入文章内容', trigger: 'blur' },	
				],
					channel_id: [
						{ required: true, message: '请选择相应的频道', trigger: 'blur' },	
					]
			}
  }
     },
   components: {
		 'el-tiptap': ElementTiptap,
   },
	 created(){
		 this.loadChannels()

		 if(this.$route.query.id){
			//  console.log("执行到这里了")
			 this.loadArticle()
		 }
	 },
	 methods: {
		 onPublish (draft = false) {
			 //提交前的校验
			 this.$refs['publish-form'].validate(valid => {
				 //验证失败 停止提交
				 if(!valid){
					 return 
				 }
				 //加一个判断，如果是修改文章，则执行修改操作，否则执行添加操作
				 if(this.$route.query.id){
				 //更新文章操作
				 updateArticles(this.$route.query.id, this.article, draft).then( res => {
					//  console.log(res.data)
					 this.$message({
						 message: `${ draft ? '存入草稿' : '发布'}成功`,
						 type: 'success'
					 })
				 })
			 }else{
        // 发布文章操作
				addArticles(this.article, draft).then(res => {
					this.$message({
						message: `${draft ? '存入草稿' : '发布'}成功`,
						type: 'success'
					})
				})
				//发布成功后跳转到内容管理界面
				this.$router.push('/article')	
			 }
				 
			 })
		 },
			loadChannels () {
				getArticlesChannels().then( res => {
					this.channels = res.data.data.channels
				})
			},

			//修改文章
			loadArticle(){
				getArticle(this.$route.query.id).then(res => {
					// console.log(res)
					this.article = res.data.data 
				})
			}
	 }, 
 }
</script>

<style scpoed>
 
</style>
