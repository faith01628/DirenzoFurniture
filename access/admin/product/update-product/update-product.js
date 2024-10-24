// document.addEventListener('DOMContentLoaded', async function () {
//     const mainContent = document.querySelector('.main-content');
//     const productId = new URLSearchParams(window.location.search).get('id');

//     // Fetch product details
//     async function fetchProductDetails(id) {
//         try {
//             const response = await fetch(`https://furni1.transtechvietnam.com/search/${id}`);
//             const data = await response.json();
//             return data;
//         } catch (error) {
//             console.error('Error fetching product details:', error);
//         }
//     }

//     // Fetch thumbnails for description dropdown
//     async function fetchThumbnails() {
//         try {
//             const response = await fetch(`https://furni1.transtechvietnam.com/thumbnail`);
//             const data = await response.json();
//             return data;
//         } catch (error) {
//             console.error('Error fetching thumbnails:', error);
//         }
//     }

//     // Upload image to server and return image URL
//     async function uploadImage(file) {
//         const formData = new FormData();
//         formData.append('image', file);
//         formData.append('productId', productId); // Gửi productId trong body

//         try {
//             const response = await fetch(`https://furni1.transtechvietnam.com/thumbnail/`, {
//                 method: 'POST',
//                 body: formData,
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 return data.imageUrl; // URL của ảnh sau khi upload
//             } else {
//                 console.error('Failed to upload image.');
//             }
//         } catch (error) {
//             console.error('Error uploading image:', error);
//         }
//     }

//     // Render update form with dynamic description options
//     async function renderUpdateForm(product) {
//         const { name, price, desc, material, dimension, image } = product;

//         // Fetch thumbnail options
//         const thumbnails = await fetchThumbnails();

//         // Create the options for the select dropdown
//         const descOptions = thumbnails.map(thumbnail => `
//             <option value="${thumbnail.name}" ${desc === thumbnail.name ? 'selected' : ''}>${thumbnail.name}</option>
//         `).join('');

//         const formHTML = `
//             <form id="update-product-form">
//                 <h2>Update Product</h2>

//                 <label for="name">Name:</label>
//                 <input type="text" id="name" name="name" value="${name}" required />

//                 <label for="price">Price:</label>
//                 <input type="text" id="price" name="price" value="${price}" />

//                 <label for="desc">Description:</label>
//                 <select id="desc" name="desc">
//                     ${descOptions}
//                 </select>

//                 <label for="material">Material:</label>
//                 <input type="text" id="material" name="material" value="${material}" />

//                 <label for="dimension">Dimension:</label>
//                 <input type="text" id="dimension" name="dimension" value="${dimension}" />

//                 <h3>Product Images</h3>
//                 <div id="image-list">
//                     ${image.map((img, index) => `
//                         <div class="image-item">
//                             <img src="${img}" alt="Product Image ${index + 1}" width="100" />
//                             <input type="text" name="images[]" value="${img}" readonly />
//                             <button type="button" class="remove-image-btn">Remove</button>
//                         </div>
//                     `).join('')}
//                 </div>

//                 <button type="button" id="add-image-btn">Add New Image</button>

//                 <button type="submit">Update Product</button>
//             </form>
//         `;

//         mainContent.innerHTML = formHTML;

//         // Event listeners for removing images
//         document.querySelectorAll('.remove-image-btn').forEach(button => {
//             button.addEventListener('click', (event) => {
//                 event.target.closest('.image-item').remove();
//             });
//         });

//         // Event listener to add new image fields
//         document.getElementById('add-image-btn').addEventListener('click', () => {
//             const newImageField = `
//                 <div class="image-item">
//                     <input type="file" class="new-image-input" accept="image/*" />
//                     <button type="button" class="remove-image-btn">Remove</button>
//                 </div>
//             `;
//             document.getElementById('image-list').insertAdjacentHTML('beforeend', newImageField);

//             // Add remove functionality for the new field
//             document.querySelectorAll('.remove-image-btn').forEach(button => {
//                 button.addEventListener('click', (event) => {
//                     event.target.closest('.image-item').remove();
//                 });
//             });

