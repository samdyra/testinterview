import React from "react";
import "./tweetStyle.css";
import UseDeleteDataWithImage from "../../hooks/UseDeleteData";

const Tweet = ({ item }) => {

  return (
    <div className="tweet-container">
      <div className="tweet-image-container">
        <div className="tweet-image">
          <img src={item?.image}></img>
        </div>
        <div className="all-tweet-texts-container">
          <div className="tweet-id-content-container">
            <div className="tweet-id-container">
              <h1>{item?.nama}</h1>
              <h4>{item?.namaTempat}</h4>
              <UseDeleteDataWithImage id={item?.id} image={item?.image} type={"track"}/>
              {/* <p>{data.temp}</p> */}
            </div>
            <div className="tweet-tweet-container">
              {/* <h1>{`${celcius} C°`}</h1> */}
              <p>{item?.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
