/* jshint browser:true */
/* global define:true */
define([
	"socketio",
	"backbone",
	"underscore",
	"jquery",
	"space-view",
	"space-model",
	"text!../../templates/board.html"
],
function (socketio, Backbone, _, $, SpaceView, SpaceModel, boardHtml) {
	"use strict";

	return Backbone.View.extend({

		el: "#board-view",

		template: _.template(boardHtml),

		initialize: function() {
			var socket = socketio.connect();
			socket.on("anevent", function(data) {
				console.log("data: " + data);
			});
		},

		render: function() {
			// first render the tic tac toe board
			this.$el.html(this.template());

			// then render each row
			this.renderRow(1, "#ttt-row-1");
			this.renderRow(2, "#ttt-row-2");
			this.renderRow(3, "#ttt-row-3");

			return this;
		},

		renderRow: function(row, selectorExpression) {
			var rowSelector, i;

			rowSelector = $(selectorExpression);
			for (i=0;i<3;i++) {
				this.addSpace(row + "-" + (i+1), rowSelector);
			}
		},

		addSpace: function(spaceID, rowSelector) {
			// each space on the board has a model associated,
			// which contains the data on that specific space
			var spaceModel = new SpaceModel({spaceID: spaceID});
			var spaceView = new SpaceView({model: spaceModel});
			rowSelector.append(spaceView.render().el);
		}
	});
});