//             // Upload image when file is selected
//             document.querySelectorAll('.new-image-input').forEach(input => {
//                 input.addEventListener('change', async (event) => {
//                     const file = event.target.files[0];
//                     if (file) {
//                         const imageUrl = await uploadImage(file);
//                         if (imageUrl) {
//                             // Replace file input with image URL input
//                             const imageItem = event.target.closest('.image-item');
//                             imageItem.innerHTML = `
//                                 <img src="${imageUrl}" alt="Uploaded Image" width="100" />
//                                 <input type="text" name="images[]" value="${imageUrl}" readonly />
//                                 <button type="button" class="remove-image-btn">Remove</button>
//                             `;
//                         }
//                     }
//                 });
//             });
//         });

//         // Event listener for form submission
//         document.getElementById('update-product-form').addEventListener('submit', async (event) => {
//             event.preventDefault();

//             // Collect form data
//             const formData = new FormData(event.target);
//             const updatedProduct = {
//                 name: formData.get('name'),
//                 price: formData.get('price'),
//                 desc: formData.get('desc'),
//                 material: formData.get('material'),
//                 dimension: formData.get('dimension'),
//                 imagesToCreate: [],
//                 imagesToUpdate: [],
//                 imagesToDelete: []
//             };

//             // Collect existing images
//             const currentImages = document.querySelectorAll('.image-item input[name="images[]"]');
//             currentImages.forEach((input) => {
//                 updatedProduct.imagesToUpdate.push({ id: input.dataset.id, image: input.value });
//             });

//             // Collect newly added images
//             const newImages = document.querySelectorAll('.new-image-input');
//             for (let imageInput of newImages) {
//                 const file = imageInput.files[0];
//                 if (file) {
//                     const imageUrl = await uploadImage(file); // Function to upload image and get URL
//                     if (imageUrl) {
//                         updatedProduct.imagesToCreate.push(imageUrl);
//                     }
//                 }
//             }

//             // Collect deleted images
//             const deletedImages = document.querySelectorAll('.deleted-image');
//             deletedImages.forEach((input) => {
//                 updatedProduct.imagesToDelete.push(input.value);
//             });

//             try {
//                 // Send update request to backend
//                 const response = await fetch(`https://furni1.transtechvietnam.com/updateProduct/${productId}`, {
//                     method: 'PUT',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(updatedProduct),  // Send product data and images to the backend
//                 });

//                 if (response.ok) {
//                     alert('Product updated successfully!');
//                     window.location.href = '/homeAdmin';
//                 } else {
//                     console.error('Failed to update product.');
//                 }
//             } catch (error) {
//                 console.error('Error updating product:', error);
//             }
//         });

//     }

//     // Fetch product details and render form
//     const productData = await fetchProductDetails(productId);
//     renderUpdateForm(productData);
// });


