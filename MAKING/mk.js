

const $tabsToDropdown = $(".tabs-to-dropdown");

function generateDropdownMarkup(container) {
  const $navWrapper = container.find(".nav-wrapper");
  const $navPills = container.find(".nav-pills");
  const firstTextLink = $navPills.find("li:first-child a").text();
  const $items = $navPills.find("li");
  const markup = `
    <div class="dropdown d-md-none">
      <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        ${firstTextLink}
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> 
        ${generateDropdownLinksMarkup($items)}
      </div>
    </div>
  `;
  $navWrapper.prepend(markup);
}

function generateDropdownLinksMarkup(items) {
  let markup = "";
  items.each(function () {
    const textLink = $(this).find("a").text();
    markup += `<a class="dropdown-item" href="#">${textLink}</a>`;
  });

  return markup;
}

function showDropdownHandler(e) {
  // works also
  //const $this = $(this);
  const $this = $(e.target);
  const $dropdownToggle = $this.find(".dropdown-toggle");
  const dropdownToggleText = $dropdownToggle.text().trim();
  const $dropdownMenuLinks = $this.find(".dropdown-menu a");
  const dNoneClass = "d-none";
  $dropdownMenuLinks.each(function () {
    const $this = $(this);
    if ($this.text() == dropdownToggleText) {
      $this.addClass(dNoneClass);
    } else {
      $this.removeClass(dNoneClass);
    }
  });
}

function clickHandler(e) {
  e.preventDefault();
  const $this = $(this);
  const index = $this.index();
  const text = $this.text();
  $this.closest(".dropdown").find(".dropdown-toggle").text(`${text}`);
  $this
    .closest($tabsToDropdown)
    .find(`.nav-pills li:eq(${index}) a`)
    .tab("show");
}

function shownTabsHandler(e) {
  // works also
  //const $this = $(this);
  const $this = $(e.target);
  const index = $this.parent().index();
  const $parent = $this.closest($tabsToDropdown);
  const $targetDropdownLink = $parent.find(".dropdown-menu a").eq(index);
  const targetDropdownLinkText = $targetDropdownLink.text();
  $parent.find(".dropdown-toggle").text(targetDropdownLinkText);
}

$tabsToDropdown.each(function () {
  const $this = $(this);
  const $pills = $this.find('a[data-toggle="pill"]');

  generateDropdownMarkup($this);

  const $dropdown = $this.find(".dropdown");
  const $dropdownLinks = $this.find(".dropdown-menu a");

  $dropdown.on("show.bs.dropdown", showDropdownHandler);
  $dropdownLinks.on("click", clickHandler);
  $pills.on("shown.bs.tab", shownTabsHandler);
});























