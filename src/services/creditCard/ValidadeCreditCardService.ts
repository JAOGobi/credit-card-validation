import prismaClient from "../../prisma";

interface CreditCardValidationRequest {
    creditCardNumber: string,
    userId: string,
}

class ValidateCreditCardService {
    async execute({ creditCardNumber, userId }: CreditCardValidationRequest) {
        console.log({ creditCardNumber, userId })
        
        const validateId = await prismaClient.cartaoCredito.findFirst({
            where: {
                numero: creditCardNumber
            }
        });

        if (!validateId) {
            return { isValid: false };
        }

        return { isValid: validateId.usuarioId === userId };
    }

}

export { ValidateCreditCardService };