const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  // used Tag.findAll() to find all tags
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name']

      }
    ]
  })
  // use promise method to pass the tags data to the homepage
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// create the GET route for /api/tags/:id
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
Tag.findOne({
  where: {
    id: req.params.id
  },
  // used Tag.findOne() to find a single tag by its `id`
  include: [
    {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock']
    }
  ]

})
// use if statement to return a 404 error if no tag is found
.then(dbTagData => {
  if (!dbTagData) {
    res.status(404).json({ message: 'No tag found with this id' });
    return;
  }
  res.json(dbTagData);
})
// use catch method to return a 500 error if there is a server error
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  // use promise method to pass the tags data to the homepage
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    // use catch method to return a 500 error if there is a server error
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  // use Tag.update() to update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  // use promise method to pass the tags data to the homepage
  .then(dbTagData => {
    // use if statement to return a 404 error if no tag is found
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    // use catch method to return a 500 error if there is a server error
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  }); 
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  // use Tag.destroy() to delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  // use promise method to pass the tags data to the homepage
  .then(dbTagData => {
    // use if statement to return a 404 error if no tag is found
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    // use catch method to return a 500 error if there is a server error
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
