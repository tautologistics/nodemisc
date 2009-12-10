var sys = require("sys");

var count = 50000;

function FastQueue () {
	this.head = null;
	this.tail = null;
}
FastQueue.prototype.push = function FastQueue__push (data) {
	var item = { data: data, prev: null, next: null  };
	if (!this.head)
		this.head = item;
	if (this.tail) {
		this.tail.next = item;
		item.prev = this.tail;
	}
	this.tail = item;
}
FastQueue.prototype.pop = function FastQueue__pop () {
	var item = null;
	if (this.tail) {
		item = this.tail;
		this.tail = item.prev;
		if (this.tail)
			this.tail.next = null;
		if (this.head === this.tail)
			this.tail = null;
	} else if (this.head) {
		item = this.head;
		this.head = null;
	}
	return(item ? item.data : null);
}
FastQueue.prototype.unshift = function FastQueue__unshift (data) {
	var item = { data: data, prev: null, next: null  };
	if (this.head) {
		this.head.prev = item;
		item.next = this.head;
		if (!this.tail)
			this.tail = this.head;
	}
	this.head = item;
}
FastQueue.prototype.shift = function FastQueue__shift () {
	if (!this.head)
		return(null);
	var item = this.head;
	this.head = item.next;
	if (this.head)
		this.head.prev = null;
	if (!this.head || !this.head.next)
		this.tail = null;
	return(item.data);
}

var result;

var data = [];

var data_fq = new FastQueue();

var start;

/*************** Push ***************/
start = new Date();
for (var i = 0; i < count; i++)
	data.push(i);
var end_push = new Date() - start;

start = new Date();
for (var i = 0; i < count; i++)
	data_fq.push(i);
var end_push_fq = new Date() - start;

/*************** Shift ***************/
start = new Date();
while (data.length) {
	result = data.shift();
//	sys.puts("Shift: " + result);
}
var end_shift = new Date() - start;

start = new Date();
while (true) {
	result = data_fq.shift();
	if (result == null)
		break;
//	sys.puts("Shift FQ: " + result);
}
var end_shift_fq = new Date() - start;

/*************** Unshift ***************/
start = new Date();
for (var i = 0; i < count; i++)
	data.unshift(i);
var end_unshift = new Date() - start;

start = new Date();
for (var i = 0; i < count; i++)
	data_fq.unshift(i);
var end_unshift_fq = new Date() - start;

/*************** Pop ***************/
start = new Date();
while (data.length) {
	result = data.pop();
//	sys.puts("Shift: " + result);
}
var end_pop = new Date() - start;

start = new Date();
while (true) {
	result = data_fq.pop();
	if (result == null)
		break;
//	sys.puts("Shift FQ: " + result);
}
var end_pop_fq = new Date() - start;

/*************** Concat ***************/
//start = new Date();
//for (var i = 0; i < count; i++)
//	data = [i].concat(data);
//var end_concat = new Date() - start;

sys.puts("Push: " + end_push);
sys.puts("Push FQ: " + end_push_fq);
sys.puts("Shift: " + end_shift);
sys.puts("Shift FQ: " + end_shift_fq);
sys.puts("Unshift: " + end_unshift);
sys.puts("Unshift_fq: " + end_unshift_fq);
sys.puts("Pop: " + end_pop);
sys.puts("Pop FQ: " + end_pop_fq);
//sys.puts("Concat: " + end_concat);

