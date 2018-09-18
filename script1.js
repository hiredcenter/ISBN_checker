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
		//console.log(isbn);

		//※ハイフン有無の判定
		var regExpHyphen = /^(ISBN)?\d+-?\d-?\d+-?\d+-?\d$/i;
		if(!regExpHyphen.test(isbn)){
			return false;
		}
		//入力値にISBN,ハイフンがある場合除却
		var splitHyphenIsbn = isbn.replace(/ISBN|-/gi, ''); // ISBN,ハイフンをすべて除却
		console.log(splitHyphenIsbn);
		var regExpHyphen2 = /^978[014]\d{8}\d{1}$/;
		if(!regExpHyphen2.test(splitHyphenIsbn)){
			return false;
		}

		// //Cの文字列分割
		var strC = splitHyphenIsbn.split('');//数値のままでは分割できないらしいのでNumber()の前に記述
		//配列Cの値(文字列)を数値に変換
		var numC = strC.map(function (value){
			return Number(value);
		});

		//Cのチェックディジット計算→forループできる 1,3の判定は余り算%
		var result = 0;
		var numD;
		for (var i = 0; i < 12; i++) {
			if(i % 2 !== 0){ //iが奇数番のときはnumD=1
				numD = 1;
			}else if(i % 2 === 0){ //iが偶数番のときはnumD=3
				numD = 3;
			}
			result+= numC[i]*numD;
			//console.log(result);
		}
		//console.log(result);
		var checkDigitC = 10 - result % 10;
		//var resultCC = numC[0]*1 + numC[1]*3 + numC[2]*1 + numC[3]*3 + numC[4]*1 + numC[5]*3 + numC[6]*1 + numC[7]*3 + numC[8]*1 + numC[9]*3 + numC[10]*1 + numC[11]*3;
		//var checkDigitCC = 10 - resultCC % 10;
		//console.log(checkDigitC+checkDigitCC);

		//値が10の場合、0にする
		if(checkDigitC === 10) {
			checkDigitC = 0;
		}
		//checkDigitC とnumC[12]が一致しないなら、falseを返す!
		if (checkDigitC !== numC[12]) {
			return false;
		}
		return true;
	}
});