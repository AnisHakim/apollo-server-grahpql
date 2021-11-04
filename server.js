const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const mongoose = require('mongoose')


async function startServer() {
    const app = express()
    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers:resolvers
    })

    await apolloServer.start();

    apolloServer.applyMiddleware({ app: app })
    
    app.use((req, res) => {
        res.send('hello there ')
    })
    await mongoose.connect('mongodb+srv://brad123:brad123@contactkeeper.vrsxr.mongodb.net/apoloGraphql?retryWrites=true&w=majority', {
        useUnifiedTopology: true,
        useNewUrlParser:true
    })
    console.log('mongoose connected ... ')
    app.listen(4000,()=> console.log("server run 4000"))
}

startServer();