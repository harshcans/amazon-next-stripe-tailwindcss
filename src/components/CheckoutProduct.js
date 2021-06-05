import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";
import { StarIcon } from '@heroicons/react/solid';

function CheckoutProduct({
  id,
  title,
  price,
  rating,
  description,
  category,
  image,
}) {
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
    };

    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />
      
      {/* Middle layer*/}
      <div className="col-span-3 mx-5">
        <p className="font-bold">{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="line-clamp-3 my-2 text-xs text-gray-600">{description}</p>
        {/* <CurrencyFormat
          value={price}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
          className="font-bold text-xl"
        /> */}
      </div>

      {/* 3rd layer*/}
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button">Add to Basket</button>
        <button onClick={() => removeItemFromBasket()} className="button">
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
