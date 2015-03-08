$(document).ready(function(){ 
  $("li.list .checkbox input[type=checkbox]").change(function(){
    
    var doc_id = $(this).data('list-id');

    if( $(this).prop( "checked" ) ){
      $(this).closest("li").addClass("completed");
      // checkbox was checked
      // alert('sent PUT request to '+'/list/:id/complete');
    }else{
      $(this).closest("li").removeClass("completed");
      // alert('sent PUT request to '+'/list/'+doc_id+'/uncomplete');
    }

    counter();

  });

  $("span.fakeCheckbox").click(function(event){
    var span = $(this);
    var checkbox = $(this).siblings("input[type=checkbox]");
    var doc_id = checkbox.data('list-id');
    if(checkbox.prop("checked")){
      $.ajax('/list/'+doc_id+'/uncomplete', {
        method : "PUT"
      });
      span.removeClass("fa fa-check");
      checkbox.prop('checked', false);
      $(this).parents("li").removeClass("completed");
    } else {
      $.ajax('/list/'+doc_id+'/complete', {
        method : "PUT"
      });
      span.addClass("fa fa-check");
      checkbox.prop('checked', true);   
      $(this).parents("li").addClass("completed");
    }
    counter();
  });
  // select all checkboxes with data of checked
  $("li.list input[data-checked='true']").prop('checked', true);
  counter();
});

  // below is for the counter
function counter (){
  if ($("#toDoList").length > 0){
    $(".itemsCompleted p span").text($(".list.completed").length); 
    $(".itemsLeft p span").text($(".list").length - $(".list.completed").length);
  }
}