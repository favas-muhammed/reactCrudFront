import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MainApp() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [newImage, setNewImage] = useState({ id: "", url: "" });
  const [showForm, setShowForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleUpdate = (image) => {
    setSelectedImage(image);
    setShowForm(true);
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/pictures/${selectedImage.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newImage),
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      setImages(
        images.map((image) =>
          image.id === selectedImage.id ? { ...image, ...newImage } : image
        )
      );
      setShowForm(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const imagesElement = images.map((image) => (
    <div key={image.id}>
      <button className="delete-button" onClick={() => handleDelete(image.id)}>
        <i className="fas fa-trash-alt"></i>
      </button>
      <button className="update-button" onClick={() => handleUpdate(image)}>
        <i className="fas fa-edit"></i>
      </button>
      <img
        src={image.url}
        alt={image.id}
        onLoad={(e) => console.log("Image loaded:", e.target.src)}
        onClick={() => {
          const enlargedImage = document.getElementById("enlargedImage");
          enlargedImage.style.display = "block";
          const enlargedImageSrc = document.getElementById("enlargedImageSrc");
          enlargedImageSrc.src = image.url;
          const closeButton = document.getElementById("closeButton");
          closeButton.addEventListener("click", () => {
            enlargedImage.style.display = "none";
          });
        }}
      />
    </div>
  ));

  const updateForm = (
    <form onSubmit={handleUpdateSubmit}>
      <div className="form-group">
        <label>ID:</label>
        <input
          type="text"
          name="id"
          value={newImage.id}
          onChange={(e) => setNewImage({ ...newImage, id: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>URL:</label>
        <input
          type="text"
          name="url"
          value={newImage.url}
          onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
        />
      </div>
      <button type="submit">Update</button>
    </form>
  );

  return (
    <div className="MainApp">
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="image-grid">{imagesElement}</div>
      )}
      {showForm && (
        <div className="update-form">
          <h2>Update Image</h2>
          {updateForm}
        </div>
      )}
    </div>
  );
}

export default MainApp;
