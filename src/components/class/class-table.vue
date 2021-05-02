<template>
  <div class="ClassContainer">
    <!-- 班级表格 -->
    <el-table
      :data="list"
      :default-sort="{ prop: 'id', order: 'ascending' }"
      @selection-change="selected"
      border
      stripe
      v-loading="loading"
    >
      <!-- <el-table-column align="center" type="selection" width="55" /> -->
      <el-table-column align="center" label="序号" prop="id" sortable />
      <el-table-column align="center" label="学院" prop="departmentName" sortable />
      <el-table-column align="center" label="专业" prop="majorName" sortable />
      <el-table-column align="center" label="班级" prop="classNo" sortable />
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
              @click="showDeleteClass(scope.row)"
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
    <el-pagination
      class="pagination"
      @size-change="$emit('size-change', $event)"
      @current-change="$emit('current-change', $event)"
      :current-page="curPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="curPageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!--  编辑/查看-->
    <edit-class :curDetail.sync="curDetail" :visible.sync="isShowModify" @update="$emit('update')" />
  </div>
</template>
<script>
import EditClass from "@/components/class/edit-class"; //编辑
import { deleteClass } from "@/api/superAdmin.js";
export default {
  name: "class-table",
  components: { EditClass },
  props: {
    list: {
      type: Array,
      defualt: () => [],
    },
    total: Number,
    curPage: Number, //当前是第几页
    curPageSize: Number, //当前每页多少条
    edit: Boolean,
    del: Boolean,
    loading: Boolean,
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
      this.curDetail["departmentMajor"] = [row.departmentName, row.majorName];
      this.isShowModify = true;
    },
    // 删除班级
    showDeleteClass(row) {
      console.log("删除改行信息row", row);
      this.$confirm("此操作将永久删除该班级且无法恢复，是否继续？", "提示", {
        type: "warning",
      }).then(() => {
        deleteClass(row.id)
          .then((res) => {
            console.log("删除班级class-res", res);
            this.$message.success("删除班级成功");
            this.$emit("update");
          })
          .catch((err) => {
            console.log("删除班级class-err", err);
            this.$message.error("删除班级失败");
          });
      });
    },
  },
};
</script>
<style scoped>
.pagination {
  margin: 30px auto;
}
</style>
