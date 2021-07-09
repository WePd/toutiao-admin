<template>
    <div class="images-constainer">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
            	<!-- 面包屑 -->
							<el-breadcrumb separator-class="el-icon-arrow-right">
								<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
								<el-breadcrumb-item>素材管理</el-breadcrumb-item>
							</el-breadcrumb>
            	<!-- <el-button style="float: right; padding: 5px 0" type="text">上传图片</el-button> -->
    			</div>
    			<div style="display:flex;
											padding-bottom: 18px;
											justify-content:space-between"> 
						<el-radio-group v-model="collect" size="mini" >
							<!-- 直接注册点击事件的时候没有效果需要添加.native -->
							<el-radio-button :label="false" @click.native="loadImages(false)">全部</el-radio-button>
							<el-radio-button :label="true" @click.native="loadImages(true)">收藏</el-radio-button>
    				</el-radio-group>
						<el-button size="mini" type="success" @click="dialogUploadVisible = true " >上传素材</el-button>
  				</div>
					<!-- 素材列表 -->
							<el-row :gutter="10">
								<el-col  :span="4" v-for="(img, index) in images" :key="index">
									<el-image
										style="width: 100px; height: 100px"
										:src="img.url"
										fit="cover">
									</el-image>
								</el-col>
							</el-row>
    		</el-card>
				<!-- 点击上传素材展示弹窗 -->
				<el-dialog title="上传素材" :visible.sync="dialogUploadVisible" :append-to-body='true'>
							<el-upload
								class="upload-demo"
								drag
								action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
								:headers="upLoadHeaders"
								name = 'image'
								:on-success="onUploadSuccess"
								:show-file-list="false"
								multiple>
								<i class="el-icon-upload"></i>
								<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
								<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
							</el-upload>
				</el-dialog>
    </div>
</template>

<script>
import { getImages } from '@/api/images'
export default {
	name: 'ImageIndex',
	data(){
		const user = JSON.parse(window.localStorage.getItem('user'))
		return {
				collect: false,
				images: [],
				dialogUploadVisible: false,
				upLoadHeaders:{
					Authorization: `Bearer ${ user.data.token }`
				}
	    }
 	},
	methods: {
		  loadImages(collect=false){
			  getImages({
					collect
				}).then( res => {
					this.images = res.data.data.results
			})
		 },
		 //上传成功后做的操作
		  onUploadSuccess(){
			//  首先关闭弹窗
				this.dialogUploadVisible = false
			//  更新素材列表
				this.loadImages(false)
		  }
	},
	created(){
		 this.loadImages(false)
	}

}
</script>

<style lang="less" scoped>

</style>