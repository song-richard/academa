const typeDefs = `
type Query {
    profile: Profile
    profiles: [Profile]
    me: Profile
    cardSets(email:String!, amount:Int): Profile
    card(id:Int!): Card
    askLearningExpert(question: String!): String
}

type Mutation {
    addProfile(username:String!, email:String!, password: String!): Auth
    addCardSet(title:String!, cardSet:[CardInput!], name:String!): Profile
    updateCardSet(id:ID, cardSet:[CardInput!]): CardSet
    deleteCardSet(id:ID!): Profile
    login(user:String!, password:String!): Auth
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

type Auth {
    token: ID!
    profile: Profile
}

input CardInput {
    term: String!
    description: String!
  }


type Question {
    id: ID!
    content: String!
    response: String
  }
`;

module.exports = typeDefs;
