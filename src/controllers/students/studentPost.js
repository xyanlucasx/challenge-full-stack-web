import logger from '../../config/logger.js'
import StudentService from '../../services/Students.js'
import postgresConnection from '../../config/database/postgres/postgres.js'
import {
  responseOk,
  responseInternalServerError
} from '../../utils/restResponse.js'
import studentPostValidator from './validators/studentPostValidator.js'

export default async (req, res) => {
  try {
    studentPostValidator.parse(req.body)
    const studentService = new StudentService(postgresConnection)

    const student = await studentService.createStudent(req.body)

    return responseOk(res, student)
  } catch (e) {
    logger.error(e)
    return responseInternalServerError(res)
  }
}
