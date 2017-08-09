<<<<<<< HEAD
## About project

BEEVR helps connect students, who are looking for ad hoc work that fits their schedule, with residents who need help with everyday tasks.

## Getting Started

git clone

npm install

npm start

cd react-ui

npm start


## Running the tests

npm test


## Built With

* [Create React App](https://github.com/facebookincubator/create-react-app)
* [Redux] (http://redux.js.org/)
* Node.js
* Hapi.js
* Postgres-SQL


## Contributors

The list of project contributors can be found [here](https://github.com/majakudlicka/beevr/graphs/contributors)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
=======
# BEEVR

Proxy
The Webpack dev server makes use of [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) to optionally proxy requests to a separate, possibly external, backend server. A sample configuration is below.

```
proxy: {
  '/api': {
    target: 'https://other-server.example.com',
    secure: false
  }
}

// In webpack.config.js
{
  devServer: {
    proxy: {
      '/api': {
        target: 'https://other-server.example.com',
        secure: false
      }
    }
  }
}

// Multiple entry
proxy: [
  {
    context: ['/api-v1/**', '/api-v2/**'],
    target: 'https://other-server.example.com',
    secure: false
  }
]
```
See the http-proxy-middleware [Options](https://github.com/chimurai/http-proxy-middleware#options) documentation for available configuration.

>>>>>>> 46702ed739f762d886e145ca1f6fccbe6256a11f
