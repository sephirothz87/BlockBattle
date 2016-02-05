(function() {
    console.log("build 0001");

    var socket;
    //在线用户
    var onlineUsers = {};

    genUid = function() {
        return new Date().getTime() + "" + Math.floor(Math.random() * 899 + 100);
    }

    $(document).ready(function() {
        $("#button").click(function() {
            console.log("button be clicked");

            // this.socket = io.connect('192.168.21.154:3000');
            socket = io.connect('192.168.21.154:3000');

            // $(window).keydown(function(event) {
            //     console.log(event);
            //     socket.emit('keydown', event);
            // });

            var userid = genUid();
            console.log(userid);
            var obj_user = {
                userid: userid
            };
            socket.emit('join_game', obj_user);

            $(window).keydown(function(event) {
                if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40) {
                    console.log(event);
                    // socket.emit('keydown', event);
                    socket.emit('keydown', event.keyCode);
                }
            });

            socket.on('join_game', function(obj) {
                console.log(obj);
                onlineUsers = obj.onlineUsers;
            });

            socket.on('exit_game', function(obj) {
                console.log(obj);
                onlineUsers = obj.onlineUsers;
            });

            socket.on('message', function(obj) {
                console.log(obj);
            });
        });

        $("#button2").click(function() {
            // console.log("button be clicked");
            // socket.emit('keydown', {
            //     'a': 1,
            //     'b': 2
            // });

            // var html = "<div id='' class='battle_block'></div>";
            var canvas = document.getElementById('battle_area');
            var context = canvas.getContext("2d");
            context.fillStyle = "red";
            context.fillRect(50, 50, 70, 70);
        });

        $("#button3").click(function() {
            console.log("button3 be clicked");
            socket.disconnect();
        });
    });
})();
