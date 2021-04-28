<template>
  <!-- 添加admin -->
  <el-dialog
    :visible="visible"
    @close="onClose"
    append-to-body
    @update:visible="$emit('update:visible', $event)"
    destroy-on-close
    :close-on-click-modal="false"
    title="添加管理员"
    width="500px"
  >
    <el-form :model="form" :rules="rules" label-width="120px" ref="form">
      <el-form-item label="账号：" prop="admin_account">
        <el-input
          placeholder="请输入账号"
          style="width: 200px"
          v-model="form.admin_account"
        />
      </el-form-item>
      <el-form-item label="姓名：" prop="admin_name">
        <el-input
          placeholder="请输入姓名"
          style="width: 200px"
          v-model="form.admin_name"
        />
      </el-form-item>
      <el-form-item label="性别：" prop="admin_sex">
        <el-select
          placeholder="全部"
          size="medium"
          style="width: 100px"
          v-model="form.admin_sex"
        >
          <el-option :value="1" label="男"></el-option>
          <el-option :value="2" label="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学院：" prop="admin_department">
        <el-select
          placeholder="请选择学院"
          size="medium"
          style="width: 200px"
          v-model="form.admin_department"
        >
          <el-option :value="1" label="信电学院">信电学院</el-option>
          <el-option :value="2" label="机械学院">机械学院</el-option>
          <el-option :value="3" label="材料学院">材料学院</el-option>
          <el-option :value="4" label="土木学院">土木学院</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系方式：" prop="admin_phone ">
        <el-input
          placeholder="请输入联系方式"
          style="width: 200px"
          controls-position="right"
          v-model="form.admin_phone"
        />
      </el-form-item>
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
    admin_num: "",
    admin_password: "",
    admin_name: "",
    admin_sex: 1,
    admin_department: "",
    admin_phone: "",
    admin_account: "",
  };
};
export default {
  name: "add-admin",
  props: {
    visible: Boolean,
  },
  data() {
    return {
      form: initForm(),
      rules: {
        admin_account: [{ required: true, message: "账号不能为空" }],
        admin_password: [{ required: true, message: "密码不能为空" }],
        admin_name: [{ required: true, message: "姓名不能为空" }],
        admin_department: [{ required: true, message: "学院不能为空" }],
        admin_phone: [{ required: true, message: "联系方式不能为空" }],
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
