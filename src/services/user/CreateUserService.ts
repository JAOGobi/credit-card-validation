import { PrismaClient } from "@prisma/client"
import prismaClient from "../../prisma";
import {hash} from 'bcryptjs';

interface UserRequest {
    nome: string
    email: string
    senha: string
    login: string
}

class CreateUserService {
    async execute({nome, email, senha, login}:UserRequest) {

        //verifica se foi enviado o valor do e-mail
        if(!email){
            throw new Error("E-mail não enviado!");
        }

        //verifica se o e-mail já foi cadastrado
        const UserAlreadyExists = await prismaClient.usuario.findFirst({
            where:{
                email:email
            }
        })

        if(UserAlreadyExists){
            throw new Error("E-mail já cadastrado!")
        }

        const senhaHash = await hash(senha, 8)

        const user = await prismaClient.usuario.create({
            data:{
                nome:nome,
                email:email,
                senha:senhaHash,
                login: login
            },
            select:{
                id:true,
                nome:true,
                email:true,
                login:true
            }
        })

        return user;
    }
}

export { CreateUserService }