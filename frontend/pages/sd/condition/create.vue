<template>
  <div class="middle">
      <nuxt-link to="/sd/condition"> <b-button variant="outline-primary">Go back to Condition list</b-button> </nuxt-link>
  <b-alert class="noti" v-if="msg.status=='success'" variant="success" show>{{msg.message}}</b-alert>
    <b-alert class="noti" v-if="msg.status=='danger'" variant="danger" show>{{msg.message}}</b-alert>
    <b-form @submit="onSubmit" @reset="onReset">


       Please select material
      <b-form-select v-model="form.materialID" required :options="materials" class="mb-3">
      <template #first>
        <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
      </template>
      </b-form-select>

<!-------------------------------------------------------------------------->
      <b-form-group id="input-group-2" label="Description:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.description"
          type="text"
  
          required
          placeholder="Enter description"
        ></b-form-input>
      </b-form-group> 
<!-------------------------------------------------------------------------->
<!-------------------------------------------------------------------------->
      <b-form-group id="input-group-2" label="Minimum:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.min"
          type="number"
          required
          placeholder="Enter Minimum"
        ></b-form-input>
      </b-form-group> 
<!-------------------------------------------------------------------------->
<!-------------------------------------------------------------------------->
      <b-form-group id="input-group-2" label="Percentage Discount:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.percent"
          type="number"
          step="any"
          required
          placeholder="Enter Percentage Discount"
        ></b-form-input>
      </b-form-group> 
<!-------------------------------------------------------------------------->
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>

  </div>
</template>

<script>
  export default {
      head:{
          title:'Create Condition'
      },
    data() {
      return {
        form: {

        },
        msg:'',
      }
    },
    methods: {
     async onSubmit(evt) {
        evt.preventDefault()
        await this.fetchPost((JSON.stringify(this.form)))
          this.form.materialID=null;
          this.form.vendorsID= null;
      },
      async fetchPost(data){
          try{
          await this.$axios.$post(`/api/sd/condition`, data, {
            headers: {
            'Content-Type': 'application/json'
            }});
            this.msg = {status:"success",
                         message:"Material has been added to list" ,
                        }
                        }
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
     async asyncData({$axios})
  {
    const vendor = await $axios.$get('/api/mm/vendors')
    const material = await $axios.$get('/api/mm/material')
    const vendors = vendor.map((vendors)=>{
        return {value: vendors.idVendors,text:vendors.VendorsName};
    })
    const materials = material.map((materials)=>
    {
        return { value:materials.idMaterial, text: `${materials.MaterialCode}:${materials.MaterialName}`}
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
</style>