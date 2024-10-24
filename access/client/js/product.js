document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    // Gọi API để lấy dữ liệu từ https://furni1.transtechvietnam.com/thumbnail
    fetch('https://furni1.transtechvietnam.com/thumbnail', {
        method: 'GET', // Phương thức GET để lấy dữ liệu
        headers: {
            'Content-Type': 'application/json', // Đảm bảo định dạng dữ liệu trả về là JSON
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            addProductToList(data); // Gọi hàm addProductToList với dữ liệu trả về
        })
        .catch(error => {
            console.error('Error:', error);
            handleFetchError(); // Gọi hàm xử lý lỗi nếu xảy ra lỗi
        });
});


function handleFetchError() {
    console.warn('Fetch error handling');
}

function addProductToList(products) {

    if (!Array.isArray(products)) {
        console.error('Expected an array but got:', products);
        return;
    }

    const div = document.getElementById('main-list-collections__container');
    if (!div) {
        console.error('Element with id main-list-collections__container not found');
        return;
    }

    products.forEach(product => {
        const collection_item = document.createElement('div');
        collection_item.className = 'collection-item col shopline-element-collection-item card-shadow-pb';
        div.appendChild(collection_item);

        const card = document.createElement('a');
        card.className = 'card collection-card-wrapper card-wrapper hover-effect-container collection-card-style-normal';
        card.href = `./product-item?product=${product.name}` // Adjust as per product details if needed
        card.style = "--card-image-padding: 0px; --color-card-background: 90, 90, 90; --color-card-text: 255, 255, 255;";
        collection_item.appendChild(card);

        const divCollection = document.createElement('div');
        card.appendChild(divCollection);

        const card__inner = document.createElement('div');
        card__inner.className = 'card__inner--wrapper global-collection-card-border-shadow';
        divCollection.appendChild(card__inner);

        const card__inner__ratio = document.createElement('div');
        card__inner__ratio.className = 'card__inner ratio collection__item__image';
        card__inner__ratio.style = "--ratio-percent: 100%; --image-fill-type: cover;";
        card__inner.appendChild(card__inner__ratio);

        const card__media = document.createElement('div');
        card__media.className = 'card__media';
        card__inner__ratio.appendChild(card__media);

        const imgMain = document.createElement('img');
        imgMain.src = product.image;
        imgMain.srcset = `
            ${product.image} 375w, 
            ${product.image} 540w, 
            ${product.image} 720w, 
            ${product.image} 900w, 
            ${product.image} 1080w, 
            ${product.image} 1296w, 
            ${product.image} 1512w, 
            ${product.image} 1728w, 
            ${product.image} 1920w`;
        imgMain.alt = product.name;
        imgMain.width = 1920;
        imgMain.height = 1080;
        imgMain.sizes = "(max-width: 959px) calc(100vw * 1/2),(min-width: 960px) calc(100vw * 1/3)";
        imgMain.setAttribute('fetchpriority', 'high');
        imgMain.setAttribute('decoding', 'async');
        imgMain.setAttribute('data-scale', 'hover-scale');
        imgMain.setAttribute('loading', 'eager');
        imgMain.className = 'hover-effect-target';
        card__media.appendChild(imgMain);

        const collection__item__name = document.createElement('div');
        collection__item__name.className = 'body3 collection__item__name card__content text-center';
        collection__item__name.innerText = product.name;
        divCollection.appendChild(collection__item__name);
    });
}