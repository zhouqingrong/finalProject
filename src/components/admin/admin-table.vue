<template>
  <div class="ClassContainer">
    <!-- 管理员表格 -->
    <el-table
      :data="list"
      :default-sort="{ prop: 'id', order: 'ascending' }"
      @selection-change="selected"
      border
      stripe
    >
      <!-- <el-table-column align="center" type="selection" width="55" /> -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.classes">
            <el-table-column
              align="center"
              label="学院"
              prop="departmentName"
            ></el-table-column>
            <el-table-column
              align="center"
              label="专业"
              prop="majorName"
            ></el-table-column>
            <el-table-column
              align="center"
              label="班级"
              prop="classNo"
            ></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column align="center" label="序号" prop="id" sortable />
      <el-table-column align="center" label="账号" prop="account" sortable />
      <el-table-column align="center" label="姓名" prop="adminName" sortable />
      <el-table-column align="center" label="学院" prop="department" sortable />
      <el-table-column align="center" label="联系方式" prop="phone" sortable />
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-tooltip content="查看/编辑信息" v-if="edit">
            <el-button
              @click="showModify(scope.row)"
              circle
              icon="el-icon-edit font-size-16"
              plain
              size="mini"
            />
          </el-tooltip>
          <el-tooltip content="删除" v-if="del">
            <el-button
              @click="deleteAdmin(scope.row)"
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
    <edit-admin
      :curDetail.sync="curDetail"
      :visible.sync="isShowModify"
      @update="$emit('update')"
    />
  </div>
</template>
<script>
import EditAdmin from "@/components/admin/edit-admin"; //编辑
import { deleteAdmin } from "@/api/superAdmin";
export default {
  name: "admin-table",
  components: { EditAdmin },
  props: {
    list: {
      type: Array,
      defualt: () => [],
    },
    total: Number,
    curPage: Number,
    curPageSize: Number,
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
    showModify(row) {
      console.log("修改admin信息row：", row);
      this.curDetail = row;
      this.curDetail["admin_classes"] = [];
      for (let i = 0; i < row.classIds.length; i++) {
        this.curDetail["admin_classes"].push([
          row.classes[i].departmentName,
          row.classes[i].majorName,
          row.classes[i].id,
        ]);
      }
      this.isShowModify = true;
    },
    // 删除班级
    deleteAdmin(row) {
      console.log("删除改行信息row", row);
      this.$confirm("此操作将永久删除该管理员且无法恢复，是否继续？", "提示", {
        type: "warning",
      }).then(() => {
        let data = {
          id: row.id,
        };
        deleteAdmin(data)
          .then((res) => {
            this.$message.success("删除成功");
            this.$emit("update");
          })
          .catch((err) => {
            this.$message.error("删除失败");
            console.log("管理员删除失败err", err);
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
