import React from "react";
import { handleDeletePicture } from "../../src/app/handlers/handleDeletePictures";

const DisplayProducts = ({ resource, baseSrc, dispatch, arrayOfPictures }) => {
  const displayPictures = arrayOfPictures?.map((pic, index) => {
    const src = baseSrc.concat("", pic.id).concat(".", pic.fileType);
    return (
      <div key={index}>
        <img src={src} loading="lazy" alt="hallo welt" width={90} height={60} />
        <p>{pic.name}</p>
        <p>{pic.category}</p>
        <p>{pic.description}</p>
        <p>{pic.id}</p>
        <p>{pic.price}</p>
        {resource === "admin" && (
          <button
            onClick={(e) =>
              handleDeletePicture(e, index, dispatch, arrayOfPictures)
            }
          >
            X
          </button>
        )}
      </div>
    );
  });
  return <div>{displayPictures}</div>;
};

export default DisplayProducts;
