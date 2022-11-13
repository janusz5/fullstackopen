describe("Frontend Test", () => {
  test("Wild Card Test", async () => {
    const blog = {
      title: "testTitle",
      author: "testAuthor",
      url: "testURL",
      likes: 0,
      user: {
        name: "testUserName",
      },
    };
    expect(blog.title).toEqual("testTitle");
  });
});
