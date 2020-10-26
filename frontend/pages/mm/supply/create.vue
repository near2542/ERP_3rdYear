<template>
  <div class="middle">
      <nuxt-link to="/mm/supply"> <b-button variant="outline-primary">Go back to Supply list</b-button> </nuxt-link>
  <b-alert class="noti" v-if="msg.status=='success'" variant="success" show>{{msg.message}}</b-alert>
    <b-alert class="noti" v-if="msg.status=='danger'" variant="danger" show>{{msg.message}}</b-alert>
    <b-form @submit="onSubmit" @reset="onReset">


        Please select vendors
           <b-form-select v-model="form.vendorsID" required :options="vendors" class="mb-3">
      <template #first>
        <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
      </template>
      </b-form-select>

       Please select material
      <b-form-select v-model="form.materialID" required :options="materials" class="mb-3">
      <template #first>
        <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
      </template>
      </b-form-select>

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
          vendorsID : null,
          materialID: null,
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
          await this.$axios.$post(`/api/mm/supply`, data, {
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