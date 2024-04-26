import { Request, Response } from "express";
import { CreateCreditCardService } from "../../services/creditCard/CreateCreditCardService";

class CreateCreditCardController {
    async handle(req: Request, res: Response) {

        const { numero, proprietario, validade, cvv } = req.body;
        const usuarioId = req.user_id;

        const createCreditCardService = new CreateCreditCardService();

        const creditCard = await createCreditCardService.execute({ numero, proprietario, validade, cvv, usuarioId });

        return res.json(creditCard);

    }
}

export { CreateCreditCardController };