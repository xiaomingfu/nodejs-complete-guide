const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type RootMutation {
}

schema {
    mutation:RootMutation
}
`);
