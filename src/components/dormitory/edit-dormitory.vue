<template>
  <div class="EditDormitoryContainer">
    <!-- 编辑班级信息 -->
    <el-dialog
      append-to-body
      :before-close="beforeClose"
      :close-on-click-modal="false"
      :title="'修改' + curDetail.roomName + '的信息'"
      :visible="visible"
      @update:visible="$emit('update:visible', $event)"
      width="500px"
    >
      <el-form :model="info" label-width="100px" ref="form">
        <el-form-item label="序号" prop="id">
          <el-input :value="info.id" disabled style="width: 200px" />
        </el-form-item>
        <el-form-item label="社区" prop="community" :rules="[{ required: true, message: '社区不能为空' }]">
          <el-select placeholder="选择社区" size="medium" style="width: 200px" v-model="info.community">
            <el-option
              :key="item._id"
              :label="item.name"
              :value="item.name"
              v-for="item in options.community"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="楼栋"
          prop="building"
          :rules="[
                { required: true, message: '楼栋不能为空' },
              ]"
        >
          <el-select placeholder="请选择楼栋" size="medium" style="width: 130px" v-model="info.building">
            <el-option
              :key="item._id"
              :label="item.name"
              :value="item.name"
              v-for="item in options.building"
            />
          </el-select>
        </el-form-item>
        <el-form-item :rules="[{ required: true, message: '宿舍不能为空' }]" label="宿舍" prop="roomNo">
          <el-input style="width: 200px" v-model="info.roomNo" />
        </el-form-item>
        <el-form-item
          :rules="[{ required: true,message: '可住人数不能为空' },{
            validator: checkCapacity
          }]"
          label="可住人数"
          prop="capacity"
        >
          <!-- <el-input style="width: 200px" v-model.number="info.capacity" /> -->
          <el-input-number
            :min="0"
            :max="10"
            :step="1"
            controls-position="right"
            size="medium"
            style="width: 100px;"
            v-model.number="info.capacity"
          />
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
import { updateDormitory } from "@/api/superAdmin";
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
      options: {
        community: [
          {
            _id: "1",
            name: "1",
          },
          {
            _id: "2",
            name: "2",
          },
          {
            _id: "3",
            name: "3",
          },
          {
            _id: "4",
            name: "4",
          },
        ],
        building: [
          {
            _id: 1,
            name: "A",
          },
          {
            _id: 2,
            name: "B",
          },
          {
            _id: 3,
            name: "C",
          },
        ],
      },
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
    //检查修改人数不得小于已入住人数
    checkCapacity(rule, value, callback) {
      if (value < this.info.students.length) {
        callback(new Error("不得小于已入住人数"));
      }
      callback();
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
          const data = {
            id: info.id,
            community: info.community,
            building: info.building,
            roomNo: info.roomNo,
          };
          updateDormitory(data)
            .then((res) => {
              this.$message.success("修改成功");
              this.$emit("update");
              this.closeDialog();
            })
            .catch((err) => {
              this.$message.error("修改失败");
              console.log("宿舍修改失败err", err);
            });
        }
      });
    },
  },
};
</script>
<style scoped>
</style>
