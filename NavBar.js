$(document).ready(function() {
    toggleDropdownClasses()
    window.onresize = toggleDropdownClasses
});

// Dropdown animations 
$('.dropdown').hover(function () {
        $(this).find('.dropdown-menu-custom').show().addClass('animate__animated animate__fadeInUp animate__faster');
    }, function () {
        $(this).find('.dropdown-menu-custom').hide();
    }
); 

$('.dropdown').on('click', function() {
    $(this).find('.dropdown-menu-mobile').toggle();
})

$('.dropdown-menu-custom').hover(function () {
    console.log($(this).prev())
    $(this).prev().css({"color": "rgba(102,0,153,1)" })
        
    }, function () {
        $(this).prev().css({"color": "#6C757D" })
    }
);

// Toggle between mobile and desktop dropdown classes
function toggleDropdownClasses() {
    console.log(window.innerWidth)
    if (window.innerWidth <= 992) {
        $('.dropdown .dropdown-menu-custom').toggleClass('dropdown-menu-custom dropdown-menu-mobile')
        $('.dropdown .dropdown-menu-mobile').hide()
    }
    else if (window.innerWidth > 992) {
        $('.dropdown .dropdown-menu-mobile').toggleClass('dropdown-menu-custom dropdown-menu-mobile')
        $('.dropdown .dropdown-menu-custom').hide()
    }
}

