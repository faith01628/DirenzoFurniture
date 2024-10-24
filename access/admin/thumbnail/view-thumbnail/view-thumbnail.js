document.addEventListener('DOMContentLoaded', () => {
    let thumbnailsPerPage = 12; // Number of products to display per page
    let currentPage = 1; // Current page number
    let totalPages; // Total number of pages
    let thumbnails = []; // Array to hold the product data

    fetch('https://furni1.transtechvietnam.com/thumbnail')
        .then(response => response.json())
        .then(data => {
            if (data && Array.isArray(data)) {
                thumbnails = data;
                totalPages = Math.ceil(thumbnails.length / thumbnailsPerPage); // Calculate total pages

                displayPage(currentPage); // Display the first page
                updatePaginationControls(); // Update pagination controls
            } else {
                console.error('No thumbnail data available');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            handleFetchError();
        });

    function handleFetchError() {
        console.warn('Fetch error handling');
    }

    function displayPage(page) {
        const thumbnailList = document.getElementById('thumbnail-list');
        thumbnailList.innerHTML = ''; // Clear previous products

        const start = (page - 1) * thumbnailsPerPage;
        const end = start + thumbnailsPerPage;
        const thumbnailsToShow = thumbnails.slice(start, end); // Get products for the current page

        thumbnailsToShow.forEach(thumbnail => {
            displayThumbnailInfo(thumbnail); // Display each product
        });

        updatePaginationControls(); // Update pagination controls after displaying products
    }

    function updatePaginationControls() {
        const prevButton = document.querySelector('.pagination__item--prev');
        const nextButton = document.querySelector('.pagination__item--next');
        const pageInfo = document.querySelector('.pagination__num--container');
        const paginationInfo = document.querySelector('.simple-pagination-info');

        // Disable "Previous" button if on the first page
        prevButton.classList.toggle('pagination__item--disible', currentPage === 1);

        // Disable "Next" button if on the last page
        nextButton.classList.toggle('pagination__item--disible', currentPage === totalPages);

        // Update page number display
        pageInfo.textContent = `${currentPage}/${totalPages}`;

        // Update pagination info text
        const startItem = (currentPage - 1) * thumbnailsPerPage + 1;
        const endItem = Math.min(currentPage * thumbnailsPerPage, thumbnails.length);
        paginationInfo.textContent = `${startItem} ~ ${endItem} of ${thumbnails.length} items`;
    }

    // Event listener for "Previous" button
    document.querySelector('.pagination__item--prev').addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            displayPage(currentPage);
        }
    });

    // Event listener for "Next" button
    document.querySelector('.pagination__item--next').addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            displayPage(currentPage);
        }
    });

    function displayThumbnailInfo(data) {
        const thumbnailList = document.getElementById('thumbnail-list');

        if (!thumbnailList) {
            console.error('thumbnail list element not found');
            return;
        }

        const listItem = document.createElement('li');
        listItem.classList.add('thumbnail-item');

        const thumbnailDetails = document.createElement('div');
        thumbnailDetails.classList.add('thumbnail-details');

        const nameElement = document.createElement('h6');
        nameElement.classList.add('thumbnail-name');
        nameElement.textContent = `${data.name}`; // Updated text for name
        thumbnailDetails.appendChild(nameElement);

        const containerElement = document.createElement('div');
        containerElement.classList.add('container');

        const imageElement = document.createElement('img');
        imageElement.classList.add('thumbnail-image-wrapper', 'img-responsive');
        imageElement.src = data.image;
        imageElement.alt = `${data.name} thumbnail`; // Updated alt text
        imageElement.addEventListener('click', () => {
            window.location.href = `https://furni1.transtechvietnam.com/putDesc?id=${data.id}`;
        });
        containerElement.appendChild(imageElement);

        thumbnailDetails.appendChild(containerElement);
        listItem.appendChild(thumbnailDetails);

        thumbnailList.appendChild(listItem);
    }

});