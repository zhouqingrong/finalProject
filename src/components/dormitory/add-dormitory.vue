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
          <section :key="i.dormitory_id" v-for="(i, index) in form.dormitories">
            <!-- :prop="'dorms.' + index + '.building_num'" -->
            <el-form-item
              :prop="'dormitories.' + index + '.dormitory_community'"
              :rules="[
                { required: true, message: '请选择社区', trigger: 'change' },
              ]"
              label
              label-width="90px"
            >
              <el-select
                placeholder="请选择社区"
                size="medium"
                style="width: 130px"
                v-model="i.dormitory_community"
              >
                <el-option
                  :key="item._id"
                  :label="item.name"
                  :value="item.name"
                  v-for="item in options.community"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              :prop="'dormitories.' + index + '.dormitory_building'"
              :rules="[
                { required: true, message: '请选择楼栋', trigger: 'change' },
              ]"
              label
              label-width="90px"
            >
              <el-select
                placeholder="请选择楼栋"
                size="medium"
                style="width: 130px"
                v-model="i.dormitory_building"
              >
                <el-option
                  :key="item._id"
                  :label="item.name"
                  :value="item.name"
                  v-for="item in options.building"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              :prop="'dormitories.' + index + '.dormitory_num'"
              :rules="[
                { required: true, message: '请输入门牌号' }, //可以限制数字、4位
                {pattern: /^[1-9][0-9]{2,3}/, message: '请输入正确门牌号'}
            ]"
              label="门牌号"
            >
              <el-input
                placeholder="例如：510"
                size="medium"
                style="width: 120px"
                v-model.number="i.dormitory_num"
              />
            </el-form-item>
            <el-form-item
              :prop="'dormitories.' + index + '.dormitory_capacity'"
              :rules="[
                { required: true, message: '请输入可住人数' }, 
              ]"
              label="人数"
            >
              <el-input-number
                :min="0"
                :max="10"
                :step="1"
                controls-position="right"
                size="medium"
                style="width: 100px;"
                v-model.number="i.dormitory_capacity"
              />
            </el-form-item>
            <!-- <el-form-item align="center" label="宿舍号">
              <template
                #default="scope"
              >{{getDormNum(scope.row.dormitory_community,scope.row.dormitory_building,scope.row.dormitory_num)}}</template>
            </el-form-item>-->

            <el-form-item>
              <el-button
                :disabled="form.dormitories.length === 1"
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
          </section>
        </div>
      </el-form>
      <template #footer>
        <!-- 一键设置 -->
        <!-- <el-form :model="quickForm" class="text-left" inline>
          <el-form-item label="快速设置：" label-width="90px" />
          <el-form-item prop="class_department_active">
            <el-checkbox v-model="quickForm.class_department_active"
              >学院</el-checkbox
            >
          </el-form-item>
          <el-form-item prop="class_department">
            <el-select
              placeholder="请选择楼栋"
              size="small"
              style="width: 130px"
              v-model="quickForm.class_department"
            >
              <el-option
                :key="item._id"
                :label="item.department"
                :value="item.department"
                v-for="item in options.departments"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="class_major_active">
            <el-checkbox v-model="quickForm.class_major_active"
              >专业</el-checkbox
            >
          </el-form-item>
          <el-form-item prop="class_major">
            <el-select
              placeholder="请选择专业"
              size="small"
              style="width: 130px"
              v-model="quickForm.class_major"
            >
              <el-option
                :key="item._id"
                :label="item.major"
                :value="item.major"
                v-for="item in options.majors"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="quickSet" size="small" type="primary"
              >一键设置</el-button
            >
          </el-form-item>
        </el-form>-->
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
    </el-dialog>-->
  </div>
</template>

<script>
// import {getAllBuildings} from "@/api/building";
import { addDormitories } from "@/api/superAdmin";
class Item {
  constructor() {
    //随机生成 用来绑定v-for的key
    this.dormitory_id = "" + Math.random() * Date.now();
    this.dormitory_community = "";
    this.dormitory_building = "";
    this.dormitory_num = "";
    this.dormitory_capacity = "";
    this.dormitory_name = "";
    // this.class_num = "" + Math.random() * Date.now();
  }
}

export default {
  name: "add-dormitory",
  props: {
    visible: Boolean,
  },
  data() {
    return {
      form: {
        dormitories: [new Item()],
      },
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
      isShowErrDialog: false,
      errList: [],
      quickForm: {
        class_department_active: true,
        class_department: "",
        class_major_active: true,
        class_major: "",
      },
    };
  },
  methods: {
    //检查人数是否合法
    checkDormNum(rule, value, callback) {
      if (!Number.isInteger(value) || value < 0) {
        callback(new Error("请输入正确数字"));
      }
      callback();
    },
    add(index) {
      this.form.dormitories.splice(index + 1, 0, new Item());
      // this.form.dorms.push(new DormItem())
    },
    del(index) {
      this.form.dormitories.splice(index, 1);
    },
    closeDialog() {
      this.$emit("update:visible", false);
      this.beforeClose();
    },
    beforeClose(done) {
      this.form.dormitories = [new Item()];
      done && done();
    },
    getDormNum(community, building, number) {
      if (!community || !building || !number) {
        return null;
      }
      return community + "#" + building + number;
    },
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
          let dorms = this.form.dormitories;
          for (let i = 0; i < dorms.length; i++) {
            data.push({
              community: dorms[i].dormitory_community,
              building: dorms[i].dormitory_building,
              roomNo: dorms[i].dormitory_num,
              capacity: dorms[i].dormitory_capacity,
            });
          }
          addDormitories(data)
            .then((res) => {
              this.$emit("update");
              this.closeDialog();
              this.$message.success("添加成功");
            })
            .catch((err) => {
              this.$message.error("添加失败");
            });
        }
      });
    },
  },
  mounted() {
    // this.options.buildings = (await getAllBuildings()).data.data;
  },
};
</script>

<style scoped>
</style>
