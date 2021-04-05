const Pet = require("../models/pet")

module.exports = (app) => {
  /* GET home page. */
  app.get("/", async (req, res) => {
    const page = req.query.page || 1

    const { docs, pages } = await Pet.paginate({}, { page })
    res.render("pets-index", { pets: docs, pagesCount: pages, currentPage: page })
  })
}
