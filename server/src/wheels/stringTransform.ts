import { Injectable } from '@nestjs/common';
import CyrillicToTranslit from 'cyrillic-to-translit-js';

@Injectable()
export class StringTransformService {
  createStringUrl(itemString: string | undefined): string {
    const cyrillicToTranslit = new (CyrillicToTranslit as any)();
    const exampleCyr = cyrillicToTranslit
      .transform(itemString, '-')
      .toLowerCase()
      .replace(/[/()^+]{1}/g, '-')
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
  }
}
