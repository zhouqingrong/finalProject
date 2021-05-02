<template>
  <div class="SettingContainer">
    <!-- 面包屑 -->
    <Breadcrumb :path="path" />
  </div>
</template>
<script>
import Breadcrumb from "@/components/breadcrumb/index.vue";
export default {
  name: "setting",
  components: { Breadcrumb },
  props: {},
  data() {
    return {
      path: {
        //面包屑路径
        path: "/setting",
        name: "个人设置",
      },
    };
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
