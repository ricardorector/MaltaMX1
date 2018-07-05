
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
              label: "Querétaro",
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
                45.41,
                46.00,
                46.00,
                46.00,
                46.00,
                46.00,
                46.00,
                46.00,
                46.00,
                46.00,
                46.01,
                46.02,
                46.02,
                46.03,
                46.04
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
                  labelString: 'PRECIO MENSUAL DE HUEVO [$/Kg]'
              }
          }]
        },
      }
  });

});
</script>

    <div class="row">
      <h1>Querétaro</h1>
      <div class="col-sm-12">
      	<ul class="indicators">
          <li><img src="images/line_blue.svg" width="55px"> HISTORICO</li>
          <li><img src="images/line_orange.svg" width="55px"> PROYECCIÓN</li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <div class="col-sm-12">
        <canvas id="myChart" width="600" height="400"></canvas>
      </div>
      <div class="col-sm-12">
      	<div class="clearfix"></div>
        <br><br>
        <p>Precios por mes</p>
        <br><br>
      </div>
    </div>
