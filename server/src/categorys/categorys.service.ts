import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoryDto } from './dto/get-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.model';

@Injectable()
export class CategorysService {
  constructor(@InjectModel(Category) private categoryRepository: typeof Category,
    ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.categoryRepository.create(createCategoryDto);
      
      return category;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createCategoryFromPrice(id: number, category: string) {
    try {
      const [findCategory, created] = await this.categoryRepository.findOrCreate(
       {where:{category: category}, defaults: {category: category}}
      );
      if(created || !created) {
        await findCategory.$add('tyres', id);
        //await findCategory.update()
        // await findCategory.save();
        // await findCategory.reload();
      }
    } catch (error){
      console.log(error);
      //  throw new HttpException(
      //   'Data is incorrect and must be uniq', 
      //   HttpStatus.NOT_FOUND,
      //   error.message);
    }
  }

  async createCategoryWheelFromPrice(id: number, category: string) {

    try {
      
      const [findCategory, created] = await this.categoryRepository.findOrCreate(
       {where:{category: category}, defaults: {category: category}}
      );
      
      if(created || !created) {
        await findCategory.$add('wheels', id);
      }
      
    } catch {
      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
    }
  }

  async findAllCategory() {

    try {
      
      const categoryAll = await this.categoryRepository.findAll({include:{all: true}});

      return categoryAll;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findCatById(getCategoryDto: GetCategoryDto) {

    try {
      
      const findCategoryById = await this.categoryRepository.findByPk(getCategoryDto.id_cat, {include:{all: true}});

      return findCategoryById;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      
    } catch (error) {
      
    }
    return `This action updates a #${id} category`;
  }

  async removeCategory(getCategoryDto: GetCategoryDto) {

    try {
      
      const removeCategory = await this.categoryRepository.destroy({where: {id_cat: getCategoryDto.id_cat}});

      return removeCategory;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }
}
