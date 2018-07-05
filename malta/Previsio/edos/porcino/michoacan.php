
<script type="text/javascript">
$( document ).ready(function() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',

      // The data for our dataset
      data: {
          labels: [
            "Ene-17",
            "Feb-17",
            "Mar-17",
            "Abr-17",
            "May-17",
            "Jun-17",
            "Jul-17",
            "Ago-17",
            "Sep-17",
            "Oct-17",
            "Nov-17",
            "Dic-17",
            "Ene-18",
            "Feb-18",
            "Mar-18",
            "Abr-18"
          ],
          datasets: [{
              label: "Michoacán",
              backgroundColor:[
                'rgba(0,155,255,0.9)',
                'rgba(0,155,255,0.9)',
                'rgba(0,155,255,0.9)',
                'rgba(0,155,255,0.9)',
                'rgba(0,155,255,0.9)',
                'rgba(0,155,255,0.9)',
                'rgba(0,155,255,0.9)',
                'rgba(0,155,255,0.9)',
                'rgba(0,155,255,0.9)',
                'rgba(0,155,255,0.9)',
                'rgba(255,100,0,0.9)',
                'rgba(255,100,0,0.9)',
                'rgba(255,100,0,0.9)',
                'rgba(255,100,0,0.9)',
                'rgba(255,100,0,0.9)',
                'rgba(255,100,0,0.9)'
              ],
              borderColor: 'rgba(87,96,101,1)',
              data: [
                31.72,
                29.62,
                24.09,
                22.82,
                24.24,
                26.00,
                29.35,
                30.86,
                28.46,
                25.14,
                26.70,
                28.18,
                28.24,
                27.78,
                25.75,
                25.32
              ]
          }]
      },

      // Configuration options go here
      options: {
        scales: {
          xAxes: [{
              display: true,
              scaleLabel: {   
                  display: true,
                  labelString: 'Mes'
              }
          }],
          yAxes: [{
              ticks: {
                  beginAtZero:true
              },
              display: true,
              scaleLabel: {
                  display: true,
                  labelString: 'Precio mensual de cerdo en granja [$/Kg]'
              }
          }]
        },
      }
  });

});
</script>

    <div class="row">
      <h1>Michoac&aacute;n</h1>
      <div class="col-sm-12">
        <canvas id="myChart" width="600" height="400"></canvas>
      </div>
    </div>

