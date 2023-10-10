export const isMouseInBounds = (e: MouseEvent, element: HTMLElement) => {
  const { left, top, width, height } = element.getBoundingClientRect();
  const { clientX, clientY } = e;
  return (
    clientX >= left &&
    clientX <= left + width &&
    clientY >= top &&
    clientY <= top + height
  );
};
