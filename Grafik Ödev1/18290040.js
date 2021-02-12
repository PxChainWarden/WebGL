var radio = document.getElementById('A');
var gl;
var vertex_BufferA;
var vertex_BufferR;
var program;

var translation;
var tx=-0.3;
var ty=0;
var transx=0.5;
var transy=0;

var scale;
var sx = 1;
var sr = 0.5;

var thetaA=0;
var thetaR=0;
var thetal;

var color;
var colorAR = 255;
var colorAG;
var colorAB;
var colorRR;
var colorRG;
var colorRB = 255;

var verticesA = new Float32Array([
    -0.550,-0.5, -0.450,-0.5, -0.150, 0.5,
    -0.050, 0.5,  0.050, 0.5,  0.550,-0.5,
    -0.450,-0.5, -0.150, 0.5, -0.050, 0.5,
    -0.050, 0.5,  0.550,-0.5,  0.450,-0.5,
     0.250, 0.1, -0.210, 0.1, -0.270,   0,
     0.310,   0,  0.250, 0.1, -0.270,   0,
]);

var verticesR = new Float32Array([
    -0.4,-0.700, -0.4, 0.700, -0.2, 0.700,
    -0.4,-0.700, -0.2,-0.700, -0.2, 0.700,
    -0.2, 0.700, -0.2, 0.450,  0.2, 0.700,
     0.2, 0.700,  0.1, 0.450, -0.2, 0.450,
     0.1, 0.450,  0.2, 0.700,  0.2, 0.325,
     0.2, 0.700,  0.2, 0.325,  0.4, 0.450,
     0.2, 0.325,  0.4, 0.450,  0.4, 0.110,
     0.2, 0.625,  0.4, 0.125,  0.2, 0.250,
     0.2, 0.250,  0.4, 0.125,  0.2,-0.125,
     0.2, 0.250,  0.1, 0.125,  0.2,-0.125,
     0.2,-0.125,  0.1, 0.125, -0.2, 0.125,
     0.2,-0.125, -0.2, 0.125, -0.2,-0.125,
    -0.2, 0.125, -0.2,-0.250,  0.2,-0.700,
    -0.2, 0.125,  0.2,-0.700,  0.4,-0.700,
]);

window.onload = function init()
{
    const canvas = document.getElementById('glcanvas');
    //init
    gl = canvas.getContext('webgl');
    if(!gl)
    {
        alert("Webgl unable to init!!");
        return;
    }
    
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    vertex_BufferA = gl.createBuffer();
    vertex_BufferR = gl.createBuffer();
    
    gl.clearColor(0.4, 0.4, 0.4, 1.0);
    draw();
    
    return;
}

    document.getElementById('scale').oninput = function()
    {
        radio.checked == true ? sx = this.value / 20 : sr = this.value / 20;
        draw();
    }
    document.getElementById('myRange').oninput = function() {
        radio.checked == true ? thetaA = this.value/180 : thetaR = this.value/180;
        draw();
    }
    document.getElementById('R').oninput = function()
    {
        radio.checked == true ? colorAR = this.value : colorRR = this.value;
        draw();
    }
    document.getElementById('G').oninput = function()
    {
        radio.checked == true ? colorAG = this.value :colorRG = this.value;
        draw();
    }
    document.getElementById('B').oninput = function()
    {
        radio.checked == true ? colorAB = this.value : colorRB = this.value;
        draw();
    }

    window.addEventListener("keydown", function (event) {
        switch (event.key.toLowerCase()) {
          case "s":
            radio.checked == true ? ty -= 0.1 : transy -= 0.1;                
            draw();
            break;
          case "w":
            radio.checked == true ? ty += 0.1 : transy += 0.1;
            draw();
            break;
          case "a":
            radio.checked == true ? tx -= 0.1 : transx -= 0.1;
            draw();
            break;
          case "d":
            radio.checked == true ? tx += 0.1 : transx += 0.1;
            draw();
            break;
            case "q":
            radio.checked == true ? thetaA += 0.1 : thetaR += 0.1;
            draw();
            break;
            case "e":
            radio.checked == true ? thetaA -= 0.1 : thetaR -= 0.1;
            draw();
            break;
            case "r":
            radio.checked == true ? sx += 0.1 : sr += 0.1;
            draw();
            break;
            case "f":
            radio.checked == true ? sx -= 0.1 : sr -= 0.1;
            draw();
            break;
            case "c":
            radio.checked == true ? document.getElementById("Rrrrrr").checked = true : radio.checked = true;
            draw();
          default:
            return;
        };
    })

function useBuffer(vertex_Buffer,vertices)
{
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_Buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    thetal = gl.getUniformLocation(program, "theta");
    translation = gl.getUniformLocation(program, "vTranslation");
    scale = gl.getUniformLocation(program, "vScale");
    color = gl.getUniformLocation(program, "color");
}

function draw()
{
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    useBuffer(vertex_BufferA,verticesA);
    gl.uniform4f(scale,sx,sx,sx,1);
    gl.uniform4f(color, colorAR/255, colorAG/255, colorAB/255, 1);
    gl.uniform1f(thetal,thetaA);
    gl.uniform4f(translation,tx,ty,0,0);

    gl.drawArrays(gl.TRIANGLES,0,18);

    useBuffer(vertex_BufferR,verticesR);
    gl.uniform4f(scale,sr,sr,sr,1);
    gl.uniform4f(color, colorRR/255, colorRG/255, colorRB/255, 1);
    gl.uniform1f(thetal,thetaR);
    gl.uniform4f(translation,transx,transy,0,0);

    gl.drawArrays(gl.TRIANGLES,0,verticesR.length/2);
}

function initShaders( gl, vertexShaderId, fragmentShaderId )
{
    var vertShdr;
    var fragShdr;

    var vertElem = document.getElementById( vertexShaderId );
    if ( !vertElem ) { 
        alert( "Unable to load vertex shader " + vertexShaderId );
        return -1;
    }
    else {
        vertShdr = gl.createShader( gl.VERTEX_SHADER );
        gl.shaderSource( vertShdr, vertElem.text );
        gl.compileShader( vertShdr );
        if ( !gl.getShaderParameter(vertShdr, gl.COMPILE_STATUS) ) {
            var msg = "Vertex shader failed to compile.  The error log is:"
        	+ "<pre>" + gl.getShaderInfoLog( vertShdr ) + "</pre>";
            alert( msg );
            return -1;
        }
    }

    var fragElem = document.getElementById( fragmentShaderId );
    if ( !fragElem ) { 
        alert( "Unable to load vertex shader " + fragmentShaderId );
        return -1;
    }
    else {
        fragShdr = gl.createShader( gl.FRAGMENT_SHADER );
        gl.shaderSource( fragShdr, fragElem.text );
        gl.compileShader( fragShdr );
        if ( !gl.getShaderParameter(fragShdr, gl.COMPILE_STATUS) ) {
            var msg = "Fragment shader failed to compile.  The error log is:"
        	+ "<pre>" + gl.getShaderInfoLog( fragShdr ) + "</pre>";
            alert( msg );
            return -1;
        }
    }

    var program = gl.createProgram();
    gl.attachShader( program, vertShdr );
    gl.attachShader( program, fragShdr );
    gl.linkProgram( program );
    
    if ( !gl.getProgramParameter(program, gl.LINK_STATUS) ) {
        var msg = "Shader program failed to link.  The error log is:"
            + "<pre>" + gl.getProgramInfoLog( program ) + "</pre>";
        alert( msg );
        return -1;
    }

    return program;
}