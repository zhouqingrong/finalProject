<template>
  <div class="RecordInfoContainer">
    <!-- 面包屑 -->
    <Breadcrumb :path="path" />
    <!-- 搜索模块 -->
    <section class="offset-fotm-item search">
      <div>
        <el-form inline>
          <el-form-item label="搜索">
            <el-input
              clearable
              placeholder="按学号搜索"
              prefix-icon="el-icon-search"
              size="medium"
              v-model="searchForm.studentNoKeyword"
            />
          </el-form-item>
          <el-form-item label>
            <el-input
              clearable
              placeholder="按姓名搜索"
              prefix-icon="el-icon-search"
              size="medium"
              v-model="searchForm.studentNameKeyword"
            />
          </el-form-item>
          <!-- <el-form-item label="班级">
            <el-cascader
              clearable
              v-model="searchForm.class"
              :options="options"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>-->
          <el-form-item>
            <el-button native-type="submit" size="medium" type="primary" @click="getData()">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <download-excel
              class="export-excel-wrapper"
              :data="recordData"
              :fields="fields"
              :name="fileName"
            >
              <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
              <el-button>导出</el-button>
            </download-excel>
          </el-form-item>
        </el-form>
      </div>
      <!-- 新增学生按钮 -->
      <!-- <div style="margin-left: auto !important">
        <el-button size="medium" type="info" @click="isShowAddDialog = true"
          >新增学生</el-button
        >
      </div>-->
    </section>
    <!-- 记录的表格 -->
    <record-table
      :cur-page="paging.pageNo"
      :list="recordData"
      :total="paging.total"
      :cur-pageSize="paging.pageSize"
      :loading="loading"
      @current-change="curPageChange"
      @size-change="curPageSizeChange"
      @update="getData"
      edit
      del
      class="margin-top-20 width-full"
    />
  </div>
</template>
<script>
import RecordTable from "@/components/record/record-table.vue";
import Breadcrumb from "@/components/breadcrumb/index.vue";
import EventBus from "@/EventBus";
import { schoolAll } from "@/api/superAdmin.js";
import { getRecords } from "@/api/admin.js";

export default {
  name: "record",
  components: { Breadcrumb, RecordTable },
  props: {},
  data() {
    return {
      fields: {
        学号: "stuNo",
        姓名: "username",
        班级: "aclass.className",
        状态: {
          field:"recordStatus",
          callback: value => {
            if (value == false) {
              return "未打卡"
            } else {
              return "已打卡"
            }
          }
          }
      },
      fileName: new Date().toLocaleString() + "打卡记录",
      loading: false,
      paging: {
        pageNo: 1,
        total: 1,
        pageSize: 10,
      },
      searchForm: {
        studentNameKeyword: "",
        studentNoKeyword: "",
        class: [],
      },
      options: [],
      recordData: [],
      path: {
        //面包屑路径
        path: "/record",
        name: "打卡记录",
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    EventBus.$emit("change-route", "/record");
    this.getData();
    this.initOptions();
  },
  methods: {
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
    // 选择班级
    handleChange(value) {
      console.log(value);
    },
    // 获取数据
    getData() {
      let classIds = JSON.parse(window.localStorage.getItem("user")).classIds;
      let data = {
        classIds: classIds,
        pageNo: this.paging.pageNo,
        pageSize: this.paging.pageSize,
        studentNo: this.searchForm.studentNoKeyword,
        username: this.searchForm.studentNameKeyword,
      };
      this.loading = true;
      getRecords(data)
        .then((res) => {
          this.recordData = res.data.data.students;
          this.paging.total = res.data.data.pageInfo.totalCount;
          console.log("获取学生记录数据res", res);
          this.loading = false;
        })
        .catch((err) => {
          this.$message.error("获取打卡记录失败");
          console.log("获取打卡记录数据err", err);
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
