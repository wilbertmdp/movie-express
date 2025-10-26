import MovieModel from "../models/movieModel.js"

export const listMessage = async (req, res) => {
    try{
        const data = await MovieModel.find({})

        res.status(201).json({
            message : "list movie",
            data : data
        })

    }catch(error){
        res.status(500).json({
            message : error.message,
            data : null
        })
    }
}

export const createMessage = async (req, res) => {
    try{
        const request = req.body

        const response = await MovieModel.create({
            judul : request.judul,
            tahunRilis : request.tahunRilis,
            sutradara : request.sutradara
        })

        res.status(201).json({
            message : "movie berhasil di buat",
            data : response
        })

    }catch (error){
        res.status(500).json({
            message : error.message,
            data : null
        })
    }
}

export const updateMessage = async (req, res) => {
    try{
        const id = req.params?.id
        const request = req.body
        if (!id) {
            return res.status(500).json({
                message: "id tidak ditemukan",
                data: null
            })
        }

        const response = await MovieModel.findByIdAndUpdate(id, {
            judul : request.judul,
            tahunRilis : request.tahunRilis,
            sutradara : request.sutradara
        })

        if (response) {
            return res.status(201).json({
            message : "movie berhasil diupdate",
            data : null
            })
        }



    }catch (error){
        res.status(500).json({
            message : error.message,
            data : null
        })
    }
}

export const deleteMessage = async (req, res) => {
    try{
        const id = req.params.id
        if (!id) {
            return res.status(500).json({
                message: "id tidak ditemukan",
                data: null
            })
        }

        const response = await MovieModel.findByIdAndDelete(id)

        if (response) {
            return res.status(201).json({
            message : "movie berhasil dihapus",
            data : null
            })
        }

    }catch (error){
        res.status(500).json({
            message : error.message,
            data : null
        })
    }
}