import { useState } from "react";

function Image({ image, handleDelete }) {
  const [isHover, setIsHover] = useState(false);

  const handleMouseOver = () => {
    setIsHover(true);
  };

  const handleMouseOut = () => {
    setIsHover(false);
  };

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className="image-container"
    >
      <img src={image.image} alt={image.id} />
      {isHover && (
        <div className="image-options">
          <button
            className="image-option delete-option"
            onClick={() => handleDelete(image.id)}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
          <button className="image-option edit-option">
            <i className="fas fa-edit"></i>
          </button>
          <button className="image-option view-option">
            <i className="fas fa-eye"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default Image;
