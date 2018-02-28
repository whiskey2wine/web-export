document.addEventListener('DOMContentLoaded', () => {
  // const xhr = new XMLHttpRequest();
  // console.log(xhr);
  // xhr.open('GET', 'http://localhost:3000/getdata', true);
  // xhr.onload = function () {
  //   if (this.status === 200) {
  //     const res = JSON.parse(this.response);
  //     const el = document.getElementById('pino');
  //     res.forEach((obj, index) => {
  //       const option = document.createElement('option');
  //       option.text = obj.PINo;
  //       option.value = obj.PINo;
  //       el.add(option);
  //     });
  //   } else {
  //     console.log('Fail');
  //     console.log(this);
  //   }
  // };
  // xhr.send();
  fetch('http://localhost:3000/getdata')
    .then(res => res.json())
    .then((data) => {
      let output;
      data.forEach((pi) => {
        output += `<option value="${pi.PINo}">${pi.PINo}</option>`;
      });
      document.getElementById('pino').innerHTML = output;
    })
    .catch((err) => {
      console.log(err);
    });
});

const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['PM1,3', 'PM16', 'PM17', 'PM4-5', 'PM6-7', 'PM8-9'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});
