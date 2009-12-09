var sys = require("sys");

var dbproc = process.createChildProcess("bash");
dbproc.queue = [];
dbproc.callback = null;
dbproc.buffer = "";

dbproc.addListener("output", function (data) {
	this.buffer += data;
	if (this.buffer.indexOf("<<<<done>>>>") > -1) {
		var tmpBuffer = this.buffer.replace(/<<<<done>>>>[\r\n*]/, "");
		this.buffer = "";
		var callback = this.callback;
		this.callback = null;
		callback(tmpBuffer);
		this.processQueue();
	}
});

dbproc.addListener("error", function (data) {
	  sys.puts("dbproc:error: " + data);
	});

dbproc.addListener("exit", function (data) {
	  sys.puts("dbproc:exit: " + data);
	});

dbproc.processQueue = function processQueue () {
	if (this.callback)
		return;
	if (!this.queue.length)
		return;
	var queueItem = this.queue.shift();
	this.callback = queueItem[1];
	this.write(queueItem[0] + ";echo \"<<<<done>>>>\"\n");
}

dbproc.addCommand = function addCommand (command, callback) {
	this.queue.push([command, callback]);
	this.processQueue();
}

dbproc.addCommand("sqlite3 test.db \"create table t1 (t1key INTEGER PRIMARY KEY,data TEXT,num double,timeEnter DATE);\"", function (result) {
});
dbproc.addCommand("sqlite3 test.db \"insert into t1 (data,num) values ('This is sample data',3);\"", function (result) {
});
dbproc.addCommand("sqlite3 test.db \"insert into t1 (data,num) values ('More sample data',6);\"", function (result) {
});
dbproc.addCommand("sqlite3 test.db \"insert into t1 (data,num) values ('And a little more',9);\"", function (result) {
});
dbproc.addCommand("sqlite3 test.db  \"select * from t1 limit 2;\"", function (result) {
	sys.puts(result);
});

