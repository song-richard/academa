const typeDefs = `
type Query {
    profile: Profile
    cardSets(id:Int!, amount:Int): [CardSet]
    card(id:Int!): Card
}

type Mutation {
    addProfile(username:String!, email:String!, password:String!): Auth
    addCardSet(title:String!, cardSet:[CardInput!]): CardSet
    updateCardSet(id:Int, cardSet:[CardInput!]): CardSet
    deleteCardSet(id:Int!): Profile
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

input CardInput {
    term: String!
    description: String!
  }
`;

module.exports = typeDefs;