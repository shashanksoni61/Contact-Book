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

---

### Creating New User in database **routes/users.js**

> first destructure form input / requset body

```js
const { name, email, password } = req.body;
```

> Checking if user already exist & then Encrypt the password and Create user

```js
try {
  let user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).json({ msg: 'User already exist' });
  }

  user = new User({
    name: name,
    email: email,
    password: password,
  });

  //encrypting the password
  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(password, salt);

  await user.save();

  res.send('user saved');
} catch (err) {
  console.log(err.message);
  res.status(500).send('Server Error');
}
```

---

### Using JsonWebToken

> first create a payload

```js
const payload = { user{id:user.id}} // or anything
```

> then sign it with JWT Secret

```js
jwt.sign(
  payload,
  config.get('JWTSecret'),
  {
    expiresIn: 7200,
  },
  (err, token) => {
    if (err) throw err;
    res.json({ token });
  }
);
```

---

### Login the User **routes/auth.js**

> first validate the form input

```js
router.post(
  '/',
  [
    check('email', 'Please Enter A Valid Email').isEmail(),
    check('password', 'Password Is Required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
```

> Find Existing User and match the password

```js
const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'User Does Not Exist' });
      }

      //comparing hashed password with entered password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Password Does not Match' });
      }
```

> Now Send the Token

```js
jwt.sign(
  payload,
  config.get('JWTSecret'),
  {
    expiresIn: 7200,
  },
  (err, token) => {
    if (err) throw err;
    res.json({ token });
  }
);
```

---

### get the Logged in user via Auth Middleware **middleware/auth.js**

> first check if Token Header exist or not

```js
const token = req.header('x-auth-token');
if (!token) return res.json({ msg: 'No token exist' });
```

> now if token exist verify the token and forware the Req/Res Cycle to next route

```js
try {
    const decoded = jwt.verify(token, config.get('JWTSecret'));
    req.user = decoded.user;
    next();
}
```
