$(function () {
    //0.自定义滚动条  mCustomScrollbar
    $('content_list').mCustomScrollbar()

    var $audio = $("audio");
    var player = new Player($audio);
    var $bar=$('.bar');
    var $line=$('.line');
    var $dot=$('dot');
    var progress=new Progress($bar,$line,$dot)

    //1.加载歌曲列表
    getPlayerList();

    function getPlayerList() {
        $.ajax({
            url: "",
            dataType: "json",
            success: function (data) {
                player.musicList = data;
                var $musicList = $("content_list ul")
                $.each(data, function (index, ele) {
                    var $item = createMusicItem(index, ele);
                    $musicList.append($item);
                }),
                initMusicInfo(data[0]);
            },
            error: function (e) {

            }
        })
    }

    function initMusicInfo(music){
         $musicImg=$('.');
         $musicImg.attr("src",music.cover);
         $musicName.text(music.name);
         $musicProgressName.text(music.name+' / '+music.singer);
         $musicBg.css("background","url('"+music.cover+"')");
    }

    //切换歌曲里面
        initMusicInfo($item.get(0).music);

    function createMusicItem(index, music) {
        var $item = $("<div>.......<div class='list_music_del'></div>");
        $item.get(0).index = index;
        $item.get(0).music = music;
        return $item;
    }

    //初始化事件监听
    initEvents();

    function initEvents() {
            $("").delegate("", "click", function () {
            var $item = $(this).parents("")

            /*  console.log($item.get(0).index);
             console.log($item.get(0).music); */

           
            player.playMusic($item.get(0).index, $item.get(0).music)
        })

    }
    var $musciPlay = $(".music_play")
    //监听底部控制区域播放按钮点击

    $musciPlay.click(function() {
        if (play.currentIndex == -1) {
            $('.list_music').eq(0).find(".list_menu_play").trigger("click")
        } else {
            $('.list_music').eq(player.currentIndex).find(".list_menu_play").trigger("click")
        }
    })
    //监听底部控制区域上一首按钮点击
    $().click(function () {
       
        $('.list_music').eq(player.preIndex()).find(".list_menu_play").trigger("click")
    })
   
    $(".music_next").click(function () {
        $('.list_music').eq(player.nextIndex()).find(".list_menu_play").trigger("click")
    })

  
    $('.content_list').delegate(".list_music_del", "click", function () {
     
        var $item = $(this).parents(".list_music");
        
  
        if ($item.get(0).index == currentIndex) {
            $(".music_next").trigger("click");
        }
      
   
        $item.remove();
        player.changeMusic($item.get(0).index);

      
        $('.list_music').each(function (index, ele) {
            ele.index = index;
            $(ele).find(".list_number").text(index + 1);
        })


    })


  
    $(".list_music").hover(function () {
        //find()
        $(this).find("list_menu").stop().fadeIn(100);
        $(this).find("list_time a").stop().fadeIn(100);
    }, function () {
        $(this).find("list_menu").stop().fadeOut(100);
        $(this).find("list_time a").stop().fadeOut(100);
    })
  
    $('.list_check').click(function () {
        alert(123);
        $(this).toggleClass("list_checked");
    })





})