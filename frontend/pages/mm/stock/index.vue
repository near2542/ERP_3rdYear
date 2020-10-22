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
                    <b-thead head-variant="dark">
                        <b-tr>
                              <b-th colspan="3">Storage</b-th>
                              <b-th colspan="3">Code</b-th>
                              <b-th colspan="4">Name</b-th>
                              <b-th colspan="3">Qty</b-th>
                        </b-tr>
                     </b-thead>
                     <b-tbody>
                        <b-tr v-for="(datas,index) in filtered" :key="index">
                              <b-td colspan="3">{{datas.StorageName}}</b-td>
                              <b-td colspan="3">{{datas.MaterialCode}}</b-td>
                              <b-td colspan="4">{{datas.MaterialName}}</b-td>
                              <b-td colspan="3">{{datas.qty}}</b-td>
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
         /*async  Delete(confirm,id,index)
            {   if(!confirm) return
                   await this.$axios.$put(`/api/mm/material/${id}`,null , null);
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
        }*/
        },
        computed:{
        filtered:function()
          {
            return this.data.filter( mats=> mats.MaterialCode.toLowerCase().match(this.search.toLowerCase()) 
            || mats.MaterialName.toLowerCase().match(this.search.toLowerCase()) )
          },
          length:function(){
              return this.data.length;
          },
        },
     async asyncData({$axios})
  {
    const data = await $axios.$get('/api/mm/stock')
    /*const Mats = material.map((mats) =>
    {
        mats.Date_Added = mats.Date_Added.toString().slice(0,10)
        return mats; 
    })*/
    console.log(data)
    return {data}
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