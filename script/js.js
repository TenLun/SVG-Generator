function getParams () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const name = urlParams.get('name');
}

languages = []
datas = []

async function fetchMovies() {
  await fetch('https://api.github.com/repos/Tenlun/programspacestudio.github.io/languages')
    .then( response => response.json() )
    .then( data => json_data = data);

  for ( key in json_data ) {
    languages.push(key);
    datas.push(json_data[key]);
  }

  RenderChart()
}

fetchMovies()

function RenderChart () {
  const ctx = document.getElementById('myChart');
  const data = {
    labels: languages,
    datasets: [{
      label: '环形图实例',
      data: datas,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(0, 162, 235)'
      ],
      hoverOffset: 4
    }]
  };
  const config = {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true, // 设置图表为响应式，根据屏幕窗口变化而变化
      maintainAspectRatio: false,// 保持图表原有比例
    }
  };
  const myChart = new Chart(ctx, config);
}

