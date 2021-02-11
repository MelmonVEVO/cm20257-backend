import bs4 as bs
from urllib.request import Request, urlopen
import json


def crawlRecipeList(url, pageList, timeList):
    req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    sauce = urlopen(req).read()
    soup = bs.BeautifulSoup(sauce, "lxml")
    for link in soup.find_all("a", class_="standard-card-new__article-title qa-card-link"):
        pageList.append(link.get("href"))
    for times in soup.find_all("div", class_="standard-card-new__additional-info"):
        timeList.append(times.text.replace("\n", "")[:26].strip())
    if soup.find("a", class_="pagination-arrow--next") is not None:
        crawlRecipeList("https://www.bbcgoodfood.com" + soup.find("a", class_="pagination-arrow--next").get("href"),
                        pageList)
    return pageList, timeList


def crawlRecipesInList(url):
    recipeDetails = []
    counter = 0
    recipeList, timesList = crawlRecipeList(url, [], [])
    print(len(timesList))
    for i in range(len(recipeList)):
        if recipeList[i] in included:
            print(i + 1, "/", len(recipeList))
            pass
        else:
            recipeDetails.append([])
            recipeDetails[counter].append(recipeList[i])  # Recipe Link
            req = Request(recipeList[i], headers={"User-Agent": "Mozilla/5.0"})
            sauce = urlopen(req).read()
            soup = bs.BeautifulSoup(sauce, "lxml")
            print(i + 1, "/", len(recipeList))
            recipeDetails[counter].append(soup.find("h1", class_="header__title").text)  # Recipe Title
            recipeDetails[counter].append(timesList[i])
            recipeDetails[counter].append(soup.find_all("img", class_="image__img")[2].get("src"))  # Image
            ingredientsList = []
            for ingredients in soup.find_all("li", class_="pb-xxs pt-xxs list-item list-item--separator"):
                ingredientsList.append(ingredients.text)
            recipeDetails[counter].append(ingredientsList)  # Ingredients as a String. Could be changed to an array
            counter += 1
    return recipeDetails


def update():
    global included
    included = []
    for j in range(len(data["recipes"])):
        included.append(data["recipes"][j]["Link"])
    recipeDetails = crawlRecipesInList("https://www.bbcgoodfood.com/recipes/collection/chinese-fakeaway-recipes")
    for i in range(len(recipeDetails)):
        try:
            data["recipes"].append(
                {"Link": recipeDetails[i][0], "Name": recipeDetails[i][1], "Time": recipeDetails[i][2],
                 "Image": recipeDetails[i][3], "Ingredients": recipeDetails[i][4]})
        except IndexError:
            pass


global data
data = {"recipes": []}

update()


with open("data.txt", "w") as file:
    json.dump(data, file)

for i in range(len(data["recipes"])):
    print(data["recipes"][i])

# Just need to add data to a csv db now
