import { XMLParser } from 'fast-xml-parser';
import * as fs from 'fs';
import { join } from 'path';

export class UploaderParser {
 
    async parsePriceToJson(path: string) {

     fs.readFile(join(process.cwd(), path),
        (err, data) =>{
            if (err) {
             throw err;   
            }
            console.log('DATA',data);
            const alwaysArray = ["xml.items.item", ];
      
            const options = {
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
                  if( alwaysArray.indexOf(item) !== -1) return true;
                }
            };
       
            const parser = new XMLParser(options);
            let jsObj = parser.parse(data);
            console.log('DATA OBJECT',jsObj);
            
           jsObj.xml.items.item.map(priceItem => console.log('POSITION', priceItem));
        }   
        
      );
        
    }  

    
}