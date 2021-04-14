const Pet = require("../models/pet")

module.exports = (app) => {
  /* GET home page. */
  app.get("/", async (req, res) => {
    const page = req.query.page || 1

    const { docs, pages } = await Pet.paginate({}, { page })

    if (req.header("Content-Type") == "application/json") {
      res.json({ pets: docs, pagesCount: pages, currentPage: page })
    } else {
      res.render("pets-index", { pets: docs, pagesCount: pages, currentPage: page })
    }
  })
}
