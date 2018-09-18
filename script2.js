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
		var splitHyphenIsbn = isbn.replace(/ISBN|-/gi, ''), // ISBN,ハイフンをすべて除却
			_res = {
				type: 'hoge',
				country: 'fuga'
			};

		//ISBN、ハイフン表記の判定
		if (!/^(ISBN)?\d+-?\d-?\d+-?\d+-?[0-9X]$/i.test(isbn)) {
			return false;
		}

		//ISBN-13の場合
		if (/^978[014]\d{8}\d{1}$/.test(splitHyphenIsbn)) {
			var numISBN13 = splitHyphenIsbn.split('').map(function(value) { //文字列分割し、配列の値(文字列)を数値に変換 ※数値のままでは分割できないのでNumber()の前に記述
				return Number(value);
			}),
				numD,
				result13 = 0;

			//チェックディジット計算→forループできる 1,3の判定は余算
			for (var i = 0; i < 12; i++) {
				if (i % 2 !== 0) { //iが奇数番(i=1,3,5...)のときはnumD=3
					numD = 3;
				} else if (i % 2 === 0) { //iが偶数番(i=0,2.4.6...)のときはnumD=1
					numD = 1;
				}
				result13 += numISBN13[i] * numD;
			}

			var checkDig13 = 10 - result13 % 10;

			if (checkDig13 === 10) {
				checkDig13 = 0;
			}
			if (checkDig13 !== numISBN13[12]) {
				return false;
			}

			determineLang(numISBN13[3]); //4文字目から言語圏判定(0,1:英語、4:日本)
			_res['type'] = 'ISBN-13';
			res = _res;
			return res; //オブジェクトをリターンさせる 関数の実行結果

		//ISBN-10の場合
		} else if (/^[014]\d{8}[0-9X]$/.test(splitHyphenIsbn)) {
			var numISBN10 = splitHyphenIsbn.split(''),
				result10 = 0;

			//チェックディジット計算
			for (var j = 0; j < 9; j++) {
				result10 += numISBN10[j] * (10 - j);
			}
			var checkDig10 = 11 - result10 % 11;

			if (checkDig10 === 10) {
				checkDig10 = 'X';
			} else if (checkDig10 === 11) {
				checkDig10 = 0;
			}
			if (String(checkDig10) !== numISBN10[9]) {
				return false;
			}

			determineLang(numISBN10[0]); //1文字目から言語圏判定
			_res['type'] = 'ISBN-10';
			res = _res;
			return res; //オブジェクトをリターンさせる 関数の実行結果

		} else {
			return false;
		}

		//言語判定
		function determineLang(numISBN) {
			if (numISBN == 0 || numISBN == 1) {
				_res['country'] = '英語圏';
			} else if (numISBN == 4) {
				_res['country'] = '日本語圏';
			}
		}
	}
});