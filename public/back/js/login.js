/**
 * Created by Administrator on 2018/4/6 0006.
 */
$(function () {
  //表单验证
  $('#form').bootstrapValidator({
    //默认图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //校验字段
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            mix: 6,
            max: 10,
            message: '用户名长度必须为6-10位'
          },
          callback: {
            message: "用户名不存在"
          }
        }
      },
      password: {
        validators:{
          notEmpty:{
            message:'密码不能为空'
          },
          stringLength: {
            mix: 6,
            max: 10,
            message: '密码长度必须为6-10位'
          },
          callback:{
            message:'密码错误'
          }
        }
      }
    }
  });
//注册表单验证成功事件
  $('#form').on('success.form.bv',function (e) {
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$('#form').serialize(),
      success: function (info) {
        if(info.success){
          location.href = "index.html";
        }
        if(info.error == 1000){
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
        }
        if(info.error == 1001){
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
        }
      }
    });
  });



  //重置表单验证

  $("[type='reset']").click(function () {
    $('#form').data('bootstrapValidator').resetForm();
  });

});