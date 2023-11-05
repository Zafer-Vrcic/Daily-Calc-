const expenseInput = document.querySelector("#harcama");
// console.log(expenseInput)
const priceInput = document.querySelector("#fiyat");
// console.log(priceInput)
const formBtn = document.querySelector(".ekle-btn");
// console.log(formBtn)
const list = document.querySelector(".list");
// console.log(list)
const totalInfo = document.querySelector("#total-info");
// console.log(totalInfo)
const nameInput = document.getElementById("name-input");
// console.log(nameInput)
const UserName = localStorage.getItem("name");
const statusCheck = document.getElementById("status-input");
// console.log(statusCheck)
const selectFilter = document.getElementById("filter-select");
// console.log(selectFilter)

nameInput.value = UserName;
nameInput.addEventListener("change", (e) => {
  // console.log(e.target.value)
  localStorage.setItem("name", e.target.value);
});

formBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);

let toplam = 0;
function updateTotal(pricaInf) {
  //console.log(pricaInf)
  toplam += Number(pricaInf);
  totalInfo.innerText = toplam;
}

function addExpense(e) {
  e.preventDefault();
  // console.log('addExpense')
  //   console.log(expenseInput.value)
  if (!expenseInput.value || !priceInput.value) {
    alert("fill all information correct please");
    return;
  } else {
    const harcamaDiv = document.createElement("div");
    harcamaDiv.classList.add("expense");
    if (statusCheck.checked) {
      harcamaDiv.classList.add("payed");
    }
    harcamaDiv.innerHTML = ` 
     <h2 >${expenseInput.value} </h2>
  <h2 id='value'>${priceInput.value} </h2>
  <div class="buttons">
      <img id='payment' src="pay.png" alt="">
      <img id='remove' src="remove.png" alt="">
  </div>`;

    list.appendChild(harcamaDiv);
    //   console.log(harcamaDiv);
    updateTotal(priceInput.value);
  }

  expenseInput.value = "";
  priceInput.value = "";
}
function handleClick(e) {
  // console.log(e.target)
  let clickedElement = e.target;
  if (clickedElement.id === "remove") {
    const kapsayiciElement = clickedElement.parentElement.parentElement;

    const deletedPrice = kapsayiciElement.querySelector("#value").innerText;
    // console.log(deletedPrice);
    updateTotal(-Number(deletedPrice));
    kapsayiciElement.remove();
  }
}

function handleFilter(e) {
  // console.log('filter func')
  const harcamaKartlari = list.childNodes;
  const filterValue = e.target.value;
  //  console.log(items)
  harcamaKartlari.forEach((harcamaKarti) => {
    switch (filterValue) {
      case "all":
        harcamaKarti.style.display = "flex";
        break;
      case "payed":
        if (!harcamaKarti.classList.contains("payed")) {
          harcamaKarti.style.display = "none";
        } else {
          harcamaKarti.style.display = "flex";
        }
        break;
        case 'not-payed':
          if(harcamaKarti.classList.contains('payed')){
            harcamaKarti.style.display='none'
          }else(
            harcamaKarti.style.display='flex'
          )
            break;
    }
  });
}
