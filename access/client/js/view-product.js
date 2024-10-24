document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    // Lấy ID từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    console.log('Product ID from URL:', productId); // Log giá trị của productId

    // Kiểm tra nếu productId không tồn tại
    if (!productId) {
        console.error('Product ID not found in URL');
        return;
    }

    // Gọi API để lấy dữ liệu sản phẩm theo ID
    fetch(`https://furni1.transtechvietnam.com/search/${productId}`) // Thay đổi đường dẫn fetch API
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Fetch response received');
            return response.json();
        })
        .then(product => {
            console.log('Product:', product); // Log sản phẩm tìm thấy hoặc undefined

            if (product) {
                console.log('Product found:', product);
                addThumbnails([product]); // Truyền sản phẩm vào hàm addThumbnails
            } else {
                console.error('Product not found');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            handleFetchError(); // Xử lý lỗi khi fetch thất bại
        });
});


// Hàm xử lý lỗi khi fetch dữ liệu không thành công
function handleFetchError() {
    console.warn('Fetch error handling');
}

// Hàm tạo thẻ HTML đầy đủ dựa trên dữ liệu JSON
function addThumbnails(product) {
    if (!product || !product[0].image || !Array.isArray(product[0].image)) {
        console.error('Product data or image array is undefined or not valid');
        return;
    }

    // Lấy thẻ <ul> với id "Slider-Gallery-main-product-info"
    const ul = document.getElementById('Slider-Gallery-main-product-info');
    if (!ul) {
        console.error('Element with id "Slider-Gallery-main-product-info" not found');
        return;
    }

    console.log('Processing product images:', product[0].image);

    // Duyệt qua từng hình ảnh trong mảng "image"
    product[0].image.forEach((imageSrc, index) => {
        // Tạo thẻ <li> với class và id
        const li = document.createElement('li');
        li.id = `Slide-main-product-info-6514378760585449504`; // Sửa thành product[0].id
        li.className = 'product__media-item slider__slide is-active '; // Class chung cho các hình
        li.dataset.mediaId = `main-product-info-6514378760585449504`;

        // Tạo thẻ <product-thumbnail-opener>
        const productThumbnailOpener = document.createElement('product-thumbnail-opener');
        productThumbnailOpener.className = 'product__modal-opener product__modal-opener--image';
        productThumbnailOpener.dataset.modal = '#ProductModal-main-product-info';
        productThumbnailOpener.setAttribute('data-pc-magnifier-type', 'click');

        // Tạo thẻ <span> chứa icon
        const span = document.createElement('span');
        span.className = 'product__media-icon motion-reduce quick-add-hidden';
        span.innerHTML = `
            <svg class="icon icon-zoom" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11.2941" cy="11.2941" r="10.5441" stroke="currentColor" stroke-width="1.5" />
                <path d="M19.0586 19.0588L23.9998 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M8.4707 11.2942H14.1178" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M11.293 14.1177L11.293 8.47062" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
        `;

        // Tạo thẻ <div> chứa hình ảnh sản phẩm
        const div = document.createElement('div');
        div.className = 'product__media media media--transparent global-media-settings';
        div.style.cssText = '--product-image-ratio:100%; --product-mobile-image-ratio:100%;';
        div.dataset.height = '1080';
        div.dataset.width = '1080';

        // Tạo thẻ <img> cho hình ảnh sản phẩm
        const img = document.createElement('img');
        img.src = imageSrc; // Sử dụng ảnh từ mảng product.image
        img.srcset = `
        ${imageSrc} 246w, 
        ${imageSrc} 493w, 
        ${imageSrc} 600w, 
        ${imageSrc} 713w, 
        ${imageSrc} 823w, 
        ${imageSrc} 990w, 
        ${imageSrc} 1080w
        `;
        img.alt = product[0].alt || 'Product Image';
        img.width = 1080;
        img.height = 1080;
        img.sizes = '(min-width: 1600px) 825px, (min-width: 990px) calc(55vw - 100px), calc(100vw / 1 - 40px)';
        img.fetchpriority = 'high';
        img.decoding = 'async';
        img.dataset.scale = 'hover-scale';
        img.loading = 'lazy';
        img.setAttribute('style', '--product-image-fill-type: contain; --product-mobile-image-fill-type: contain;');
        img.className = 'product__media-image';

        // Thêm ảnh vào thẻ <div>
        div.appendChild(img);

        // Tạo thẻ <button> với class và type
        const button = document.createElement('button');
        button.className = 'product__media-toggle quick-add-hidden';
        button.type = 'button';
        button.setAttribute('data-product-id', '6514378760585449504');

        // Thêm các phần tử đã tạo vào thẻ <product-thumbnail-opener>
        productThumbnailOpener.appendChild(span);
        productThumbnailOpener.appendChild(div);
        productThumbnailOpener.appendChild(button);

        // Thêm <product-thumbnail-opener> vào <li>
        li.appendChild(productThumbnailOpener);

        // Thêm <li> vào <ul>
        ul.appendChild(li);
    });


    const ulbutton = document.getElementById('Slider-Thumbnails-main-product-info');
    if (!ulbutton) {
        console.error('Element with id "Slider-Thumbnails-main-product-info" not found');
        return;
    }


    product[0].image.forEach((imagebuttonSrc, index) => {

        const li = document.createElement('li');
        li.id = `Slide-Thumbnails-main-product-info-1`;
        li.className = 'thumbnail-list__item slider__slide is-active ';
        li.setAttribute('data-target', 'main-product-info-6514378760585449504');


        const buttonAction = document.createElement('button');
        buttonAction.className = 'thumbnail thumbnail--wide';
        buttonAction.id = 'thumbnail-1';
        buttonAction.setAttribute('data-current', 'true');

        // Tạo thẻ <img> cho hình ảnh sản phẩm
        const img = document.createElement('img');
        img.src = imagebuttonSrc; // Sử dụng ảnh từ mảng product.image
        img.srcset = `
        ${imagebuttonSrc} 54w, 
        ${imagebuttonSrc} 74w, 
        ${imagebuttonSrc} 104w, 
        ${imagebuttonSrc} 162w, 
        ${imagebuttonSrc} 208w, 
        ${imagebuttonSrc} 324w, 
        ${imagebuttonSrc} 416w
        `;
        img.alt = product[0].alt || 'Product Image';
        img.width = 416;
        img.height = 416;
        img.sizes = '(min-width: 1600px) calc((825 - 40px) / 4), (min-width: 990px) calc((55vw - 40px) / 4), (min-width: 750px) calc((100vw - 150px) / 8), calc((100vw - 80px) / 3)';
        img.id = 'Thumbnail-main-product-info-1';

        buttonAction.appendChild(img);

        li.appendChild(buttonAction);

        ulbutton.appendChild(li);
    });


    const h1Nameproduct = document.getElementById('name-product')
    h1Nameproduct.innerHTML = product[0].name;

    const pPriceproduct = document.getElementById('price-product')
    pPriceproduct.innerHTML = '$' + product[0].price + ' USD';

    const pDescriptionproduct = document.getElementById('size-product')
    pDescriptionproduct.innerHTML = 'Dimension:' + ' ' + product[0].dimension;

}