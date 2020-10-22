<template>
  <div class="middle">
      <nuxt-link to="/mm/requistion"> <b-button variant="outline-primary">Go back to Purchase Requistionr List</b-button> </nuxt-link>
  <b-alert class="noti" v-if="msg.status=='success'" variant="success" show>{{msg.message}}</b-alert>
    <b-alert class="noti" v-if="msg.status=='danger'" variant="danger" show>{{msg.message}}</b-alert>
    <b-form @submit="onSubmit" @reset="onReset">

        Please select vendors
           <b-form-select v-model="form.vendorsID" required :options="vendors" class="mb-3">
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
      <b-form-select v-model="form.Material[index].idMaterial" required :options="materials" class="mb-3 mr-1">
      <template #first>
        <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
      </template>
      </b-form-select>
      <label for="material" class="mr-2">Price: </label>
      <b-form-input
          id="input-2"
          class="mr-2"
          v-model="form.Material[index].price"
          type="number"
          step="any"
          required
          placeholder="Enter Price"
        ></b-form-input>
      <label for="material" class="mr-2">Qty: </label>
      <b-form-input
          id="input-2"
          class="mr-2"
          v-model="form.Material[index].qty"
          type="number"
          step="any"
          required
          placeholder="Enter Price"
        ></b-form-input>

        Total:
        <b-form-input
        class="mr-2"
          id="input-2"
          :value="form.Material[index].qty*form.Material[index].price"
          type="number"
          step="any"
          disabled
          placeholder=""
        ></b-form-input>
        Delete:<b-icon-trash-fill variant="danger" @click="del(index)" scale="1.5"></b-icon-trash-fill>
</b-form>
</div>

<button class="mt-3" type="button"  @click="addmore"> Add more Material </button> 



<!-------------------------------------------------------------------------->

       <h3 class="mt-3"> Ship to:</h3>
       <b-form-select v-model="form.idStorage" required :options="storages" class=" mb-3">
         
      <template #first>
        <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
      </template>
      </b-form-select>
<!-------------------------------------------------------------------------->
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
  <!------------------------------------------------------------------------>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
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
            console.log(id)
            setTimeout(()=>this.$router.push(`/mm/requistion/${id}`),1500)
          },
         /* filteredMat(value){
            if(value==0) return this.materials
        return this.materials.filter(mats=> mats.value != this.form.Material[value-1].idMaterial)
        },*/
     async onSubmit(evt) {
        evt.preventDefault()
        await this.fetchPost((JSON.stringify(this.form))) //inset into MMdocument
        const refid = await this.$axios.$get(`/api/mm/requistion/get/lastid`)
        console.log();
        const data = {...this.form,refid:refid[0].idDoc};
        await this.fetchDetail((JSON.stringify(data)))
        this.redirect(refid[0].idDoc)
      
      },
      async fetchPost(data){
          try{
          await this.$axios.$post(`/api/mm/requistion`, data, {
            headers: {
            'Content-Type': 'application/json'
            }});}
         catch(err){
             this.msg = {status:"danger",
                         message:"something went wrong" ,
                        }
         }
          },
        async fetchDetail(data){
                      try{
                        console.log(data);
                        await this.$axios.$post(`/api/mm/requistion/detail`,data,{
                          headers:{
                            'Content-Type': 'application/json'}})
                         }
                        catch(err)
                        {
                          this.msg = {status:"danger",
                         message:"something went wrong" ,
                        }
                          console.log(err);
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
    const vendor = await $axios.$get('/api/mm/vendors')
    const material = await $axios.$get('/api/mm/material')
    const storage = await $axios.$get(`/api/admin/storage`)

    const storages = storage.map((value)=>{
        return {value: value.idStorage,text:value.StorageName};
    })
    const vendors = vendor.map((vendors)=>{
        return {value: vendors.idVendors,text:vendors.VendorsName};
    })
    const materials = material.map((materials)=>
    {
        return { value:materials.idMaterial, text: `${materials.MaterialCode}:${materials.MaterialName}`}
    })

    return {vendors,materials,storages}
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