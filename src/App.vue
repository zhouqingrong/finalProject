<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    Date.prototype.toLocaleString = function () {
      // 重写日期函数格式化日期
      return `${this.getFullYear()}-${
        this.getMonth() + 1 >= 10
          ? this.getMonth() + 1
          : "0" + (this.getMonth() + 1)
      }-${this.getDate() >= 10 ? this.getDate() : "0" + this.getDate()}`;
    };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
