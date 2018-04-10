/**
 * Created by Administrator on 2018/4/9 0009.
 */
  mui('.mui-scroll-wrapper').scroll({
    indicators: false
  });

  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:1000
  });


  function getSearch(key) {
    var str = location.search;
    str = decodeURI(str);
    str = str.slice(1);
    var arr = str.split("&");
    var obj={};
    arr.forEach(function (v,i) {
      obj[v.split('=')[0]]= v.split('=')[1];
    });
    return obj[key];
  }