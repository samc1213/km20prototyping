<!DOCTYPE html>
<html>
<head>
<meta charset=utf-8 />
 
<title>KM 2.0</title>
    
    <link rel="stylesheet" href="css/jqtree.css"> 
    <link rel="stylesheet" href="css/custom.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">

</head>
<body>

    <h1>KM 2.0 Testing</h1>
    <div id="parent">
        <div id="leftpane">
            <button id="newcategorybtn" class="btn-default btn newelementbtn">Add new category to tree</button>
            <button id="newfieldbtn" class="btn-default btn newelementbtn">Add new field to tree</button>
            <button id="submitheirarchybtn" class="btn-default btn">Save hierarchy</button>
            <button id="deletenode" class="btn-default btn">Delete selected node</button>
            <div id="tree1"></div>
        </div>
        <div id="rightpane">
            <div id="categorydiv">
                <h2>Category</h2>
                <div class="ancestors"></div>
                <label for="categoryname">Category name:</label>
                <input type="text" id="categoryname"> <br>
                <span>Level: </span><span id="categorylevel"></span> <br>
                <a href="" id="showquestion">Show category question</a>
                <input id="categoryquestion">
                <input type="hidden" id="categoryid">
                <button id="savecategorychanges" class="btn-default btn">Save</button>            
            </div>
            <div id="fielddiv">
                <h2>Field</h2>
                <div class="ancestors"></div>
                <label for="fieldname">Field name:</label>
                <input type="text" id="fieldname"> <br>
                <label for="fieldtype">Field type: </label>
                <select id="fieldtype"></select><br>
                <input type="hidden" id="fieldid">
                <input type="checkbox" id="fieldunits">Units?</label> 
                <button id="savefieldchanges" class="btn-default btn">Save</button>    
            </div>
        </div>
    </div>
</body>
    
<script src="js/jquery.min.js"></script>
<script src="js/tree.jquery.js"></script>
<script src="js/index.js"></script>
    
</html>