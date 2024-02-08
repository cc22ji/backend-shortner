
// require('dotenv').config();
import { connect } from 'mongoose'


//connection tp DataBase
const dbConnect = () =>{
    const URL = process.env.DB_URL || "mongodb+srv://chetanchouhan222:Everst%40321@cluster0.axajown.mongodb.net/stringShortner"
    try {
        connect(URL)
    } catch (error) {
        // console.log(error)
        console.log(error.message)
    
    }
}

export default dbConnect;
