export class PriceParserTyresOptions {

    alwaysArray = ["xml.items.item", ];
    optionsTyresParse = {
        ignoreAttributes : false,
        ignorePiTags: true,
        ignoreDeclaration: true,
        alwaysCreateTextNode: false,
        removeNSPrefix: true,
        //preserveOrder: true,
        processEntities: true,
        format: true,
        numberParseOptions: {
          leadingZeros: true,
          hex: true,
          skipLike: /\+[0-9]{10}/
        },
        item:  "xml.items.item",
        isArray: (item: string) => { 
          if( this.alwaysArray.indexOf(item) !== -1) return true;
        }
    };
}