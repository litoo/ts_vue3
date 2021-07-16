<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <h1>{{ count }}</h1>
  <h1>{{ double }}</h1>
  <h1>X:{{ x }} Y:{{ y }}</h1>
  <button v-on:click="updateGreeting">+1</button>
</template>

<script lang="ts">
import { computed, onBeforeMount, reactive, ref, toRefs, watch } from "vue";
    import useMousePos from './hooks/useMousePos';
export default {
  name: "App",
  setup() {
    // const count = ref(0); //响应式函数，入参是原始数据类型
    // const increase = function () {
    //   count.value++;
    // };

    //生命周期
    onBeforeMount(function () {
      console.log("onBeforeMount");
    });
    //computed计算函数,入参为function
    // const double = computed(() => {
    //   return count.value * 2;
    // });


    //reactive
    interface DataProps {
      count: number;
      double: number;
      increase: () => void;
    }

    //多ref对象使用reactive语法 入参为Obj
    const data: DataProps = reactive({
      count: 0,
      double: computed(() => data.count * 2),
      increase:() => {data.count++}
    });

    const greetings = ref("");
    //改变参数值
    const updateGreeting = function () {
      greetings.value += "hello";
    };

    //监听参数变化，入参（监听参数 回调function）
    //监听参数多个可以是数组
    watch([greetings, ()=>{data.count}], function (newValue, oldValue) {
      console.log(newValue);
      console.log(oldValue);
      // document.title = greetings.value
    });




    const { x,y } = useMousePos()

    //reactive
    const refsData = toRefs(data)
    //导出参数，用于html插值引用
    return {
      // count,
      // increase,
      // double,
      updateGreeting,
      ...refsData,//reactive
      x,
      y
    };
  },
  methods: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
