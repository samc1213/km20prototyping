$(document).ready(function () {
    nodecount = 0;
    questions = [];
    jsonhierarchy = '';
    
    fieldtypes = ['Plain Text',];
    
    $.each(fieldtypes, function (i, v) {
        $('#fieldtype').append('<option name="' + fieldtypes[i] + '">' + fieldtypes[i] + '</option>');
    });
    
    function createTree(jsonhierarchy) {
        $('#tree1').tree({
            data: JSON.parse(jsonhierarchy),
            dragAndDrop: true,
            onCanMoveTo: function(moved_node, target_node, position) {
                //don't allow fields to have children
                if (target_node.type == 'field') {
                    return false;
                }
                else {
                    return true;
                }
            },
            onCreateLi: function (node, $li) {
                //add css class for styling purposes
                if (node.type) {
                    var $title = $li.find('.jqtree-title');
                    $title.addClass(node.type);
                }
            }
            
        });
    };
    
    function validateHierarchy(hierarchy) {
//        check if there is one node at the top level of the hierarchy - everything should be under the root node
        if (hierarchy.length != 1)
        {
            return 'Every node must fall under the root node';
        }
        return 'Valid';
    };
    
    $.ajax({
        type: "GET",
        url: '/php/gethierarchy.php',
        success: function (data) {
            jsonhierarchy = data;
            console.log(data);
            createTree(jsonhierarchy);
            rootnode = $('#tree1').tree('getTree');
            console.log(rootnode.getData());
            var trueroot = rootnode.children[0];
            console.log(trueroot);
            console.log(getNodecount(trueroot));
            nodecount = getNodecount(trueroot);
        },
        async: true,
    });
    
    function getNodecount(rootnode) {
        queue = [];
        count = 0;
        queue.push(rootnode);
        return getNodecountrecurse(queue);
    };
    
    function getNodecountrecurse(queue) {
        while (queue.length != 0)
        {
            var node = queue.pop();
            count++;
                for (var i = 0; i < node.children.length; i++) {
                        queue.push(node.children[i]);
                    }
                return getNodecountrecurse(queue);
        }
        return count;
    };
    
    function getAllAncestors(node) {
        var nodes = [];
        currentnode = node.parent;
        while (currentnode.id != null) {
            nodes.push(currentnode);
            currentnode = currentnode.parent;
        }
        return nodes;
    };
    
    function writeAncestors(ancestors) {
        $(".ancestors").html('');
        for (var i = 0; i < ancestors.length; i++)
        {
            $(".ancestors").append("<p>>> </p>");
            var currentancestor = ancestors[i];
            $(".ancestors").append("<span class='ancestor'  onclick = 'ancestorClick()' id='ancestor" +  currentancestor.id + "'>" + currentancestor.name + "</span>");
            $(".ancestors").append(" ");
        }
    };
    
    function ancestorClick() {
        console.log(this);
        console.log("CLICK");
    };
    
    $('#tree1').bind(
        'tree.select',
        function (event) {
            if (event.node) {
                // node was selected
                node = event.node;
                writeAncestors(getAllAncestors(node));
                var nodelevel = node.getLevel();
                var type = node.type;
                
                if (type == 'category') {
                    $('#categorydiv').show();
                    $('#fielddiv').hide();
                    $('#categoryname').val(node.name);
                    $('#categorylevel').text(nodelevel);
                    $('#categoryid').val(node.id);
                    $('#categoryquestion').val(node.question);
                }
                
                else {
                    $('#categorydiv').hide();
                    $('#fieldname').val(node.name);
                    $('#fieldtype').val(node.fieldtype);
                    $('#fielddiv').show();
                    $('#fieldid').val(node.id);
                }
            } else {
                // event.node is null
                // a node was deselected
                // e.previous_node contains the deselected node
                $('#categorydiv').hide();
                $('#fielddiv').hide();
            }
        }
    );
    
    $('#savecategorychanges').click( function(e) {
        $tree = $('#tree1');
        var nodeid = $('#categoryid').val();
        var node = $tree.tree('getNodeById', nodeid);
        var newlabel = $('#categoryname').val();
        var level = $('#elementlevel').text();
        var levelquestion = $('#categoryquestion').val();
                
        $tree.tree(
            'updateNode',
            node, {
                label: newlabel,
                question: levelquestion
            }
        );
    });
    
    $('#savefieldchanges').click( function(e) {
        $tree = $('#tree1');
        var nodeid = $('#fieldid').val();
        var node = $tree.tree('getNodeById', nodeid);
        
        var newlabel = $('#fieldname').val();
        var newfieldtype = $('#fieldtype').val();
        
        $tree.tree(
            'updateNode',
            node, {
                label: newlabel,
                fieldtype: newfieldtype,
            }
        );
    });
    
    $('.newelementbtn').click( function(e) {
        $tree = $('#tree1');
        var attributes = {};
        
        if ($(this).attr('id') == 'newcategorybtn') {
            attributes.type = 'category';
            attributes.label = 'new_category';
            attributes.question = '';
            
        }
        else {
            attributes.type = 'field';
            attributes.label = 'new_field';
            attributes.fieldtype = fieldtypes[0];
        }
        
        attributes.id = nodecount;
        
        $tree.tree(
            'appendNode', attributes
        );
        
        var node = $tree.tree('getNodeById', nodecount);
        $tree.tree('selectNode', node);
        
        nodecount++;
    });
    
    $('#showquestion').click( function(e) {
        e.preventDefault();
        var currentdisplay = $('#categoryquestion').css('display');
        if (currentdisplay == 'none')
        {
            $('#categoryquestion').css('display', 'block');
            $(this).text('Hide category question');
        }
        else
        {
            $('#categoryquestion').hide();
            $(this).text('Show category question');
        }
    });
    
    $('#submitheirarchybtn').click(function (e) {
        e.preventDefault();
        var rootnode = $('#tree1').tree('getTree');
        data = rootnode.getData();
        var validation = validateHierarchy(data);
        if (validation != 'Valid')
        {
            alert(validation);
            return;
        }
        jsondata = JSON.stringify(data);
        
        $.ajax({
            type: "POST",
            url: '/php/savehierarchy.php',
            data: {
                data: jsondata
            },
            success: function(data) {
                console.log(data);
            },
        });
    });
    
    $('#deletenode').click( function(e) {
        $tree = $('#tree1');
        var selectednode = $tree.tree('getSelectedNode');
        if (selectednode.id != 0)
        {
            $tree.tree('removeNode', selectednode);
            nodecount--;
        }
        else
        {
            alert("Can't delete the root node!");
        }

    });
});