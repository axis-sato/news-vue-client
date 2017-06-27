<template>
  <div class="spinner_wrapper" v-if="isShow">
    <md-spinner md-indeterminate style="margin: auto"></md-spinner>
  </div>
</template>

<script>
  export default {
    name: 'loading',
    props: ['isShow']
  }
</script>
