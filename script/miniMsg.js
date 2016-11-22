var MiniMsg = function (ops) {
  /**
   * ops:{
   *  content:'',
   *  type:'', warning / error / success
   *  direction:'' top-left / top-right / bottom-left / bottom-right
   * }
   *
   */
  var defaults = {
    content: '',
    type: 'success',
    direction: 'top-right',
    container: document.body,//要求为一个dom
    temp:true
  };
  $.extend(this, defaults, ops);
  this.init();
};

MiniMsg.prototype = {
  constructor: MiniMsg,
  classForType: {
    success: 'miniMsg-success',
    warning: 'miniMsg-warning',
    error: 'miniMsg-error'
  },
  classForDirection: {
    'top-left': 'miniMsg-top',
    'top-right': 'miniMsg-top',
    'bottom-left': 'miniMsg-bottom',
    'bottom-right': 'miniMsg-bottom'
  },
  setBoxStyle: function (showOrHide) {
    /**
     * 设置msgBox的样式来显示/隐藏它
     */
    var leftOrRight = this.direction.split('-')[1],
      style = {},
      miniMsgWidth;

    if(showOrHide==='show'){
      style[leftOrRight] = 0;
    }else{
      miniMsgWidth=this.msgBox.outerWidth();
      style[leftOrRight] = 0 - miniMsgWidth;
    }
    this.msgBox.css(style);
  },
  init: function () {
    //  生成一个dom，并插入到页面中
    //  根据type设置它的样式
    var classes = ['miniMsg', this.classForType[this.type], this.classForDirection[this.direction]].join(' '),
      $miniMsg = $('<div class="' + classes + '" style="visibility:hidden">' + this.content + '</div>'),
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
    this.msgBox.css('transition','right 1s, left 1s');
    this.msgBox.css('visibility','visible');
  },
  show: function () {
    //显示
    this.setBoxStyle('show');
  },
  hide:function(){
    //隐藏
    this.setBoxStyle('hide');
  },
  destroy: function () {
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
        if(typeof callback==='function'){
          setTimeout(function(){
            callback();
          },1000);
        }
        if(that.temp){
          setTimeout(function(){
            that.destroy();
          },1000)
        }
      },1000)
    })

  }
};