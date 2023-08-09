const express=require('express');
const  mongoose =require("mongoose")
const dotenv =require('dotenv')
const userRouter =require("./routes/user.route")
const adminRouter =require("./routes/admin.route")
const orderRouter =require("./routes/order.route")
const cartitemRouter =require("./routes/cartitem.route")
const productRouter =require("./routes/product.route")
const categoryRouter =require("./routes/category.route")
const subcategoryRouter =require("./routes/subcategory.route")
const notificationRouter =require("./routes/notification.route")
const cors=require("cors")
dotenv.config()
const app = express();

mongoose.set('strictQuery', true)
const connect = async () => {
    try {
      await mongoose.connect(process.env.DATABASECLOUD);
      console.log("Connected to mongoDB.");
    } catch (error) {
      throw error;
    }
  };
  
  mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
  });

//middlewares
app.use(cors());
//BodyParser Middleware
app.use(express.json()); 

app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/cartitems', cartitemRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/subcategories', subcategoryRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/admins', adminRouter);

app.listen(process.env.PORT, () => {
    connect();
 console.log(`Server is listening on port ${process.env.PORT}`); });
