const catagory = document.querySelector(".catagory");
const allCards = document.querySelector(".all-cards");
const allVideo = document.querySelector("#all-video ");
const searchInput = document.querySelector(".search-input");
fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
  .then((res) => res.json())
  .then((data) => fetchDone(data.categories))
  .catch((err) => console.log(1000));

fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
  .then((res) => res.json())
  .then((data) => cardAdd(data.videos))
  .catch((err) => console.log(err));
function createCatagory({ category_id, category }) {
  const div = document.createElement("div");
  div.setAttribute("class", "all");
  div.setAttribute("id", category);
  div.innerText = category;
  catagory.appendChild(div);
  document.querySelectorAll(".all");
  // div.onclick = (e) => {
  //   // fetch(
  //   //   `https://openapi.programming-hero.com/api/phero-tube/category/${category_id}`
  //   // )
  //   //   .then((res) => res.json())
  //   //   .then((data) => cardAdd(data.category));
  //   // document.querySelectorAll(".all").forEach((item) => {
  //   //   item.classList.remove("actv");
  //   // });
  //   // e.target.classList.add("actv");
  // };

  div.addEventListener("click", (e) => {
    fetch(
      `https://openapi.programming-hero.com/api/phero-tube/category/${category_id}`
    )
      .then((res) => res.json())
      .then((data) => cardAdd(data.category));
    document.querySelectorAll(".all").forEach((item) => {
      item.classList.remove("actv");
    });
    e.target.classList.add("actv");
  });
}
function fetchDone(data) {
  data.forEach((item) => {
    createCatagory(item);
    console.log(item);
  });
}

function cardRender(data) {
  function hrMinit() {
    let hr = parseInt(data.others.posted_date / 3600);
    let min = parseInt((data.others.posted_date % 3600) / 60);
    let sec = parseFloat((data.others.posted_date % 3600) % 60);

    return `
  <div class='time'>${hr} hr ${min} min ${sec}sec ago</div>
  `;
  }
  return `
     <div class="card">
        <div class="card-img">
              ${data.others.posted_date?.length == 0 ? "" : hrMinit()}
            <img src=${data.thumbnail} alt="" />
          </div>
          <div class="card-details">
            <div>
              <img src=${data.authors[0].profile_picture} alt="" /></div>
            <div>
              <h1>${data.title}</h1>
              <h2>
                ${data.authors[0].profile_name}
                <span class="veryfy"
                  >  <img src=${
                    data.authors[0].verified === true &&
                    "./assets/icons8-verify-40.png"
                  } alt=""
                /></span>
              </h2>
              <h3>${data.others.views}</h3>
            </div>
          </div>
        </div>
    `;
}
function cardAdd(data) {
  allCards.innerHTML = "";
  console.log(data);
  if (data.length === 0) {
    allCards.innerHTML = `<div class="none-data"><img  src="./assets/Icon.png" /></div>`;
    return;
  }
  data.forEach((item) => {
    allCards.innerHTML += cardRender(item);
  });
}
allVideo.addEventListener("click", (e) => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => cardAdd(data.videos));

  document.querySelectorAll(".all").forEach((item) => {
    item.classList.remove("actv");
  });
  e.target.classList.add("actv");
});
searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${e.target.value}`
  )
    .then((res) => res.json())
    .then((data) => cardAdd(data.videos));
});
