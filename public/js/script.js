$(document).ready(() => {
  $('select').material_select();
});
const socket = io();
socket.on('connect', () => {
  console.log('Connected to server.');
});
const pmList = {
  pm13: [],
  pm16: [],
  pm17: [],
  pm45: [],
  pm67: [],
  pm89: [],
  ibb: [],
};
let fetchData;
const $piList = $('#pino');
const $pmListElement = $('#pm');

fetch('http://localhost:3000/getdata')
  .then(res => res.json())
  .then((data) => {
    console.log('data', data);
    fetchData = data;

    let bp13 = 0;
    let bp16 = 0;
    let bp17 = 0;
    let ws45 = 0;
    let ws67 = 0;
    let ws89 = 0;
    let wsIBB = 0;

    data.forEach((pi, i) => {
      if (
        pi.bp13 > 0 ||
        pi.mx1316 > 0 ||
        pi.mx1345 > 0 ||
        pi.mx1367 > 0 ||
        pi.mx131645 > 0 ||
        pi.mx131667 > 0 ||
        pi.mx134567 > 0 ||
        pi.mx13164567 > 0
      ) {
        pmList.pm13.push(pi.PINo);
      }
      if (
        pi.bp16 > 0 ||
        pi.mx1316 > 0 ||
        pi.mx1645 > 0 ||
        pi.mx1667 > 0 ||
        pi.mx131645 > 0 ||
        pi.mx131667 > 0 ||
        pi.mx164567 > 0 ||
        pi.mx13164567 > 0
      ) {
        pmList.pm16.push(pi.PINo);
      }
      if (pi.bp17 > 0 || pi.mx1789 > 0) {
        pmList.pm17.push(pi.PINo);
      }
      if (
        pi.ws45 > 0 ||
        pi.mx1345 > 0 ||
        pi.mx1645 > 0 ||
        pi.mx4567 > 0 ||
        pi.mx131645 > 0 ||
        pi.mx134567 > 0 ||
        pi.mx164567 > 0 ||
        pi.mx13164567 > 0
      ) {
        pmList.pm45.push(pi.PINo);
      }
      if (
        pi.ws67 > 0 ||
        pi.mx1367 > 0 ||
        pi.mx1667 > 0 ||
        pi.mx4567 > 0 ||
        pi.mx131667 > 0 ||
        pi.mx134567 > 0 ||
        pi.mx164567 > 0 ||
        pi.mx13164567 > 0
      ) {
        pmList.pm67.push(pi.PINo);
      }
      if (pi.ws89 > 0 || pi.mx1789 > 0) {
        pmList.pm89.push(pi.PINo);
      }
      if (pi.wsIBB) {
        pmList.ibb.push(pi.PINo);
      }

      if (pi.bp13 !== undefined) {
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
          pi.mx164567 +
          pi.mx13164567;
        ws45 +=
          pi.ws45 +
          pi.mx1345 +
          pi.mx1645 +
          pi.mx4567 +
          pi.mx131645 +
          pi.mx134567 +
          pi.mx164567 +
          pi.mx13164567;
        ws67 +=
          pi.ws67 +
          pi.mx1367 +
          pi.mx1667 +
          pi.mx4567 +
          pi.mx131667 +
          pi.mx134567 +
          pi.mx164567 +
          pi.mx13164567;
        wsIBB += pi.wsIBB;
      } else {
        bp17 += pi.bp17 + pi.mx1789;
        ws89 += pi.ws89 + pi.mx1789;
      }
    });

    // -----------------------------

    console.log('pmList', pmList);
    const obj = {
      init: [bp13, bp16, bp17, ws45, ws67, ws89, wsIBB],
      booked: [3, 2, 0, 1, 2, 0, 1],
      process: [2, 1, 0, 1, 1, 0, 1],
      completed: [4, 2, 0, 1, 1, 0, 1],
    };
    createChart('myChart', obj);

    obj.init.map((val, i) => {
      if (val > 0) {
        $pmListElement.children()[i + 1].disabled = false;
      }
      return true;
    });
  })
  .catch((err) => {
    console.log(err);
  });

$pmListElement.on('change', (e) => {
  let piOption;
  if (pmList[e.target.value].length > 0) {
    $piList.prop('disabled', false);
    piOption = '<option value="" disabled selected>Select PI</option>';
  } else {
    $piList.prop('disabled', true);
    piOption = '<option value="" disabled selected>No PI Available</option>';
  }

  if (pmList[e.target.value] !== undefined) {
    pmList[e.target.value].forEach((el) => {
      piOption += `<option value="${el}">${el}</option>`;
    });
  } else {
    $piList.prop('disabled', true);
  }

  $piList.html(piOption);
  $('select').material_select();
});

$piList.on('change', (e) => {
  console.log(e.target.value);
  const found = fetchData.find(val =>
    // continue here trying to return selected pi value
    val.PINo === e.target.value);
  console.log(found);
});
