<template>
  <div class="middle">
      <nuxt-link to="/mm/requistion"> <b-button variant="outline-primary">Go back to Requistion</b-button> </nuxt-link>

    <h1>Vendor:{{requistion[0].VendorsName}}</h1>
   <b-table-simple hover caption-top bordered striped>
                       <caption>Pay to vendors</caption>
                       <b-thead head-variant="dark">
                           <b-tr>
                                 <b-th colspan="3">Code</b-th>
                                 <b-th colspan="3">Name</b-th>
                                 <b-th colspan="3">UNIT</b-th>
                                 <b-th colspan="3">Unit Price(฿)</b-th>
                                 <b-th colspan="3">QTY ORDERED </b-th>
                                 <b-th colspan="3">QTY RECEIVED</b-th>
                                 <b-th colspan="3">Total ($)</b-th>
                           </b-tr>
                        </b-thead>
                        <b-tbody>
                           <b-tr v-for="(requis,index) in requistion" :key="index">
                                 <b-td colspan="3">{{requis.MaterialCode}}</b-td>
                                 <b-td colspan="3">{{requis.MaterialName}}</b-td>
                                 <b-td colspan="3">EACH</b-td>
                                 <b-td colspan="3">{{requis.price}}</b-td>
                                 <b-td colspan="3">{{requis.qty}}</b-td>
                                 <b-td colspan="3">{{requis.qty}}</b-td>
                                 <b-td colspan="3">{{requis.qty*requis.price}}</b-td>
                           </b-tr>
                           <b-tr>
                                 <b-td colspan="18" style="text-align:right"><strong>Total</strong></b-td>
                                 <b-td colspan="6"><strong>{{calculate}}</strong></b-td>
                           </b-tr>
                         </b-tbody>  
           </b-table-simple>
   
    <b-form @submit="onSubmit" @reset="onReset">

<b-form-group
        id="input-group-1"
        label="Good Receipt refered : "
        label-for="Material Description">
        <b-form-input
          id="input-1"
          v-model="form.refID"
          disabled
          type="text"
          placeholder="Reference ID"
        ></b-form-input>
</b-form-group>


        
<!-------------------------------------------------------------------------->
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
          title:'Pay'
      },
    data() {
      return {
        form: {
          refID:this.$route.query.ref
            },
        }      
    },
    methods: {
      redirect(id){
         this.$router.push(`/mm/invoices/${id}`)
          console.log('doesnt work')
          },
     async onSubmit(evt) {
         try{
        evt.preventDefault()
        const data = { ...this.form ,vendorsID:this.requistion[0].idVendors,idStorage:this.requistion[0].idStorage}
        console.log('here')
        await this.fetchPost(JSON.stringify(data),`/api/mm/invoices`)
        console.log('data' + data)
        const refID = await this.$axios.$get(`/api/mm/invoices/get/lastid`)
        console.log('here2')
        const detail = {Material: this.requistion,
                        refID:refID[0].idDoc}
        console.log(detail)
        await this.fetchPost(JSON.stringify(detail),`/api/mm/invoices/detail`)
        console.log(this.form.refID)
        await this.$axios.$put(`/api/mm/goodreceipt/${this.form.refID}`,null,null)
        this.redirect(refID[0].idDoc)
         }
         catch(err)
         {
             console.log(err);
         }
        
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

    const requistion = await $axios.$get(`/api/mm/goodreceipt/${query.ref}`)
        const msg = '';
        console.log(requistion)
        return {requistion,msg};
  },
  computed:{
      calculate:function()
      {
          return this.requistion.reduce( (total,price)=> total+= (price.price*price.qty),0)
      },
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