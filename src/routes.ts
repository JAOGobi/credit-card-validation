import {Router} from 'express';

/* área de importação dos controllers */

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/authUserControler';
import { isAuthenticated } from './middlewares/isAuthenticade';
import { DetailUserController } from './controllers/user/DetailUserController';
import { CreateCreditCardController } from './controllers/creditCard/CreateCreditCardController';
import { ValidateCreditCardController } from './controllers/creditCard/ValidateCreditCardController';

const router = Router();

router.post('/user', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/userinfo', isAuthenticated, new DetailUserController().handle)


router.post('/creditcard', isAuthenticated, new CreateCreditCardController().handle);
router.get('/validate-creditcard/:creditCardNumber', isAuthenticated, new ValidateCreditCardController().handle);

export{router};