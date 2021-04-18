<template>
  <!-- 添加学生 -->
  <el-dialog
    :visible="visible"
    @close="onClose"
    append-to-body
    @update:visible="$emit('update:visible', $event)"
    destroy-on-close
    :close-on-click-modal="false"
    title="添加学生"
    width="500px"
  >
    <el-form :model="form" :rules="rules" label-width="120px" ref="form">
      <el-form-item label="学号：" prop="student_num">
        <el-input
          placeholder="请输入学号"
          style="width: 200px"
          v-model="form.student_num"
        />
      </el-form-item>
      <el-form-item label="姓名：" prop="student_name">
        <el-input
          placeholder="请输入姓名"
          style="width: 200px"
          v-model="form.student_name"
        />
      </el-form-item>
      <el-form-item label="性别：" prop="student_sex">
        <el-select
          placeholder="全部"
          size="medium"
          style="width: 100px"
          v-model="form.student_sex"
        >
          <el-option :value="1" label="男"></el-option>
          <el-option :value="2" label="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学院：" prop="student_department">
        <el-select
          placeholder="请选择学院"
          size="medium"
          style="width: 200px"
          v-model="form.student_department"
        >
          <el-option :value="1" label="信电学院">信电学院</el-option>
          <el-option :value="2" label="机械学院">机械学院</el-option>
          <el-option :value="3" label="材料学院">材料学院</el-option>
          <el-option :value="4" label="土木学院">土木学院</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级：" prop="student_class">
        <el-input
          placeholder="请输入班级"
          style="width: 200px"
          controls-position="right"
          v-model="form.student_class"
        />
      </el-form-item>
      <el-form-item label="宿舍：" prop="dorm_num ">
        <el-input
          placeholder="请输入宿舍"
          style="width: 200px"
          controls-position="right"
          v-model="form.dorm_num"
        />
      </el-form-item>
      <el-form-item label="联系方式：" prop="student_phone ">
        <el-input
          placeholder="请输入联系方式"
          style="width: 200px"
          controls-position="right"
          v-model="form.student_phone"
        />
      </el-form-item>
      <el-form-item label="地址：" prop="student_address">
        <el-input
          type="textarea"
          placeholder="请输入地址"
          style="width: 200px"
          v-model="form.student_address"
        />
      </el-form-item>
      <el-form-item label="紧急联系人：" prop="student_urgentPhone">
        <el-input
          placeholder="请输入紧急联系人"
          style="width: 200px"
          v-model="form.student_urgentPhone"
        />
      </el-form-item>
      <!-- <el-form-item label="辅导员：" prop="student_teacher">
        <el-input
          placeholder="请输入辅导员："
          style="width: 200px"
          v-model="form.student_teacher"
        />
      </el-form-item> -->
    </el-form>
    <template #footer>
      <div class="text-center">
        <el-button @click="submit" type="primary">提交</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
const initForm = function () {
  return {
    student_num: "",
    student_password: "",
    student_name: "",
    student_sex: 1,
    student_class: "",
    student_address: "",
    student_major: "",
    enroll_date: "",
    study_status: 1,
  };
};
export default {
  name: "add-student",
  props: {
    visible: Boolean,
  },
  data() {
    return {
      form: initForm(),
      rules: {
        student_num: [{ required: true, message: "学号不能为空" }],
        student_name: [{ required: true, message: "姓名不能为空" }],
        student_class: [{ required: true, message: "班级不能为空" }],
        student_department: [{ required: true, message: "学院不能为空" }],
        student_urgentPhone: [
          { required: true, message: "紧急联系人不能为空" },
        ],
        student_phone: [{ required: true, message: "联系方式不能为空" }],
      },
    };
  },
  methods: {
    closeDialog() {
      this.$emit("update:visible", false);
    },
    onClose() {
      this.form = initForm();
    },
    async submit() {
      try {
        await this.$refs.form.validate();
        this.request.post("/api/student/insert", this.form).then((res) => {
          if (!res.data.errcode) {
            this.$alert("添加成功！", "提示", { type: "success" });
            this.closeDialog();
            this.$emit("update");
          } else {
            this.$alert(res.data.msg, "错误", { type: "error" });
          }
        });
      } catch (e) {
        return false;
      }
    },
  },
};
</script>

<style scoped>
</style>
