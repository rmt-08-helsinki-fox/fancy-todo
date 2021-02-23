const onClickedMovie = (data) => {
  data = helper(data)

  const data1item = `
  <div class="col">
    <div class="card" style="width: max-content; border-radius: 20px">
      <img src="${
        data.poster_path
      }" width="220px" height="330px" style="border-radius: 20px"  />
      <div class="card-desc">
        <b>${data.title}</b><br/>
        "${data.overview.slice(0, 50) + "..."}"
      </div>
    </div>
  </div>
  `;
  localStorage.setItem("selectedMovie", JSON.stringify(data));
  $("#list-movie").empty();
  $("#list-movie").append(data1item);
};

const helper = (raw) => {
  raw = raw
    .replace(/\\n/g, "\\n")
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, "\\&")
    .replace(/\\r/g, "\\r")
    .replace(/\\t/g, "\\t")
    .replace(/\\b/g, "\\b")
    .replace(/\\f/g, "\\f");
  // remove non-printable and other non-valid JSON chars
  raw = raw.replace(/[\u0000-\u0019]+/g, "");
  return JSON.parse(raw);
};
