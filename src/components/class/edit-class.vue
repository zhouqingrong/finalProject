<template>
  <div class="EditClassContainer">
    <!-- 编辑班级信息 -->
    <el-dialog
      append-to-body
      :before-close="beforeClose"
      :close-on-click-modal="false"
      :title="'修改' + curDetail.className + '的信息'"
      :visible="visible"
      @update:visible="$emit('update:visible', $event)"
      width="500px"
    >
      <el-form :model="info" label-width="100px" ref="form">
        <el-form-item label="序号" prop="id">
          <el-input :value="info.id" disabled style="width: 200px" />
        </el-form-item>
        <!-- <el-form-item
          label="学院"
          prop="departmentName"
          :rules="[{ required: true, message: '学院不能为空' }]"
        >
          <el-select
            placeholder="选择学院"
            size="medium"
            style="width: 200px"
            v-model="info.departmentName"
          >
            <el-option :value="1" label="信电学院"></el-option>
            <el-option :value="2" label="文法学院"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item
          :rules="[{ required: true, message: '学院专业不能为空' }]"
          label="学院专业"
          prop="departmentMajor"
        >
          <el-cascader
            v-model="info.departmentMajor"
            :options="options"
          ></el-cascader>
          <!-- <el-input style="width: 200px" v-model="info.majorName" /> -->
        </el-form-item>
        <el-form-item
          :rules="[{ required: true, message: '班级不能为空' }]"
          label="班级"
          prop="classNo"
        >
          <el-input style="width: 200px" v-model="info.classNo" />
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
import { updateClass } from "@/api/superAdmin.js";
import { departmentMajors } from "@/utils/staticData.js";
export default {
  name: "edit-class",
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
      options: departmentMajors,
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
    // 修改 调接口

    async save() {
      try {
        await this.$refs.form.validate();
        const info = this.info;
        const data = {
          id: info.id,
          classNo: info.classNo,
          departmentName: info.departmentMajor[0],
          majorName: info.departmentMajor[1],
        };
        updateClass(data)
          .then((res) => {
            console.log("编辑班级res", res);
            this.$message.success("修改班级成功");
            // 关闭dialog
            this.closeDialog();
            //更新
            this.$emit("update");
          })
          .catch((err) => {
            this.$message.error("修改班级失败");
            this.info = JSON.parse(JSON.stringify(this.curDetail));
            console.log("编辑班级err", err);
          });
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
