function Renderer(vertSrc, fragSrc)
{
  this.modeVal = 1;
  this.lightPos = [1.0, 1.0, -1.0];
  this.ambientColor = [0.7, 0.7, 0.7];
  this.diffuseColor = [0.9, 0.9, 0.9];
  this.specularColor = [1.0, 1.0, 1.0];
  this.clearColor = [0.3, 0.3, 0.3];
  this.shininess = 4.0;
  this.kaVal = 1.0;
  this.kdVal = 1.0;
  this.ksVal = 1.0;
  this.wire = false;
  this.eye = [0.0,0.0,0.7];
  this.myTexels = [];
  this.THETA = 0;
  this.PHI = 0;

  var vertSrc = vertSrc;
  var fragSrc = fragSrc;
  var canvas;
  var gl;
  var sceneVertNo = 0;
  var progID = 0;
  var vertID = 0;
  var fragID = 0;
  var vertexLoc = 0;
  var texCoordLoc = 0;
  var normalLoc = 0;
  var projectionLoc = 0;
  var modelviewLoc = 0;
  var normalMatrixLoc = 0;
  var modeLoc = 0;
  var kaLoc = 0;
  var kdLoc = 0;
  var ksLoc = 0;
  var shininessLoc = 0;
  var lightPosLoc = 0;
  var ambientColorLoc = 0;
  var diffuseColorLoc = 0;
  var specularColorLoc = 0;
  var projection = new Float32Array(16);
  var modelview = new Float32Array(16);
  var rotationMatrix = new Float32Array(16);
  var vB;
  var nB;
  var tB;
  var meshVertices = [];
  var meshNormals = [];
  var meshTexCoords = [];
  var texture = 0;


  var v = [  
    0.012711,  0.125310,  0.048082,
    0.011417,  0.116975,  0.063994,
    0.022663,  0.103587,  0.063380,
    0.027659,  0.085713,  0.057788,
    0.020006,  0.040483,  0.029409,
    0.022264,  0.106690,  0.047751,
    0.029149,  0.051353,  0.016990,
    0.012824,  0.033348, -0.014164,
    0.021470,  0.037049, -0.016762,
    0.031755,  0.063527,  0.043083,
    0.008236,  0.029954,  0.021184,
    0.017182,  0.035278,  0.015606,
    0.011494,  0.022032,  0.024930,
    0.008898,  0.030050,  0.014377,
    0.017496,  0.024709,  0.022765,
    0.013723,  0.022078,  0.020760,
    0.017346,  0.025444,  0.025665,
    0.013341,  0.022754,  0.023902,
    0.012984,  0.021270,  0.019325,
    0.018079,  0.026385,  0.027581,
    0.019709,  0.025564,  0.021494,
    0.023964, -0.000007,  0.044404,
    0.029894, -0.000007,  0.044404,
    0.025641,  0.002901,  0.037913,
    0.017571, -0.000000,  0.064271,
    0.026929, -0.000000,  0.021684,
    0.036352, -0.000000,  0.065074,
    0.026172,  0.003837,  0.044929,
    0.028034, -0.000000,  0.052511,
    0.024869, -0.000000,  0.052487,
    0.025763, -0.000004,  0.044895,
    0.028534, -0.000005,  0.044738,
    0.026770, -0.000000,  0.068916,
   -0.026770, -0.000000,  0.068916,
   -0.028534, -0.000005,  0.044738,
   -0.025763, -0.000004,  0.044895,
   -0.024869, -0.000000,  0.052487,
   -0.028034, -0.000000,  0.052511,
   -0.026172,  0.003837,  0.044929,
   -0.036352, -0.000000,  0.065074,
    0.000000,  0.048231,  0.057287,
   -0.026929, -0.000000,  0.021684,
   -0.017571, -0.000000,  0.064271,
   -0.025641,  0.002901,  0.037913,
   -0.029894, -0.000007,  0.044404,
   -0.023964, -0.000007,  0.044404,
   -0.019709,  0.025564,  0.021494,
   -0.018079,  0.026385,  0.027581,
   -0.012984,  0.021270,  0.019325,
   -0.013341,  0.022754,  0.023902,
   -0.017346,  0.025444,  0.025665,
   -0.013723,  0.022078,  0.020760,
   -0.017496,  0.024709,  0.022765,
   -0.008898,  0.030050,  0.014377,
   -0.011494,  0.022032,  0.024930,
   -0.017182,  0.035278,  0.015606,
   -0.008236,  0.029954,  0.021184,
   -0.017111,  0.038226, -0.016886,
   -0.012824,  0.033348, -0.014164,
   -0.020006,  0.040483,  0.029409,
   -0.027659,  0.085713,  0.057788,
   -0.022663,  0.103587,  0.063380,
   -0.011417,  0.116975,  0.063994,
   -0.012711,  0.125310,  0.048082,
    0.000000,  0.118193,  0.075671,
    0.008967,  0.123410,  0.067448,
    0.000000,  0.112450,  0.075799,
    0.000000,  0.100073,  0.079051,
    0.000000,  0.075583,  0.073745,
    0.000000,  0.027454,  0.023644,
    0.000000,  0.025023, -0.002090,
    0.000000,  0.127537,  0.086447,
    0.000000,  0.134143,  0.074875,
    0.017515,  0.000268, -0.077018,
    0.000000,  0.019257, -0.036851,
    0.000000,  0.000268, -0.077018,
   -0.017515,  0.000268, -0.077018,
   -0.010827,  0.028583, -0.041270,
    0.000000,  0.000255, -0.069450,
   -0.009745,  0.133749,  0.057435,
    0.006113,  0.129737,  0.043979,
    0.006836,  0.132803,  0.066934,
    0.009745,  0.133749,  0.057435,
   -0.006113,  0.129737,  0.043979,
   -0.008967,  0.123410,  0.067448,
   -0.006836,  0.132803,  0.066934,
    0.000000,  0.138015,  0.069094,
    0.000000,  0.139760,  0.057430,
    0.000000,  0.134653,  0.039184,
    0.000000,  0.119350,  0.025515,
    0.012882,  0.022351, -0.053330,
    0.017111,  0.038226, -0.016886,
    0.010827,  0.028583, -0.041270,
    0.000000,  0.074392, -0.010239,
   -0.021470,  0.037049, -0.016762,
   -0.020307,  0.072958,  0.000052,
   -0.012882,  0.022351, -0.053330,
   -0.029149,  0.051353,  0.016990,
    0.000000,  0.028583, -0.041270,
    0.032943,  0.087058,  0.023037,
    0.020307,  0.072958,  0.000052,
   -0.031755,  0.063527,  0.043083,
   -0.032943,  0.087058,  0.023037,
   -0.022264,  0.106690,  0.047751,
    0.000000,  0.109241,  0.020593,
    0.000000,  0.093280,  0.000774
];

var vt = [
    0.003299, 0.527890,
    0.018785, 0.465354,
    0.033374, 0.530498,
    0.042973, 0.627141,
    0.007480, 0.558069,
    0.037639, 0.556764,
    0.101896, 0.532850,
    0.057491, 0.433466,
    0.146981, 0.393035,
    0.176903, 0.520864,
    0.281983, 0.511065,
    0.692794, 0.841086,
    0.731192, 0.850206,
    0.717230, 0.868386,
    0.636302, 0.882048,
    0.695439, 0.806107,
    0.085451, 0.722238,
    0.117683, 0.593286,
    0.442067, 0.866667,
    0.569349, 0.919595,
    0.500820, 0.983281,
    0.374371, 0.771612,
    0.478991, 0.728837,
    0.286324, 0.841833,
    0.286324, 0.756150,
    0.789612, 0.575273,
    0.653092, 0.637386,
    0.780411, 0.549258,
    0.662684, 0.559251,
    0.737546, 0.486081,
    0.875591, 0.482772,
    0.551971, 0.815501,
    0.130582, 0.866667,
    0.198277, 0.771612,
    0.792889, 0.592667,
    0.020678, 0.815501,
    0.093658, 0.728837,
    0.268361, 0.362769,
    0.799238, 0.842984,
    0.754524, 0.872693,
    0.756700, 0.840362,
    0.377267, 0.447288,
    0.423319, 0.362769,
    0.394999, 0.519072,
    0.670261, 0.521312,
    0.643799, 0.517041,
    0.636302, 0.482772,
    0.921829, 0.429640,
    0.888820, 0.323536,
    0.902039, 0.298131,
    0.931703, 0.421676,
    0.775425, 0.935501,
    0.799238, 0.881673,
    0.692067, 0.889167,
    0.732027, 0.857230,
    0.739199, 0.883568,
    0.725982, 0.868383,
    0.739315, 0.892413,
    0.743977, 0.872848,
    0.976013, 0.703938,
    0.944253, 0.691543,
    0.909261, 0.643985,
    0.912357, 0.759217,
    0.944406, 0.715359,
    0.704507, 0.816976,
    0.867608, 0.855958,
    0.897110, 0.869822,
    0.812580, 0.877362,
    0.882190, 0.450308,
    0.971980, 0.450308,
    0.909574, 0.467766,
    0.891382, 0.489885,
    0.896961, 0.864338,
    0.902042, 0.847112,
    0.870335, 0.843857,
    0.831276, 0.806107,
    0.857117, 0.315799,
    0.868590, 0.298131,
    0.890691, 0.429544,
    0.983886, 0.684398,
    0.919357, 0.300593,
    0.902256, 0.431545,
    0.898664, 0.853593,
    0.983886, 0.719558,
    0.880791, 0.702949,
    0.805837, 0.837473,
    0.986584, 0.877362,
    0.435952, 0.451842,
    0.950688, 0.414976,
    0.913897, 0.637386,
    0.917703, 0.526331,
    0.933278, 0.634052,
    0.882190, 0.512270,
    0.902270, 0.632314,
    0.882190, 0.630866,
    0.654273, 0.720627,
    0.772391, 0.717853,
    0.736597, 0.785288,
    0.665902, 0.757527,
    0.636302, 0.799508,
    0.377268, 0.278250,
    0.394999, 0.206466,
    0.435952, 0.273696,
    0.281984, 0.214473,
    0.539000, 0.680460,
    0.623467, 0.710918,
    0.534012, 0.703158,
    0.939392, 0.231579,
    0.844170, 0.232567,
    0.907785, 0.220158,
    0.503836, 0.692894,
    0.442551, 0.671800,
    0.506404, 0.680758,
    0.907632, 0.243974,
    0.875736, 0.176300,
    0.947265, 0.215959,
    0.533644, 0.695858,
    0.930503, 0.496484,
    0.943903, 0.629067,
    0.898242, 0.505321,
    0.947265, 0.251119,
    0.872640, 0.291532,
    0.946236, 0.510494,
    0.452593, 0.710918,
    0.536577, 0.685382,
    0.905363, 0.946064,
    0.879285, 0.934228,
    0.969075, 0.934228,
    0.888477, 0.973805,
    0.465314, 0.638357,
    0.902668, 0.117217,
    0.857525, 0.100652,
    0.885948, 0.084616,
    0.844170, 0.006222,
    0.895303, 0.048258,
    0.871440, 0.055384,
    0.939073, 0.017175,
    0.902958, 0.003299,
    0.907927, 0.078103,
    0.929375, 0.114932,
    0.901669, 0.074805,
    0.891376, 0.058049,
    0.879656, 0.058664,
    0.889090, 0.076448,
    0.844170, 0.155261,
    0.640055, 0.764629,
    0.926264, 0.057824,
    0.146981, 0.332502,
    0.636302, 0.643985,
    0.780109, 0.673350,
    0.778729, 0.690996,
    0.071828, 0.983281,
    0.003299, 0.919595,
    0.268247, 0.939905,
    0.142495, 0.996701,
    0.874192, 0.773674,
    0.274756, 0.983483,
    0.101896, 0.192687,
    0.117684, 0.132251,
    0.176904, 0.204674,
    0.042974, 0.098396,
    0.085453, 0.003299,
    0.936269, 0.127295,
    0.018786, 0.260183,
    0.057491, 0.292072,
    0.033375, 0.195040,
    0.037640, 0.168773,
    0.007481, 0.167468,
    0.003300, 0.197647,
    0.879285, 0.927629,
    0.926651, 0.883961,
    0.926651, 0.906470,
    0.974018, 0.927629,
    0.805837, 0.935959,
    0.872686, 0.986667,
    0.810640, 0.987957,
    0.861734, 0.935959,
    0.872686, 0.885250,
    0.810640, 0.883961,
    0.450990, 0.459050,
    0.587376, 0.371198,
    0.629703, 0.432839,
    0.629703, 0.501478,
    0.450990, 0.501478,
    0.616480, 0.365485,
    0.442551, 0.401044,
    0.450990, 0.543906,
    0.629703, 0.570118,
    0.587376, 0.631759,
    0.442551, 0.601913,
    0.603257, 0.298131,
    0.765547, 0.433842,
    0.850518, 0.449549,
    0.747343, 0.463785,
    0.747901, 0.464118,
    0.708745, 0.431882,
    0.784714, 0.403336,
    0.658185, 0.457073,
    0.671033, 0.421523,
    0.708745, 0.342422,
    0.671033, 0.352781,
    0.658185, 0.317231,
    0.850518, 0.324755,
    0.784714, 0.370969,
    0.765547, 0.340462,
    0.747901, 0.310186,
    0.747343, 0.310519,
    0.666031, 0.387152,
    0.712249, 0.387152,
    0.661327, 0.386130,
    0.636302, 0.375304,
    0.733457, 0.298131,
    0.733457, 0.476173,
    0.636302, 0.399000,
    0.661327, 0.388174,
    0.554141, 0.291531,
    0.442551, 0.273568,
    0.509101, 0.142747,
    0.640061, 0.266853,
    0.583536, 0.003299,
    0.640062, 0.050023,
    0.470661, 0.118929,
    0.542515, 0.038113,
    0.494758, 0.132375,
    0.510528, 0.010238,
    0.494010, 0.005199,
    0.771022, 0.142748,
    0.737609, 0.038113,
    0.785365, 0.132376,
    0.809461, 0.118930,
    0.786113, 0.005200,
    0.696587, 0.003300,
    0.725981, 0.291532,
    0.769595, 0.010238,
    0.837571, 0.273569,
    0.304401, 0.939905,
    0.430153, 0.996701,
    0.297893, 0.983483
];

var vn = [
    0.7322, -0.0840,  0.6759,
    0.9461,  0.2489,  0.2073,
    0.7205,  0.5884,  0.3668,
    0.5576,  0.4360,  0.7064,
    0.5782, -0.1728,  0.7974,
    0.5327,  0.2151,  0.8185,
    0.5628, -0.3819,  0.7331,
   -0.8793, -0.4436, -0.1734,
    0.5278, -0.1157,  0.8414,
    0.3821, -0.7951,  0.4710,
    0.7518,  0.3951, -0.5278,
    0.8882,  0.4545,  0.0676,
    0.9649,  0.2612,  0.0272,
   -0.9365,  0.3148,  0.1546,
   -0.8796, -0.0129, -0.4756,
   -0.4278,  0.4553, -0.7808,
    0.7486, -0.6630, -0.0091,
    0.8029, -0.5909, -0.0792,
    0.6221, -0.7724,  0.1281,
   -0.9939, -0.0964, -0.0543,
   -0.5347,  0.5569, -0.6356,
    0.5347,  0.5569, -0.6356,
   -0.2471, -0.8707,  0.4252,
    0.9939, -0.0964, -0.0543,
    0.5340, -0.4359,  0.7245,
    0.4481, -0.2715, -0.8518,
    0.3735, -0.7892,  0.4874,
    0.8378, -0.5220,  0.1599,
    0.2946, -0.9555,  0.0152,
   -0.5112, -0.7273, -0.4579,
   -0.9004, -0.4348, -0.0161,
    0.9654,  0.1070, -0.2379,
   -0.5529, -0.0324,  0.8326,
    0.4664, -0.8515,  0.2398,
    0.4663, -0.8515,  0.2398,
   -0.6875,  0.5658,  0.4552,
    0.6806,  0.5992,  0.4215,
   -0.8818, -0.4624, -0.0924,
    0.3793, -0.4054, -0.8317,
    0.9469, -0.1652,  0.2759,
   -0.4796,  0.2061,  0.8529,
   -0.0009, -1.0000,  0.0006,
    0.6468,  0.7580, -0.0842,
   -0.9540,  0.2726, -0.1244,
    0.0000, -1.0000,  0.0052,
    0.0011, -1.0000,  0.0007,
    0.6908,  0.6175,  0.3762,
    0.6868,  0.6944, -0.2148,
   -0.6743,  0.2950,  0.6769,
    0.8123, -0.0961, -0.5752,
    0.9113,  0.4078, -0.0563,
   -0.0003, -1.0000,  0.0006,
   -0.8203,  0.5074, -0.2641,
    0.8414,  0.5365,  0.0648,
    0.0000, -1.0000,  0.0000,
   -0.8653,  0.4911,  0.1001,
    0.0000, -1.0000, -0.0003,
    0.5493, -0.6155,  0.5653,
    0.7980, -0.5994,  0.0627,
    0.3620, -0.9280,  0.0876,
    0.5369, -0.8430, -0.0328,
    0.5294, -0.8481, -0.0225,
   -0.5798,  0.3973,  0.7113,
    0.6000, -0.2929, -0.7444,
    0.4278,  0.4553, -0.7808,
   -0.6000, -0.2929, -0.7444,
    0.5798,  0.3973,  0.7113,
   -0.5294, -0.8481, -0.0225,
   -0.5369, -0.8430, -0.0328,
   -0.3620, -0.9280,  0.0876,
   -0.7980, -0.5994,  0.0627,
   -0.5493, -0.6155,  0.5653,
    0.8653,  0.4911,  0.1001,
   -0.8414,  0.5365,  0.0648,
    0.8203,  0.5074, -0.2641,
    0.0000, -1.0000,  0.0005,
   -0.9113,  0.4078, -0.0563,
   -0.8123, -0.0961, -0.5752,
    0.6743,  0.2950,  0.6769,
   -0.6868,  0.6944, -0.2148,
   -0.6908,  0.6175,  0.3762,
   -0.0011, -1.0000,  0.0007,
    0.9540,  0.2726, -0.1244,
   -0.6468,  0.7580, -0.0842,
    0.0009, -1.0000,  0.0006,
    0.4796,  0.2061,  0.8529,
   -0.9469, -0.1652,  0.2759,
   -0.3793, -0.4054, -0.8317,
    0.8818, -0.4624, -0.0924,
   -0.6806,  0.5992,  0.4215,
    0.6875,  0.5658,  0.4552,
   -0.4664, -0.8515,  0.2398,
    0.5529, -0.0324,  0.8326,
   -0.9654,  0.1070, -0.2379,
    0.9004, -0.4348, -0.0161,
    0.5112, -0.7273, -0.4579,
   -0.2946, -0.9555,  0.0152,
   -0.8378, -0.5220,  0.1599,
   -0.3735, -0.7892,  0.4874,
   -0.4481, -0.2715, -0.8518,
   -0.5340, -0.4359,  0.7245,
    0.8796, -0.0129, -0.4756,
    0.2471, -0.8707,  0.4252,
    0.9365,  0.3148,  0.1546,
    0.9850,  0.0805,  0.1529,
    0.5377,  0.7578, -0.3696,
   -0.6221, -0.7724,  0.1281,
   -0.8029, -0.5909, -0.0792,
   -0.7486, -0.6630, -0.0091,
    0.4959,  0.6763, -0.5447,
    0.7537,  0.2877, -0.5909,
   -0.9649,  0.2612,  0.0272,
   -0.8882,  0.4545,  0.0676,
   -0.7518,  0.3951, -0.5278,
   -0.3821, -0.7951,  0.4710,
   -0.5278, -0.1157,  0.8414,
    0.8793, -0.4436, -0.1734,
   -0.5628, -0.3819,  0.7331,
   -0.5327,  0.2151,  0.8185,
   -0.5782, -0.1728,  0.7974,
   -0.5576,  0.4360,  0.7064,
   -0.7205,  0.5884,  0.3668,
   -0.9461,  0.2489,  0.2073,
   -0.7322, -0.0840,  0.6759,
   -0.6705,  0.0166,  0.7417,
    0.6705,  0.0166,  0.7417,
    0.8232,  0.4930,  0.2814,
    0.7209, -0.5236,  0.4540,
   -0.7209, -0.5236,  0.4540,
   -0.8232,  0.4930,  0.2814,
    0.2720, -0.7289,  0.6283,
    0.0000,  0.7839, -0.6209,
    0.0000, -1.0000, -0.0017,
    0.6887, -0.6264,  0.3651,
   -0.6887, -0.6264,  0.3651,
   -0.2720, -0.7289,  0.6283,
   -0.6748,  0.5250, -0.5187,
   -0.6656,  0.6468, -0.3725,
   -0.7406,  0.5625, -0.3676,
   -0.7461,  0.4436, -0.4965,
   -0.9248,  0.2266,  0.3058,
    0.9248,  0.2266,  0.3058,
    0.7461,  0.4436, -0.4965,
    0.7406,  0.5625, -0.3676,
    0.6656,  0.6468, -0.3725,
    0.6748,  0.5250, -0.5187,
    0.5207,  0.8443,  0.1263,
    0.6291,  0.6459,  0.4325,
    0.6362,  0.7238,  0.2670,
    0.7586,  0.2059,  0.6182,
    0.9724,  0.1204,  0.1998,
    0.5108,  0.8279, -0.2317,
   -0.9724,  0.1204,  0.1998,
   -0.5108,  0.8279, -0.2317,
   -0.5207,  0.8443,  0.1263,
   -0.6291,  0.6459,  0.4325,
   -0.6362,  0.7238,  0.2670,
   -0.7586,  0.2059,  0.6182,
    0.9447,  0.1637, -0.2843,
   -0.4499,  0.5009, -0.7394,
    0.7653, -0.6412,  0.0563,
    0.0000, -0.8884,  0.4591,
    0.9432,  0.1654, -0.2880,
    0.3816,  0.6437, -0.6633,
    0.6692, -0.7387,  0.0806,
    0.2485, -0.8772,  0.4109,
   -0.6692, -0.7387,  0.0806,
   -0.3816,  0.6437, -0.6633,
   -0.9432,  0.1654, -0.2880,
   -0.7653, -0.6412,  0.0563,
    0.4499,  0.5009, -0.7394,
   -0.9447,  0.1637, -0.2843,
   -0.2485, -0.8772,  0.4109,
   -0.9850,  0.0805,  0.1529,
   -0.5377,  0.7578, -0.3696,
   -0.4959,  0.6763, -0.5447,
   -0.7537,  0.2877, -0.5909,
   -0.0012, -1.0000,  0.0005,
    0.0012, -1.0000,  0.0007,
    0.0003, -1.0000,  0.0006,
   -0.0012, -1.0000,  0.0007,
    0.0012, -1.0000,  0.0005,
   -0.4663, -0.8515,  0.2398
];

var f = [
    66,1,1,67,2,1,2,3,1,
    1,4,2,66,5,2,2,6,2,
    2,6,3,3,7,3,1,4,3,
    67,2,4,3,7,4,2,3,4,
    68,8,5,69,9,5,3,7,5,
    67,2,6,68,8,6,3,7,6,
    4,10,7,69,9,7,10,11,7,
    11,12,8,19,13,8,13,14,8,
    69,9,9,4,10,9,3,7,9,
    5,15,10,70,16,10,11,12,10,
    90,17,11,1,4,11,6,18,11,
    3,7,12,6,18,12,1,4,12,
    3,7,13,4,10,13,6,18,13,
    103,19,14,61,20,14,104,21,14,
    103,19,15,96,22,15,98,23,15,
    106,24,16,94,25,16,96,22,16,
    92,26,17,7,27,17,8,28,17,
    7,27,18,12,29,18,8,28,18,
    8,28,19,71,30,19,75,31,19,
    103,19,20,98,23,20,102,32,20,
    106,24,21,96,22,21,103,19,21,
    106,24,22,100,33,22,101,34,22,
    7,27,23,92,26,23,9,35,23,
    100,33,24,10,36,24,7,37,24,
    69,9,25,41,38,25,10,11,25,
    14,39,26,21,40,26,19,41,26,
    5,42,27,41,38,27,70,43,27,
    5,42,28,7,44,28,10,11,28,
    14,45,29,11,46,29,70,47,29,
    16,48,30,24,49,30,22,50,30,
    18,51,31,16,48,31,22,50,31,
    5,52,32,21,40,32,12,53,32,
    11,12,33,20,54,33,5,15,33,
    16,55,34,13,14,34,19,13,34,
    17,56,34,13,14,34,18,57,34,
    17,56,35,21,40,35,20,58,35,
    16,55,34,21,40,34,15,59,34,
    28,60,36,29,61,36,27,62,36,
    28,60,37,25,63,37,30,64,37,
    11,12,38,14,65,38,19,13,38,
    14,39,39,12,53,39,21,40,39,
    5,52,40,20,58,40,21,40,40,
    11,12,41,13,14,41,20,54,41,
    29,66,42,23,67,42,27,68,42,
    23,69,43,26,70,43,24,71,43,
    24,71,44,26,70,44,22,72,44,
    32,73,45,22,74,45,23,67,45,
    22,74,46,30,75,46,25,76,46,
    28,77,47,23,78,47,17,79,47,
    28,60,48,27,62,48,23,80,48,
    22,50,49,28,81,49,18,51,49,
    15,82,50,23,78,50,24,49,50,
    23,78,51,15,82,51,17,79,51,
    29,66,52,31,83,52,32,73,52,
    28,60,53,22,84,53,25,63,53,
    29,61,54,28,60,54,33,85,54,
    30,75,55,29,66,55,33,86,55,
    28,60,56,30,64,56,33,85,56,
    23,67,57,22,74,57,26,87,57,
    5,42,58,10,11,58,41,38,58,
    5,42,59,12,88,59,7,44,59,
    14,45,60,70,47,60,71,30,60,
    12,29,61,14,45,61,71,30,61,
    12,29,62,71,30,62,8,28,62,
    28,81,63,17,89,63,18,51,63,
    16,48,64,15,82,64,24,49,64,
    106,24,65,101,34,65,94,25,65,
    52,90,66,44,91,66,53,92,66,
    39,93,67,50,94,67,51,95,67,
    56,96,68,59,97,68,71,98,68,
    56,96,69,71,98,69,54,99,69,
    54,99,70,71,98,70,70,100,70,
    60,101,71,98,102,71,56,103,71,
    60,101,72,41,38,72,102,104,72,
    45,105,57,42,106,57,46,107,57,
    39,108,73,34,109,73,37,110,73,
    37,111,55,34,112,55,38,113,55,
    38,114,74,34,109,74,39,108,74,
    39,108,75,43,115,75,46,116,75,
    38,113,76,36,117,76,37,111,76,
    45,118,77,51,119,77,53,92,77,
    53,92,78,44,91,78,45,118,78,
    46,120,79,50,94,79,39,93,79,
    39,108,80,45,121,80,40,122,80,
    39,123,81,51,119,81,45,118,81,
    37,111,82,46,107,82,43,124,82,
    35,125,45,46,107,45,36,117,45,
    44,126,83,46,127,83,42,128,83,
    45,129,84,44,126,84,42,128,84,
    45,105,85,38,113,85,40,130,85,
    57,131,86,48,132,86,55,133,86,
    60,134,87,47,135,87,48,136,87,
    54,137,88,47,135,88,56,138,88,
    57,131,89,49,139,89,54,140,89,
    39,108,90,37,110,90,43,115,90,
    39,108,91,40,122,91,38,114,91,
    47,135,92,52,141,92,53,142,92,
    51,143,92,47,135,92,53,142,92,
    55,133,92,51,143,92,50,144,92,
    52,141,92,55,133,92,50,144,92,
    57,131,93,60,145,93,48,132,93,
    60,134,94,56,138,94,47,135,94,
    50,94,95,46,120,95,52,90,95,
    52,90,96,46,120,96,44,91,96,
    54,99,97,70,100,97,57,146,97,
    60,101,98,102,104,98,98,102,98,
    60,101,99,70,43,99,41,38,99,
    54,137,100,49,147,100,47,135,100,
    69,148,101,102,104,101,41,38,101,
    100,33,102,7,37,102,101,34,102,
    98,149,103,95,150,103,58,151,103,
    100,33,104,6,152,104,4,153,104,
    100,33,105,4,153,105,10,36,105,
    105,154,106,6,155,106,100,33,106,
    59,97,107,75,156,107,71,98,107,
    98,149,108,59,97,108,56,96,108,
    58,151,109,59,97,109,98,149,109,
    105,154,110,100,33,110,106,24,110,
    90,157,111,6,155,111,105,154,111,
    62,158,112,104,159,112,61,160,112,
    62,158,113,64,161,113,104,159,113,
    90,162,114,104,159,114,64,161,114,
    60,145,115,57,131,115,70,163,115,
    69,148,116,62,158,116,61,160,116,
    57,131,117,55,133,117,49,139,117,
    61,160,118,102,104,118,69,148,118,
    67,164,119,62,158,119,68,165,119,
    68,165,120,62,158,120,69,148,120,
    67,164,121,63,166,121,62,158,121,
    63,167,122,64,161,122,62,158,122,
    64,161,123,63,167,123,85,168,123,
    85,169,124,63,166,124,67,164,124,
    85,170,125,67,171,125,65,172,125,
    66,173,126,65,172,126,67,171,126,
    72,174,127,66,175,127,73,176,127,
    66,175,128,72,174,128,65,177,128,
    85,178,129,65,177,129,72,174,129,
    72,174,130,73,179,130,85,178,130,
    93,180,131,79,181,131,74,182,131,
    93,180,132,76,183,132,99,184,132,
    74,182,133,79,181,133,76,185,133,
    93,180,134,75,186,134,79,181,134,
    93,180,132,74,182,132,76,183,132,
    78,187,132,76,183,132,77,188,132,
    78,187,135,79,189,135,75,190,135,
    77,191,133,76,185,133,79,181,133,
    78,187,132,99,184,132,76,183,132,
    78,187,136,77,188,136,79,189,136,
    84,192,137,90,193,137,64,194,137,
    84,192,138,64,195,138,80,196,138,
    80,196,139,89,197,139,84,192,139,
    90,193,140,84,192,140,89,197,140,
    80,196,141,85,198,141,86,199,141,
    83,200,142,82,201,142,66,202,142,
    90,203,143,89,204,143,81,205,143,
    83,200,144,81,205,144,89,204,144,
    81,205,145,83,200,145,1,206,145,
    81,205,146,1,207,146,90,203,146,
    87,208,147,83,200,147,88,209,147,
    82,201,148,87,210,148,73,211,148,
    87,208,149,82,201,149,83,200,149,
    66,202,150,82,201,150,73,211,150,
    1,212,151,83,200,151,66,202,151,
    83,200,152,89,204,152,88,209,152,
    64,213,153,85,198,153,80,196,153,
    80,196,154,88,209,154,89,197,154,
    87,208,155,88,209,155,80,196,155,
    86,199,156,73,214,156,87,215,156,
    87,208,157,80,196,157,86,199,157,
    85,198,158,73,214,158,86,199,158,
    101,216,159,7,217,159,9,218,159,
    94,219,160,91,220,160,99,221,160,
    8,222,161,93,223,161,92,224,161,
    93,223,162,99,225,162,91,220,162,
    101,216,163,9,218,163,91,220,163,
    94,219,164,101,216,164,91,220,164,
    8,222,165,75,226,165,93,223,165,
    95,227,166,78,228,166,58,229,166,
    59,230,167,78,228,167,75,231,167,
    94,219,168,97,232,168,96,233,168,
    96,233,169,97,232,169,95,227,169,
    78,228,162,97,232,162,99,234,162,
    59,230,170,58,229,170,78,228,170,
    94,219,171,99,221,171,97,232,171,
    96,233,172,95,227,172,98,235,172,
    9,218,173,93,223,173,91,220,173,
    103,19,174,102,32,174,61,20,174,
    105,236,175,103,19,175,104,237,175,
    105,236,176,106,24,176,103,19,176,
    90,238,177,105,236,177,104,237,177,
    16,55,34,18,57,34,13,14,34,
    17,56,34,20,58,34,13,14,34,
    17,56,34,15,59,34,21,40,34,
    16,55,34,19,13,34,21,40,34,
    29,66,178,32,73,178,23,67,178,
    32,73,45,31,83,45,22,74,45,
    22,74,179,31,83,179,30,75,179,
    29,66,76,30,75,76,31,83,76,
    38,113,180,35,125,180,36,117,180,
    37,111,181,36,117,181,46,107,181,
    35,125,45,45,105,45,46,107,45,
    45,105,182,35,125,182,38,113,182,
    47,135,92,49,139,92,52,141,92,
    51,143,183,48,136,183,47,135,183,
    55,133,92,48,136,92,51,143,92,
    52,141,92,49,139,92,55,133,92,
    95,227,166,97,232,166,78,228,166,
    9,218,173,92,224,173,93,223,173
];

function rotateX(m, angle) {
      var c = Math.cos(angle);
      var s = Math.sin(angle);
      var mv1 = m[1], mv5 = m[5], mv9 = m[9];

      m[1] = m[1]*c-m[2]*s;
      m[5] = m[5]*c-m[6]*s;
      m[9] = m[9]*c-m[10]*s;

      m[2] = m[2]*c+mv1*s;
      m[6] = m[6]*c+mv5*s;
      m[10] = m[10]*c+mv9*s;
   }

   function rotateY(m, angle) {
      var c = Math.cos(angle);
      var s = Math.sin(angle);
      var mv0 = m[0], mv4 = m[4], mv8 = m[8];

      m[0] = c*m[0]+s*m[2];
      m[4] = c*m[4]+s*m[6];
      m[8] = c*m[8]+s*m[10];

      m[2] = c*m[2]-s*mv0;
      m[6] = c*m[6]-s*mv4;
      m[10] = c*m[10]-s*mv8;
   }

  function prepareMesh() {
	  for (var i = 0; i < f.length; i+=3) 
		  addTriangleVertexForIndices(f[i]-1,f[i+1]-1,f[i+2]-1);
  }

  function addTriangleVertexForIndices(vIndex,tIndex,nIndex){
	  meshVertices.push(v[3*vIndex],v[3*vIndex+1],v[3*vIndex+2]);
	  meshTexCoords.push(vt[2*tIndex],vt[2*tIndex+1]);
	  meshNormals.push(vn[3*nIndex],vn[3*nIndex+1],vn[3*nIndex+2])
  }

  this.init = function () {
    canvas = window.document.getElementById("canvas");
    try {
      gl = canvas.getContext("experimental-webgl");
    } catch (e) {}
    if (!gl) {
        window.alert("Error: Could not retrieve WebGL Context");
        return;
    }

    gl.enable(gl.DEPTH_TEST);
    setupShaders();
    prepareMesh();
    
    vB = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vB);
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(meshVertices), gl.STATIC_DRAW);
    if(vertexLoc != -1){
      gl.vertexAttribPointer(vertexLoc, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vertexLoc);
    }

	  nB = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nB);
	  gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(meshNormals), gl.STATIC_DRAW);
    if(normalLoc != -1){
      gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(normalLoc);
    }

    tB = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tB);
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(meshTexCoords), gl.STATIC_DRAW);
    if(texCoordLoc != -1){
      gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(texCoordLoc);
    }

    var textSize = 64;

	  this.myTexels = new Uint8Array(4*textSize*textSize);

	  for(var i= 0;i < textSize;++i){
      for(var j= 0;j < textSize;++j){
              if((i * j)%2 !== 1){
                  this.myTexels[4*i*textSize+4*j]=176;
                  this.myTexels[4*i*textSize+4*j+1]=128;
                  this.myTexels[4*i*textSize+4*j+2]=0;
                  this.myTexels[4*i*textSize+4*j+3]=255;
              }
              else{
                  this.myTexels[4*i*textSize+4*j]=48;
                  this.myTexels[4*i*textSize+4*j+1]=128;
                  this.myTexels[4*i*textSize+4*j+2]=128;
                  this.myTexels[4*i*textSize+4*j+3]=255;
              }
      }
    }

    /*
    var textSize = 64;
	  var numRows = 16;
	  var numCols = 16;

	  this.myTexels = new Uint8Array(4*textSize*textSize);

	  for(var i= 0;i < textSize;++i){
      for(var j= 0;j < textSize;++j){
          var patchx = Math.floor(i/(textSize/numRows));
          var patchy = Math.floor(j/(textSize/numCols));
              if(patchx%2 !== patchy%2){
                  this.myTexels[4*i*textSize+4*j]=175;
                  this.myTexels[4*i*textSize+4*j+1]=128;
                  this.myTexels[4*i*textSize+4*j+2]=0;
                  this.myTexels[4*i*textSize+4*j+3]=255;
              }
              else{
                  this.myTexels[4*i*textSize+4*j]=0;
                  this.myTexels[4*i*textSize+4*j+1]=128;
                  this.myTexels[4*i*textSize+4*j+2]=128;
                  this.myTexels[4*i*textSize+4*j+3]=255;
              }
      }
    }
    */

	  texture = gl.createTexture();
	  gl.bindTexture(gl.TEXTURE_2D,texture);

	  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,textSize,textSize,0,gl.RGBA,gl.UNSIGNED_BYTE,this.myTexels);
    gl.generateMipmap(gl.TEXTURE_2D);
	
    sceneVertNo = meshVertices.length/3;

    this.resize(canvas.width, canvas.height);
  }


  this.resize = function (w, h) {
    gl.viewport(0, 0, w, h);
    mat4Perspective(projection, 32.0, w/h, 0.5, 4.0);
  }

  this.display = function () {
    gl.clearColor(this.clearColor[0], this.clearColor[1], this.clearColor[2], 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // calculate Rotation matrix
    mat4Identity(rotationMatrix);
    rotateY(rotationMatrix, this.THETA);
    rotateX(rotationMatrix, this.PHI);

    // Set cam position
    mat4LookAt(modelview,
               this.eye[0], this.eye[1], this.eye[2], // eye
               0.0, 0.1, 0.0, // look at
               0.0, 1.0, 0.0); // up

    var modelviewInv = new Float32Array(16);
    var normalmatrix = new Float32Array(16);
    mat4Invert(modelview, modelviewInv);
    mat4Transpose(modelviewInv, normalmatrix);

    //calc rotated normals and modelview
    var m = new Float32Array(16);
    mat4Multiply(modelview,rotationMatrix,m);
    var n = new Float32Array(16);
    mat4Multiply(normalmatrix,rotationMatrix,n);

    gl.useProgram(progID);

    //Check if locs are setted if it is change uniforms
    if(projectionLoc != -1)  gl.uniformMatrix4fv(projectionLoc, false, projection);
    if(modelviewLoc != -1)  gl.uniformMatrix4fv(modelviewLoc, false, m);
    if(normalMatrixLoc != -1)  gl.uniformMatrix4fv(normalMatrixLoc, false, n);
    if(modeLoc != -1) gl.uniform1i(modeLoc, this.modeVal);
    if(kaLoc != -1) gl.uniform1f(kaLoc, this.kaVal);
    if(kdLoc != -1) gl.uniform1f(kdLoc, this.kdVal);
    if(ksLoc != -1) gl.uniform1f(ksLoc, this.ksVal);
    if(shininessLoc != -1) gl.uniform1f(shininessLoc, this.shininess);
    if(lightPosLoc != -1) gl.uniform3fv(lightPosLoc, this.lightPos);
    if(ambientColorLoc != -1) gl.uniform3fv(ambientColorLoc, this.ambientColor);
    if(diffuseColorLoc != -1) gl.uniform3fv(diffuseColorLoc, this.diffuseColor);
    if(specularColorLoc != -1) gl.uniform3fv(specularColorLoc, this.specularColor);

    //draw it wireframed or normal
    if(!(this.wire))
      gl.drawArrays(gl.TRIANGLES, 0, sceneVertNo);
    else
      for(var i=0; i<sceneVertNo; i+=3)
        gl.drawArrays( gl.LINE_LOOP, i,3);
  }


  function setupShaders() {
    // create shader
    vertID = gl.createShader(gl.VERTEX_SHADER);
    fragID = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertID, vertSrc);
    gl.shaderSource(fragID, fragSrc);

    gl.compileShader(vertID);
    gl.compileShader(fragID);

    var error = false;
    // check for errors
    if(!gl.getShaderParameter(vertID, gl.COMPILE_STATUS)) {
      document.getElementById("code_vert_error").innerHTML = "invalid vertex shader : " + gl.getShaderInfoLog(vertID);
      error = true;
    }
    else{
      document.getElementById("code_vert_error").innerHTML = "";
    }
    if(!gl.getShaderParameter(fragID, gl.COMPILE_STATUS)) {
      document.getElementById("code_frag_error").innerHTML = "invalid fragment shader : " + gl.getShaderInfoLog(fragID);
      error = true;
    }else{
      document.getElementById("code_frag_error").innerHTML = "";
    }

    if(error) return;

    progID = gl.createProgram();
    gl.attachShader(progID, vertID);
    gl.attachShader(progID, fragID);

    gl.linkProgram(progID);
    if (!gl.getProgramParameter(progID, gl.LINK_STATUS)) {
      alert(gl.getProgramInfoLog(progID));
      return;
    }

    // retrieve the location of the IN variables of the vertex shader
    vertexLoc = gl.getAttribLocation(progID,"inputPosition");
    texCoordLoc =  gl.getAttribLocation(progID,"inputTexCoord");
    normalLoc = gl.getAttribLocation(progID, "inputNormal");

    // retrieve the location of the UNIFORM variables of the shader
    projectionLoc = gl.getUniformLocation(progID, "projection");
    modelviewLoc = gl.getUniformLocation(progID, "modelview");
    normalMatrixLoc = gl.getUniformLocation(progID, "normalMat");
    modeLoc = gl.getUniformLocation(progID, "mode");
    lightPosLoc = gl.getUniformLocation(progID, "lightPos");
    ambientColorLoc = gl.getUniformLocation(progID, "ambientColor");
    diffuseColorLoc = gl.getUniformLocation(progID, "diffuseColor");
    specularColorLoc = gl.getUniformLocation(progID, "specularColor");
    shininessLoc = gl.getUniformLocation(progID, "shininessVal");
    kaLoc = gl.getUniformLocation(progID, "Ka");
    kdLoc = gl.getUniformLocation(progID, "Kd");
    ksLoc = gl.getUniformLocation(progID, "Ks");
  }

  //  Utility Functions ================================================================================
  function vec3Dot(a, b) {
    return a[0]*b[0] + a[1]*b[1] + a[2]*b[2];
  }

  function vec3Cross(a, b, res) {
    res[0] = a[1] * b[2]  -  b[1] * a[2];
    res[1] = a[2] * b[0]  -  b[2] * a[0];
    res[2] = a[0] * b[1]  -  b[0] * a[1];
  }

  function vec3Normalize(a) {
    var mag = Math.sqrt(a[0] * a[0]  +  a[1] * a[1]  +  a[2] * a[2]);
    a[0] /= mag; a[1] /= mag; a[2] /= mag;
  }

  function mat4Identity(a) {
    a.length = 16;
    for (var i = 0; i < 16; ++i) a[i] = 0.0;
    for (var i = 0; i < 4; ++i) a[i + i * 4] = 1.0;
  }

  function mat4Multiply(a, b, res) {
    for (var i = 0; i < 4; ++i) {
      for (var j = 0; j < 4; ++j) {
        res[j*4 + i] = 0.0;
        for (var k = 0; k < 4; ++k) {
          res[j*4 + i] += a[k*4 + i] * b[j*4 + k];
        }
      }
    }
  }

  function mat4Perspective(a, fov, aspect, zNear, zFar) {
    var f = 1.0 / Math.tan (fov/2.0 * (Math.PI / 180.0));
    mat4Identity(a);
    a[0] = f / aspect;
    a[1 * 4 + 1] = f;
    a[2 * 4 + 2] = (zFar + zNear)  / (zNear - zFar);
    a[3 * 4 + 2] = (2.0 * zFar * zNear) / (zNear - zFar);
    a[2 * 4 + 3] = -1.0;
    a[3 * 4 + 3] = 0.0;
  }

  function  mat4LookAt(viewMatrix,
      eyeX, eyeY, eyeZ,
      centerX, centerY, centerZ,
      upX, upY, upZ) {

    var dir = new Float32Array(3);
    var right = new Float32Array(3);
    var up = new Float32Array(3);
    var eye = new Float32Array(3);

    up[0]=upX; up[1]=upY; up[2]=upZ;
    eye[0]=eyeX; eye[1]=eyeY; eye[2]=eyeZ;

    dir[0]=centerX-eyeX; dir[1]=centerY-eyeY; dir[2]=centerZ-eyeZ;
    vec3Normalize(dir);
    vec3Cross(dir,up,right);
    vec3Normalize(right);
    vec3Cross(right,dir,up);
    vec3Normalize(up);
    // first row
    viewMatrix[0]  = right[0];
    viewMatrix[4]  = right[1];
    viewMatrix[8]  = right[2];
    viewMatrix[12] = -vec3Dot(right, eye);
    // second row
    viewMatrix[1]  = up[0];
    viewMatrix[5]  = up[1];
    viewMatrix[9]  = up[2];
    viewMatrix[13] = -vec3Dot(up, eye);
    // third row
    viewMatrix[2]  = -dir[0];
    viewMatrix[6]  = -dir[1];
    viewMatrix[10] = -dir[2];
    viewMatrix[14] =  vec3Dot(dir, eye);
    // forth row
    viewMatrix[3]  = 0.0;
    viewMatrix[7]  = 0.0;
    viewMatrix[11] = 0.0;
    viewMatrix[15] = 1.0;
  }

  function mat4Transpose(a, transposed) {
    var t = 0;
    for (var i = 0; i < 4; ++i) {
      for (var j = 0; j < 4; ++j) {
        transposed[t++] = a[j * 4 + i];
      }
    }
  }

  function mat4Invert(m, inverse) {
    var inv = new Float32Array(16);
    inv[0] = m[5]*m[10]*m[15]-m[5]*m[11]*m[14]-m[9]*m[6]*m[15]+
             m[9]*m[7]*m[14]+m[13]*m[6]*m[11]-m[13]*m[7]*m[10];
    inv[4] = -m[4]*m[10]*m[15]+m[4]*m[11]*m[14]+m[8]*m[6]*m[15]-
             m[8]*m[7]*m[14]-m[12]*m[6]*m[11]+m[12]*m[7]*m[10];
    inv[8] = m[4]*m[9]*m[15]-m[4]*m[11]*m[13]-m[8]*m[5]*m[15]+
             m[8]*m[7]*m[13]+m[12]*m[5]*m[11]-m[12]*m[7]*m[9];
    inv[12]= -m[4]*m[9]*m[14]+m[4]*m[10]*m[13]+m[8]*m[5]*m[14]-
             m[8]*m[6]*m[13]-m[12]*m[5]*m[10]+m[12]*m[6]*m[9];
    inv[1] = -m[1]*m[10]*m[15]+m[1]*m[11]*m[14]+m[9]*m[2]*m[15]-
             m[9]*m[3]*m[14]-m[13]*m[2]*m[11]+m[13]*m[3]*m[10];
    inv[5] = m[0]*m[10]*m[15]-m[0]*m[11]*m[14]-m[8]*m[2]*m[15]+
             m[8]*m[3]*m[14]+m[12]*m[2]*m[11]-m[12]*m[3]*m[10];
    inv[9] = -m[0]*m[9]*m[15]+m[0]*m[11]*m[13]+m[8]*m[1]*m[15]-
             m[8]*m[3]*m[13]-m[12]*m[1]*m[11]+m[12]*m[3]*m[9];
    inv[13]= m[0]*m[9]*m[14]-m[0]*m[10]*m[13]-m[8]*m[1]*m[14]+
             m[8]*m[2]*m[13]+m[12]*m[1]*m[10]-m[12]*m[2]*m[9];
    inv[2] = m[1]*m[6]*m[15]-m[1]*m[7]*m[14]-m[5]*m[2]*m[15]+
             m[5]*m[3]*m[14]+m[13]*m[2]*m[7]-m[13]*m[3]*m[6];
    inv[6] = -m[0]*m[6]*m[15]+m[0]*m[7]*m[14]+m[4]*m[2]*m[15]-
             m[4]*m[3]*m[14]-m[12]*m[2]*m[7]+m[12]*m[3]*m[6];
    inv[10]= m[0]*m[5]*m[15]-m[0]*m[7]*m[13]-m[4]*m[1]*m[15]+
             m[4]*m[3]*m[13]+m[12]*m[1]*m[7]-m[12]*m[3]*m[5];
    inv[14]= -m[0]*m[5]*m[14]+m[0]*m[6]*m[13]+m[4]*m[1]*m[14]-
             m[4]*m[2]*m[13]-m[12]*m[1]*m[6]+m[12]*m[2]*m[5];
    inv[3] = -m[1]*m[6]*m[11]+m[1]*m[7]*m[10]+m[5]*m[2]*m[11]-
             m[5]*m[3]*m[10]-m[9]*m[2]*m[7]+m[9]*m[3]*m[6];
    inv[7] = m[0]*m[6]*m[11]-m[0]*m[7]*m[10]-m[4]*m[2]*m[11]+
             m[4]*m[3]*m[10]+m[8]*m[2]*m[7]-m[8]*m[3]*m[6];
    inv[11]= -m[0]*m[5]*m[11]+m[0]*m[7]*m[9]+m[4]*m[1]*m[11]-
             m[4]*m[3]*m[9]-m[8]*m[1]*m[7]+m[8]*m[3]*m[5];
    inv[15]= m[0]*m[5]*m[10]-m[0]*m[6]*m[9]-m[4]*m[1]*m[10]+
             m[4]*m[2]*m[9]+m[8]*m[1]*m[6]-m[8]*m[2]*m[5];

    var det = m[0]*inv[0]+m[1]*inv[4]+m[2]*inv[8]+m[3]*inv[12];
    if (det == 0) return false;
    det = 1.0 / det;
    for (var i = 0; i < 16; i++) inverse[i] = inv[i] * det;
    return true;
  }
}

