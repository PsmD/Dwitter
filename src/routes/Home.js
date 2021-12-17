import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Dweet from "components/Dweet";

const Home = ({userObj}) => {
  const [dweet, setDweet] = useState("");
  const [dweets, setDweets] = useState([]);
  useEffect(() => {
    dbService.collection("dweets").onSnapshot((snapshot) => {
      const dweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDweets(dweetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("dweets").add({
      text: dweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setDweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setDweet(value);
  };
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
          <Dweet
          key={dweet.id}
          dweetObj={dweet}
          isOwner={dweet.creatorId === userObj.uid}
        />
      ))}
    </div>
  </div>
);
};
export default Home;