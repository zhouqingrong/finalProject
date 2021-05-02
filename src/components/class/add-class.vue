<template>
  <div>
    <!-- 添加班级-->
    <el-dialog
      :before-close="beforeClose"
      append-to-body
      :close-on-click-modal="false"
      :visible="visible"
      @update:visible="$emit('update:visible', $event)"
      title="新增班级"
      width="850px"
    >
      <el-form :model="form" inline ref="form">
        <div class="dialog-container">
          <section :key="i.class_num" v-for="(i, index) in form.class">
            <el-form-item
              :prop="'class.' + index + '.class_department'"
              :rules="[
                {
                  required: true,
                  message: '请选择学院专业',
                  trigger: 'change',
                },
              ]"
              label="学院专业"
              label-width="90px"
            >
              <el-cascader v-model="i.class_department" :options="options"></el-cascader>

              <!-- <el-select
                placeholder="请选择学院"
                size="medium"
                style="width: 130px"
                v-model="i.class_department"
              >
                <el-option
                  :key="item._id"
                  :label="item.department"
                  :value="item.department"
                  v-for="item in options.departments"
                />
              </el-select>-->
            </el-form-item>

            <el-form-item
              :prop="'class.' + index + '.class_no'"
              :rules="[
                { required: true, message: '请输入班级' }, //可以限制数字、4位
                // { validator: checkUniqueNum },//需要校验是不是已存在
              ]"
              label="班级"
            >
              <el-input
                placeholder="例如：1702"
                size="medium"
                style="width: 120px"
                v-model="i.class_no"
              />
            </el-form-item>

            <el-form-item>
              <el-button
                :disabled="form.class.length === 1"
                @click="del(index)"
                circle
                icon="el-icon-minus"
                plain
                size="mini"
                type="danger"
              />
              <el-button
                @click="add(index)"
                circle
                icon="el-icon-plus"
                plain
                size="mini"
                type="primary"
              />
            </el-form-item>
            <!-- <el-form-item v-if="getDormNum(dorm.building_num, dorm.house_num)">
              <p class="tip-small">
                宿舍号：{{ getDormNum(dorm.building_num, dorm.house_num) }}
              </p>
            </el-form-item>-->
          </section>
        </div>
      </el-form>
      <template #footer>
        <!-- 一键设置 -->
        <el-form :model="quickForm" class="text-left" inline>
          <el-form-item label="快速设置：" label-width="90px" />
          <el-form-item prop="class_department_active">
            <el-checkbox v-model="quickForm.class_department_active">学院专业</el-checkbox>
          </el-form-item>
          <el-form-item prop="class_department">
            <el-cascader
              v-model="quickForm.class_department"
              :options="options"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button @click="quickSet" size="small" type="primary">一键设置</el-button>
          </el-form-item>
        </el-form>
        <!-- 一键设置结束 -->
        <section class="flex-center">
          <el-button @click="submit" type="primary">确认添加</el-button>
          <el-button @click="closeDialog">取消</el-button>
        </section>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { addClass } from "@/api/superAdmin.js";
import { departmentMajors } from "@/utils/staticData.js";
class Item {
  constructor() {
    this.class_department = [];
    this.class_no = "";
    this.class_num = "" + Math.random() * Date.now();
  }
}

export default {
  name: "add-class",
  props: {
    visible: Boolean,
  },
  data() {
    return {
      value: "",
      form: {
        class: [new Item()],
      },
      options: departmentMajors, //学院专业
      isShowErrDialog: false,
      errList: [],
      quickForm: {
        class_department_active: true,
        class_department: [],
      },
    };
  },
  methods: {
    // 改变学院专业级联
    handleChange(value) {
      console.log("改变学院专业级联", value);
    },

    // departmentChange(value) {
    //   console.log("departmentChange==", value);
    // },
    add(index) {
      this.form.class.splice(index + 1, 0, new Item());
    },
    del(index) {
      this.form.class.splice(index, 1);
    },
    closeDialog() {
      this.$emit("update:visible", false);
      this.beforeClose();
    },
    beforeClose(done) {
      this.form.class = [new Item()];
      done && done();
    },
    // getDormNum(building_num, house_num) {
    //   if (!building_num || !house_num) {
    //     return null;
    //   }
    //   return building_num + "#" + house_num;
    // },
    // checkUniqueNum(rule, value, callback) {
    //   const curIndex = rule.field.split(".")[1] * 1;
    //   const curDorm = this.form.dorms[curIndex];
    //   const curHouseNum = curDorm.house_num;
    //   const curBuildingNum = curDorm.building_num;

    //   const findRes = this.form.dorms.findIndex((item, index) => {
    //     if (!item.building_num || !item.house_num || curIndex === index) {
    //       return false;
    //     }
    //     return (
    //       curHouseNum === item.house_num && curBuildingNum === item.building_num
    //     );
    //   });
    //   if (findRes !== -1) {
    //     callback("宿舍号重复");
    //   } else {
    //     callback();
    //   }
    // },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let data = [];
          for (let i = 0; i < this.form.class.length; i++) {
            data.push({
              classNo: this.form.class[i].class_no, //1702
              departmentName: this.form.class[i].class_department[0],
              majorName: this.form.class[i].class_department[1],
            });
          }
          addClass(data)
            .then((res) => {
              console.log("addClass的res", res);
              this.$message.success("添加班级成功");
              //关闭dialog
              this.closeDialog();
              //刷新
              this.$emit("update");
            })
            .catch((err) => {
              console.log("addClass的err", err);
              this.$message.error("添加班级失败");
            });
        }
      });
    },
    quickSet() {
      this.form.class.forEach((item) => {
        if (this.quickForm.class_department_active) {
          item.class_department = this.quickForm.class_department;
        }
      });
    },
  },
  async mounted() {
    // this.options.buildings = (await getAllBuildings()).data.data;
  },
};
</script>

<style scoped>
</style>
