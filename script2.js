$(function(){

	$('input[name="check"]').on('click', function(){
		var isbn = $('input[name="isbn"]').val();
		var res = checkISBN(isbn);
		if(res){
			$('.result').removeClass('error').text('正しいISBNコードです。');
			$('.resultType').text(res['type']);
			$('.resultCountry').text(res['country']);
		}else{
			$('.result').addClass('error').text('不正なISBNコードです。');
			$('.resultType').text('');
			$('.resultCountry').text('');
		}
	});

	function checkISBN(isbn){
		// return true/false;
	}
});
