/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0dgn3bi7e2d3r9h")

  collection.listRule = "user.id = @request.auth.id ||\nassignment.class.owner.id = @request.auth.id"
  collection.viewRule = "user.id = @request.auth.id ||\nassignment.class.owner.id = @request.auth.id"
  collection.createRule = "assignment.class.students ?= @request.auth.id"
  collection.updateRule = "user.id = @request.auth.id ||\nassignment.class.owner.id = @request.auth.id"
  collection.deleteRule = "user.id = @request.auth.id ||\nassignment.class.owner.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0dgn3bi7e2d3r9h")

  collection.listRule = "user.id = @request.auth.id"
  collection.viewRule = "user.id = @request.auth.id"
  collection.createRule = ""
  collection.updateRule = "user.id = @request.auth.id"
  collection.deleteRule = "user.id = @request.auth.id"

  return dao.saveCollection(collection)
})
