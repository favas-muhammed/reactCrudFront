import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleDelete = (id) => {
    const newImages = images.filter((image) => image.id !== id);
    setImages(newImages);
  };

  const imagesElement = images.map((image) => (
    <div key={image.id}>
      <button className="delete-button" onClick={() => handleDelete(image.id)}>
        <i className="fas fa-trash-alt"></i>
      </button>
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
      <button className="my-board-button">My Board</button>
      <button
        className="add-button"
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add
      </button>
    </div>
  );
}

export default MainApp;
