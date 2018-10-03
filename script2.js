$(function () {

	$('input[name="check"]').on('click', function () {
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
			prmCheckDig = 0,
			_res = {},
			mdls,
			numCheckDig;

		//ISBN、ハイフン表記の判定
		if (!/^(ISBN)?\d+-?\d-?\d+-?\d+-?[0-9X]$/i.test(isbn)) {
			return false;
		}

		//チェックディジット算出のパラメータを設定
		if (/^978[014]\d{9}$/.test(splitIsbn)) { //ISBN-13候補の場合
			for (var i = 0; i < n - 1; i++) {
				prmCheckDig += splitIsbn[i] * (i % 2 ? 3 : 1);
			}

			mdls = 10;

		} else if (/^[014]\d{8}[0-9X]$/.test(splitIsbn)) { //ISBN-10候補の場合
			for (var i = 0; i < n - 1; i++) {
				prmCheckDig += splitIsbn[i] * (10 - i);
			}

			mdls = 11;
		}

		//チェックディジット判定
		if (mdls === 10 || mdls === 11) {
			numCheckDig = mdls - prmCheckDig % mdls; //チェックディジット算出

			//10桁の場合→Xの判定
			if (n === 10 && numCheckDig === 10) {
				numCheckDig = 'X';
			}

			if (numCheckDig === mdls) {
				numCheckDig = 0;
			}

			//チェックディジット判定
			if (numCheckDig != splitIsbn[n - 1]) { //チェックディジットと入力値の末尾の値比較
				return false;
			} else {
				_res['country'] = splitIsbn[n - 10] == 4 ? '日本語圏' : '英語圏';
				_res['type'] = 'ISBN-' + n;
				res = _res;
				return res;
			}
		}

		return false;
	}
});
