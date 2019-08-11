const mongoose = require('mongoose');
const mongooseIntl = require('mongoose-intl');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true
});
mongoose.plugin(mongooseIntl, { languages: ['en', 'ru'], defaultLanguage: 'ru' });
