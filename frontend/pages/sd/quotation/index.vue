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
                              <b-th colspan="3">ID</b-th>
                              <b-th colspan="3">Vendors Name</b-th>
                              <b-th colspan="4">Description</b-th>
                              <b-th colspan="3">request_date </b-th>
                              <b-th colspan="3">Valid To</b-th>
                              <b-th colspan="4">Action</b-th>
                        </b-tr>
                     </b-thead>
                     <b-tbody>
                        <b-tr v-for="(data,index) in filtered" :key="data.idDoc">
                              <b-td colspan="3">{{data.idDoc}}</b-td>
                              <b-td colspan="3">{{data.CustomerName}}</b-td>
                              <b-td colspan="4">{{data.description}}</b-td>
                              <b-td colspan="3">{{data.request_date}}</b-td>
                              <b-td colspan="3">{{data.ValidTo}}</b-td>
                              <b-td colspan="4">
                                
                              <div v-if="data.Stat == 1">
                            <nuxt-link :to="`/sd/sales/create?ref=${data.idDoc}`">Make Sales Order</nuxt-link>
                            <nuxt-link :to="`/sd/quotation/${data.idDoc}`"><b-icon-eye-fill class="mr-2" variant="success"  scale="1.5"></b-icon-eye-fill></nuxt-link>
                            <b-icon-trash-fill variant="danger" @click="showMsgBoxTwo(mats.idMaterial,index)" scale="1.5"></b-icon-trash-fill>
                            </div>
                            
                            <div v-else>
                              Refered
                              <nuxt-link :to="`/sd/quotation/${data.idDoc}`"><b-icon-eye-fill class="mr-2" variant="success"  scale="1.5"></b-icon-eye-fill></nuxt-link>
                            </div>
                              </b-td>
                        </b-tr>
                      </b-tbody>  
        </b-table-simple>
        </div>
        <nuxt-link to="/sd"> <b-button variant="info" v-model="length">Go back</b-button></nuxt-link>
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
         async  Delete(confirm,id,index)
            {   if(!confirm) return
                   await this.$axios.$put(`/api/sd/inquiry/${id}`,null , null);
                  this.Mats.splice(index,1)
                   this.msg = { status:"success", message:"Deleted Success"}
            },
           async showMsgBoxTwo(params,index) {
                this.delete = false
                try{
                const value = await this.$bvModal.msgBoxConfirm('Please confirm that you want to delete everything.', {
                  title: 'Please Confirm',
                  size: 'ml',
                  buttonSize: 'ml',
                  okVariant: 'danger',
                  okTitle: 'YES',
                  cancelVariant : 'info',
                  cancelTitle: 'NO',
                  footerClass: 'p-2',
                  hideHeaderClose: false,
                  centered: true,  })
              await this.Delete(value,params,index)
              console.log(this.Mats)
            }
          catch(err){
              console.log(err);
              this.msg = { status:"danger", message:"Deleted Failed" }
          }
        }
        },
        computed:{
        filtered:function()
          {
            return this.datas.filter(requis=> requis.idDoc.toLowerCase().match(this.search.toLowerCase()) 
            || requis.CustomerName.toLowerCase().match(this.search.toLowerCase()) )
          },
          length:function(){
              return this.datas.length;
          },
          
        },
        /* Fetch Data Before loaded*/
     async asyncData({$axios})
  {
    const data = await $axios.$get('/api/sd/quotation')
    console.log(data)
   const datas = data.map((inq) =>
    {
        inq.request_date = inq.request_date.toString().slice(0,10)
        inq.ValidTo = inq.valid_to.toString().slice(0,10)
        return inq; 
    })
    console.log(datas)
  return {datas};
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