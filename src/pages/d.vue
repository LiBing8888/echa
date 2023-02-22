<template>
  <div @click="dd">12121</div>
</template>

<script lang='ts' setup>
    import {defineEmits} from 'vue'
    
    const emit = defineEmits(['dd'])
    console.log(emit)
    const dd = () => {
        console.log(defineEmits)
        debugger
        emit('dd',123)
    }
</script>
<style scoped>
</style>