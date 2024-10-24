document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("addProductForm");
    const descSelect = document.getElementById("desc");
    const imageContainer = document.getElementById("image-container");
    const addImageButton = document.getElementById("addImageButton");
    let selectedImages = [];

    // Fetch thumbnails from the API and populate the description dropdown
    fetch("https://furni1.transtechvietnam.com/thumbnail/")
        .then(response => response.json())
        .then(data => {
            data.forEach(thumbnail => {
                const option = document.createElement("option");
                option.value = thumbnail.name;
                option.textContent = thumbnail.name;
                descSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching thumbnails:", error));

    // Add images and display previews
    addImageButton.addEventListener("click", function () {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.multiple = true;

        fileInput.addEventListener("change", function () {
            const files = Array.from(fileInput.files);
            files.forEach(file => {
                selectedImages.push(file);
                const img = document.createElement("img");
                img.src = URL.createObjectURL(file);
                imageContainer.insertBefore(img, addImageButton);
            });
        });

        fileInput.click();
    });

    // Handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const selectedDesc = formData.get("desc");

        // Check if "Select a Desc" option is selected
        if (!selectedDesc) {
            alert("Please select a valid description.");
            return; // Stop the form submission if desc is not selected
        }

        // Check if at least one image has been selected
        if (selectedImages.length === 0) {
            alert("Please select at least one image.");
            return; // Stop form submission if no images are selected
        }

        const productData = {
            name: formData.get("name"),
            price: formData.get("price"),
            material: formData.get("material"),
            dimension: formData.get("dimension"),
            desc: selectedDesc
        };

        // First, create the product
        fetch("https://furni1.transtechvietnam.com/products", {
            method: "POST",
            body: JSON.stringify(productData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(product => {
                const productId = product.id; // Get the newly created product ID

                // Upload each image individually
                selectedImages.forEach(imageFile => {
                    const imageData = new FormData();
                    imageData.append("productid", productId);
                    imageData.append("image", imageFile);

                    fetch("https://furni1.transtechvietnam.com/product_image", {
                        method: "POST",
                        body: imageData
                    })
                        .then(response => response.json())
                        .then(result => {
                            console.log("Image uploaded:", result);
                        })
                        .catch(error => console.error("Error uploading image:", error));
                });

                alert("Product added successfully!");

                // Reset the form but keep the "Add Images" button
                form.reset();
                selectedImages = [];

                // Only remove images, not the button
                const images = imageContainer.querySelectorAll("img");
                images.forEach(img => img.remove());
            })
            .catch(error => console.error("Error adding product:", error));
    });
});
