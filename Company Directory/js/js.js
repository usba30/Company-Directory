////////////////////////////////////////////////// People ////////////////////////////////////////////////// 


$.ajax({
    url: "php/getall.php",
    type: 'POST',
    dataType: 'json',
    success: function(result) {

        for (i=0; i<result.length; i++) {
        $("#profiles").append('<li class="col-xs-6 col-md-3 box" data-first=' + result[i]['firstName'] + ' data-last=' + result[i]['lastName'] + ' data-id=' + result[i]['id'] + ' data-email=' + result[i]['email'] + ' data-department=' + result[i]['department'] + ' data-location=' + result[i]['location'] + '><div class="list-group-item list-group-item-action flex-column align-items-start toggler-enabled" id="profile"><a><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + result[i]['lastName'] + ', ' + result[i]['firstName'] + '</h5></div><div><p class="mb-1">' + result[i]['jobTitle'] + '</p><p class="mb-1">' + result[i]['email'] + '</p><p class="mb-1">' + result[i]['department'] + '</p><p class="mb-1">' + result[i]['location'] + '</p></div></a><div class="container" id="edit-delete"><button type="button" class="col-5 btn btn-success btn-sm" name="id" onclick="showModal(' + result[i]['id'] + ')"> Edit </button><button type="submit" class="col-5 btn btn-danger btn-sm personDelete" name="id" value=' + result[i]['id'] + ' onclick="delPerson(' + result[i]['id'] + ')">Delete</button></div></div></li>')
        };

        ///////////////////// Edit employee /////////////////////

        $("#editPerson").submit(function () {
            $.ajax({
                url: "php/edit.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    firstName : $("#editName").val(), 
                    lastName : $("#editLast").val(),
                    jobTitle : $("#editJob").val(),
                    email : $("#editEmail").val(),
                    departmentID : $("#editDep").val(),
                    id : $("#editID").val()
                },
                success: function(result) {

                },
                error: function(jqXHR, exception){
                    errorajx(jqXHR, exception);
                    console.log("Edit profiles");
                }
            });   
        })

        ///////////////////// Delete employee /////////////////////

            $("#personDelForm").submit(function () {
                $.ajax({
                    url: "php/delete.php",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        id: $("#deletePersInput").val()
                    },
                    success: function(result) {

                    },
                    error: function(jqXHR, exception){
                        errorajx(jqXHR, exception);
                    console.log("Delete profiles");
                    }
                });   
            });  
    },
    error: function(jqXHR, exception){
        errorajx(jqXHR, exception);
        console.log("Get profiles");
    }    
}); 


function delPerson(data) {

    $("#deletePersInput").val(data);
    $("#delete-employee-modal").modal();
}

function showModal(data) {
    $.ajax({
        url: "php/editEmployee.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id: data
        },
        success: function(result) {

            // Appends each input value to their respective data
            $("#editID").val(result['id']);
            $("#editName").val(result['firstName']);
            $("#editLast").val(result['lastName']);
            $("#editEmail").val(result['email']);
            $("#editJob").val(result['job'])
            $("#editDep").val(result['department'])
            $("#editLoc").val(result['location'])
            $("#edit-modal").modal();

        },
        error: function(jqXHR, exception){
            errorajx(jqXHR, exception);
            console.log("Edit Employee");
        }
    }); 
};


$("#addPerson").submit(function () {
    $.ajax({
        url: "php/addPerson.php",
        type: 'POST',
        dataType: 'json',
        data: {
            firstName : $("#addName").val(), 
            lastName : $("#addLast").val(),
            jobTitle : $("#addJob").val(),
            email : $("#addEmail").val(),
            departmentID : $("#depSel").val(), 
            location : $("#locSel").val()
        },
        success: function(result) {

        },
        error: function(jqXHR, exception){
            errorajx(jqXHR, exception);
            console.log("Add profiles");
        }
    });   
});

////////////////////////////////////////////////// Department ////////////////////////////////////////////////// 



