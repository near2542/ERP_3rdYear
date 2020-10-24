<template>
  <div class="container">
    <b-container fluid="sm">
        <h1>SD Modules</h1>
        <b-row>
          <b-col  xl="4" md="6"  class="mt-3 mb-4" v-for="link in links" :key="link.link">
              <nuxt-link :to="link.link">
                <Menu :menuname="link.menuname"/>
              </nuxt-link> 
          </b-col>
        </b-row>
    </b-container>
</div>

  
  
</template>



<script>
import axios from 'axios';
import { reactive }  from 'vue';

export default {
  head :{
    title: 'SD',
  },
  name :'index',
  data(){
    return{
      links : [
        {link :'/sd/customers' ,menuname:"Customers"},
        {link :'/sd/condition' ,menuname:"Condition"},
        {link :'/sd/stock' ,menuname:"Stock"},
        {link:'/sd/inquiry', menuname:"Inquiry"},
        {link:'/sd/quotation', menuname:"Quotation"},
        {link:'/sd/sales', menuname:"Sales Order"},
        {link:'/sd/picking', menuname:"Picking Order"},
        {link:'/sd/packing', menuname:"Packing Order"},
        {link:'/sd/billing', menuname:"Billing"},
        {link:'/sd/summary', menuname:"Sales Summary"},

      ],
    }
  },
}

</script>

<style lang="css" scoped>
h1{
    margin:20px 20px;
    border-bottom : 2px solid black;
}
  .container{
    min-height:90vh;
    width:90%;
    margin-bottom:10px;
  }
  a{
    text-decoration:none;
  }
  a>:only-child{
    text-decoration:none;
    color:black;
    transition: 0.5s ease-in-out;
  }
  a:hover>:only-child{
        transform:scale(1.2,1.2);
        color:white;
        background-color:rgb(101, 163, 61);
    }
</style>
