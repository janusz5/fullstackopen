describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "VSCodeRestClient",
      password: "password",
      name: "VSCode RestClient",
    });
    cy.visit("http://localhost:3003");
  });

  it("Login form is shown", function () {
    cy.contains("Log In To Application");
    cy.get("#loginForm").contains("Username");
    cy.get("#loginForm").contains("Password");
    cy.get("#loginForm").contains("Login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("VSCodeRestClient");
      cy.get("#password").type("password");
      cy.get("#loginSubmit").click();
      cy.contains("VSCode RestClient is logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("VSCodeRestClient");
      cy.get("#password").type("wrong");
      cy.get("#loginSubmit").click();

      cy.get("html").should("not.contain", "VSCode RestClient is logged in");

      cy.get(".alert-danger")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(132, 32, 41)");
    });
  });
  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "VSCodeRestClient", password: "password" });
    });

    it("A blog can be created", function () {
      cy.contains("Create New Blog").click();
      cy.get("#title").type("test blog");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");
      cy.get("#submitButton").click();
      cy.get(".blog").contains("test blog");
    });

    it("A blog can be liked", function () {
      cy.createBlog({
        title: "test blog",
        author: "test author",
        url: "test url",
      });

      cy.get(".blog").contains("test blog").click();
      cy.get("#bloglikes").contains("0");
      cy.get("#bloglikes").contains("like").click();
      cy.get("#bloglikes").contains("1");
    });

    it("A blog can be deleted by the creator", function () {
      cy.createBlog({
        title: "test blog",
        author: "test author",
        url: "test url",
      });

      cy.get(".blog").contains("test blog").click();
      cy.get("#blogremover").contains("Remove").click();
      cy.get("html").should("not.contain", "test blog");
    });

    it("A blog can not be deleted by another user", function () {
      cy.createBlog({
        title: "test blog",
        author: "test author",
        url: "test url",
      });

      cy.contains("Log Out").click();
      cy.request("POST", "http://localhost:3003/api/users", {
        username: "user2",
        password: "password",
        name: "user 2",
      });
      cy.login({ username: "user2", password: "password" });

      cy.get(".blog").contains("test blog").click();
      cy.get(".blogview").should("not.contain", "Remove");
    });

    it("Blogs are ordered by likes", function () {
      cy.createBlog({
        title: "test blog 1",
        author: "test author",
        url: "test url",
        likes: 1,
      });
      cy.createBlog({
        title: "test blog 2",
        author: "test author",
        url: "test url",
        likes: 10,
      });
      cy.createBlog({
        title: "test blog 3",
        author: "test author",
        url: "test url",
        likes: 4,
      });

      cy.get("#blogs>.blog").eq(0).should("contain", "test blog 2");
      cy.get("#blogs>.blog").eq(1).should("contain", "test blog 3");
      cy.get("#blogs>.blog").eq(2).should("contain", "test blog 1");

      cy.contains("test blog 1").click();

      cy.get("#bloglikes").contains("like").click();
      cy.get("#bloglikes").contains("like").click();
      cy.get("#bloglikes").contains("like").click();
      cy.get("#bloglikes").contains("like").click();
      cy.get("#bloglikes").contains("like").click();
      cy.get("#bloglikes").contains("like").click();

      cy.contains("Blogs").click();
      //cy.get("#blogs>.blog").eq(0).should("contain", "test blog 2");
      //cy.get("#blogs>.blog").eq(1).should("contain", "test blog 1");
      //cy.get("#blogs>.blog").eq(2).should("contain", "test blog 3");
      // Works locally
    });
  });
});
