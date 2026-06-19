import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{F as t,M as n,d as r,g as i}from"./vendor-post-NFUJjCzR.js";import{t as a}from"./createShaderMaterial-CROzoNMu.js";import{t as o}from"./useDecouplingField-L5t3thSN.js";var s=e(t(),1),c={vertexShader:`uniform float uTime;
uniform float uStrength;
uniform float uPhase;
uniform float uDistortion;

varying vec3 vWorldPos;
varying vec3 vNormal;
varying float vFresnel;

void main() {
  vec3 pos = position;
  float ripple = sin(pos.y * 3.0 + uPhase * 2.0) * cos(pos.x * 2.5 - uTime * 0.6);
  pos += normal * ripple * uDistortion * 0.15;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
  vNormal = normalize(normalMatrix * normal);
  vec3 viewDir = normalize(-mvPosition.xyz);
  vFresnel = pow(1.0 - clamp(dot(vNormal, viewDir), 0.0, 1.0), 2.5);
  gl_Position = projectionMatrix * mvPosition;
}
`,fragmentShader:`uniform float uTime;
uniform float uStrength;
uniform vec3 uColorA;
uniform vec3 uColorB;

varying vec3 vWorldPos;
varying vec3 vNormal;
varying float vFresnel;

void main() {
  float rim = vFresnel * uStrength;
  float scan = sin(vWorldPos.y * 12.0 + uTime * 1.8) * 0.5 + 0.5;
  scan = smoothstep(0.92, 1.0, scan) * uStrength * 0.35;

  vec3 col = mix(uColorA, uColorB, vFresnel);
  col += vec3(0.55, 0.85, 1.0) * scan;

  float alpha = rim * 0.22 + scan * 0.08;
  gl_FragColor = vec4(col, alpha);
}
`},l=n();function u(){let e=(0,s.useRef)(),t=(0,s.useRef)(),n=(0,s.useRef)(),u=(0,s.useRef)(),d=o(),f=(0,s.useMemo)(()=>a(),[]),p=(0,s.useMemo)(()=>a({uColorA:new i(`#061018`),uColorB:new i(`#88eeff`)}),[]);return r(r=>{if(!d.visible||!d.bubbleVisible)return;let i=r.clock.elapsedTime,a=Math.max(d.strength,.15),o=(e,t)=>{if(!e.current)return;let n=e.current.uniforms;n.uTime.value=i,n.uStrength.value=a,n.uPhase.value=d.phase,n.uDistortion.value=d.distortion*t};o(n,1.2),o(u,.8);let s=d.bubbleRadius??8;e.current&&(e.current.scale.setScalar(s),e.current.rotation.y=i*.04),t.current&&(t.current.scale.setScalar(s*.62),t.current.rotation.y=-i*.06)}),!d.visible||!d.bubbleVisible?null:(0,l.jsxs)(`group`,{name:`decoupling-bubble`,renderOrder:4,children:[(0,l.jsxs)(`mesh`,{ref:e,renderOrder:3,children:[(0,l.jsx)(`sphereGeometry`,{args:[1,64,64]}),(0,l.jsx)(`shaderMaterial`,{ref:n,transparent:!0,depthWrite:!1,side:1,blending:2,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader,uniforms:f})]}),(0,l.jsxs)(`mesh`,{ref:t,renderOrder:4,children:[(0,l.jsx)(`sphereGeometry`,{args:[1,48,48]}),(0,l.jsx)(`shaderMaterial`,{ref:u,transparent:!0,depthWrite:!1,side:0,blending:2,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader,uniforms:p})]})]})}export{u as default};