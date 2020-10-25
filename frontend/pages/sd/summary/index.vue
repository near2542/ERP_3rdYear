<template>
  <div>
    <bar-chart class="mt-3 smaller" :data="barChartData" :options="barChartOptions" :height="200" />
<nuxt-link  to="/sd"> <b-button class="mb-3 mt-3" variant="info" >Go back</b-button></nuxt-link>
  </div>
</template>


<script>
export default {
  head:{
            title:'Summarize'
        },
  data() {
    
  },
 async asyncData({$axios})
  {
    const sells =  await $axios.$get('/api/mm/stock/summary/selling')
    console.log(sells)
    const qty = sells.map(qty =>qty.qty)
    const Date = sells.map( (data) => data.Date_added.toString().slice(0,10)).filter( (value, index, _arr) => _arr.indexOf(value) == index);
    const Name = sells.map( (data) => data.MaterialName).filter( (value, index, _arr) =>   _arr.indexOf(value) == index);
    const datasets = [];
    let color = ['#ea3033','#ee7b11','#f2ef0c','#00a655','#484f93']
    for(let i=0;i<Name.length;i++)
    {
      let name = Name[i];
      let data = [];

      for(let j=0;j<Date.length;j++)
      {
        for(let k=0;k<sells.length;k++)
        {
          if(Name[i] == sells[k].MaterialName && sells[k].Date_added.toString().slice(0,10) == Date[j] )
          data.push(sells[k].qty)
        }
      }
      datasets.push({label:name,data:data,backgroundColor:color[i]})
    }  

console.log(Date)


     return {
      barChartData: {
        labels: Date,
        datasets: datasets
      },
      barChartOptions: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Euphoria Sales',
          fontSize: 40,
          fontColor: '#6b7280'
        },
        tooltips: {
          backgroundColor: '#FF5733'
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ]
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>
.smaller {
  margin:auto auto;
  width:80%;
}
</style>