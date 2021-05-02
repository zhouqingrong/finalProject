<template>
  <div class="BreadcrumbContainer">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="path.name" :to="{ path: path.path }">{{
        path.name
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: "Breadcrumb",
  components: {},
  props: {
    path: {
      type: Object,
      default() {
        return {};
      },
    },
  },
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
.breadcrumb {
  margin: 0.5rem 0.125rem 1.2rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px rgb(236, 234, 234) solid;
}
</style>
