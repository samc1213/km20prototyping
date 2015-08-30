<!DOCTYPE html>
<html>
<head>
<meta charset=utf-8 />
 
<title>KM 2.0</title>
    
    <link rel="stylesheet" href="css/jqtree.css"> 
    <link rel="stylesheet" href="css/custom.css">

</head>
<body>
    <h1>KM 2.0 Testing</h1>
    <div id="parent">
        
        <div id="leftpane">
            <button id="newcategorybtn" class="newelementbtn">Add new category to tree</button>
            <button id="newfieldbtn" class="newelementbtn">Add new field to tree</button>
            <button id="submitheirarchybtn">Save hierarchy</button>
            <button id="deletenode">Delete selected node</button>
            <div id="tree1"></div>
        </div>
        <div id="rightpane">
            <div id="categorydiv">
                <h2>Category</h2>
                <label for="categoryname">Category name:</label>
                <input type="text" id="categoryname"> <br>
                <span>Level: </span><span id="categorylevel"></span> <br>
                <a href="" id="showquestion">Show category question</a>
                <input id="categoryquestion">
                <input type="hidden" id="elementid">
                <button id="savechanges">Save</button>            
            </div>
            
            <div id="fielddiv">
                <h2>Field</h2>
                <label for="fieldname">Field name:</label>
                <input type="text" id="fieldname"> <br>
                <label for="fieldtype">Field type: </label>
                <select id="fieldtype"></select><br>
                <input type="checkbox" id="fieldunits">Units?</label> 
            </div>

        </div>
    </div>

</body>
    
    <script src="js/jquery.min.js"></script>
    <script src="js/tree.jquery.js"></script>
    <script src="js/index.js"></script>
    
</html>