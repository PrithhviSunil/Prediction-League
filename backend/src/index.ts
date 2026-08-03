import express from 'express';
import userRoutes from './routes/userRoutes'
import leagueRoutes from './routes/leagueRoutes'
import matchRoutes from './routes/matchRoutes'
import predictionRoutes from './routes/predictRoutes'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Site running')   
})


app.use('/api', userRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use('/api', leagueRoutes)

app.use('/api', matchRoutes)

app.use('/api', predictionRoutes)
