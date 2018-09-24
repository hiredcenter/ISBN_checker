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
			_res = {};

		//ISBN、ハイフン表記の判定
		if (!/^(ISBN)?\d+-?\d-?\d+-?\d+-?[0-9X]$/i.test(isbn)) {
			return false;
		}

		//ISBN-13の場合
		if (/^978[014]\d{9}$/.test(splitHyphenIsbn)) {
			var n = 13,
				numD,
				result13 = 0;

			//チェックディジット計算→forループできる 1,3の判定は余算
			for (var i = 0; i < n-1; i++) {
				i % 2 !== 0 ? numD = 3 : numD = 1;

				result13 +=  splitHyphenIsbn[i] * numD;
			}

			var checkDig13 = 10 - result13 % 10;

			if (checkDig13 === 10) {
				checkDig13 = 0;
			}
			if (checkDig13 != splitHyphenIsbn[12]) {
				return false;
			}

			determineLang(splitHyphenIsbn[3]); //4文字目から言語圏判定(0,1:英語、4:日本)
			_res['type'] = 'ISBN-13';
			return _res;

		//ISBN-10の場合
		} else if (/^[014]\d{8}[0-9X]$/.test(splitHyphenIsbn)) {
			var	result10 = 0;

			//チェックディジット計算
			for (var j = 0; j < 9; j++) {
				result10 +=  splitHyphenIsbn[j] * (10 - j);
			}
			var checkDig10 = 11 - result10 % 11;

			if (checkDig10 === 10) {
				checkDig10 = 'X';
			} else if (checkDig10 === 11) {
				checkDig10 = 0;
			}
			if (checkDig10 != splitHyphenIsbn[9]) {
				return false;
			}

			determineLang( splitHyphenIsbn[0]); //1文字目から言語圏判定
			_res['type'] = 'ISBN-10';
			return _res;

		} else {
			return false;
		}

		//言語判定
		function determineLang(numISBN) {
			numISBN == 4 ? _res['country'] = '日本語圏' : _res['country'] = '英語圏';
		}
	}
});