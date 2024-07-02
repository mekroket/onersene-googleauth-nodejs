// home search filter
$(".filter-search .filt").click(function(e){
    $(".filter-search .filt").removeClass("active")
    if($("#" + e.target.id).hasClass("active") != true)
    {
        $("#" + e.target.id).addClass("active")
    }
})

// home tradesmen filter
$(".filter-tradesmen .filt").click(function(e){
    $(".filter-tradesmen .filt").removeClass("active")
    if($("#" + e.target.id).hasClass("active") != true)
    {
        $("#" + e.target.id).addClass("active")
    }
})

//show password
$(".eyes #open").click(function(){
    $(".form-pass .input .eyes").addClass("show")
    $(".form-pass .input #password").attr("type","text")
})
$(".eyes #close").click(function(){
    $(".form-pass .input .eyes").removeClass("show")
    $(".form-pass .input #password").attr("type","password")
})