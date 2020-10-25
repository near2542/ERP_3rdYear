<template>
    <footer>
       <h5> Copyright by Euphoria speed {{date}} / Dev by Varin and Friends</h5>
    </footer>
</template>

<script>
    export default {
        data() {
            return {date: new Date().getFullYear()}
        },
    }

</script>

<style lang="css" scoped>

    footer {
        background-color:black;
        display:flex;
        justify-content: center;
        align-content: center;
        padding-top:10px;
        color:white;
        top: calc(100vh-50px);
        height:50px;
        width:100%;
    }
</style>