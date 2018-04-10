/**
 * Created by Administrator on 2018/4/10 0010.
 */
$(function () {

  var key = getSearch('key');
  $('.search_input').val(key);
  render();
  function render() {
    var obj = {};
    obj.proName = $('.search_input').val();
    obj.page = 1;
    obj.pageSize=100;
    $active = $('.sort .active');
    if($active.length>0){
      var sortName = $active.data('type');
      var sortValue = $active.find('i').hasClass('fa-angle-down')?2:1;
      obj[sortName] = sortValue;
    }

    $.ajax({
      url:'/product/queryProduct',
      data:obj,
      success:function (info) {
        $('.product').html(template('productTpl',info));
      }
    });
  }


  $('.search_btn').click(function () {
    render();
    var key = $('.search_input').val();
    var history = localStorage.getItem("search_list") || "[]";
    var arr = JSON.parse( history );
    var index = arr.indexOf( key );
    if ( index !== -1 ) {

      arr.splice( index, 1 );
    }
    if ( arr.length >= 10 ) {
      arr.pop();
    }
    arr.unshift( key );
    localStorage.setItem( "search_list", JSON.stringify(arr) );
  });

  $('.sort a[data-type]').click(function () {
    if ( $(this).hasClass( "active") ) {
      $(this).find("i").toggleClass("fa-angle-up").toggleClass("fa-angle-down");
    } else {
      $(this).addClass("active").siblings().removeClass("active");
      $(".sort a i").removeClass("fa-angle-up").addClass("fa-angle-down");
    }
    render();

  });


});