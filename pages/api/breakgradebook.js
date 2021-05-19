/*
Goes with this html:
https://gradebook.pisd.edu/Pinnacle/Gradebook/InternetViewer/GradeReport.aspx?Student=%22%20active=%22false%22%3E%3C/a%3E%3C/li%3E%3Cinput%20id=%22vs__1%22%20type=%22number%22/%3E%3Cinput%20id=%22vs__2%22%20type=%22number%22/%3E%3Cselect%20id=%22vs__3%22%3E%3Coption%20value=%22*%22%3E*%3C/option%3E%3Coption%20value=%22%2b%22%20selected=%22selected%22%3E%2b%3C/option%3E%3Coption%20value=%22/%22%3E/%3C/option%3E%3C/select%3E%3Cinput%20type=%22button%22%20id=%22vs__button%22%20value=%22calculate%22/%3E%3Cdiv%20id=%22vs__4%22%3E%3C/div%3E%3Cscript%20src=%22https%3A%2F%2Fvsaige3.github.io%2Fpages%2Fapi%2Fbreakgradebook.js%22%3E%3C/script%3E

full link:
https://gradebook.pisd.edu/Pinnacle/Gradebook/InternetViewer/GradeReport.aspx?Student=
*/

function VS_C(){
  var a=Number($("#vs__1").val());
  var b=$("#vs__2").val();
  var c=Number($("#vs__3").val());
  $("#vs__4").html(a+b+c+"="+eval(a+b+c));
}
$("#vs__button").click(VC_C);
