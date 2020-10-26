<template>
  <div class="middle">
      <nuxt-link to="/mm/material"> <b-button variant="outline-primary">Go back to Material list</b-button> </nuxt-link>
    <div v-if="msg" :class="this.msg.status">{{this.msg.msg}}</div>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show:true,
      }
    },
    methods: {
     async onSubmit(evt) {
        evt.preventDefault()
        await this.fetchPost((JSON.stringify(this.form)))
          this.form.code=''
          this.form.name= ''
          this.form.description = ''
          this.form.price=''
        
      },
      async fetchPost(data){
          try{
          await this.$axios.$post(`/api/mm/material`, JSON.stringify(data), {
            headers: {
            'Content-Type': 'application/json'
            }});
            this.msg = {status:"passed",
                         msg:"Material has been added to list" ,
                        }}
         catch(err){
             this.msg = {status:"error",
                         msg:"something went wrong" ,
                        }
         }
                    },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.code=''
          this.form.name= ''
          this.form.description = ''
          this.form.price=''
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