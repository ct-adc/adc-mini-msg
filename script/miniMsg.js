var MiniMsg = function (ops) {
  /**
   * ops:{
   *  content:'',
   *  type:'', warning / error / success
   *  direction:'', top-left / top-right / bottom-left / bottom-right
   *  temp:true/false, 是否是临时弹出框，如果是临时框则animation之后立即销毁
   *  duration:0 显示时间，这里的数字表示秒数
   * }
   *
   */
  var defaults = {
    content: '',
    type: 'info',
    container: document.body,//要求为一个dom
    duration:2,
    top:16
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
    info:'mini-msg-info'
  },
  iconForType:{
    success: 'glyphicon-ok-sign',
    warning: 'glyphicon-exclamation-sign',
    error: 'glyphicon-remove-circle',
    info:'glyphicon-info-sign'
  },
  setBoxStyle: function (showOrHide) {
    /**
     * 设置msgBox的样式来显示/隐藏它
     */
    var style = {},
      miniMsgHeight;

    if(showOrHide==='show'){
      style.top = this.top+'px';
    }else{
      miniMsgHeight=this.msgBox.find('.mini-msg-notice').outerHeight();
      style.top = 0 - miniMsgHeight-this.top;
    }
    this.msgBox.css(style);
  },
  init: function () {
    //  生成一个dom，并插入到页面中
    //  根据type设置它的样式
    var html='<div class="mini-msg">' +
        '<div class="mini-msg-notice">' +
        '<div class="mini-msg-notice-content">' +
        '<div class="'+this.classForType[this.type]+'">' +
        '<i class="glyphicon '+this.iconForType[this.type]+'"></i>' +
        '<div>'+this.content+'</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
      $miniMsg = $(html),
      styleForContainer;
    $(this.container).append($miniMsg);

    if(this.container!=document.body){
      styleForContainer={
        position:'relative',
        "overflow-x":'hidden'
      };
    }else{
      styleForContainer={
        "overflow-x":'hidden'
      }
    }
    $(this.container).css(styleForContainer);
    this.msgBox = $miniMsg;
    this.setBoxStyle('hide');
  },
  show: function () {
    //显示
    this.setBoxStyle('show');
  },
  hide:function(){
    //隐藏
    this.setBoxStyle('hide');
  },
  _destroy: function () {
    //销毁
    this.msgBox.remove();
  },
  animation:function(callback){
    //进行动画效果
    var that=this;
    setTimeout(function(){
      that.show();
      setTimeout(function(){
        that.hide();
        setTimeout(function(){
          if(typeof callback==='function'){
            callback();
            that._destroy();
          }
        },300);
      },300+1000*(that.duration));
    },300)

  }
};