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
      <el-form-item label="学院：" prop="student_department">
        <el-select
          placeholder="请选择学院"
          size="medium"
          style="width: 200px"
          v-model="form.student_department"
        >
          <el-option
            :key="item.id"
            :label="item.departmentName"
            :value="item.id"
            v-for="item in departments"
          />
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
      <el-form-item label="宿舍：" prop="student_dormitory ">
        <el-input
          placeholder="请输入宿舍"
          style="width: 200px"
          controls-position="right"
          v-model="form.student_dormitory"
        />
      </el-form-item>
      <el-form-item label="联系方式：" prop="student_phone ">
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
import {
  getDepartments,
  getClasses,
  getDormitories,
} from "@/api/superAdmin.js";
const initForm = function () {
  return {
    student_num: "",
    student_name: "",
    student_sex: 1,
    student_department: "",
    student_class: "",
    student_dormitory: "",
    class_id: 0, //用于后端传值
    dormitory_id: 0, //用于后端传值
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
    var checkClass = (rule, value, callback) => {
      console.log("====", value);
      if (value === "") {
        callback(new Error("请输入班级"));
        return;
      }
      // 这里是按班级名完全正确进行查询校验
      let data = {};
      data["className"] = value;
      getClasses(data)
        .then((res) => {
          if (res.data.data.classes.length == 0) {
            callback(new Error("无此班级"));
          } else {
            this.form.class_id = res.data.data.classes[0].id;
            callback();
          }
          console.log("获取班级res", res);
        })
        .catch((err) => {
          callback(new Error("无此班级"));
        });
    };
    var checkDormitories = (rule, value, callback) => {
      console.log("====", value);
      if (value === "") {
        callback(new Error("请输入宿舍"));
        return;
      }
      // 这里是按宿舍名完全正确进行查询校验
      let data = {};
      data["roomName"] = value;
      getDormitories(data)
        .then((res) => {
          if (res.data.data.dormitories.length == 0) {
            callback(new Error("无此宿舍"));
          } else {
            this.form.dormitory_id = res.data.data.dormitories[0].id;
            callback();
          }
          console.log("获取宿舍res", res);
        })
        .catch((err) => {
          callback(new Error("无此宿舍"));
        });
    };
    return {
      form: initForm(),
      rules: {
        student_num: [
          { required: true, message: "学号不能为空" },
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
        student_dormitory: [
          { required: true, message: "宿舍不能为空" },
          { validator: checkDormitories, trigger: "blur" },
        ],
        student_department: [{ required: true, message: "学院不能为空" }],
        student_urgentPhone: [
          { required: true, message: "紧急联系人不能为空", trigger: "change" },
          {
            pattern: /[0|1|2|3|4|5|6|7|8|9]\d{10}$/,
            message: "请输入正确电话格式",
          },
        ],
        student_phone: [
          { required: true, message: "联系方式不能为空", trigger: "change" },
          {
            pattern: /[0|1|2|3|4|5|6|7|8|9]\d{10}$/,
            message: "请输入正确电话格式",
          },
        ],
      },
      departments: [],
    };
  },
  created() {
    this.initDepartment();
  },
  mounted() {},
  methods: {
    //校验班级
    // 获取学院
    initDepartment() {
      let data = {};
      data.pageNo = 1;
      data.pageSize = 50;
      getDepartments(data)
        .then((res) => {
          console.log("获取学院", res);
          this.departments = res.data.data.departments;
        })
        .catch((err) => {
          console.log("获取学院err", err);
          this.$message.error("获取失败");
        });
    },
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
