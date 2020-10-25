<template>
  <div class="container">
    <b-container fluid="sm">
        <b-row class="mt-3">
          <b-col lg-6>
             <img src="/logo.jpg" >
          </b-col>
          <b-col class="text" lg-6>
            <h1>Welcome to</h1>
              <h2>Europhia Speed ERP system</h2>
                <h3>Click on the menu to proceed</h3>
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
img{
  width:600px;
  height:600px;
}
.text{
  margin:auto auto;
}
</style>
