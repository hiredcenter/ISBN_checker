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
			n = splitIsbn.length,
			numResult = 0,
			_res = {},
			checkDigFlg;

		//ISBN、ハイフン表記の判定
		if (!/^(ISBN)?\d+-?\d-?\d+-?\d+-?[0-9X]$/i.test(isbn)) {
			return false;
		}

		if (/^978[014]\d{9}$/.test(splitIsbn)) { //ISBN-13の場合
			//チェックディジット計算
			for (var i = 0; i < n - 1; i++) {
				numResult += splitIsbn[i] * (i % 2 ? 3 : 1);
			}
			_determinCheckDig(10, numResult, splitIsbn[n - 10], 'ISBN-' + n);

			if (checkDigFlg === 0) {
				return false;
			} else {
				return res;
			}

		} else if (/^[014]\d{8}[0-9X]$/.test(splitIsbn)) { //ISBN-10の場合
			//チェックディジット計算
			for (var i = 0; i < n - 1; i++) {
				numResult += splitIsbn[i] * (10 - i);
			}
			_determinCheckDig(11, numResult, splitIsbn[n - 10], 'ISBN-' + n);

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
				_res['country'] = resIsnb == 4 ? '日本語圏' : '英語圏';
				_res['type'] = resType;
				res = _res;
			}
		}
	}
});