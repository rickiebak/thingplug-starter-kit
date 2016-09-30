var util = require('util');
var EventEmitter = require('events').EventEmitter;
var mqtt = require('mqtt');

var MQTTClient = function(config){
  if(!(this instanceof MQTTClient)){
    return new MQTTClient(config);
  }
  var self = this;

  var client = mqtt.connect(config.mqtt);
	client.on('connect', function () {
		console.log('### mqtt connected ###');
		client.subscribe(config.mqttSubTopic + config.nodeID);
	});
  client.on('close', function(){
		console.log('### mqtt disconnected ###');
  });

	client.on('error', function(error){
    self.emit('error', error);
  });

	client.on('message', function(topic, message){
    self.emit('message', topic, message);
  });
  EventEmitter.call(this);
};
util.inherits(MQTTClient, EventEmitter);

module.exports = MQTTClient;
