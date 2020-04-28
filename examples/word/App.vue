<template>
  <div id="app">
    <h1>我是一个组件</h1>
    <p>Vue is a frontend build util
      <p>i am a sub child</p>
    </p>
  </div>
</template>

<script>
export default { 
  name : 'app',
  data() { 
    return {}
  },
  mounted() { 
    console.log('mounted')
  }
}
</script>
  