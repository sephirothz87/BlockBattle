(function() {
    // console.log("build 0001");

    var socket;
    //在线用户
    var onlineUsers = {};

    genUid = function() {
        return new Date().getTime() + "" + Math.floor(Math.random() * 899 + 100);
    }

    $(document).ready(function() {
        $("#button").click(function() {
            // console.log("button be clicked");

            // this.socket = io.connect('192.168.21.154:3000');
            socket = io.connect('192.168.21.154:3000');

            // $(window).keydown(function(event) {
            //     console.log(event);
            //     socket.emit('keydown', event);
            // });

            var userid = genUid();
            // console.log(userid);
            var obj_user = {
                userid: userid
            };
            socket.emit('join_game', obj_user);

            $(window).keydown(function(event) {
                if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40) {
                    // console.log(event);
                    // socket.emit('keydown', event);
                    socket.emit('keydown', event.keyCode);
                }
            });

            socket.on('join_game', function(obj) {
                // console.log(obj);
                onlineUsers = obj.onlineUsers;

                var html = "";

                for (user in obj.onlineUsers) {
                    html += "<div id='" + obj.onlineUsers[user]['userid'] + "' class='battle_block undisplay'></div>";
                    // console.log(user);
                }

                $("#battle_area").html(html);

                for (user in obj.onlineUsers) {
                    $("#" + obj.onlineUsers[user]['userid']).css({
                        'margin-top': obj.onlineUsers[user]['y'] + 'px',
                        'margin-left': obj.onlineUsers[user]['x'] + 'px',
                        'background-color': obj.onlineUsers[user]['color'],
                        'display': 'inherit'
                    });
                }
            });

            socket.on('exit_game', function(obj) {
                // console.log(obj);
                onlineUsers = obj.onlineUsers;

                var html = "";

                for (user in obj.onlineUsers) {
                    html += "<div id='" + obj.onlineUsers[user]['userid'] + "' class='battle_block undisplay'></div>";
                    // console.log(user);
                }

                $("#battle_area").html(html);

                for (user in obj.onlineUsers) {
                    $("#" + obj.onlineUsers[user]['userid']).css({
                        'margin-top': obj.onlineUsers[user]['y'] + 'px',
                        'margin-left': obj.onlineUsers[user]['x'] + 'px',
                        'background-color': obj.onlineUsers[user]['color'],
                        'display': 'inherit'
                    });
                }
            });

            socket.on('message', function(obj) {
                // console.log(obj);

                for (user in obj) {

                    // console.log(user);
                    // console.log(onlineUsers[user]);

                    $("#" + obj[user]['userid']).css({
                        'margin-top': obj[user]['y'] + 'px',
                        'margin-left': obj[user]['x'] + 'px'
                    });
                }
            });
        });

        $("#button2").click(function() {
            // console.log("button be clicked");
            // socket.emit('keydown', {
            //     'a': 1,
            //     'b': 2
            // });

            // var html = "<div id='' class='battle_block'></div>";
            // var canvas = document.getElementById('battle_area');
            // var context = canvas.getContext("2d");
            // context.fillStyle = "red";
            // context.fillRect(50, 50, 70, 70);

            var html = "";

            var num = 3;
            for (var i = 0; i < num; i++) {
                html += "<div id='id_" + i + "' class='battle_block undisplay'></div>";
                // html += "<div id='id_" + i + "' class='battle_block'></div>";
            }

            // console.log(html);

            var csss = [{
                'margin-top': '50px',
                'margin-left': '50px',
                'background-color': '#000000',
                'display': 'inherit'
            }, {
                'margin-top': '50px',
                'margin-left': '80px',
                'background-color': '#1C30CD',
                'display': 'inherit'
            }, {
                'margin-top': '150px',
                'margin-left': '50px',
                'background-color': '#36CD1C',
                'display': 'inherit'
            }];


            // $(".select_img").css({
            //     "height": (height + addH) + "px",
            //     "top": y + "px",
            //     //元の縦横比を維持
            //     "width": ((height + addH) * aspectRatioKuma) + "px"
            // });

            $("#battle_area").html(html);

            for (var i = 0; i < num; i++) {
                $("#id_" + i).css(csss[i]);
            }
        });

        $("#button3").click(function() {
            // console.log("button3 be clicked");
            socket.disconnect();
            $("#battle_area").html("");
        });
    });
})();
