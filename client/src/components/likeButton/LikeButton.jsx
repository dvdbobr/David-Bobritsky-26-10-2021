import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/actions/favoritesActions";

export default function LikeButton() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const currentWeather = useSelector(
    (state) => state.currentWeather.currentWeather
  );
  const [liked, setLiked] = useState(false);
  const changeLike = () => {
    if (!liked) {
      dispatch(addToFavorites(currentWeather));
    } else {
      dispatch(removeFromFavorites(currentWeather.cityKey));
    }
    setLiked(!liked);
  };
  useEffect(() => {
      const fav = favorites.map(f=>{
        return f.cityKey;
      })
      setLiked(fav.includes(currentWeather.cityKey))

    // setLiked(
    //   favorites.filter((c) => c.cityKey === fromStorage.cityKey).length
    // );
  }, [favorites,currentWeather]);
  return (
    <div className="likeBtn">
      {liked ? (
        <IconButton
          aria-label="FavoriteBorderIcon"
          color="error"
          onClick={changeLike}
        >
          <FavoriteIcon style={{ fontSize: 72 }} />
        </IconButton>
      ) : (
        <IconButton
          aria-label="FavoriteBorderIcon"
          color="error"
          onClick={changeLike}
        >
          <FavoriteBorderIcon style={{ fontSize: 72 }} />
        </IconButton>
      )}
    </div>
  );
}
