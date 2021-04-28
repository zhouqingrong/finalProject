<template>
  <div class="EditDormitoryContainer">
    <!-- 编辑班级信息 -->
    <el-dialog
      append-to-body
      :before-close="beforeClose"
      :close-on-click-modal="false"
      :title="'修改' + curDetail.dormitory_name + '的信息'"
      :visible="visible"
      @update:visible="$emit('update:visible', $event)"
      width="500px"
    >
      <el-form :model="info" label-width="100px" ref="form">
        <el-form-item label="序号" prop="dormitory_num">
          <el-input :value="info.dormitory_num" disabled style="width: 200px" />
        </el-form-item>
        <el-form-item
          label="社区"
          prop="dormitory_community"
          :rules="[{ required: true, message: '社区不能为空' }]"
        >
          <el-select
            placeholder="选择社区"
            size="medium"
            style="width: 200px"
            v-model="info.dormitory_community"
          >
            <el-option :value="1" label="1社区"></el-option>
            <el-option :value="2" label="2社区"></el-option>
            <el-option :value="3" label="3社区"></el-option>
            <el-option :value="4" label="4社区"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :rules="[{ required: true, message: '宿舍不能为空' }]"
          label="宿舍"
          prop="dormitory_name"
        >
          <el-input style="width: 200px" v-model="info.dormitory_name" />
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
  name: "edit-dormitory",
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
          dormitory_name: info.dormitory_name,
          dormitory_num: info.dormitory_num,
          dormitory_community: info.dormitory_community,
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