document.addEventListener('DOMContentLoaded', async function () {
    const mainContent = document.querySelector('.main-content');
    const productId = new URLSearchParams(window.location.search).get('id');

    // Fetch product details
    async function fetchProductDetails(id) {
        try {
            const response = await fetch(`https://furni1.transtechvietnam.com/search/${id}`);
            if (!response.ok) throw new Error('Failed to fetch product details');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching product details:', error);
            alert('Error fetching product details: ' + error.message);
        }
    }

    // Fetch thumbnails for description dropdown
    async function fetchThumbnails() {
        try {
            const response = await fetch(`https://furni1.transtechvietnam.com/thumbnail`);
            if (!response.ok) throw new Error('Failed to fetch thumbnails');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching thumbnails:', error);
            alert('Error fetching thumbnails: ' + error.message);
        }
    }

    // Render update form with dynamic description options
    async function renderUpdateForm(product) {
        if (!product) {
            alert('No product data available');
            return;
        }

        const { name, price, desc, material, dimension, image = [] } = product;

        // Fetch thumbnail options
        const thumbnails = await fetchThumbnails();

        // Create the options for the select dropdown
        const descOptions = thumbnails.map(thumbnail => `
            <option value="${thumbnail.name}" ${desc === thumbnail.name ? 'selected' : ''}>${thumbnail.name}</option>
        `).join('');

        const formHTML = `
            <form id="update-product-form">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" value="${name}" required />

                <label for="price">Price:</label>
                <input type="text" id="price" name="price" value="${price}" />

                <label for="desc">Description:</label>
                <select id="desc" name="desc">
                    ${descOptions}
                </select>

                <label for="material">Material:</label>
                <input type="text" id="material" name="material" value="${material}" />

                <label for="dimension">Dimension:</label>
                <input type="text" id="dimension" name="dimension" value="${dimension}" />
                <div id="image-list">
                    ${image.length > 0 ? image.map((img, index) => `
                        <div class="image-item">
                            <img src="${img}" alt="Product Image ${index + 1}" width="100" />
                            <input type="text" name="images[]" value="${img}" readonly />
                            <button class="btn-remove-image" type="button" >Remove</button>
                        </div>
                    `).join('') : '<p>No images available</p>'}
                </div>

                <button class="btn-add-image" type="button" id="add-image-btn">Add New Image</button>
                <button class="btn-update" type="submit">Update Product</button>
                <button class="btn-delete" type="button" id="delete-product-btn">Delete Product</button>
            </form>
        `;

        mainContent.innerHTML = formHTML;

        // Add event listeners for the dynamically added remove buttons
        document.querySelectorAll('.btn-remove-image').forEach(button => {
            button.addEventListener('click', (event) => {
                event.target.closest('.image-item').remove();
            });
        });

        // Add event listener for adding new images
        document.getElementById('add-image-btn').addEventListener('click', () => {
            const newImageField = `
                <div class="image-item">
                    <img src="${img}" alt="Product Image ${index + 1}" width="100" />
                    <input type="text" name="images[]" value="${img}" readonly />
                    <button class="btn-remove-image" type="button" >Remove</button>
                </div>
            `;
            document.getElementById('image-list').insertAdjacentHTML('beforeend', newImageField);

            // Add remove functionality for the new field
            addRemoveImageListener();
        });

        // Event listener for form submission
        document.getElementById('update-product-form').addEventListener('submit', async (event) => {
            event.preventDefault();

            // Collect form data
            const formData = new FormData(event.target);
            const updatedProduct = {
                name: formData.get('name'),
                price: formData.get('price'),
                desc: formData.get('desc'),
                material: formData.get('material'),
                dimension: formData.get('dimension'),
                imagesToCreate: [],
                imagesToUpdate: [],
                imagesToDelete: []
            };

            // Collect existing images
            const currentImages = document.querySelectorAll('.image-item input[name="images[]"]');
            currentImages.forEach((input) => {
                updatedProduct.imagesToUpdate.push(input.value);
            });

            // Collect newly added images
            const newImages = document.querySelectorAll('.new-image-input');
            for (let imageInput of newImages) {
                const file = imageInput.files[0];
                if (file) {
                    const imageUrl = await uploadImage(file);
                    if (imageUrl) {
                        updatedProduct.imagesToCreate.push(imageUrl);
                    }
                }
            }

            // Collect deleted images
            const deletedImages = document.querySelectorAll('.deleted-image');
            deletedImages.forEach((input) => {
                updatedProduct.imagesToDelete.push(input.value);
            });

            try {
                // Send update request to backend
                const response = await fetch(`https://furni1.transtechvietnam.com/updateProduct/${productId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedProduct),
                });

                if (response.ok) {
                    alert('Product updated successfully!');
                    window.location.href = '/homeAdmin';
                } else {
                    console.error('Failed to update product.');
                }
            } catch (error) {
                console.error('Error updating product:', error);
            }
        });

        // Add event listener for delete button inside renderUpdateForm
        document.getElementById('delete-product-btn').addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this product?')) {
                deleteProduct(productId);
            }
        });
    }

    // Fetch product details and render form
    const productData = await fetchProductDetails(productId);
    await renderUpdateForm(productData);
});

// Hàm deleteProduct
async function deleteProduct(productId) {
    try {
        const response = await fetch(`https://furni1.transtechvietnam.com/deleteProduct/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            alert('Product deleted successfully!');
            window.location.href = '/homeAdmin';
        } else {
            const errorData = await response.json();
            console.error('Failed to delete product:', errorData);
            alert('Error deleting product: ' + errorData.message);
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product: ' + error.message);
    }
}
