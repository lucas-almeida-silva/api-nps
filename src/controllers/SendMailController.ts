import path from 'path';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import SendMailService from '../services/SendMailService';
import { getValidationErrors } from '../utils/getValidationErrors';
import { AppError } from '../errors/AppError';
import * as Yup from 'yup';

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const schema = Yup.object().shape({
      email: Yup.string().email('Invalid e-mail').required('Email is required'),
      survey_id: Yup.string().required('Survey ID is required')
    });

    await schema.validate(request.body, {
      abortEarly: false
    });

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new AppError('User does not exists');
    }

    const survey = await surveysRepository.findOne(survey_id);

    if (!survey) {
      throw new AppError('Survey does not exists');
    }

    const mailTemplatePath = path.resolve(
      __dirname, '..', 'views', 'emails', 'npsMail.hbs'
    );

    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: { user_id: user.id, value: null },
      relations: ["user", "survey"]
    });

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      surveyUser_id: "",
      link: process.env.URL_MAIL
    }

    if (surveyUserAlreadyExists) {
      variables.surveyUser_id = surveyUserAlreadyExists.id;

      await SendMailService.execute(email, survey.title, variables, mailTemplatePath);

      return response.json(surveyUserAlreadyExists);
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id
    });

    await surveysUsersRepository.save(surveyUser);

    variables.surveyUser_id = surveyUser.id;

    await SendMailService.execute(
      email,
      survey.title,
      variables,
      mailTemplatePath
    );

    return response.json(surveyUser);
  }
}

export { SendMailController }