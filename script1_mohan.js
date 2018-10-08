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
		if (/^(ISBN)?(\d+-?)?\d+-?\d+-?\d+-?\d$/i.test(isbn)) {
			isbn = isbn.replace(/ISBN|-/gi, "");

			var match = isbn.match(/^978[014]\d{8}(\d)$/),
				i,
				checkDigit = 0,
				mod = 10;

			if (match) {
				for (i = 0; i < isbn.length - 1; i++) {
					checkDigit += Number(isbn[i]) * (i % 2 ? 3 : 1);
				}
				checkDigit = mod - (checkDigit % mod || mod);
				if (match[1] === String(checkDigit)) {
					return true;
				}
			}
		}
		return false;
	}
});