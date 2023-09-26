import React, { useContext } from "react";
import { handleDeletePicture } from "../../src/app/handlers/handleDeletePictures";
import { useRouter } from "next/navigation";
import { Store } from "../../src/app/context/Store";

const DisplayProducts = ({ resource, baseSrc, arrayOfProducts }) => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const displayPictures = arrayOfProducts?.map((pic, index) => {
    const src = baseSrc.concat("", pic.id).concat(".", pic.fileType);

    return (
      <div
        key={index}
        className="lg:w-1/4 md:w-1/2 p-4 w-full"
        onClick={(e) => {
          dispatch({
            type: "SET_CURRENT_PRODUCT",
            payload: [index],
          });
          router.push(`/shop/${arrayOfProducts[index].id}`);
        }}
      >
        <a className="block relative h-48 rounded overflow-hidden">
          <img
            loading="lazy"
            alt="ecommerce"
            className="object-cover object-center w-full h-full block"
            src={src}
          />
        </a>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            {pic.category}
          </h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">
            {pic.name}
          </h2>
          <p className="mt-1">${pic.price}</p>
        </div>

        {resource === "admin" && (
          <button
            onClick={(e) =>
              handleDeletePicture(e, index, dispatch, arrayOfProducts)
            }
          >
            X
          </button>
        )}
      </div>
    );
  });
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">{displayPictures}</div>
      </div>
    </section>
  );
};

export default React.memo(DisplayProducts);
