"use client";

import { useAvatarStore } from "@/store/avatarStore";

export default function AvatarRenderer() {
  const {
    skin,
    hair,
    hairColor,
    clothes,
    clothesColor,
    accessories,
    faceParts,
  } = useAvatarStore();

  const layers: string[] = [];

  // Skin
  layers.push(`/avatar/skin/${skin}.svg`);
  // Face parts
  layers.push(`/avatar/face/01-eyes/${faceParts.eyes.color}.svg`);
  layers.push(`/avatar/face/02-mouth/${faceParts.mouth.style}.svg`);
  layers.push(`/avatar/face/03-nose/${faceParts.nose.style}.svg`);
  layers.push(
    `/avatar/face/04-eyebrows/${faceParts.eyebrows.color}/${faceParts.eyebrows.style}.svg`
  );

  // Hair
  layers.push(`/avatar/hair/${hairColor}/${hair}.svg`);

  // Clothes
  layers.push(`/avatar/clothes/${clothes}/${clothesColor}.svg`);

  // Accessories
  accessories.forEach((item) => {
    const [type, styleOrColor, maybeColor] = item.split("_");
    let path = "";

    switch (type) {
      case "glasses":
        path = `/avatar/accessories/01-glasses/${styleOrColor}/${maybeColor}.svg`;
        break;
      case "bow":
        path = `/avatar/accessories/02-bow/${styleOrColor}/${maybeColor}.svg`;
        break;
      case "hijab":
        path = `/avatar/accessories/03-hijab/${styleOrColor}.svg`;
        break;
    }

    layers.push(path);
  });

  return (
    <div className="relative w-32 h-32 mx-auto">
      {layers.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`layer-${index}`}
          className="absolute top-0 left-0 w-full h-full object-contain"
        />
      ))}
    </div>
  );
}
