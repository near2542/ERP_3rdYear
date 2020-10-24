<template>
    <div class="middle">
       <nuxt-link to="/sd/inquiry/"> <b-button variant="success">Go back to Inquiry List</b-button> </nuxt-link>
       <div class="document">
            <header>
                <div><h1>Euphoria Speed</h1></div>
                <div><h3>Inquiry<br>INQ#{{data[0].idDoc}}</h3></div>
            </header>
           
            <div class="date">
                <p><strong>request_date: </strong>{{data[0].request_date}}</p>
                <p><strong>valid to: </strong> {{data[0].ValidTo}}</p>
                </div>
                <!--------------- ------------->
            <div class="address">
                
                    <div>
                        <div><h1>{{data[0].CustomerName}}</h1></div>
                        <div>{{data[0].CustomerStreet}} {{data[0].CustomerPostalCode}}</div>
                        <div>{{data[0].CustomerCountry}}</div>
                        <div>{{data[0].CustomerCity}}</div>
                    </div>
                    <div>
<div class="description">{{data[0].description}}</div>
                    </div>
                </div>
             
                <!--------------- ------------->
             <div class="content">
               <table class="product">
                     <tr>
                     <th colspan="3">Code</th>
                     <th colspan="3">Name</th>
                     <th colspan="3">Qty</th>
                    </tr>
                     <tr v-for="datas in data" :key="datas.materialID">
                        <td colspan="3">{{datas.CustomerName}}</td>
                        <td colspan="3">{{datas.MaterialName}}</td>
                        <td colspan="3">{{datas.qty}}</td>
                    </tr>
                </table> 
            </div>
             
       </div>

   </div>
    
</template>


<script>

    export default {
        head:{
            title:`Purchase Requistion`
        },
     async asyncData({$axios,params})
  {
    const datas = await $axios.$get(`/api/sd/inquiry/${params.id}`)
    console.log(datas);
    const data = datas.map((infor) =>
    {
        infor.request_date = infor.request_date.toString().slice(0,10)
        infor.ValidTo = infor.valid_to.toString().slice(0,10)
        return infor; 
    })
    console.log(data);

  return {data};
  },
  /*computed:{
      calculate:function()
      {
          return this.data.reduce( (total,price)=> total+= (price.price*price.qty),0)
      }
      
  }*/
       
        }
</script>

<style lang="css">
    .middle {
        width:90%;
        margin : 50px auto;
    }

    .document{
        margin:50px auto;
        width:800px;
        height:800px;
        background-color:white;
        border:1px solid;
   
    }
    header{
        display:grid;
        grid-template-columns:50% 50%;
        grid-gap:40px;
        margin-top :50px;
        padding-left:20px;
    }
    .address{
        display:grid;
        grid-template-columns:33% 67%;
        grid-gap:20px;
        padding-top:20px;
        padding-left:20px;
        height:150px;
    }
    .date{
        display:flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-self: flex-end;
        margin-top:20px;
        height:100px;;
    }
    .content{
        width:80%;
        min-height:300;
        
        margin:60px auto;
        display:flex;
        justify-content:center;
        align-content:center;
    }
    .address,.content,.date,.description{
        border:4px solid collapse;
    }
    .address>div{
        display:flex;
        flex-direction: column;
    }
     table {
  border-collapse: collapse;
  margin:0 auto 0 auto;
}

table, th, td {
  border: 1px solid black;
}
th,td{
    width:100px;
}
.description{
    width:80%;
    margin:40px auto;
    display:flex;
    flex-direction:column;
}

</style>