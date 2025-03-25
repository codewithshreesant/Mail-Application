
import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRoutes from './routes/auth.route.js'
import sentEmailRoutes from './routes/sentEmail.route.js'
import adminRoutes from './routes/admin.route.js';

const app = express();

import dotenv from 'dotenv' 
import { connectToDB } from './dbConfig/index.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json())

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true 
})
)

app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

app.use('/api/auth', authRoutes);
app.use('/api/emails', sentEmailRoutes);
app.use('/api', adminRoutes);

connectToDB()
.then(()=>{
    app.listen(
        PORT, () => {
            console.log(`The Server is listening at PORT ${ PORT }`);
        }
    )    
}).catch((error)=>{
    console.log(`Error occured while connecting ${error.message}`)
})

