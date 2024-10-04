const closeButton = document.getElementById("closeButton");
const deleteButton = document.getElementById("deleteButton");
const updateButton = document.getElementById("updateButton");
const enlargedImage = document.getElementById("enlargedImage");
const enlargedImageSrc = document.getElementById("enlargedImageSrc");

// Add event listener to close button
closeButton.addEventListener("click", () => {
  enlargedImage.style.display = "none";
});

// Add event listener to delete button
deleteButton.addEventListener("click", () => {
  // Call API to delete image
  fetch("/api/images/" + enlargedImageSrc.src.split("/").pop(), {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        enlargedImage.style.display = "none";
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

// Add event listener to update button
updateButton.addEventListener("click", () => {
  // Open file input to select new image
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.onchange = (event) => {
    // Get selected image
    const selectedImage = event.target.files[0];
    // Call API to update image
    const formData = new FormData();
    formData.append("image", selectedImage);
    fetch("/api/images/" + enlargedImageSrc.src.split("/").pop(), {
      method: "PUT",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // Update image src
          enlargedImageSrc.src = URL.createObjectURL(selectedImage);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  fileInput.click();
});
