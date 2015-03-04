$(document).ready(function(){ 
  $("li.list .checkbox input[type=checkbox]").change(function(){
    var doc_id = $(this).data('list-id');

    if( $(this).prop( "checked" ) ){
      $(this).parents("li").addClass("completed");
      // checkbox was checked
      $.ajax('/list/'+doc_id+'/complete', {
        method : "PUT"
      });
      // alert('sent PUT request to '+'/list/:id/complete');
    }else{
      $(this).parents("li").removeClass("completed");
      $.ajax('/list/'+doc_id+'/uncomplete', {
        method : "PUT"
      });
      // alert('sent PUT request to '+'/list/'+doc_id+'/uncomplete');
    }
    counter();
  });
  // select all checkboxes with data of checked
  $("li.list input[data-checked=true]").prop('checked', true);
  counter();
});

  // below is for the counter
function counter (){
  $(".itemsCompleted p span").text($(".list.completed").length); 
  $(".itemsLeft p span").text($(".list").length - $(".list.completed").length);
}