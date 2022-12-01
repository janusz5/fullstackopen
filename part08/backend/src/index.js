const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");

const MONGODB_URI =
  "mongodb+srv://fullstack:WXxwrN6Kab5rgbWfJsH6shWwGivLTD5F@cluster0.goz1m.mongodb.net/part8?retryWrites=true&w=majority";

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

const typeDefs = gql`
  type Author {
    name: String!
    id: String!
    born: Int
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Query {
    allBooks(author: String, genre: String): [Book!]!
    bookCount: Int!
    authorCount: Int!
    allAuthors: [Author]!
  }
  type Mutation {
    editAuthor(name: String!, setBornTo: Int!): Author
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!
  }
`;

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filters = {};
      if (args.author) {
        const author = await Author.find({ name: args.author });
        filters["author"] = author;
      }
      if (args.genre) {
        filters["genres"] = { $in: [args.genre] };
      }
      return Book.find(filters).populate("author");
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name });
      return Book.count({ author });
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        await author.save();
      }
      const book = new Book({
        title: args.title,
        published: args.published,
        author: author,
        genres: args.genres,
      });
      await book.save();
      return book;
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      await author.save();
      return author;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
