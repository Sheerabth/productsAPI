# productsAPI-Endpoints
Framework : Nodejs 
Database : MongoDB

Register :

Request Type : POST
Route : /user/register 
Request Body : Name, Email, Password
Response : User_Id
Response-Headers : Refresh token, Access token

Login : 

Request Type : POST
Route : /user/login 
Request Body : Email, Password
Response : User_Id, Access-Token
Response-Headers : Refresh token, Access token

Get Products List:

Request Type : GET
Route : /product
Response : list of products
Response Body : products

Get Product :

Request Type : GET
Route : /product/:product_id
Response : product

Add Product :

Request Type : POST
Route : /product
Requst Body : name, image, description, totalQuantity, unitPrice
Response : product

Delete Product : 

Request Type : DELETE
Route : /product/:product_id
Response Body : message, deletedProduct

Get Cart :

Request Type : GET
Route : /cart
Request-Headers : Refresh token, Access token
Response Body : cartProducts

Add product to Cart :

Request Type : POST
Route : /cart
Request-Headers : Refresh token, Access token
Request Body : productId, quantity
Response Body : message, cartProducts

Edit Quantity of Product :

Request Type : PATCH
Route : /cart/:product_id
Request-Headers : Refresh token, Access token
Request Body : quantity
Response Body : message, cartStatus

Delete product from Cart :

Request Type : DELETE
Route : /cart/:product_id
Request-Headers : Refresh token, Access token
Response Body : message, cartStatus

Get Access Token after Expiry :

Request Type : GET
Request Headers : Refresh token, UserId
Route : /user/me/access-token
Response : Status, Message
Response Header : Access token #Generated with refresh token
