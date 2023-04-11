import Product from "../model/product.js";

const showProduct = async (req, res) => {
  const products = await Product.find();
  return res.json(products);
};

const addProduct = async (req, res) => {
  const product = await Product.create(req.body);

  return res.status(200).json({
    message: "Thêm sản phẩm thành công",
    product,
  });
};

const productID = async (req, res) => {
  const product = await Product.findById(req.params.id);

  return res.json(product);
};

const update = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  return res.json({
    message: "Cập nhật sản phẩm thành công",
    data: product,
  });
};

const xoaProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  return res.json({
    message: "Xóa sản phẩm thành công",
    product,
  });
};

export { showProduct, addProduct, productID, update, xoaProduct}

