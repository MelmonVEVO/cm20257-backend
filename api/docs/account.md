# Account

## Account creation
Accounts are created by sending a **POST** request to `/account/create`.

### Example request
`{"username":"test","password":"test"}`
If successful, HTTP 204 status code will be returned.

## Account login
Logins are done by sending a **POST** request to `/account/login`.

### Example request
`{"username":"test","password":"test"}`
If successful, HTTP 200 will be returned along with a token to be used in further requests to prove a user is authenticated e.g.
`{"token": "f74d685c-8942-47ec-acc0-5b413dcf3fd6:87d8f3a417baca84cc59ae842f27e467576279024e843ffc6364e70ba7203f0022db7f7b37e04b52a9e0257f03f4117a19190641db195e046666df0e8f98c3b1"}`

**NOTE:** For the below endpoints, all requests must include the **token** header with the value returned when the login was made. If this header isn't present, or is invalid, all requests will fail.

## Get all food
Sending a **GET** request to `/account/food` will return all of the food a user has.

### Example request
Sending a successful request will get a HTTP 200 response in the following format (a JSON array of objects):
`[{"id":100,"name":"test item 1","quantity":12,"quantityType":"kg","expiryDate":"20-10-21"}]`

## Add a food item
Adding a food item for a given user is done by sending a **POST** request to `/account/add-food`.

### Example request
`{"name":"test food","quantity":12, "quantityType":"kg","expiryDate":"20-10-21"}`
If successful, HTTP 200 will be returned along with the unique id for that food entry (used when updating or deleting it).
`{"id":100}`

## Delete a food item
Deleting a food item for a given user is done by sending a **POST** reqest to `/account/delete-food`.

### Example request
`{"id":100}`
If successful, HTTP 204 will be returned.

## Add favourite
Favourite a recpie so it can be revisted/saved for later. This is done by sending a **POST** request to `/account/add-favourite`.

### Example request
`{"recipe":100}` where the recpie attribute is the unique ID for that recipe.
If successful, HTTP 200 will be returned with the response `{"favourite":200}` where favourite is the unique ID for that saved food item.

## Delete favourite
Deleting a favourite is done by sending a **POST** request to `/account/delete-favourite`.

### Example request
`{"favourite":200}` where the favourite attribute is the unique ID for that favourite recipe. If successful, HTTP 201 will be returned.

## Get favourites
Getting all favourites by a user is done by sending a **GET** request to `/account/favourites`. If successful, HTTP 200 will be returned along with the response in the following format `[{"id":200,"title":"Test recipe","time":"20 Mins","ingredients":["test item 1", "test item 2"], "imageUrl":"url","url":"url"}]`