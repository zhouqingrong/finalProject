<template>
  <div class="ClassContainer">
    <!-- 班级表格 -->
    <el-table
      :data="list"
      :default-sort="{ prop: 'class_num', order: 'ascending' }"
      @selection-change="selected"
      border
      stripe
    >
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column align="center" label="序号" prop="class_num" sortable />
      <el-table-column
        align="center"
        label="学院"
        prop="class_department"
        sortable
      />
      <el-table-column
        align="center"
        label="专业"
        prop="class_marjor"
        sortable
      />
      <el-table-column align="center" label="班级" prop="class_name" sortable />
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-tooltip content="查看/编辑信息" v-if="edit">
            <el-button
              @click="showModifyClass(scope.row)"
              circle
              icon="el-icon-edit font-size-16"
              plain
              size="mini"
            />
          </el-tooltip>
          <el-tooltip content="删除" v-if="del">
            <el-button
              @click="deleteClass(scope.row)"
              circle
              icon="el-icon-delete font-size-16"
              plain
              size="mini"
              type="danger"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页信息 -->
    <!-- <el-pagination
      :current-page="curPage"
      :total="total"
      @current-change="$emit('current-change', $event)"
      background
      class="margin-top-20"
      layout="total, prev, pager, next"
      style="text-align: right"
    >
    </el-pagination> -->
    <!--  编辑/查看-->
    <edit-class
      :curDetail.sync="curDetail"
      :visible.sync="isShowModify"
      @update="$emit('update')"
    />
  </div>
</template>
<script>
import EditClass from "@/components/class/edit-class"; //编辑
export default {
  name: "class-table",
  components: { EditClass },
  props: {
    list: {
      type: Array,
      defualt: () => [],
    },
    total: Number,
    curPage: Number,
    edit: Boolean,
    del: Boolean,
  },
  data() {
    return {
      isShowModify: false,
      curDetail: {},
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 选中班级
    selected(selected) {
      this.$emit("select:selected", selected);
    },
    // 修改班级信息
    showModifyClass(row) {
      console.log("修改班级信息row：", row);
      this.curDetail = row;
      this.isShowModify = true;
    },
    // 删除班级
    deleteClass(row) {
      console.log("删除改行信息row", row);
      this.$confirm("此操作将永久删除该学生且无法恢复，是否继续？", "提示", {
        type: "warning",
      }).then(() => {
        this.request
          .post("/api/student/removeOneById", { _id: row._id })
          .then((res) => {
            if (!res.data.errcode) {
              this.$alert("删除成功！", "提示", { type: "success" });
              this.$emit("update");
            } else {
              this.$alert(res.data.msg, "错误", { type: "error" });
            }
          });
      });
    },
  },
};
</script>
<style scoped>
</style>
