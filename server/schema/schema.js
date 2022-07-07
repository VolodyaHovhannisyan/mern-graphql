// const { clients, projects } = require('../sampleData.js')

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList } = require('graphql')

// Db models
const ProjectModel = require('../models/Project')
const ClientModel = require('../models/Client')

// client type
const ClientType = new GraphQLObjectType({
    name: 'ClientType',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    })
})

const ProjectType = new GraphQLObjectType({
    name: 'ProjectType',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return ClientModel.findById(parent.id)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects:{
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return ProjectModel.find()
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return ProjectModel.findById(args.id)
            }
        },
        clients:{
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return ClientModel.find()
            }
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return ClientModel.findById(args.id)
            }
        }
    }

})

module.exports = new GraphQLSchema({
    query: RootQuery,
})
