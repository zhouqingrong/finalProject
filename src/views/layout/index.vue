<template>
  <el-container class="layoutContainer">
    <el-header class="header">
      <div>
        <!-- class 样式绑定：
          {
            css类名：布尔值
          }
          true：作用类名
          flase：不作用类名 -->
        <i
          :class="{
            'el-icon-s-fold': !isCollapse,
            'el-icon-s-unfold': isCollapse,
          }"
          @click="isCollapse = !isCollapse"
        ></i>
        <span class="header-text">疫情校园打卡</span>
      </div>
      <el-dropdown>
        <div class="avatar-wrap">
          <img class="avatar" :src="photo" />
          <span class="header-text"
            >欢迎您，{{ user.adminName }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item @click.native="onLogout()">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside class="aside" width="auto">
        <AppAside class="aside-menu" :isCollapse="isCollapse" />
        <!-- 第二种写法：<app-aside/> -->
      </el-aside>
      <el-main class="main">
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import AppAside from "./components/aside";
export default {
  name: "layoutIndex",
  components: {
    AppAside,
  },
  props: {},
  data() {
    return {
      photo:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      user: {},
      isCollapse: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    //组件初始化好，请求获取用户资料
    this.loadUserProfile();
  },
  mounted() {},
  methods: {
    //除了登录接口，其他所有接口都需要授权才能请求使用
    //或者说，除了登录接口，其他接口都需要提供你的身份令牌才能获取数据
    loadUserProfile() {
      this.user = JSON.parse(window.localStorage.getItem("user"));
    },
    onLogout() {
      this.$confirm("确定退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //把用户的登录状态清除
          window.localStorage.removeItem("user");
          //跳转到登录页面
          this.$router.push("/");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
  },
};
</script>
<style scoped>
.layoutContainer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.aside {
  width: auto;
  background-color: rgb(211, 220, 230);
}
.aside-menu {
  height: 100%;
}
.header {
  color: #ffffff;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: 1px solid #ccc; */
  background-color: #002033;
}
.header-text {
  color: #ffffff;
}
.main {
  background-color: #ffffff;
}
.avatar-wrap {
  display: flex;
  align-items: center;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