// ADD TO CART

  document.addEventListener("DOMContentLoaded", function() {
    var cart = [];

    // Add to Cart button click handler
    var addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        var name = button.dataset.name;
        var price = parseFloat(button.dataset.price);
        var img = button.dataset.img;

        // Check if the item is already in the cart
        var existingItem = cart.find(function(item) {
          return item.name === name;
        });
        if (existingItem) {
          // If item already exists, increase its count
          existingItem.count++;
        } else {
          // If item doesn't exist, add it to the cart
          cart.push({name: name, price: price, img: img, count: 1});
        }

        // Update offcanvas sidebar
        updateCart();
      });
    });

    
    // Plus button click handler
    document.addEventListener('click', function(event) {
      if (event.target && event.target.classList.contains('plus-btn')) {
        var index = event.target.dataset.index;
        cart[index].count++;
        updateCart();
      }
    });

    // Minus button click handler
    document.addEventListener('click', function(event) {
      if (event.target && event.target.classList.contains('minus-btn')) {
        var index = event.target.dataset.index;
        if (cart[index].count > 1) {
          cart[index].count--;
        } else {
          // If count is 1, remove the item from the cart
          cart.splice(index, 1);
        }
        updateCart();
      }
    });

    // Delete item button click handler
    document.addEventListener('click', function(event) {
      if (event.target && event.target.classList.contains('delete-item')) {
        var index = event.target.dataset.index;
        cart.splice(index, 1); // Remove item from cart array
        updateCart(); // Update offcanvas sidebar
      }
    });

    // Function to update the offcanvas sidebar with cart items
    function updateCart() {
      var cartItems = document.getElementById('cartItems');
      cartItems.innerHTML = '';
      var totalCount = 0;
      var totalPrice = 0;

      // Filter out items with count 0
      var filteredCart = cart.filter(function(item) {
        return item.count > 0;
      });

     
  // Iterate through filtered cart items and append to the offcanvas sidebar
  filteredCart.forEach(function(item, index) {
  totalCount += item.count;
  totalPrice += item.price * item.count;
  var li = document.createElement('li');
 li.classList.add('list-group-item');
li.innerHTML = '<div class="d-flex flex-column align-items-center w-100 ">' +
               '<img src="' + item.img + '" class="cart-item-img imageSize mid img-fluid mw-100" alt="' + item.name + '">' +
               '<div class="  text-center" role="group">' +
               '<div class="btn-group  w-100  " role="group">' +
               '<button class="btn btn-sm btn-secondary minus-btn" data-index="' + index + '">-</button>' +
               '<span class="px-2">' + item.count + '</span>' +
               '<button class="btn btn-sm btn-secondary plus-btn" data-index="' + index + '">+</button>' +
               '</div>' +
               '</div>' +
               '<span class="mt-2 text-center w-100">' + item.name + '</span>' +
               '<button class="btn btn-danger delete-item mt-2 mx-auto" data-index="' + index + '">DELETE</button>' +
               '</div>';
  cartItems.appendChild(li);
});

      // Add total count and price to the sidebar
      var totalItem = document.createElement('li');
      totalItem.classList.add('list-group-item', 'fw-bold');
      totalItem.innerHTML = '<div class="d-flex justify-content-between">' +
        '<span>Total</span>' +
        '<span>' + totalPrice.toFixed(2) + '</span>' +
        '</div>';
      cartItems.appendChild(totalItem);

      // Update total count badge
      var totalCountBadge = document.querySelector('.cart-total-count');
      if (totalCountBadge) {
        totalCountBadge.textContent = totalCount;
      }
    }
  });


  









  document.addEventListener("DOMContentLoaded", function () {
    const cursor = document.querySelector("#cursor");
    const cursorBorder = document.querySelector("#cursor-border");
    const cursorPos = { x: 0, y: 0 };
    const cursorBorderPos = { x: 0, y: 0 };
  
    document.addEventListener("mousemove", (e) => {
      cursorPos.x = e.clientX;
      cursorPos.y = e.clientY;
  
      cursor.style.transform = `translate(${cursorPos.x}px, ${cursorPos.y}px)`;
    });
  
    requestAnimationFrame(function loop() {
      const easing = 8;
      cursorBorderPos.x += (cursorPos.x - cursorBorderPos.x) / easing;
      cursorBorderPos.y += (cursorPos.y - cursorBorderPos.y) / easing;
  
      cursorBorder.style.transform = `translate(${cursorBorderPos.x}px, ${cursorBorderPos.y}px)`;
      requestAnimationFrame(loop);
    });
  
    document.querySelectorAll("[data-cursor]").forEach((item) => {
      item.addEventListener("mouseover", (e) => {
        if (item.dataset.cursor === "pointer") {
          cursorBorder.style.backgroundColor = "rgba(255, 255, 255, .6)";
          cursorBorder.style.setProperty("--size", "30px");
        }
        if (item.dataset.cursor === "pointer2") {
          cursorBorder.style.backgroundColor = "white";
          cursorBorder.style.mixBlendMode = "difference";
          cursorBorder.style.setProperty("--size", "80px");
        }
      });
      item.addEventListener("mouseout", (e) => {
        cursorBorder.style.backgroundColor = "unset";
        cursorBorder.style.mixBlendMode = "unset";
        cursorBorder.style.setProperty("--size", "50px");
      });
    });
  });
