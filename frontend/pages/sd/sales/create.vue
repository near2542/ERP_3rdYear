<template>
  <div class="middle">
      <nuxt-link to="/sd/quotation"> <b-button variant="outline-primary">Go back to Requistion</b-button> </nuxt-link>
      <!--
 <b-alert class="noti" v-if="msg.status=='success'" variant="success" show>{{msg.message}}</b-alert>
    <b-alert class="noti" v-if="msg.status=='danger'" variant="danger" show>{{msg.message}}</b-alert> -->
    <h1 class="mt-4">Customer:{{requistion[0].CustomerName}} 
    <p>Refer from QT#{{requistion[0].Name}}{{form.refID}}</p> 
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
                                 <b-th colspan="3">Price (฿)</b-th>
                                 <b-th colspan="3">Qty </b-th>
                                 <b-th colspan="3">Total (฿)</b-th>
                           </b-tr>
                        </b-thead>
                        <b-tbody>
                           <b-tr v-for="(requis,index) in requistion" :key="index">
                                 <b-td colspan="3">{{requis.MaterialCode}}</b-td>
                                 <b-td colspan="3">{{requis.MaterialName}}</b-td>
                                 <b-td colspan="3">{{requis.Price}}</b-td>
                                 <b-td colspan="3">{{requis.qty}}</b-td>
                                 <b-td colspan="3">{{requis.qty*requis.Price}}</b-td>
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
                        <b-tr  v-for="dis in discount" :key="dis.description">      
                                 <b-th colspan="3">{{dis.idDiscount}}</b-th>
                                 <b-th colspan="9">{{dis.description}}</b-th>
                                 <b-th colspan="3">{{dis.Total}}</b-th>
                        </b-tr>
                         <b-tr bg-dark>
                                 <b-th colspan="12" style="text-align:right">Discount Total</b-th>
                                 <b-th colspan="3">{{calculateDiscount}}</b-th>
        
                             
                        </b-tr>

                           <b-tr>
                                 <b-td colspan="12" style="text-align:right"><strong>Net Total</strong></b-td>
                                 <b-td colspan="3" variant="primary"><strong>{{calculate-calculateDiscount}}</strong></b-td>
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
        label="Customer PO:"
        label-for="Material Description"
      >
        <b-form-input
          id="input-1"
          v-model="form.CustomerPO"
          
          required
          type="text"
          placeholder="INSERT CUSTOMER PO"
        ></b-form-input>
      </b-form-group>


        
      <!-------------------------------------------------------------------------->
<b-form class="mb-4 godown" >
    <label  class="mr-3 " for="datepicker-request-date" top><h4>Select Request Date:</h4></label>
    <b-form-datepicker required class="mr-5" v-model="form.requestDate" varinat="success"  id="datepicker-request-date" placeholder="Request Date" locale="en"></b-form-datepicker>
 </b-form >


  <!------------------------------------------------------------------------->
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
          title:'Sales Create'
      },
    data() {
      return {
        form: {
          refID:this.$route.query.ref,
          customerPO:'',
            },
            }
           
    },
    methods: {
      redirect(id){
        console.log(id)
          setTimeout(()=> this.$router.push(`/sd/sales/${id}`),1500)
          console.log('doesnt work')
          },
     async onSubmit(evt) {
        evt.preventDefault()
        const data = {...this.requistion[0],description:this.form.description,customerPO:this.form.CustomerPO,requestDate:this.form.requestDate}
        console.log('imhere')
        await this.fetchPost(JSON.stringify(data),`/api/sd/sales`)

        //////////INSERT in SDDoc/////////
         console.log('imhere2')
        const detailsID = await this.$axios.$get(`/api/sd/sales/get/lastid`)
        console.log(detailsID)
        /////////GET SDDOC LAST ID////////////
         console.log('imhere3');
        const detail = {Material: this.requistion,
                    refID:detailsID[0].idDoc}
       console.log(detail)
        await this.fetchPost(JSON.stringify(detail),`/api/sd/sales/detail`)
   
 /*       /////////INSERT INTO DETAILS /////////////
         console.log('imhere4')
         const discount = {DisDetails:this.discount,Discount:this.requistion[0].idDiscount}
         console.log(discount);
         await this.fetchPost(JSON.stringify(discount),`/api/sd/condition/detail`)
*/
         /////////INSERT INTO CONDITION ///////////
        await this.$axios.$put(`/api/sd/quotation/${this.form.refID}`,null,null)
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

    const requistion = await $axios.$get(`/api/sd/quotation/${query.ref}`)
    console.log(`api/sd/condition/${requistion[0].idDiscount}`)
    const discount = await $axios.$get(`api/sd/condition/${requistion[0].idDiscount}`)
  console.log(requistion);
    console.log(discount)
        const msg = '';
        return {requistion,msg,discount};
    
  },
  computed:{
      calculate:function()
      {
          return this.requistion.reduce( (total,price)=> total+= (price.Price*price.qty),0)
      },
      calculateDiscount:function()
      {
        return this.discount.reduce((total,disc)=> disc.Total+=total,0)
      }
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
          */
         /* end here*/ 
      },
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