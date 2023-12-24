

const listOfItems = document.querySelectorAll(".pottery-grid-items")
const itemListsElement = document.querySelector("#pottery-grid"); // pottery-grid..
const itemListElement = document.querySelector("#pottery-grid"); // pottery-grid..
const modal = document.querySelector(".details");
const detailsElement = document.querySelector(".details-img");
const addCartBtn = document.querySelector(".add-cart");
const returnArrow = document.querySelector(".return-arrow");
const overlay = document.querySelector(".overlay");
const cartTab = document.querySelector(".cartTab");
const closeCart = document.querySelector(".close");
const cartIcon = document.querySelectorAll(".cart-icon");
const section = document.querySelectorAll("#section");
const imgCheck = document.querySelector("#img-check");

const GetInfo = (id) => {
  const item = database.find(items => items.id == id)
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  document.querySelector("#imgdesc").src = item.image;
  document.querySelector("#title").innerHTML = item.name;
  document.querySelector("#desc").innerHTML = item.description;
  document.querySelector("#price").innerHTML = item.price;
};

const database = [];
const getItem = async () => {
  const Data = await fetch("products.json")
  const response = await Data.json();
  database.push(...response)  
  database.map((item) => {
    console.log(item.id)
    const inneritems = document.createElement("div")
    inneritems.id = item.id
    const items = document.createElement("div")
    const image = document.createElement("img")
    image.src = item.image
    inneritems.className = "pottery-grid-items"
    const paragraph = document.createElement("p")
    paragraph.innerHTML = item.name 
    paragraph.className ="art-price"
    inneritems.appendChild(image)
    inneritems.appendChild(paragraph)
    inneritems.appendChild(items)
    itemListElement.className = "pottery-grid"
    itemListElement.appendChild(inneritems)

  })


  database.map((items) => {
        console.log(items.id)
    document.getElementById(items.id).addEventListener("click", (ev) => {
      GetInfo(items.id);


      addCartBtn.addEventListener("click", function () {
        const img = document.createElement("img")
        img.src = items.image
        document.querySelector("#check-price").innerHTML = items.price
        document.querySelector("#check-title").innerHTML = items.name
        imgCheck.appendChild(img)
        displayCheckout();
  
});
  });
  })




  // Function that makes the click work
  
  //  <div class="pottery-grid-items" id="button1">
  //           <img src="img/img-01.png" alt="" width="100" height="100" />
  //           <p class="art-price">Green Elder-$230.99</p>
  //         </div>

// Function to hide the detail and the overlay
const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
// when the arrow is clicked the modal closes
returnArrow.addEventListener("click", closeModal);
// Looping through the pottery-grid-item stored in the listOfItems variable
listOfItems.forEach((item) => {
 
  // getinfo function also works on clicking the images
  let ImageTags = item.parentElement.querySelectorAll("img");
  ImageTags.forEach((imageTag) => {
    imageTag.addEventListener("click", (ev) => {
      GetInfo(ev.target.parentElement.id);
    });
  });
  // getinfo function also works on clicking the button
  let pTags = item.parentElement.querySelectorAll(".art-price");
  pTags.forEach((pTag) => {
    pTag.addEventListener("click", (ev) => {
      GetInfo(ev.target.parentElement.id);
    });
  });
});
// when the esc keypad is tapped modal closes
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
overlay.addEventListener("click", closeModal);
// retrieving data from our json file

// function that display the checkout
  const displayCheckout = () => {
    const img = document.createElement("img")
  cartTab.style.right = 0;
  document.querySelector(".checkout-overlay").classList.remove("hidden");
  closeModal();
  document.body.style.overflow = "hidden";
};
// checkout functionality
cartIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    displayCheckout();
  });
});
// closing checkout functionality
closeCart.addEventListener("click", () => {
  cartTab.style.right = "-400px";
  document.querySelector(".checkout-overlay").classList.add("hidden");
});


}

  getItem()
