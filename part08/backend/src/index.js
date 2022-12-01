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

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
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
    bookCount: () => books.length,
    allBooks: (root, args) => {
      let filteredBooks = [...books];
      if (args.author) {
        filteredBooks = filteredBooks.filter(
          (book) => book.author === args.author
        );
      }
      if (args.genre) {
        filteredBooks = filteredBooks.filter((book) =>
          book.genres.includes(args.genre)
        );
      }
      return filteredBooks;
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: (root) => {
      return books.reduce(
        (prev, cur) => (cur.author === root.name ? prev + 1 : prev),
        0
      );
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.find({ name: args.author });
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
    editAuthor: (root, args) => {
      const author = authors.find((auth) => auth.name === args.name);
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      authors = authors.map((a) => (a.name === author.name ? author : a));
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
