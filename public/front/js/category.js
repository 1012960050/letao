/**
 * Created by Administrator on 2018/4/9 0009.
 */
$(function () {
  $.ajax({
    url: "/category/queryTopCategory",
    type: "GET",
    success: function (info) {
      console.log(info);
      $('.category_left ul').html(template("navTpl", info));
      renderById(info.rows[0].id);
    }
  });
  // 给左侧添加事件委托, 点击左侧一级分类, 渲染二级分类
  $('.category_left ul').on("click", "a", function() {
    // 拿到一级分类id
    var id = $(this).data("id");
    // 重新渲染
    renderById( id );
    $(this).addClass("active").parent().siblings().find("a").removeClass("active");
  });

  function renderById(id) {
    $.ajax({
      url: "/category/querySecondCategory",
      type: "GET",
      data: {
        id: id
      },
      success: function (info) {
        console.log(info)
        var htmlStr = template("right_tpl", info);
        $('.category_right ul').html(htmlStr);
      }
    })
  }
});