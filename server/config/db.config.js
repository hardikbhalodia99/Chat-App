const mongoose = require('mongoose')

const db = mongoose.connect(
  `mongodb+srv://hardikbhalodia:hello123@cluster0.gykvh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  },
  function (err, database) {
    if (err) {
      console.log(err)
    } else {
      console.log('Database connected successfully')
    }
  },
)

exports.db
