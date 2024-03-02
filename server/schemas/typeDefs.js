const typeDefs = `
type Query {
    profile: Profile
    cardSets(id:Int!, amount:Int): [CardSet]
    card(id:Int!): Card
}
`