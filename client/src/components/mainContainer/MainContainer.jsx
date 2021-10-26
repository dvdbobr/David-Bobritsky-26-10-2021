import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./mainContainer.css";
export default function MainContainer() {
  const [liked, setLiked] = useState(false);
  const changeLike = () => {
    setLiked(!liked);
  };
  return (
    <div className="mainContainer">
      <div className="mainContainerTopRow">
        <div className="degrees">
          <h2>Tel Aviv</h2>
          <span>23C&deg;</span>
        </div>
        <div className="likeBtn">
          {liked ? (
            <IconButton
              aria-label="FavoriteBorderIcon"
              color="error"
              onClick={changeLike}
            >
              <FavoriteIcon style={{ fontSize: 42 }} />
            </IconButton>
          ) : (
            <IconButton
              aria-label="FavoriteBorderIcon"
              color="error"
              onClick={changeLike}
            >
              <FavoriteBorderIcon style={{ fontSize: 42 }} />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
}
