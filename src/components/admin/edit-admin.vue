<template>
  <div class="EditClassContainer">
    <!-- 编辑admin信息 -->
    <el-dialog
      append-to-body
      :before-close="beforeClose"
      :close-on-click-modal="false"
      :title="'修改' + curDetail.adminName + '的信息'"
      :visible="visible"
      @update:visible="$emit('update:visible', $event)"
      width="500px"
    >
      <el-form :model="info" label-width="100px" ref="form">
        <el-form-item label="序号" prop="admin_num">
          <el-input :value="info.id" disabled style="width: 200px" />
        </el-form-item>
        <el-form-item
          label="学院"
          prop="department"
          :rules="[{ required: true, message: '学院不能为空' }]"
        >
          <el-select
            placeholder="选择学院"
            size="medium"
            style="width: 200px"
            v-model="info.department"
          >
            <el-option
              :key="item.label"
              :label="item.label"
              :value="item.value"
              v-for="item in department"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :rules="[{ required: true, message: '账号不能为空' }]"
          label="账号"
          prop="account"
        >
          <el-input style="width: 200px" v-model="info.account" />
        </el-form-item>
        <el-form-item
          :rules="[{ required: true, message: '姓名不能为空' }]"
          label="姓名"
          prop="adminName"
        >
          <el-input style="width: 200px" v-model="info.adminName" />
        </el-form-item>
        <el-form-item
          :rules="[{ required: true, message: '联系方式不能为空' }]"
          label="电话"
          prop="phone"
        >
          <el-input style="width: 200px" v-model="info.phone" />
        </el-form-item>
        <el-form-item label="管理的班级" prop="admin_classes">
          <el-cascader
            v-model="info.admin_classes"
            :options="options"
            :props="props"
            clearable
          ></el-cascader>
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
import { departmentMajors } from "@/utils/staticData";
import { schoolAll, updateAdmin } from "@/api/superAdmin";
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
      department: departmentMajors,
      props: { multiple: true },
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
    beforeClose(done) {
      done && done();
    },
    closeDialog() {
      this.$emit("update:visible", false);
      this.beforeClose();
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const info = this.info;
          let classIds = [];
          for (let i = 0; i < info.admin_classes.length; i++) {
            classIds.push(info.admin_classes[i][2]);
          }
          const data = {
            account: info.account,
            adminName: info.adminName,
            classIds: classIds,
            department: info.department,
            id: info.id,
            //password: info,
            phone: info.phone,
          };
          updateAdmin(data)
            .then((res) => {
              this.$message.success("修改成功");
              this.$emit("update");
              this.closeDialog();
            })
            .catch((err) => {
              this.$message.error("修改失败");
              console.log("管理员修改失败err", err);
            });
        }
      });
    },
  },
};
</script>
<style scoped>
</style>
