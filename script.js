const productList = document.getElementById('product-list');
const favoriteList = document.getElementById('favorite-list');
const searchInput = document.getElementById('search');

let products = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Fetch JSON data with async/await
async function loadProducts() {
  const response = await fetch('data.json');
  products = await response.json();
  displayProducts(products);
  displayFavorites();
}

function displayProducts(items) {
  productList.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>$${item.price}</p>
      <button onclick="toggleFavorite('${item.id}')">
        ${favorites.includes(item.id) ? 'Remove Favorite' : 'Add to Favorites'}
      </button>
    `;
    productList.appendChild(card);
  });
}

function displayFavorites() {
  favoriteList.innerHTML = '';
  const favItems = products.filter(p => favorites.includes(p.id));
  if (favItems.length === 0) {
    favoriteList.innerHTML = '<p>No favorites yet.</p>';
    return;
  }
  favItems.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>$${item.price}</p>
      <button onclick="toggleFavorite('${item.id}')">Remove Favorite</button>
    `;
    favoriteList.appendChild(card);
  });
}

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
  displayProducts(products);
  displayFavorites();
}

// Search functionality
searchInput.addEventListener('input', e => {
  const term = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(term));
  displayProducts(filtered);
});

loadProducts();
