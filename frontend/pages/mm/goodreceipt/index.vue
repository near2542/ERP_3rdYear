<template>
    <div class="middle">
        
       <div class="search" >
       <b-form-input
            class="col-4"
          id="input-1"
          v-model="search"
          type="text"
          placeholder="Search with Code or Name"
        ></b-form-input>
        </div>
        <b-alert class="noti" v-if="msg.status=='success'" variant="success" show>{{msg.message}}</b-alert>
        <b-alert class="noti" v-if="msg.status=='danger'" variant="danger" show>{{msg.message}}</b-alert>
        <div>
        <b-table-simple hover caption-top bordered striped>
                    <caption>{{filtered.length}} results found</caption>
                    <b-thead head-variant="dark">
                        <b-tr>
                              <b-th colspan="1">ID</b-th>
                              <b-th colspan="2">referenced ID</b-th>
                              <b-th colspan="3">Vendors Name</b-th>
                              <b-th colspan="4">Description</b-th>
                              <b-th colspan="3">request_date </b-th>
                              <b-th colspan="4">Valid To</b-th>
                              <b-th colspan="6">Action</b-th>
                        </b-tr>
                     </b-thead>
                     <b-tbody>
                        <b-tr v-for="(requistion) in filtered" :key="requistion.idDoc">
                              <b-td colspan="1">{{requistion.idDoc}}</b-td>
                              <b-td colspan="2">#PR{{requistion.idRef}}</b-td>
                              <b-td colspan="3">{{requistion.VendorsName}}</b-td>
                              <b-td colspan="4">{{requistion.description}}</b-td>
                              <b-td colspan="3">{{requistion.request_date}}</b-td>
                              <b-td colspan="4">{{requistion.ValidTo}}</b-td>
                              <b-td colspan="6">

                                  <!--- action -->
                    <div v-if="requistion.Stat == 1">
        <nuxt-link :to="`/mm/invoices/create?ref=${requistion.idDoc}`">Pay to vendors</nuxt-link>
        <nuxt-link :to="`/mm/goodreceipt/${requistion.idDoc}`"><b-icon-eye-fill class="mr-2" variant="success"  scale="1.5"></b-icon-eye-fill></nuxt-link>
        </div>
        <div v-else>
          Refered
          <nuxt-link :to="`/mm/goodreceipt/${requistion.idDoc}`"><b-icon-eye-fill class="mr-2" variant="success"  scale="1.5"></b-icon-eye-fill></nuxt-link>
        </div>
        <!-- action end-->
                  
                              </b-td>
                        </b-tr>
                      </b-tbody>  
        </b-table-simple>
        </div>
        <nuxt-link to="/mm"> <b-button variant="info" v-model="length">Go back</b-button></nuxt-link>
        <b-modal id="my-modal">Hello From My Modal!</b-modal>
    </div>
    
</template>

<script>

    export default {
        head:{
            title:'Material list'
        },
        data(){
            return{
            search : '',
            msg : '',
        }
    },
        methods:{
    
        },
        computed:{
        filtered:function()
          {
            return this.requistion.filter(requis=> requis.idDoc.toLowerCase().match(this.search.toLowerCase()) 
            || requis.VendorsName.toLowerCase().match(this.search.toLowerCase()) )
          },
          length:function(){
              return this.requistion.length;
          },
        },
     async asyncData({$axios})
  {
    const data = await $axios.$get('/api/mm/goodreceipt')
   const requistion = data.map((datas) =>
    {
        datas.request_date = datas.request_date.toString().slice(0,10)
        datas.ValidTo = datas.ValidTo.toString().slice(0,10)
        return datas; 
    })
    console.log(requistion);
  return {requistion};
  },
       
        }
</script>

<style lang="css">
    .middle {
        width:90%;
        margin : 50px auto;
    }
    .search{
        margin:20px 0 ;
    }
    .search >input[type="text"] {
        background-color:rgba(0,0,0,0.1);
    }
    
</style>