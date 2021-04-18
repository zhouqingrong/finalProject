<template>
  <!-- 编辑学生信息 -->
  <el-dialog
    append-to-body
    :before-close="beforeClose"
    :close-on-click-modal="false"
    :title="'修改' + curStudentDetail.student_name + '的学生信息'"
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    width="500px"
  >
    <el-form :model="info" label-width="100px" ref="form">
      <el-form-item label="学号" prop="student_num">
        <el-input :value="info.student_num" disabled style="width: 200px" />
      </el-form-item>
      <el-form-item
        :rules="[{ required: true, message: '姓名不能为空' }]"
        label="姓名"
        prop="student_name"
      >
        <el-input style="width: 200px" v-model="info.student_name" />
      </el-form-item>
      <el-form-item label="性别" prop="student_sex">
        <el-select
          placeholder="全部"
          size="medium"
          style="width: 100px"
          v-model="info.student_sex"
        >
          <el-option :value="1" label="男"></el-option>
          <el-option :value="2" label="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        :rules="[{ required: true, message: '学院不能为空' }]"
        label="学院"
        prop="student_department"
      >
        <el-input style="width: 200px" v-model="info.student_department" />
      </el-form-item>
      <el-form-item
        :rules="[{ required: true, message: '班级不能为空' }]"
        label="班级"
        prop="student_class"
      >
        <el-input style="width: 200px" v-model="info.student_class" />
      </el-form-item>
      <el-form-item label="宿舍" prop="dorm_num">
        <el-input style="width: 200px" v-model="info.dorm_num" />
      </el-form-item>
      <el-form-item label="联系方式" prop="student_phone">
        <el-input style="width: 200px" v-model="info.student_phone" />
      </el-form-item>
      <el-form-item label="地址" prop="student_address">
        <el-input style="width: 200px" v-model="info.student_address" />
      </el-form-item>
      <el-form-item label="紧急联系人" prop="student_urgentPhone">
        <el-input style="width: 200px" v-model="info.student_urgentPhone" />
      </el-form-item>
      <el-form-item label="辅导员" prop="student_teacher">
        <el-input style="width: 200px" v-model="info.student_teacher" />
      </el-form-item>
      <!-- <el-form-item label="入学日期" prop="enroll_date">
        <el-date-picker
          placeholder="选择日期"
          type="date"
          v-model="info.enroll_date"
          value-format="yyyy-MM-dd"
        />
      </el-form-item> -->
      <section class="flex-center">
        <el-button @click="saveStudent" type="primary">保存</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </section>
    </el-form>
  </el-dialog>
</template>

<script>
// import _ from "lodash/lang";

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
    };
  },
  methods: {
    beforeClose(done) {
      done && done();
    },
    closeDialog() {
      this.$emit("update:visible", false);
      this.beforeClose();
    },
    async saveStudent() {
      try {
        await this.$refs.form.validate();
        const info = this.info;
        const form = {
          _id: info._id,
          student_name: info.student_name,
          student_sex: info.student_sex,
          student_department: info.student_department,
          student_class: info.student_class,
          dorm_num: info.dorm_num,
          student_phone: info.student_phone,
          student_address: info.student_address,
          student_urgentPhone: info.student_urgentPhone,
          student_teacher: student_teacher,
        };
        // 掉修改学生信息接口
        // this.request.post("/api/student/updateOneById", form).then((res) => {
        //   if (!res.data.errcode) {
        //     this.$alert("修改成功！", "提示", { type: "success" });
        //     this.closeDialog();
        //     this.$emit("update");
        //   } else {
        //     this.$alert(res.data.msg, "错误", { type: "error" });
        //   }
        // });
      } catch (e) {
        return false;
      }
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
