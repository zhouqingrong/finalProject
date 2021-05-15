<template>
  <el-dialog
    :title="info.username + '近7天的打卡记录'"
    :visible="visible"
    append-to-body
    @update:visible="$emit('update:visible', $event)"
    width="500px"
  >
    <div>{{ lastDay }}</div>
  </el-dialog>
</template>

<script>
import { resideStatusMap } from "@/utils/staticData";

export default {
  name: "records-detail",
  props: {
    info: Object,
    visible: Boolean,
  },
  data() {
    return {
      lastDay: new Date().toLocaleString(),
    };
  },
  filters: {
    resideConvert(v) {
      return resideStatusMap.get(v);
    },
  },
};
</script>

<style scoped>
</style>
