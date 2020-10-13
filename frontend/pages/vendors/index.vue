<template>
    <div class="middle">
       <nuxt-link to="/vendors/create"> <b-button variant="success">Create New Vendor</b-button> </nuxt-link>
        <div 
        v-for="person in employee" :key="person.idemployee">
            <h1>{{`${person.idemployee}${person.employeeName}`}} </h1>
            {{person.idemployee}}
            </div>
       

    </div>
</template>

<script>
    export default {
        head:{
            title:'Vendors list'
        },
        data(){
        },
      /*async asyncData({$axios})
        {
            const res = await $axios.get("/api/material")
            const employee = res.data
            return employee;
            console.log(employee)
        },*/
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
    .middle {
        width:90%;
        margin : 50px auto;
    }
    
</style>