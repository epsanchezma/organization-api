const key = 'secretkey';

const dbUrl = {
  test: 'mongodb://localhost:27017/organization-api-test',
  development: 'mongodb://localhost:27017/organization-api',
  production: process.env.MONGOHQ_URL
}

module.exports = {
  key: key,
  dbUrl: dbUrl
}
