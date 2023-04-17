import { CreateBasketDto } from './dto/create-basket.dto';
import { GetBasketDto } from './dto/get-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { Basket } from './entities/basket.model';
export declare class BasketService {
    private basketRepository;
    constructor(basketRepository: typeof Basket);
    createBasket(createBasketDto: CreateBasketDto): Promise<Basket>;
    findAllbasket(): Promise<Basket[]>;
    findBasketById(getBasketDto: GetBasketDto): Promise<Basket>;
    update(id: number, updateBasketDto: UpdateBasketDto): string;
    removeBasket(getBasketDto: GetBasketDto): Promise<number>;
}
