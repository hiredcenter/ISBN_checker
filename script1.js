$(function(){

	$('input[name="check"]').on('click', function() {
		var isbn = $('input[name="isbn"]').val();
		if(checkISBN(isbn)){
			$('.result').removeClass('error').text('正しいISBNコードです。');

		}else{
			$('.result').addClass('error').text('不正なISBNコードです。');
		}
	});

	function checkISBN(isbn) {
		//ハイフン有無の判定
		var regExpHyphen = /^(ISBN)?\d+-?\d-?\d+-?\d+-?\d$/i;
		if (!regExpHyphen.test(isbn)) {
			return false;
		}
		//入力値にISBN,ハイフンがある場合除却
		var splitIsbn = isbn.replace(/ISBN|-/gi, ''); // ISBN,ハイフンをすべて除却
		var regExpHyphen2 = /^978[014]\d{9}$/;
		if (!regExpHyphen2.test(splitIsbn)) {
			return false;
		}

		//チェックディジット計算
		var n = splitIsbn.length,
			numD,
			result = 0;

		for (var i = 0; i < n-1; i++) {
			i % 2 !== 0 ? numD = 3 : numD = 1;

			result+= splitIsbn[i]*numD;
		}
		var checkDigitC = 10 - result % 10;

		if (checkDigitC === 10) {
			checkDigitC = 0;
		}
		if (checkDigitC != splitIsbn[12]) {
			return false;
		}
		return true;
	}
});
