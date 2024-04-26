import prismaClient from "../../prisma";

interface CreditCardRequest {
    numero: string,
    proprietario: string,
    validade: string,
    cvv: number,
    usuarioId?: string
}

class CreateCreditCardService {

    async execute({numero, proprietario, validade, cvv, usuarioId}:CreditCardRequest) {
        if(!numero)  {
            throw new Error("Número do cartão não enviado!");
        }
        if(!proprietario) {
            throw new Error("Proprietário do cartão não enviado!");
        }
        if(!validade) {
            throw new Error("Validade do cartão não enviado!");
        }
        if(!cvv) {
            throw new Error("cvv do cartão não enviado");
        }

        numero = numero.replace(' ', '').replace('.', '').replace('-', '');

        const existsByNumber = await prismaClient.cartaoCredito.findFirst({
            where: {
                numero: numero
            }
        });

        if(existsByNumber) {
            throw new Error("Cartão já cadastrado!");
        }

        const createdCreditCard = await prismaClient.cartaoCredito.create({
            data: {
                numero: numero,
                proprietario: proprietario,
                validade: validade,
                cvv: cvv,
                usuarioId: usuarioId
            },
        });
        return createdCreditCard;
    }
}

export { CreateCreditCardService }