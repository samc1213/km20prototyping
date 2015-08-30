$(document).ready(function () {
    hierarchy = {};
    currentnode = {};
    $.ajax({
        type: "GET",
        url: '/php/gethierarchy.php',
        success: function (data) {
            jsonhierarchy = data;
            console.log(data);
            hierarchy = JSON.parse(jsonhierarchy);
            console.log(hierarchy);
            var root = hierarchy[0];
            currentnode = root;
            populateForm(root);
        },
        async: true,
    });
    
    function populateForm(node) {
        $('#categoryformlabel').text(node.question);
        $('#categoryoptions').html('');
        for (var i = 0; i < node.children.length; i++) {
            var child = node.children[i];
            console.log(child.name);
            var appendstr = '<option value="' + child.id + '">' + child.name + '</option>';
            $('#categoryoptions').append(appendstr);   
        }
    };
    
    $('#categoryform').submit(function (e) {
        e.preventDefault();
        var nextcategoryid = $(this).find('#categoryoptions').val();
        console.log(nextcategoryid);
        console.log(hierarchy);
        for (var i =0; i < currentnode.children.length; i++) {
            
        }
        hierarchy
    });
});