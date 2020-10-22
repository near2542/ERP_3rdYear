<template>
    <nav>
        <div class="logo">
            <nuxt-link to="/">Euphoria Speed</nuxt-link>
        </div>
        <ul>
           <li><nuxt-link to="/mm">Material Management</nuxt-link></li>
           <li><nuxt-link to="/sd">Sales & Distribution</nuxt-link></li>
           <li><nuxt-link to="/admin">Admin</nuxt-link></li>
           <li class="login" v-show="false"> <nuxt-link to="/home">Login</nuxt-link> </li>   
        </ul>
    </nav>
</template>

<script>
    export default {
    }
</script>

<style lang="css" scoped>
*{
    margin:0;
    padding:0;
}

    a{
        color:white;
         transition: 0.5s ease-in-out;
         text-decoration: none;
    }
    a:hover{
        color : green;
    }
    nav{
        padding:10px 0;
        display:flex;
        background-color:black;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        font-size:20px;  
        width:100%}
    nav>ul{
        display:flex;
        align-items: center;
        list-style-type: none;
        font-size:20px;
    }
    ul{
        display:flex;
        justify-content: space-between;
        padding-left:20px;
    }
    ul>li{
        padding-left:20px;
    }
    .logo{
        padding-left:20px;
    }
    .login{
        padding-right:20px;
        display:flex;
        justify-self: flex-start;
    }
    .link-container{
        width:100%;
        background-color:black;
        padding:20px 0;
    }
    


</style>