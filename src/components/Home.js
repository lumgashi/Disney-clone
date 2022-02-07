import React from "react";
import styled from "styled-components";
import ImageSlider from "./ImageSlider";
import Viewers from "./Viewers";
import Recomands from "./Recomands";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trendings from "./Trendings";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";
import { doc, onSnapshot, collection, query, where, getFirestore} from "firebase/firestore";


const Home = (props) => {
      const dispatch = useDispatch();
      const userName = useSelector(selectUserName);
      let recommends = [];
      let newDisneys = [];
      let originals = [];
      let trending = [];

//       // Ensure that "db" is defined and initialized
// const db = getFirestore();
// // console.log(db);

// const colRef = collection(db, "collection_name");

      useEffect(() => {
            const db = getFirestore();
            // const colRef = collection(db, "movies");
            const q = query(collection(db, "movies"))
            const unsub = onSnapshot(q, (querySnapshot) => {
              querySnapshot.docs.map(doc => {
                  console.log(recommends);
                  switch (doc.data().type) {
                    case "recommend":
                      recommends = [...recommends, { id: doc.id, ...doc.data() }];
                      break;
          
                    case "new":
                      newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
                      break;
          
                    case "original":
                      originals = [...originals, { id: doc.id, ...doc.data() }];
                      break;
          
                    case "trending":
                      trending = [...trending, { id: doc.id, ...doc.data() }];
                      break;
                      default:
                            console.log("error???")
                  }
              });
              dispatch(
                  setMovies({
                    recommend: recommends,
                    newDisney: newDisneys,
                    original: originals,
                    trending: trending,
                  })
                );
            });
          }, [userName])


  return (
    <Container>
      <ImageSlider />
      <Viewers />
      <Recomands />
      <NewDisney />
      <Originals />
      <Trendings />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
