# SocialComment-Endpoints
Framework : Nodejs 
Database : MongoDB

Register :

Request Type : POST
Route : /user/register 
Request Body : Name, Email, Gender, Password
Response : User_Id
Response-Headers : Refresh token, Access token

Login : 

Request Type : POST
Route : /user/login 
Request Body : Email, Password
Response : User_Id, Access-Token
Response-Headers : Refresh token, Access token

Create Post : 

Request Type : POST
Route : /post/create
Request-Headers : Refresh token, Access token
Request Body : Title, Content, Tags
Response : Created post_id

Like/Dislike Post : 

Request Type : PATCH
Route : /post/:type  
Params : Type (Like/Dislike)
Request-Headers : Refresh token, Access token
Request Body : PostId
Response : Status, Message

Comment on Post : 

Request Type : POST
Route : /post/comment 
Request-Headers : Refresh token, Access token
Request Body : Post Id, Comment
Response : Status, Comment, PostId

Get liked users on Post : 

Request Type : GET
Route : /post/liked-users/:type
Params : PostId
Response : Dictionary of post_id with Liked user Details #Username, UserId

Get liked users of all posts : 

Request Type : GET
Route : /post/all-liked-users 
Response : Dictionary of post_id with Liked user Details #Username, UserId

Get comments of user :

Request Type : GET
Route : /post/:user_id
Params : UserId
Response : Dictionary of post_id's with Comment and Post Title by an User

Get Access Token after Expiry :

Request Type : GET
Request Headers : Refresh token, UserId
Route : /user/me/access-token
Response : Status, Message
Response Header : Access token #Generated with refresh token
