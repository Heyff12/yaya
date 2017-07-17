//index.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp();

Page({
    data: {
        userInfo: {},
        telphone: '18328377176',
        time: util.formatTime(new Date()),
        address: '四川省成都市双流区天府大道南段2039号',
        address_jwd: {'latitude': 30.572269, 'longitude': 104.066541, 'scale': 28},
        cardList: [{
            cardId: '111111',
            cardExt: '{"code": "123456", "openid": "11111111111", "timestamp": "", "signature":""}'
        }, {
            cardId: '222222',
            cardExt: '{"code": "987654", "openid": "22222222222", "timestamp": "", "signature":""}'
        }],
        img_scan: ['http://b104.photo.store.qq.com/psb?/807a7329-31b8-4e6c-a21c-ce507779920d/oW0eZ5S5YrkjUwXliNsuzHRfsRyQ8*7mKcB3vblycYk!/b/dGgAAAAAAAAA&bo=gAJzBAAAAAAFB9E!&rf=viewer_4',
            'http://b345.photo.store.qq.com/psb?/807a7329-31b8-4e6c-a21c-ce507779920d/pWsXurTRoroWvviLi2DfLY4nFovBqa4fsYZl.ficjJU!/b/dFkBAAAAAAAA&bo=gAJzBAAAAAAFB9E!&rf=viewer_4',
            'http://b11.photo.store.qq.com/psb?/807a7329-31b8-4e6c-a21c-ce507779920d/y4zQWPVTBGOuVi4LPJmo9UmX2KCcPi2j7dWqUILjaX4!/b/dAsAAAAAAAAA&bo=gAJxBAAAAAAFB9M!&rf=viewer_4',
            'http://b386.photo.store.qq.com/psb?/807a7329-31b8-4e6c-a21c-ce507779920d/feRp3IOJSPL1FuY5g*9khYmyN*EIJ1CFmsxz47*bjds!/b/dHBJH.b3GQAA&bo=gAJyBIQDQAYFCB4!&rf=viewer_4',
            'http://b386.photo.store.qq.com/psb?/807a7329-31b8-4e6c-a21c-ce507779920d/2Vzgl6urp7Ijk7AWAne0rlp1MsxCEPEN3Kal7qyE8zo!/b/dGqpGub5GQAA&bo=cQSAAgAAAAABB9c!&rf=viewer_4',
            'http://b395.photo.store.qq.com/psb?/807a7329-31b8-4e6c-a21c-ce507779920d/tNwAp3g3cI1gKZvCJoXbfrDWH0Kb0GqZoxafmQlnUOU!/b/dA36eutkKgAA&bo=gAJxBAAAAAABB9c!&rf=viewer_4',
            'http://b395.photo.store.qq.com/psb?/807a7329-31b8-4e6c-a21c-ce507779920d/xvRZ6EsXo1afvLnUDRbF7q1QO1d2fo1DKlhSAJsqDss!/b/dFtjc.vOGQAA&bo=VQOAAgAAAAABB*Q!&rf=viewer_4',
            'http://b269.photo.store.qq.com/psb?/807a7329-31b8-4e6c-a21c-ce507779920d/mAbd.ZaaYaK6xvf0tcOYH05emkvFxwOPUbYamSMMnRM!/b/dLBUXKCkJwAA&bo=WAIgAwAAAAABB1k!&rf=viewer_4',
            'http://b269.photo.store.qq.com/psb?/807a7329-31b8-4e6c-a21c-ce507779920d/sWnN2h4WTBrab3S9lkuz3eSWBDgLRoRFnduVd6fpHjc!/b/dKMCZKBPIQAA&bo=IANYAgAAAAABB1k!&rf=viewer_4'
        ],
    },
    onLoad: function() {
        var that = this
        //调用应用实例的方法获取全局数据
        var infos = wx.getStorageSync('userInfo') || [1];
        if (!infos.length) {
            console.log('info--loc');
            this.setInfo(infos);
        } else {
            console.log('info--diao');
            app.getUserInfo(function(userInfo) {
                that.setInfo(userInfo);
            });
        }
        //获取地理位置------取消
        // wx.getLocation({
        //     type: 'gcj02',
        //     success: function(res) {
        //         console.log(res);
        //         var latitude = res.latitude
        //         var longitude = res.longitude
        //         var speed = res.speed
        //         var accuracy = res.accuracy
        //         var addr = {
        //             latitude: latitude,
        //             longitude: longitude,
        //             scale: 28
        //         };
        //         that.setData({
        //             address_jwd: addr
        //         });
        //         wx.chooseLocation({
        //             latitude: latitude,
        //             longitude: longitude,
        //             success: function(res) {
        //                 console.log(res);
        //                 that.setData({
        //                     address: res.address
        //                 });
        //             }
        //         });
        //     }
        // });
        //创建卡券--无效
        // var cardlist = this.data.cardList;
        // wx.addCard({
        //     cardList: cardlist,
        //     success: function(res) {
        //         console.log(res.cardList) // 卡券添加结果
        //     }
        // })
    },
    //设置userinfo信息和标题
    setInfo: function(info) {
        this.setData({
            userInfo: info
        })
        wx.setNavigationBarTitle({
            title: info.nickName + '的名片'
        })
    },
    //点击查看地图
    onMap: function() {
        var addr = this.data.address_jwd;
        console.log(addr);
        wx.openLocation(addr)
    },
    //点击看大图头像
    onImgHead: function(e) {
        var src = e.currentTarget.dataset.src;
        wx.previewImage({
            current: src, // 当前显示图片的http链接
            urls: [src] // 需要预览的图片http链接列表
        })
    },
    //点击看大图头像
    onImgList: function(e) {
        var src = e.currentTarget.dataset.src;
        var url_list = this.data.img_scan;
        wx.previewImage({
            current: src, // 当前显示图片的http链接
            urls: url_list // 需要预览的图片http链接列表
        })
    },
    //点击拨打电话
    onTel: function() {
        var tel = this.data.telphone;
        wx.makePhoneCall({
            phoneNumber: tel //仅为示例，并非真实的电话号码
        })
    },
    onShareAppMessage: function(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '丫丫名片设计',
            path: '/pages/index/index',
            success: function(res) {
                // 转发成功
                console.log(res)
            },
            fail: function(res) {
                // 转发失败
                console.log(res)
            }
        }
    },
    //查看卡券---没有效果
    onCard: function() {
        var cardlist = this.data.cardList;
        wx.openCard({
            cardList: cardlist,
            success: function(res) {
                console.log(res);
            }
        })
    },
})