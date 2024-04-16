/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nhw6ypncnytbys5")

  collection.listRule = "class.owner.id = @request.auth.id || class.students.id ?= @request.auth.id"
  collection.viewRule = "class.owner.id = @request.auth.id || class.students.id ?= @request.auth.id"
  collection.createRule = "class.owner.id = @request.auth.id"
  collection.updateRule = "class.owner.id = @request.auth.id"
  collection.deleteRule = "class.owner.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nhw6ypncnytbys5")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
