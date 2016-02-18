var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.send('<h1>Welcome BlockBattle</h1>');
});

//在线用户
var onlineUsers = {};
//当前在线人数
var onlineCount = 0;

var ii = 0;

myInterval = function() {
    // ii++;
    // console.log(ii);
    // io.emit('message', ii);
    io.emit('message', onlineUsers);
}

getRandomColor = function() {
    return '#' + (Math.random() * 0xffffff << 0).toString(16);
}

io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('keydown', function(obj) {
        console.log("on keydown");
        console.log(obj);

        switch (obj) {
            case 37:
                if (onlineUsers[socket.name]['x'] > 0) {
                    onlineUsers[socket.name]['x'] -= 1;
                }
                break;
            case 38:
                if (onlineUsers[socket.name]['y'] > 0) {
                    onlineUsers[socket.name]['y'] -= 1;
                }
                break;
            case 39:
                if (onlineUsers[socket.name]['x'] < 180) {
                    onlineUsers[socket.name]['x'] += 1;
                }
                break;
            case 40:
                if (onlineUsers[socket.name]['y'] < 180) {
                    onlineUsers[socket.name]['y'] += 1;
                }
                break;
        }
    });

    //监听新用户加入
    socket.on('join_game', function(obj) {
        //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
        socket.name = obj.userid;

        console.log();

        //检查在线列表，如果不在里面就加入
        if (!onlineUsers.hasOwnProperty(obj.userid)) {
            // onlineUsers[obj.userid] = obj.userid;
            onlineUsers[obj.userid] = {
                userid: socket.name,
                color: getRandomColor(),
                x: parseInt(Math.random() * 180),
                y: parseInt(Math.random() * 180)
            };
            //在线人数+1
            onlineCount++;
        }

        //向所有客户端广播用户加入
        io.emit('join_game', {
            onlineUsers: onlineUsers,
            onlineCount: onlineCount,
            user: obj
        });
        console.log(obj.userid + '加入了游戏');
    });

    //监听用户退出
    socket.on('disconnect', function() {
        //将退出的用户从在线列表中删除
        if (onlineUsers.hasOwnProperty(socket.name)) {
            //退出用户的信息
            var obj = {
                userid: socket.name
            };

            //删除
            delete onlineUsers[socket.name];
            //在线人数-1
            onlineCount--;

            //向所有客户端广播用户退出
            io.emit('exit_game', {
                onlineUsers: onlineUsers,
                onlineCount: onlineCount,
                user: obj
            });
            console.log(obj.userid + '退出了游戏');
        }
        console.log('disconnect');
    });

    //监听用户发布聊天内容
    socket.on('message', function(obj) {
        //向所有客户端广播发布的消息
        io.emit('message', obj);
        console.log(obj.username + '说：' + obj.content);
    });

});

http.listen(3000, function() {
    console.log('listening on *:3000');

    setInterval(myInterval, 10); //1000为1秒钟
});
