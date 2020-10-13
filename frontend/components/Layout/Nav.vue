<template>
    <div>
        <ul class="link-container">
           <li class="logo"> <nuxt-link to="/">Home</nuxt-link> </li>
           <li class="login" v-show="false"> <nuxt-link to="/home">Login</nuxt-link> </li>
           
        </ul>
    </div>
</template>

<script>
    export default {
    }
</script>

<style lang="css" scoped>

    a{
        color:white;
         transition: 0.5s ease-in-out;
         text-decoration: none;
    }
    a:hover{
        color : green;
    }
    ul{
        display:flex;
        align-content: center;
        justify-content: space-between;
        list-style-type: none;
         color:black !important;
        font-size:20px;
    }
    ul>li:nth-of-type(0){
        padding-left:20px;
    }
    .logo{
        padding-left:20px;
    }
    .login{
        padding-right:20px;
    }
    .link-container{
        width:100%;
        background-color:black;
        padding:20px 0;
    }
    


</style>