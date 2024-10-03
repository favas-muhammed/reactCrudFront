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

  return (
    <div className="main-app">
      <h2>Welcome to PotterBoard</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="image-grid">
          {images && images.length > 0 ? (
            images.map((image) => (
              <div key={image.id}>
                <img
                  src={image.image}
                  alt={image.id}
                  onLoad={(e) => console.log("Image loaded:", e.target.src)}
                />
              </div>
            ))
          ) : (
            <p>No images found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MainApp;
