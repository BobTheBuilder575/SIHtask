let arrprods = [
    {
        id: 1,
        name: "Pelcin",
        image: "paracetamol.jpg", // Fixed property name (lowercase 'i')
        price: "$25",
    },
    {
        id: 2,
        name: "Tylenol",
        image: "tylenol.jpg",
        price: "$25",
    },
    {
        id: 3,
        name: "Naproxen",
        image: "naproxen.jpg",
        price: "$25",
    },
    {
        id: 4,
        name: "Ibuprofen",
        image: "ibuprofen.jpg",
        price: "$25",
    },
    {
        id: 5,
        name: "Dilaudid",
        image: "hydromorphone.jpg",
        price: "$25",
    },
    {
        id: 6,
        name: "Dolo",
        image: "dolo.jpg",
        price: "$25",
    },
];

const body = document.querySelector("body");
const products = document.querySelector(".products");
basket = document.querySelector(".basket");
closeCart = document.querySelector(".close");
prodlist = document.querySelector(".prodlist");
quantity = document.querySelector(".quantity");
total = document.querySelector(".total");

let checkOutList=[]

basket.onclick = () => {
    body.classList.add("active");
};

closeCart.onclick = () => {
    body.classList.remove("active");
};

function onInit() {
    arrprods.forEach((item) => {
        let div = document.createElement("div");
        div.classList.add("item");

        div.innerHTML = `
            <img src="images/${item.image}" 
            <img src="images/${item.Image}" alt="${item.name}"/>
            <p>${item.name}</p> 
            <div class="price">${item.price}</div>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;

        products.appendChild(div);
    });
}
onInit();

function addToCart(id) {
    const product = arrprods.find(item => item.id === id);
    
    // Check if product is already in the cart
    const existingProduct = checkOutList.find(item => item.id === id);
    if (!existingProduct) {
        product.quantity = 1; // Initialize quantity for new item
        checkOutList.push(product); // Add to checkout list
    } else {
        existingProduct.quantity += 1; // Increase quantity if already in the cart
    }
    reloadCart();
}

function reloadCart() {
    prodlist.innerHTML = "";
    let count = 0;
    let totalPrice = 0;

    checkOutList.forEach((item) => {
        // Remove the dollar sign and convert to a float
        const price = parseFloat(item.price.replace('$', ''));
        totalPrice += price * item.quantity; // Calculate total price correctly
        count += item.quantity; // Accumulate total quantity

        let li = document.createElement("li");
        li.innerHTML = `
            <img src="images/${item.image}" alt="${item.name}"/>
            <div>${item.name}</div>
            <div>${item.price}</div>
            <div>
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <div class="count">${item.quantity}</div> <!-- Show current quantity -->
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
        `;

        prodlist.appendChild(li); // Append the created list item to the cart list
    });

    total.innerHTML = `<small>Subtotal (${count} items)</small> $${totalPrice.toFixed(2)}`; // Format to 2 decimal places
    quantity.innerHTML = count; // Update displayed total quantity
}

// Function to change the quantity of items in the cart
function changeQuantity(id, change) {
    const product = checkOutList.find(item => item.id === id);
    if (product) {
        product.quantity += change; // Change quantity based on button click
        if (product.quantity <= 0) {
            checkOutList = checkOutList.filter(item => item.id !== id); // Remove item if quantity is 0
        }
        reloadCart(); // Reload cart to reflect changes
    }
}
