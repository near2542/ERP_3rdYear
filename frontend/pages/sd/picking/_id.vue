<template>
    <div class="middle">
       <nuxt-link to="/sd/picking/"> <b-button variant="success">Go back to Picking List</b-button> </nuxt-link>
       <div class="document">
             <header>
                <div><img src="/logo.jpg"/>
                <p>euphoriaspeed@gmail.com</p>
                <p>239 Suthep, Muang Chiang Mai</p>
                <p>Thailand 50200</p>
                <p>Tel : +99 999 9999</p>
                <p>euphoriaspeed@gmail.com</p>
                </div>
                <div class="header"><h3>{{data[0].Name}}<br>PICK#{{data[0].idDoc}}</h3></div>
            </header>
           
           
                <!--------------- ------------->
            <div class="address">
                
                    <div>
                           <strong> Ship To: </strong>
                        <div>{{data[0].CustomerName}}</div>
  
                        <div>{{data[0].CustomerStreet}} {{data[0].CustomerPostalCode}}</div>
                        <div>{{data[0].CustomerCountry}}</div>
                        <div>{{data[0].CustomerCity}}</div>
                    </div>
                    <div>
<div class="description">Note:  {{data[0].description}}</div>
                    </div>
            <div>
                    <strong>Bill To:</strong>
                    <div>{{data[0].CustomerName}}</div>
                   
                        <div>{{data[0].CustomerStreet}} {{data[0].CustomerPostalCode}}</div>
                        <div>{{data[0].CustomerCountry}}</div>
                        <div>{{data[0].CustomerCity}}</div>
                    </div>
            </div>


                <table class="product" style="margin-top:50px"> 
                    <tr>
                        <th>Order#</th>
                        <th>Customer PO</th>
                        <th>P.O. DATE</th>
                        <th>Request Delivery Date</th>
                        <th>SHIPPED VIA</th>
                        <th>F.O.B. POINT</th>
                        <th>TERMS</th>
                    </tr>
                    <tr>
                        <td>{{data[0].idDoc}}</td>
                        <td>{{data[0].CusPO}}</td>
                        <td>{{data[0].request_date}}</td>
                        <td>{{data[0].valid_to}}</td>
                        <td>Ground</td>
                        <td>F.O.B. POINT</td>
                        <td>TERMS</td>
                    </tr>
                </table>
                <!--------------- ------------->
             <div class="content">

                <table class="product" style="margin-bottom:100px"> 
                    <tr>
                            <th>Product Number</th>
                        <th>Quantity Ordered#</th>
                        <th>Quantity Shipped</th>
                        <th colspan="3">Description</th>
                        <th colspan="3">Storage</th>
                    
                    </tr>
                    <tr v-for="datas in data" :key="datas.MaterialCode">
                            <td>{{datas.MaterialCode}}</td>
                        <td>{{datas.qty}}</td>
                        <td >{{datas.qty}}</td>

                        <td colspan="3"></td>
                        <td colspan="3">{{datas.idStorage}}</td>
                    
                    </tr>
                   
                </table>

            </div>
             
       </div>

   </div>
  
</template>


<script>

    export default {
        head:{
            title:`Picking Details`
        },
     async asyncData({$axios,params})
  {
    const datas = await $axios.$get(`/api/sd/pick/${params.id}`)
    console.log(datas);
    const data = datas.map((infor) =>
    {
        infor.request_date = infor.request_date.toString().slice(0,10)
        infor.ValidTo = infor.valid_to.toString().slice(0,10)
        return infor; 
    })
    const discount = await $axios.$get(`/api/sd/condition/${data[0].idDiscount}`)
    console.log(data);

  return {data,discount};
  },
  computed:{
      calculate:function()
      {
          return this.data.reduce( (total,price)=> total+= (price.Price*price.qty),0)
      },
      calculatediscount:function()
      {
          return this.discount.reduce( (total,price)=> total+= price.Total,0)
      }
  }
       
        }
</script>

<style lang="css">
      .middle {
        width:90%;
        margin : 50px auto;
    }
    img{
        width:400px;
        height:250px;
    }
    .document{
        margin:50px auto;
        width:800px;
        min-height:1200px;
        background-color:white;
        border:1px solid;
   
    }
    header{
        display:grid;
        grid-template-columns:50% 50%;
        grid-gap:40px;
        padding-left:20px;
    }
    .header{
        margin-top:75px;
    }
    .address{
        display:grid;
        grid-template-columns:30% 30% 30%;
        grid-gap:20px;
        padding-top:20px;
        padding-left:20px;
        height:200px;
        margin-bottom:0 10px 150px 10px;
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
        margin:125px auto 125px auto;
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
    height:50px;
}
.Total{
    font-weight:bold;
    text-align:right;
    padding-right: 10px;
    font-size:1.2rem;
}
.Total-price{
        font-weight:bold;
    text-align:left;
    font-size:1.2rem;
}
.description{
    width:80%;
    margin:40px auto;
    display:flex;
    flex-direction:column;
}
.Address-Heading{
    font-weight:bold;
    font-size:1.2rem;
}
.descriptiontext{
    margin-left:80px;
}




</style>