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
											width: 120px;
											height: 30px;
											padding-bottom: 18px ;">
						<el-radio-group v-model="radio1" size="mini">
							<el-radio-button label="全部"></el-radio-button>
							<el-radio-button label="收藏"></el-radio-button>
    				</el-radio-group>
  				</div>
					<!-- 素材列表 -->
							<el-row :gutter="10">
								<el-col  :span="4">
									<el-image
										style="width: 100px; height: 100px"
										:src="url"
										fit="cover">
									</el-image>
								</el-col>
								<el-col :span="4">
									<el-image
										style="width: 100px; height: 100px"
										:src="url"
										fit="cover">
									</el-image>
								</el-col>
								<el-col :span="4">
									<el-image
										style="width: 100px; height: 100px"
										:src="url"
										fit="cover">
									</el-image></el-col>
								<el-col :span="4">
									<el-image
										style="width: 100px; height: 100px"
										:src="url"
										fit="cover">
									</el-image>
								</el-col>
								<el-col :span="4">
									<el-image
										style="width: 100px; height: 100px"
										:src="url"
										fit="cover">
									</el-image>
								</el-col>
								<el-col :span="4">
									<el-image
										style="width: 100px; height: 100px"
										:src="url"
										fit="cover">
									</el-image>
								</el-col>	
							</el-row>
    		</el-card>
    </div>
</template>

<script>
export default {
	name: 'ImageIndex',
	data(){
		return {
				radio1: '全部',
				url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
	    }
 		}
}
</script>

<style lang="less" scoped>

</style>