import mongoose, { mongo } from "mongoose"

const MovieSchema = new mongoose.Schema(
    {
        judul : {
            type : String,
            unique : true,
            required : true,
            trim : true
        },
        tahunRilis : {
            type : String,
            required : true,
            trim : true
        },
        sutradara : {
            type : String,
            required : true,
            trim : true
        }
    },
    {
        timestamps : true
    }
);

const MovieModel = mongoose.model("movies", MovieSchema);

export default MovieModel;