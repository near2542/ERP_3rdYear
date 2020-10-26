<template>
  <div class="middle">
      <nuxt-link to="/mm/requistion"> <b-button variant="outline-primary">Go back to Requistion</b-button> </nuxt-link>
 <b-alert class="noti" v-if="msg.status=='success'" variant="success" show>{{msg.message}}</b-alert>
    <b-alert class="noti" v-if="msg.status=='danger'" variant="danger" show>{{msg.message}}</b-alert>
    <h1>Vendor:{{requistion[0].VendorsName}}</h1>
   <b-table-simple hover caption-top bordered striped>
                       <caption>Material list </caption>
                       <b-thead head-variant="dark">
                           <b-tr>
                                 <b-th colspan="3">Code</b-th>
                                 <b-th colspan="3">Name</b-th>
                                 <b-th colspan="3">Price ($)</b-th>
                                 <b-th colspan="3">Qty ($)</b-th>
                                 <b-th colspan="3">Total ($)</b-th>
                           </b-tr>
                        </b-thead>
                        <b-tbody>
                           <b-tr v-for="(requis,index) in requistion" :key="index">
                                 <b-td colspan="3">{{requis.MaterialCode}}</b-td>
                                 <b-td colspan="3">{{requis.MaterialName}}</b-td>
                                 <b-td colspan="3">{{requis.price}}</b-td>
                                 <b-td colspan="3">{{requis.qty}}</b-td>
                                 <b-td colspan="3">{{requis.qty*requis.price}}</b-td>
                           </b-tr>
                           <b-tr>
                                 <b-td colspan="12" style="text-align:right"><strong>Total</strong></b-td>
                                 <b-td colspan="3"><strong>{{calculate}}</strong></b-td>
                           </b-tr>
                           
                         </b-tbody>  
           </b-table-simple>
   
    <b-form @submit="onSubmit" @reset="onReset">

<b-form-group
        id="input-group-1"
        label="Requistion refered: "
        label-for="Material Description"
      >
        <b-form-input
          id="input-1"
          v-model="form.refID"
          disabled
          type="text"
          placeholder="Reference ID"
        ></b-form-input>
      </b-form-group>

<b-form-group
        id="input-group-1"
        label="Ship To: "
        label-for="Material Description"
      >
        <b-form-input
          id="input-1"
          v-model="requistion[0].StorageName"
          disabled
          type="text"
          placeholder="Reference ID"
        ></b-form-input>
      </b-form-group>

  <b-form-group
        id="input-group-1"
        label="Bill To: "
        label-for="Material Description"
      >
        <b-form-input
          id="input-1"
          v-model="requistion[0].ORGname"
          disabled
          type="text"
          placeholder="Reference ID"
        ></b-form-input>
      </b-form-group>

        
      <!-------------------------------------------------------------------------->
<b-form inline class="mb-4 godown" >
    <label  class="ml-3 mr-3 " for="datepicker-request-date" top>Select Request Date:</label>
    <b-form-datepicker required class=" col-4 mr-5" v-model="form.requestDate" varinat="success"  id="datepicker-request-date" placeholder="Request Date" locale="en"></b-form-datepicker>
 </b-form >   
<!-------------------------------------------------------------------------->

 <b-form-group
        id="input-group-1"
        label="Description"
        label-for="Material Description"
      >
        <b-form-textarea
          id="input-1"
          v-model="form.description"
          type="text"
          placeholder="Description"
        ></b-form-textarea>
      </b-form-group>
<!-------------------------------------------------------------------------->
      
<!-------------------------------------------------------------------------->
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
   
  </div>
</template>

<script>
  export default {
      head:{
          title:'Create Material'
      },
    data() {
      return {
        form: {
          refID:this.$route.query.ref,
            },  
            }
           
    },
    methods: {
      redirect(id){
        console.log(id)
          setTimeout(()=> this.$router.push(`/mm/purchase/${id}`),1500)
          console.log('doesnt work')
          },
     async onSubmit(evt) {
        evt.preventDefault()
        const data = { ...this.form ,vendorsID:this.requistion[0].idVendors,idStorage:this.requistion[0].idStorage}
        console.log('imhere')
        await this.fetchPost(JSON.stringify(data),`/api/mm/purchase`)
         console.log('imhere2')
        const refID = await this.$axios.$get(`/api/mm/purchase/get/lastid`)
         console.log('imhere3')
        console.log(refID[0]);
        const detail = {Material: this.requistion,
                    refID:refID[0].idDoc}
        await this.fetchPost(JSON.stringify(detail),`/api/mm/purchase/detail`)
         console.log('imhere4')
        await this.$axios.$put(`/api/mm/purchase/${this.form.refID}`,null,null)
         console.log('imhere5')
        this.redirect(refID[0].idDoc)
      },
      
      async fetchPost(data,url){
          try{
          await this.$axios.$post(`${url}`, data, {
            headers: {
            'Content-Type': 'application/json'
            }});}
         catch(err){
             this.msg = {status:"danger",
                         message:"something went wrong" ,
                        }
         }
          },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.materialID=null,
        this.form.vendorsID= null
      },
    },
     async asyncData({$axios,params,query})
  {

    const requistion = await $axios.$get(`/api/mm/requistion/${query.ref}`)
        const msg = '';
        console.log(requistion)
        return {requistion,msg};
    
  },
  computed:{
      calculate:function()
      {
          return this.requistion.reduce( (total,price)=> total+= (price.price*price.qty),0)
      }
  }
  }
</script>

<style lang="css" >
    .middle {
        width:80%;
        margin : 50px auto;
    }
    .passed{
        color:green;
    }
    .error{
        color:red;
    }
    .noti{
      margin-top:20px;
    }
</style>