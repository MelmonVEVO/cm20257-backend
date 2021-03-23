# Recipes

## Getting all recipes
Returning a list of all recipes is done by sending a **GET** request to `/recipes`.

## Recipe search
Searches for all recipes a user can make. Send a **POST** request to `/recipes/search`.

This will return a list of recipes in the form:
```json
{ "recipes": [
  {
    "title": "Smoked mackerel & leek hash with horseradish", "time": "30 mins",
    "ingredients": [
      {
        "name": "250g new potatoes , halved",
        "got": true
      },
      {
        "name": "2 tbsp oil",
        "got": false
      },
      {
        "name": "2 large leeks , thinly sliced",
        "got": false
      },
      {
        "name": "4 eggs",
        "got": false
      },
      {
        "name": "100g peppered smoked mackerel , skin removed",
        "got": false
      },
      {
        "name": "2 tbsp creamed horseradish",
        "got": true
      }
    ],
    "imageUrl": "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/smoked-mackerel-leek-hash-with-horseradish-dfb5430.jpg?quality=90&resize=440,400",
    "url": "https://www.bbcgoodfood.com/recipes/smoked-mackerel-leek-hash-horseradish"
    }
  ]
}
```