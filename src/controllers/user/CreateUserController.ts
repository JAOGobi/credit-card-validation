import {Request, response, Response} from 'express'
import { CreateUserService } from '../../services/user/CreateUserService';

class CreateUserController{
    async handle(req: Request, res: Response){
        const {nome, email, senha, login} = req.body;

        const createUserService = new CreateUserService();
        const user = await createUserService.execute({nome, email, senha, login});
        
        return res.json(user)
    }
}

export{CreateUserController}