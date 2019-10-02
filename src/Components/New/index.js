import React, { useState, useMemo } from "react";

import api from "../../services/api";

import camera from "../../assets/camera.svg";
import "./styles.css";

export default function New({ history }) {
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  //GET A LIVE PREVIEW TO FILE PICKER
  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(event) {
    const data = new FormData();
    data.append("thumbnail", thumbnail);
    data.append("company", company);
    data.append("techs", techs);
    data.append("price", price);

    event.preventDefault();
    await api.post("/spots", data, {
      headers: { user_id: localStorage.getItem("user") }
    });

    history.push("/dashboard");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label
          id="thumbnail"
          style={{ backgroundImage: `url(${preview})` }}
          className={thumbnail ? "has-thumbnail" : ""}
        >
          <input
            type="file"
            onChange={event => setThumbnail(event.target.files[0])}
          />
          <img
            src={camera}
            alt="Select company image"
            className="select-image-camera"
          />
        </label>
        <label for="company">COMPANY *</label>
        <input
          id="company"
          name="company"
          placeholder="Your awesome company"
          value={company}
          onChange={event => setCompany(event.target.value)}
        />
        <label for="techs">
          TECHNOLOGIES * <span>(divided by commas)</span>
        </label>
        <input
          id="techs"
          name="techs"
          placeholder="What technologies do you use?"
          value={techs}
          onChange={event => setTechs(event.target.value)}
        />
        <label for="price">
          DAILY PRICE <span>(empty for FREE)</span>
        </label>
        <input
          id="price"
          name="price"
          placeholder="Price to be charged"
          value={price}
          onChange={event => setPrice(event.target.value)}
        />

        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
