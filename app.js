//app.js
App({
    onLaunch: function() {

    },

    getUserInfo: function(cb) {
        var that = this;
        var infos = wx.getStorageSync('userInfo') || [1];
        if (!infos.length) {
            return false;
        }
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.getUserInfo({
                withCredentials: false,
                success: function(res) {
                    //console.log(res);
                    that.globalData.userInfo = res.userInfo;
                    wx.setStorageSync('userInfo', res.userInfo);
                    typeof cb == "function" && cb(that.globalData.userInfo)
                }
            })
        }
    },

    globalData: {
        userInfo: null
    }
})