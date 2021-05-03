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
        <el-input placeholder="请输入账号" style="width: 200px" v-model="form.admin_account" />
      </el-form-item>
      <el-form-item label="姓名：" prop="admin_name">
        <el-input placeholder="请输入姓名" style="width: 200px" v-model="form.admin_name" />
      </el-form-item>
      <el-form-item label="性别：" prop="admin_sex">
        <el-select placeholder="全部" size="medium" style="width: 100px" v-model="form.admin_sex">
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
          <!-- <el-option :value="1" label="信电学院">信电学院</el-option>
          <el-option :value="2" label="机械学院">机械学院</el-option>
          <el-option :value="3" label="材料学院">材料学院</el-option>
          <el-option :value="4" label="土木学院">土木学院</el-option>-->
          <el-option
            :key="item.label"
            :label="item.label"
            :value="item.value"
            v-for="item in department"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="管理的班级" prop="admin_classes">
        <el-cascader v-model="form.admin_classes" :options="options" :props="props" clearable></el-cascader>
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
import { schoolAll, addAdmin } from "@/api/superAdmin";
import { departmentMajors } from "@/utils/staticData";
const initForm = function () {
  return {
    admin_num: "",
    admin_password: "",
    admin_name: "",
    admin_sex: 1,
    admin_department: "",
    admin_phone: "",
    admin_account: "",
    //管理的班级
    admin_classes: [],
  };
};
export default {
  name: "add-admin",
  props: {
    visible: Boolean,
  },
  data() {
    return {
      props: { multiple: true },
      form: initForm(),
      options: {},
      department: departmentMajors,
      rules: {
        admin_account: [{ required: true, message: "账号不能为空" }],
        admin_password: [{ required: true, message: "密码不能为空" }],
        admin_name: [{ required: true, message: "姓名不能为空" }],
        admin_department: [{ required: true, message: "学院不能为空" }],
        admin_phone: [{ required: true, message: "联系方式不能为空" }],
      },
    };
  },
  mounted() {
    this.initOptions();
  },
  methods: {
    initOptions() {
      schoolAll()
        .then((res) => {
          this.options = res.data.data.options;
          console.log("搜索的级联班级数据res", res);
        })
        .catch((err) => {
          console.log("搜索的级联班级数据err", err);
        });
    },
    closeDialog() {
      this.$emit("update:visible", false);
    },
    onClose() {
      this.form = initForm();
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let classIds = [];
          for (let i = 0; i < this.form.admin_classes.length; i++) {
            classIds.push(this.form.admin_classes[i][2]);
          }
          console.log("form========", this.form);
          let data = {
            account: this.form.admin_account,
            teacherNo: this.form.admin_account,
            adminName: this.form.admin_name,
            department: this.form.admin_department,
            password: this.form.admin_account,
            phone: this.form.admin_phone,
            classIds: classIds,
          };
          addAdmin(data)
            .then((res) => {
              this.$message.success("添加管理员成功");
              this.$emit("update");
              this.closeDialog();
            })
            .catch((err) => {
              this.$message.error("添加管理员失败");
              console.log("添加管理员失败err", err);
            });
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
