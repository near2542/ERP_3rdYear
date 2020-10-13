<template>
  <div class="container">
    <b-container fluid="sm">
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
    title: 'HOME',
  },
  name :'index',
  data(){
    return{
      links : [
        {link :'/vendors' ,menuname:"Vendors"},
        {link :'/material', menuname:"Material"},
        {link:'/invoices', menuname:"Invoices"},
        {link:'/quotations', menuname:"Quotations"},
        {link:'/purchase', menuname:"Purchase"},
        {link:'/supply', menuname:"Supplies Source"},
        {link:'/customer', menuname:"Invoices"},
        {link:'/customer', menuname:"Invoices"},
        {link:'/customer', menuname:"Invoices"},
        {link:'/customer', menuname:"Invoices"},
        {link:'/customer', menuname:"Invoices"},
        {link:'/customer', menuname:"Invoices"},
      ],
    }
  },
}

</script>

<style lang="css" scoped>
  .container{
    min-height:90vh;
    width:90%;
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
