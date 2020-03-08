<template>
  <div class="app-container">
    <div class="leftbar">
      <el-card>
        <el-input v-model="input3" placeholder="请输入内容" class="input-with-select">
          <el-select slot="prepend" v-model="select" placeholder="请选择">
            <el-option label="餐厅名" value="1" />
            <el-option label="订单号" value="2" />
            <el-option label="用户电话" value="3" />
          </el-select>
          <el-button slot="append" icon="el-icon-search" style="width:15%;" />
        </el-input>
      </el-card>
      <div class="dirs">
        <div class="dirButton">
          <el-tooltip content="创建文件夹" placement="bottom" effect="light" class="headbutton" style="display:block;float:right;margin-top:-10px; ">
            <el-button type="primary" icon="el-icon-plus" />
          </el-tooltip>
        </div>
      </div>

      <div class="dircard">
        <el-card shadow="hover">
          <div @click="openDir">
            <span>我的文件夹</span>
            <el-dropdown :hide-on-click="false" class="headbutton">
              <el-button type="text" icon="el-icon-more-outline" />
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item><el-button type="text">打开</el-button></el-dropdown-item> -->
                <el-dropdown-item><el-button type="text">重命名</el-button></el-dropdown-item>
                <el-dropdown-item><el-button type="text">删除</el-button></el-dropdown-item>
                <!-- <el-dropdown-item>
                  <el-tooltip content="创建文件夹" placement="bottom" effect="light" class="headbutton" style="display:block;float:right;margin-top:-10px; ">
                    <el-button type="text">详情</el-button>
                  </el-tooltip>
                </el-dropdown-item> -->

              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-card>
      </div>
      <div class="dircard">
        <el-card shadow="hover">
          总是显示
        </el-card>
      </div>
      <div class="dircard">
        <el-card shadow="hover">
          总是显示
        </el-card>
      </div>
      <div class="dircard">
        <el-card shadow="hover">
          总是显示
        </el-card>
      </div>

    </div>

    <FileVue />

  </div>

</template>

<script>
import FileVue from './file'
export default {
  components: { FileVue },
  data() {
    return {
      filterText: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    // getData(){

    // },
    // openDir(id){
    //   console.log(id)
    // }
  }
}
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 12px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-dropdown-menu {
    padding-top:0px;
  }

</style>
<style lang="scss" scoped>
  .app-container{
    margin-top:20px;
    width:100%;

    .leftbar{
      width:20%;
      float:left;
      .dirs{
        width:100%;
        .dirButton{
          width:100%;
          height:30px;
          margin-bottom: 15px;
          .el-button{
            width:20px;
            padding:0px;
            height:20px;
            float:right;
            margin-top: -10 px;
          }
        }
      }
       .dircard{
          margin-bottom: 20px;
          // border:red solid 1px;
          .headbutton{
            width:60%;

            .el-button{
              padding:0px;
              width:20px;
              height:20px;
              float:right;
               //margin-top:-30px;
            }
          }
        }
      div.dircard:hover{

        // border:black solid 1px;
      }
    }
  }

</style>
