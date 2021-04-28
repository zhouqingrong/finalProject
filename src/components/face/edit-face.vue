<template>
  <div class="EditFaceContainer">
    <!-- 编辑face信息 -->
    <el-dialog
      append-to-body
      :before-close="beforeClose"
      :close-on-click-modal="false"
      :title="'修改' + curDetail.student_name + '的信息'"
      :visible="visible"
      @update:visible="$emit('update:visible', $event)"
      width="500px"
    >
      <el-form :model="info" label-width="100px" ref="form">
        <el-form-item label="序号" prop="student_num">
          <el-input :value="info.student_num" disabled style="width: 200px" />
        </el-form-item>
        <el-form-item label="姓名" prop="student_name">
          <el-input :value="info.student_name" disabled style="width: 200px" />
        </el-form-item>
        <el-form-item label="人脸" prop="student_face">
          <el-input :value="info.student_face" style="width: 200px" />
        </el-form-item>
        <section class="flex-center">
          <el-button @click="save" type="primary">保存</el-button>
          <el-button @click="closeDialog">取消</el-button>
        </section>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "edit-face",
  components: {},
  props: {
    curDetail: {
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
  computed: {},
  watch: {
    curDetail: {
      handler(value) {
        this.info = _.cloneDeep(value);
      },
      immediate: true,
      deep: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    beforeClose(done) {
      done && done();
    },
    closeDialog() {
      this.$emit("update:visible", false);
      this.beforeClose();
    },
    async save() {
      try {
        await this.$refs.form.validate();
        const info = this.info;
        const form = {
          _id: info._id,
          student_num: info.student_num,
          student_name: info.student_name,
          student_face: info.student_face,
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
};
</script>
<style scoped>
</style>
