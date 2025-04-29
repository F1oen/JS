const books = [
    { title: "The Great Adventure", author: " ", genre: "Fiction", price: 15, language: "English", format: "Paperback", year: 2020, rating: 4.5, description: "A thrilling journey through uncharted lands." },
    { title: "Mystery of the Old House", author: "Jane Doe", genre: "Mystery", price: 12, language: "English", format: "Hardcover", year: 2019, rating: 4.8, description: "A spine-chilling mystery that keeps you guessing." },
    { title: "Learning JavaScript", author: "Alex Grey", genre: "Non-fiction", price: 25, language: "English", format: "eBook", year: 2021, rating: 4.0, description: "Comprehensive guide to mastering JavaScript." },
    { title: "Fantasy Kingdom", author: "Lara Blue", genre: "Fantasy", price: 20, language: "English", format: "Paperback", year: 2022, rating: 4.9, description: "Enter a world of dragons, knights, and magic." }
  ];
  
  const form = document.getElementById('book-form');
  const results = document.getElementById('results');
  const wishlistDiv = document.getElementById('wishlist');
  
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    const filters = Object.fromEntries(formData.entries());
    const filtered = books.filter(book => {
      return (!filters.genre || book.genre === filters.genre) &&
             (!filters.author || book.author.toLowerCase().includes(filters.author.toLowerCase())) &&
             (!filters.minPrice || book.price >= parseFloat(filters.minPrice)) &&
             (!filters.maxPrice || book.price <= parseFloat(filters.maxPrice)) &&
             (!filters.language || book.language.toLowerCase() === filters.language.toLowerCase()) &&
             (!filters.format || book.format === filters.format) &&
             (!filters.year || book.year == filters.year);
    });
    results.innerHTML = '';
    if (filtered.length === 0) {
      results.innerHTML = '<p>No books found matching your preferences.</p>';
      return;
    }
    const bestFit = filtered.reduce((best, current) => current.rating > best.rating ? current : best);
    filtered.forEach(book => {
      const div = document.createElement('div');
      div.className = 'book' + (book === bestFit ? ' highlight' : '');
      div.innerHTML = `<strong>${book.title}</strong> by ${book.author}<br>
                      $${book.price} | ${book.language} | ${book.format} | ${book.year}<br>
                      ${book.description}<br>
                      <button onclick='addToWishlist(${JSON.stringify(book)})'>Add to Wishlist</button>`;
      results.appendChild(div);
    });
  });
  
  function addToWishlist(book) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist.find(b => b.title === book.title)) {
      wishlist.push(book);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      showWishlist();
    }
  }
  
  function showWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlistDiv.innerHTML = wishlist.map(book => `<div>${book.title} by ${book.author}</div>`).join('');
  }

  function removeFromWishlist(title) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(book => book.title !== title);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    showWishlist();
  }
  
  showWishlist();
  