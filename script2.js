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
		var splitIsbn = isbn.replace(/ISBN|-/gi, ''), // ISBN,ハイフンをすべて除却
			_res = {},
			checkDigFlg;

		//ISBN、ハイフン表記の判定
		if (!/^(ISBN)?\d+-?\d-?\d+-?\d+-?[0-9X]$/i.test(isbn)) {
			return false;
		}

		if (/^978[014]\d{9}$/.test(splitIsbn)) { //ISBN-13の場合
			var n = 13,
				num13,
				result13 = 0;

			//チェックディジット計算
			for (var i = 0; i < n - 1; i++) {
				i % 2 !== 0 ? num13 = 3 : num13 = 1;

				result13 += splitIsbn[i] * num13;
			}
			_determinCheckDig(10, result13, splitIsbn[3], 'ISBN-13');

			if (checkDigFlg === 0) {
				return false;
			} else {
				return res;
			}

		} else if (/^[014]\d{8}[0-9X]$/.test(splitIsbn)) { //ISBN-10の場合
			var m = 10,
				result10 = 0;

			//チェックディジット計算
			for (var j = 0; j < m - 1; j++) {
				result10 += splitIsbn[j] * (10 - j);
			}
			_determinCheckDig(11, result10, splitIsbn[0], 'ISBN-10');

			if (checkDigFlg === 0) {
				return false;
			} else {
				return res;
			}

		} else {
			return false;
		}

		//言語、ISBN種類の判定
		function _determinCheckDig(numA, result, resIsnb, resType) {
			var numCheckDig = numA - result % numA;

			//10桁のときだけ行う処理
			if (splitIsbn.length === 10 && numCheckDig === 10) {
				numCheckDig = 'X';
			}

			if (numCheckDig === numA) {
				numCheckDig = 0;
			}
			if (numCheckDig != splitIsbn[splitIsbn.length - 1]) {
				checkDigFlg = 0; //return false
				return false;
			} else {
				checkDigFlg = 1; //return true
				resIsnb == 4 ? _res['country'] = '日本語圏' : _res['country'] = '英語圏';
				_res['type'] = resType;
				res = _res;
			}
		}
	}
});