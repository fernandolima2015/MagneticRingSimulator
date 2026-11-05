import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{i as t,t as n}from"./vendor-react-BVnWb422.js";import{i as r}from"./vendor-r3f-Cy2v2uTY.js";import{m as i}from"./index-Bx0g5MTh.js";import{G as a}from"./vendor-three-RqB-y9wz.js";var o=e(t(),1),s=n(),c=`
  varying vec3 vWorldPos;
  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`,l=`
  uniform float uTime;
  uniform float uEnergy;
  uniform float uTemperature;
  uniform float uCorePulse;
  uniform vec3 uCorePos;
  uniform float uWarpPulse;

  varying vec3 vWorldPos;

  float hash(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
  }

  float fogNoise(vec3 p) {
    float n = 0.0;
    n += sin(p.x * 0.1 + uTime * 0.2) * cos(p.z * 0.1 + uTime * 0.15);
    n += sin(p.y * 0.15 - uTime * 0.1) * 0.5;
    return n * 0.5 + 0.5;
  }

  void main() {
    float dist = length(vWorldPos - uCorePos);
    float radial = exp(-dist * 0.04) * (uEnergy / 100.0);
    float n = fogNoise(vWorldPos * 0.3);
    float density = radial * n * (0.15 + uCorePulse * 0.1 + uWarpPulse * 0.2);
    density += exp(-abs(vWorldPos.y + 3.0) * 0.08) * 0.05;

    vec3 col = mix(vec3(0.01, 0.04, 0.08), vec3(0.0, 0.3, 0.5), uEnergy / 100.0);
    col += vec3(0.3, 0.1, 0.0) * (uTemperature / 5000.0) * 0.2;

    gl_FragColor = vec4(col, density * 0.18);
  }
`;function u(){let e=(0,o.useRef)(),t=(0,o.useMemo)(()=>({uTime:{value:0},uEnergy:{value:0},uTemperature:{value:300},uCorePulse:{value:1},uCorePos:{value:new a(0,0,0)},uWarpPulse:{value:0}}),[]);return r(t=>{if(!e.current)return;let{energy:n,visual:r,fx:a}=i.getState(),o=e.current.uniforms;o.uTime.value=t.clock.elapsedTime,o.uEnergy.value=n.energyLevel,o.uTemperature.value=n.temperature,o.uCorePulse.value=r.corePulse,o.uWarpPulse.value=a.warpPulse}),(0,s.jsxs)(`mesh`,{renderOrder:-1,children:[(0,s.jsx)(`boxGeometry`,{args:[120,60,120]}),(0,s.jsx)(`shaderMaterial`,{ref:e,vertexShader:c,fragmentShader:l,uniforms:t,transparent:!0,depthWrite:!1,side:1,blending:2})]})}var d=(0,o.memo)(u);export{d as default};