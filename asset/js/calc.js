var mydata = JSON.parse(JSON.stringify(ALL)); //將js檔案讀出來

function calc(){
	//負載設定
	var weight   = parseFloat(document.getElementById('tableweight').value) +  parseFloat(document.getElementById('wpweight').value);
	var motorpm  = parseFloat(document.getElementById('motorpm').value);   //馬達最高轉速
	var feedrate = parseFloat(document.getElementById('feedrate').value);  //進給速度
    var axiaload = weight*parseFloat(document.getElementById('um').value); //軸向負荷
	
	document.getElementById("minlead").value  = (feedrate*1000/motorpm).toFixed(0); //最小建議導程
	document.getElementById("axiaload").value  = axiaload.toFixed(0);
	
	//運轉條件	
	var lead  = parseFloat(document.getElementById('lead').value); 	

	var fm = fmnmcal(lead,axiaload).fm //平均負荷
	var nm = fmnmcal(lead,axiaload).nm //平均轉速
	document.getElementById("fm").value = fm.toFixed(0);
	document.getElementById("nm").value = nm.toFixed(0);

	//動負荷計算
	var rlife = parseFloat(document.getElementById('rlife').value); 
    var fw = parseFloat(document.getElementById('fw').value);

    var rca = (Math.pow(rlife*60*nm,1/3)*fm*fw/100).toFixed(0); //最低動負荷
	document.getElementById("rca").value  = rca;

	//軸徑選定
	var g0n 	  = parseFloat(document.getElementById('g0v').value)/lead;
	var maxstroke = parseFloat(document.getElementById('maxstroke').value);
	var nutlength = parseFloat(document.getElementById('nutlength').value);
	var lremain   = parseFloat(document.getElementById('lremain').value);
	var fixtype   = parseFloat(document.getElementById('fixtype').value);

    var minod = (g0n*Math.pow(maxstroke+nutlength/2+lremain,2)/fixtype*Math.pow(10,-7)).toFixed(1); //最小外徑
	document.getElementById("minod").value  = minod;

    //螺帽選定
    document.getElementById("suggestod").innerHTML    = "建議最小外徑:"+minod+"mm";
	document.getElementById("suggestca").innerHTML    = "建議最小動負荷:"+rca+"kg";
	document.getElementById("suggestlead").innerHTML  = "建議最小導程:"+document.getElementById("minlead").value+"mm";

	//壽命計算
	lifecal();
}

//計算平均轉速及平均負荷
function fmnmcal(lead,axiaload) {
	var g0f     = parseFloat(document.getElementById('g0f').value);
	var g0v     = parseFloat(document.getElementById('g0v').value);
	var g0time  = parseFloat(document.getElementById('g0time').value); 
	var g1v     = parseFloat(document.getElementById('g1v').value); 
	var g1f     = parseFloat(document.getElementById('g1f').value); 
	var g1time  = parseFloat(document.getElementById('g1time').value); 
	var g2v     = parseFloat(document.getElementById('g2v').value); 
	var g2f     = parseFloat(document.getElementById('g2f').value);
	var g2time  = parseFloat(document.getElementById('g2time').value); 

	var g0n = g0v/lead; //轉速
	var g1n = g1v/lead;
	var g2n = g2v/lead;

	var fm  = Math.pow(axiaload+g0f,3)*g0n*g0time+Math.pow(axiaload+g1f,3)*g1n*g1time+Math.pow(axiaload+g2f,3)*g2n*g2time;
	fm = fm/(g0n*g0time+g1n*g1time+g2n*g2time)
	fm = Math.pow(fm,1/3) //平均負荷
	var nm = ((g0n*g0time+g1n*g1time+g2n*g2time)/(g0time+g1time+g2time)) //平均轉速	

	return{
		fm,nm
	}
}

function lifecal() {
	document.getElementById("nutca").value = document.getElementById("ca").value;	
	document.getElementById("lifefw").value = document.getElementById("fw").value;	
	//壽命結果
	var axiaload = parseFloat(document.getElementById('axiaload').value);	
	var lead    = parseFloat(document.getElementById('chooselead').value);
	var ca = document.getElementById('nutca').value; 	//螺帽動負荷
	var fw = document.getElementById('fw').value; 		//負荷係數
	var rlife = document.getElementById('rlife').value; //要求壽命

	var fm = fmnmcal(lead,axiaload).fm
	var nm = fmnmcal(lead,axiaload).nm

	document.getElementById("lifefm").value = fm.toFixed(0);
	document.getElementById("lifenm").value = nm.toFixed(0);
	document.getElementById("life").value  = (Math.pow(ca/fm/fw,3)*Math.pow(10,6)/60/nm).toFixed(0);
	var liferesult = document.getElementById("liferesult")
	if (Math.pow(ca/fm/fw,3)*Math.pow(10,6)/60/nm>rlife) {
		liferesult.value  = "符合需求";
		liferesult.style.color = "#0000FF"
	}else{
		liferesult.value  = "不符合需求";
		liferesult.style.color = "red"
	}

	//轉速結果
	document.getElementById("od").value = document.getElementById("chooseod").value;
	var fixtype = document.getElementById("fixtype").value;
	var od = document.getElementById("od").value;
	var maxstroke = parseFloat(document.getElementById("maxstroke").value);
	var nutl = parseFloat(document.getElementById("nutl").value);
	var lremain = parseFloat(document.getElementById("lremain").value);
	var g0v     = parseFloat(document.getElementById('g0v').value);
	var g0n = g0v/lead;

	document.getElementById("danrpm").value  = (fixtype*od/Math.pow(maxstroke+nutl+lremain,2)*Math.pow(10,7)).toFixed(0);
	var rpmresult = document.getElementById("rpmresult")
	if (document.getElementById("danrpm").value > g0n) {
		rpmresult.value  = "符合需求";
		rpmresult.style.color="#0000FF";
	}else{
		document.getElementById("rpmresult").value  = "不符合需求";
		rpmresult.style.color = "red"
	}
}

