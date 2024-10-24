document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    // Lấy tên sản phẩm từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('product');

    // Sử dụng API để gửi yêu cầu POST với productName trong body
    fetch('https://furni1.transtechvietnam.com/thumbnail/product', {
        method: 'POST', // Dùng phương thức POST
        headers: {
            'Content-Type': 'application/json' // Xác định kiểu nội dung là JSON
        },
        body: JSON.stringify({ name: productName }) // Truyền productName vào body
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                addThumbnail(data); // Xử lý dữ liệu từ API, hiển thị thumbnail
            } else {
                console.error('Product not found');
                handleFetchError();
            }
        })
        .catch(error => {
            console.error('Error fetching from API:', error);
            handleFetchError();
        });
});


function handleFetchError() {
    console.warn('Fetch error handling');
}

function addThumbnail(product) {
    if (!product) {
        console.error('Product data is undefined or null');
        return;
    }

    const div = document.getElementById('thumbnail-img');
    if (!div) {
        console.error('Element with id thumbnail-img not found');
        return;
    }

    const image_wrapper = document.createElement('div');
    image_wrapper.className = 'collection-hero__image-wrapper ';
    div.appendChild(image_wrapper);

    const collection_hero__inner = document.createElement('div');
    collection_hero__inner.className = 'collection-hero__inner';
    image_wrapper.appendChild(collection_hero__inner);

    const collection_hero__text_wrapper = document.createElement('div');
    collection_hero__text_wrapper.className = 'page-width collection-hero__text-wrapper';
    collection_hero__inner.appendChild(collection_hero__text_wrapper);

    const collection_hero__titleNav = document.createElement('nav');
    collection_hero__titleNav.className = 'breadcrumb body4 text-center quick-add-modal-hidden';
    collection_hero__text_wrapper.appendChild(collection_hero__titleNav);

    const a = document.createElement('a');
    a.href = '/';
    a.textContent = 'Home';
    collection_hero__titleNav.appendChild(a);

    const span = document.createElement('span');
    span.textContent = ' / ';
    span.className = 'breadcrumb__divider';
    collection_hero__titleNav.appendChild(span);

    const span2 = document.createElement('span');
    span2.className = 'breadcrumb__last-crumb';
    span2.textContent = product.name;
    collection_hero__titleNav.appendChild(span2);

    const h1 = document.createElement('h1');
    h1.className = 'title4 collection-hero__title';
    h1.textContent = product.name;
    collection_hero__text_wrapper.appendChild(h1);

    const img1 = document.createElement('img');
    img1.src = product.image;
    img1.srcset = `
    ${product.image} 352w, 
    ${product.image} 832w, 
    ${product.image} 1200w, 
    ${product.image} 1600w`;
    img1.alt = product.name;
    img1.width = 3840;
    img1.height = 2400;
    img1.sizes = "100vw";
    img1.setAttribute('fetchpriority', '');
    img1.className = 'collection-hero__image display-none-desktop';
    image_wrapper.appendChild(img1);

    const img2 = document.createElement('img');
    img2.src = product.image;
    img2.srcset = `
    ${product.image} 352w, 
    ${product.image} 832w, 
    ${product.image} 1200w,
    ${product.image} 1600w`;
    img2.alt = product.name;
    img2.width = 3840;
    img2.height = 2400;
    img2.sizes = "100vw";
    img2.setAttribute('fetchpriority', 'high');
    img2.className = 'collection-hero__image display-none-tablet';
    image_wrapper.appendChild(img2);
}