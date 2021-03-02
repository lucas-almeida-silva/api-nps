import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { getValidationErrors } from "../utils/getValidationErrors";
import * as Yup from 'yup';

class NpsController {
  /*
    Detractors => 0 - 6
    Passoive => 7 - 8
    Promoters => 9 - 10

    (total promoters - total detractors) / (total answers) x 100
  */
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;
    
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull())
    });

    const detractors = surveysUsers.filter(
      survey => survey.value >= 0 && survey.value <= 6
    ).length;

    const promoters = surveysUsers.filter(
      survey =>  survey.value >= 9
    ).length;

    const passive = surveysUsers.filter(
      survey =>  survey.value === 7 || survey.value === 8
    ).length; 

    const totalAnswers = surveysUsers.length;

    const calculate = Number(
      (((promoters - detractors) / totalAnswers) * 100).toFixed(2)
    );

    return response.json({
      detractors,
      promoters,
      passive,
      totalAnswers,
      nps: calculate
    });
  }
}

export { NpsController }