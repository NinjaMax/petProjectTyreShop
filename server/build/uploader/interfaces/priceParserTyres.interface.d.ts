export declare class PriceParserTyresOptions {
    alwaysArray: string[];
    optionsTyresParse: {
        ignoreAttributes: boolean;
        ignorePiTags: boolean;
        ignoreDeclaration: boolean;
        alwaysCreateTextNode: boolean;
        removeNSPrefix: boolean;
        processEntities: boolean;
        format: boolean;
        numberParseOptions: {
            leadingZeros: boolean;
            hex: boolean;
            skipLike: RegExp;
        };
        item: string;
        isArray: (item: string) => boolean;
    };
}
