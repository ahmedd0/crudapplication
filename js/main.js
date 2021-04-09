// ======= GET HTML ELEMENT ===================
var productName = document.getElementById("productName");
var productCategory = document.getElementById("productCategory");
var productPrice = document.getElementById("productPrice");
var tBody = document.getElementById("tbody");
var productDesc = document.getElementById("productDesc");
var addBtn = document.getElementById("add");
var searchBtn = document.getElementById("searchBtn");
var removeBtn = document.getElementsByClassName("remove");
// ======= GLOBAL VARIABLE  ======
var stock, lastId;

if (localStorage.getItem("lastId") == null) {
  lastId = 0;
} else {
  lastId = Number(localStorage.getItem("lastId"));
}

if (localStorage.getItem("products") == null) {
  stock = [];
} else {
  stock = JSON.parse(localStorage.getItem("products"));
}
// ======== CRUD OPERATIONS ================
var CRUD = {
  //======= ADD PRODUCT TO ARRAY LIST ======
  addProduct: function () {
    var product = {
      id: lastId + 1,
      name: productName.value,
      cate: productCategory.value,
      price: productPrice.value,
      desc: productDesc.value,
    };
    if (
      product.name != "" &&
      product.cate != "" &&
      product.price != "" &&
      product.desc != ""
    ) {
      stock.push(product);
      lastId++;
      localStorage.setItem("lastId", lastId.toString());
      return false;
    } else {
      return true;
    }
  },

  // ======== RETRIEVE ALL PRODUCT IN TABLE =========
  displayProducts: function () {
    var container = "";
    for (var i = 0; i < stock.length; i++) {
      container += `<tr><td>
        ${stock[i].id}
        </td>
          <td>${stock[i].name}</td>
          <td>${stock[i].cate}</td>
          <td>${stock[i].price}</td>
          <td>${stock[i].desc}</td>
          <td class='text-center'>
            <i onclick='CRUD.edit(${i})' class='fas fa-edit text-success fa-1x mr-3 edit'></i>
            <i onclick='CRUD.deleteProduct(${i})' class='fas fa-trash text-danger remove'></i>
          </td>
        </tr>`;
    }
    tBody.innerHTML = container;
  },
  deleteProduct: function (index) {
    stock.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(stock));
    CRUD.displayProducts();
  },
  search: function (ele) {
    console.log(ele.value);
    var container = "";
    for (var i = 0; i < stock.length; i++) {
      if (stock[i].name.toLowerCase().includes(ele.value.toLowerCase())) {
        container += `<tr><td>
        ${stock[i].id}
        </td>
          <td>${stock[i].name}</td>
          <td>${stock[i].cate}</td>
          <td>${stock[i].price}</td>
          <td>${stock[i].desc}</td>
          <td class='text-center'>
          <i onclick='CRUD.edit(${i})' class='fas fa-edit text-success fa-1x mr-3 edit'></i>
          <i onclick='CRUD.deleteProduct(${i})' class='fas fa-trash text-danger remove'></i>
          </td>
        </tr>`;
      }
    }

    tBody.innerHTML = container;
  },
  edit: function (i) {
    var container = "";
    container += `<tr><td>
        ${stock[i].id}
        </td>
          <td><input class='editRow' type='text' id='newName' value='${stock[i].name}'></td>
          <td><input class='editRow' type='text' id='newCate' value='${stock[i].cate}'></td>
          <td><input class='editRow' type='text' id='newPrice' value='${stock[i].price}'></td>
          <td><input class='editRow' type='text' id='newDesc' value='${stock[i].desc}'></td>
          <td class='text-center'>
          <button   onclick='CRUD.saveEdit(${i})' class='fas fa-check text-success fa-1x mr-3 edit border-0'></button>
          <button onclick='CRUD.deleteProduct(${i})' class='fas fa-trash text-danger remove border-0'></button>
          </td>
        </tr>`;
    tBody.innerHTML = container;
  },
  saveEdit: function (rowIndex) {
    console.log("editted");
    var newValues = [];
    var editInputs = document.getElementsByClassName("editRow");
    for (let i = 0; i < editInputs.length; i++) {
      newValues.push(editInputs[i].value);
    }
    stock[rowIndex].name = newValues[0];
    stock[rowIndex].cate = newValues[1];
    stock[rowIndex].price = newValues[2];
    stock[rowIndex].desc = newValues[3];
    localStorage.setItem("products", JSON.stringify(stock));
    CRUD.displayProducts();
  },
};

CRUD.displayProducts();
// =========== CLEAR INPUTS ======
function clearInputs() {
  productName.value = "";
  productCategory.value = "";
  productPrice.value = "";
  productDesc.value = "";
}
// =========================== EVENTS =============================
addBtn.onclick = function () {
  var isEmpty = CRUD.addProduct();
  if (!isEmpty) {
    CRUD.displayProducts();

    localStorage.setItem("products", JSON.stringify(stock));
  } else {
    alert("PLEASE ENTER ALL PRODUCT INFORMATION");
  }
  clearInputs();
  hideErrMessage();
  hideSuccessMessage();
  checkDisabled();
};

searchBtn.onkeyup = function () {
  CRUD.search(this);
};
// ======== REMOVE PRODUCT EVENT
// for (var i = 0; i < removeBtn.length; i++) {
//   removeBtn[i].addEventListener("click", function () {
//     CRUD.deleteProduct(this);
//   });
// }
// ================== VALIDATION ==================================
var namRegex = /^[a-zA-Z0-9\- ]{3,}$/;
var cateRegex = /^[a-zA-Z0-9\- ]{2,}$/;
var priceRegex = /^[0-9]{1,}$/;
var descRegex = /^[A-Za-z0-9\- ]{3,100}$/;
productName.onkeyup = function () {
  isvalid(this, "nameAlert", namRegex);
  checkDisabled();
};
productCategory.onkeyup = function () {
  isvalid(this, "cateAlert", cateRegex);
  checkDisabled();
};
productPrice.onkeyup = function () {
  isvalid(this, "priceAlert", priceRegex);
  checkDisabled();
};
productDesc.onkeyup = function () {
  isvalid(this, "descAlert", descRegex);
  checkDisabled();
};
function isvalid(input, alertDiv, regex) {
  var alert = document.getElementById(alertDiv);
  var isValid = regex.test(input.value);
  if (isValid) {
    alert.classList.add("d-none");
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
  } else {
    alert.classList.remove("d-none");
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
  }
}
function checkDisabled() {
  if (
    productName &&
    productDesc &&
    productPrice &&
    productCategory &&
    namRegex.test(productName.value) &&
    cateRegex.test(productCategory.value) &&
    priceRegex.test(productPrice.value) &&
    descRegex.test(productDesc.value)
  ) {
    addBtn.setAttribute("disabled", "off");
    addBtn.removeAttribute("disabled");
  } else {
    addBtn.setAttribute("disabled", "true");
  }
}
function hideErrMessage() {
  document.getElementById("nameAlert").classList.add("d-none");
  document.getElementById("cateAlert").classList.add("d-none");
  document.getElementById("priceAlert").classList.add("d-none");
  document.getElementById("descAlert").classList.add("d-none");

  productName.classList.remove("is-invalid");
  productCategory.classList.remove("is-invalid");
  productPrice.classList.remove("is-invalid");
  productDesc.classList.remove("is-invalid");
}
function hideSuccessMessage() {
  productName.classList.remove("is-valid");
  productCategory.classList.remove("is-valid");
  productPrice.classList.remove("is-valid");
  productDesc.classList.remove("is-valid");
}
checkDisabled();
