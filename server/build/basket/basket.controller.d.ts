import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { GetBasketDto } from './dto/get-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
export declare class BasketController {
    private readonly basketService;
    constructor(basketService: BasketService);
    create(createBasketDto: CreateBasketDto): Promise<import("./entities/basket.model").Basket>;
    findAll(): Promise<import("./entities/basket.model").Basket[]>;
    findOne(getBasketDto: GetBasketDto): Promise<import("./entities/basket.model").Basket>;
    update(id: string, updateBasketDto: UpdateBasketDto): string;
    remove(getBasketDto: GetBasketDto): Promise<number>;
}
