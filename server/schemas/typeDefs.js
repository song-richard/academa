const typeDefs = `
type Query {
    profile: Profile
    profiles: [Profile]
    me: Profile
    cardSets(email:String!, amount:Int): Profile
    card(id:Int!): Card
}

type Mutation {
    addProfile(name:String!, email:String!): Profile
    addCardSet(title:String!, cardSet:[CardInput!]): Profile
    updateCardSet(id:ID, cardSet:[CardInput!]): CardSet
    deleteCardSet(id:ID!): Profile
    login(email:String!, password:String!): Profile
}

type Profile {
    _id: ID!
    username: String
    email: String
    cardSets: [CardSet]
}

type CardSet {
    _id: ID!
    title: String!
    cards: [Card]
    isCompleted: Boolean
}

type Card {
    _id: ID!
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