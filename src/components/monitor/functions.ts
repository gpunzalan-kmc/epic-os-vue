export function getColorRate(rate: number) {
  const fixed = Math.round(rate);
  if (fixed <= 20) {
    return "#ff603b";
  }
  if (fixed >= 21 && fixed <= 40) {
    return "#fe9a2b";
  }
  if (fixed >= 41 && fixed <= 60) {
    return "#fcc62e";
  }
  if (fixed >= 61 && fixed <= 80) {
    return "#32aae9";
  }
  if (fixed >= 81 && fixed <= 100) {
    return "#6aba97";
  }

  return "#333333";
}

export const shortcuts = [
  {
    text: "Last week",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "Last month",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "Last 3 months",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];

export function getStyleTransforms(event: {
  rotate: number;
  flip: { horizontal: boolean; vertical: boolean };
  scaleX: number;
  scaleY: number;
}) {
  let transform = "";
  transform += ` rotate(${event.rotate}deg) `;
  transform += ` scaleX(${event.scaleX * (event.flip.horizontal ? -1 : 1)}) `;
  transform += ` scaleY(${event.scaleY * (event.flip.vertical ? -1 : 1)}) `;
  return transform;
}

export function rotateSize(
  size: { width: number; height: number },
  angle: number
) {
  const radians = (angle * Math.PI) / 180;
  return {
    width:
      Math.abs(size.width * Math.cos(radians)) +
      Math.abs(size.height * Math.sin(radians)),
    height:
      Math.abs(size.width * Math.sin(radians)) +
      Math.abs(size.height * Math.cos(radians)),
  };
}
