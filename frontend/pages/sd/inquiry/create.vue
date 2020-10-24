<template>
  <div class="middle">
      <nuxt-link to="/sd/inquiry"> <b-button variant="outline-primary">Go back to Inquiry List</b-button> </nuxt-link>
  <b-alert class="noti" v-if="msg.status=='success'" variant="success" show>{{msg.message}}</b-alert>
    <b-alert class="noti" v-if="msg.status=='danger'" variant="danger" show>{{msg.message}}</b-alert>
    <b-form @submit="onSubmit" @reset="onReset">

        Please select vendors
           <b-form-select v-model="form.customerID" required :options="vendors" class="mb-3">
      <template #first>
        <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
      </template>
      </b-form-select>
        
      <!-------------------------------------------------------------------------->
<b-form-group
        id="input-group-1"
        label="Material Description"
        label-for="Material Description"
      >
        <b-form-input
          id="input-1"
          v-model="form.description"
          type="text"
          placeholder="Material Description "
        ></b-form-input>
      </b-form-group>



<b-form inline class="mb-4 godown" >
    <label  class="ml-3 mr-3 " for="datepicker-request-date" top>Select Request Date:</label>
    <b-form-datepicker required class=" col-4 mr-5" v-model="form.requestDate" varinat="success"  id="datepicker-request-date" placeholder="Request Date" locale="en"></b-form-datepicker>
    <label  for="datepicker-valid-to"  class="mr-3">Valid To:</label>
    <b-form-datepicker required class=" col-4" v-model="form.validTo" id="datepicker-valid-to" placeholder="Valid date" locale="en"></b-form-datepicker>
 </b-form >   
<!-------------------------------------------------------------------------->

 <div class="godown mb-3" v-for="(Mat,index) in form.Material" :key="index"  >
<h3 variant="success">Material : {{index+1}}</h3>
<b-form inline class="mb-4 mats" >
      <label for="material" class="mr-2">Material: </label>
      <b-form-select v-model="form.Material[index].idMaterial" required :options="materials" class="mb-3 mr-4">
      <template #first>
        <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
      </template>
      </b-form-select>

      <label for="material" class="mr-2" >Qty: </label>
      <b-form-input
          id="input-2"
          class="mr-4"
          v-model="form.Material[index].qty"
          type="number"
          step="any"
          required
          placeholder="Enter Qty"
        ></b-form-input>

        <h4 class="mr-2">Delete: </h4><b-icon-trash-fill variant="danger" @click="del(index)" scale="1.5"></b-icon-trash-fill>
</b-form>
</div>

<button class="mt-3" type="button"  @click="addmore"> Add more Material </button> 



<!-------------------------------------------------------------------------->

   
<!-------------------------------------------------------------------------->
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
  <!------------------------------------------------------------------------>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}{{requistion}} </pre>
    </b-card>
  </div>
</template>

<script>
  export default {
      head:{
          title:'Create Requistion'
      },
    data() {
      return {
        form: {
          vendorsID : null,
          requestDate : '',
          validTo : '',

          Material:[{
            idMaterial:'',
            qty:'',
            price:'',
          },
          ],
        },
        msg:'',
      }
    },
    methods: {
          addmore(){
            this.form.Material.push({idMaterial:'',
            qty:'',
            price:'',
            })
          },
          del(index)
          {
            console.log('imin')
            this.form.Material.splice(index,1);
          },
          redirect(id){
            setTimeout(()=>this.$router.push(`/sd/inquiry/${id}`),1500)
          },
     async onSubmit(evt) {
        evt.preventDefault()
       await this.fetchPost(null,`/api/sd/condition/get/startcondition`) //start idDiscount condition
      const Discount = await this.$axios.$get(`/api/sd/condition/get/lastconidition`)
      const inquiryStart = {...this.form,idDiscount:Discount[0].id}
        await this.fetchPost(JSON.stringify(inquiryStart),`/api/sd/inquiry/`) //inset into SDdocument
        const idRef = await this.$axios.$get(`/api/sd/inquiry/get/lastid`)
        const refid = idRef[0].idDoc
        console.log(refid);
        const data = {...this.form,refid};
        console.log(data);
        await this.fetchPost(JSON.stringify(data),`/api/sd/inquiry/detail`)
        this.redirect(refid)
      
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
      }
    },
    /*GET DATA -----------------------------------------------------------------------*/
     async asyncData({$axios})
  {
    const vendor = await $axios.$get('/api/sd/customer')
    const material = await $axios.$get('/api/mm/material')


    const vendors = vendor.map((vendors)=>{
        return {value: vendors.idCustomer,text:vendors.CustomerName};
    })
    const materials = material.map((materials)=>
    {
        return { value:materials.idMaterial, text: `${materials.MaterialCode}:${materials.MaterialName}`, price:materials.price}
    })

    return {vendors,materials}
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

    .inline{
      display:in-line;
      grid-auto-columns: 50%;
    }
    .mats {
      padding:4px 4px;
      display:flex;
      align-items:center;
    }
    .godown{
      border-bottom:1px solid;
      padding:10px;
    }
</style>