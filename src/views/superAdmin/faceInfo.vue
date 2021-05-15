<template>
  <div class="FaceInfoContainer">
    <!-- 面包屑 -->
    <Breadcrumb :path="path" />
    <section class="offset-fotm-item search">
      <div>
        <!-- 人脸图库搜索栏 -->
        <el-form inline>
          <!-- <el-form-item label="搜索">
            <el-input
              clearable
              placeholder="按学院、专业、班级搜索"
              prefix-icon="el-icon-search"
              size="medium"
              v-model="searchForm.classKeyword"
            />
          </el-form-item>-->
          <el-form-item label="搜索">
            <el-cascader
              placeholder="请选择学院、专业、班级"
              clearable
              v-model="searchForm.classKeyword"
              :options="options"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label>
            <el-input
              clearable
              placeholder="按姓名搜索"
              prefix-icon="el-icon-search"
              size="medium"
              style="width: 180px"
              v-model="searchForm.studentNameKeyword"
            />
          </el-form-item>
          <el-form-item>
            <el-button size="medium" type="primary" @click="getData()"
              >搜索</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <!-- 新增按钮
      <div style="margin-left: auto !important">
        <el-button size="medium" type="info" @click="isShowAddDialog = true"
          >新增</el-button
        >
      </div>-->
    </section>
    <!-- 表格 -->
    <face-table
      :cur-page="paging.pageNo"
      :total="paging.total"
      :cur-pageSize="paging.pageSize"
      :loading="loading"
      :list="studentData"
      @select:selected="onSelect"
      @current-change="curPageChange"
      @size-change="curPageSizeChange"
      @update="getData"
      edit
      del
      class="margin-top-20 width-full"
    />
    <!-- 新增 -->
    <!-- <add-class :visible.sync="isShowAddDialog" /> -->
  </div>
</template>
<script>
import FaceTable from "@/components/face/face-table.vue";
import Breadcrumb from "@/components/breadcrumb/index.vue";
import EventBus from "@/EventBus";
import { getStudents, schoolAll } from "@/api/superAdmin";
export default {
  name: "classInfo",
  components: { FaceTable, Breadcrumb },
  props: {},
  data() {
    return {
      loading: false,
      searchForm: {
        classKeyword: [], //学院班级姓名联查
        studentNameKeyword: "", //按用户名搜素
      },
      paging: {
        pageNo: 1,
        total: 1,
        pageSize: 10,
      },
      isShowAddDialog: false,
      studentData: [],
      selected: [],
      options: [],
      path: {
        path: "/faceInfo",
        name: "人脸图库",
      }, //面包屑路径
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    EventBus.$emit("change-route", "/faceInfo");
    this.initOptions();
    this.getData();
  },
  methods: {
    // 搜索的级联班级数据
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
    // 选择
    onSelect(selected) {
      console.log("选中的：", selected);
      this.selected = selected;
    },
    handleChange(value) {
      console.log(value);
    },
    // 获取数据
    getData() {
      let classId =
        this.searchForm.classKeyword.length == 0
          ? ""
          : this.searchForm.classKeyword[2];
      let data = {
        classId: classId,
        username: this.searchForm.studentNameKeyword,
        pageNo: this.paging.pageNo,
        pageSize: this.paging.pageSize,
      };
      this.loading = true;
      getStudents(data) //人脸放在学生表里的一个字段中，所以获取学生
        .then((res) => {
          this.studentData = res.data.data.students;
          this.paging.total = res.data.data.pageInfo.totalCount;
          console.log("人脸模块获取学生数据res", res);
          this.loading = false;
        })
        .catch((err) => {
          this.$message.error("人脸模块获取学生失败");
          console.log("人脸模块获取学生数据err", err);
          this.loading = false;
        });
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
