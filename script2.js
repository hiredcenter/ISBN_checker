$(function() {

	$('input[name="check"]').on('click', function() {
		var isbn = $('input[name="isbn"]').val();
		var res = checkISBN(isbn);
		if (res) {
			$('.result').removeClass('error').text('正しいISBNコードです。');
			$('.resultType').text(res['type']);
			$('.resultCountry').text(res['country']);
		} else {
			$('.result').addClass('error').text('不正なISBNコードです。');
			$('.resultType').text('');
			$('.resultCountry').text('');
		}
	});

	function checkISBN(isbn) {
		//入力値にISBN,ハイフンがある場合除却
		var splitHyphenIsbn = isbn.replace(/ISBN|-/gi, ''); // ISBN,ハイフンをすべて除却

		//ISBN、ハイフン表記の判定
		if (!/^(ISBN)?\d+-?\d-?\d+-?\d+-?\d$/i.test(isbn)) {
			return false;
			console.log('false');
		}

		//ISBN-13の場合
		if (/^978[014]\d{8}\d{1}$/.test(splitHyphenIsbn)) { //表記判定
			//文字列分割し、配列の値(文字列)を数値に変換 ※数値のままでは分割できないのでNumber()の前に記述
			var numISBN13 = splitHyphenIsbn.split('').map(function(value) {
				return Number(value);
			});

			//Cのチェックディジット計算→forループできる 1,3の判定は余り算%
			var result13 = 0;
			var numD;
			for (var i = 0; i < 12; i++) {
				if (i % 2 !== 0) { //iが奇数番のときはnumD=1
					numD = 1;
				} else if (i % 2 === 0) { //iが偶数番のときはnumD=3
					numD = 3;
				}
				result13 += numISBN13[i] * numD;
			}
			var checkDigitISBN13 = 10 - result13 % 10;

			//値が10の場合、0にする
			if (checkDigitISBN13 === 10) {
				checkDigitISBN13 = 0;
			}
			//checkDigitISBN13 とnumISBN13[12]が一致しないなら、falseを返す!
			if (checkDigitISBN13 !== numISBN13[12]) {
				return false;
			}
			//4文字目から言語圏判定(0,1:英語、4:日本)
			// if ( splitHyphenIsbn[3] === 0 || splitHyphenIsbn[3] === 1) {
			// 	// res['country'] = '英語圏';
			// 	this.country = '英語圏';
			// } else if (splitHyphenIsbn[3] === 4) {
			// 	// res['country'] = '日本語圏';
			// 	this.country = '日本語圏';
			// }
			return true;

		//ISBN-10の場合
		} else if (/^[014]\d{8}\d{1}$/.test(isbn)) {
			//文字列分割し、配列の値(文字列)を数値に変換 ※数値のままでは分割できないのでNumber()の前に記述
			var numISBN10 = splitHyphenIsbn.split('').map(function(value) {
				return Number(value);
			});

			//Cのチェックディジット計算→forループできる 1,3の判定は余り算%
			var result10 = 0;
			for (var j = 0; j < 9; j++) {
				result10 += numISBN10[j] * (10 - j);
			}
			var checkDigitISBN10 = 11 - result10 % 11;

			//値が10の場合はX、11の場合は0
			if (checkDigitISBN10 === 10) {
				checkDigitISBN10 = X; //これダメ、文字列をどう扱う？？ 文字列結合？
			} else if (checkDigitISBN10 === 11) {
				checkDigitISBN10 = 0;
			}

			//checkDigitISBN13 とnumISBN10[12]が一致しないなら、falseを返す!
			if (checkDigitISBN10 !== numISBN10[10]) {
				return false;
			}
			//1文字目から言語圏判定(0,1:英語、4:日本)
			// if ( splitHyphenIsbn[0] == 0 || splitHyphenIsbn[0] == 4) {
			// 	//res['type'] = '';
			// }
			return true;

		//その他のパターン
		} else {
			return false;
		}
	}
});
