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
		if (/^(ISBN)?(\d+-?)?\d+-?\d+-?\d+-?(\d|X)$/i.test(isbn)) {
			isbn = isbn.replace(/ISBN|-/gi, "");

			var match = isbn.match(/^(978)?([014])\d{8}(\d|X)$/),
				i,
				checkDigit = 0,
				mod;

			if (match) {
				if (match[1]) { //モジュラス10 ウェイト3・1
					mod = 10;
					for (i = 0; i < isbn.length - 1; i++) {
						checkDigit += Number(isbn[i]) * (i % 2 ? 3 : 1);
					}
				} else { //モジュラス11 ウェイト10-2
					mod = 11;
					for (i = 0; i < isbn.length - 1; i++) {
						checkDigit += Number(isbn[i]) * (10 - i);
					}
				}
				checkDigit = mod - checkDigit % mod || mod;
				if (checkDigit === 10) { //モジュラス11の場合のみ
					checkDigit = 'X';
				}
				if (match[3] === String(checkDigit)) {
					return {
						type: match[1] ? 'ISBN-13' : 'ISBN-10',
						country: match[2] === 4 ? '日本語圏' : '英語圏'
					};
				}
			}
		}
		return false;
	}
});