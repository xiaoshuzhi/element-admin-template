<template>

  <div class="rightbar">
    <el-card>
      <div class="cardhead">
        <h3 class="headtitle">我的文件夹</h3>
        <el-dropdown :hide-on-click="false" class="headbutton">
          <el-button type="primary" icon="el-icon-plus">新建</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>富文本</el-dropdown-item>
            <el-dropdown-item>markdown</el-dropdown-item>
            <!-- <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided>蚵仔煎</el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-row>
        <el-col>
          <el-card shadow="hover" class="file">
            鼠标悬浮时显示
          </el-card>
        </el-col>
        <el-col>
          <el-card shadow="hover" class="file">
            鼠标悬浮时显示
          </el-card>
        </el-col>
        <el-col>
          <el-card shadow="hover" class="file">
            鼠标悬浮时显示
          </el-card>
        </el-col>
        <el-col>
          <div class="filebutton">
            <el-dropdown :hide-on-click="false" class="headbutton">
              <el-button type="primary" icon="el-icon-more-outline" round />
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>打开</el-dropdown-item>
                <el-dropdown-item>修改文件名</el-dropdown-item>
                <el-dropdown-item>提交记录</el-dropdown-item>
                <el-dropdown-item>预览</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
                <el-dropdown-item>导出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <el-card shadow="hover" class="file ">
            <div class="filehead">
              <span class="filename">文件1</span>
              <span class="filetime">2020-02-25</span>
            </div>
            <div class="fileabs">
              <span>这是文件简介，可能会很长。这是文件简介，不然后显示省略号不然后显示省略号不然后显示省略号</span>
            </div>
            <div style="divider" />
            <div class="block fileimg">
              <el-carousel trigger="click" height="150px" :autoplay="false">
                <el-carousel-item v-for="item in 4" :key="item">
                  <img src="http://127.0.0.1:8081/uploadDirectory/header/c404bf68f716408ea0c2372ca0b1349c200254112547.png?imageView2/1/w/80/h/80" width="100%" height="100%">
                </el-carousel-item>
              </el-carousel>
            </div>

          </el-card>
        </el-col>
        <el-col>
          <el-card shadow="hover" class="file">
            鼠标悬浮时显示
          </el-card>
        </el-col>
        <el-col>
          <el-card shadow="hover" class="file">
            鼠标悬浮时显示
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {

  data() {
    return {
      filterText: '',
      data2: [{
        id: 1,
        label: 'Level one 1',
        children: [{
          id: 4,
          label: 'Level two 1-1',
          children: [{
            id: 9,
            label: 'Level three 1-1-1'
          }, {
            id: 10,
            label: 'Level three 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: 'Level one 2',
        children: [{
          id: 5,
          label: 'Level two 2-1'
        }, {
          id: 6,
          label: 'Level two 2-2'
        }]
      }, {
        id: 3,
        label: 'Level one 3',
        children: [{
          id: 7,
          label: 'Level two 3-1'
        }, {
          id: 8,
          label: 'Level two 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
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

  .el-carousel__button{
    width:10px;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

<style lang="scss" scoped>
    .rightbar{
      float:left;
      width:79%;
      margin-left:10px;
      .el-card{
        padding:0px;
        flex-wrap:wrap;
        .cardhead{
          width:100%;
          height:45px;
          // border:solid red 1px;
          clear: both;

          .headtitle{
            display:block;
            margin:5px 0px;
            float:left;
            width:15%;
            height:20px;
            // border:solid red 1px;
          }

          .headbutton{
            display:block;
            float: right;
            //  border:solid red 1px;
          }

        }

        .el-col{
          height:290px;
          width:230px;
          margin:20px 12px;
          // border:red solid 1px;
          .filebutton{
              width:100%;
              height:30px;
              margin-bottom: -15px;
             // border:solid red 1px;
            .el-button{
              display: block;
              margin-left:210px;
              // border:solid red 1px;
              width:30px;
              height:30px;
              padding:0px;

            }
          }

          .file{
            width:100%;
            height:100%;
            padding: 0px;

            .filehead{
              width:100%;
              padding-bottom: 5px;
              border-bottom: solid 1px gainsboro;

              .filename{
                font-size: 18px;
              }
              .filetime{
                font-size: 5px;
                margin-top: 7px;
                float:right;
              }
            }

            .fileabs{
              margin-top:10px;
              padding-bottom: 5px;
              border-bottom: solid 1px gainsboro;
              font-size: 13px;
            }

            .fileimg{
              height:150px;
            }
          }
        }
    }
  }

</style>
