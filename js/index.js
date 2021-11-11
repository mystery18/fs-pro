$(function () {

    ! function (e) {
        e.fn.slideCarsousel = function (t) {
                t = e.extend({}, e.fn.slideCarsousel.defaultSetting, t);
                var i = e(this),
                    n = i.children("ul.item-list"),
                    r = n.children(),
                    s = {
                        slideCarousel: i,
                        count: r.length,
                        ul: n,
                        liList: r,
                        currentIndex: 0,
                        indicatorList: i.children(".indicator-list").children("a"),
                        itemPrev: i.children(".controls").children(".item-prev"),
                        itemNext: i.children(".controls").children(".item-next"),
                        itemClassArr: [],
                        init: function () {
                            for (var e = 0, t = s.count; e < t; e++)
                                s.itemClassArr.push("item" + e);
                            s.slideAutoChange()
                        },
                        slideAutoChange: function () {
                            t.isAutoChange && (t.slideInterval = setInterval(function () {
                                s.toNext()
                            }, t.direction))
                        },
                        toNext: function () {
                            s.itemClassArr.unshift(s.itemClassArr[s.count - 1]),
                                s.itemClassArr.pop(),
                                s.currentIndex++,
                                s.currentIndex = s.currentIndex >= s.count ? 0 : s.currentIndex,
                                s.resetItemClass()
                        },
                        toPrev: function () {
                            s.itemClassArr.push(s.itemClassArr[0]),
                                s.itemClassArr.shift(),
                                s.currentIndex--,
                                s.currentIndex = s.currentIndex < 0 ? s.count - 1 : s.currentIndex,
                                s.resetItemClass()
                        },
                        processIndicatorEvent: function (t) {
                            var i = t - s.currentIndex;
                            if (0 != i) {
                                if (s.currentIndex = t,
                                    i > 0) {
                                    n = s.itemClassArr.splice(s.itemClassArr.length - i);
                                    return s.itemClassArr = e.merge(n, s.itemClassArr),
                                        void s.resetItemClass()
                                }
                                if (i < 0) {
                                    var n = s.itemClassArr.splice(0, -i);
                                    return s.itemClassArr = e.merge(s.itemClassArr, n),
                                        void s.resetItemClass()
                                }
                            }
                        },
                        resetItemClass: function () {
                            e.each(s.liList, function (t, i) {
                                    e(i).removeClass().addClass(s.itemClassArr[t])
                                }),
                                s.indicatorList.removeClass("selected").eq(s.currentIndex).addClass("selected"),
                                s.processCallbackFunc(s.currentIndex)
                        },
                        processCallbackFunc: function (e) {
                            null != t.callbackFunc && void 0 != t.callbackFunc && t.callbackFunc(e)
                        }
                    };
                switch (s.init(),
                    s.itemNext.click(function () {
                        s.toNext()
                    }),
                    s.itemPrev.click(function () {
                        s.toPrev()
                    }),
                    t.indicatorEvent) {
                    case "click":
                        s.indicatorList.click(function () {
                            s.processIndicatorEvent(e(this).attr("data-slide-index"))
                        });
                        break;
                    case "mouseover":
                        s.indicatorList.mouseover(function () {
                            s.processIndicatorEvent(e(this).attr("data-slide-index"))
                        })
                }
                switch (t.slideType) {
                    case "2d":
                        break;
                    case "3d":
                        s.ul.on("click", ".item1 img", function () {
                                s.toPrev()
                            }),
                            s.ul.on("click", ".item3 img", function () {
                                s.toNext()
                            })
                }
                s.slideCarousel.mouseover(function () {
                    clearInterval(t.slideInterval)
                }).mouseleave(function () {
                    s.slideAutoChange()
                })
            },
            e.fn.slideCarsousel.defaultSetting = {
                slideInterval: "slideInterval",
                // isAutoChange: !0,
                direction: 5e3,
                callbackFunc: null,
                indicatorEvent: "click",
                slideType: "2d"
            }
    }(jQuery);


    var winw = $(window).width();
    // 图片预加载到data-original
    function minisiteReplaceImgLazyLoad(els) {
        function init() {
            if (els.length > 0) {
                var win_w = $(window).width();
                els.each(function () {
                    var $this = $(this);
                    var src = $this.attr("src");
                    var img600 = $this.data("wap");
                    if (win_w < 600) {
                        $this.attr('data-original', img600 || src);
                    }
                });
            };
        }
        //对外重新初始化
        $("body").on("minisiteReplaceImgLazyLoad", function () {
            init();
        });
        init();
    }

    function bannerIngVideo() {
        if (winw < 1200) {
            var imgs = $('.banner-v2 .J-minisite-replace-img-lazyload');
            minisiteReplaceImgLazyLoad(imgs);
            imgs.attr('src', imgs.data("original"));
            imgs.removeClass('imgWaitingLoading')
            imgs.parent().addClass('over')
        } else {
            var banenVideo = $('.banner-v2 .video');
            banenVideo.attr('src', banenVideo.data('src'));
        }

    }
    bannerIngVideo();

    // $(window).on('resize', function () {
    // 	winw = $(window).width();
    // 	bannerIngVideo();
    // })

    if (winw > 1200) {

        // 设置定位位置
        $('.global-share .pop-up-layer').css('top', -($('.global-share .pop-up-layer').height() / 2 - 20));

        // 复制Url链接
        $('.global-share .J-copy-link').on('click', function () {
            copyUrl($(this));
            //出现提示
            $('.global-share .pop-up-layer .con .copy-link .success').fadeIn(200);
            setTimeout(function () {
                $('.global-share .pop-up-layer .con .copy-link .success').fadeOut(200);
            }, 400);

        });

        function copyUrl(obj) {
            if ($('#urlText').length == 0) {
                // 创建input
                obj.after('<input id="urlText" style="position:fixed;top:-200%;left:-200%;" type="text" value=' + window.location.href + '>');
            }
            $('#urlText').select(); //选择对象
            document.execCommand("Copy"); //执行浏览器复制命令
        }
    }





    var divs = $(".index-main").find(".contents");
    if (winw <= 1000) {
        var flag = true;
        var wrapLis = $(".menue-wrap").find("li");
        wrapLis.on("click", function () {
            $(this).addClass("active")
            $(this).siblings().removeClass("active");
            $(".menue-wrap").slideToggle();
            flag2 = !flag2;
            $(".wap_navbtn").removeClass("close");

            var index = $(this).index();
            var H = divs[index].offsetTop - 50;
            $('html,body').animate({
                scrollTop: H
            }, 500);
        });
        var flag2 = true;
        $(".wap_navbtn").on("click", function () {
            var wHeight = $(window).height();
            $(".menue-wrap").css("height", wHeight)
            if (flag2) {
                // $(this).removeClass("close");
                $(".menue-wrap").slideDown();
                flag2 = !flag2;
            } else {
                // $(this).addClass("close");
                $(".menue-wrap").slideUp();
                flag2 = !flag2;
            }
        })
    }



    if (winw <= 768) {

        var gSwiper = new Swiper('.speakers-box-wap', {
            slidesPerView: 1,
            pagination: '.speakers-v6 .pagination-ul',
            autoHeight: true,
            spaceBetween: 20
        });

    }


    var _videoList = document.getElementsByClassName("video-item");
    $('#slide3d').slideCarsousel({
        slideType: '3d',
        indicatorEvent: 'mouseover',
        callbackFunc: function () {

            // 待有多个视频后再上线
            for (var i = 0; i < _videoList.length; i++) {
                var subVideo = _videoList[i].getElementsByTagName("video")[0];
                subVideo ? subVideo.pause() : console.log("false");
            }
            var curVideo = document.getElementsByClassName("item2")[0].getElementsByTagName("video")[0];
            curVideo ? curVideo.play() : console.log("current video false");

        }
    });

    // if(subVideo){
    //     subVideo.pause();
    // }else{
    //     console.log("false")
    // }

    $('.sidebar .top').on('click', function () {
        $('body,html').animate({
            'scrollTop': 0
        });
        $('#pc-nav>ul>li').each(function () {
            $(this).removeClass('current')
        })

    })


    $(window).scroll(function () {
        var htmlScrollT = $(document).scrollTop();
        if (htmlScrollT > 100) {
            $(".sidebar").fadeIn();
        } else if (htmlScrollT < 50) {
            $('#pc-nav>ul>li').each(function () {
                $(this).removeClass('current')
            })
        } else {
            $(".sidebar").fadeOut();
        }
    })


})