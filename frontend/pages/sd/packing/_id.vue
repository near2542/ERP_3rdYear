<template>
    <div class="middle">
       <nuxt-link to="/sd/inquiry/"> <b-button variant="success">Go back to Inquiry List</b-button> </nuxt-link>
       <div class="document">
            <header>
                
                <div>Bill to:<h1>Euphoria Speed</h1>
                <p>173/70 BanChanlor</p>
                <p>Jarunsanitwong 22 Bangkoknoi</p>
                <p>Bangkok 10700</p>

                </div>
                <div><h3>Packing<br>PACK#{{data[0].idDoc}}</h3></div>
            </header>
           
                <!--------------- ------------->
            <div class="address">
                
                    <div>
                            ship to:
                        <div><h1>{{data[0].CustomerName}}</h1></div>
                        <div>CusID: {{data[0].idCustomer}}</div>
                        <div>{{data[0].CustomerStreet}} {{data[0].CustomerPostalCode}}</div>
                        <div>{{data[0].CustomerCountry}}</div>
                        <div>{{data[0].CustomerCity}}</div>
                    </div>
                    <div>
<div class="description">Note:  {{data[0].description}}</div>
                    </div>
                </div>


                <table class="product"> 
                    <tr>
                        <th>Order#</th>
                        <th>Customer PO</th>
                        <th>P.O. DATE</th>
                        <th>Ship</th>
                        <th>SHIPPED VIA</th>
                        <th>F.O.B. POINT</th>
                        <th>TERMS</th>
                    </tr>
                    <tr>
                        <td>{{data[0].idRef}}</td>
                        <td>{{data[0].CusPO}}</td>
                        <td>{{data[0].request_date}}</td>
                        <td>{{data[0].valid_to}}</td>
                        <td>Ground</td>
                        <td>F.O.B. POINT</td>
                        <td>NET30</td>
                    </tr>
                </table>

                <table class="product"> 
                    <tr>
                        <th>Quantity Ordered#</th>
                        <th>Quantity Shipped</th>
                        <th>Product Weight (KG)(Per UNIT)</th>
                        <th colspan="3">Description</th>
                        <th>Product Number</th>
                    </tr>
                    <tr v-for="datas in data" :key="datas.MaterialCode">
                        <td>{{datas.qty}}</td>
                        <td >{{datas.qty}}</td>
                        <td >{{datas.weight}}</td>
                        <td colspan="3"></td>
                        <td>{{datas.MaterialCode}}</td>
                    </tr>
                   
                </table>


                <table class="product">
                     <tr>
                        <th>Total Order</th>
                        <th>Total Shipped</th>
                        <th>Total Weight</th>
                        <th colspan="6">Note</th>
                        </tr>
                     <tr>
                        <td>{{Qty}}</td>
                        <td>{{Qty}}</td>
                        <td>{{weight}}</td>
                        <td colspan="6" style="width:50%"></td>
                        </tr>

                    </table>
                <!--------------- ------------->
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
    const datas = await $axios.$get(`/api/sd/pack/${params.id}`)
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
      },
  
   weight:function()
      {
          return this.data.reduce( (total,weight)=> total+= (weight.weight*weight.qty),0)
      },
      Qty:function()
      {
          return this.data.reduce( (total,qty)=> total+= qty.qty,0)
      },
  }}       

</script>

<style lang="css">
    .middle {
        width:90%;
        margin : 50px auto;
    }

    .document{
        margin:50px auto;
        width:800;
        height:1200px;
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
table{
    margin-bottom:20px;
}
.total{
    text-align:right;
    padding-right: 20px;
    font-weight: bold;
}

</style>