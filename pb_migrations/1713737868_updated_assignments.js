/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nhw6ypncnytbys5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4z2g79of",
    "name": "due",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nhw6ypncnytbys5")

  // remove
  collection.schema.removeField("4z2g79of")

  return dao.saveCollection(collection)
})
