import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.createQuestion(createQuestionDto);
  }

  @Get('/allquestions')
  findAll() {
    return this.questionsService.findAllQuestion();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOneQuestion(+id);
  }

  @Get('/all-bymodel/:id_model')
  findAllByModel(@Param('id_model') id_model: string) {
    return this.questionsService.findAllQuestionByIdModel(+id_model);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.removeQuestion(+id);
  }
}
