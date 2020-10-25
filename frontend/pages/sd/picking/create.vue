<template>
  <div class="middle">
      <nuxt-link to="/sd/sales"> <b-button variant="outline-primary">Go back to Sales Order</b-button> </nuxt-link>
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
                                 <b-td colspan="3">{{form.valid_to}}</b-td>
                                 <b-td colspan="3">UPS</b-td>
                                 <b-td colspan="3">{{form.refID}}</b-td>
                                 <b-td colspan="3">{{requistion[0].cusPO}}</b-td>
                         </b-tbody>  
           </b-table-simple>


                       <b-table-simple hover caption-top bordered striped class="mt-4">
                             <caption>Material list </caption>
                                 <b-tr class="mt-3" variant="success">
                                           <b-th colspan="3">Material Code</b-th>
                                           <b-th colspan="3">Material Name</b-th>
                                 <b-th colspan="3" >Quantity Ordered</b-th>
                                 <b-th colspan="3" >Quantity Shipped</b-th>
                                 <b-th colspan="9">Description</b-th>
                         
                             
                        </b-tr>
                        <b-tr  v-for="data in requistion" :key="data.materialID">
                                         <b-th colspan="3">{{data.MaterialCode}}</b-th>    
                                         <b-th colspan="3">{{data.MaterialName}}</b-th>    
                                 <b-th colspan="3">{{data.qty}}</b-th>
                                 <b-th colspan="3">{{data.qty}}</b-th>
                                 <b-th colspan="9">{{data.MaterialDes}}</b-th>
                                           
                        </b-tr>
                </b-table-simple>
                
           <div></div>
   
    <b-form @submit="onSubmit" @reset="onReset">

<b-form-group
        id="input-group-1"
        label="Purchase Order refered: "
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
      <b-form class="mb-4 godown" >
    <label  class="mr-3 " for="datepicker-request-date" top><h4>Ship Date:</h4></label>
    <b-form-datepicker required class="mr-5" v-model="form.valid_to" varinat="success"  id="datepicker-request-date" placeholder="Request Date" locale="en"></b-form-datepicker>
 </b-form >
<!-------------------------------------------------------------------------->

<!-------------------------------------------------------------------------->
<h3 class="mt-3"> Ship from storage:</h3> *note: if the storage doesn't appears , that means the materials are not enough/available
       <b-form-select v-model="form.idStorage" required :options="StorageFiltering" class=" mb-3">
         
      <template #first>
        <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
      </template>
      </b-form-select>

  <!----------------------------->
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }} {{discount}} {{requistion}} {{requistion[0]}}</pre>
    </b-card>
   
  </div>
</template>

<script>
  export default {
      head:{
          title:'Create Picking'
      },
    data() {
      return {
        form: {
          refID:this.$route.query.ref,
            },
            }
           
    },
    methods: {
      redirect(id){
        console.log(id)
          setTimeout(()=> this.$router.push(`/sd/picking/${id}`),1500)
          console.log('doesnt work')
          },
     async onSubmit(evt) {
        evt.preventDefault()
        const data = {...this.requistion[0],description:this.form.description,customerPO:this.requistion[0].CusPO,idStorage:this.form.idStorage}
        console.log('imhere')
        await this.fetchPost(JSON.stringify(data),`/api/sd/pick`)

        //////////INSERT in SDDoc/////////
        console.log('imhere2')
        const detailsID = await this.$axios.$get(`/api/sd/pick/get/lastid`)
        /////////GET SDDOC LAST ID////////////
         console.log('imhere3');
        const detail = {Material: this.requistion,
                    refID:detailsID[0].idDoc,
                    idStorage:this.form.idStorage,
                    }
       console.log(detail)
        await this.fetchPost(JSON.stringify(detail),`/api/sd/pick/detail`)
   
        
         /////////INSERT INTO CONDITION ///////////
      // await this.$axios.$put(`/api/sd/sales/${this.form.refID}`,null,null)
        /////////PUSH LEFT ID TO 
         console.log('imhere5')
        console.log(detail)
            await this.fetchPost(JSON.stringify(detail),`/api/mm/stock/ondelivery`)
            await this.$axios.$put(`/api/sd/sales/${this.form.refID}`,null,null)
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

    const requistion = await $axios.$get(`/api/sd/sales/${query.ref}`)
    const stock = await $axios.$get(`/api/mm/stock`)
    const storage = await $axios.$get(`/api/admin/storage`)
    const need = await $axios.$get(`/api/sd/pick/totalNeed/${query.ref}`)
    const storagecount = await $axios.$get(`/api/sd/pick/get/storage`)
    
    console.log(stock)
    console.log(storage)
    console.log(need)
    console.log(storagecount)
        const msg = '';
        return {requistion,msg,storage,stock,need,storagecount};
    
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
  
     StorageFiltering:function()
      {
          const AvailableStorage = [];
         const EachStorageStock = [];
                 for(let i=0;i<this.storagecount[0].num;i++)
                 {
                 
                   EachStorageStock.push(this.stock.filter(storage =>
                   {
                     if(this.storage[i].idStorage === storage.idStorage) return storage;
                   })
                   )
                 }
                console.log(EachStorageStock)
        for(let i=0;i<EachStorageStock.length;i++)
        {
          let status=false;
          for(let j=0;j<this.need.length ; j++)
          {
            if(EachStorageStock[i][j].qty >= this.need[j].qty && EachStorageStock[i][j].matID == this.need[j].idMaterial){
              status = true
            }
            else break;
          }
     if(status == true) AvailableStorage.push({
       value : this.storage[i].idStorage , text:this.storage[i].StorageName
     })
        }
        return AvailableStorage;
          //const filterItem =  ;
      },

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