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

type CardSet {
    _id: Int!
    title: String!
    cards: [Card]
    isCompleted: Boolean
}

type Card {
    _id: Int!
    term: String
    description: String
    isViewed: Boolean
}
`