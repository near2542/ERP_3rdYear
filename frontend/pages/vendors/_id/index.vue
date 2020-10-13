<template>
    <div>
 <div 
        v-for="person in employee" :key="person.idemployee">
            <h1>{{`${person.idemployee}5555 ${person.employeeName}`}} </h1>
            {{person.idemployee}}
            </div>
    </div>
</template>

<script>
    export default {
        async asyncData({$axios,params})
  {
    const employee = await $axios.$get(`/api/material/${params.id}`)
    return {employee}
  },
    }
</script>

<style lang="scss" scoped>

</style>