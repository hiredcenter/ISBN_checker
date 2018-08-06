$(function(){

	$('input[name="check"]').on('click', function(){
		var isbn = $('input[name="isbn"]').val();
		if(checkISBN(isbn)){
			$('.result').removeClass('error').text('正しいISBNコードです。');

		}else{
			$('.result').addClass('error').text('不正なISBNコードです。');
		}
	});

	function checkISBN(isbn){
		// return true/false;
	}
});