import { useLayoutEffect, useRef, useState } from "react";
import Space from "./../../components/space/Space";
import Cloud from "./../../components/space/classes/cloud/Cloud";
import { Spaceship } from '../../components/space/classes/spaceship/Spaceship';
import { Town } from '../../components/space/classes/town/Town';
import { Name } from '../../components/space/classes/name/Name';
import ImageManager from "../../assets/javascript/ImageManager";
import Loading from "../../components/loading/Loading";
import styles from "./Home.module.css";

const Home = () => {
  const elem = useRef<HTMLDivElement>(null!);
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useLayoutEffect(() => {
    new ImageManager([Cloud, Spaceship, Town, Name], () => setImagesLoaded(true)).loadImages();
    setDimensions(elem.current.getBoundingClientRect());
  }, []);

  return (
    <>
      <Loading ref={elem} show={!imagesLoaded} />
      <div data-testid='home-container' className={styles.container}>
        {imagesLoaded &&
          <Space
            frameSize={{ height: dimensions.height, width: dimensions.width }}
          />
        }
      </div>
    </>
  );
};

export default Home;
