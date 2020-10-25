<template>
  <div class="middle">
      <nuxt-link to="/mm/material"> <b-button variant="outline-primary">Go back to Material list</b-button> </nuxt-link>
  <b-alert class="noti" v-if="msg.status=='success'" variant="success" show>{{msg.message}}</b-alert>
    <b-alert class="noti" v-if="msg.status=='danger'" variant="danger" show>{{msg.message}}</b-alert>
    <b-form @submit="onSubmit" @reset="onReset">
       <b-form-group
        id="input-group-1"
        label="Material Code"
        label-for="MatCode"
      >
        <b-form-input
          id="input-1"
          v-model="form.code"
          type="text"
          required
          placeholder="Material Code"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Material Name"
        label-for="Vendor"
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          type="text"
          required
          placeholder="Material Name"
        ></b-form-input>
      </b-form-group>
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
<!-------------------------------------------------------------------------->
 <b-form-group id="input-group-2" label="Weight (KG):" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.weight"
          type="number"
          step="any"
          required
          placeholder="Enter weight"
        ></b-form-input>
      </b-form-group> 
<!-------------------------------------------------------------------------->
      <b-form-group id="input-group-2" label="Price:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.price"
          type="number"
          step="any"
          required
          placeholder="Enter Price"
        ></b-form-input>
      </b-form-group> 
<!-------------------------------------------------------------------------->
      
<!-------------------------------------------------------------------------->
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
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
          code:'',
          name: '',
          description : '',
          price: '',
        },
        msg:'',
      }
    },
    methods: {
     async onSubmit(evt) {
        evt.preventDefault()
        if(this.form.code.length>8) {
          this.msg = {status:"danger" , message:"Material Code must not greather than 8"};
          return
        }
        else this.msg = ''
        await this.fetchPost((JSON.stringify(this.form)))
          console.log('im here')
          
        
        
      },
      async fetchPost(data){
          try{
            console.log('im here')
          await this.$axios.$post(`/api/mm/material`, data, {
            headers: {
            'Content-Type': 'application/json'
            }});

          const location = await this.$axios.$get(`/api/admin/storage/location`)
          const GetIDMat = await this.$axios.$get(`/api/mm/material/lastid`)
          const IDmat = GetIDMat[0].id
          const numberLocation = location[0].location;
          await this.$axios.$post(`/api/mm/stock/initial/${IDmat}/${numberLocation}`)
            this.msg = {status:"success",
                         message:"Material has been added to list" ,
                        }
            this.form.code=''
          this.form.name= ''
          this.form.weight = ''
          this.form.description = ''
          this.form.price=''
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
        this.form.code=''
        this.form.name= ''
        this.form.description = ''
        this.form.weight = ''
        this.form.price=''
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