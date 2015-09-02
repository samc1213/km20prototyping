$(document).ready(function () {
    hierarchy = {};
    fieldarray = [];
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
        var categoryChildren = false;
        if (node.children != null)
        {
            for (var i = 0; i < node.children.length; i++) {
                var child = node.children[i];
                console.log(child.name);
                if (child.type == 'category')
                {
                    categoryChildren = true;
                    var appendstr = '<option value="' + child.id + '">' + child.name + '</option>';
                    $('#categoryoptions').append(appendstr);
                }
                else if (child.type == 'field')
                {
                    fieldarray.push(child);
                }
            }
//        if after iterating through children, no child is a category, time to hide the category form and show the field form
            if (categoryChildren == false)
            {
                $('#categoryform').hide();
                console.log('done');
                console.log(fieldarray);
                $('#fieldform').show();
                populateFields(fieldarray);
            }
        }
        else
        {
            populateFields(fieldarray);
            $('#categoryform').hide();
            $('#fieldform').show();
        }
    };
    
    function populateFields(fieldarray) {
        if (fieldarray.length == 0)
        {
            alert('no fields associated with this category');
        }
        else
        {
            for (var i = 0; i < fieldarray.length; i++)
            {
                $newfielddiv = $('<div>');
                $newfielddiv.append('<label for="' + fieldarray[i].name + '">' + fieldarray[i].name + '</label>');
                $newfielddiv.append('<input type="text" name="' + fieldarray[i].name + '"/><br><br>');
                $('#fieldform').prepend($newfielddiv);
            }
        }
    };
    
    $('#categoryform').submit(function (e) {
        e.preventDefault();
        var nextcategoryid = $(this).find('#categoryoptions').val();
        console.log(nextcategoryid);
        console.log(hierarchy);
//        check for the selected child node in the children array, and set current node to selected child
        for (var i =0; i < currentnode.children.length; i++) {
            childnode = currentnode.children[i];
            if (childnode.id == nextcategoryid)
            {
                currentnode = childnode;
                console.log(currentnode);
                populateForm(currentnode);
                return;
            }
        }
    });
    
    $('#fieldform').submit(function(e) {
        e.preventDefault();
        
        var data = JSON.stringify($(this).serializeArray());
        
        $.ajax({
            type: "POST",
            url: '/php/postform.php',
            data: {
                data: data,
            },
            success: function (data) {
                console.log(data);
            },
        });
    });
});