import {
    menuArray
} from "./data.js";

// Add menu discounts
let pageHtml = ``;
let orderItems = [];
let singledOutArray = []

// This will render the page on load of page. 
document.getElementById("main-page").onload = render();
document.getElementById("main-page").onload = renderOrderItems();

// This will add event listeners to all buttons on the page. 
document.addEventListener("click", function (event) {
    if (event.target.dataset.add) {
        addOrderItems(event.target.dataset.add);
    } else if (event.target.dataset.remove) {
        removeItem(event.target.dataset.remove)
    } else if (event.target.dataset.complete) {
        if(singledOutArray.length === 0) {
            alert("You haven't placed anything in your basket yet. Please select an item from the menu. ")
        } else {
            completeOrder()
        }
    }
    // IF pay button is clicked it will first check for it's validity. If not all
    // required fields have been filled out nothing happens. If all is filled out
    // It will prevent default of reloading the page, but instead just re-renders the "Your Order" section
    else if (event.target.dataset.pay){
        if(document.querySelector('form').checkValidity()){
            payOrder();
            event.preventDefault();
        }
    } else if(event.target.dataset.neworder){
        location.reload();
    }
})

// This will be executed when clicked on + button on menu. 
function addOrderItems(itemID) {
    // This will loop through data.js and check which menu item is clicked and that one gets pushed
    // into orderItems array. Also the counter of amount of times clicked on same item is incremented
    for (let i = 0; i < menuArray.length; i++) {
        if (menuArray[i].id === Number(itemID)) {
            menuArray[i].counter += 1
            orderItems.push(menuArray[i])
        }
    }

    // This will check if the singledOutArray already has the current looped item
    // of the orderItems. If it doesnt then it gets pushed inside the singledOutArray. 
    // This will result in unique order items only. 
    for (let item of orderItems) {
        if (!(singledOutArray.includes(item))) {
            singledOutArray.push(item)
        }
    }
    // This will reset the orderItems array to keep it nice and empty. 
    orderItems = []

    // This will use the singledOutArray to render the "Your Order" section. 
    renderOrderItems();
}

// This will be exectuted if the remove button next to orderItem is clicked. 
function removeItem(itemId) {
    // this loop will loop over singledOutArray and check to which item the clicked
    // remove button belongs to. If found, the counter is reset to 0 and the item is
    // removed from the singledOutArray. 
    for (let i = 0; i < singledOutArray.length; i++) {
        if (singledOutArray[i].id === Number(itemId)) {
            singledOutArray[i].counter = 0;
            singledOutArray.splice(i, 1);
        }
    }
    // This will rerender the "Your Order" section
    renderOrderItems();
}

// This function will be executed if the "Pay" button has been clicked. 
function payOrder() {
    // This will grab the filled in name from the input field. 
    let name = document.getElementById("name").value;

    // This will grab the modal and hides it again, making it close. 
    document.getElementById("pay-modal-container").classList.add("hidden");

    // This will grab the order-container ("Your Order" section) and sets its innerHTML
    // to a thank you message. 
    document.getElementById("order-container").innerHTML = `
        <div class="completed-container">
            <p class="thank-you-msg">Thanks, ${name}! Your order is on its way!</p>
            <button class="btn-new" data-neworder="newOrder">Place new order</button>
        </div>`
}

// This function will be executed if the "Complete Order" button is clicked. 
function completeOrder() {
    // It removes the hidden class from the modal, making it appear onto the page. 
    document.getElementById("pay-modal-container").classList.remove("hidden");
}

function renderOrderItems() {
    // This will grab the ul from the "Your Order" section. 
    let ul = document.getElementById("ul-items-basket");

    // This will check if singledOutArray contains items. 
    // if not it will set the current li item to it's default value. 
    if (singledOutArray.length < 1) {
        document.getElementById("basket-item").textContent = `Select a menu item`;
        document.getElementById("remove-btn").textContent = ``;
        document.getElementById("basket-item-price").textContent = `$0`
    } else {
        // if singledOutArray does contain values it will reset the UL to an empty string
        // giving room for new items to be rendered to the page. 
        ul.textContent = ""

        // This will loop over the singledOutArray and check inside if the counter of looped
        // item is 1 or higher than 1. 
        for (let i = 0; i < singledOutArray.length; i++) {
            if (singledOutArray[i].counter === 1) {
                // If counter is one it will create list item and sets its innerHTML to 
                // the value belonging to the looped item. 
                let list = document.createElement("li");
                list.setAttribute("class", "basket-items-list-container")
                list.innerHTML = `
                    <p id="basket-item" class="basket-item">${singledOutArray[i].name}</p>
                    <p id="remove-btn" class="remove-btn" data-remove="${singledOutArray[i].id}">remove</p>
                    <p id="basket-item-price" class="basket-item-price">$${singledOutArray[i].price}</p>`
                ul.appendChild(list)
            } else {
                // If counter is more than one it will create a list item but changes the amount of items to for
                // example 2x Pizza. It also calculates the total price to the price x counter. 
                let list = document.createElement("li");
                list.setAttribute("class", "basket-items-list-container")
                list.innerHTML = `
                    <p id="basket-item" class="basket-item">${singledOutArray[i].counter}x ${singledOutArray[i].name}</p>
                    <p id="remove-btn" class="remove-btn" data-remove="${singledOutArray[i].id}">remove</p>
                    <p id="basket-item-price" class="basket-item-price">$${singledOutArray[i].price * singledOutArray[i].counter}</p>`
                ul.appendChild(list)
            }
        }
    }

    // This will make sure total price is updated in the "Your Order" section. 
    calculateTotalPrice()
}

