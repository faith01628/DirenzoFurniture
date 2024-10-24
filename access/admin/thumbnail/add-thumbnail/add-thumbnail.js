document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("addProductForm");
    const imageContainer = document.getElementById("image-container");
    const addImageButton = document.getElementById("addImageButton");
    let selectedImage = null; // Only one image for thumbnail

    // Add an image and display a preview
    addImageButton.addEventListener("click", function () {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";

        fileInput.addEventListener("change", function () {
            const file = fileInput.files[0];
            if (file) {
                // Replace the selected image
                selectedImage = file;

                // Clear previous image preview if any
                imageContainer.innerHTML = '';

                // Display the new image preview
                const img = document.createElement("img");
                img.src = URL.createObjectURL(file);
                imageContainer.appendChild(img);
            }
        });

        fileInput.click();
    });

    // Handle form submission for thumbnail creation
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const thumbnailName = formData.get("name");

        // Check if the name field is filled
        if (!thumbnailName) {
            alert("Please provide a thumbnail name.");
            return; // Stop form submission if the name is missing
        }

        // Check if an image has been selected
        if (!selectedImage) {
            alert("Please select an image for the thumbnail.");
            return; // Stop form submission if no image is selected
        }

        const thumbnailData = new FormData();
        thumbnailData.append("name", thumbnailName);
        thumbnailData.append("image", selectedImage);

        // Post the new thumbnail to the server
        fetch("https://furni1.transtechvietnam.com/thumbnail", {
            method: "POST",
            body: thumbnailData
        })
            .then(response => response.json())
            .then(result => {
                alert("Thumbnail added successfully!");

                // Reset the form and clear the image preview
                form.reset();
                selectedImage = null;
                imageContainer.innerHTML = ''; // Clear image preview
            })
            .catch(error => console.error("Error adding thumbnail:", error));
    });
});
