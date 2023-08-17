const database = require('../models/index.js')

class NivelController {

    static async pegaTodosOsNiveis(req, res) {
      try {
        const todosOsNiveis = await database.Niveis.findAll()
        return res.status(200).json(todosOsNiveis)
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }
    
    static async pegaUmNivel(req, res) {
        const { id } = req.params
        
        try {
            const umNivel = await database.Niveis.findOne ({
                where: {
                    id: parseInt(id)
                }
            })
            return res.status(200).json(umNivel)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaNivel (req, res) {
        const novoNivel = req.body
        try {
            const novoNivelCriado = await database.Niveis.create(novoNivel)
            return res.status(200).json(novoNivelCriado)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //atualizar um registro
    static async atualizaNivel(req, res) {
        const { id } = req.params 
        const novasInfos = req.body
        try {
            await database.Niveis.update(novasInfos, { where: {id: parseInt(id)}})
            const nivelAtualizado = await database.Niveis.findOne ({ where: { id: parseInt(id)}})
            return res.status(200).json(nivelAtualizado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //deletar um registro
    static async apagaNivel(req, res) {
        const { id } = req.params
        try {
            await database.Niveis.destroy({ where: {id: parseInt(id)}})
            return res.status(200).json({mensagem: `id ${id} deletado com sucesso!`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}


module.exports = NivelController