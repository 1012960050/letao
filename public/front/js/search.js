/**
 * Created by Administrator on 2018/4/10 0010.
 */
$(function () {


render();
  function getArr() {
    var arrStr = localStorage.getItem('search_list') || '[]';
    var arr = JSON.parse(arrStr);
    return arr;
  }
  function render() {
    var arr = getArr();
    $('.history').html(template('searchTpl',{list:arr}));
  }


  //点击搜索按钮注册事件
  $('.search_btn').click(function () {
    var arr = getArr();
    var key = $('.search_input').val().trim();
    if(key==""){
      mui.toast( "请输入搜索关键字" );
      return;
    }
    if(arr.indexOf(key)!== -1){
      arr.splice(arr.indexOf(key),1);
    }
    if(arr.length>=10){
      arr.pop();
    }
    arr.unshift(key);
    localStorage.setItem('search_list',JSON.stringify(arr));
    render();
    $('.search_input').val('');
    location.href = "searchList.html?key="+key;
  });



  //点击X号删除查询记录
  $('.history').on('click','.btn_delete',function () {
    var that = this;
    mui.confirm('你确定要删除吗？','温馨提示',['确认','取消'],function (e) {
      if(e.index==0){
        var index = $(that).data('index');
        var arr = getArr();
        arr.splice(index,1);
        localStorage.setItem('search_list',JSON.stringify(arr));
        render();
      }
    });
  });





  //点击清空记录

  $('.history').on('click','.btn-empty',function () {
    mui.confirm("是否清空所有历史记录", "温馨提示", ["确认", "取消"], function( e ) {
      if (e.index === 0) {
        localStorage.removeItem("search_list");
        render();
      }
    });
  });


});