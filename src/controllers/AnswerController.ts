import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { getValidationErrors } from '../utils/getValidationErrors';
import { AppError } from '../errors/AppError';
import * as Yup from 'yup';

class AnswerController {
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { surveyUser_id } = request.query;

    const schema = Yup.object().shape({
      surveyUser_id: Yup.string().required('Survey user ID is required')
    });

    await schema.validate(request.body, {
      abortEarly: false
    });

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne(
      String(surveyUser_id)
    );

    if (!surveyUser) {
      throw new AppError('Survey user does not exists!');
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}

export { AnswerController }