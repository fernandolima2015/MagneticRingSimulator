import{E as e,M as t,d as n}from"./vendor-post-NFUJjCzR.js";import{a as r,i,t as a}from"./buildShader-7_z7RXOI.js";import{s as o}from"./createShaderMaterial-CROzoNMu.js";import{t as s}from"./useRealityField-C1HrIyWv.js";var c={vertexShader:r(`// Rasgo da realidade — fenda no tecido do espaço

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
`,i),fragmentShader:r(`// Rasgo — borda incandescente + vazio interior

uniform float uTime;
uniform float uTear;
uniform float uCorruption;
uniform vec3 uEdgeColor;
uniform vec3 uVoidColor;

varying vec2 vUv;
varying float vEdge;
varying float vDepth;

void main() {
  float tearLine = smoothstep(0.48, 0.5, abs(vUv.x - 0.5 + sin(vUv.y * 20.0 + uTime * 4.0) * 0.04 * uTear));
  float edge = vEdge + tearLine * uTear;

  float voidMask = smoothstep(0.35, 0.5, abs(vUv.x - 0.5)) * uTear;
  float noise = fbm(vec3(vUv * 8.0, uTime * 0.5), 4) * uCorruption;

  vec3 col = mix(uVoidColor, uEdgeColor, edge + noise * 0.3);
  col += vec3(1.0, 0.9, 1.2) * edge * 1.5;

  float alpha = (edge * 0.9 + voidMask * 0.35) * smoothstep(120.0, 20.0, vDepth);
  if (alpha < 0.02) discard;

  gl_FragColor = vec4(col, alpha);
}
`,a)},l=t(),u=7;function d(){let e=[];for(let t=0;t<u;t++){let n=t/u*Math.PI*2+Math.random()*.4,r=12+Math.random()*28;e.push({position:[Math.cos(n)*r,(Math.random()-.5)*8,Math.sin(n)*r],rotation:[Math.random()*.3,n+Math.PI/2,Math.random()*.2],scale:[.15+Math.random()*.2,8+Math.random()*12,1]})}return e}var f=d(),p=new e({transparent:!0,depthWrite:!1,side:2,blending:2,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader,uniforms:o()});function m(){let e=s();return n(t=>{let n=p.uniforms;n.uTime.value=t.clock.elapsedTime,n.uTear.value=e.tearIntensity,n.uPhase.value=e.phase,n.uCorruption.value=e.shaderCorruption}),e.tearIntensity<.25||(e.ruptureLevel??0)<2?null:(0,l.jsx)(`group`,{renderOrder:50,children:f.map((e,t)=>(0,l.jsx)(`mesh`,{position:e.position,rotation:e.rotation,scale:e.scale,material:p,frustumCulled:!1,children:(0,l.jsx)(`planeGeometry`,{args:[1,1,1,16]})},t))})}export{m as default};