/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0dgn3bi7e2d3r9h")

  collection.createRule = "assignment.class.students.id ?= @request.auth.id &&\nuser.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0dgn3bi7e2d3r9h")

  collection.createRule = "assignment.class.students ?= @request.auth.id &&\nuser.id = @request.auth.id"

  return dao.saveCollection(collection)
})
