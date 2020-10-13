<template>
    <div>
        <div class="employee-card">
      
            <h1>{{`${person.idemployee}5555 ${person.employeeName}`}}</h1>
            </div>
            
    </div>
</template>

<script>
    export default {
       async asyncData({$axios})
  {
    const employee = await $axios.$get('/api/material')
    return {employee}
  },
}
</script>

<style lang="css" scoped>
    .employee-card{
        display:flex;
        flex-direction:column;
        width:300px;
        min-height:300px;
    }
</style>