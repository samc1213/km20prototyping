$(document).ready(function () {
    nodecount = 0;
    questions = [];
    fieldtypes = ['Plain Text', 'Dropdown', 'Integer', 'Decimal'];
    
    $.each(fieldtypes, function (i, v) {
        $('#fieldtype').append('<option name="' + fieldtypes[i] + '">' + fieldtypes[i] + '</option>');
    });
    
    
    $('#tree1').tree({
        data: [],
        dragAndDrop: true,
        onCanMoveTo: function(moved_node, target_node, position) {
            //don't allow fields to have children
            if (target_node.type == 'field') {
                return false;
            }
            else {
                return true;
            }
        }
    });
    
    $('#tree1').bind(
        'tree.select',
        function (event) {
            if (event.node) {
                // node was selected
                var node = event.node;
                var nodelevel = node.getLevel();
                var type = node.type;
                
                if (type == 'category') {
                    $('#categorydiv').show();
                    $('#fielddiv').hide();
                    $('#categoryname').val(node.name);
                    $('#categorylevel').text(nodelevel);
                    $('#elementid').val(node.id);
                    $('#categoryquestion').val(node.question);
                }
                
                else {
                    $('#categorydiv').hide();
                    $('#fielddiv').show();
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
    
    $('#savechanges').click( function(e) {
        $tree = $('#tree1');
        var nodeid = $('#elementid').val();
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
});