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
    <el-form
      :model="form"
      :rules="rules"
      label-width="120px"
      ref="form"
      status-icon
    >
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
      <el-form-item label="班级：" prop="student_class">
        <el-cascader
          placeholder="请输入班级"
          v-model="form.student_class"
          :options="options"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="联系方式：" prop="student_phone">
        <el-input
          placeholder="请输入联系方式"
          style="width: 200px"
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
    </el-form>
    <template #footer>
      <div class="text-center">
        <el-button @click="addStudent" type="primary">提交</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import {
  getDepartments,
  getClasses,
  getDormitories,
  addStudents,
  schoolAll,
} from "@/api/superAdmin.js";
const initForm = function () {
  return {
    student_num: "",
    student_name: "",
    student_sex: 1,
    student_class: [],
    class_id: 0, //用于后端传值
    student_address: "",
    student_phone: "",
    student_urgentPhone: "",
  };
};
export default {
  name: "add-student",
  props: {
    visible: Boolean,
  },
  data() {
    // 班级校验规则
    var checkClass = (rule, value, callback) => {
      console.log("====", value);
      if (value === []) {
        callback(new Error("请输入班级"));
        return;
      }
      callback();
    };
    return {
      form: initForm(),
      options: [],
      rules: {
        student_num: [
          { required: true, message: "学号不能为空", trigger: "blur" },
          {
            pattern: /[0|1|2|3|4|5|6|7|8|9]\d{8}$/,
            message: "请输入正确学号格式",
          },
        ],
        student_name: [{ required: true, message: "姓名不能为空" }],
        student_class: [
          { required: true, message: "班级不能为空" },
          { validator: checkClass, trigger: "blur" },
        ],
        student_urgentPhone: [
          { required: true, message: "紧急联系人不能为空", trigger: "blur" },
          {
            pattern: /[0|1|2|3|4|5|6|7|8|9]\d{10}$/,
            message: "请输入正确电话格式",
          },
        ],
        student_phone: [
          { required: true, message: "联系方式不能为空", trigger: "blur" },
          {
            pattern: /[0|1|2|3|4|5|6|7|8|9]\d{10}$/,
            message: "请输入正确电话格式",
          },
        ],
      },
      departments: [], //用于存放后端查询得到的学院
    };
  },
  created() {},
  mounted() {
    this.initOptions();
  },

  methods: {
    // 搜索的级联班级数据
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
    //校验班级
    // // 获取学院
    // initDepartment() {
    //   let data = {};
    //   data.pageNo = 1;
    //   data.pageSize = 50;
    //   getDepartments(data)
    //     .then((res) => {
    //       console.log("获取学院", res);
    //       this.departments = res.data.data.departments;
    //     })
    //     .catch((err) => {
    //       console.log("获取学院err", err);
    //       this.$message.error("获取失败");
    //     });
    // },
    // 关闭窗口，给父组件传值
    closeDialog() {
      this.$emit("update:visible", false);
    },
    // dialog关闭回调
    onClose() {
      this.form = initForm();
    },
    //添加学生
    addStudent() {
      let data = [
        {
          address: this.form.student_address,
          classId: this.form.student_class[2], //班级（级联选择）
          phone: this.form.student_phone,
          role: 1, //默认都是普通学生
          sex: this.form.student_sex,
          stuNo: this.form.student_num,
          urgentPhone: this.form.student_urgentPhone,
          username: this.form.student_name,
        },
      ];
      // 带封装数据
      addStudents(data)
        .then((res) => {
          this.$message.success("学生添加成功");
          console.log("添加学生res：", res);
          // 关闭表单
          this.closeDialog();
          // 刷新
          this.$emit("update");
        })
        .catch((err) => {
          console.log("添加学生err:", err);
          this.$message.error("添加失败");
        });
      // try {
      //   await this.$refs.form.validate();
      //   this.request.post("/api/student/insert", this.form).then((res) => {
      //     if (!res.data.errcode) {
      //       this.$alert("添加成功！", "提示", { type: "success" });
      //       this.closeDialog();
      //       this.$emit("update");
      //     } else {
      //       this.$alert(res.data.msg, "错误", { type: "error" });
      //     }
      //   });
      // } catch (e) {
      //   return false;
      // }
    },
  },
};
</script>
<style scoped>
</style>
