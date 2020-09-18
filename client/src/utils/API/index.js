import axios from 'axios';

export default {
	// Get all number
	getAllNumber: function() {
		return axios.get('/number');
	},
	// Get the number with given ID
	getNumberById: function(id) {
		return axios.get('/number/' + id);
	},
	// Update the number with the given id to the given number
	updateNumber: function(id,numberData) {
		return axios.post('/number/' + id,numberData);
    },
    addNumber: function(numberData) {
        return axios.post('/number/add', numberData);
    }

};