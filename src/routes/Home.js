import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Dweet from "components/Dweet";
import DweetFactory from "components/DweetFactory";

const Home = ({userObj}) => {
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
  return (
      <div>
      <DweetFactory userObj={userObj} />
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