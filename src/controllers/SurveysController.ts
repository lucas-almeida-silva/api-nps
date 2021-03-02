import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { getValidationErrors } from '../utils/getValidationErrors';
import * as Yup from 'yup';

class SurveysController {
  async show(request: Request, response: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository);

    const surveys = await surveysRepository.find();

    return response.json(surveys);
  }

  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const schema = Yup.object().shape({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required')
    });

    await schema.validate(request.body, {
      abortEarly: false
    });

    const surveysRepository = getCustomRepository(SurveysRepository);

    const survey = surveysRepository.create({
      title,
      description
    });

    await surveysRepository.save(survey);

    return response.status(201).json(survey);
  }
}

export { SurveysController }