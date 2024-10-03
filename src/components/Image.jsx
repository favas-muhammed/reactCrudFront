import { useState, useEffect } from "react";

function Image({ image }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log(image);
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`http://localhost:4000/${data.pictures}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const blob = await response.blob();
        const reader = new FileReader();
        const data = await new Promise((resolve, reject) => {
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(blob);
          reader.onerror = () => {
            reject(reader.error);
          };
        });
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImage();
  }, [image]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <img src={data} alt={image.id} />
      )}
    </div>
  );
}

export default Image;
