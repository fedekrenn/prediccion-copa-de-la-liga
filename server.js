import express from 'express'
import main from './src/main.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

/* ---------- EJS ------------- */

// Configuracion de EJS
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
  const result = await main()
  res.render('index', { tabla: result })
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
