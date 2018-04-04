const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')

const teams = [
    {
        name: 'Team 1'
    },
    {
        name: 'Team 2'
    },
    {
        name: 'Team 3'
    },
];

const typeDefs = `
    type Query { teams: [Team] }
    type Team { name: String }
`
const resolvers = {
    Query: { teams: () => teams },
}

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(3000, () => console.log('Express listening on port 3000!'))
