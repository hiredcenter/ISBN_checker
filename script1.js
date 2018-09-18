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

		//ハイフンがある場合
		if (isbn.match(/-/)){
			return isbn.match(/-/);
			//※ハイフンが指定箇所にすべてある・なしの判定
			var regExpHyphen = /^ISBN?978-[014]-\d{1,7}-\d{1,7}-\d{1}$/;
			if(regExpHyphen.test(isbn)){
				//何もしない
			} else {
				return false;
			}
		}
		//入力値にISBN,ハイフンがある場合除却
		var splitHyphenIsbn = isbn.replace(/ISBN|-/g, ''); // ISBN,ハイフンをすべて除却
		console.log(splitHyphenIsbn);

		//Cの文字列分割
		var strC = splitHyphenIsbn.split('');//数値のままでは分割できないらしいのでNumber()の前に記述
		//配列Cの値(文字列)を数値に変換
		var numC = strC.map(function (value){
			return Number(value);
		});
		//Cのチェックディジット計算→forループできる 1,3の判定は余り算%
		var checkDigitC = 10 - ((numC[0]*1 + numC[1]*3 + numC[2]*1 + numC[3]*3 + numC[4]*1 + numC[5]*3 + numC[6]*1 + numC[7]*3 + numC[8]*1 + numC[9]*3 + numC[10]*1 + numC[11]*3) % 10);
		console.log(checkDigitC);
		//値が10の場合、0にする
		if(checkDigitC == 10) {
			checkDigitC = 0;
		}

		//checkDigitC とnumC[12]が一致しないなら、falseを返す!
		if (checkDigitC !== numC[12]) {
			return false;
		}

		//入力値(文字列)を数値に変換
		var numIsbn = Number(splitHyphenIsbn);
		//ハイフン無しでの数値判定
		var regExpNum = /^978[014]\d{8}\d{1}$/; //abの桁数の判定→最後に

		return regExpNum.test(numIsbn); //.test()→文字列の有無を調べる
	}
});