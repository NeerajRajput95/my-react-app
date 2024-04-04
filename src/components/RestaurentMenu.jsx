import { useEffect, useState } from "react";
import Shimmer from "./shimmer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MENU_API } from "../utils/constant";

const RestaurentMenu = () => {
  const [resinfo, setResinfo] = useState(null);
  const { resId } = useParams();

  const fetchMenu = async () => {
    try {
      const response = await axios.get(`https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.507241&lng=77.06404859999999&restaurantId=${resId}`);
      console.log("response", response.data.data);
      setResinfo(response.data.data); // Access response data using response.data
    } catch (error) {
      console.error("Error fetching menu:", error);
      // Handle error
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [resId]); // Add resId to dependency array to refetch menu when resId changes

  if (!resinfo) return <Shimmer />;

  const { cards } = resinfo;
  const restaurantCard = cards.find(card => card.card.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.Restaurant");
  
  if (!restaurantCard) return <Shimmer />;

  const restaurantInfo = restaurantCard.card.card.info;
  const { name, cuisines, costForTwoMessage } = restaurantInfo;
  const itemCards = restaurantCard.card.card.itemCards;

  return (
    <>
      <h2 style={{ color: "blue", fontSize: "24px" }}>{name}</h2>
      <div className="menu" style={{ border: "1px solid gray", padding: "10px" }}>
        <p style={{ fontStyle: "italic" }}>Menu card</p>
        <ul>
          {itemCards && itemCards.map((item, index) => (
            <li key={index}>{item.card.info.name}</li>
          ))}
        </ul>
        <p>Cuisines: {cuisines.join(", ")}</p>
        <p>Cost for two: {costForTwoMessage}</p>
      </div>
    </>
  //    <>
  //    <h2>{resinfo?.cards[0].card.card.info.name}</h2>
  //    <div className="menu">
  //      <p>Menu card</p>
  //      <ul>
  //        {itemCards.map((item) => (
  //          <li>{item.card.info.name}</li>
  //        ))}
  //        <li>{resinfo?.cards[0].card.card.info.name}</li>
  //        <li>
  //          {resinfo?.cards[0].card.card.info.cuisines.join(",")} -{" "}
  //          {resinfo?.cards[0].card.card.info.costForTwoMessage}
  //        </li>
  //        <li>{resinfo?.cards[0].card.card.info.costForTwoMessage}</li>
  //        <li>{itemCards[0].card.info.name}</li>
  //      </ul>
  //    </div>
  //  </>
  );
};

export default RestaurentMenu;
