<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <div slot="header" class="box-card-header">
      <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png">
    </div>
    <div style="position:relative;">
      <pan-thumb :image="avatar" class="panThumb" />
      <mallki class-name="mallki-text" :text="user.username" />
      <div class="user-bio">
        <div class="user-education user-bio-section">
          <div class="user-bio-section-header">
            <svg-icon icon-class="education" /><span>座右铭</span>
            <div class="addButton">
              <el-button type="primary" icon="el-icon-edit-outline" @click="changeMotto" />
            </div>
          </div>
          <div class="user-bio-section-body">
            <div v-if="mottoButton" class="text-muted">
              {{ user.motto }}
            </div>
            <div v-else class="text-muted">
              <el-input
                v-model="user.motto"
                placeholder="请输入内容"
                clearable
                @blur.prevent="changeM"
              />
            </div>

          </div>
        </div>
        <div class="user-education user-bio-section">
          <div class="user-bio-section-header">
            <i class="el-icon-delete" /><span>github</span>
            <div class="addButton">
              <el-button type="primary" icon="el-icon-edit-outline" @click="changeGithub" />
            </div>
          </div>
          <div class="user-bio-section-body">
            <div v-if="githubButton" class="text-muted">
              <el-button type="text">{{ user.github }}</el-button>
            </div>
            <div v-else class="text-muted">
              <el-input
                v-model="user.github"
                placeholder="请输入内容"
                clearable
                @blur.prevent="changeG"
              />
            </div>
          </div>
        </div>
        <div class="user-skills user-bio-section">
          <div class="user-bio-section-header"><i class="el-icon-s-claim" /><span>在线项目 </span></div>
          <div v-for="item of user.projects" :key="item.id" class="user-bio-section-body">
            <div style="width:100%;height:45px;">
              <el-tooltip style="float:left;" class="item" effect="dark" :content="item.projectIntroduce" placement="right">
                <el-button type="text">{{ item.projectUrl| ellipsis }}</el-button>
              </el-tooltip>
              <el-col :span="4" style="padding:0px; float:right;margin:5px 0px;">
                <el-dropdown trigger="click" style=" float:right">
                  <div class="addButton">
                    <el-button type="primary" icon="el-icon-more-outline" />
                  </div>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-edit"><el-button type="text" style="color:black;" @click="changeProject(item.id)">修改</el-button></el-dropdown-item>
                    <el-dropdown-item icon="el-icon-delete"><el-button type="text" style="color:black;" @click="deleteProject(item.id)">删除</el-button></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </div>
          </div>
        </div>
        <el-button @click="addPorject">新增项目</el-button>
      </div>
    </div>
    <Dialog v-if="hackReset" :config="rowData" :dialogshow="dialogShow" :is-add="isAdd" @dialogChange="updateDialog" />
  </el-card></template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import Mallki from '@/components/TextHoverEffect/Mallki'
import Dialog from './UserDialog'
import { getUserInfo, updateInfo } from '@/api/user'
import { getAllProjects, deleteProjects } from '@/api/project'
// import { getNote, createNote, updateNote, deleteNote, updateProject } from '@/api/note'
export default {
  components: { PanThumb, Mallki, Dialog },
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    ellipsis(value) {
      if (!value) return ''
      if (value.length > 32) {
        return value.slice(0, 32) + '...'
      }
      return value
    }
  },
  data() {
    return {
      githubButton: true,
      mottoButton: true,
      rowData: {},
      isAdd: false,
      projectid: -1,
      statisticsData: {
        article_count: 1024,
        pageviews_count: 1024
      },
      hackReset: false,
      dialogShow: false,
      user: {
        github: '',
        motto: '',
        projects: []
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getUserDitailInfo()
  },
  methods: {
    getUserDitailInfo() {
      getUserInfo().then(response => {
        this.user = response.data
        getAllProjects().then(response => {
          this.user.projects = response.data.projects
          this.$forceUpdate()
        })
      })
    },
    updateDialog(isShow1) {
      this.dialogShow = isShow1
      this.getUserDitailInfo()
    },
    changeGithub() {
      this.$nextTick(() => {
        this.githubButton = false
      })
    },
    changeMotto() {
      this.$nextTick(() => {
        this.mottoButton = false
      })
    },
    changeG() {
      updateInfo({ github: this.user.github }).then(response => {
        this.$nextTick(() => {
          this.githubButton = true
        })
      })
    },
    changeM() {
      updateInfo({ motto: this.user.motto }).then(response => {
        this.$nextTick(() => {
          this.mottoButton = true
        })
      })
    },
    changeProject(data) {
      this.projectid = data
      for (var item of this.user.projects) {
        if (item.id === this.projectid) {
          this.rowData = item
        }
      }
      this.hackReset = false
      this.$nextTick(() => {
        this.hackReset = true
      })
      this.isAdd = false
      this.dialogShow = true
    },
    addPorject() {
      this.hackReset = false
      this.$nextTick(() => {
        this.hackReset = true
      })
      this.isAdd = true
      this.dialogShow = true
      this.rowData = {}
    },
    deleteProject(id) {
      deleteProjects(id).then(() => {
        this.getUserDitailInfo()
      })
    }
  }
}
</script>

<style lang="scss" >
.box-card-component{
  .el-card__header {
    padding: 0px!important;
  }
}
</style>
<style lang="scss" scoped>
.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }

  .mallki-text {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    font-weight: bold;
  }

  .panThumb {
    z-index: 100;
    height: 70px!important;
    width: 70px!important;
    position: absolute!important;
    top: -45px;
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none!important;
    /deep/ .pan-info {
      box-shadow: none!important;
    }
  }
  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }
  @media only screen and (max-width: 1510px){
    .mallki-text{
      display: none;
    }
  }
}

.addButton{
  width:20px;
  height:20px;
  float:right;

  .el-button{
    width:20px;
    height:20px;
    padding:0px;
    .el-icon-circle-plus{
      display:block;
      margin:auto auto;
    }
    .el-icon-more-outline {
       display:block;
      margin:auto auto;
    }

  }
}
.user-bio {
  position: relative;
  padding-top: 30px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}

</style>
