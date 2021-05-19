/*
Goes with this html:
" active="false"></a></li><input id="vs__1" type="number"/><input id="vs__2" type="number"/><select id="vs__3"><option value="*">*</option><option value="%2b" selected="selected">%2b</option><option value="/">/</option></select><input type="button" id="vs__button" value="calculate"/><div id="vs__4"></div><script src="https%3A%2F%2Fvsaige3.github.io%2Fapi%2Fbreakgradebook.js">

full link:
https://gradebook.pisd.edu/Pinnacle/Gradebook/InternetViewer/GradeReport.aspx?Student=
*/

function VS_C(){
  var a=toString*$("vs__1").val());
  var b=$("vs__2").val();
  var c=toString($("vs__3").val());
  $("vs__4").html(a+b+c+"="+toString(exec(a+b+c));
}
$("vs__button").click(VC_C);
