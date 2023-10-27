import express from 'express'
import main from './src/main.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', async (req, res) => {
  const result = await main()
  res.json(result)
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
