/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


var jpdbBaseURL =" http://api.login2explore.com:5577";
var jpdbIRL ="/api/irl";
var jpdbIML ="/api/iml";
var stdDBName ="SCHOOL-DB";
var stdRelation ="STUDENT-TABLE";
var connToken ="90938256|-31949273603123674|90952491";

$("#stdId").focus();

function saveRecNo2LS(jsonObj){
    var lvData =JSON.parse(jsonObj.data);
    localStorage.setItem("recno",lvData.rec_no);
}

function getStdIdAsjsonObj(){
    var stdid =$("#stdId").val();
    var jsonStr ={
        roll_no: stdid
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
     saveRecNo2LS(jsonObj);
     var data =JSON.parse(jsonObj.data).record;
     $("#stdName").val(data.name);
     $("#stdClass").val(data.class);
     $("#stdBD").val(data.birthdate);
     $("#stdAd").val(data.address);
     $("#stdED").val(data.enrollmentdate);
}

function resetForm(){
    $('#stdId').val("");
    $('#stdName').val("");
    $('#stdClass').val("");
    $('#stdBD').val("");
    $('#stdAd').val("");
    $('#stdED').val("");
    $('#stdId').prop("disabled",false);
    $('#save').prop("disabled",false);
    $("#change").prop("disabled",true);
    $("#reset").prop("disabled",true);
    $("#stdId").focus();
}

function validateData(){
    var rollno, studentname, stdclass ,birthdate, address, enrollmentdate;
    rollno =$("#stdId").val();
    studentname=$("#stdName").val();
    stdclass=$("#stdClass").val();  
    birthdate=$("#stdBD").val();
    address=$("#stdAd").val();
    enrollmentdate=$("stdED").val();
    
    if(rollno ===""){
        alert("Student Roll no is Missing ");
        $("#rollno").focus();
        return'';
    }
    if(studentname ===""){
        alert("Student name is  Missing ");
        $("#studentname").focus();
        return'';
    }
 if(stdclass ===""){
        alert("Student class is  Missing ");
        $("#stdclass").focus();
        return'';
    }
 if(birthdate ===""){
        alert("Student  Birthdate is Missing ");
        $("#birthdate").focus();
        return'';
    }
 if(address ===""){
        alert("Student Address is  Missing ");
        $("#address").focus();
        return'';
    }
 if(enrollmentdate ===""){
        alert("Student Enrollment Date is  Missing ");
        $("#enrollmentdate").focus();
        return'';
    }
    
    var jsonStrObj ={
        roll_no:rollno,
        full_name: studentname,
        Class: stdclass,
        Birth_Date: birthdate,
        Address:address,
        Enrollment_Date:enrollmentdate
    };
    return JSON.stringify(jsonStrObj);
}

function getStd(){
    var stdIdJsonObj = getStdIdAsJsonObj();
    var getRequest =createGET_BY_KEYRequest(connToken,stdDBName,stdRelation,stdIdJsonObj);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL);
    jQuery.ajaxsetup({async:true});
    if(resJsonObj.status=== 400){
        $("#save").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#stdName").focus();
     
    }else if (resJsonObj.status===200){
        
        $("#stdId").prop("disabled",true);
        filldata(resJsonObj);
        
        $("#change").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#stdName").focus();
        
    }
}

function saveData(){
    var jsonStrObj = validateData();
    if (jsonStrObj ===""){
        return'';
    }
    var putRequest = createPUTRequest(connToken,jsonStrObj, stdDBName, stdRelation);
jQuery.ajaxSetup({async: false});
var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
jQuery.ajaxSetup({async: true});
resetForm();
$("#stdId").focus();
}

function changeData(){
    $("#change").prop("disabled",true);
    jsonChg = validataData();
    var updateRequest =createUPDATERecordRequest(connToken,jsonChg,stdDBName,stdRelation,localStorage.getItem("recno"));
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async:true});
    console.log(resJsonObj);
    resetForm();
    $("#stdId").focus();
    }




