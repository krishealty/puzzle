var setup={
     puzzle_fifteen:{
        diff:300, // number of movements of the slots for shuffling pictures
        size:[512,640], // element size "fifteen" in pixels only
        grid:[3,4], // the number of squares in the height and width of the picture
        fill:true, // Stretching the area with the game to fit the element is recommended for fullscreen
        number:false, // Slot sequence number
        art:{
            url:"art.jpg", // path to the picture (you can use any format of supported browsers, gif-animation of svg)
            ratio:false // enlarge the picture in height or width
        },
        // optional elements
        keyBoard:true, // Control using the keys on the keyboard
        gamePad:true, // Control using the joystick on the Gamepad
        time:0.1, // block move animation time
        style:"background-color:#c4cebb;display:grid;justify-items:center;align-items:center;font-family:Arial;color:#fff;border-radius:12px;font-size:32px;" // style for puzzle square
     }
}
slot_style.value=setup.puzzle_fifteen.style;
var img_file=document.getElementById('img_file'),img=document.getElementById("art"),file;
img_file.addEventListener('change',loadFiles);
function loadFiles(e){
    file=img_file.files[0];
    adden_file();
}
function adden_file(){
    setup.puzzle_fifteen.art.url=window.URL.createObjectURL(file)
    img.src=setup.puzzle_fifteen.art.url;
    img.onload=function(){setup.puzzle_fifteen.size=[img.width,img.height];auto_grid();auto_style();fifteen_update();}
}
function auto_grid(){
    var s=setup.puzzle_fifteen
    if(s.size[1]<s.size[0]){s.grid=[Math.round(s.size[0]/(s.size[1]/4))-1,3]}
    else{s.grid=[3,Math.round(s.size[1]/(s.size[0]/4))-1]}
    grid_width.value=s.grid[0];
    grid_height.value=s.grid[1];
    width.value=s.size[0];
    height.value=s.size[1];
}
function auto_style(){
    var s=setup.puzzle_fifteen,v,i;
    if(s.size[1]<s.size[0]){v=Math.round((s.size[0]/s.grid[0])/16)}
    else{v=Math.round((s.size[1]/s.grid[1])/16)}
    d=s.style.split(";");
    for(i=0;i<d.length;i++){
        if(d[i].includes("border-radius")){s.style=s.style.replace(d[i],"border-radius:"+Math.round(v*1.5)+"px")}
        else if(d[i].includes("font-size")){s.style=s.style.replace(d[i],"font-size:"+(v*3)+"px")}
    }slot_style.value=s.style;
}
function fifteen_update(){
    f.innerHTML="";
    ceation_slots();
}
function fifteen_build(){
    var reader=new FileReader();
    if(file){reader.readAsDataURL(file);}else{alert('Please upload a file with a picture')}
    reader.onload=function(){setup.puzzle_fifteen.art.url=reader.result;gen_file();}
    reader.onerror=function(error){alert('Error: '+error);}
    function gen_file(){
        var url="fifteen_puzzle.js";
        var xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=function(){
            if(this.readyState==4&&this.status==200){
                var html="data:text/json;charset=utf-8,"+encodeURIComponent("<!DOCTYPE html>\n<html>\n<head>\n<style>\n body{height:97vh;padding:0;display:grid;align-content:center;justify-content:center;}\n</style>\n</head>\n<body>\n<div id='fifteen'></div>\n<script>\n"+this.responseText.replace("setup.puzzle_fifteen",JSON.stringify(setup.puzzle_fifteen,null,'\t'))+"\n<\/script>\n<\/body>\n<\/html>");
                var a=document.getElementById('dwonload');
                a.setAttribute("href", html );
                a.setAttribute("download","index.html");
                a.click();
            }
        };
        xmlhttp.open("GET",url,true);
        xmlhttp.send();
        xmlhttp.onerror=function(){if(this.status==0){alert('runetime not loaded');}}
    }
}
var drop = {
    init:function(){
        if (window.File&&window.FileReader&&window.FileList&&window.Blob) {
            window.addEventListener("dragover",function(e){
                e.preventDefault();
                e.stopPropagation();
            });
            window.addEventListener("drop",function(e){
                e.preventDefault();
                e.stopPropagation();
                file=e.dataTransfer.files[0];
                adden_file();
            });
        }
    },
};
window.addEventListener("DOMContentLoaded", drop.init);
