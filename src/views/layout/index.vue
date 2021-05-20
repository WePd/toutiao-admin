<template>
 <el-container class="layout-container">
  <el-aside  class="aside" width="200px" >
    <app-Aside class="aside-menu"/>
  </el-aside>
  <el-container>
    <el-header >
      <div>
        <i class="el-icon-s-fold">头条管理</i>
      </div> 
        <el-dropdown :hide-on-click="false">
          <div class="avatar-wrap">
            <img class="avatar" :src="user.name" >
            <!-- // 可以登录的时候就不用了写死了，{{ user.photo }} -->
            <span>{{ user.name}}</span>
            <!-- {{ user.name }} -->
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人设置</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import appAside from './components/aside'
import { getUserInfo } from '@/api/user'

 export default {
   name:'layoutIndex',
   data () {
     return {
       user: {
          //当前登录用户信息
       },
     }
   },
   components: {
     appAside
   },
   created(){
     this.loadUserInfo()
   },
   methods: {
     loadUserInfo(){
       getUserInfo().then(res => {
         this.user = res.data.data;
       })
     }
   }
 }
</script>

<style lang="less" scpoed>
.layout-container{
  position: fixed;
  left: 0;
  right:0;
  top: 0;
  bottom: 0;
  
}
 .el-header {
    color: #333;
    line-height: 60px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px slid #ccc;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    height: 100%;
    .aside-menu{
      height: 100%;
    }
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .avatar-wrap{
    display: flex;
    align-items:center;
    .avatar{
      height: 45px;
      width: 45px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
</style>

