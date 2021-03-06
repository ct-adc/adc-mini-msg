!function(root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.MiniMsg = factory();
    }
}(this, function() {
    /**
     * 创建一个弱提示框的对象
     * @param {Object} ops
     * @param {string} ops.content 提示框的内容
     * @param {string} ops.type "warning" | "error" | "success"
     * @param {Object} ops.container dom节点
     * @param {string} ops.duration 显示时间,单位:毫秒
     * @constructor
     */
    var MiniMsg = function(ops) {
        var defaults = {
            content: '',
            type: 'info',
            container: document.body,
            duration: 2,
            top: 16
        };
        $.extend(this, defaults, ops);
        this.init();
    };

    MiniMsg.prototype = {
        constructor: MiniMsg,
        classForType: {
            success: 'mini-msg-success',
            warning: 'mini-msg-warning',
            error: 'mini-msg-error',
            info: 'mini-msg-info'
        },
        iconForType: {
            success: 'glyphicon-ok-sign',
            warning: 'glyphicon-exclamation-sign',
            error: 'glyphicon-remove-circle',
            info: 'glyphicon-info-sign'
        },
        /**
         * 设置msgBox的样式来显示/隐藏它
         * @param {string} showOrHide "show" | "hide"
         */
        setBoxStyle: function(showOrHide) {
            var style = {},
                miniMsgHeight;
            if (showOrHide === 'show') {
                style.top = this.top + 'px';
            } else {
                miniMsgHeight = this.msgBox.find('.mini-msg-notice').outerHeight();
                style.top = 0 - miniMsgHeight - this.top;
            }
            this.msgBox.css(style);
        },
        init: function() {
            //  生成一个dom，并插入到页面中
            //  根据type设置它的样式
            var html = '<div class="mini-msg">' +
                    '<div class="mini-msg-notice">' +
                    '<div class="mini-msg-notice-content ' + this.classForType[this.type] + '">' +
                    '<i class="glyphicon ' + this.iconForType[this.type] + '"></i>' +
                    this.content +
                    '</div>' +
                    '</div>' +
                    '</div>',
                $miniMsg = $(html),
                styleForContainer;
            $(this.container).append($miniMsg);

            if (this.container != document.body) {
                styleForContainer = {
                    position: 'relative',
                    "overflow-x": 'hidden'
                };
            } else {
                styleForContainer = {
                    "overflow-x": 'hidden'
                }
            }
            $(this.container).css(styleForContainer);
            this.msgBox = $miniMsg;
            this.setBoxStyle('hide');
        },
        show: function() {
            //显示
            this.setBoxStyle('show');
        },
        hide: function() {
            //隐藏
            this.setBoxStyle('hide');
        },
        destroy: function() {
            //销毁
            if (typeof this.timer !== 'undefined') {
                clearTimeout(this.timer);
            }
            this.msgBox.remove();
        },
        /**
         * 执行动画
         * @param {Function} callback 执行完之后的回调函数
         */
        animation: function(callback) {
            var that = this;
            that.timer = setTimeout(function() {
                that.show();
                that.timer = setTimeout(function() {
                    that.hide();
                    that.timer = setTimeout(function() {
                        if (typeof callback === 'function') {
                            callback();
                        }
                        that.destroy();
                    }, 300);
                }, 300 + 1000 * (that.duration));
            }, 300);
            return this;
        }
    };
    return MiniMsg;
})