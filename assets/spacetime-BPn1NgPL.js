import{a as e,n as t,r as n}from"./buildShader-CO1bC7zE.js";var r=`// Tecido do espaço-tempo — esfera envolvente com curvatura viva

uniform float uTime;
uniform float uTimeScale;
uniform float uLensing;
uniform float uDistortion;
uniform float uTension;
uniform float uRipple;
uniform float uRupture;

varying vec3 vWorldPos;
varying vec3 vNormalW;
varying float vCurvature;
varying float vDepth;

void main() {
  float t = uTime * uTimeScale;
  vec3 pos = position;

  pos = spacetimeWell(pos, uLensing, uDistortion + uTension * 0.3, t);

  if (uRupture > 0.05) {
    pos += normalize(pos + vec3(0.001)) * snoise(pos * 0.15 + t * 3.0) * uRupture * 4.0;
    pos.xz += vec2(snoise(vec3(t * 5.0, pos.y, uRupture)), 0.0) * uRupture * 2.5;
  }

  float shell = length(position);
  float breathe = sin(t * 0.6 + shell * 0.02) * uRipple * 0.15;
  pos *= 1.0 + breathe * uDistortion;

  vCurvature = uDistortion + uLensing * 0.5 + abs(breathe);
  vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
  vNormalW = normalize((modelMatrix * vec4(normal, 0.0)).xyz);

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vDepth = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`,i=`// Tecido do espaço-tempo — malha luminosa + gradiente de curvatura\r
\r
uniform float uTime;\r
uniform float uTimeScale;\r
uniform float uLensing;\r
uniform float uDistortion;\r
uniform vec3 uFabricColor;\r
uniform vec3 uAccentColor;\r
\r
varying vec3 vWorldPos;\r
varying vec3 vNormalW;\r
varying float vCurvature;\r
varying float vDepth;\r
\r
void main() {\r
  float t = uTime * uTimeScale;\r
  float grid = spacetimeGrid(vWorldPos, 0.12 + uLensing * 0.08, t, uDistortion);\r
\r
  float fresnel = pow(1.0 - abs(dot(normalize(vNormalW), vec3(0.0, 0.0, 1.0))), 2.5);\r
  float meridian = abs(sin(atan(vWorldPos.z, vWorldPos.x) * 12.0 + t * 0.5)) * 0.15;\r
\r
  vec3 col = mix(uFabricColor, uAccentColor, vCurvature * 0.6 + fresnel * 0.3);\r
  col += uAccentColor * grid * (0.35 + uLensing * 0.4);\r
  col += vec3(0.4, 0.55, 1.0) * meridian * uLensing;\r
\r
  float alpha = (grid * 0.22 + fresnel * 0.12 + vCurvature * 0.08) * (0.5 + uLensing * 0.5);\r
  alpha = clamp(alpha, 0.02, 0.55);\r
  alpha *= (1.0 - smoothstep(40.0, 180.0, vDepth));\r
\r
  // Cor negativa em mistura aditiva "apaga" a cena (manchas pretas no pós-processamento)\r
  gl_FragColor = vec4(max(col, vec3(0.0)), clamp(alpha, 0.0, 1.0));\r
}\r
`,a=`// Campo estelar — pontos distorcidos pelo poço gravitacional

uniform float uTime;
uniform float uTimeScale;
uniform float uLensing;
uniform float uDistortion;
uniform float uRipple;

attribute float aTwinkle;
attribute float aShell;

varying float vTwinkle;
varying float vDepth;
varying float vStretch;

void main() {
  float t = uTime * uTimeScale;
  vec3 pos = position;

  pos = spacetimeWell(pos, uLensing * 1.15, uDistortion, t);

  float tw = sin(t * (2.0 + aTwinkle * 4.0) + aShell * 20.0) * 0.5 + 0.5;
  vTwinkle = tw * (0.6 + aTwinkle * 0.4);

  vec2 xz = pos.xz;
  float dist = length(xz);
  vStretch = uLensing / (dist + 2.0);

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vDepth = -mv.z;
  float size = (1.2 + aTwinkle * 2.5) * (1.0 + vStretch * 3.0) * (120.0 / max(vDepth, 1.0));
  gl_PointSize = clamp(size, 0.5, 4.5);
  gl_Position = projectionMatrix * mv;
}
`,o=`// Estrelas — núcleo branco + halo cromático sob lensing\r
\r
uniform float uLensing;\r
uniform vec3 uStarColor;\r
\r
varying float vTwinkle;\r
varying float vDepth;\r
varying float vStretch;\r
\r
void main() {\r
  vec2 pc = gl_PointCoord - 0.5;\r
  float d = length(pc);\r
  if (d > 0.5) discard;\r
\r
  float core = (1.0 - smoothstep(0.0, 0.5, d));\r
  float halo = (1.0 - smoothstep(0.15, 0.5, d)) * 0.4;\r
\r
  vec3 col = uStarColor * (core + halo) * (0.7 + vTwinkle * 0.5);\r
  col.r += vStretch * 0.15;\r
  col.b += vStretch * 0.25;\r
\r
  float alpha = (core + halo * 0.5) * (0.5 + uLensing * 0.2);\r
  alpha *= (1.0 - smoothstep(30.0, 250.0, vDepth));\r
\r
  // Cor negativa em mistura aditiva "apaga" a cena (manchas pretas no pós-processamento)\r
  gl_FragColor = vec4(max(col, vec3(0.0)), clamp(alpha, 0.0, 1.0));\r
}\r
`,s={vertexShader:e(r,n),fragmentShader:e(i,t)},c={vertexShader:e(a,n),fragmentShader:e(o,t)};export{c as n,s as t};