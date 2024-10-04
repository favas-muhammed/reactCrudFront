import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MainApp() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [newImage, setNewImage] = useState({ id: "", url: "" });
  const [showForm, setShowForm] = useState(false);

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
        src={`http://localhost:4000/${image.image}`}
        alt={image.id}
        onLoad={(e) => console.log("Image loaded:", e.target.src)}
        onClick={() => {
          const enlargedImage = document.getElementById("enlargedImage");
          enlargedImage.style.display = "block";
          const enlargedImageSrc = document.getElementById("enlargedImageSrc");
          enlargedImageSrc.src = `http://localhost:4000/${image.image}`;
          const closeButton = document.getElementById("closeButton");
          closeButton.addEventListener("click", () => {
            enlargedImage.style.display = "none";
          });
        }}
      />
    </div>
  ));

  const handleAddImage = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/pictures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newImage),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      setImages([...images, newImage]);
      setNewImage({ id: "", url: "" });
      setShowForm(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "url") {
      setNewImage({ ...newImage, [name]: value });
    } else {
      setNewImage({ ...newImage, [name]: value });
    }
  };

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
        onClick={() => setShowForm(true)}
      >
        Add
      </button>
      {showForm && (
        <form onSubmit={handleAddImage}>
          <div className="form-group">
            <label>ID:</label>
            <input
              type="text"
              name="id"
              value={newImage.id}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>URL:</label>
            <input
              type="text"
              name="url"
              value={newImage.url}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Add</button>
        </form>
      )}
    </div>
  );
}

export default MainApp;