// This function will be executed from within the renderOrderItems function. 
function calculateTotalPrice() {
    // First totalPrice will be set to 0 before calculations begin. 
    let totalPrice = 0;
    // If there are no items inside singledOutArray it will render $0 to the total price area. 
    if (singledOutArray.length === 0) {
        document.getElementById("order-total-amount").textContent = `$0`
    } else {
        // If there are items inside singledOutArray it will loop through the array and adds the price of
        // each element in the array to the totalPrice. 
        for (let i = 0; i < singledOutArray.length; i++) {
            totalPrice += (singledOutArray[i].price * singledOutArray[i].counter);
        }
        // This will render the calculated total price to the page. 
        document.getElementById("order-total-amount").textContent = `$${totalPrice}`
    }
}

// This function will render the page as soon as the page loads for first time. 
function getHtml() {
    // first all sections will be set to an empty string. 
    let mainDish = ``;
    let sideDish = ``;
    let beverage = ``;
    let dessert = ``;

    // Thhis will loop over the menuArray and uses the information for rendering. 
    menuArray.forEach(function (menuItem) {
        // Inside this if else statement it checks if the categorie of the items of the menuArray
        // items its looping over has what categorie and then pushes the html string to the right section string. 
        if (menuItem.categorie === "main dish") {
            mainDish += `
            <div class="menu-item">
                <div class="menu-image">
                    <p>${menuItem.emoji}</p>
                </div>
                <div class="menu-item-info">
                    <h3>${menuItem.name}</h3>
                    <p class="ingredients">${menuItem.ingredients}</p>
                    <p class="price">$${menuItem.price}</p>
                </div>
            <button class="menu-button" data-add="${menuItem.id}">+</button>
        </div>`
        } else if (menuItem.categorie === "beverage") {
            beverage += `
            <div class="menu-item">
                <div class="menu-image">
                    <p>${menuItem.emoji}</p>
                </div>
                <div class="menu-item-info">
                    <h3>${menuItem.name}</h3>
                    <p class="ingredients">${menuItem.ingredients}</p>
                    <p class="price">$${menuItem.price}</p>
                </div>
            <button class="menu-button" data-add="${menuItem.id}">+</button>
        </div>`
        } else if (menuItem.categorie === "side dish") {
            sideDish += `
            <div class="menu-item">
                <div class="menu-image">
                    <p>${menuItem.emoji}</p>
                </div>
                <div class="menu-item-info">
                    <h3>${menuItem.name}</h3>
                    <p class="ingredients">${menuItem.ingredients}</p>
                    <p class="price">$${menuItem.price}</p>
                </div>
            <button class="menu-button" data-add="${menuItem.id}">+</button>
        </div>`
        } else if (menuItem.categorie === "dessert") {
            dessert += `
            <div class="menu-item">
                <div class="menu-image">
                    <p>${menuItem.emoji}</p>
                </div>
                <div class="menu-item-info">
                    <h3>${menuItem.name}</h3>
                    <p class="ingredients">${menuItem.ingredients}</p>
                    <p class="price">$${menuItem.price}</p>
                </div>
            <button class="menu-button" data-add="${menuItem.id}">+</button>
        </div>`
        }
    })


    // This will actually puts everything together into a single page. 
    pageHtml += `
    <div class="content-container">
        <h3 class="menu-item-title">Main dishes</h3>
        ${mainDish}
        <h3 class="menu-item-title">Side Dishes</h3>
        ${sideDish}
        <h3 class="menu-item-title">Desserts</h3>
        ${dessert}
        <h3 class="menu-item-title">Beverages</h3>
        ${beverage}
    </div>

    <div id="order-container" class="order-container">
        <h1 class="order-title">Your Order</h1>
                <ul id="ul-items-basket">
                    <li class="basket-items-list-container">
                        <p id="basket-item" class="basket-item"></p>
                        <p id="remove-btn" class="remove-btn"></p>
                        <p id="basket-item-price" class="basket-item-price">$0</p>
                    </li>
                </ul>
        <div class="total-price-container">
            <p class="order-price-total">Total price:</p>
            <p id="order-total-amount" class="order-total-amount"></p>
        </div>
        <button class="btn" data-complete="complete">Complete order</button>
    </div>
        <div id="pay-modal-container" class="pay-modal-container hidden">
            <div class="pay-modal-inner">
                <h1 class="card-details-title">Enter card details</h1>
                <form action="#">
                    <input id="name" class="input-field" type="text" placeholder="Enter your name" required> 
                    <input class="input-field" type="text" placeholder="Enter card number" required> 
                    <input class="input-field" type="text" placeholder="Enter CVV" required> 
                    <input id="pay-button" class="btn" type="submit" value="pay" id="place-order" data-pay="pay" />
                </form>
            </div>
        </div>`;

    // This will return the full html page that needs to be rendered. 
    return pageHtml;
}

// This function will execute on page load, rendering the page. 
function render() {
    document.getElementById("main-page").innerHTML = getHtml();
}