# PVR CINEMA CLIENT

## Project setup

1. Install the server side first from here https://github.com/Boom0027/pvr_server.git
2. Run this in your command line interface
```
yarn install
```
3. In vue.config.js replace <target: "http://localhost:5000"> with your own server's port.

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Description

This is a PVR Cinema admin test application which simulates the running of a PVR Cinema web application.

As an admin user, you can:
1. Add movies and theatres in any available city
2. Add users to the data base
3. Send email to the email address of any user
4. Notify all the users using email about a movie when it is playing in one of the theatres in their city.

#### Other description

1. The client side is made with Vue JS. 
2. This web application is a PWA - Progressive Web Application with offline support and caching.
3. The client side uses web workers for JSON parse and stringify as they are heavy tasks and can often block the main JS thread which can lead to stutters
4. The client side consumes APIs provided by the nodeJS express server

