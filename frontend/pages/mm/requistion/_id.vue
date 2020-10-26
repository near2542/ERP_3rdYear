<template>
    <div class="middle">
       <nuxt-link to="/mm/requistion/"> <b-button variant="success">Go back to Purchase Requistion List</b-button> </nuxt-link>
      <div class="document">
            <header>
                <div class="logo-container">
               <img class="logo" src="/logo.jpg"/>
               </div>
                <div class="header">
                    <h3>Purchase Requistion<br>PR#{{requistion[0].idDoc}}</h3>
                </div>
            </header>
           
           
            <div class="date">
            <p><strong>Requested Date: </strong>{{requistion[0].request_date}}</p>
            <p><strong>Valid To Date: </strong>{{requistion[0].ValidTo}}</p>
                </div>
                <!--------------- ------------->

                <div class="description"><strong>Note:</strong> <p class="descriptiontext">{{requistion[0].description}}</p></div>
            <div class="address">
                    <div></div>
                    
                        <div>
                            <strong>Ship to :</strong>    
                            <p>{{requistion[0].StorageName}} </p>
                            <p>{{requistion[0].StorageStreet}} {{requistion[0].StorageCity}}</p>
                            <p>{{requistion[0].StorageCountry}},{{requistion[0].StoragePostalCode}}</p>
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
                     <tr v-for="(requis) in requistion" :key="requis.idMaterial">
                     <td colspan="3">{{requis.MaterialCode}}</td>
                     <td colspan="3">{{requis.MaterialName}}</td>
            
                     <td colspan="3">{{requis.qty}}</td>
      
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
      const vendor = await $axios.$get('/api/mm/vendors')
    const data = await $axios.$get(`/api/mm/requistion/${params.id}`)
    console.log(data)
   const requistion = data.map((datas) =>
    {
        datas.request_date = datas.request_date.toString().slice(0,10)
        datas.ValidTo = datas.ValidTo.toString().slice(0,10)
        return datas; 
    })
    console.log(requistion);
  return {requistion,vendor};
  },
  computed:{
      calculate:function()
      {
          return this.requistion.reduce( (total,price)=> total+= (price.price*price.qty),0)
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