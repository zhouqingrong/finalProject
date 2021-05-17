<template>
  <el-dialog
    :title="info.username + '近7天的打卡记录'"
    :visible="visible"
    append-to-body
    @update:visible="$emit('update:visible', $event)"
    width="500px"
  >
    <!-- <div v-for="(day,index) in days" :key="index">
      <span>{{ day }}</span>
      <span>{{info.records[index] != null ? info.records[index].recordTimeFormat : '未打卡'}}</span>
    </div> -->
    <el-table :data="info.records">
      <el-table-column label="日期">
        <template #default="scope">{{days[scope.$index]}}</template>
      </el-table-column>
      <el-table-column :formatter="statusFormatter" label="状态" width="120px"/>
      <el-table-column :formatter="timeFormatter" label="打卡时间" />
    </el-table>
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
  methods: {
    statusFormatter(row, column, val) {
      if (row == null) {
        return "未打卡";
      }
      return "已打卡";
    },
    timeFormatter(row, column, val) {
      if (row == null) {
        return "---"
      } 
      return row.recordTimeFormat;
    },
    initDate() {
      let now = new Date();
      let days = [];
      for (let i = 0; i < 7; i++) {
        let date = new Date();
        date.setDate(now.getDate() - i);
        days.push(date.toLocaleString());
      }
      this.days = days;
    },
  },
  created() {
    this.initDate();
  },
  data() {
    return {
      days: [],
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
