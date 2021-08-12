# Steps taken in this commit

### Required mongoose library and connected to mongodb database with connectDB function

```js
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
```

> this dbURI is a config variable imported via

```js
const config = require('config');
const dbURI = config.get('mongoURI');
```

---

### Created User Model using mongoose.Schema & then exported it

```js
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
```

> while exporting mongoose.model('User',UserSchema), this User should be Capital (**convention**)