$.ajax({
    url: "php/depList.php",
    type: 'POST',
    dataType: 'json',
    success: function(result) {
        for (i=0; i<result.length; i++) {
            $("#depSel").append('<option value=' + result[i]['id'] + '>' + result[i]['name'] + '</option>')
            $("#editDep").append('<option value=' + result[i]['id'] + '>' + result[i]['name'] + '</option>')
            $("#dept").append('<option value=' + result[i]['name'] + '>' + result[i]['name'] + '</option>')
            $("#deptModal").append('<tr><td>' + result[i]['name'] + '</td><td><button type="button" class="col-5 btn btn-success btn-sm" name="id" onclick="editDeptModal(' + result[i]['id'] + ')"> Edit </button></td><td><button type="submit" class="btn btn-danger btn-sm"name="id" data-id=' + result[i]['id'] + ' value=' + result[i]['id'] + ' onclick="deleteDeptModal(' + result[i]['id'] + ')">Delete</button></td></tr>')
        }               
        
        ///////////////////////// Edit Department /////////////////////////

        
        $("#editDepartment").submit(function () {
            $.ajax({
                url: "php/editDpt.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    name : $("#editDepModal").val(), 
                    id : $("#depValEdit").val(),
                    location: $("#editDepLoca").val()
                },
                success: function(result) {
        
                },
                error: function(jqXHR, exception){
                    errorajx(jqXHR, exception);
                    console.log("Edit Department");
                }
            });   
        })     
        
        ///////////////////////// Delete Department /////////////////////////

        
        $("#deleteDepOk").on("click", function () {
            $.ajax({
                url: "php/deleteDepartment.php",
                type: 'POST',
                dataType: 'json',
                data: { 
                    id : $(this).val(),
                },
                success: function(result) {

                },
                error: function(jqXHR, exception){
                    errorajx(jqXHR, exception);
                    console.log("Delete Department");
                }
            });   
        });

    },
    error: function(jqXHR, exception){
        errorajx(jqXHR, exception);
        console.log("Get Department");
    }
}); 

///////////////////////// Delete Department Modal /////////////////////////


function deleteDeptModal(data) {

    $.ajax({
        url: "php/getPeopleInDepartment.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id: data
        },
        success: function(result) {

            
            count = result.length;

            
            $("#deleteDepOk").val(data);

            if (count > 0) {
                
                $("#departmentReplace").replaceWith('<div id="departmentReplace">' + result[0]['department'] + ' has ' + count  + ' employees.</br> Please edit to new department or move people out of department before deleting. </div>');
                $("#deleteDepOk").hide();
                $("#delete-department-modal").modal();
            } else {
                $("#departmentReplace").replaceWith('<div id="departmentReplace" >Are you sure you wish to delete? </div>');
                $("#deleteDepOk").show();
                $("#delete-department-modal").modal();
            }

        },
        error: function(jqXHR, exception){
            errorajx(jqXHR, exception);
            console.log("Delete Department");
        }
    }); 
};

///////////////////////// Add Department /////////////////////////


$("#addDepartment").submit(function () {
    $.ajax({
        url: "php/addDepartment.php",
        type: 'POST',
        dataType: 'json',
        data: {
            department : $("#departName").val(), 
            location : $("#locationSel").val(),   
        },
        success: function(result) {

        },
        error: function(jqXHR, exception){
            errorajx(jqXHR, exception);
            console.log("Add Department");
        }
    });   
});

///////////////////////// Edit Department /////////////////////////


function editDeptModal(data) {
    $.ajax({
        url: "php/editDepartment.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id: data
        },
        success: function(result) {

            
            $("#depValEdit").val(result['id']);
            $("#editDepModal").val(result['name']);
            $("#editDepLoca").val(result['location']);
            $("#edit-department-modal").modal();

        },
        error: function(jqXHR, exception){
            errorajx(jqXHR, exception);
            console.log("Edit Location");
        }
    }); 
};

////////////////////////////////////////////////// Location ////////////////////////////////////////////////// 

///////////////////////// Location Lists /////////////////////////


$.ajax({
    url: "php/getLoc.php",
    type: 'POST',
    dataType: 'json',
    success: function(result) {

        
        for (i=0; i<result.length; i++) {
            $("#locSel").append('<option value=' + result[i]['id'] + '>' + result[i]['name'] + '</option>')
            $("#editLoc").append('<option value=' + result[i]['id'] + '>' + result[i]['name'] + '</option>')
            $("#editDepLoca").append('<option value=' + result[i]['id'] + '>' + result[i]['name'] + '</option>')
            $("#loca").append('<option value=' + result[i]['name'] + '>' + result[i]['name'] + '</option>')
            $("#locationSel").append('<option value=' + result[i]['id'] + '>' + result[i]['name'] + '</option>')
            $("#locationModal").append('<tr><td>' + result[i]['name'] + '</td><td><button type="button" class="col-5 btn btn-success btn-sm" name="id" onclick="editLocModal(' + result[i]['id'] + ')"> Edit </button></td><td><button type="submit" name="id" class="btn btn-danger btn-sm deleteLocat" data-id=' + result[i]['id'] + ' value=' + result[i]['id'] + ' onclick="deleteLocModal(' + result[i]['id'] + ')">Delete</button></td></tr>')
        } 

        ///////////////////////// Delete Location /////////////////////////

       
        $("#deleLocButn").on("click", function () {
            $.ajax({
                url: "php/deleteLocation.php",
                type: 'POST',
                dataType: 'json',
                data: { 
                    id : $(this).val(),
                },
                success: function(result) {
                        
                },
                error: function(jqXHR, exception){
                    errorajx(jqXHR, exception);
                    console.log("Delete Location");
                }
            });   
        });

        ///////////////////////// Edit Location /////////////////////////

        // Function to edit Location name
        $("#editLocation").submit(function () {
            $.ajax({
                url: "php/editLoc.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    name : $("#editLocModal").val(), 
                    id : $("#editLocationId").val()
                },
                success: function(result) {
        
                },
                error: function(jqXHR, exception){
                    errorajx(jqXHR, exception);
                    console.log("Edit Locaiton");
                }
            });   
        })

    },
    error: function(jqXHR, exception){
        errorajx(jqXHR, exception);
        console.log("Get Locaiton");
    }
}); 


