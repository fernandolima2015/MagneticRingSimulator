import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{i as t,t as n}from"./vendor-react-BVnWb422.js";import{i as r}from"./vendor-r3f-Cy2v2uTY.js";import{m as i}from"./index-Bx0g5MTh.js";import{s as a}from"./vendor-three-RqB-y9wz.js";import{t as o}from"./createShaderMaterial-DyBCbO5K.js";import{t as s}from"./useDecouplingField-Dn3HKZFH.js";var c=e(t(),1),l={vertexShader:`uniform float uTime;
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
`},u=n();function d(){let e=(0,c.useRef)(),t=(0,c.useRef)(),n=(0,c.useRef)(),d=(0,c.useRef)(),f=i(e=>{let t=s(e);return!!(t.visible&&t.bubbleVisible)}),p=(0,c.useMemo)(()=>o(),[]),m=(0,c.useMemo)(()=>o({uColorA:new a(`#061018`),uColorB:new a(`#88eeff`)}),[]);return r(r=>{let i=s();if(!i.visible||!i.bubbleVisible)return;let a=r.clock.elapsedTime,o=Math.max(i.strength,.15),c=(e,t)=>{if(!e.current)return;let n=e.current.uniforms;n.uTime.value=a,n.uStrength.value=o,n.uPhase.value=i.phase,n.uDistortion.value=i.distortion*t};c(n,1.2),c(d,.8);let l=i.bubbleRadius??8;e.current&&(e.current.scale.setScalar(l),e.current.rotation.y=a*.04),t.current&&(t.current.scale.setScalar(l*.62),t.current.rotation.y=-a*.06)}),f?(0,u.jsxs)(`group`,{name:`decoupling-bubble`,renderOrder:4,children:[(0,u.jsxs)(`mesh`,{ref:e,renderOrder:3,children:[(0,u.jsx)(`sphereGeometry`,{args:[1,64,64]}),(0,u.jsx)(`shaderMaterial`,{ref:n,transparent:!0,depthWrite:!1,side:1,blending:2,vertexShader:l.vertexShader,fragmentShader:l.fragmentShader,uniforms:p})]}),(0,u.jsxs)(`mesh`,{ref:t,renderOrder:4,children:[(0,u.jsx)(`sphereGeometry`,{args:[1,48,48]}),(0,u.jsx)(`shaderMaterial`,{ref:d,transparent:!0,depthWrite:!1,side:0,blending:2,vertexShader:l.vertexShader,fragmentShader:l.fragmentShader,uniforms:m})]})]}):null}export{d as default};