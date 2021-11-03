import { getRepository } from "typeorm";
import { Alunos } from "../entity/Alunos";
import { Request, Response } from "express";


// retorna todos os alunos cadastrados
export const getAlunos = async(request: Request, response: Response) => {
    const alunos = await getRepository(Alunos).find()

    return response.json(alunos);
};

// adicionar aluno
export const saveAluno = async(request: Request, response: Response) =>{
    const aluno = await getRepository(Alunos).save(request.body)

    return response.json(aluno);
};

//buscar aluno pelo ID
export const getAluno = async(request: Request, response: Response) => {
    const {id} = request.params
    const aluno = await getRepository(Alunos).findOne(id)

    return response.json(aluno);
};

//função de edição
export const updateAluno = async(request: Request, response: Response) =>{
    const {id} = request.params
    const aluno = await getRepository(Alunos).update(id, request.body)

    if (aluno.affected == 1){
        const alunoUpdated = await getRepository(Alunos).findOne(id)
        return response.json(alunoUpdated);
    } else {
        return response.status(404).json({ message: 'Aluno não cadastrado!' });
    }
};

// função: deletar aluno
export const deleteAluno = async(request: Request, response: Response) => {
    const {id} = request.params
    const aluno = await getRepository(Alunos).delete(id)

    if (aluno.affected == 1){
        return response.status(200).json({ message: "Aluno deletado com sucesso!" });
    } else{
        return response.status(404).json({ message: 'Aluno não encontrado!' });
    }
};

//matricula
export const matriculaAluno = async(request: Request, response: Response) => {
    const {id} = request.params
    const aluno = await getRepository(Alunos).update(id, { matriculado: false,
     })

     if (aluno.affected == 1){
         const alunoMatricula = await getRepository(Alunos).findOne(id)
         return response.json(alunoMatricula);
     } else {
         return response.status(404).json({ message: 'Aluno não encontrado!' });
     }

};