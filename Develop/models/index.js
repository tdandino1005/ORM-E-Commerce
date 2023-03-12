// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
// Created a foreign key in the Product model
Product.belongsTo(Category, {
  foreignKey: 'category_id',
})

// Categories have many Products
// Created a foreign key in the Product model
Category.hasMany(Product, {
  foreignKey: 'category_id',
})

// Products belongToMany Tags (through ProductTag)
// Created a foreign key in the ProductTag model
Product.belongsToMany(Tag, {
  through: ProductTag,
    foreignKey: 'tag_id',
  })

// Tags belongToMany Products (through ProductTag)
// Created a foreign key in the ProductTag model
Tag.belongsToMany(Product, {
  through: ProductTag,
    foreignKey: 'product_id',
  })

  // Export all models
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
