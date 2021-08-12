# Steps taken in this commit

### Required mongoose library and connected to mongodb database with connectDB function **config/db.js**

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

### Created User Model using mongoose.Schema & then exported it **models/User.js**

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

---

### To send POST request we need to first initialize bodyparser middleware in **server.js**

```js
app.use(express.json({ extended: false }));
```

> this will parse json data from body in POST request

---

### using express-validator to validate req.body data send via POST Request **routes/users.js**

> first import check and validationResult in routes/users.js

```js
const { check, validationResult } = require('express-validator/check');
```

> add middleware is POST Route using [ ]

```js
router.post('/', [], (req, res) => {
  res.send(req.body);
});
```

> using validation

```js
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check(
      'password',
      'Password with minimum 6 characters is required'
    ).isLength({
      min: 6,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send(req.body);
  }
);
```
