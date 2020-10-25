<script>import { Bar } from 'vue-chartjs'

export default {
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
</script>