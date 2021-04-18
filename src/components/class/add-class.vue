<template>
  <div>
    <!-- 添加宿舍 -->
    <el-dialog
      :before-close="beforeClose"
      append-to-body
      :close-on-click-modal="false"
      :visible="visible"
      @update:visible="$emit('update:visible', $event)"
      title="新增宿舍"
      width="850px"
    >
      <el-form :model="form" inline ref="form">
        <div class="dialog-container">
          <!-- class="dorm-item" -->
          <section :key="i.class_num" v-for="(i, index) in form.class">
            <!-- :prop="'dorms.' + index + '.building_num'" -->
            <el-form-item
              :prop="'class.' + index + '.class_department'"
              :rules="[
                { required: true, message: '请选择学院', trigger: 'change' },
              ]"
              label="学院"
              label-width="90px"
            >
              <el-select
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
              </el-select>
            </el-form-item>
            <el-form-item
              :prop="'class.' + index + '.class_marjor'"
              :rules="[
                { required: true, message: '请选择专业', trigger: 'change' },
              ]"
              label="专业"
              label-width="90px"
            >
              <el-select
                placeholder="请选择专业"
                size="medium"
                style="width: 130px"
                v-model="i.class_marjor"
              >
                <el-option
                  :key="item._id"
                  :label="item.marjor"
                  :value="item.marjor"
                  v-for="item in options.marjors"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              :prop="'class.' + index + '.name'"
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
                v-model="i.class_name"
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
            </el-form-item> -->
          </section>
        </div>
      </el-form>
      <template #footer>
        <!-- 一键设置 -->
        <!-- <el-form :model="quickForm" class="text-left" inline>
          <el-form-item label="快速设置：" label-width="90px"/>
          <el-form-item prop="building_num_active">
            <el-checkbox v-model="quickForm.building_num_active">楼栋号</el-checkbox>
          </el-form-item>
          <el-form-item prop="building_num">
            <el-select placeholder="请选择楼栋" size="small" style="width:130px;" v-model="quickForm.building_num">
              <el-option :key="item._id"
                         :label="item.building_num+'号楼'"
                         :value="item.building_num"
                         v-for="item in options.buildings"/>
            </el-select>
          </el-form-item>
          <el-form-item prop="building_num_active">
            <el-checkbox v-model="quickForm.contain_count_active">容纳人数</el-checkbox>
          </el-form-item>
          <el-form-item prop="contain_count">
            <el-input-number :min="0"
                             controls-position="right"
                             size="small"
                             style="width: 100px;"
                             v-model.number="quickForm.contain_count"/>
          </el-form-item>
          <el-form-item>
            <el-button @click="quickSet" size="small" type="primary">一键设置</el-button>
          </el-form-item>
        </el-form> -->
        <!-- 一键设置结束 -->
        <section class="flex-center">
          <el-button @click="submit" type="primary">确认添加</el-button>
          <el-button @click="closeDialog">取消</el-button>
        </section>
      </template>
    </el-dialog>

    <!-- <el-dialog :close-on-click-modal="false" :visible.sync="isShowErrDialog" title="错误信息" width="700px">
      <div class="dialog-container">
        <el-table :data="errList" border stripe>
          <el-table-column align="center" label="楼栋号" prop="building_num"/>
          <el-table-column align="center" label="门牌号" prop="house_num"/>
          <el-table-column align="center" label="宿舍号">
            <template #default="scope">
              {{getDormNum(scope.row.building_num,scope.row.house_num)}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="容纳人数" prop="contain_count"/>
          <el-table-column align="center" class-name="color-danger" label="错误原因" prop="errors"/>
        </el-table>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
// import {getAllBuildings} from "@/api/building";

class Item {
  constructor() {
    this.class_department = "";
    this.class_marjor = "";
    this.class_name = 1702;
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
      form: {
        class: [new Item()],
      },
      options: {
        buildings: [],
        departments: [
          {
            _id: "1",
            department: "信电学院",
          },
          {
            _id: "2",
            department: "机械学院",
          },
        ],
        marjors: [
          {
            id: 1,
            marjor: "软件工程",
          },
          {
            id: 2,
            marjor: "自动化",
          },
        ],
      },
      isShowErrDialog: false,
      errList: [],
      quickForm: {
        building_num_active: true,
        building_num: "",
        contain_count_active: true,
        contain_count: 6,
      },
    };
  },
  methods: {
    add(index) {
      this.form.class.splice(index + 1, 0, new Item());
      // this.form.dorms.push(new DormItem())
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
    async submit() {
      try {
        await this.$refs.form.validate();
        this.request.post("/api/dorm/insertMany", this.form).then((res) => {
          if (!res.data.errcode) {
            this.$alert("添加成功！", "提示", { type: "success" });
            this.closeDialog();
            this.$emit("update");
          } else {
            this.$message.error("添加失败，请查看！");
            this.isShowErrDialog = true;
            this.errList = res.data.errorDorms.map((item) => {
              return {
                errors: item.errors.map((item) => item.msg).join(";"),
                ...item.dorm,
              };
            });
          }
        });
      } catch (e) {
        return false;
      }
    },
    quickSet() {
      this.form.dorms.forEach((item) => {
        if (this.quickForm.building_num_active) {
          item.building_num = this.quickForm.building_num;
        }
        if (this.quickForm.contain_count_active) {
          item.contain_count = this.quickForm.contain_count;
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
