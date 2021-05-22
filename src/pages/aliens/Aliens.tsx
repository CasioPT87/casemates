import { useState, useEffect } from "react";
import cx from "classnames";
import Alien from "../../components/alien/Alien";
import markPic from "../../assets/images/mark.png";
import daniPic from "../../assets/images/dani.png";
import erniePic from "../../assets/images/ernie.png";
import sergioPic from "../../assets/images/sergio.png";
import background from '../../assets/images/background-2.png';
import { SimpleImageLoader } from "../../assets/javascript/ImageManager";
import styles from "./Aliens.module.css";

const ALIENS: Array<{
  name: string;
  photo: string;
  description: string;
  role: string;
}> = [
  {
    name: "MARKTHULHU",
    photo: 'markPic',
    description:
      "From the deepest of an unknown system. Be careful, bites. You have been warned",
    role: "guitar player",
  },
  {
    name: "DANIERLGH",
    photo: 'daniPic',
    description:
      "Climbs the walls with no effort. Like a gecko... but from Mars",
    role: "bass player",
  },
  {
    name: "ERNIESTURION",
    photo: 'erniePic',
    description:
      "Plays drums faster than the speed of light. And keeps the tempo too",
    role: "drum player",
  },
  {
    name: "SERGIOTRON-3000",
    photo: 'sergioPic',
    description:
      "From Planet-4. Half a high-tech robot, half not such a high-tech one. His voice is out of hearing range for many creature, including himself",
    role: "singer",
  },
];

const calculatePosition = (position: number): number => {
  if (position > 3) return 0;
  if (position < 0) return 3;
  return position;
};

let imageLoader: SimpleImageLoader;

const Aliens = () => {
  const [position, setPosition] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    imageLoader = new SimpleImageLoader([
      { name: 'background', url: background },
      { name: 'markPic', url: markPic },
      { name: 'daniPic', url: daniPic },
      { name: 'erniePic', url: erniePic },
      { name: 'sergioPic', url: sergioPic }
    ], () => setImagesLoaded(true)).loadImages();
  }, []);

  if (!imagesLoaded) return (<div className={cx(styles.wrapper, styles.loading)}><p>loading...</p></div>)

  return (
    <div data-testid="members-container" className={cx(styles.wrapper, styles.background)} style={{ backgroundImage: imageLoader.images.background.src }}>
      <div className={cx(styles.container, styles["position--" + position])}>
        {ALIENS.map((alien) => (
          <Alien key={alien.role} alien={alien} photo={imageLoader.images[alien.photo]} />
        ))}
      </div>
      <div
        className={cx(styles.arrow, styles.forward)}
        onClick={() => setPosition(calculatePosition(position + 1))}
      >
        {">>>"}
      </div>
      <div
        className={cx(styles.arrow, styles.backward)}
        onClick={() => setPosition(calculatePosition(position - 1))}
      >
        {"<<<"}
      </div>
    </div>
  );
};

export default Aliens;
