<template>
  <div class="middle">
      <nuxt-link to="/mm/vendors"> <b-button variant="outline-primary">Go back to Vendors list</b-button> </nuxt-link>
    <b-alert class="noti" v-if="msg.status=='success'" variant="success" show>{{msg.message}}</b-alert>
    <b-alert class="noti" v-if="msg.status=='danger'" variant="danger" show>{{msg.message}}</b-alert>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Vendor Name"
        label-for="Vendor"
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          type="text"
          required
          placeholder="Vendor Name"
        ></b-form-input>
      </b-form-group>

<b-form-group id="input-group-2" label="Address / Street:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.street"
          type="text"
          required
          placeholder="Adress / Street"
        ></b-form-input>
</b-form-group>

<b-form-group id="input-group-2" label="Country:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.country"
          type="text"
          required
          placeholder="Country"
        ></b-form-input>
</b-form-group>

<b-form-group id="input-group-2" label="City:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.city"
          type="text"
          required
          placeholder="City"
        ></b-form-input>
</b-form-group>

<b-form-group id="input-group-2" label="Postal:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.postalcode"
          type="text"
          required
          placeholder="Postal Code"
        ></b-form-input>
</b-form-group>

<b-form-group id="input-group-2" label="Email:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.email"
          type="email"
          required
          placeholder="Email"
        ></b-form-input>
</b-form-group>

<b-form-group id="input-group-2" label="Phone:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.phone"
          type="text"
          required
          placeholder="Phone Number"
        ></b-form-input>
</b-form-group>

    

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
  export default {
      head:{
          title:'Create vendors'
      },
    data() {
      return {
        form: {
          name: '',
          street : '',
          country : '',
          city : '',
          postalcode: '',
          email: '',
          phone: '',
          
        },
        msg:'',
      }
    },
    methods: {
     async onSubmit(evt) {
        evt.preventDefault()
        await this.fetchPost((JSON.stringify(this.form)))
        this.reset()
        
      },
      async fetchPost(data){
          try{
          await this.$axios.$post(`/api/mm/vendors`, data, {
            headers: {
            'Content-Type': 'application/json' }});
            console.log('inside')
            this.msg = {status:"success",
                         message:"Material has been added to list" ,}
            
              }
         catch(err){
             console.log(err)
             this.msg = {status:"danger",
                         message:"something went wrong" ,
                        }
         }
          },
      onReset(evt) {
        evt.preventDefault()
        this.reset()
      },
      reset()
      {
        this.form.name = ''
          this.form.street =''
          this.form.country = ''
          this.form.city = ''
          this.form.postalcode = ''
          this.form.phone = ''
          this.form.email = ''
      }
    }
  }
</script>

<style lang="css" scoped>
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
      margin:20px 0 ;
    }
</style>