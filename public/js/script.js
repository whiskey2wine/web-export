fetch('http://localhost:3000/getdata')
  .then(res => res.json())
  .then((data) => {
    console.log(data);
    let output;

    let bp13 = 0;
    let bp16 = 0;
    let ws45 = 0;
    let ws67 = 0;
    let wsIBB = 0;

    data.forEach((pi, i) => {
      output += `<option value="${pi.PINo}">${pi.PINo}</option>`;
      bp13 +=
        pi.bp13 +
        pi.mx1316 +
        pi.mx1345 +
        pi.mx1367 +
        pi.mx131645 +
        pi.mx131667 +
        pi.mx134567 +
        pi.mx13164567;
      bp16 +=
        pi.bp16 +
        pi.mx1316 +
        pi.mx1645 +
        pi.mx1667 +
        pi.mx131645 +
        pi.mx131667 +
        // pi.mx164567 +
        pi.mx13164567;
      ws45 +=
        pi.ws45 +
        pi.mx1345 +
        pi.mx1645 +
        // pi.mx4567 +
        pi.mx131645 +
        pi.mx134567 +
        // pi.mx164567 +
        pi.mx13164567;
      ws67 +=
        pi.ws67 +
        pi.mx1367 +
        pi.mx1667 +
        // pi.mx4567 +
        pi.mx131667 +
        pi.mx134567 +
        // pi.mx164567 +
        pi.mx13164567;
      wsIBB += pi.wsIBB;
    });
    const obj = {
      init: [bp13, bp16, 0, ws45, ws67, 0, wsIBB],
      booked: [3, 2, 0, 1, 2, 0, 1],
      process: [2, 1, 0, 1, 1, 0, 1],
      completed: [4, 2, 0, 1, 1, 0, 1],
    };
    createChart('myChart', obj);
    document.getElementById('pino').innerHTML = output;
  })
  .catch((err) => {
    console.log(err);
  });
