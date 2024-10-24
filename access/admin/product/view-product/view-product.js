// document.addEventListener('DOMContentLoaded', () => {
//     let productsPerPage = 12; // Number of products to display per page
//     let currentPage = 1; // Current page number
//     let totalPages; // Total number of pages
//     let products = []; // Array to hold the product data

//     fetch('https://furni1.transtechvietnam.com/search')
//         .then(response => response.json())
//         .then(data => {
//             if (data && Array.isArray(data)) {
//                 products = data;
//                 totalPages = Math.ceil(products.length / productsPerPage); // Calculate total pages

//                 displayPage(currentPage); // Display the first page
//                 updatePaginationControls(); // Update pagination controls
//             } else {
//                 console.error('No product data available');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             handleFetchError();
//         });

//     function handleFetchError() {
//         console.warn('Fetch error handling');
//     }

//     function displayPage(page) {
//         const productList = document.getElementById('product-list');
//         productList.innerHTML = ''; // Clear previous products

//         const start = (page - 1) * productsPerPage;
//         const end = start + productsPerPage;
//         const productsToShow = products.slice(start, end); // Get products for the current page

//         productsToShow.forEach(product => {
//             displayProductInfo(product); // Display each product
//         });

//         updatePaginationControls(); // Update pagination controls after displaying products
//     }

//     function updatePaginationControls() {
//         const prevButton = document.querySelector('.pagination__item--prev');
//         const nextButton = document.querySelector('.pagination__item--next');
//         const pageInfo = document.querySelector('.pagination__num--container');
//         const paginationInfo = document.querySelector('.simple-pagination-info');

//         // Disable "Previous" button if on the first page
//         prevButton.classList.toggle('pagination__item--disible', currentPage === 1);

//         // Disable "Next" button if on the last page
//         nextButton.classList.toggle('pagination__item--disible', currentPage === totalPages);

//         // Update page number display
//         pageInfo.textContent = `${currentPage}/${totalPages}`;

//         // Update pagination info text
//         const startItem = (currentPage - 1) * productsPerPage + 1;
//         const endItem = Math.min(currentPage * productsPerPage, products.length);
//         paginationInfo.textContent = `${startItem} ~ ${endItem} of ${products.length} items`;
//     }

//     // Event listener for "Previous" button
//     document.querySelector('.pagination__item--prev').addEventListener('click', (e) => {
//         e.preventDefault();
//         if (currentPage > 1) {
//             currentPage--;
//             displayPage(currentPage);
//         }
//     });

//     // Event listener for "Next" button
//     document.querySelector('.pagination__item--next').addEventListener('click', (e) => {
//         e.preventDefault();
//         if (currentPage < totalPages) {
//             currentPage++;
//             displayPage(currentPage);
//         }
//     });

//     function displayProductInfo(data) {
//         const productList = document.getElementById('product-list');

//         if (!productList) {
//             console.error('Product list element not found');
//             return;
//         }

//         const listItem = document.createElement('li');
//         listItem.classList.add('product-item');

//         const productDetails = document.createElement('div');
//         productDetails.classList.add('product-details');

//         const nameElement = document.createElement('h6');
//         nameElement.classList.add('product-name');
//         nameElement.textContent = data.name;
//         productDetails.appendChild(nameElement);

//         const containerElement = document.createElement('div');
//         containerElement.classList.add('container');

//         const imageElement = document.createElement('img');
//         imageElement.classList.add('product-image-wrapper', 'img-responsive');
//         imageElement.src = data.image[0];
//         imageElement.alt = data.name;
//         imageElement.addEventListener('click', () => {
//             window.location.href = `https://furni1.transtechvietnam.com/getAdmin?id=${data.id}`;
//         });
//         containerElement.appendChild(imageElement);

//         const divElement = document.createElement('div');
//         divElement.classList.add('div-element');

//         const priceElement = document.createElement('span');
//         priceElement.classList.add('product-price');
//         priceElement.textContent = `Price: ${data.price}`;
//         divElement.appendChild(priceElement);

//         const descriptionElement = document.createElement('p');
//         descriptionElement.classList.add('product-description');
//         descriptionElement.textContent = `Desc: ${data.desc}`;
//         divElement.appendChild(descriptionElement);

//         const dimensionElement = document.createElement('span');
//         dimensionElement.classList.add('product-dimension');
//         dimensionElement.textContent = `Dimension: ${data.dimension}`;
//         divElement.appendChild(dimensionElement);

//         containerElement.appendChild(divElement);
//         productDetails.appendChild(containerElement);
//         listItem.appendChild(productDetails);

//         productList.appendChild(listItem);
//     }
// });


