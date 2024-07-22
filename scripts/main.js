const PRODUCTS = [];
const BASKET = [];
const root = document.getElementById("root");
const basket = document.getElementById("basket-count");
let PAGE = 1;
let PER_PAGE = 5;
let CURRENT_CATEGORY = "all";

function fetchCategories() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://fakestoreapi.com/products/categories", true);
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            let categories = JSON.parse(xhr.responseText);
            let categorySelect = document.getElementById('category-select');
            categorySelect.innerHTML = '<option value="all">All</option>';
            categories.forEach(category => {
                let option = document.createElement('option');
                option.value = category;
                option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                categorySelect.appendChild(option);
            });
        }
    };
    xhr.send();
}

function fetchProducts(category = "all") {
    CURRENT_CATEGORY = category;
    let url = category === "all" ? "https://fakestoreapi.com/products" : `https://fakestoreapi.com/products/category/${category}`;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            let products = JSON.parse(xhr.responseText);
            PRODUCTS.splice(0, PRODUCTS.length, ...products);
            PAGE = 1; 
            renderProducts(PRODUCTS);
            renderPagination(PRODUCTS);
        } else {
            console.error('Error fetching products');
        }
    };
    xhr.send();
}

function handleCategoryChange(event) {
    fetchProducts(event.target.value);
}

function handlePerPageChange(event) {
    PER_PAGE = event.target.value === "all" ? PRODUCTS.length : parseInt(event.target.value);
    PAGE = 1; 
    renderProducts(PRODUCTS);
    renderPagination(PRODUCTS);
}

function renderProducts(list) {
    const start = (PAGE - 1) * PER_PAGE;
    const end = PER_PAGE === PRODUCTS.length ? PRODUCTS.length : PER_PAGE * PAGE;
    const template = list.slice(start, end).map(item => {
        return `
            <div class="product card">
                <img src="${item.image}" alt="${item.title}">
                <h2>${item.title}</h2>
                <p>${item.description}</p>
                <p class="price">Price: ${item.price}$</p>
                ${!BASKET.find(basketItem => basketItem.id === item.id)
                    ? `<h3 class="add" onclick="handleAddToBasket(${item.id})"><i class="fa fa-cart-plus" aria-hidden="true"></i></h3>`
                    : `<h4 class="added"><i class="fa fa-check-square" aria-hidden="true"></i></h4>`
                }
            </div>`;
    }).join("");
    root.innerHTML = template;
    basket.textContent = BASKET.length;
}

function handleSearch(event) {
    let searchTerm = event.target.value.toLowerCase();
    let cards = document.querySelectorAll('.card');
    cards.forEach(function(card) {
        let title = card.querySelector('h3').textContent.toLowerCase();
        let description = card.querySelector('p').textContent.toLowerCase();
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function renderPagination(list) {
    const pageLength = Math.ceil(list.length / PER_PAGE);
    const pageArr = Array.from({ length: pageLength }, (_, i) => i + 1);
    const template = pageArr.map(page => {
        return `<button class='${PAGE === page ? "active" : ""}' onclick='handlePagination(${page})'>${page}</button>`;
    }).join("");
    document.getElementById("pagination").innerHTML = template;
}

function handlePagination(page) {
    PAGE = page;
    renderProducts(PRODUCTS);
    renderPagination(PRODUCTS);
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function handleAddToBasket(productId) {
    const finded = PRODUCTS.find(item => item.id === productId);
    BASKET.push(finded);

    Swal.fire({
        title: 'Added to Basket',
        icon: 'success',
        confirmButtonText: 'OK'        
    });

    renderProducts(PRODUCTS);
}

function handleRemoveFromBasket(productId) {
    const index = BASKET.findIndex(item => item.id === productId);
    if (index !== -1) {
        BASKET.splice(index, 1);
        renderBasket();
    }
}

let isBasketPage = false;

function renderBasket() {
    isBasketPage = true;

    let template = `<section class="baskets">`;
    template += BASKET.map(item => {
        return `
            <div class="product basket">
                <img src="${item.image}" alt="${item.title}">
                <h2>${item.title}</h2>
                <p>${item.description}</p>
                <p>Price: ${item.price}$</p>
                <h3 onclick="handleRemoveFromBasket(${item.id})" class='remove'><i class="fa fa-times" aria-hidden="true"></i></h3>
            </div>`;
    }).join("");
    template += '</section>';

    root.innerHTML = template;
    basket.textContent = BASKET.length;

    if (isBasketPage) {
        document.querySelector('.slider').style.display = 'none';
    }
    document.getElementById("pagination").style.display = "none";
    document.getElementById("per-page-container").style.display = "none";
    
}

document.addEventListener('DOMContentLoaded', function() {
    fetchCategories();
    fetchProducts();

    window.addEventListener('scroll', function() {
        let header = document.getElementById('main-header');
        if (window.scrollY > 100) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    });

    document.getElementById('search-input').addEventListener('input', handleSearch);
});

let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
}

function startSlider() {
    setInterval(nextSlide, 3000); 
}

document.addEventListener('DOMContentLoaded', function() {
    fetchCategories();
    fetchProducts();
    startSlider();

    window.addEventListener('scroll', function() {
        let header = document.getElementById('main-header');
        if (window.scrollY > 100) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    });

   
});

        function handleTheme(theme) {
            localStorage.setItem("theme", theme);

            if (theme === "dark") {
                document.body.classList.add("dark");
                document.getElementById('theme-btn').innerHTML = '<i class="fa fa-sun-o" aria-hidden="true"></i>';
            } else {
                document.body.classList.remove("dark");
                document.getElementById('theme-btn').innerHTML = '<i class="fa fa-moon-o" aria-hidden="true"></i>';
            }
        }

        function toggleTheme() {
            const currentTheme = localStorage.getItem("theme") === "dark" ? "light" : "dark";
            handleTheme(currentTheme);
        }

        document.addEventListener('DOMContentLoaded', function() {
            const savedTheme = localStorage.getItem("theme") || "light";
            handleTheme(savedTheme);
        });