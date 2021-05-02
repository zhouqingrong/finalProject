<template>
  <!-- 编辑学生信息 -->
  <el-dialog
    append-to-body
    :before-close="beforeClose"
    :close-on-click-modal="false"
    :title="'修改' + curStudentDetail.username + '的学生信息'"
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    width="500px"
  >
    <el-form :model="info" label-width="100px" ref="form">
      <el-form-item label="学号" prop="stuNo">
        <el-input :value="info.stuNo" disabled style="width: 200px" />
      </el-form-item>
      <el-form-item :rules="[{ required: true, message: '姓名不能为空' }]" label="姓名" prop="username">
        <el-input style="width: 200px" v-model="info.username" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select placeholder="全部" size="medium" style="width: 100px" v-model="info.sex">
          <el-option :value="1" label="男"></el-option>
          <el-option :value="2" label="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :rules="[{ required: true, message: '班级不能为空' }]" label="班级" prop="studentClass">
        <el-cascader placeholder="请输入班级" v-model="info.studentClass" :options="options"></el-cascader>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input style="width: 200px" v-model="info.phone" />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input style="width: 200px" v-model="info.address" />
      </el-form-item>
      <el-form-item label="紧急联系人" prop="urgentPhone">
        <el-input style="width: 200px" v-model="info.urgentPhone" />
      </el-form-item>
      <!-- <el-form-item label="辅导员" prop="student_teacher">
        <el-input style="width: 200px" v-model="info.student_teacher" />
      </el-form-item>-->
      <section class="flex-center">
        <el-button @click="saveStudent" type="primary">保存</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </section>
    </el-form>
  </el-dialog>
</template>

<script>
// import _ from "lodash/lang";
import { schoolAll, updateStudent } from "@/api/superAdmin.js";
export default {
  name: "edit-student",
  props: {
    curStudentDetail: {
      type: Object,
      default: () => {},
    },
    visible: Boolean,
  },
  data() {
    return {
      info: {},
      options: [],
    };
  },
  mounted() {
    this.initOptions();
  },
  methods: {
    // 级联班级数据
    initOptions() {
      schoolAll()
        .then((res) => {
          this.options = res.data.data.options;
          // // 获取下拉栏数据options，因为options的数据必须先有，curDetail的班级数据才会显示，所以在获取完
          // //options数据之后要把info的数据重新赋值，以下是一个深拷贝
          // this.info = JSON.parse(JSON.stringify(this.curStudentDetail));
          console.log("搜索的级联班级数据res", res);
        })
        .catch((err) => {
          console.log("搜索的级联班级数据err", err);
        });
    },
    beforeClose(done) {
      done && done();
    },
    closeDialog() {
      this.$emit("update:visible", false);
      this.beforeClose();
    },
    saveStudent() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let data = {
            address: this.info.address,
            classId: this.info.studentClass[2], //班级（级联选择）1702的id
            phone: this.info.phone,
            sex: this.info.sex,
            stuNo: this.info.stuNo,
            urgentPhone: this.info.urgentPhone,
            username: this.info.username,
            id: this.info.id,
          };
          updateStudent(data)
            .then((res) => {
              console.log("修改学生res", res);
              this.closeDialog();
              this.$emit("update");
              this.$message.success("修改学生信息成功");
            })
            .catch((err) => {
              console.log("修改学生err", err);
              this.$message.error("修改学生失败");
            });
        }
      });
    },
  },
  watch: {
    curStudentDetail: {
      handler(value) {
        this.info = _.cloneDeep(value);
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style  scoped>
</style>
