<template>
  <div class="middle">
      <nuxt-link to="/sd/packing"> <b-button variant="outline-primary">Go back to Packing</b-button> </nuxt-link>
      <!--
 <b-alert class="noti" v-if="msg.status=='success'" variant="success" show>{{msg.message}}</b-alert>
    <b-alert class="noti" v-if="msg.status=='danger'" variant="danger" show>{{msg.message}}</b-alert> -->
<h1 class="mt-4">Customer:{{data[0].CustomerName}} 
    <p>Refer Packing# {{form.refID}}</p> 
    </h1>
 <b-table-simple hover caption-top bordered striped>
                       <caption>Material list </caption>
                       <b-thead head-variant="dark">
                            <b-tr>
                                 <b-th colspan="15">Material</b-th>
                           </b-tr>
                           <b-tr>
                                 <b-th colspan="3">Code</b-th>
                                 <b-th colspan="3">Name</b-th>
                                 <b-th colspan="3">Price ($)</b-th>
                                 <b-th colspan="3">Qty ($)</b-th>
                                 <b-th colspan="3">Total ($)</b-th>
                           </b-tr>
                        </b-thead>
                        <b-tbody>
                           <b-tr v-for="(data,index) in data" :key="index">
                                 <b-td colspan="3">{{data.MaterialCode}}</b-td>
                                 <b-td colspan="3">{{data.MaterialName}}</b-td>
                                 <b-td colspan="3">{{data.Price}}</b-td>
                                 <b-td colspan="3">{{data.qty}}</b-td>
                                 <b-td colspan="3">{{data.qty*data.Price}}</b-td>
                           </b-tr>
                            <b-tr>
                                 <b-td colspan="12" style="text-align:right"><strong>Total</strong></b-td>
                                 <b-td colspan="3"><strong>{{calculate}}</strong></b-td>
                           </b-tr>
                             <b-tr variant="success">
                                 <b-th colspan="15">Discount</b-th>
                           </b-tr>
                        <b-tr variant="success">
                                 <b-th colspan="3" >Code</b-th>
                                 <b-th colspan="9">Description</b-th>
                                 <b-th colspan="3">Discount Total</b-th>
                             
                        </b-tr>
                        <b-tr  v-for="dis in discount" :key="dis.materialID">
                                 <b-th colspan="3">{{dis.idDiscount}}</b-th>
                                 <b-th colspan="9">{{dis.description}}</b-th>
                                 <b-th colspan="3">{{dis.Total}}</b-th>
                             
                        </b-tr>
                         <b-tr bg-dark>
                                 <b-th colspan="12" style="text-align:right">Discount Total</b-th>
                                 <b-th colspan="3">{{calculatediscount}}</b-th>
        
                             
                        </b-tr>

                           <b-tr>
                                 <b-td colspan="12" style="text-align:right"><strong>Net Total</strong></b-td>
                                 <b-td colspan="3" variant="primary"><strong>{{calculate-calculatediscount}}</strong></b-td>
                           </b-tr>
                           
                         </b-tbody>  
           </b-table-simple>
                    

    <b-form @submit="onSubmit" @reset="onReset">

<b-form-group
        id="input-group-1"
        label="Purchase Order refered: "
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
  <!----------------------------->
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>

   
  </div>
</template>

<script>
  export default {
      head:{
          title:'Create Billing'
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
          setTimeout(()=> this.$router.push(`/sd/billing/${id}`),1500)
          console.log('doesnt work')
          },

     async onSubmit(evt) {
        evt.preventDefault()
        const data = {...this.data[0],description:this.form.description,customerPO:this.data[0].CusPO,idStorage:this.data[0].idStorage}
        console.log('imhere')
        await this.fetchPost(JSON.stringify(data),`/api/sd/billing`)

        //////////INSERT in SDDoc/////////
        console.log('imhere2')
        const detailsID = await this.$axios.$get(`/api/sd/billing/get/lastid`)
        console.log(detailsID)
        /////////GET SDDOC LAST ID////////////
         console.log('imhere3');
        const detail = {Material: this.data,
                    refID:detailsID[0].idDoc,
                    idStorage:this.data[0].idStorage,
                    }
       console.log(detail)
        await this.fetchPost(JSON.stringify(detail),`/api/sd/billing/detail`)
   
     
         console.log('imhere5')
        console.log(detail)
            await this.fetchPost(JSON.stringify(detail),`/api/mm/stock/sold`)
            console.log(detailsID[0].idDOc + 'fukkkk')
             await this.fetchPost(JSON.stringify(detail),`/api/mm/stock/deduct`)
              await this.$axios.$put(`/api/sd/billing/${this.form.refID}`,null,null)
        this.redirect(detailsID[0].idDoc)
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

    const datas = await $axios.$get(`/api/sd/pack/${query.ref}`)

    const data = datas.map((infor) =>
    {
        infor.request_date = infor.request_date.toString().slice(0,10)
        infor.ValidTo = infor.valid_to.toString().slice(0,10)
        return infor; 
    })
    console.log(data);
    const msg= '';
    const discount = await $axios.$get(`/api/sd/condition/${data[0].idDiscount}`)
    console.log(discount)
        return {data,msg,discount};
    
  },
 computed:{
      calculate:function()
      {
          return this.data.reduce( (total,price)=> total+= (price.Price*price.qty),0)
      },
      calculatediscount:function()
      {
          return this.discount.reduce( (total,price)=> total+= price.Total,0)
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