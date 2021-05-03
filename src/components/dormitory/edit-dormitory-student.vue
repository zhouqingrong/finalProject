<template>
  <el-dialog
    :title="info.roomName + '添加学生'"
    :visible="visible"
    append-to-body
    @update:visible="$emit('update:visible', $event)"
    width="500px"
  >
    <el-form :model="form" label-width="100px" ref="form">
      <el-form-item label="请输入姓名" required prop="username" :rules="[{validator:checkUsername}]">
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="form.username"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.username }}</div>
            <span class="no">{{ item.stuNo }}</span>
          </template>
        </el-autocomplete>
      </el-form-item>
      <section class="flex-center">
        <el-button @click="add" type="primary">添加</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </section>
    </el-form>
  </el-dialog>
</template>

<script>
import { getStudents, addDormStu } from "@/api/superAdmin";
import { init } from "echarts";
const initForm = function () {
  return {
    username: "",
    studentId: "",
  };
};
export default {
  name: "edit-dormitory-student",
  props: {
    info: Object,
    visible: Boolean,
  },
  data() {
    return {
      form: initForm(),
      stuList: [],
    };
  },
  methods: {
    add() {
      let data = {
        dormitoryId: this.info.id,
        studentId: this.form.studentId,
      };
      addDormStu(data)
        .then((res) => {
          this.$message.success("添加学生成功");
          this.$emit("update");
          this.closeDialog();
        })
        .catch((err) => {
          this.$message.error("添加学生失败");
          console.log("宿舍添加学生失败err", err);
        });
    },
    closeDialog() {
      this.$emit("update:visible", false);
      this.form = initForm();
    },
    checkUsername(rule, value, cb) {
      console.log("value=========", value);
      if (value == "") {
        cb(new Error("请输入姓名"));
      } else {
        for (let i = 0; i < this.stuList.length; i++) {
          if (value == this.stuList[i].username) {
            this.handleSelect(this.stuList[i]);
            cb();
            return;
          }
        }
        cb(new Error("没有该学生"));
      }
    },
    //后端查询是否有该学生 出现在候选列表中
    querySearch(queryString, cb) {
      console.log("queryString ===========", queryString);
      let data = {
        username: queryString,
      };
      getStudents(data)
        .then((res) => {
          this.stuList = res.data.data.students;
          cb(this.stuList);
        })
        .catch((err) => {
          cb();
        });
    },
    handleSelect(item) {
      console.log("item===========", item);
      this.form.username = item.username;
      this.form.studentId = item.id;
    },
  },
};
</script>

<style scoped>
.name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.no {
  font-size: 12px;
  color: #b4b4b4;
}
</style>
