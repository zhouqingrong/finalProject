<template>
  <div class="RecordContainer">
    <!-- 面包屑 -->
    <Breadcrumb :path="path" />
  </div>
</template>
<script>
import Breadcrumb from "@/components/breadcrumb/index.vue";
export default {
  name: "record",
  components: { Breadcrumb },
  props: {},
  data() {
    return {
      path: {
        //面包屑路径
        path: "/record",
        name: "打卡记录",
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
