<template>
  <div class="container">
    <b-container fluid="sm">
      <h1>MM Modules</h1>
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
    title: 'MM',
  },
  name :'index',
  data(){
    return{
      links : [
        {link :'/mm/vendors' ,menuname:"Vendors"},
        {link :'/mm/material', menuname:"Materials"},
        {link:'/mm/stock',menuname:"Stock"},
        {link:'/mm/supply', menuname:"Supplies Sources"},
        {link:'/mm/invoices', menuname:"Invoices"},
        {link:'/mm/requistion',menuname:"Purchase Requistion"},
        {link:'/mm/purchase',menuname:"Purchase Order"},
        {link:'/mm/goodreceipt',menuname:"Good Receipt"},
        {link:'/mm/invoices',menuname:"Invoices"},
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
