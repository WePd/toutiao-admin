<template>
 <el-container class="layout-container">
  <el-aside  class="aside" width="200px" >
    <app-Aside class="aside-menu"/>
  </el-aside>
  <el-container>
    <el-header>头条管理</el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import appAside from './components/aside'

 export default {
   name:'layoutIndex',
   data () {
     return {

     }
   },
   components: {
     appAside
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
 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
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
</style>

