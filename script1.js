$(function(){

	$('input[name="check"]').on('click', function(){
		var isbn = $('input[name="isbn"]').val();
		if(checkISBN(isbn)){
			$('.result').removeClass('error').text('正しいISBNコードです。');

		}else{
			$('.result').addClass('error').text('不正なISBNコードです。');
		}
	});

	function checkISBN(isbn){
		console.log(isbn);
		//※ハイフンがある場合の判定追加
		//var gAAAABBBB = /^(978|979)-?[014]-?\d{1,7}-?\d{1,7}-?\d{1}$/; //

		//入力値にハイフンがある場合除却
		var splitHyphenIsbn = isbn.replace(/-/g, ''); // /-/g全てのハイフン
		console.log(splitHyphenIsbn);

		//Cの文字列分割
		var strC = splitHyphenIsbn.split('');//数値のままでは分割できないらしいのでNumber()の前に記述
		console.log(strC);
		//配列Cの値(文字列)を数値に変換
		var numC = strC.map(function (value){
			return Number(value);
		});
		console.log(numC);

		//Cのチェックディジット計算→forループできる　 1,3の判定は余り算%
		var checkDigitC = 10 - ((numC[0]*1 + numC[1]*3 + numC[2]*1 + numC[3]*3 + numC[4]*1 + numC[5]*3 + numC[6]*1 + numC[7]*3 + numC[8]*1 + numC[9]*3 + numC[10]*1 + numC[11]*3) % 10);
		console.log(checkDigitC);
		if(checkDigitC == 10) {
			checkDigitC = 0;
		}
		if(checkDigitC !== numC[12]) {
			//ダメなときの処理を追加
		}
		console.log(checkDigitC);

		//入力値(文字列)を数値に変換
		var numIsbn = Number(splitHyphenIsbn);

		var gAAAABBBB = /^978[014](\d{1,7}\d{1,7}){8}\d{1}$/; //  ハイフンある場合-?→ハイフンがあってもなくても

		return gAAAABBBB.test(numIsbn); //.test()→文字列の有無を調べる
	}
});