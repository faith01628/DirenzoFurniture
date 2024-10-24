let productsPerPage = 16;
let currentPage = 1;
let totalPages;
let products = [];
let filteredProducts = []; // Danh sách sau khi lọc theo keyword
let keyword = getKeywordFromUrl(); // Lấy keyword từ URL

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    // Gọi API để lấy toàn bộ sản phẩm từ https://furni1.transtechvietnam.com/search
    fetch('https://furni1.transtechvietnam.com/search', {
        method: 'GET', // Sử dụng phương thức GET để lấy toàn bộ dữ liệu
        headers: {
            'Content-Type': 'application/json', // Đảm bảo định dạng dữ liệu trả về là JSON
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Chuyển đổi phản hồi thành JSON
        })
        .then(data => {
            if (data.length > 0) {
                products = data; // Lưu toàn bộ dữ liệu sản phẩm
                applyFilter(); // Áp dụng bộ lọc dựa trên từ khóa
            } else {
                console.warn('No products found.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            handleFetchError(); // Gọi hàm xử lý lỗi nếu xảy ra lỗi
        });
});

// Hàm lọc sản phẩm theo keyword
function applyFilter() {
    if (keyword) {
        // Convert keyword to lowercase for case-insensitive search
        const lowerKeyword = keyword.toLowerCase();

        // Filter products based on whether the name includes the keyword (case-insensitive)
        filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(lowerKeyword)
        );
    } else {
        // Nếu không có từ khóa, hiển thị tất cả sản phẩm
        filteredProducts = products;
    }

    totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    if (filteredProducts.length > 0) {
        displayPage(currentPage); // Hiển thị trang hiện tại
    } else {
        displayNoResults(); // Hiển thị thông báo nếu không có kết quả
    }
    updatePaginationControls(); // Cập nhật điều khiển phân trang
}

// Lấy keyword từ URL
function getKeywordFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('keyword') || ''; // Trả về chuỗi rỗng nếu không có keyword
}

// Hàm hiển thị sản phẩm theo trang
function displayPage(page) {
    const productList = document.getElementById('product-list-content');
    productList.innerHTML = ''; // Xóa các sản phẩm trước đó

    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const productsToShow = filteredProducts.slice(start, end); // Lấy sản phẩm cho trang hiện tại

    productsToShow.forEach(product => {
        addProductToList([product]); // Hiển thị từng sản phẩm
    });

    updatePaginationControls(); // Cập nhật nút phân trang
}

function updatePaginationControls() {
    const prevButton = document.querySelector('.pagination__item--prev');
    const nextButton = document.querySelector('.pagination__item--next');
    const pageInfo = document.querySelector('.pagination__num--container');
    const paginationInfo = document.querySelector('.simple-pagination-info');

    // Vô hiệu nút "Previous" nếu đang ở trang đầu tiên
    prevButton.classList.toggle('pagination__item--disible', currentPage === 1);

    // Vô hiệu nút "Next" nếu đang ở trang cuối cùng
    nextButton.classList.toggle('pagination__item--disible', currentPage === totalPages);

    // Hiển thị số trang hiện tại và tổng số trang
    pageInfo.textContent = `${currentPage}/${totalPages}`;

    // Hiển thị số lượng sản phẩm trên trang hiện tại
    const startItem = (currentPage - 1) * productsPerPage + 1;
    const endItem = Math.min(currentPage * productsPerPage, products.length);
    paginationInfo.textContent = `${startItem} ~ ${endItem} of ${products.length} items`;
}

// Điều khiển phân trang
document.addEventListener('DOMContentLoaded', (event) => {
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
});

// Function to handle fetch error
function handleFetchError() {
    console.warn('Fetch error handling');
}

function displayNoResults() {
    const productList = document.getElementById('product-list-content');
    productList.innerHTML = '<p>No products found for this search term.</p>';
}

