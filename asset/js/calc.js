var mydata = JSON.parse(JSON.stringify(ALL)); //將js檔案讀出來
var table = JSON.parse(JSON.stringify(Language)); //將js檔案讀出來
var lang=0;
var ftypetext = [["有法蘭","無法蘭","方形螺帽"],["Flange type","None flange type","Square nut"]]
var ftypevalue = ["F","R","S"]
var ntypetext = [["單螺帽","雙螺帽","偏位導程"],["Single nut","Double nut","Lead offset nut"]]
var ntypevalue = ["S","D","O"]
var ctypetext = [["端塞","內循環","端蓋","外循環圓周型","外循環圓周型(無固定座)","外循環管凸出型"],["End decector"," Internal ball circulation"," External extrusive circulation"," External immersion circulation"," External immersion circulation ( non-bracked)"," External extrusive circulation"]]
var ctypevalue = ["D","I","K","W","B","V"]

function change(language) {
	lang = language;
	document.getElementById("LoadSet").innerHTML=table[language].LoadSet;
	document.getElementById("TableW").innerHTML=table[language].TableW;
	document.getElementById("WpW").innerHTML=table[language].WpW;
	document.getElementById("u").innerHTML=table[language].u;
	document.getElementById("AF").innerHTML=table[language].AF;
	document.getElementById("MaxV").innerHTML=table[language].MaxV;
	document.getElementById("MaxRpm").innerHTML=table[language].MaxRpm;
	document.getElementById("MinLead").innerHTML=table[language].MinLead;
	document.getElementById("ChooseLead").innerHTML=table[language].ChooseLead;
	document.getElementById("RunSet").innerHTML=table[language].RunSet;
	document.getElementById("G0L").innerHTML=table[language].G0L;
	document.getElementById("G0F").innerHTML=table[language].G0F;
	document.getElementById("G0T").innerHTML=table[language].G0T;
	document.getElementById("G1L").innerHTML=table[language].G1L;
	document.getElementById("G1F").innerHTML=table[language].G1F;
	document.getElementById("G1T").innerHTML=table[language].G1T;
	document.getElementById("G2L").innerHTML=table[language].G2L;
	document.getElementById("G2F").innerHTML=table[language].G2F;
	document.getElementById("G2T").innerHTML=table[language].G2T;
	document.getElementById("MeanL").innerHTML=table[language].MeanL;
	document.getElementById("MeanRpm").innerHTML=table[language].MeanRpm;
	document.getElementById("BasicDload").innerHTML=table[language].BasicDload;
	document.getElementById("Rlife").innerHTML=table[language].Rlife;
	document.getElementById("SafeC").innerHTML=table[language].SafeC;
	document.getElementById("MinLoad").innerHTML=table[language].MinLoad;
	document.getElementById("ScrewDset").innerHTML=table[language].ScrewDset;
	document.getElementById("MaxStork").innerHTML=table[language].MaxStork;
	document.getElementById("NutL").innerHTML=table[language].NutL;
	document.getElementById("Unthread").innerHTML=table[language].Unthread;
	document.getElementById("Shaftmount").innerHTML=table[language].Shaftmount;
	document.getElementById("MinD").innerHTML=table[language].MinD;
	document.getElementById("SupSup").innerHTML=table[language].SupSup;
	document.getElementById("FixSup").innerHTML=table[language].FixSup;
	document.getElementById("FixFix").innerHTML=table[language].FixFix;
	document.getElementById("FixFree").innerHTML=table[language].FixFree;
	document.getElementById("NutSet").innerHTML=table[language].NutSet;
	document.getElementById("Flangetype").innerHTML=table[language].Flangetype;
	document.getElementById("Nutype").innerHTML=table[language].Nutype;
	document.getElementById("CirculType").innerHTML=table[language].CirculType;
	document.getElementById("Choosenut").innerHTML=table[language].Choosenut;
	document.getElementById("Suggestod").innerHTML=table[language].Suggestod;
	document.getElementById("Suggestlead").innerHTML=table[language].Suggestlead;
	document.getElementById("BD").innerHTML=table[language].BD;
	document.getElementById("ET").innerHTML=table[language].ET;
	document.getElementById("Suggestca").innerHTML=table[language].Suggestca;
	document.getElementById("Sload").innerHTML=table[language].Sload;
	document.getElementById("NutOD").innerHTML=table[language].NutOD;
	document.getElementById("Sload").innerHTML=table[language].Sload;
	document.getElementById("NutOD").innerHTML=table[language].NutOD;
	document.getElementById("NutLen").innerHTML=table[language].NutLen;
	document.getElementById("LifeCal").innerHTML=table[language].LifeCal;
	document.getElementById("NutDynamic").innerHTML=table[language].NutDynamic;
	document.getElementById("Mrpm").innerHTML=table[language].Mrpm;
	document.getElementById("Mload").innerHTML=table[language].Mload;
	document.getElementById("SO").innerHTML=table[language].SO;
	document.getElementById("LifeP").innerHTML=table[language].LifeP;
	document.getElementById("LifeR").innerHTML=table[language].LifeR;
	document.getElementById("CS").innerHTML=table[language].CS;
	document.getElementById("Drpm").innerHTML=table[language].Drpm;
	document.getElementById("RpmR").innerHTML=table[language].RpmR;
	for (let i = 0; i < document.getElementsByName("Pstep").length; i++) {
		document.getElementsByName("Pstep")[i].innerHTML=table[language].Pstep;
		
	}
	for (let i = 0; i < document.getElementsByName("Nstep").length; i++) {
		document.getElementsByName("Nstep")[i].innerHTML=table[language].Nstep;
		
	}
	flangetype.options.length=0;
	for (let i = 0; i < ftypetext[lang].length; i++) {		
		flangetype[flangetype.options.length] = new Option(ftypetext[lang][i],ftypevalue[i])		
	}
	nutype.options.length=0;
	for (let i = 0; i < ntypetext[lang].length; i++) {		
		nutype[nutype.options.length] = new Option(ntypetext[lang][i],ntypevalue[i])		
	}
	cycletype.options.length=0;
	for (let i = 0; i < ctypetext[lang].length; i++) {		
		cycletype[cycletype.options.length] = new Option(ctypetext[lang][i],ctypevalue[i])		
	}
	calc()
}

