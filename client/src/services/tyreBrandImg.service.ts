import { TyreBrand } from "./enum/TyreBrand.enum";

const tyreBrandLogo = (brand: string | undefined) => {
    switch (brand) {
        case 'Apollo':
        case 'apollo':
            return TyreBrand.APOLLO_LOGO;
        case 'Barum':
        case 'barum':
            return TyreBrand.BARUM_LOGO;
        case 'BfGoodrich':
        case 'bfGoodrich':
        case 'BFGoodrich':    
            return TyreBrand.BFGOODRICH_LOGO;
        case 'Bridgestone':
        case 'bridgestone':
            return TyreBrand.BRIDGESTONE_LOGO;
        case 'Continental':
        case 'continental':
            return TyreBrand.CONTINENTAL_LOGO;
        case 'Cooper':
        case 'cooper':
            return TyreBrand.COOPER_LOGO;
        case 'Debica':
        case 'debica':
            return TyreBrand.DEBICA_LOGO;
        case 'Dunlop':
        case 'dunlop':
            return TyreBrand.DUNLOP_LOGO;
        case 'Falken':
        case 'falken':    
            return TyreBrand.FALKEN_LOGO;
        case 'Firestone':
        case 'firestone':
            return TyreBrand.FIRESTONE_LOGO;
        case 'Fulda':
        case 'fulda':
            return TyreBrand.FULDA_LOGO;
        case 'General':
        case 'General Tyre':
            return TyreBrand.GENERAL_LOGO;
        case 'Gislaved':
        case 'gislaved':
            return TyreBrand.GISLAVED_LOGO;
        case 'Giti':
        case 'giti':
            return TyreBrand.GITI_LOGO;
        case 'Goodyear':
        case 'goodyear':
            return TyreBrand.GOODYEAR_LOGO;
        case 'GT Radial':
        case 'gt radial':
            return TyreBrand.GT_LOGO;
        case 'Hankook':
        case 'hankook':
            return TyreBrand.HANKOOK_LOGO;
        case 'Hifly':
        case 'hifly':
            return TyreBrand.HIFLY_LOGO;
        case 'Kelly':
        case 'kelly':
            return TyreBrand.KELLY_LOGO;
        case 'Kenda':
        case 'kenda':
            return TyreBrand.KENDA_LOGO;
        case 'Kleber':
        case 'kleber':
            return TyreBrand.KLEBER_LOGO;
        case 'Kumho':
        case 'kumho':
            return TyreBrand.KUMHO_LOGO;
        case 'Ling Long':
        case 'LingLong':
        case 'linglong':
        case 'ling long':   
            return TyreBrand.LINGLONG_LOGO;
        case 'Matador':
        case 'matador':
            return TyreBrand.MATADOR_LOGO;
        case 'Maxxis':
        case 'maxxis':
            return TyreBrand.MAXXIS_LOGO;
        case 'Michelin':
        case 'michelin':
            return TyreBrand.MICHELIN_LOGO;
        case 'Nexen':
        case 'nexen':
            return TyreBrand.NEXEN_LOGO;
        case 'Nitto':
        case 'nitto':
            return TyreBrand.NITTO_LOGO;
        case 'Nokian':
        case 'nokian':
            return TyreBrand.NOKIAN_LOGO;
        case 'Pirelli':
        case 'pirelli':
            return TyreBrand.PIRELLI_LOGO;
        case 'Riken':
        case 'riken':
            return TyreBrand.RIKEN_LOGO;
        case 'Roadstone':
        case 'roadstone':
            return TyreBrand.ROADSTONE_LOGO;
        case 'Sava':
        case 'sava':
            return TyreBrand.SAVA_LOGO;
        case 'Tigar':
        case 'tigar':
            return TyreBrand.TIGAR_LOGO;
        case 'Toyo':
        case 'toyo':
            return TyreBrand.TOYO_LOGO;
        case 'Uniroyal':
        case 'uniroyal':
            return TyreBrand.UNIROYAL_LOGO;
        case 'Vredestein':
            return TyreBrand.VREDESTEIN_LOGO;
        case 'Wanli':
        case 'wanli':
            return TyreBrand.WANLI_LOGO;
        case 'Yokohama':
        case 'yokohama':
            return TyreBrand.YOKOHAMA_LOGO;
    }
}

export {
    tyreBrandLogo
};