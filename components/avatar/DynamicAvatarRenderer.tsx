import { useAvatarStore } from "@/store/avatarStore";
import { motion } from "framer-motion";

type Props = {
  id?: string;
  image?: string;
  animation?: {
    eyes?: "blink";
    mouth?: "talk";
    float?: boolean;
    zoom?: boolean;
  };
  scale?: number;
  rotate?: string;
};

export default function DynamicAvatarRenderer({
  id = "main",
  image,
  animation,
  scale,
  rotate,
}: Props) {
  const { skin, faceParts, hair, hairColor, clothes, clothesColor } =
    useAvatarStore();

  const floatAnimation = animation?.float
    ? {
        animate: { y: [0, -5, 0] },
        transition: { repeat: Infinity, duration: 2 },
      }
    : {};

  const zoomAnimation = animation?.zoom
    ? {
        animate: { scale: [1, 1.1, 1] },
        transition: { repeat: Infinity, duration: 2 },
      }
    : {};

  // If a static image is provided
  if (image) {
    return (
      <motion.div
        className="relative w-92 h-92"
        style={{ transform: `scale(${scale})` }}
        {...floatAnimation}
        {...zoomAnimation}
      >
        <motion.img
          src={image}
          alt={`avatar-${id}`}
          className="absolute top-0 left-0 w-full h-full object-contain"
        />
      </motion.div>
    );
  }

  // Build avatar layers
  const layers = [
    { src: `/avatar/skin/${skin}.svg` },
    {
      src: `/avatar/face/01-eyes/${faceParts.eyes.color}.svg`,
      animate:
        animation?.eyes === "blink" ? { opacity: [1, 0.5, 1] } : undefined,
      transition:
        animation?.eyes === "blink"
          ? { repeat: Infinity, duration: 1.5 }
          : undefined,
    },
    {
      src: `/avatar/face/02-mouth/${faceParts.mouth.style}.svg`,
      animate:
        animation?.mouth === "talk" ? { scaleY: [1, 0.8, 1.2, 1] } : undefined,
      transition:
        animation?.mouth === "talk"
          ? { repeat: Infinity, duration: 0.6 }
          : undefined,
    },
    { src: `/avatar/face/03-nose/${faceParts.nose.style}.svg` },
    {
      src: `/avatar/face/04-eyebrows/${faceParts.eyebrows.color}/${faceParts.eyebrows.style}.svg`,
    },
    { src: `/avatar/hair/${hairColor}/${hair}.svg` },
    { src: `/avatar/clothes/${clothes}/${clothesColor}.svg` },
  ];

  return (
    <motion.div
      className="relative w-32 h-32"
      style={{ transform: `scale(${scale})`, rotate: rotate }}
      {...floatAnimation}
    >
      {layers.map(({ src, animate, transition }, index) => (
        <motion.img
          key={index}
          src={src}
          alt={`layer-${index}`}
          className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
          animate={animate}
          transition={transition}
        />
      ))}
    </motion.div>
  );
}
