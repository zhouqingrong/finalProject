<template>
  <div class="homeContainer">
    <!-- 面包屑 -->
    <Breadcrumb :path="path" />
    <!-- 首页内容 -->
    <div class="cardContainer">
      <el-card>
        <div class="box-card">
          <svg class="svgbg" aria-hidden="true">
            <use xlink:href="#icon-tuandui-copy" class="icon-student" />
          </svg>
          <div class="text">
            学生人数：<span class="num">{{ stuCount }}</span>
          </div>
        </div>
      </el-card>
      <el-card>
        <div class="box-card">
          <svg class="svgbg" aria-hidden="true">
            <use
              xlink:href="#icon-guanliyuan_jiaoseguanli"
              class="icon-student"
            />
          </svg>
          <div class="text">
            辅导员人数：<span class="num">{{ adminCount }}</span>
          </div>
        </div>
      </el-card>
      <el-card>
        <div class="box-card">
          <svg class="svgbg" aria-hidden="true">
            <use xlink:href="#icon-ziyuan" class="icon-student" />
          </svg>
          <div class="text">
            宿舍间数：<span class="num">{{ dormitoryCount }}</span>
          </div>
        </div>
      </el-card>
    </div>
    <!-- 图表 -->
    <div id="chart"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import Breadcrumb from "@/components/breadcrumb/index.vue";
import EventBus from "@/EventBus";
import { getCounts, getRecordStatus } from "@/api/superAdmin.js";
export default {
  name: "home",
  components: { Breadcrumb },
  props: {},
  data() {
    return {
      stuCount: 0,
      adminCount: 0,
      dormitoryCount: 0,
      path: {
        path: "",
        name: "",
      },
      chartData: {
        actualData: [
          100,
          82,
          161,
          134,
          105,
          160,
          165,
          100,
          82,
          161,
          134,
          105,
          160,
          165,
          160,
          165,
          100,
          82,
          161,
        ],
        expectedData: [
          100,
          82,
          161,
          134,
          105,
          160,
          165,
          100,
          82,
          161,
          134,
          105,
          160,
          165,
          160,
          165,
          100,
          82,
          161,
        ],
        department: [],
        // expectedData: [120, 120, 191, 154, 162, 240, 185],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initCount();
    EventBus.$emit("change-route", "/home");
  },
  methods: {
    initCount() {
      getCounts()
        .then((res) => {
          this.stuCount = res.data.data.studentCount;
          this.adminCount = res.data.data.adminCount;
          this.dormitoryCount = res.data.data.dormitoryCount;
        })
        .catch((err) => {
          this.$message.error("获取数据失败");
          console.log("========err", err);
        });
      getRecordStatus()
        .then((res) => {
          this.chartData.department = res.data.data.departments;
          this.chartData.expectedData = res.data.data.studentCount;
          this.chartData.actualData = res.data.data.recordCount;
          console.log("获取打卡数据res", res);
          this.initEchart();
        })
        .catch((err) => {
          this.$message.error("获取打卡数据失败");
          console.log("获取打卡数据失败err", err);
        });
    },
    initEchart() {
      var myChart = echarts.init(document.getElementById("chart"));
      // console.log("获取dom元素", myChart);
      myChart.setOption({
        xAxis: {
          data: this.chartData.department,
          // data: [
          //   "建筑学院",
          //   "数理学院",
          //   "土木学院",
          //   "水电学院",
          //   "能环学院",
          //   "医学院",
          //   "机械学院",
          //   "信电学院",
          //   "矿测学院",
          //   "地球学院",
          //   "材料学院",
          //   "管商学院",
          //   "文法学院",
          //   "园林学院",
          //   "生命学院",
          //   "马克思主义学院",
          //   "体育学院",
          // ],
          boundaryGap: false,
          axisTick: {
            show: false,
          },
        },
        grid: {
          left: 10,
          right: 25,
          bottom: 20,
          top: 30,
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          padding: [5, 10],
        },
        yAxis: {
          axisTick: {
            show: false,
          },
        },
        legend: {
          data: ["学生人数", "今日打卡人数"],
        },
        series: [
          {
            name: "学生人数",
            itemStyle: {
              normal: {
                color: "#FF005A",
                lineStyle: {
                  color: "#FF005A",
                  width: 2,
                },
              },
            },
            smooth: true,
            type: "line",
            data: this.chartData.expectedData,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
          },
          {
            name: "今日打卡人数",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#3888fa",
                lineStyle: {
                  color: "#3888fa",
                  width: 2,
                },
                areaStyle: {
                  color: "#f3f8ff",
                },
              },
            },
            data: this.chartData.actualData,
            animationDuration: 2800,
            animationEasing: "quadraticOut",
          },
        ],
      });
    },
  },
};
</script>
<style scoped>
.cardContainer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 50px;
}
.text {
  font-size: 20px;
  padding: 18px 0;
  width: 180px;
}

.box-card {
  width: 400px;
  height: 150px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
#chart {
  width: 100%;
  height: 400px;
}
.svgbg {
  margin-left: 30px;
  display: block;
  height: 100px;
  width: 80px;
  color: rgb(145, 47, 148);
}
.icon-student {
  color: #40c9c6;
}
</style>
