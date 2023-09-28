import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const DisplayTypes = ({ arrayOfProducts, setShownProducts }) => {
  const categories = arrayOfProducts.map((product) => product.category);
  const categoriesWithoutDoubles = [...new Set(categories).add("all Products")];
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const handleSearch = (e, i) => {
    const targetCategory = categories[i];
    const searchParamsString = searchParams.toString();

    const extractingVal = searchParamsString.split("=")[1];
    console.log(searchParamsString, extractingVal === "all+Products");
    const filteredProducts = arrayOfProducts.filter(
      ({ category }) => category === targetCategory
    );
    const newArrayProducts =
      extractingVal === "all+Products" ? arrayOfProducts : filteredProducts;
    setShownProducts(newArrayProducts);
  };

  const DisplayCategory = categoriesWithoutDoubles.map((category, key) => {
    return (
      <Link
        // style={{ paddingLeft: "5px", overflow: "visible" }}
        href={{
          pathname: pathName,
          query: { category },
        }}
        onClick={(e) => handleSearch(e, key)}
        key={key}
      >
        {category}
      </Link>
    );
  });
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {DisplayCategory}
    </div>
  );
};

export default DisplayTypes;
