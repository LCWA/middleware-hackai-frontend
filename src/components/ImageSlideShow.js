import React, { useState, useMemo, useRef, useEffect } from 'react'
import ReactLoading from 'react-loading';
import 'bootstrap/dist/css/bootstrap.min.css';
import TinderCard from 'react-tinder-card'
import './../css/CardReview.css'
import axios from 'axios'

const db = [];
const revDb = [];
let revIndex = 0;

function ImageSlideShow() {
  let swipeDir;
  
  const [isLoading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(revDb.length - 1)
  const [lastDirection, setLastDirection] = useState('')
  const currentIndexRef = useRef(currentIndex)
  const images = [
    'https://images.unsplash.com/photo-1615789591457-74a63395c990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmFieSUyMGNhdHxlbnwwfHwwfHw%3D&w=1000&q=80',
    'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554__480.jpg',
    'https://images.unsplash.com/photo-1583083527882-4bee9aba2eea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80',
    'https://i.pinimg.com/originals/7e/0a/50/7e0a507de8cf8b46e0f2665f1058ef37.jpg'
  ];

  useEffect(() => {
    // getImages();
    // OR
    getRandom();
  }, []);

  const getImages = () => {
    for (let i in images) {
      db.push({ name: `img_${i}`, url: images[i] });
    }
    for (let tempUrl of Array.from(db).reverse()) {
      revDb.push(tempUrl);
    }
    setLoading(false);

  }

  const getRandom = () => {
    const randomNumber = Math.floor(Math.random() * 10) + 10; // Between 10 and 20

    axios.get(`https://api.pexels.com/v1/search?query=cat&per_page=${randomNumber}`, {
      headers: { "Authorization": "563492ad6f91700001000001992684dff806482995da956a82ac603c" }
    })
      .then((res) => {
        for (var i in res.data.photos) {
          db.push({ name: `img_${i}`, url: res.data.photos[i].src.original });
        }
        for (let tempUrl of Array.from(db).reverse()) {
          revDb.push(tempUrl);
        }
        setLoading(false);
      })
  }


  const Loading = ({ type, color }) => (
    <ReactLoading type={'bars'} color={'#ffffff'} height={667} width={375} />
  );

  const childRefs = useMemo(
    () =>
      Array(revDb.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  // set last direction and decrease current index
  const swiped = async (direction, nameToDelete, index) => {
    if (direction === "right") {
      swipeDir = ("Yey, we are glad you liked it.");
    }
    setLastDirection(direction);
    revIndex = revIndex + 1;

    if (revIndex >= db.length) {
      window.location.reload(false);
    }
  }

  if (isLoading) {
    return (<Loading />)
  }

  return (

    <div className="fullC">
      <link
        href='https://fonts.googleapis.com/css?family=Damion&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
        rel='stylesheet'
      />
      <h1>Your image based on Cats</h1>
      <div className="row">
        <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/285/cross-mark_274c.png" height="220px" className="directionF" />
        <div className='cardContainer'>
          {revDb.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              className='swipe'
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name, index)}
            >
              <div>
                <img className='card' src={character.url} />
              </div>
            </TinderCard>
          ))}
        </div>
        <img src="https://emojipedia-us.s3.amazonaws.com/source/skype/289/check-mark_2714-fe0f.png" height="300px" className="directionFN" />
      </div>
      <div className='buttons'>

      </div>

      <h2 className='infoText'>
        {swipeDir}
      </h2>

      <h2 className='infoText'>
        Swipe left if you don't like the image or right if you think it looks awesome!
      </h2>
    </div>
  )
}

export default ImageSlideShow
