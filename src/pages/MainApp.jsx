import { useState, useEffect } from "react";

function MainApp() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:4000/pictures");
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        console.log(data);
        setImages(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchImages();
  }, []);

  const imagesElement = images.map((image) => (
    <div key={image.id}>
      <img
        src={image.image}
        alt={image.id}
        onLoad={(e) => console.log("Image loaded:", e.target.src)}
        onClick={() => {
          const enlargedImage = document.getElementById("enlargedImage");
          enlargedImage.style.display = "block";
          const enlargedImageSrc = document.getElementById("enlargedImageSrc");
          enlargedImageSrc.src = image.image;
          const closeButton = document.getElementById("closeButton");
          closeButton.addEventListener("click", () => {
            enlargedImage.style.display = "none";
          });
        }}
      />
    </div>
  ));

  return (
    <div className="MainApp">
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="image-grid">{imagesElement}</div>
      )}
    </div>
  );
}

export default MainApp;
