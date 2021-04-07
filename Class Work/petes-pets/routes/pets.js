// MODELS
const Pet = require("../models/pet")

// PET ROUTES
module.exports = (app) => {
  // INDEX PET => index.js

  // NEW PET
  app.get("/pets/new", (req, res) => {
    res.render("pets-new")
  })

  // CREATE PET
  app.post("/pets", (req, res) => {
    var pet = new Pet(req.body)

    pet
      .save()
      .then((pet) => {
        // res.redirect(`/pets/${pet._id}`)
        return res.send({ pet })
      })
      .catch((err) => {
        res.status(400).send(err.errors)
      })
  })

  // SHOW PET
  app.get("/pets/:id", (req, res) => {
    Pet.findById(req.params.id).exec((err, pet) => {
      console.log(req.params.id)
      console.log(pet)
      res.render("pets-show", { pet: pet })
    })
  })

  // EDIT PET
  app.get("/pets/:id/edit", (req, res) => {
    Pet.findById(req.params.id).exec((err, pet) => {
      res.render("pets-edit", { pet: pet })
    })
  })

  // UPDATE PET
  app.put("/pets/:id", (req, res) => {
    Pet.findByIdAndUpdate(req.params.id, req.body)
      .then((pet) => {
        res.redirect(`/pets/${pet._id}`)
      })
      .catch((err) => {
        // Handle Errors
      })
  })

  // DELETE PET
  app.delete("/pets/:id", (req, res) => {
    Pet.findByIdAndRemove(req.params.id).exec((err, pet) => {
      return res.redirect("/")
    })
  })

  // SEARCH PET
  app.get("/search", async (req, res) => {
    const searchedText = req.query.term
    const term = new RegExp(searchedText, "i")
    const page = req.query.page || 1

    const { docs, pages } = await Pet.paginate(
      { $or: [{ name: term }, { species: term }] },
      { page }
    )

    res.render("pets-index", {
      pets: docs,
      pagesCount: pages,
      currentPage: page,
      term: searchedText,
    })
  })

  app.post("/pets/:id/purchase", async (req, res) => {
    const stripe = require("stripe")(process.env.PRIVATE_STRIPE_API_KEY)
    const token = req.body.stripeToken

    // req.body.petId can become null through seeding,
    // this way we'll insure we use a non-null value
    // ^^^ makes no sense to me, but whatev'
    const petId = req.body.petId || req.params.id

    try {
      const pet = await Pet.findById(petId)

      await stripe.charges.create({
        amount: pet.price * 100,
        currency: "usd",
        description: `Doggo Purchase: ${pet.name}`,
        source: token,
      })

      res.redirect(`/pets/${req.params.id}`)
    } catch (err) {
      console.log("no doggo for you today")
      res.redirect(`/pets/${req.params.id}`)
    }
  })
}
