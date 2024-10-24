document.addEventListener('DOMContentLoaded', function () {
    const mainContent = document.querySelector('.main-content');
    const productId = new URLSearchParams(window.location.search).get('id');

    async function fetchProductDetails(id) {
        try {
            const response = await fetch(`https://furni1.transtechvietnam.com/search/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    }

    function renderProductDetails(product) {
        const { name, price, desc, material, dimension, image } = product;

        const productHTML = `
            <div class="image-gallery">
                <img class="main-image" src="${image[0]}" alt="${name}" />
                <div class="thumbnail-images">
                    ${image.map(img => `<img src="${img}" alt="${name}" />`).join('')}
                </div>
                <!-- Thêm nút Update ở đây -->
                <button id="update-btn" class="update-button">Update Product</button>
            </div>
            <div class="product-info">
                <h2>${name}</h2>
                <p><strong>Price:</strong> ${price}</p>
                <p><strong>Description:</strong> ${desc}</p>
                <p><strong>Material:</strong> ${material}</p>
                <p><strong>Dimension:</strong> ${dimension}</p>
            </div>
        `;

        mainContent.innerHTML = productHTML;

        const thumbnails = document.querySelectorAll('.thumbnail-images img');
        const mainImage = document.querySelector('.main-image');

        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                mainImage.src = thumbnail.src;
            });
        });

        // Thêm sự kiện click cho nút Update
        const updateButton = document.getElementById('update-btn');

        updateButton.className = 'update-button';
        updateButton.addEventListener('click', () => {
            window.location.href = `/putAdmin?id=${productId}`;
        });
    }

    fetchProductDetails(productId)
        .then(renderProductDetails);
});
