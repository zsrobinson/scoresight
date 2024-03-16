/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("arpz5nx8qnhex37")

  collection.listRule = "owner.id = @request.auth.id || students.id ?= @request.auth.id"
  collection.viewRule = "owner.id = @request.auth.id || students.id ?= @request.auth.id"
  collection.createRule = ""
  collection.updateRule = "owner.id = @request.auth.id"
  collection.deleteRule = "owner.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("arpz5nx8qnhex37")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
