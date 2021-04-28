<template>
  <div class="BreadcrumbContainer">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        ><a href="/studentInfo">学生信息管理</a></el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/classInfo' }"
        >班级管理</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/faceInfo' }"
        >人脸图库</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: "Breadcrumb",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped>
</style>
