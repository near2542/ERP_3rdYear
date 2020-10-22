<template>
    <div class="middle">
       <nuxt-link to="/mm/material/create"> <b-button variant="success">Create Material</b-button> </nuxt-link>

       <div class="search">
       <b-form-input
       class="col-3"
          id="input-1"
          v-model="search"
          type="text"
          placeholder="Search with Code or Name"
        ></b-form-input>
        </div>
        
        <div>
            <b-table hover :items="filtered"><nuxt-link to="/material/:id"></nuxt-link></b-table>
        </div>

        <nuxt-link to="/mm"> <b-button variant="info">Go back</b-button></nuxt-link>
       

    </div>
</template>

<script>
    export default {
        head:{
            title:'Organization'
        },
        data(){
            return{
            search : '',
        }
    },
        methods:{
       
        },
        computed:{
        filtered:function()
          {
              const searchParams = this.search.toUpperCase()
            return this.Mats.filter( mats=> mats.MaterialCode.toCase().startsWith(searchParams) 
           /* || mats.MaterialName.toLowerCase().match(searchParams)*/ )
          }  
        },
     async asyncData({$axios})
  {
    const material = await $axios.$get('/api/mm/material')
    const Mats = material.map((mats) =>
    {
        mats.Date_Added = mats.Date_Added.toString().slice(0,10)
        return mats; 
    })
    return {Mats}
  },
       
        }
</script>

<style lang="css" scoped>
    .middle {
        width:90%;
        margin : 50px auto;
    }
    .search{
        margin:20px 0;
    }
    
    .search >input[type="text"] {
        background-color:rgba(0,0,0,0.1);
    }
</style>