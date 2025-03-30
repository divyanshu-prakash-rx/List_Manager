from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
import os
from dotenv import load_dotenv
load_dotenv()
app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = os.getenv("MONGO_URI", "mongodb://localhost:27017/listdb")
mongo = PyMongo(app)

db = mongo.db.persons  

@app.route('/person', methods=['GET'])
def get_all_persons():
    persons = list(db.find())
    for person in persons:
        person['_id'] = str(person['_id']) 
    return jsonify(persons)

@app.route('/person/<id>', methods=['GET'])
def get_person(id):
    person = db.find_one({"_id": ObjectId(id)})
    if not person:
        return jsonify({"message": "Person not found"}), 404
    person['_id'] = str(person['_id'])
    return jsonify(person)

@app.route('/person', methods=['POST'])
def add_person():
    data = request.json
    if not all(k in data for k in ("name", "age", "gender", "mobileNumber")):
        return jsonify({"message": "Missing fields"}), 400
    
    new_person = db.insert_one(data)
    return jsonify({"_id": str(new_person.inserted_id), **data}), 201

@app.route('/person/<id>', methods=['PUT'])
def update_person(id):
    data = request.json
    data.pop('_id', None)  

    updated = db.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set": data},
        return_document=True
    )
    if not updated:
        return jsonify({"message": "Person not found"}), 404
    
    updated['_id'] = str(updated['_id']) 
    return jsonify(updated)

@app.route('/person/<id>', methods=['DELETE'])
def delete_person(id):
    deleted = db.find_one_and_delete({"_id": ObjectId(id)})
    if not deleted:
        return jsonify({"message": "Person not found"}), 404
    return jsonify({"message": "Person deleted"})

if __name__ == '__main__':
    app.run(debug=True)
