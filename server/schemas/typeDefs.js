const typeDefs = `
type Query {
    profile: Profile
    cardSets(id:Int!, amount:Int): [CardSet]
    card(id:Int!): Card
}

type Profile {
    _id: ID!
    username: String
    email: String
    cardSets: [CardSet]
}
`