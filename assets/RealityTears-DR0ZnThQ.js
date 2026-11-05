import{t as e}from"./vendor-react-BVnWb422.js";import{i as t}from"./vendor-r3f-Cy2v2uTY.js";import{m as n}from"./index-B2AIcwJW.js";import{L as r}from"./vendor-three-RqB-y9wz.js";import{a as i,i as a,t as o}from"./buildShader-CO1bC7zE.js";import{s}from"./createShaderMaterial-CSeXaZX3.js";import{t as c}from"./useRealityField-DLshToEu.js";var l={vertexShader:i(`// Rasgo da realidade — fenda no tecido do espaço

uniform float uTime;
uniform float uTear;
uniform float uPhase;
uniform float uCorruption;

varying vec2 vUv;
varying float vEdge;
varying float vDepth;

void main() {
  vUv = uv;
  vec3 pos = position;

  float wobble = snoise(vec3(pos.xy * 0.5, uTime * 2.0 + uPhase)) * uTear * 2.5;
  pos.x += wobble;
  pos.y += sin(uTime * 8.0 + pos.y * 0.3) * uTear * 0.8;

  vEdge = abs(sin(vUv.y * 40.0 + uTime * 3.0 + fbm(vec3(vUv * 4.0, uTime), 3) * 6.0));
  vEdge = smoothstep(0.85, 1.0, vEdge) * uTear;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vDepth = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`,a),fragmentShader:i(`// Rasgo — borda incandescente + vazio interior\r
\r
uniform float uTime;\r
uniform float uTear;\r
uniform float uCorruption;\r
uniform vec3 uEdgeColor;\r
uniform vec3 uVoidColor;\r
\r
varying vec2 vUv;\r
varying float vEdge;\r
varying float vDepth;\r
\r
void main() {\r
  float tearLine = smoothstep(0.48, 0.5, abs(vUv.x - 0.5 + sin(vUv.y * 20.0 + uTime * 4.0) * 0.04 * uTear));\r
  float edge = vEdge + tearLine * uTear;\r
\r
  float voidMask = smoothstep(0.35, 0.5, abs(vUv.x - 0.5)) * uTear;\r
  float noise = fbm(vec3(vUv * 8.0, uTime * 0.5), 4) * uCorruption;\r
\r
  vec3 col = mix(uVoidColor, uEdgeColor, edge + noise * 0.3);\r
  col += vec3(1.0, 0.9, 1.2) * edge * 1.5;\r
\r
  float alpha = (edge * 0.9 + voidMask * 0.35) * (1.0 - smoothstep(20.0, 120.0, vDepth));\r
  if (alpha < 0.02) discard;\r
\r
  // Cor negativa em mistura aditiva "apaga" a cena (manchas pretas no pós-processamento)\r
  gl_FragColor = vec4(max(col, vec3(0.0)), clamp(alpha, 0.0, 1.0));\r
}\r
`,o)},u=e(),d=7;function f(){let e=[];for(let t=0;t<d;t++){let n=t/d*Math.PI*2+Math.random()*.4,r=12+Math.random()*28;e.push({position:[Math.cos(n)*r,(Math.random()-.5)*8,Math.sin(n)*r],rotation:[Math.random()*.3,n+Math.PI/2,Math.random()*.2],scale:[.15+Math.random()*.2,8+Math.random()*12,1]})}return e}var p=f(),m=new r({transparent:!0,depthWrite:!1,side:2,blending:2,vertexShader:l.vertexShader,fragmentShader:l.fragmentShader,uniforms:s()});function h(){let e=n(e=>{let t=c(e);return t.tearIntensity>=.25&&t.ruptureLevel>=2});return t(e=>{let t=c(),n=m.uniforms;n.uTime.value=e.clock.elapsedTime,n.uTear.value=t.tearIntensity,n.uPhase.value=t.phase,n.uCorruption.value=t.shaderCorruption}),e?(0,u.jsx)(`group`,{renderOrder:50,children:p.map((e,t)=>(0,u.jsx)(`mesh`,{position:e.position,rotation:e.rotation,scale:e.scale,material:m,frustumCulled:!1,children:(0,u.jsx)(`planeGeometry`,{args:[1,1,1,16]})},t))}):null}export{h as default};