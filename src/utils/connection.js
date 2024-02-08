
import { connect } from 'mongoose'


//connection tp DataBase
const dbConnect = () =>{
    const URL = process.env.DB_URL || "mongodb://localhost:27017/stringShortner"
    try {
        connect(URL)
    } catch (error) {
        // console.log(error)
        console.log(error.message)
    
    }
}

export default dbConnect;
