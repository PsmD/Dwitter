import React, { useState, useEffect } from "react";
import { dbService } from "fbase";

const Home = () => {
  const [dweet, setDweet] = useState("");
  const [dweets, setDweets] = useState([]);
  const getDweets = async () => {
    const dbDweets = await dbService.collection("dweets").get();
    dbDweets.forEach((document) => {
      const dweetObject = {
        ...document.data(),
        id: document.id,
      };
      setDweets((prev) => [dweetObject, ...prev]);
    });
  };
  useEffect(() => {
    getDweets();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("dweets").add({
      dweet,
      createdAt: Date.now(),
    });
    setDweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setDweet(value);
  };
  console.log(dweets);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={dweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Dweet" />
      </form>
      <div>
        {dweets.map((dweet) => (
          <div key={dweet.id}>
            <h4>{dweet.dweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;