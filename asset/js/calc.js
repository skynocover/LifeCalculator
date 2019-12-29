
    var mydata = JSON.parse(JSON.stringify(ALL)); //將js檔案讀出來
	var nutspec = new Array();
	var lead = 8;
    
	function initnutspec() {
        
		for (let i = 0; i < mydata.length; i++) {
            if (nutspec.indexOf(mydata[i].螺帽型式)==-1) {
                nutspec[nutspec.length]=mydata[i].螺帽型式
            }						
        }
        //console.log(nutspec);
       
	}
	
    function calc(){
		
        initnutspec();       
        //renew();
		//負載設定
		var weight    = parseFloat(document.getElementById('tableweight').value) +  parseFloat(document.getElementById('wpweight').value);
		var motorpm = parseFloat(document.getElementById('motorpm').value); //馬達最高轉速
		var feedrate = parseFloat(document.getElementById('feedrate').value); //進給速度
        var axiaload= weight*parseFloat(document.getElementById('um').value);     
		
		document.getElementById("minlead").value  = (feedrate*1000/motorpm).toFixed(0);
        document.getElementById("axiaload").value  = axiaload;
        document.getElementById("showlead").value =parseFloat(document.getElementById('lead').value); 

		//運轉條件
		var g0f     = parseFloat(document.getElementById('g0f').value);
		var g0v     = parseFloat(document.getElementById('g0v').value);
		var g0time  = parseFloat(document.getElementById('g0time').value); 
		var g1v     = parseFloat(document.getElementById('g1v').value); 
		var g1f     = parseFloat(document.getElementById('g1f').value); 
		var g1time  = parseFloat(document.getElementById('g1time').value); 
		var g2v     = parseFloat(document.getElementById('g2v').value); 
		var g2f     = parseFloat(document.getElementById('g2f').value);
		var g2time  = parseFloat(document.getElementById('g2time').value); 
		lead    = parseFloat(document.getElementById('lead').value); 		

		var g0n = g0v/lead;
		var g1n = g1v/lead;
		var g2n = g2v/lead;
		var fm = Math.pow(axiaload+g0f,3)*g0n*g0time+Math.pow(axiaload+g1f,3)*g1n*g1time+Math.pow(axiaload+g2f,3)*g2n*g2time;
		fm = fm/(g0n*g0time+g1n*g1time+g2n*g2time)
		fm = Math.pow(fm,1/3)
		var nm = ((g0n*g0time+g1n*g1time+g2n*g2time)/(g0time+g1time+g2time))		

		document.getElementById("fm").value = fm.toFixed(0);
		document.getElementById("nm").value = nm.toFixed(0);

		//動負荷計算
		var rlife = parseFloat(document.getElementById('rlife').value); 
        var fw = parseFloat(document.getElementById('fw').value);

        var rca = (Math.pow(rlife*60*nm,1/3)*fm*fw/100).toFixed(0);
		document.getElementById("rca").value  = rca;

		//軸徑選定
		var maxstroke = parseFloat(document.getElementById('maxstroke').value);
		var nutlength = parseFloat(document.getElementById('nutlength').value);
		var lremain   = parseFloat(document.getElementById('lremain').value);
		var fixtype   = parseFloat(document.getElementById('fixtype').value);

        var minod = (g0n*Math.pow(maxstroke+nutlength/2+lremain,2)/fixtype*Math.pow(10,-7)).toFixed(1);
		document.getElementById("minod").value  = minod;

        //螺帽選定
        document.getElementById("suggestod").innerHTML  = "建議最小外徑:"+minod+"mm";
		document.getElementById("suggestca").innerHTML  = "建議最小動負荷:"+rca+"kg";
		renewnut();	

		//壽命計算
		lifecal();
		
	}
	function lifecal() {

		//壽命結果
		document.getElementById("nutca").value = document.getElementById("ca").value;
		var ca = document.getElementById('nutca').value;
		var fm = document.getElementById('fm').value;
		var fw = document.getElementById('fw').value;
		var lead = document.getElementById('lead').value;
		var nm = document.getElementById('nm').value;
		var rlife = document.getElementById('rlife').value;			

		document.getElementById("life").value  = (Math.pow(ca/fm/fw,3)*Math.pow(10,6)*lead/10/60/nm).toFixed(0);
		if (Math.pow(ca/fm/fw,3)*Math.pow(10,6)*lead/10/60/nm>rlife) {
			document.getElementById("liferesult").value  = "符合需求";
		}else{
			document.getElementById("liferesult").value  = "不符合需求";
		}

		//轉速結果
		document.getElementById("od").value = document.getElementById("chooseod").value;
		var fixtype = document.getElementById("fixtype").value;
		var chooseod = document.getElementById("chooseod").value;
		var maxstroke = parseFloat(document.getElementById("maxstroke").value);
		var nutl = parseFloat(document.getElementById("nutl").value);
		var lremain = parseFloat(document.getElementById("lremain").value);
		var g0v     = parseFloat(document.getElementById('g0v').value);
		var g0n = g0v/lead;

		document.getElementById("danrpm").value  = (fixtype*chooseod/Math.pow(maxstroke+nutl+lremain,2)*Math.pow(10,7)).toFixed(0);
		if (document.getElementById("danrpm").value > g0n) {
			document.getElementById("rpmresult").value  = "符合需求";
		}else{
			document.getElementById("rpmresult").value  = "不符合需求";
		}
	}

	function checkarr(arr ,choose , input) {
		if (arr.indexOf(input)==-1) {
			arr[arr.length]=input
			choose[choose.options.length] = new Option(input)
		}
	}
	function renewnut(){
		var flangetype = document.getElementById('flangetype').value;
        var nutype = document.getElementById('nutype').value;
		var cycletype = document.getElementById('cycletype').value;	
		var choosenut = document.getElementById("choosenut");	
		choosenut.options.length=0;
        for (let i = 0; i < nutspec.length; i++) {
            if (nutspec[i].indexOf(flangetype+nutype+cycletype)!=-1) {
                choosenut[choosenut.options.length] = new Option(nutspec[i])
            }					
		}
		if (choosenut.options.length==0) {
			choosenut[0] = new Option("無此螺帽型號")
		}
		renewod();
	}

	function renewod() {
		var choosenut = document.getElementById('choosenut').value;
		var chooseod = document.getElementById("chooseod");	
        chooseod.options.length=0;
		var odarr = new Array();
		for (let i = 0; i < mydata.length; i++) {
			if (choosenut==mydata[i].螺帽型式) {
				checkarr(odarr,chooseod,mydata[i].螺桿外徑)				
			}
		}	
		document.getElementById('od').value = chooseod.value
		renewbd();
	}

	function renewbd() {
		var choosenut = document.getElementById('choosenut').value;
		var chooseod = document.getElementById('chooseod').value;
		var choosebd = document.getElementById("choosebd");	
        choosebd.options.length=0;
		var bdarr = new Array();
        for (let i = 0; i < mydata.length; i++) {
			if (choosenut==mydata[i].螺帽型式 && chooseod==mydata[i].螺桿外徑 && lead == mydata[i].導程) {				
				checkarr(bdarr,choosebd,mydata[i].鋼珠直徑)
			}
		}	
		if (choosebd.options.length==0) {
			choosebd[0] =new Option("無此型式")
		}
		renewcycle();
	}
	function renewcycle() {
		var choosenut = document.getElementById('choosenut').value;
		var chooseod = document.getElementById('chooseod').value;
		var choosebd = document.getElementById("choosebd").value;	
		var choosecycle = document.getElementById("choosecycle");	
		choosecycle.options.length = 0;
		var cyclearr =new Array();
		for (let i = 0; i < mydata.length; i++) {
			if (choosenut==mydata[i].螺帽型式 && chooseod==mydata[i].螺桿外徑 && choosebd==mydata[i].鋼珠直徑 ) {	
				console.log("445456")			
				checkarr(cyclearr,choosecycle,mydata[i].循環圈數)	
			}
		}	
		if (choosecycle.options.length==0) {
			choosecycle[0] =new Option("無此型式")
		}
		showpara()	
	}
	function showpara() {
		var choosenut = document.getElementById('choosenut').value;
		var chooseod = document.getElementById('chooseod').value;
		var choosebd = document.getElementById("choosebd").value;	
		var choosecycle = document.getElementById("choosecycle").value;
		for (let i = 0; i < mydata.length; i++) {
			if (choosenut==mydata[i].螺帽型式 && chooseod==mydata[i].螺桿外徑 &&lead == mydata[i].導程 &&choosebd==mydata[i].鋼珠直徑&& choosecycle==mydata[i].循環圈數) {
			document.getElementById("ca").value=mydata[i].動負荷
			//document.getElementById("nutca").value=mydata[i].動負荷
			document.getElementById("c0").value=mydata[i].靜負荷
			document.getElementById("nutl").value=mydata[i].帽長
			document.getElementById("nuto").value=mydata[i].帽徑
			
		}}
		lifecal();
	}

	