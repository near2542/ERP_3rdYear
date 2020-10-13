<template>
    <div>
        <div class="menu-card"> 
            <h3>{{menuname}}</h3>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            menuname : {
                type:String,
                required: true
            }
        }
    }
</script>

<style lang="css" scoped>
.menu-card{
    height:200px;
    width:auto;
    display:flex;
    flex-direction: column;
    text-align:center;
    justify-content:center;
    text-decoration: none;
     box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
     overflow:hidden;
}
</style>