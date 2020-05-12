<template>
  <div v-resize="chartresize" class="echartsLine" :id="id"></div>
</template>
<script>
export default {
  props: {
    id: {
      type: String
    },
    // 接收父组件传递过来的信息
    chartData: {},
    gridItemParams: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      myEcharts: null, //echarts实例化
      throttleTimer: null
    };
  },
  watch: {
    chartData: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (this.myEcharts) {
          if (newVal) {
            this.setOption(newVal,true);
          } else {
            this.setOption(oldVal,true);
          }
        }
      }
    },
    id(newValue, oldValue) {
      if (newValue !== oldValue && newValue) {
        this.$nextTick(() => {
          this.initCharts();
        });
      }
    }
  },
  mounted() {
    if (this.id != "") {
      this.initCharts();
      window.addEventListener("resize", () => {
        this.setThrottling();
      });
    }
  },
  beforeDestroy() {
    if (!this.myEcharts) {
      return;
    }
    this.myEcharts.dispose();
    this.myEcharts = null;
    window.removeEventListener("resize", () => {
      this.setThrottling();
    });
  },
  methods: {
    chartresize() {
      if (this.myEcharts !== null) {
        this.myEcharts.resize();
      }
    },
    setThrottling() {
      clearTimeout(this.throttleTimer);
      this.throttleTimer = setTimeout(() => {
        this.chartresize();
      }, 200);
    },
    initCharts() {
      // 初始化echarts
      this.myEcharts = this.$echarts.init(document.getElementById(this.id));
      // 数据loading页面一进来的时候加载
      this.myEcharts.showLoading({
        text: "",
        color: "#006f6b",
        maskColor: "rgba(255,255,255,0)",
        zlevel: 0
      });
      this.myEcharts.hideLoading(); // 关闭loading
      if (this.chartData) {
        this.setOption(this.chartData,true);
      }
      this.myEcharts.on("click", params => {
        this.$emit("echartsClick", params);
      });
    },
    setOption(option) {
      this.$nextTick(() => {
        this.myEcharts.setOption(this.chartData,true);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.echartsLine {
  height: 100%;
  width: 100%;
}
</style>
