import User from "../model/user.js";
import { signupSchema, signinSchema } from "../schemas/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// const addUser = async (req, res) => {
//     const user = await User.create(req.body);

//       return res.status(200).json({
//         message: "Thêm sản phẩm thành công",
//         user,
//     });
// }

// export { addUser }

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const { error } = signupSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    // Check xem email đăng ký này đã tồn tại trong DB hay chưa?
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Dùng bcrypt để mã hoá
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới với password đã được mã hoá
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Xoá bỏ password trước khi gửi lại thông báo phía client
    const token = jwt.sign({ _id: user._id }, "123456", { expiresIn: "1d" });
    user.password = undefined;
    return res.status(201).json({
      message: "User created successfully",
      user,
      accessToken: token,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = signinSchema.validate(
      { email, password },
      { abortEarly: false }
    );

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Tài khoản không tồn tại",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Khong dung mat khau",
      });
    }
    const token = jwt.sign({ _id: user._id }, "123456", {
      expiresIn: "1d",
    });

    user.password = undefined;

    return res.status(200).json({
      message: "Đăng nhập thành công",
      accessToken: token,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
