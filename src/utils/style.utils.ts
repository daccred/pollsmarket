export const pixelToRem = (px: number, baseInput = 16) => {
  const getValue = (input: number) => parseFloat(input.toString().replace(/,/g, '.')) || 0;

  const base = () => getValue(baseInput) || 16;

  const x = base() || 16;
  const rem = `${(1 / x) * px}rem`;

  return rem;
};

export const stringToHslColor = (str: string, s: number, l: number) => {
  if (!str || str == null) {
    str = 'default';
  }

  const table = str.slice(0, 12);
  let hash = 0;
  for (let i = 0; i < table.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h = hash % 360;
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
};

export const outerColorGen = (payload: string) => stringToHslColor(payload, 50, 40);
export const layerColorGen = (payload: string) => stringToHslColor(payload, 50, 91);
