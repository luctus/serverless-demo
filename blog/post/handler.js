'use strict';

var doc = require('dynamodb-doc');
var dynamo = new doc.DynamoDB();

module.exports.handler = function(event, context, cb) {
  console.log('Received event:', JSON.stringify(event, null, 2));
  if(event.tableName){
    event.payload.TableName = event.tableName;
  }

  switch(event.operation){
    case 'create':
      var uuid = require('node-uuid');
      event.payload.Item.postId = uuid.v1();
      dynamo.putItem(event.payload, context.done);
      break;
    case 'read':
      dynamo.getItem(event.payload, context.done);
      break;
  }
};
