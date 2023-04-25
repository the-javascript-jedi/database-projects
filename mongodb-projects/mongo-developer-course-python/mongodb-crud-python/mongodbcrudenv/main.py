# #  uvicorn main:app --reload
from fastapi import FastAPI
import pymongo
from pymongo import MongoClient
connection = MongoClient()
my_client=MongoClient("mongodb://localhost:27017")
print("my_client",my_client)
print("my_client.list_database_names()",my_client.list_database_names())
db=my_client['test']
print("db",db)

# specify the available collections
print("db.list_collection_names()",db.list_collection_names())
# Access a specific collection within the database
users_col=db['users']
print("users_col",users_col)

##############Create#############
users_col.insert_one({"name":"Sam Smith","age":29})

new_user={
    "name":"Keanu Reeves",
    "age":57
}
users_col.insert_one(new_user)

##############Read#############
users_find_one=users_col.find_one({"name":"Sam Smith"})
print("users_find_one",users_find_one)

new_user_find={
    "name":"Keanu Reeves",
    "age":57
}
users_find_one_by_dictionary=users_col.find_one(new_user_find)
print("users_find_one_by_dictionary",users_find_one_by_dictionary)

##############Update#############
users_col.update_one({"name":"Sam Smith"},{"$set":{"name":"Will Smith","age":53}})

##############Delete#############
# delete single user
users_col.delete_one({"name":"Will Smith"})
# delete many users
users_col.delete_many({})


app=FastAPI()