export class PriceParserTyresOptions {
    constructor() {
        this.alwaysArray = ["xml.items.item",];
        this.optionsTyresParse = {
            ignoreAttributes: false,
            ignorePiTags: true,
            ignoreDeclaration: true,
            alwaysCreateTextNode: false,
            removeNSPrefix: true,
            processEntities: true,
            format: true,
            numberParseOptions: {
                leadingZeros: true,
                hex: true,
                skipLike: /\+[0-9]{10}/
            },
            item: "xml.items.item",
            isArray: (item) => {
                if (this.alwaysArray.indexOf(item) !== -1)
                    return true;
            }
        };
    }
}
