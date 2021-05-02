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
          </el-form-item> -->
          <el-form-item label="搜索">
            <!-- <el-select
              v-model="searchForm.classKeyword"
              placeholder="按学院、专业、班级搜索"
              prefix-icon="el-icon-search"
              size="medium"
            >
              <el-option label="信电学院" value="信电学院"></el-option>
              <el-option label="机械学院" value="机械学院"></el-option>
            </el-select> -->
            <el-cascader
              placeholder="按学院、专业、班级搜索"
              prefix-icon="el-icon-search"
              size="medium"
              v-model="searchForm.classKeyword"
              :options="options"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="">
            <el-input
              clearable
              placeholder="按状态搜索"
              prefix-icon="el-icon-search"
              size="medium"
              style="width: 180px"
              v-model="searchForm.statusKeyword"
            />
          </el-form-item>
          <el-form-item>
            <el-button native-type="submit" size="medium" type="primary"
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
      </div> -->
    </section>
    <!-- 表格 -->
    <face-table
      :cur-page="paging.current"
      :list="faceData"
      :total="paging.total"
      @select:selected="onSelect"
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

export default {
  name: "classInfo",
  components: { FaceTable, Breadcrumb },
  props: {},
  data() {
    return {
      searchForm: {
        classKeyword: "", //学院班级姓名联查
        statusKeyword: "", //是否存有照片状态
      },
      paging: {
        current: 1,
        total: 1,
        pageCount: 1,
      },
      isShowAddDialog: false,
      faceData: [
        {
          student_num: "170950212",
          student_name: "zz",
          student_face: "1",
        },
        {
          student_num: "170950213",
          student_name: "tcg",
          student_face: "2",
        },
      ],
      selected: [],
      options: [
        {
          value: "xindian",
          label: "信电学院",
          children: [
            {
              value: "rjgc",
              label: "软件工程",
              children: [
                {
                  value: "1701",
                  label: "1701",
                },
                {
                  value: "1702",
                  label: "1702",
                },
                {
                  value: "1703",
                  label: "1703",
                },
                {
                  value: "1801",
                  label: "1801",
                },
              ],
            },
            {
              value: "zdh",
              label: "自动化",
              children: [
                {
                  value: "1701",
                  label: "1701",
                },
                {
                  value: "1702",
                  label: "1702",
                },
              ],
            },
          ],
        },
      ],
      path: {
        path: "/classInfo",
        name: "人脸图库",
      }, //面包屑路径
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 选择
    onSelect(selected) {
      console.log("选中的：", selected);
      this.selected = selected;
    },
    // 选择班级
    handleChange(value) {
      console.log(value);
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
