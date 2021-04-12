
let cart = [];

const glazeC = document.querySelectorAll(".glaze");
const countC = document.querySelectorAll(".count");
function glazeTurnRed () {
    glazeC.forEach(glaze => glaze.classList.remove("active"));
    this.classList.add("active");
    //const selectedGlaze = document.querySelector(".glaze.active")
    //console.log(selectedGlaze.dataset.name,selectedGlaze.dataset.glaze);
}

function countTurnRed () {
    countC.forEach(count => count.classList.remove("active"));
    this.classList.add("active");
    //const selectedCount = document.querySelector(".count.active")
    //console.log(selectedCount.dataset.count,selectedCount.dataset.price);
}

glazeC.forEach(glaze => glaze.addEventListener("click",glazeTurnRed));
countC.forEach(count => count.addEventListener("click",countTurnRed));

var Item = function(name, glaze, count, price) {
    //individual items in the cart
    const selectedGlaze = document.querySelector(".glaze.active");
    const selectedCount = document.querySelector(".count.active");
    if (selectedGlaze) {
        this.name = selectedGlaze.dataset.name;
        this.glaze = selectedGlaze.dataset.glaze;
    }
    if (selectedCount) {
        this.count = selectedCount.dataset.count;
        this.price = selectedCount.dataset.price;
    }
}

function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

//add new items to cart
function addItemToCart(name, glaze, count, price) {
    var item = new Item(name, glaze, count, price);
    cart.push(item);
    saveCart();
}

let carts = document.querySelectorAll('.checkout');
//helps to calculate the number of items in the cart


for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener("click", ()=> {
        cartNumbers();
    })
}

//keep the cart number even after refreshing the page
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");

    if (productNumbers) {
        document.querySelector(".cart-items").textContent = productNumbers;
    }
}


//calculating the number of items in the cart
function cartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector(".cart-items").textContent = productNumbers + 1;
    }
    else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector(".cart-items").textContent = 1;
    }
//calculating the number of items in cart after clicking delete button for product

}

//calculate the number of items in cart after removing products from the cart
function removeCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);
    localStorage.setItem("cartNumbers", productNumbers - 1);
    document.querySelector(".cart-items").textContent = productNumbers - 1;
}


//calculating the total price of the cart
function totalCost() {
    let cartCost = localStorage.getItem("totalCost");
        if (cartCost != null) {
            cartCost = Number(cartCost);
            localStorage.setItem("totalCost", cartCost + Number(cart[cart.length-1].price));
        }
        else {
            let newPrice = cart[0].price
            newPrice = parseInt(newPrice);
            localStorage.setItem("totalCost", newPrice);
        }

    }

//display the added product info on the cart page
function displayCart() {
    let cartItems = localStorage.getItem("shoppingCart");
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);
    let productContainer = document.querySelector(".CART");
    if (cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
                <li>
                <h3>${item.name}</h3>
                <img src="${item.name}.png" alt="original flavor" class=photo>
                <img src="delete.png" alt="delete button" class=icon id = "delete_button" data-name ='${item.name}' data-glaze = '${item.glaze}' data-price = "${item.price}">
                <p id=glazeOption>${item.glaze}</p>
                <div class = countBox>
                    <p class=count>1</p> <p class=count>3</p> <p class=count>6</p> <p class=count>12</p>
                </div>
                <p id=price> $${item.price}</p>
                </li>
                `
        });
    }

    if (localStorage.getItem("totalCost") != null && document.querySelector(".cart-total")) {
        document.querySelector(".cart-total").textContent = localStorage.getItem("totalCost");
    }
}

//to remove items from cart
function removeItem( name , glaze ) {
    let cartItems = localStorage.getItem("shoppingCart");
    cartItems = JSON.parse(cartItems);
    for ( let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].name === name && cartItems[i].glaze === glaze) {
            cartItems.splice(i, 1);
            localStorage.setItem("shoppingCart",JSON.stringify(cartItems));
            break;
        }
    }
}

//to calculate the total cost after removing items from cart
function removeItemCost(price) {
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem("shoppingCart");
    cartItems = JSON.parse(cartItems);
    if (cartCost != null) {
        cartCost = Number(cartCost);
        localStorage.setItem("totalCost", cartCost - Number(price));
        document.querySelector(".cart-total").textContent = localStorage.getItem("totalCost");

}}


//interaction to add products to the cart
let checkout_button = document.querySelector('.checkout');
if (checkout_button) {
    checkout_button.addEventListener('click',()=> {
    addItemToCart();
    totalCost();
    alert("product successfully added!");
})
}


onLoadCartNumbers();
displayCart();

//interaction to delete items from cart
let delete_button = document.getElementById("delete_button");
if (delete_button) {
    delete_button.onclick = function(e) {
        removeItem(e.target.dataset.name,e.target.dataset.glaze);
        removeCartNumbers();
        removeItemCost(e.target.dataset.price);
        displayCart();
    }

}

