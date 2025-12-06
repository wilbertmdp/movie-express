import mongoose from "mongoose";
import MovieModel from "../models/movieModel.js"

export const movies = async (req, res) => {
  try {
    // Hanya menampilkan movie milik user yang sedang login
    const movies = await MovieModel.find({
      createdby: req.user?.user_id
    }).sort({ createdAt: -1 });

    return res.status(201).json({
      message: "Daftar semua movie",
      data: movies,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
      data: null,
    });
  }
};

export const addNewMovie = async (req, res) => {
  try {
    const { judul, tahunRilis, sutradara } = req.body;

    if (!judul || !tahunRilis || !sutradara) {
      return res.status(400).json({
        message: "Semua field (judul, tahunRilis, sutradara) wajib diisi",
        data: null
      });
    }

    // Menyimpan user_id pembuat ke database
    const movie = await MovieModel.create({ judul, tahunRilis, sutradara, createdby: req.user?.user_id });

    return res.status(201).json({
      message: "Berhasil menambahkan movie baru",
      data: movie,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Gagal menambahkan movie",
      error: error.message,
      data: null,
    });
  }
};

export const detailMovie = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID tidak valid", data: null });
    }

    // Mencari movie berdasarkan ID DAN kepemilikan user
    const movie = await MovieModel.findOne({
      _id: id,
      createdby: req.user?.user_id,
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie tidak ditemukan", data: null });
    }

    return res.status(200).json({ message: "Detail movie", data: movie });
  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
      data: null,
    });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, tahunRilis, sutradara } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID tidak valid", data: null });
    }

    // Update hanya jika ID cocok DAN user pembuat cocok
    const updatedMovie = await MovieModel.findOneAndUpdate(
      {
        _id: id,
        createdby: req.user?.user_id,
      },
      { judul, tahunRilis, sutradara },
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie tidak ditemukan atau akses ditolak", data: null });
    }

    return res.status(200).json({
      message: "Berhasil mengupdate movie",
      data: updatedMovie,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
      data: null,
    });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID tidak valid", data: null });
    }

    // Hapus hanya jika ID cocok DAN user pembuat cocok
    const deletedMovie = await MovieModel.findOneAndDelete({
      _id: id,
      createdby: req.user?.user_id,
    });

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie tidak ditemukan atau akses ditolak", data: null });
    }

    return res.status(201).json({
      message: "Berhasil menghapus movie",
      data: deletedMovie,
    });
    
  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
      data: null,
    });
  }
};