function checkarr(arr ,choose , input) { //確認arr內是否有input ,若無則放入arr及choose
	if (arr.indexOf(input)==-1) {
		arr[arr.length]=input
		choose[choose.options.length] = new Option(input)
	}
}
function renewnut(){ //依據法蘭型式,單雙螺帽,循環方式找出符合的螺帽型式
	var flangetype = document.getElementById('flangetype').value;
    var nutype = document.getElementById('nutype').value;
	var cycletype = document.getElementById('cycletype').value;	
	//初始化螺帽型式
	var choosenut = document.getElementById("choosenut"); 
		choosenut.options.length=0;
	//新建確認用的陣列
	var check = new Array();
    for (let i = 0; i < mydata.length; i++) {
		if (mydata[i].螺帽型式.indexOf(flangetype+nutype+cycletype)!=-1 ) { //確認當前的螺帽型式有符合條件
			checkarr(check,choosenut,mydata[i].螺帽型式) //確認確認用陣列是否已經有當前螺帽型式,並放入
		}		
	}
	//若最終沒有找到符合的螺帽則顯示無此螺帽
	if (choosenut.options.length==0) { 
		choosenut[0] = new Option("無此螺帽型號")
	}
	renew(0);
}

function renew(input) { //更新螺帽規格	
	var choosenut = document.getElementById('choosenut').value; //找出螺帽規格
	//將4個select宣告出來
	var chooseod = document.getElementById('chooseod'); //外徑
	var chooselead = document.getElementById('chooselead'); //導程
	var choosebd = document.getElementById("choosebd");	//珠徑
	var choosecycle = document.getElementById("choosecycle"); //循環圈數
	
	//根據當前階段初始化下一階段的select
	switch (input) {
		case 0:
			chooseod.options.length=0;
			break;
		case 1:
			chooselead.options.length=0;
			break;
		case 2:
			choosebd.options.length=0;
			break;			
		default:
			choosecycle.options.length = 0;
			break;
	}	

	var check = new Array();

	for (let i = 0; i < mydata.length; i++) {
		if (choosenut==mydata[i].螺帽型式) { //外徑的select由螺帽型式決定
			if (input==0) { //若當前為第1階段則判定螺桿外徑
				checkarr(check,chooseod,mydata[i].螺桿外徑)
			}else if (chooseod.value==mydata[i].螺桿外徑) { //若不是則加上螺桿外徑的條件決定鋼珠直徑
				if (input==1) {
					checkarr(check,chooselead,mydata[i].導程)
				}else if (chooselead.value == mydata[i].導程){
					if (input==2) {
						checkarr(check,choosebd,mydata[i].鋼珠直徑)
					}else if (choosebd.value == mydata[i].鋼珠直徑) {
						checkarr(check,choosecycle,mydata[i].循環圈數)
					}
				}
			}
		}
	}
	//若最終沒找到則顯示沒找到
	if (chooseod.options.length==0) { 
		chooseod[0] =new Option("無此導程螺帽")
	}

	if (input<3) { //若不是第3階段則繼續下一階段
		renew(input+1)
	}else{
		showpara();//若是第4階段則根據規格顯示參數
	}
}

//根據螺帽規格顯示參數
function showpara() { 
	document.getElementById("ca").value=""
	document.getElementById("c0").value=""
	document.getElementById("nutl").value=""
	document.getElementById("nuto").value=""

	var choosenut = document.getElementById('choosenut').value;
	var chooseod = document.getElementById('chooseod').value;
	var chooselead = document.getElementById('chooselead').value;
	var choosebd = document.getElementById("choosebd").value;	
	var choosecycle = document.getElementById("choosecycle").value;
	for (let i = 0; i < mydata.length; i++) {
		if (choosenut==mydata[i].螺帽型式 && chooseod==mydata[i].螺桿外徑 &&chooselead == mydata[i].導程 &&choosebd==mydata[i].鋼珠直徑&& choosecycle==mydata[i].循環圈數) {
		document.getElementById("ca").value=mydata[i].動負荷
		document.getElementById("c0").value=mydata[i].靜負荷
		document.getElementById("nutl").value=mydata[i].帽長
		document.getElementById("nuto").value=mydata[i].帽徑
		}
	}
	lifecal();
}
