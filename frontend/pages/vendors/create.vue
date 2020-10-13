<template>
  <div class="middle">
      <nuxt-link to="/vendors"> <b-button variant="outline-primary">Go back to Vendors list</b-button> </nuxt-link>
    <div v-if="msg" :class="this.msg.status">{{this.msg.msg}}</div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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

<b-form-group id="input-group-2" label="Address:" label-for="input-2">
        <b-form-textarea
          id="input-2"
          v-model="form.address"
          type="text"
          required
          placeholder="Address"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group id="input-group-2" label="Vendor Phone Number:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.number"
          type="number"
          required
          placeholder="Enter number"
        ></b-form-input>
      </b-form-group> 

      <b-form-group id="input-group-2" label="Vendor Email:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter Email"
        ></b-form-input>
      </b-form-group> 


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
          title:'Create vendors'
      },
    data() {
      return {
        form: {
          name: '',
          address : '',
          number: '',
          email: '',
        },
        msg:'',
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show:true,
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        this.fetchPost((JSON.stringify(this.form)))
      },
      async fetchPost(data){
          try{
          await this.$axios.$post(`/api/material`, data, {
            headers: {
            'Content-Type': 'application/json'
            }});
            this.msg = {status:"passed",
                         msg:"Vendor has been added to list" ,
                        }}
         catch(err){
             console.log(err)
             this.msg = {status:"error",
                         msg:"something went wrong" ,
                        }
         }
                    },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.name = ''
        //this.form.name = ''
        //this.form.food = null
        //this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
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
</style>