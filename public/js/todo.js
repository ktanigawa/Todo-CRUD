$(document).ready(function(){ 
  $("li.list input[type=checkbox]").change(function(){
    var doc_id = $(this).data('list-id');

    if( $(this).prop( "checked" ) ){
      // checkbox was checked
      $.ajax('/list/'+doc_id+'/complete', {
        method : "PUT"
      });
      // alert('sent PUT request to '+'/list/:id/complete');
    }else{
      $.ajax('/list/'+doc_id+'/uncomplete', {
        method : "PUT"
      });
      // alert('sent PUT request to '+'/list/'+doc_id+'/uncomplete');
    }
  });
  // select all checkboxes with data of checked
  $("li.list input[data-checked=true]").prop('checked', true);
});