// Hàm để thêm sản phẩm vào danh sách
function addProductToList(products) {
    // Check if products is not an array
    if (!Array.isArray(products)) {
        console.error('Expected an array but got:', products);
        return;
    }

    // Get the ul element with id 'product-list-content'
    const ul = document.getElementById('product-list-content');
    if (!ul) {
        console.error('Element with id product-list-content not found');
        return;
    }

    products.forEach(product => {

        const li = document.createElement('li');
        ul.appendChild(li);

        const productCardWrapper = document.createElement('div');
        productCardWrapper.className = 'product-card-wrapper card card-wrapper product-card-style-normal';
        productCardWrapper.setAttribute('data-product-id', '16065017694466539683330260');
        productCardWrapper.setAttribute('data-product-form-id', 'quick-add-main-collection-product-list__16065017694466539683330260');
        productCardWrapper.style = "--card-image-padding: 0px; --color-card-background: 90, 90, 90; --color-card-text: 255, 255, 255;";
        li.appendChild(productCardWrapper);








        // Tạo thẻ a chứa link
        const productLink = document.createElement('a');
        productLink.href = './view-product.html';
        productLink.className = 'full-unstyled-link';
        // Tạo span cho tiêu đề sản phẩm
        const productTitle = document.createElement('span');
        productTitle.className = 'visibility-hidden';
        productTitle.textContent = 'DO-SF 04 316B Sofa';
        // Gắn span vào a
        productLink.appendChild(productTitle);
        // Gắn a vào productCardWrapper
        productCardWrapper.appendChild(productLink);











        const productCardBlock = document.createElement('div');
        productCardBlock.className = 'card__block--wrapper';
        productCardWrapper.appendChild(productCardBlock);

        // Tạo thẻ div cho ảnh sản phẩm
        const productImageWrapper = document.createElement('div');
        productImageWrapper.className = 'product-card-block-item card__image';
        productCardBlock.appendChild(productImageWrapper);

        const cardInnerWrapper = document.createElement('div');
        cardInnerWrapper.className = 'card__inner--wrapper global-product-card-border-shadow ';
        productImageWrapper.appendChild(cardInnerWrapper);

        const cardInner = document.createElement('div');
        cardInner.className = 'card__inner ratio ';
        cardInner.style = '--ratio-percent: 100%; --image-fill-type: contain; --badge-border-radius: 0px; --image-object-position:center center;';
        cardInnerWrapper.appendChild(cardInner);


        const imageLink = document.createElement('a');
        imageLink.href = `./view-product.html?id=${product.id}`;
        imageLink.className = 'card__media media--hover-effect';

        // Tạo img cho sản phẩm
        const img1 = document.createElement('img');
        // img1.src = 'https://img.myshopline.com/image/store/1716802692037/WechatIMG552.jpeg?w=1080&h=1080';
        img1.src = product.image[0];
        img1.srcset = `
        ${product.image[0]} 375w, 
        ${product.image[0]} 540w, 
        ${product.image[0]} 720w, 
        ${product.image[0]} 900w, 
        ${product.image[0]} 1080w`;
        img1.alt = 'DO-SF 04 316B Sofa';
        img1.width = 1080;
        img1.height = 1080;
        img1.sizes = "(max-width: 959px) calc(100vw * 1/2),(min-width: 960px) calc(100vw * 1/4)";
        img1.loading = "eager";
        img1.decoding = "async";
        img1.classList.add('collection-hero__image');

        // Tạo phần tử ảnh thứ hai
        const img2 = document.createElement('img');
        img2.src = product.image[1];
        img2.srcset = `
        ${product.image[1]} 375w, 
        ${product.image[1]} 540w, 
        ${product.image[1]} 720w, 
        ${product.image[1]} 800w`;
        img2.alt = 'DO-SF 04 316B Sofa';
        img2.width = 800;
        img2.height = 800;
        img2.sizes = "(max-width: 959px) calc(100vw * 1/2),(min-width: 960px) calc(100vw * 1/4)";
        img2.loading = "eager";
        img2.decoding = "async";
        img2.classList.add('collection-hero__image');

        const divleft_bottom = document.createElement('div');
        divleft_bottom.className = 'card__badge left_bottom';

        cardInner.appendChild(divleft_bottom);

        // Gắn img vào thẻ a
        imageLink.appendChild(img1);
        imageLink.appendChild(img2);

        cardInner.appendChild(imageLink);










        const quickAddDiv = document.createElement('div');
        quickAddDiv.classList.add('quick-add', 'display-none', 'display-block-desktop', 'display-block-tablet');
        cardInner.appendChild(quickAddDiv);

        const modalOpener = document.createElement('modal-opener');
        modalOpener.setAttribute('data-modal', '#QuickAdd-16065017694466539683330260');
        quickAddDiv.appendChild(modalOpener);

        const buttonAddCard = document.createElement('button');
        buttonAddCard.id = "quick-add-main-collection-product-list__16065017694466539683330260-submit";
        buttonAddCard.type = "submit";
        buttonAddCard.name = "add";
        buttonAddCard.className = "quick-add__opener";
        buttonAddCard.setAttribute('data-product-url', '/products/do-sf-04-316b-sofa');
        modalOpener.appendChild(buttonAddCard);









        const iconAddCard = document.createElement('i');
        iconAddCard.classList.add('loading-hidden');
        buttonAddCard.appendChild(iconAddCard);

        const ISvgaddCard = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        ISvgaddCard.setAttribute('class', 'icon icon-add-cart');
        ISvgaddCard.setAttribute('width', '19');
        ISvgaddCard.setAttribute('height', '19');
        ISvgaddCard.setAttribute('viewBox', '0 0 19 19');
        ISvgaddCard.setAttribute('fill', 'none');
        iconAddCard.appendChild(ISvgaddCard);

        const pathISvgaddCard = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathISvgaddCard.setAttribute('fill-rule', 'evenodd');
        pathISvgaddCard.setAttribute('clip-rule', 'evenodd');
        pathISvgaddCard.setAttribute('d', 'M4.59197 4.37379C4.59197 2.02226 6.49826 0.115967 8.84979 0.115967C11.2013 0.115967 13.1076 2.02226 13.1076 4.37379V4.81364H15.3082C16.1681 4.81364 16.8651 5.51069 16.8651 6.37055V11.1851C16.8651 11.4612 16.6413 11.6851 16.3651 11.6851C16.089 11.6851 15.8651 11.4612 15.8651 11.1851V6.37055C15.8651 6.06298 15.6158 5.81364 15.3082 5.81364H2.39969C2.09028 5.81364 1.84019 6.06585 1.84279 6.37524L1.92793 16.4743C1.93051 16.7801 2.17908 17.0266 2.48482 17.0266H12.4314C12.7075 17.0266 12.9314 17.2504 12.9314 17.5266C12.9314 17.8027 12.7075 18.0266 12.4314 18.0266H2.48482C1.63008 18.0266 0.93517 17.3375 0.927965 16.4828L0.84283 6.38367C0.835538 5.51872 1.5347 4.81364 2.39969 4.81364H4.59197V4.37379ZM5.59197 4.81364H12.1076V4.37379C12.1076 2.57454 10.649 1.11597 8.84979 1.11597C7.05054 1.11597 5.59197 2.57454 5.59197 4.37379V4.81364ZM16.1304 12.7989C16.4065 12.7989 16.6304 13.0227 16.6304 13.2989V14.9127H18.2438C18.5199 14.9127 18.7438 15.1366 18.7438 15.4127C18.7438 15.6889 18.5199 15.9127 18.2438 15.9127H16.6304V17.5265C16.6304 17.8027 16.4065 18.0265 16.1304 18.0265C15.8542 18.0265 15.6304 17.8027 15.6304 17.5265V15.9127H14.0161C13.74 15.9127 13.5161 15.6889 13.5161 15.4127C13.5161 15.1366 13.74 14.9127 14.0161 14.9127H15.6304V13.2989C15.6304 13.0227 15.8542 12.7989 16.1304 12.7989Z');
        pathISvgaddCard.setAttribute('fill', 'currentColor');
        ISvgaddCard.appendChild(pathISvgaddCard);

        const divLoadingOverlay = document.createElement('div');
        divLoadingOverlay.className = "loading-overlay__spinner";
        buttonAddCard.appendChild(divLoadingOverlay);

        const svgLoaing = document.createElement('svg');
        svgLoaing.className = "icon icon-loading";
        svgLoaing.setAttribute('width', '20');
        svgLoaing.setAttribute('height', '20');
        svgLoaing.setAttribute('viewBox', '0 0 20 20');
        svgLoaing.setAttribute('fill', 'none');
        svgLoaing.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        divLoadingOverlay.appendChild(svgLoaing);


        const pathLoading = document.createElement('path');
        pathLoading.setAttribute('d', 'M18.3337 9.99984C18.3337 14.6022 14.6027 18.3332 10.0003 18.3332C5.39795 18.3332 1.66699 14.6022 1.66699 9.99984C1.66699 5.39746 5.39795 1.6665 10.0003 1.6665');
        pathLoading.setAttribute('stroke', 'currentColor');
        pathLoading.setAttribute('stroke-width', '2.5');
        pathLoading.setAttribute('stroke-linecap', 'round');
        divLoadingOverlay.appendChild(pathLoading);

















        //hiểm thị thông tin sản phẩm

        const product__title = document.createElement('h3');
        product__title.classList.add("product-card-block-item", "product__title", "body3", "fw-bold", "full-display");
        product__title.textContent = product.name;
        productCardBlock.appendChild(product__title);


        const productPrice = document.createElement('div');
        productPrice.classList.add("price", "product-card-block-item");
        productCardBlock.appendChild(productPrice);

        const price__container = document.createElement('div');
        price__container.classList.add("price__container");
        productPrice.appendChild(price__container);


        const price__regular = document.createElement('div');
        price__regular.classList.add('price__regular', 'body2');
        price__container.appendChild(price__regular);

        const priceItem = document.createElement('span');
        priceItem.classList.add('fw-bold', 'price-item', 'price-item--regular');
        priceItem.textContent = `From $${product.price} USD`;
        price__regular.appendChild(priceItem);














        const quick_add_modal = document.createElement('quick-add-modal');
        quick_add_modal.setAttribute('id', 'QuickAdd-16065017694466539683330260');
        productCardWrapper.appendChild(quick_add_modal);

        const details = document.createElement('details');
        quick_add_modal.appendChild(details);

        const summary = document.createElement('summary');
        details.appendChild(summary);

        const modal__overlay = document.createElement('div');
        modal__overlay.classList.add("modal__overlay");
        details.appendChild(modal__overlay);


        const modal__content = document.createElement('div');
        modal__content.classList.add('modal__content', 'quick-add-modal__content');
        details.appendChild(modal__content);



        const detailsButton = document.createElement("button");
        detailsButton.id = "ModalClose-16065017694466539683330260";
        detailsButton.type = "button";
        detailsButton.classList.add("quick-add-modal__toggle");
        detailsButton.name = "close";
        modal__content.appendChild(detailsButton);

        const svgButton = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgButton.classList.add("icon", "icon-close");
        svgButton.setAttribute("width", "10");
        svgButton.setAttribute("height", "10");
        svgButton.setAttribute("viewBox", "0 0 10 10");
        svgButton.setAttribute("fill", "none");
        detailsButton.appendChild(svgButton);

        // Tạo đường path đầu tiên cho svg
        const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1.setAttribute("d", "M9 1L1 9");
        path1.setAttribute("stroke", "currentColor");
        path1.setAttribute("stroke-width", "1.5");
        path1.setAttribute("stroke-linecap", "round");
        svgButton.appendChild(path1);

        // Tạo đường path thứ hai cho svg
        const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path2.setAttribute("d", "M1 1L9 9");
        path2.setAttribute("stroke", "currentColor");
        path2.setAttribute("stroke-width", "1.5");
        path2.setAttribute("stroke-linecap", "round");
        svgButton.appendChild(path2);


    });



}