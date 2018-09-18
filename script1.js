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
		if(!regExpHyphen.test(isbn)) {
			return false;
		}
		//入力値にISBN,ハイフンがある場合除却
		var splitHyphenIsbn = isbn.replace(/ISBN|-/gi, ''); // ISBN,ハイフンをすべて除却
		var regExpHyphen2 = /^978[014]\d{8}\d{1}$/;
		if(!regExpHyphen2.test(splitHyphenIsbn)){
			return false;
		}

		//文字列分割
		var strC = splitHyphenIsbn.split(''); //数値のままでは分割できないらしいのでNumber()の前に記述
		//配列Cの値(文字列)を数値に変換
		var numC = strC.map(function (value) {
			return Number(value);
		});

		//チェックディジット計算
		var result = 0;
		var numD;
		for (var i = 0; i < 12; i++) {
			if(i % 2 !== 0){ //iが奇数番のときはnumD=1
				numD = 1;
			}else if(i % 2 === 0){ //iが偶数番のときはnumD=3
				numD = 3;
			}
			result+= numC[i]*numD;
		}
		var checkDigitC = 10 - result % 10;

		if (checkDigitC === 10) {
			checkDigitC = 0;
		}
		if (checkDigitC !== numC[12]) {
			return false;
		}
		return true;
	}
});