document.addEventListener('DOMContentLoaded', () => {
    let productsPerPage = 12;
    let currentPage = 1;
    let totalPages;
    let products = []; // Full product list from API
    let filteredProducts = []; // List after filtering by keyword
    let keyword = getKeywordFromUrl(); // Get keyword from URL

    fetchProducts();

    // Fetch products from API
    function fetchProducts() {
        let apiUrl = 'https://furni1.transtechvietnam.com/search';

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data);
                if (data && Array.isArray(data)) {
                    products = data; // Store full product list
                    applyFilter(); // Apply filter based on keyword
                } else {
                    console.error('No product data available');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                handleFetchError();
            });
    }

    // Apply filter based on the keyword
    function applyFilter() {
        if (keyword) {
            // Convert keyword to lowercase for case-insensitive search
            const lowerKeyword = keyword.toLowerCase();

            // Filter products based on whether the name includes the keyword (case-insensitive)
            filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(lowerKeyword)
            );
        } else {
            // If no keyword, show all products
            filteredProducts = products;
        }

        totalPages = Math.ceil(filteredProducts.length / productsPerPage);

        if (filteredProducts.length > 0) {
            displayPage(currentPage);
        } else {
            displayNoResults();
        }
        updatePaginationControls();
    }

    function getKeywordFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('keyword') || ''; // Return empty string if no keyword
    }

    // Display products on the current page
    function displayPage(page) {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';

        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;
        const productsToShow = filteredProducts.slice(start, end);

        productsToShow.forEach(product => {
            displayProductInfo(product);
        });

        updatePaginationControls();
    }

    // Display message if no results are found
    function displayNoResults() {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '<p>No products found for the given keyword.</p>';
    }

    // Update pagination controls
    function updatePaginationControls() {
        const prevButton = document.querySelector('.pagination__item--prev');
        const nextButton = document.querySelector('.pagination__item--next');
        const pageInfo = document.querySelector('.pagination__num--container');
        const paginationInfo = document.querySelector('.simple-pagination-info');

        prevButton.classList.toggle('pagination__item--disible', currentPage === 1);
        nextButton.classList.toggle('pagination__item--disible', currentPage === totalPages);

        pageInfo.textContent = `${currentPage}/${totalPages}`;

        const startItem = (currentPage - 1) * productsPerPage + 1;
        const endItem = Math.min(currentPage * productsPerPage, filteredProducts.length);
        paginationInfo.textContent = `${startItem} ~ ${endItem} of ${filteredProducts.length} items`;
    }

    // Pagination buttons
    document.querySelector('.pagination__item--prev').addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            displayPage(currentPage);
        }
    });

    document.querySelector('.pagination__item--next').addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            displayPage(currentPage);
        }
    });

    // Display individual product info
    function displayProductInfo(data) {
        const productList = document.getElementById('product-list');

        if (!productList) {
            console.error('Product list element not found');
            return;
        }

        const listItem = document.createElement('li');
        listItem.classList.add('product-item');

        const productDetails = document.createElement('div');
        productDetails.classList.add('product-details');

        const nameElement = document.createElement('h6');
        nameElement.classList.add('product-name');
        nameElement.textContent = data.name;
        productDetails.appendChild(nameElement);

        const containerElement = document.createElement('div');
        containerElement.classList.add('container');

        const imageElement = document.createElement('img');
        imageElement.classList.add('product-image-wrapper', 'img-responsive');
        imageElement.src = data.image[0];
        imageElement.alt = data.name;
        imageElement.addEventListener('click', () => {
            window.location.href = `https://furni1.transtechvietnam.com/getAdmin?id=${data.id}`;
        });
        containerElement.appendChild(imageElement);

        const divElement = document.createElement('div');
        divElement.classList.add('div-element');

        const priceElement = document.createElement('span');
        priceElement.classList.add('product-price');
        priceElement.textContent = `Price: ${data.price}`;
        divElement.appendChild(priceElement);

        const descriptionElement = document.createElement('p');
        descriptionElement.classList.add('product-description');
        descriptionElement.textContent = `Desc: ${data.desc}`;
        divElement.appendChild(descriptionElement);

        const dimensionElement = document.createElement('span');
        dimensionElement.classList.add('product-dimension');
        dimensionElement.textContent = `Dimension: ${data.dimension}`;
        divElement.appendChild(dimensionElement);

        containerElement.appendChild(divElement);
        productDetails.appendChild(containerElement);
        listItem.appendChild(productDetails);

        productList.appendChild(listItem);
    }

    // Handle fetch error
    function handleFetchError() {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '<p>Sorry, something went wrong while fetching the data.</p>';
    }
});

