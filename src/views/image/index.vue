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
						<el-button size="mini" type="success" @click="" >上传素材</el-button>
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
				<el-dialog title="收货地址" :visible.sync="dialogUploadVisible">
					<el-table :data="gridData">
						<el-table-column property="date" label="日期" width="150"></el-table-column>
						<el-table-column property="name" label="姓名" width="200"></el-table-column>
						<el-table-column property="address" label="地址"></el-table-column>
					</el-table>
				</el-dialog>
    </div>
</template>

<script>
import { getImages } from '@/api/images'
export default {
	name: 'ImageIndex',
	data(){
		return {
				collect: false,
				images: [],
				dialogUploadVisible: false
	    }
 	},
	methods: {
		  loadImages(collect=false){
			  getImages({
					collect
				}).then( res => {
					this.images = res.data.data.results
			})
		 }
	},
	created(){
		 this.loadImages(false)
	}

}
</script>

<style lang="less" scoped>

</style>