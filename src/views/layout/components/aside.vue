<template>
  <el-menu
    :default-active="route"
    background-color="#354358"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="isCollapse"
    :collapse-transition="false"
  >
    <!-- active-text-color 选中时的颜色   rgb(#001A29)-->
    <!-- text-color 字体的颜色 -->
    <!-- router 是menu的一个属性，以index为路由跳转路径 -->
    <template v-for="menu in menuList">
      <!-- 一级选项 -->
      <el-menu-item
        class="menu-item"
        :index="menu.index"
        :key="menu.index"
        v-if="!menu.subMenu && menu.show"
      >
        <i :class="menu.icon"></i>
        <template v-slot:title>
          <span>{{ menu.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script>
import EventBus from "@/EventBus.js";
export default {
  name: "AppAside",
  components: {},
  props: ["is-collapse"],
  data() {
    return {
      // isCollapse: true,
      route: "/home",
      identity: 2,
    };
  },
  computed: {
    // isshow: false,
    menuList() {
      const identity = this.identity;
      return [
        {
          title: "系统首页",
          index: "/home",
          icon: "el-icon-house",
          show: true,
        },
        {
          title: "学生管理",
          index: "/studentInfo",
          icon: "el-icon-user",
          show: true,
        },
        {
          title: "辅导员管理",
          index: "/adminInfo",
          icon: "el-icon-notebook-2",
          show: identity === 2,
        },
        {
          title: "班级管理",
          index: "/classInfo",
          icon: "el-icon-pie-chart",
          show: identity === 2,
        },
        {
          title: "宿舍管理",
          index: "/dormitoryInfo",
          icon: "el-icon-office-building",
          show: identity === 2,
        },
        {
          title: "人脸图库",
          index: "/faceInfo",
          icon: "el-icon-picture-outline-round",
          show: identity === 2,
        },

        {
          title: "学生管理",
          index: "/student",
          icon: "el-icon-circle-check",
          show: false,
        },
        {
          title: "打卡记录",
          index: "/record",
          icon: "el-icon-notebook-2",
          show: identity === 1,
        },
        {
          title: "个人设置",
          index: "/setting",
          icon: "el-icon-circle-check",
          show: identity === 1,
        },
      ];
    },
  },
  watch: {},
  created() {
    EventBus.$on("change-route", (route) => {
      this.route = route;
    });
  },
  mounted() {
    this.identity = JSON.parse(window.localStorage.getItem("user")).role;
  },
  methods: {},
};
</script>
<style scoped>
.iconfont {
  margin-right: 10px;
  padding-left: 5px;
}
.menu-item {
  padding: 0 5rem;
  text-align: left;
  height: 8%;
}

/* 强行给模板元素加样式：1.在类标签前加/deep/，或者加>,如下 */
/* .el-menu-item>:hover{
      background-color: red;
    }
*/
</style>
