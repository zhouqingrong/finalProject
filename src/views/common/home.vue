<template>
  <div class="homeContainer">
    <!-- 面包屑 -->
    <Breadcrumb :path="path" />
    <!-- 首页内容 -->
    <div class="cardContainer">
      <!-- <div class="card-panel">
        <div class="card-panel-icon-wrapper">
          <svg class="icon-people" aria-hidden="true">
            <use xlink:href="#icon-tuandui" class=""></use>
          </svg>
         // <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">New Visits</div>
          <count-to
            :start-val="0"
            :end-val="102400"
            :duration="2600"
            class="card-panel-num"
          />
        </div>
      </div>-->
      <el-card>
        <div class="box-card">
          <svg class="svgbg" aria-hidden="true">
            <use xlink:href="#icon-tuandui-copy" class="icon-student" />
          </svg>
          <div class="text">1111</div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div v-for="o in 2" :key="o" class="text item">{{ "列表内容 " + o }}</div>
      </el-card>
      <!-- <el-card class="box-card">
        <div v-for="o in 2" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>-->
    </div>
    <!-- 图表 -->
    <div id="chart"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import Breadcrumb from "@/components/breadcrumb/index.vue";
import EventBus from "@/EventBus";
export default {
  name: "home",
  components: { Breadcrumb },
  props: {},
  data() {
    return {
      path: {
        path: "",
        name: "",
      },
      chartData: {
        actualData: [120, 82, 91, 154, 162, 140, 145],
        expectedData: [100, 120, 161, 134, 105, 160, 165],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initEchart();
    EventBus.$emit("change-route", "/home");
  },
  methods: {
    initEchart() {
      var myChart = echarts.init(document.getElementById("chart"));
      console.log("获取dom元素", myChart);
      myChart.setOption({
        xAxis: {
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          boundaryGap: false,
          axisTick: {
            show: false,
          },
        },
        grid: {
          left: 10,
          right: 10,
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
          data: ["expected", "actual"],
        },
        series: [
          {
            name: "expected",
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
            name: "actual",
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
  font-size: 14px;
  padding: 18px 0;
  width: 300px;
}

.box-card {
  width: 460px;
  height: 180px;
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
  display: block;
  height: 100px;
  width: 80px;
  color: rgb(145, 47, 148);
}
.icon-student {
  color: #40c9c6;
}

/* .card-panel:hover .card-panel-icon-wrapper {
  color: #fff;
}
.card-panel:hover .icon-people {
  background: #40c9c6;
}
.icon-people {
  color: #40c9c6;
} */
</style>
