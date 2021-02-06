function convertDate(d) {
  if (d) {
      d = new Date(d);
      return [d.getFullYear(), d.getMonth()+1, d.getDate()]
          .map(el => el < 10 ? `0${el}` : `${el}`).join('-');
  } else {
      return d;
  }
}

function clockUpdate() {
  const date = new Date();
  $('#digital-clock').css({'color': '#fff', 'text-shadow': '0 0 6px gray'});
  let h = date.getHours(); // 0 - 23
  let m = date.getMinutes(); // 0 - 59
  let s = date.getSeconds(); // 0 - 59
  let session = "AM";
  
  if(h == 0){
      h = 12;
  }
  
  if(h > 12){
      h = h - 12;
      session = "PM";
  }
  
  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;

  $('#digital-clock').text(`${convertDate(date)}\n` + h + ':' + m + ':' + s + ` ${session}`)
}