function calc(){
	//負載設定
	var weight   = parseFloat(document.getElementById('tableweight').value) +  parseFloat(document.getElementById('wpweight').value);
	var motorpm  = parseFloat(document.getElementById('motorpm').value);   //馬達最高轉速
	var feedrate = parseFloat(document.getElementById('feedrate').value);  //進給速度
    var axiaload = weight*parseFloat(document.getElementById('um').value); //軸向負荷
	
	var minlead  = (feedrate*1000/motorpm).toFixed(0); //最小建議導程
	document.getElementById("minlead").value  = minlead;
	document.getElementById("axiaload").value = axiaload.toFixed(0);
	
	//運轉條件	
	var lead  = parseFloat(document.getElementById('lead').value); 	

	var m = fmnmcal(lead,axiaload)
	var fm = m.fm //平均負荷
	var nm = m.nm //平均轉速
	document.getElementById("fm").value = fm.toFixed(0);
	document.getElementById("nm").value = nm.toFixed(0);

	//動負荷計算
	var rlife = parseFloat(document.getElementById('rlife').value); 
    var fw    = parseFloat(document.getElementById('fw').value);

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
    document.getElementById("Suggestod").innerHTML    = table[lang].suggestodtext+minod+"mm";
	document.getElementById("Suggestca").innerHTML    = table[lang].suggestdltext+rca+"kg";
	document.getElementById("Suggestlead").innerHTML  = table[lang].suggestldtext+minlead+"mm";

	//壽命計算
	lifecal();
}

class load {
	constructor(lf, lv, ltime,lead) {
		this.f = parseFloat(document.getElementById(lf).value);
		this.v = parseFloat(document.getElementById(lv).value);
		this.time = parseFloat(document.getElementById(ltime).value);
		this.n = this.v/lead;
	}
}

//計算平均轉速及平均負荷
function fmnmcal(lead,axiaload) {

	var g0 = new load('g0f','g0v','g0time',lead);
	var g1 = new load('g1f','g1v','g1time',lead);
	var g2 = new load('g2f','g2v','g2time',lead);

	var fm = Math.pow(axiaload+g0.f,3)*g0.n*g0.time+Math.pow(axiaload+g1.f,3)*g1.n*g1.time+Math.pow(axiaload+g2.f,3)*g2.n*g2.time;
	fm = fm/(g0.n*g0.time+g1.n*g1.time+g2.n*g2.time)
	fm = Math.pow(fm,1/3) //平均負荷
	var nm = ((g0.n*g0.time+g1.n*g1.time+g2.n*g2.time)/(g0.time+g1.time+g2.time)) //平均轉速	

	return{
		'fm':fm,
		'nm':nm
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

	var m = fmnmcal(lead,axiaload)
	var fm = m.fm
	var nm = m.nm
	
	document.getElementById("lifefm").value = fm.toFixed(0);
	document.getElementById("lifenm").value = nm.toFixed(0);
	document.getElementById("life").value  = (Math.pow(ca/fm/fw,3)*Math.pow(10,6)/60/nm).toFixed(0);
	var liferesult = document.getElementById("liferesult")
	if (Math.pow(ca/fm/fw,3)*Math.pow(10,6)/60/nm>rlife) {
		liferesult.value  = table[lang].confirm;
		liferesult.style.color = "#0000FF"
	}else{
		liferesult.value  = table[lang].notconfirm;
		liferesult.style.color = "red"
	}

	//轉速結果
	document.getElementById("od").value = document.getElementById("chooseod").value;
	var fixtype   = document.getElementById("fixtype").value;
	var od        = document.getElementById("od").value;
	var maxstroke = parseFloat(document.getElementById("maxstroke").value);
	var nutl      = parseFloat(document.getElementById("nutl").value);
	var lremain   = parseFloat(document.getElementById("lremain").value);
	var g0v       = parseFloat(document.getElementById('g0v').value);
	var g0n       = g0v/lead;

	document.getElementById("danrpm").value  = (fixtype*od/Math.pow(maxstroke+nutl+lremain,2)*Math.pow(10,7)).toFixed(0);
	var rpmresult = document.getElementById("rpmresult")
	if (document.getElementById("danrpm").value > g0n) {
		rpmresult.value  = table[lang].confirm;
		rpmresult.style.color="#0000FF";
	}else{
		document.getElementById("rpmresult").value  = table[lang].notconfirm;
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
    var nutype     = document.getElementById('nutype').value;
	var cycletype  = document.getElementById('cycletype').value;	
	//初始化螺帽型式
	var choosenut  = document.getElementById("choosenut"); 
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
		choosenut[0] = new Option(table[lang].nonut)
	}
}

function renew(input) { //更新螺帽規格	
	var choosenut   = document.getElementById('choosenut').value; //找出螺帽規格
	//將4個select宣告出來
	var chooseod    = document.getElementById('chooseod'); //外徑
	var chooselead  = document.getElementById('chooselead'); //導程
	var choosebd    = document.getElementById("choosebd");	//珠徑
	var choosecycle = document.getElementById("choosecycle"); //循環圈數

	var choose = [chooseod,chooselead,choosebd,choosecycle]
	choose[input].options.length = 0

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
		chooseod[0] =new Option(table[lang].nonut)
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
