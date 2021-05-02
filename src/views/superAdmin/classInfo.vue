<template>
  <div class="ClassInfoContainer">
    <!-- 面包屑 -->
    <Breadcrumb :path="path" />
    <section class="offset-fotm-item search">
      <div>
        <!-- 班级搜索栏 -->
        <el-form inline>
          <el-form-item label="搜索">
            <el-input
              clearable
              placeholder="按学院搜索"
              prefix-icon="el-icon-search"
              size="medium"
              v-model="searchForm.departmentKeyword"
            />
          </el-form-item>
          <el-form-item label="">
            <el-input
              clearable
              placeholder="按专业搜索"
              prefix-icon="el-icon-search"
              size="medium"
              style="width: 180px"
              v-model="searchForm.majorKeyword"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              native-type="submit"
              size="medium"
              type="primary"
              @click="getData"
              >搜索</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <!-- 新增班级按钮 -->
      <div style="margin-left: auto !important">
        <!--  -->
        <el-button size="medium" type="info" @click="isShowAddDialog = true"
          >新增班级</el-button
        >
      </div>
    </section>
    <!-- 班级表格 -->
    <class-table
      :cur-page="paging.pageNo"
      :cur-pageSize="paging.pageSize"
      :list="classData"
      :total="paging.total"
      @current-change="curPageChange"
      @size-change="curPageSizeChange"
      @select:selected="onSelect"
      @update="getData"
      edit
      del
      class="margin-top-20 width-full"
    />
    <!-- 新增 -->
    <add-class :visible.sync="isShowAddDialog" @update="getData" />
  </div>
</template>
<script>
import ClassTable from "@/components/class/class-table.vue";
import AddClass from "../../components/class/add-class.vue";
import Breadcrumb from "@/components/breadcrumb/index.vue";
import { getClasses } from "@/api/superAdmin.js";
import { departmentMajorsMap } from "@/utils/staticData.js";
export default {
  name: "classInfo",
  components: { ClassTable, AddClass, Breadcrumb },
  props: {},
  data() {
    return {
      searchForm: {
        departmentKeyword: "",
        majorKeyword: "",
      },
      paging: {
        pageNo: 1,
        total: 1,
        pageSize: 10,
      },
      isShowAddDialog: false,
      classData: [], //表格数据
      selected: [],
      path: {
        path: "/classInfo",
        name: "班级管理",
      }, //面包屑路径
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getData();
  },
  methods: {
    // 获取数据
    getData() {
      let data = {
        pageNo: this.paging.pageNo,
        pageSize: this.paging.pageSize,
        departmentName: this.searchForm.departmentKeyword,
        majorName: this.searchForm.majorKeyword,
      };
      getClasses(data)
        .then((res) => {
          console.log("班级表格success的res", res);
          this.classData = res.data.data.classes;
          this.paging.total = res.data.data.pageInfo.totalCount;
        })
        .catch((err) => {
          console.log("班级表格err", err);
          this.$message.error("获取班级失败");
        });
      // request.post("/api/student/search", form).then((res) => {
      //   this.studentData = res.data.data.list;
      //   this.paging = Object.assign(this.paging, res.data.data.paging);
      //   if (this.paging.current > this.paging.pageCount) {
      //     this.paging.current = this.paging.pageCount;
      //     this.getData();
      //   }
      // });
    },
    // 选择
    onSelect(selected) {
      console.log("选中的班级：", selected);
      this.selected = selected;
    },
    //分页改变页数
    curPageChange(page) {
      this.paging.pageNo = page;
      this.getData();
    },
    //分页改变每页条数
    curPageSizeChange(size) {
      this.paging.pageSize = size;
      this.getData();
    },
  },
};
</script>
<style scoped>
.search {
  display: flex;
  justify-content: flex-start;
}
</style>
