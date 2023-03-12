const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  // find all categories
  Category.findAll({
    // be sure to include its associated Products
    atttributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price']
      }
    ]
  })
  // use promise method to pass the categories data to the homepage
  .then(dbCategoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    atttributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price']
      }
    ]
  })
  // use promise method to pass the categories data to the homepage
  // used .then() to pass the categories data to the homepage
  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(categoryData);
  })
  // use catch method to return a 500 error if there is a server error
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// create the POST route for /api/categories
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    // created a foreign key in the Product model
    atttributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }]})
      // use promise method to pass the categories data to the homepage
      .then(CategoryData => {
        if (!CategoryData) {
          res.status(404).json({ message: 'No category found with this id' });
          return;
        }
        res.json(CategoryData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // create the POST route for /api/categories
router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(CategoryData => res.json(CategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create the PUT route for /api/categories/:id
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(CategoryData => {
      if (!CategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(CategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a DELETE route for /api/categories/:id
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(CategoryData => {
      if (!CategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(CategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

module.exports = router;
