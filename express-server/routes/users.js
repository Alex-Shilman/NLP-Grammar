import express from 'express';
import studentData from '../../resources/student_error'
import { callD_alembert3 } from './controllers/callD_alembert3'
const router = express.Router();

/* GET users listing. */
router.post('/', callD_alembert3);

module.exports = router;
