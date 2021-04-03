// ======= GET HTML ELEMENT ===================
var productName = document.getElementById("productName");
var productCategory = document.getElementById("productCategory");
var productPrice = document.getElementById("productPrice");
var tBody = document.getElementById("tbody");
var productDesc = document.getElementById("productDesc");
var addBtn = document.getElementById("add");
// ======= GLOBAL VARIABLE  ======
var stock = [];
// ======== CRUD OPERATIONS ================
var CRUD = {
  //======= ADD PRODUCT TO ARRAY LIST ======
  addProduct: function () {
    var product = {
      id: stock.length + 1,
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
      return false;
    }else{
      return true;
    }
  },
  // ======== RETRIEVE ALL PRODUCT IN TABLE =========
  displayProducts: function () {
    var container = "";
    for (let i = 0; i < stock.length; i++) {
      container +=
        "<tr><td>" +
        stock[i].id +
        "</td><td>" +
        stock[i].name +
        "</td><td>" +
        stock[i].cate +
        "</td><td>" +
        stock[i].price +
        "</td><td>" +
        stock[i].desc +
        "</td> <td><i class='fas fa-edit text-success fa-1x mr-3 edit'></i><i class='fas fa-trash text-danger remove'></i></td></tr>";
    }
    tBody.innerHTML = container;
  },
};

// =========== CLEAR INPUTS ======
function clearInputs() {
  productName.value = "";
  productCategory.value = "";
  productPrice.value = "";
  productDesc.value = "";
}
addBtn.onclick = function () {
  var isEmpty = CRUD.addProduct();
  if(!isEmpty){
    CRUD.displayProducts();
  }
  clearInputs();
};
