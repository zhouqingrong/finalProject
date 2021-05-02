<template>
  <div class="EditClassContainer">
    <!-- 编辑admin信息 -->
    <el-dialog
      append-to-body
      :before-close="beforeClose"
      :close-on-click-modal="false"
      :title="'修改' + curDetail.admin_name + '的信息'"
      :visible="visible"
      @update:visible="$emit('update:visible', $event)"
      width="500px"
    >
      <el-form :model="info" label-width="100px" ref="form">
        <el-form-item label="序号" prop="admin_num">
          <el-input :value="info.class_num" disabled style="width: 200px" />
        </el-form-item>
        <el-form-item
          label="学院"
          prop="admin_department"
          :rules="[{ required: true, message: '学院不能为空' }]"
        >
          <el-select
            placeholder="选择学院"
            size="medium"
            style="width: 200px"
            v-model="info.class_department"
          >
            <el-option :value="1" label="信电学院"></el-option>
            <el-option :value="2" label="文法学院"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :rules="[{ required: true, message: '账号不能为空' }]"
          label="账号"
          prop="admin_account"
        >
          <el-input style="width: 200px" v-model="info.admin_account" />
        </el-form-item>
        <el-form-item
          :rules="[{ required: true, message: '姓名不能为空' }]"
          label="姓名"
          prop="admin_name"
        >
          <el-input style="width: 200px" v-model="info.admin_name" />
        </el-form-item>
        <el-form-item
          :rules="[{ required: true, message: '联系方式不能为空' }]"
          label="电话"
          prop="admin_phone"
        >
          <el-input style="width: 200px" v-model="info.admin_phone" />
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
  name: "edit-admin",
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
          class_name: info.class_name,
          class_num: info.class_num,
          class_department: info.class_department,
          class_major: info.class_major,
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
