<template>
  <div class="middle">
      <nuxt-link to="/mm/requistion"> <b-button variant="outline-primary">Go back to Requistion</b-button> </nuxt-link>
      <!--
 <b-alert class="noti" v-if="msg.status=='success'" variant="success" show>{{msg.message}}</b-alert>
    <b-alert class="noti" v-if="msg.status=='danger'" variant="danger" show>{{msg.message}}</b-alert> -->
    <h1 class="mt-4">Customer:{{requistion[0].CustomerName}} 
    <p>Refer from PO#{{requistion[0].Name}}{{form.refID}}</p> 
    </h1>
   <b-table-simple hover caption-top bordered striped>
                       <caption>Material list </caption>
                       <b-thead head-variant="dark">
                           <b-tr>
                                 <b-th colspan="3">Order Date</b-th>
                                 <b-th colspan="3">Ship Date</b-th>
                                 <b-th colspan="3">Shipping Company</b-th>
                                 <b-th colspan="3">Order Number</b-th>
                                 <b-th colspan="3">Cus PO Number</b-th>
                           </b-tr>
                        </b-thead>
                        <b-tbody>
                         
                                 <b-td colspan="3">{{requistion[0].request_date}}</b-td>
                                 <b-td colspan="3">{{requistion[0].valid_to}}</b-td>
                                 <b-td colspan="3">UPS</b-td>
                                 <b-td colspan="3">{{form.Order}}</b-td>
                                 <b-td colspan="3">{{requistion[0].cusPO}}</b-td>
                         </b-tbody>  
           </b-table-simple>


                       <b-table-simple hover caption-top bordered striped class="mt-4">
                             <caption>Material list </caption>
                                 <b-tr class="mt-3" variant="success">
                                 <b-th colspan="3" >Quantity Ordered</b-th>
                                 <b-th colspan="3" >Quantity Shipped</b-th>
                                 <b-th colspan="3" >Product Weight (KG)(Per UNIT)</b-th>
                                 <b-th colspan="9">Description</b-th>
                                 <b-th colspan="3">Product Number</b-th>
                             
                        </b-tr>
                        <b-tr  v-for="data in requistion" :key="data.materialID">
                                 <b-th colspan="3">{{data.qty}}</b-th>
                                 <b-th colspan="3">{{data.qty}}</b-th>
                                 <b-th colspan="3">{{data.weight}}</b-th>
                                 <b-th colspan="9">{{data.MaterialDes}}</b-th>
                                 <b-th colspan="3">{{data.MaterialCode}}</b-th>                             
                        </b-tr>
                </b-table-simple>

                <b-table-simple hover caption-top bordered striped class="mt-4">
                             <caption>Material list </caption>
                                 <b-tr class="mt-3" variant="success">
                                 <b-th colspan="3" >Total Ordered</b-th>
                                 <b-th colspan="3" >Total Shipped</b-th>
                                 <b-th colspan="3" >Total Weight (KG)</b-th>
                                 <b-th colspan="9">Description</b-th>

                        </b-tr>
                             <b-tr class="mt-3" variant="success">
                                 <b-th colspan="3" >{{Qty}}</b-th>
                                 <b-th colspan="3" >{{Qty}}</b-th>
                                 <b-th colspan="3" >{{weight}}</b-th>
                                 <b-th colspan="9"></b-th>
                                                          
                           </b-tr>
                </b-table-simple>

                
           <div></div>
   
    <b-form @submit="onSubmit" @reset="onReset">

<b-form-group
        id="input-group-1"
        label="Packing refered: "
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
<!-------------------------------------------------------------------------->

<!-------------------------------------------------------------------------->

  <!----------------------------->
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }} {{requistion}} {{requistion[0]}}</pre>
    </b-card>
   
  </div>
</template>

<script>
  export default {
      head:{
          title:'Packing Create'
      },
    data() {
      return {
        form: {
          refID:this.$route.query.ref,
          Order:this.$route.query.Order,
            },
            }
           
    },
    methods: {
      redirect(id){
        console.log(id)
          setTimeout(()=> this.$router.push(`/sd/packing/${id}`),1500)
          console.log('doesnt work')
          },
     async onSubmit(evt) {
        evt.preventDefault()
        const data = {...this.requistion[0],description:this.form.description,customerPO:this.requistion[0].CusPO,Order:this.form.Order,
                      idStorage:this.requistion[0].idStorage}
        console.log('imhere')
        await this.fetchPost(JSON.stringify(data),`/api/sd/pack`)

        //////////INSERT in SDDoc/////////
         console.log('imhere2')
        const detailsID = await this.$axios.$get(`/api/sd/pack/get/lastid`)
        console.log(detailsID)
        /////////GET SDDOC LAST ID////////////
         console.log('imhere3');
        const detail = {Material: this.requistion,
                    refID:detailsID[0].idDoc}
       console.log(detail)
        await this.fetchPost(JSON.stringify(detail),`/api/sd/pack/detail`)
  

   
 /*       /////////INSERT INTO DETAILS /////////////
         console.log('imhere4')
         const discount = {DisDetails:this.discount,Discount:this.requistion[0].idDiscount}
         console.log(discount);
         await this.fetchPost(JSON.stringify(discount),`/api/sd/condition/detail`)
*/
         /////////INSERT INTO CONDITION ///////////
        await this.$axios.$put(`/api/sd/pack/${this.form.refID}`,null,null)
        /////////PUSH LEFT ID TO 
         console.log('imhere5')
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

    const requistion = await $axios.$get(`/api/sd/pick/${query.ref}`)
    const discount = await $axios.$get(`api/sd/condition`)
    const stock = await $axios.$get(`/api/mm/stock`)
    const storage = await $axios.$get(`/api/admin/storage`)
    const need = await $axios.$get(`/api/sd/pack/totalNeed/${query.ref}`)
    
    console.log(requistion)
   
        const msg = '';
        return {requistion,msg,discount,storage,stock};
    
  },
  computed:{
      weight:function()
      {
          return this.requistion.reduce( (total,weight)=> total+= (weight.weight*weight.qty),0)
      },
      Qty:function()
      {
          return this.requistion.reduce( (total,qty)=> total+= qty.qty,0)
      },
      /* start here*/ 
     /*FilteredCondition:function()
      {
          const incondition = [];
          for(let i=0;i<this.discount.length;i++)
          {
              for(let j=0;j<this.requistion.length;j++)
              {
                  if(this.requistion[j].idMaterial== this.discount[i].idMaterial)
                  {
                      if(this.requistion[j].qty >= this.discount[i].min)
                      incondition.push(
                          {
                              idDiscount: this.discount[i].id,
                              description: this.discount[i].description,
                              Total:    (this.discount[i].percentage*(this.requistion[i].price*this.requistion[i].qty))/100
                          }
                      )
                       break;
                  }
                  
              }
          }
          if(this.requistion[0].isMember === 1) incondition.push({

              description : '10% discount for members',
              Total : (this.calculate*10)/100,
          })
          if(this.calculate > 10000) {
              incondition.push({
                  description : '10% discount for more than 10000',
                  Total : (this.calculate*10)/100,
              })
          }
          this.discount = incondition;
          return incondition;
          
         /* end here
      },
        */
      
     /* StorageFiltering:function()
      {
          const AvailableStorage = [];

          const filterItem = ;
      },*/
      Total:function()
      {
         return this.calculate- this.FilteredCondition.reduce((total,discount) => (discount.Total),0)

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