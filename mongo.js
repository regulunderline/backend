const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb://fullstack:${password}@ac-eynijkn-shard-00-00.hyvmgni.mongodb.net:27017,ac-eynijkn-shard-00-01.hyvmgni.mongodb.net:27017,ac-eynijkn-shard-00-02.hyvmgni.mongodb.net:27017/noteApp?ssl=true&replicaSet=atlas-stfsgo-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'js is not easy',
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})