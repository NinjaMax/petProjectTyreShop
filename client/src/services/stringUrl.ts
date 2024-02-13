import CyrillicToTranslit from "cyrillic-to-translit-js";

export const createStringUrl = (itemString: string | undefined): string => {
  const cyrillicToTranslit = new (CyrillicToTranslit as any)();
  const exampleCyr = 
  cyrillicToTranslit.transform(
    itemString , '-'
  ).toLowerCase()
  .replace(/[/()^+]{1}/g, "-")
  .replace(/-{2,}/g, '-');

  function deleteLastIndexIfDash(inputString: string): string {
    const pattern = /^(.*)-$/;
    const match = inputString.match(pattern);
    if (match) {
      const modifiedString = match[1];
      return modifiedString;
    } else {
        return inputString;
    }
  }
  const result = deleteLastIndexIfDash(exampleCyr);
  return result;
};

export const createRuStringFromUrl = (itemString: string | undefined): string => {
  const cyrillicToTranslit = new (CyrillicToTranslit as any)();
  const exampleRuCyr = 
  cyrillicToTranslit.reverse(
    itemString , { preset: "Ru" }
  ).toLowerCase()
  .replace(/[-/()^+]{1}/g, ' ')
  .replace(/-{2,}/g, ' ');
  return exampleRuCyr;
};

export const createUaStringFromUrl = (itemString: string | undefined): string => {
  const cyrillicToTranslit = new (CyrillicToTranslit as any)();
  const exampleUaCyr = 
  cyrillicToTranslit.reverse(
    itemString , { preset: "uk" }
  ).toLowerCase()
  .replace(/[-/()^+]{1}/g, ' ')
  .replace(/-{2,}/g, ' ');
  return exampleUaCyr;
};

export const translateToRu = (itemString: string | undefined): string => {
  const cyrillicToTranslit = new (CyrillicToTranslit as any)();
  const translateRuCyr = 
  cyrillicToTranslit.reverse(
    itemString , { preset: "Ru" }
  ).toLowerCase()
  .replace(/[-/()^+]{1}/g, ' ')
  .replace(/-{2,}/g, ' ');
  return translateRuCyr.slice(0, 1).toUpperCase() + translateRuCyr.slice(1, translateRuCyr.length);
};
