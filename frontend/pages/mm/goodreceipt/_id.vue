<template>
    <div class="middle">
       <nuxt-link to="/mm/goodreceipt/"> <b-button variant="success">Go back to Good Receipt List</b-button> </nuxt-link>
         <div class="document">
            <header>
                <div class="logo-container">
               <img class="logo" src="/logo.jpg"/>
               </div>
                <div class="header">
                    <h3>Good Receipt<br>GR#{{requistion[0].idDoc}}</h3>
                </div>
            </header>
           
           
            <div class="date">
            <p><strong>Received on: </strong>{{requistion[0].request_date}}</p>
                </div>
                <!--------------- ------------->
            <div class="address">
                
                    <div>
                        <div class="Address-Heading">Vendors Address</div>
                        <div class="Address-Heading">{{requistion[0].VendorsName}}</div>
                        <div>{{requistion[0].VendorsStreet}} {{requistion[0].VendorsCity}}</div>
                        <div>{{requistion[0].VendorsCountry}}</div>
                        <div>{{requistion[0].VendorsPostalCode}}</div>
                    </div>

                    <div>
                    <div class="Address-Heading">Ship To:</div>
                    <div>{{requistion[0].StorageName}}</div>
                    <div> {{requistion[0].StorageStreet}}  {{requistion[0].StorageCity}}</div>
                    <div>{{requistion[0].StorageCountry}}</div>
                    <div>{{requistion[0].StoragePostal}}</div>
                </div>
                <div>
                    <div class="Address-Heading">Bill To:</div>
                    <div>{{requistion[0].ORGname}}</div>
                    <div> {{requistion[0].ORGStreet}}  {{requistion[0].ORGPostalCode}}</div>
                    <div>{{requistion[0].ORGCountry}}</div>
                    <div>{{requistion[0].ORGPostalCOde}}</div>
                </div>
                </div>
                <!--------------- ------------->
        
                <div class="content">
                
               <table class="product">
                     <tr>
                     <th colspan="3">Code</th>
                     <th colspan="3">Name</th>
                     <th colspan="3">Ordered Quanitity</th>
                     <th colspan="3">Received Quantity</th>
                     <th colspan="3">Back Ordered Quantity</th>
                    </tr>
                     <tr v-for="(requis) in requistion" :key="requis.idMaterial">
                     <td colspan="3">{{requis.MaterialCode}}</td>
                     <td colspan="3">{{requis.MaterialName}}</td>
                     <td colspan="3">{{requis.qty}}</td>
                     <td colspan="3">{{requis.qty}}</td>
                     <td colspan="3">{{requis.qty-requis.qty}}</td>
                    </tr>
                    <tr>
                        <td colspan="6" class="Total" >Total</td>
                        <td colspan="3" class="Total-price">{{calculate}}</td>
                        <td colspan="3" class="Total-price">{{calculate}}</td>
                        <td colspan="3" class="Total-price">{{requistion[0].qty-requistion[0].qty}}</td>
                    </tr>
                     </table>
                     
                    
                </div>
             <div class="description"><strong>Description:</strong> <p class="descriptiontext">{{requistion[0].description}}</p></div>
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
    const data = await $axios.$get(`/api/mm/goodreceipt/${params.id}`)
   const requistion = data.map((datas) =>
    {
        datas.request_date = datas.request_date.toString().slice(0,10)
        datas.ValidTo = datas.ValidTo.toString().slice(0,10)
        return datas; 
    })
    console.log(requistion);
  return {requistion};
  },
  computed:{
      calculate:function()
      {
          return this.requistion.reduce( (total,price)=> total+=price.qty,0)
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
        height:1200px;
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
        margin-bottom:0 10px 25px 10px;
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
        margin:0 auto 125px auto;
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
    width:200px;
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