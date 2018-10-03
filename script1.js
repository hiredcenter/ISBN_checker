$(function () {

	$('input[name="check"]').on('click', function () {
		var isbn = $('input[name="isbn"]').val();
		if (checkISBN(isbn)) {
			$('.result').removeClass('error').text('正しいISBNコードです。');

		} else {
			$('.result').addClass('error').text('不正なISBNコードです。');
		}
	});

	function checkISBN(isbn) {
		var splitIsbn = isbn.replace(/ISBN|-/gi, ''), // ISBN,ハイフンをすべて除却
			n = splitIsbn.length,
			prmCheckDig = 0,
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

			numCheckDig = 10 - prmCheckDig % 10; //チェックディジット算出

			if (numCheckDig === 10) {
				numCheckDig = 0;
			}

			//チェックディジット判定
			if (numCheckDig != splitIsbn[n - 1]) { //チェックディジットと入力値の末尾の値比較
				return false;
			} else {
				return true;
			}
		}

		return false;
	}

});
