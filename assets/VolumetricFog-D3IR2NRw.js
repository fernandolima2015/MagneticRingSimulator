import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{F as t,M as n,d as r,j as i}from"./vendor-post-NFUJjCzR.js";import{S as a,o,s,x as c}from"./index-ipJfMC9t.js";var l=e(t(),1),u=n(),d=`
  varying vec3 vWorldPos;
  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`,f=`
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
`;function p(){let e=(0,l.useRef)(),t=a(o),n=a(c),p=a(s),m=(0,l.useMemo)(()=>({uTime:{value:0},uEnergy:{value:0},uTemperature:{value:300},uCorePulse:{value:1},uCorePos:{value:new i(0,0,0)},uWarpPulse:{value:0}}),[]);return r(r=>{if(!e.current)return;let i=e.current.uniforms;i.uTime.value=r.clock.elapsedTime,i.uEnergy.value=t.energyLevel,i.uTemperature.value=t.temperature,i.uCorePulse.value=n.corePulse,i.uWarpPulse.value=p.warpPulse}),(0,u.jsxs)(`mesh`,{renderOrder:-1,children:[(0,u.jsx)(`boxGeometry`,{args:[120,60,120]}),(0,u.jsx)(`shaderMaterial`,{ref:e,vertexShader:d,fragmentShader:f,uniforms:m,transparent:!0,depthWrite:!1,side:1,blending:2})]})}var m=(0,l.memo)(p);export{m as default};