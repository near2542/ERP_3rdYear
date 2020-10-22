<template>
    <div class="middle">
        

       <nuxt-link to="/mm/vendors/create"> <b-button variant="success">Create Vendors</b-button> </nuxt-link>
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
        <b-table-simple hover caption-top striped bordered>
                    <caption>{{filtered.length}} results found</caption>
                    <b-thead head-variant="dark">
                        <b-tr>
                              <b-th colspan="3">Name</b-th>
                              <b-th colspan="9">Address</b-th>
                              <b-th colspan="6">Contact</b-th>
                              <b-th colspan="1">Created at</b-th>
                              <b-th colspan="4">Action</b-th>
                        </b-tr>
                     </b-thead>
                     <b-tbody>
                        <b-tr v-for="(vendor,index) in filtered" :key="vendor.idVendors">
                              <b-td colspan="3">{{vendor.VendorsName}}</b-td>
                              <b-td colspan="9">
                                  <p>{{vendor.VendorsStreet}} {{vendor.VendorCountry}}</p>
                                  <p>{{vendor.VendorsCity}} {{vendor.VendorsPostalCode}}</p>
                              </b-td>
                              <b-td colspan="6">
                                  <p>{{vendor.email}}</p>
                                  <p>{{vendor.phone}}</p>
                                  </b-td>
                              <b-td colspan="1">{{vendor.Date_added}}</b-td>
                              <b-td colspan="4">
                                <b-icon-trash-fill variant="danger" @click="showMsgBoxTwo(vendor.idVendors,index)" scale="1.5"></b-icon-trash-fill>
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
            delete:'',
        }
    },
        methods:{
         async  Delete(confirm,id,index)
            {   if(!confirm) return
                   await this.$axios.$put(`/api/mm/vendors/${id}`,null , null);
                   this.vendors.splice(index,1)
            },
           async showMsgBoxTwo(params,index) {
                this.delete = false
                try{
                const value = await this.$bvModal.msgBoxConfirm('Please confirm that you want to delete.', {
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
              console.log('inside')
               this.msg = { status:"success", message:"Deleted Success"}
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
            return this.vendors.filter( vendor=> vendor.VendorsName.toLowerCase().match(this.search.toLowerCase()) )
          },
          length:function(){
              return this.vendors.length;
          },
        },
     async asyncData({$axios})
  {
    const data = await $axios.$get('/api/mm/vendors')
    const vendors = data.map((vendor) =>
    {
        vendor.Date_added = vendor.Date_added.toString().slice(0,10)
        return vendor; 
    })
    return {vendors}
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