document.addEventListener('DOMContentLoaded', async function () {
    const mainContent = document.querySelector('.main-content');
    const thumbnailId = new URLSearchParams(window.location.search).get('id');

    if (!thumbnailId) {
        mainContent.innerHTML = '<p>Error: No thumbnail ID provided.</p>';
        return;
    }

    // Fetch existing thumbnail data
    try {
        const response = await fetch(`https://furni1.transtechvietnam.com/thumbnail/${thumbnailId}`);
        const thumbnail = await response.json();

        if (!thumbnail) {
            mainContent.innerHTML = '<p>Thumbnail not found.</p>';
            return;
        }

        // Dynamically generate form HTML for the thumbnail update
        mainContent.innerHTML = `
            <form id="updateThumbnailForm">
                <label for="name">Thumbnail Name:</label>
                <input type="text" id="name" name="name" value="${thumbnail.name}" required>
                
                <div id="image-container">
                    <img src="${thumbnail.image}" alt="Current Image" class="thumbnail-preview">
                </div>
                <button class="btn-update-image" type="button" id="updateImageButton">Change Image</button>

                <button  class="btn-update" type="submit">Update Thumbnail</button>
                <button  class="btn-delete" type="button" id="deleteThumbnailButton">Delete Thumbnail</button>
            </form>
        `;

        let selectedImage = null;

        // Handle image change
        const updateImageButton = document.getElementById('updateImageButton');
        updateImageButton.addEventListener('click', function () {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';

            fileInput.addEventListener('change', function () {
                const file = fileInput.files[0];
                if (file) {
                    selectedImage = file;
                    const imageContainer = document.getElementById('image-container');
                    imageContainer.innerHTML = ''; // Clear current image
                    const img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    img.classList.add('thumbnail-preview');
                    imageContainer.appendChild(img);
                }
            });

            fileInput.click();
        });

        // Handle form submission for updating the thumbnail
        const form = document.getElementById('updateThumbnailForm');
        form.addEventListener('submit', async function (event) {
            event.preventDefault();

            const formData = new FormData();
            formData.append('name', document.getElementById('name').value);

            if (selectedImage) {
                formData.append('image', selectedImage);
            }

            try {
                const response = await fetch(`https://furni1.transtechvietnam.com/thumbnail/${thumbnailId}`, {
                    method: 'PUT',
                    body: formData
                });

                if (response.ok) {
                    alert('Thumbnail updated successfully!');
                } else {
                    alert('Error updating thumbnail.');
                }
            } catch (error) {
                console.error('Error updating thumbnail:', error);
            }
        });

        // Handle thumbnail deletion
        const deleteThumbnailButton = document.getElementById('deleteThumbnailButton');
        deleteThumbnailButton.addEventListener('click', async function () {
            if (confirm('Are you sure you want to delete this thumbnail?')) {
                try {
                    const response = await fetch(`https://furni1.transtechvietnam.com/thumbnail/${thumbnailId}`, {
                        method: 'DELETE'
                    });

                    if (response.ok) {
                        alert('Thumbnail deleted successfully!');
                        window.location.href = '/getDesc'; // Redirect after deletion
                    } else {
                        alert('Error deleting thumbnail.');
                    }
                } catch (error) {
                    console.error('Error deleting thumbnail:', error);
                }
            }
        });

    } catch (error) {
        mainContent.innerHTML = `<p>Error fetching thumbnail data: ${error.message}</p>`;
    }
});
