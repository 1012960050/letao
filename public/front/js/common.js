/**
 * Created by Administrator on 2018/4/9 0009.
 */
$(function () {

  mui('.mui-scroll-wrapper').scroll({
    indicators: false
  });

  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:1000
  });



});