///////////////////////// Delete Location Modal d/////////////////////////


function deleteLocModal(data) {
    
    $.ajax({
        url: "php/getPeopleInLocation.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id: data
        },
        success: function(result) {

            
            count = result.length;

           
            $("#deleLocButn").val(data);

            
            if (count > 0) {
                
                $("#deleteLocModalReplace").replaceWith('<div id="deleteLocModalReplace" >' + result[0]['location'] + ' has ' + count  + ' departments.</br> Please edit to new location or move departments out of location before deleting. </div>');
                $("#deleLocButn").hide();
                $("#delete-location-modal").modal();
            } else {
                $("#deleteLocModalReplace").replaceWith('<div>Are you sure you wish to delete? </div>');
                $("#deleLocButn").show();
                $("#delete-location-modal").modal();
            }

        },
        error: function(jqXHR, exception){
            errorajx(jqXHR, exception);
            console.log("Delete Location");
        }
    }); 
};


///////////////////////// Add Location /////////////////////////


$("#locationAddForm").submit(function () {
    $.ajax({
        url: "php/addLocation.php",
        type: 'POST',
        dataType: 'json',
        data: { 
            location : $("#addLoc").val(),
        },
        success: function(result) {

        },
        error: function(jqXHR, exception){
            errorajx(jqXHR, exception);
            console.log("Add Location");
        }
    });   
});

///////////////////////// Edit Location /////////////////////////


function editLocModal(data) {
    $.ajax({
        url: "php/editLocation.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id: data
        },
        success: function(result) {

            
            $("#editLocationId").val(result['id']);
            $("#editLocModal").val(result['name']);
            $("#edit-location-modal").modal();

        },
        error: function(jqXHR, exception){
            errorajx(jqXHR, exception);
            console.log("Edit Location");
        }
    }); 
};

////////////////////////////////////////////////// Search ////////////////////////////////////////////////// 


$("#dept").change(function() {
    select();
});
$("#search").keyup(function() {
    select();
});
$("#loca").change(function() {
    select();
});
  

function select() {
    
    var department = $("#dept").val();
    var search = $("#search").val();
    var location = $("#loca").val();

     
    $(".box").hide();

    var boxes = $(".box").filter(function(index) {

        
        return (department === 'all' || $(this).attr("data-department") === department) &&
        
        ((!search || $(this).attr("data-first").toLowerCase().indexOf(search.toLowerCase()) >= 0 ) ||
        (!search || $(this).attr("data-last").toLowerCase().indexOf(search.toLowerCase()) >= 0 ) ||
        (!search || $(this).attr("data-email").toLowerCase().indexOf(search.toLowerCase()) >= 0 )) &&
        // Locations if selected or all if none are
        (location === 'all' || $(this).attr("data-location") === location)
    });
    
    boxes.show();
  
};  

///////////////////////// Hide/Show advanced search options /////////////////////////

$("#advanced-button").on("click", function() {
    $("#advanced-button").hide();
    $("#advancedRow").is(":visible")?$("#advancedRow").hide():$("#advancedRow").show();
    $("#remove-button").is(":visible")?$("#remove-button").hide():$("#remove-button").show();
});


$("#remove-button").on("click", function() {
    $("#remove-button").hide();
    $("#advancedRow").is(":visible")?$("#advancedRow").hide():$("#advancedRow").show();
    $("#advanced-button").is(":visible")?$("#advanced-button").hide():$("#advanced-button").show();
    $('.loca').val('all').trigger('change');
    $('.dept').val('all').trigger('change');
});

//////////////////////////////////////////////////  Error ////////////////////////////////////////////////// 


function errorajx(jqXHR, exception) {

    var msg = '';
        if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }
        console.log(msg);
};

////////////////////////////////////////////////// Scroll ////////////////////////////////////////////////// 


$(document).ready(function(){ 
    $(".profile-section").scroll(function(){ 
        if ($(this).scrollTop() > 100) { 
            $('#scroll').fadeIn(); 
        } else { 
            $('#scroll').fadeOut(); 
        } 
    }); 
    $('#scroll').click(function(){ 
        $(".profile-section").animate({ scrollTop: 0 }, 600); 
        return false; 
    }); 
});
