import { Request, Response } from "express";
import { ValidateCreditCardService } from "../../services/creditCard/ValidadeCreditCardService";

class ValidateCreditCardController {
    async handle(req: Request, res: Response) {

        console.log(req.params);

        const creditCardNumber = req.params.creditCardNumber;
        
        const userId = req.user_id;

        const validateCreditCardService = new ValidateCreditCardService();

        const response = await validateCreditCardService.execute({ creditCardNumber, userId });

        return res.json(response);
    }
}

export { ValidateCreditCardController };