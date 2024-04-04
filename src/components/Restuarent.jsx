import { CDN_URL } from "../utils/constant";

const styleCard = {
  backgroundColor: "LightSeaGreen",
};  

const Restaurant = (props) => {
  console.log("dddddddddd", props)
  const { resData } = props;
  const { name, cloudinaryImageId, avgRating, cuisines } =
    resData?.card?.card?.info ?? {};

  // Ensure cuisines is an array before joining its elements
  const cuisineList = Array.isArray(cuisines) ? cuisines.join(", ") : "";

  return (
    <>
      <div className="res-card" style={styleCard}>
        <img
          className="card-logo"
          src={CDN_URL + resData.cloudinaryImageId}
          alt={name}
        ></img>
        <h3>{resData.name}</h3>
        <h4>{resData.avgRating}</h4>
        <h5>{resData.cuisines.join(",")}</h5>
      </div>
    </>
  );
};

export default Restaurant;
