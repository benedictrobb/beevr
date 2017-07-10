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

