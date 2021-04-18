<template>
  <el-dialog
    :title="info.student_name + '的学生信息'"
    :visible="visible"
    append-to-body
    @update:visible="$emit('update:visible', $event)"
    width="500px"
  >
    <el-form :model="info" class="form-item-data" label-width="100px">
      <el-form-item label="学生学号" prop="">{{
        info.student_num
      }}</el-form-item>
      <el-form-item label="学生姓名" prop="">{{
        info.student_name
      }}</el-form-item>
      <el-form-item label="学生性别" prop="">{{
        info.student_sex === 1 ? "男" : info.student_sex === 2 ? "女" : ""
      }}</el-form-item>
      <el-form-item label="学院" prop="">{{
        info.student_department
      }}</el-form-item>
      <el-form-item label="班级" prop="">{{ info.student_class }}</el-form-item>
      <!-- info.dorm_id && info.dorm_id.dorm_num -->
      <el-form-item label="宿舍" prop="">{{ info.dorm_num }}</el-form-item>
      <el-form-item label="联系方式" prop="">{{
        info.student_phone
      }}</el-form-item>
      <el-form-item label="地址" prop="">{{
        info.student_address
      }}</el-form-item>
      <el-form-item label="紧急联系人" prop="">{{
        info.student_urgentPhone
      }}</el-form-item>
      <el-form-item label="辅导员" prop="">{{
        info.student_teacher
      }}</el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { resideStatusMap, studyStatusMap } from "@/utils/staticData";

export default {
  name: "student-detail",
  props: {
    info: Object,
    visible: Boolean,
  },
  data() {
    return {};
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
