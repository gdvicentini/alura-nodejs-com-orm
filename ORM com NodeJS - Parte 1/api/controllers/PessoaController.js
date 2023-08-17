const database = require('../models/index.js')

class PessoaController {
    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await database.Pessoas.findAll()
            return res.status(200).json(todasAsPessoas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaPessoa(req, res) {
        const { id } = req.params
        
        try {
            const umaPessoa = await database.Pessoas.findOne ({
                where: {
                    id: parseInt(id)
                }
            })
            return res.status(200).json(umaPessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaPessoa (req, res) {
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(200).json(novaPessoaCriada)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //atualizar um registro
    static async atualizaPessoa(req, res) {
        const { id } = req.params 
        const novasInfos = req.body
        try {
            await database.Pessoas.update(novasInfos, { where: {id: parseInt(id)}})
            const pessoaAtualizada = await database.Pessoas.findOne ({ where: { id: parseInt(id)}})
            return res.status(200).json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //deletar um registro
    static async apagaPessoa(req, res) {
        const { id } = req.params
        try {
            await database.Pessoas.destroy({ where: {id: parseInt(id)}})
            return res.status(200).json({mensagem: `id ${id} deletado com sucesso!`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //localhost:3000/pessoas/1/matricula/5
    //localhost:3000/pessoas/:estudanteId/matricula/:matriculaId
    static async pegaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        
        try {
            const umaMatricula = await database.Matriculas.findOne ({
                where: {
                    id: parseInt(matriculaId),
                    estudante_id: parseInt(estudanteId)
                }
            })
            return res.status(200).json(umaMatricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaMatricula (req, res) {
        const { estudanteId } = req.params
        const novaMatricula = {...req.body, estudante_id: parseInt(estudanteId)}
        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(200).json(novaMatriculaCriada)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params 
        const novasInfos = req.body
        try {
            await database.Matriculas.update(novasInfos, { 
                where: {
                    id: parseInt(matriculaId),
                    estudante_id: parseInt(estudanteId)
                }})
            const matriculaAtualizada = await database.Matriculas.findOne ({ where: { id: parseInt(matriculaId)}})
            return res.status(200).json(matriculaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            await database.Matriculas.destroy({ 
                where: {
                    id: parseInt(matriculaId)
                }})
            return res.status(200).json({mensagem: `Matricula id ${matriculaId} deletado com sucesso!`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController