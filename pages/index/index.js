//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        userInfo: {},
        telphone: '18328377176',
        time: new Date(),
        address: {},
        address_jwd: {},
        img_scan: ['http://b104.photo.store.qq.com/psb?/807a7329-31b8-4e6c-a21c-ce507779920d/oW0eZ5S5YrkjUwXliNsuzHRfsRyQ8*7mKcB3vblycYk!/b/dGgAAAAAAAAA&bo=gAJzBAAAAAAFB9E!&rf=viewer_4', 'http://b345.photo.store.qq.com/psb?/807a7329-31b8-4e6c-a21c-ce507779920d/pWsXurTRoroWvviLi2DfLY4nFovBqa4fsYZl.ficjJU!/b/dFkBAAAAAAAA&bo=gAJzBAAAAAAFB9E!&rf=viewer_4', 'http://b11.photo.store.qq.com/psb?/807a7329-31b8-4e6c-a21c-ce507779920d/y4zQWPVTBGOuVi4LPJmo9UmX2KCcPi2j7dWqUILjaX4!/b/dAsAAAAAAAAA&bo=gAJxBAAAAAAFB9M!&rf=viewer_4', 'http://b386.photo.store.qq.com/psb?/807a7329-31b8-4e6c-a21c-ce507779920d/feRp3IOJSPL1FuY5g*9khYmyN*EIJ1CFmsxz47*bjds!/b/dHBJH.b3GQAA&bo=gAJyBIQDQAYFCB4!&rf=viewer_4', 'http://b386.photo.store.qq.com/psb?/807a7329-31b8-4e6c-a21c-ce507779920d/2Vzgl6urp7Ijk7AWAne0rlp1MsxCEPEN3Kal7qyE8zo!/b/dGqpGub5GQAA&bo=cQSAAgAAAAABB9c!&rf=viewer_4', 'http://b395.photo.store.qq.com/psb?/807a7329-31b8-4e6c-a21c-ce507779920d/tNwAp3g3cI1gKZvCJoXbfrDWH0Kb0GqZoxafmQlnUOU!/b/dA36eutkKgAA&bo=gAJxBAAAAAABB9c!&rf=viewer_4', 'http://b395.photo.store.qq.com/psb?/807a7329-31b8-4e6c-a21c-ce507779920d/xvRZ6EsXo1afvLnUDRbF7q1QO1d2fo1DKlhSAJsqDss!/b/dFtjc.vOGQAA&bo=VQOAAgAAAAABB*Q!&rf=viewer_4', 'http://b269.photo.store.qq.com/psb?/807a7329-31b8-4e6c-a21c-ce507779920d/mAbd.ZaaYaK6xvf0tcOYH05emkvFxwOPUbYamSMMnRM!/b/dLBUXKCkJwAA&bo=WAIgAwAAAAABB1k!&rf=viewer_4', 'http://b269.photo.store.qq.com/psb?/807a7329-31b8-4e6c-a21c-ce507779920d/sWnN2h4WTBrab3S9lkuz3eSWBDgLRoRFnduVd6fpHjc!/b/dKMCZKBPIQAA&bo=IANYAgAAAAABB1k!&rf=viewer_4'],
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function() {
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        });
        //获取地理位置
        wx.getLocation({
            type: 'gcj02',
            success: function(res) {
                console.log(res);
                var latitude = res.latitude
                var longitude = res.longitude
                var speed = res.speed
                var accuracy = res.accuracy
                var addr = {
                    latitude: latitude,
                    longitude: longitude,
                    scale: 28
                };
                that.setData({
                    address_jwd: addr
                });
                wx.chooseLocation({
                    latitude: latitude,
                    longitude: longitude,
                    success: function(res) {
                        console.log(res);
                        that.setData({
                            address: res.address
                        });
                    }
                });
            }
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
    //点击拨打电话
    onTel: function() {
        var tel = this.data.telphone;
        wx.makePhoneCall({
            phoneNumber: tel //仅为示例，并非真实的电话号码
        })
    },
})