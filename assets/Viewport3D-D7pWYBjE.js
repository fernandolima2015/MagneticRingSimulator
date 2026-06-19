const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/SpacetimeStarfield-oCh0Eu9j.js","assets/rolldown-runtime-QTnfLwEv.js","assets/vendor-post-NFUJjCzR.js","assets/useSpacetimeField-yV7XD9tl.js","assets/index-ipJfMC9t.js","assets/vendor-r3f-CzeBFVkK.js","assets/sim-engine-BoQwuMpZ.js","assets/index-ByIlG-5C.css","assets/spacetime--3JAMKOg.js","assets/buildShader-7_z7RXOI.js","assets/createShaderMaterial-CROzoNMu.js","assets/SpacetimeFabric-CZ5LHAgv.js","assets/useRealityField-C1HrIyWv.js","assets/QuantumField-AIq6lIJ6.js","assets/useQuantumField-0eQdWZLA.js","assets/RealityTears-BEQcIXGf.js","assets/HyperdimensionField-CrFj7Li7.js","assets/useHyperdimensionField-CGvkqa_a.js","assets/DecouplingBubble-CUtv3oub.js","assets/useDecouplingField-L5t3thSN.js","assets/VolumetricFog-D3IR2NRw.js","assets/EffectsComposer-BPfcteVh.js","assets/useRenderQuality-Bh33GxXX.js"])))=>i.map(i=>d[i]);
import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{F as t,M as n,T as r,d as i,p as a,u as o,y as s}from"./vendor-post-NFUJjCzR.js";import{n as c,t as l}from"./vendor-r3f-CzeBFVkK.js";import{O as u,k as d,s as f,t as p}from"./sim-engine-BoQwuMpZ.js";import{C as m,S as h,_ as g,b as _,f as v,m as ee,o as y,p as b,s as x,t as S,v as C,x as w}from"./index-ipJfMC9t.js";import{a as T,i as E,t as D}from"./buildShader-7_z7RXOI.js";import{a as te,c as O,i as ne,n as re,u as k}from"./createShaderMaterial-CROzoNMu.js";import{t as A}from"./useRenderQuality-Bh33GxXX.js";import{t as j}from"./useSpacetimeField-yV7XD9tl.js";import{t as ie}from"./useRealityField-C1HrIyWv.js";var M=e(t(),1),N=n(),P=4,F=.42,I=30;function ae(){let e=(0,M.useRef)(),t=(0,M.useRef)(),n=(0,M.useRef)(),r=h(w),a=h(e=>e.ringRadius);return i(()=>{if(!e.current)return;let i=r.ringRotationSpeed;e.current.rotation.y+=i,t.current.rotation.y-=i*.35,n.current.rotation.y+=i*.5;let o=a/P;e.current.scale.set(o,o,o),t.current.scale.set(o*.98,o*.98,o*.98),n.current.scale.set(o*1.02,o*1.02,o*1.02);let s=Math.min(2.2,(r.ringEmissive??.6)*1.4+.35);e.current.material.emissiveIntensity=s,t.current.material.emissiveIntensity=s*1.15,n.current.material.opacity=.55+s*.15}),(0,N.jsxs)(`group`,{renderOrder:I,children:[(0,N.jsxs)(`mesh`,{ref:e,renderOrder:I,children:[(0,N.jsx)(`torusGeometry`,{args:[P,F,64,320]}),(0,N.jsx)(`meshPhysicalMaterial`,{color:`#022a3a`,emissive:`#00bbee`,emissiveIntensity:1.1,metalness:.92,roughness:.15,clearcoat:1,clearcoatRoughness:.06,reflectivity:.9,depthWrite:!0,toneMapped:!0})]}),(0,N.jsxs)(`mesh`,{ref:t,renderOrder:31,children:[(0,N.jsx)(`torusGeometry`,{args:[P*.97,F*.5,48,256]}),(0,N.jsx)(`meshPhysicalMaterial`,{color:`#044455`,emissive:`#00ddff`,emissiveIntensity:1.25,metalness:.88,roughness:.2,transparent:!0,opacity:.95,clearcoat:.9,depthWrite:!0,toneMapped:!0})]}),(0,N.jsxs)(`mesh`,{ref:n,renderOrder:32,children:[(0,N.jsx)(`torusGeometry`,{args:[P,F*.22,32,200]}),(0,N.jsx)(`meshBasicMaterial`,{color:`#00eeff`,transparent:!0,opacity:.65,blending:2,depthWrite:!1,toneMapped:!0})]})]})}var L={vertexShader:T(`// Energy Core Vertex — núcleo de fusão com pulsação radial

uniform float uTime;
uniform float uEnergy;
uniform float uRPM;
uniform float uOverload;
uniform float uInstability;
uniform float uTemperature;

varying vec3 vNormal;
varying vec3 vViewDir;
varying vec2 vUv;
varying float vRadial;
varying float vNoise;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);

  vec3 pos = position;
  float radial = length(pos);
  vRadial = radial;

  float pulseVal = pulse(uTime, 4.0 + uRPM * 0.0001);
  float instability = uInstability * 0.3;
  vNoise = fbm(pos * 2.0 + uTime * 0.5, 5);

  float displacement = vNoise * 0.12 * (uEnergy / 100.0)
    + sin(radial * 8.0 - uTime * 6.0) * 0.04 * pulseVal
    + instability * snoise(pos * 4.0 + uTime);

  pos += normal * displacement * (1.0 + uOverload * 0.5);

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vViewDir = normalize(-mvPosition.xyz);
  gl_Position = projectionMatrix * mvPosition;
}
`,E),fragmentShader:T(`// Energy Core Fragment — emissive pulsante, fluxo radial, instabilidade

uniform float uTime;
uniform float uEnergy;
uniform float uRPM;
uniform float uOverload;
uniform float uInstability;
uniform float uTemperature;
uniform vec3 uCoreColor;
uniform vec3 uHotColor;

varying vec3 vNormal;
varying vec3 vViewDir;
varying vec2 vUv;
varying float vRadial;
varying float vNoise;

void main() {
  float fres = fresnel(vNormal, vViewDir, 1.8);
  float core = 1.0 - smoothstep(0.0, 0.85, vRadial);
  float shell = smoothstep(0.6, 1.0, vRadial) * smoothstep(1.0, 0.7, vRadial);

  float flow = sin(vRadial * 12.0 - uTime * (4.0 + uRPM * 0.00005)) * 0.5 + 0.5;
  float turbMix = turbulence(vNormal + uTime * 0.2, 4) * 0.5 + 0.5;

  float heat = clamp01(uTemperature / 4000.0);
  float energyNorm = uEnergy / 100.0;

  vec3 inner = mix(uCoreColor, uHotColor, heat * 0.6 + energyNorm * 0.3);
  inner += vec3(1.0, 0.6, 0.2) * uOverload * 0.5;
  inner *= 1.0 + flow * 0.35 + vNoise * 0.2;

  vec3 col = inner * core;
  col += uCoreColor * shell * fres * 1.2;
  col += vec3(0.3, 0.55, 0.85) * turbMix * uInstability * 0.25;
  col = min(col, vec3(0.5, 0.85, 1.0));

  float alpha = core * (0.45 + energyNorm * 0.25) + shell * fres * 0.28;
  alpha = min(clamp01(alpha + uOverload * 0.1), 0.72);

  gl_FragColor = vec4(col, alpha);
}
`,D)},oe=1.2;function R(){let e=(0,M.useRef)(),t=A(),n=h(w),r=h(y),a=h(b),o=h(_),s=h(C),c=h(x),l=h(e=>e.ringRadius),u=(0,M.useMemo)(()=>re(),[]);return i(t=>{if(!e.current)return;let i=l/4*n.corePulse;e.current.scale.setScalar(i);let u=e.current.material.uniforms;u.uTime.value=t.clock.elapsedTime,u.uEnergy.value=r.energyLevel??0,u.uRPM.value=a.rpm??0,u.uOverload.value=+!!r.overload+(c.overloadFlash??0),u.uInstability.value=1-(o.overall??1),u.uTemperature.value=r.temperature??300;let d=1-Math.min(1,(s.energyDensity??0)*1.1);e.current.material.opacity=d*(.55+(r.energyLevel??0)/200),e.current.visible=d>.08}),(0,N.jsxs)(`mesh`,{ref:e,renderOrder:8,children:[(0,N.jsx)(`sphereGeometry`,{args:[oe,t.energyCoreSegments,t.energyCoreSegments]},t.energyCoreSegments),(0,N.jsx)(`shaderMaterial`,{transparent:!0,depthWrite:!1,side:2,blending:2,vertexShader:L.vertexShader,fragmentShader:L.fragmentShader,uniforms:u})]})}var z=12,B=4;function se(){let e=(0,M.useRef)(),t=(0,M.useRef)([]),n=h(w),r=h(y),a=h(e=>e.ringRadius);return i(i=>{let o=a/4,s=n.ringRotationSpeed*2,c=i.clock.elapsedTime;e.current&&e.current.scale.set(o,o,o),t.current.forEach((e,t)=>{if(!e)return;e.rotation.y+=s;let n=.15+r.energyLevel/100*.35;e.material.opacity=n+Math.sin(c*5+t*.8)*.25})}),(0,N.jsx)(`group`,{ref:e,children:Array.from({length:z},(e,n)=>{let r=Math.PI*2/z*n;return(0,N.jsxs)(`mesh`,{ref:e=>{t.current[n]=e},position:[Math.cos(r)*B,0,Math.sin(r)*B],rotation:[0,r,Math.PI/2],children:[(0,N.jsx)(`cylinderGeometry`,{args:[.04,.04,10,12]}),(0,N.jsx)(`meshBasicMaterial`,{color:`#00ffff`,transparent:!0,opacity:.5})]},n)})})}var V={vertexShader:T(`// Plasma Vertex — partículas orbitais GPU-ready
// Includes resolvidos via buildShader.js

uniform float uTime;
uniform float uIntensity;
uniform float uTurbulence;
uniform float uRPM;
uniform float uTemporalShift;
uniform float uLensing;
uniform float uSpacetimeDistortion;
uniform float uTimeScale;

attribute float aPhase;
attribute float aSpeed;
attribute float aRadius;
attribute float aRandom;

varying float vGlow;
varying float vNoise;
varying vec3 vWorldPos;

void main() {
  float t = uTime * uTimeScale;
  float rpmFactor = uRPM / 100000.0;
  float speedMult = (uIntensity / 40.0) * (1.0 + uTurbulence * 0.5);
  float angle = aPhase + t * aSpeed * speedMult;

  vec3 pos;
  float r = aRadius + snoise(vec3(aRandom, uTime * 0.3, aPhase)) * uTurbulence * 0.4;
  pos.x = cos(angle) * r;
  pos.z = sin(angle) * r;
  pos.y = position.y
    + sin(t * 2.5 + aPhase) * 0.25 * uTurbulence
    + fbm(vec3(pos.xz * 0.5, t * 0.2), 3) * 0.15 * uIntensity / 50.0;

  float pDist = length(pos.xz);
  float pull = uLensing * uSpacetimeDistortion * 0.35 / (pDist * 0.15 + 1.0);
  pos.xz -= normalize(pos.xz + 0.001) * pull;

  vNoise = turbulence(vec3(pos * 0.8 + t * 0.15), 4);
  vGlow = 0.5 + 0.5 * sin(t * 4.0 + aPhase * 3.0 + uTemporalShift * 0.001);
  vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = (2.8 + uIntensity * 0.05 + vNoise * 1.5) * (220.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`,E),fragmentShader:T(`// Plasma Fragment — halo ionizado contido (não lavar anéis)

uniform float uTime;
uniform float uIntensity;
uniform float uTurbulence;
uniform float uTemperature;
uniform vec3 uColor;
uniform float uBurst;

varying float vGlow;
varying float vNoise;
varying vec3 vWorldPos;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float dist = length(uv);

  if (dist > 0.5) discard;

  float core = smoothstep(0.5, 0.08, dist);
  float ring = smoothstep(0.45, 0.28, dist) * smoothstep(0.12, 0.22, dist);

  float n = fbm(vec3(uv * 4.0, uTime * 0.5 + vNoise), 3);
  float energy = core * (0.25 + vGlow * 0.35) + ring * 0.15;
  energy *= (0.35 + uIntensity / 120.0) * (1.0 + uTurbulence * 0.25);
  energy += n * 0.08 * uTurbulence;
  energy += uBurst * 0.25;
  energy = min(energy, 0.85);

  vec3 hot = vec3(0.05, 0.55, 0.95);
  vec3 cool = vec3(0.0, 0.18, 0.45);
  vec3 accent = vec3(0.15, 0.75, 0.9);
  float temp = clamp01(uTemperature / 5000.0);
  vec3 col = mix(cool, hot, vGlow * 0.7);
  col = mix(col, accent, n * 0.35);
  col = mix(col, vec3(0.4, 0.5, 0.55), temp * 0.15);
  col *= energy * 1.1;
  col = min(col, vec3(0.35, 0.75, 0.95));

  float alpha = energy * (0.28 + uBurst * 0.12);
  alpha = min(alpha, 0.38);

  gl_FragColor = vec4(col, alpha);
}
`,D)},H=2;function U(e,t){let n=new Float32Array(e*3),r=new Float32Array(e),i=new Float32Array(e),a=new Float32Array(e),o=new Float32Array(e);for(let t=0;t<e;t++){let e=Math.random()*Math.PI*2,s=4.2+Math.random()*2.2;n[t*3+1]=(Math.random()-.5)*1.8,r[t]=e,i[t]=Math.random()*.01+.003,a[t]=s,o[t]=Math.random()}let s=new Float32Array(t);for(let e=0;e<t;e++)s[e]=e/t*Math.PI*2;return{positions:n,phases:r,speeds:i,radii:a,randoms:o,instanceAngles:s,instanceCount:t}}function W(){let e=(0,M.useRef)(),t=(0,M.useRef)(),n=(0,M.useRef)(),r=(0,M.useMemo)(()=>new s,[]),a=A(),o=(0,M.useMemo)(()=>U(a.plasmaParticleCount,a.plasmaInstanceCount),[a.plasmaParticleCount,a.plasmaInstanceCount]),c=h(e=>e.plasmaIntensity),l=h(e=>e.ringRadius),u=h(ee),d=h(b),f=h(y),p=h(g),m=h(x),_=j();return i(i=>{let a=l/4,s=i.clock.elapsedTime;if(e.current&&e.current.scale.setScalar(a),t.current&&t.current.scale.setScalar(a*.85),n.current){let e=n.current.uniforms;e.uTime.value=s,e.uIntensity.value=c*(.35+(u.confinement??1)*.35),e.uTurbulence.value=u.turbulence??0,e.uRPM.value=d.rpm??0,e.uTemperature.value=f.temperature??300,e.uTemporalShift.value=p.temporalShift??0,e.uBurst.value=m.plasmaBurst??0,e.uLensing.value=_.lensing,e.uSpacetimeDistortion.value=_.distortion,e.uTimeScale.value=_.timeScale,e.uColor&&e.uColor.value.set(.1,.55,.85)}if(t.current){let{instanceAngles:e}=o,n=_.lensing*_.distortion*.2;for(let i=0;i<o.instanceCount;i++){let a=e[i]+s*_.timeScale*.3,o=4.6+Math.sin(s*_.timeScale+i)*.4,c=Math.cos(a)*o,l=Math.sin(a)*o,d=Math.sqrt(c*c+l*l)+.5;c-=c/d*(n/d),l-=l/d*(n/d),r.position.set(c,Math.sin(s*_.timeScale*2+i)*.25,l),r.scale.setScalar(.045+(u.luminosity??0)*.025),r.updateMatrix(),t.current.setMatrixAt(i,r.matrix)}t.current.instanceMatrix.needsUpdate=!0}}),(0,N.jsxs)(`group`,{renderOrder:H,children:[(0,N.jsxs)(`points`,{ref:e,frustumCulled:!1,renderOrder:H,children:[(0,N.jsxs)(`bufferGeometry`,{children:[(0,N.jsx)(`bufferAttribute`,{attach:`attributes-position`,args:[o.positions,3]}),(0,N.jsx)(`bufferAttribute`,{attach:`attributes-aPhase`,args:[o.phases,1]}),(0,N.jsx)(`bufferAttribute`,{attach:`attributes-aSpeed`,args:[o.speeds,1]}),(0,N.jsx)(`bufferAttribute`,{attach:`attributes-aRadius`,args:[o.radii,1]}),(0,N.jsx)(`bufferAttribute`,{attach:`attributes-aRandom`,args:[o.randoms,1]})]}),(0,N.jsx)(`shaderMaterial`,{ref:n,transparent:!0,depthWrite:!1,depthTest:!0,blending:2,vertexShader:V.vertexShader,fragmentShader:V.fragmentShader,uniforms:te({uIntensity:c*.65})})]},`plasma-${a.plasmaParticleCount}`),(0,N.jsxs)(`instancedMesh`,{ref:t,args:[null,null,o.instanceCount],frustumCulled:!1,renderOrder:H,children:[(0,N.jsx)(`icosahedronGeometry`,{args:[1,1]}),(0,N.jsx)(`meshBasicMaterial`,{color:`#1188bb`,transparent:!0,opacity:.1,blending:2,depthWrite:!1,depthTest:!0,toneMapped:!0})]},`plasma-inst-${a.plasmaInstanceCount}`)]})}var G={vertexShader:T(`// Magnetic Field Vertex — toroide com distorção eletromagnética

uniform float uTime;
uniform float uSaturation;
uniform float uFrequency;
uniform float uTwist;
uniform float uInterference;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewDir;
varying float vField;
varying vec3 vWorldPos;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);

  vec3 pos = position;
  float n = snoise(vec3(uv * 8.0, uTime * uFrequency * 0.001));
  pos += normal * n * uInterference * 0.15;

  float twistAngle = uTwist * pos.y;
  pos.xz = rot2d(twistAngle) * pos.xz;

  vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vViewDir = normalize(-mvPosition.xyz);
  vField = fbm(vec3(vUv * 6.0, uTime * 0.3), 4) * uSaturation;

  gl_Position = projectionMatrix * mvPosition;
}
`,E),fragmentShader:T(`// Magnetic Field Fragment — linhas de fluxo, glow e interferência

uniform float uTime;
uniform float uSaturation;
uniform float uIntensity;
uniform float uFrequency;
uniform float uRPM;
uniform vec3 uColor;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewDir;
varying float vField;
varying vec3 vWorldPos;

void main() {
  float linesU = abs(fract(vUv.x * 40.0 + uTime * uFrequency * 0.0005) - 0.5);
  float linesV = abs(fract(vUv.y * 20.0 - uTime * 0.1) - 0.5);
  float fieldLines = smoothstep(0.48, 0.0, min(linesU, linesV));

  float orbital = sin(vUv.x * TAU * 3.0 + uTime * 2.0 + vField * 4.0) * 0.5 + 0.5;
  float interference = turbulence(vec3(vUv * 4.0, uTime * 0.4), 3) * 0.5 + 0.5;

  float pulseVal = pulse(uTime, 3.0 + uRPM * 0.00005);
  float strength = fieldLines * (0.4 + orbital * 0.4 + interference * 0.3);
  strength *= uSaturation * (0.5 + uIntensity / 100.0) * pulseVal;

  float fres = fresnel(vNormal, vViewDir, 2.5);
  vec3 col = uColor * (1.0 + vField * 0.8);
  col += vec3(0.2, 0.6, 1.0) * fres * uSaturation;
  col *= strength * 1.0;

  float alpha = strength * (0.1 + fres * 0.22 + uSaturation * 0.12);
  alpha = min(alpha, 0.35);
  gl_FragColor = vec4(col, alpha);
}
`,D)},K=4;function ce(){let e=(0,M.useRef)(),t=(0,M.useRef)(),n=(0,M.useRef)(),r=(0,M.useRef)(),a=h(e=>e.ringRadius),o=h(e=>e.fieldStrength),s=h(v),c=h(y),l=h(b),u=h(x),d=(0,M.useMemo)(()=>ne({uIntensity:o}),[o]);return i(i=>{let d=a/K,f=i.clock.elapsedTime;if(e.current&&e.current.scale.setScalar(d),t.current){let e=t.current.uniforms;e.uTime.value=f,e.uSaturation.value=s.saturation??0,e.uIntensity.value=o,e.uFrequency.value=s.frequency??0,e.uTwist.value=s.toroidalTwist??0,e.uInterference.value=(s.interference??0)+(u.magneticFlash??0)*.5,e.uRPM.value=l.rpm??0}if(n.current&&(n.current.rotation.x+=(s.toroidalTwist??0)*.02,n.current.rotation.z+=(s.toroidalTwist??0)*.03,n.current.material.opacity=Math.min(s.saturation*.2+.04,.25)),r.current){let e=1+(s.toroidalTwist??0)*.3+c.energyLevel/100*.2;r.current.rotation.x+=(l.rpm??0)/5e5*.8,r.current.rotation.y+=(l.rpm??0)/5e5*1.2,r.current.scale.setScalar(e),r.current.material.opacity=.08+(s.saturation??0)*.15}}),(0,N.jsxs)(`group`,{ref:e,renderOrder:5,children:[(0,N.jsxs)(`mesh`,{renderOrder:5,children:[(0,N.jsx)(`torusGeometry`,{args:[K,1.2,64,128]}),(0,N.jsx)(`shaderMaterial`,{ref:t,transparent:!0,depthWrite:!1,side:2,blending:2,vertexShader:G.vertexShader,fragmentShader:G.fragmentShader,uniforms:d})]}),(0,N.jsxs)(`mesh`,{ref:n,children:[(0,N.jsx)(`torusGeometry`,{args:[K,1.2,32,160]}),(0,N.jsx)(`meshBasicMaterial`,{color:`#00ffff`,transparent:!0,opacity:.12,wireframe:!0})]}),(0,N.jsxs)(`mesh`,{ref:r,children:[(0,N.jsx)(`torusKnotGeometry`,{args:[5,.12,200,32]}),(0,N.jsx)(`meshBasicMaterial`,{color:`#44ffff`,transparent:!0,opacity:.12,wireframe:!0})]})]})}var q={vertexShader:T(`// Warp Space Vertex — deformação gravitacional / dobra espacial

uniform float uTime;
uniform float uWarp;
uniform float uDistortion;
uniform float uRelativity;
uniform float uStability;
uniform float uWarpPulse;
uniform float uSpacetimeDistortion;
uniform float uLensing;
uniform float uTimeScale;

varying vec2 vUv;
varying float vDistortion;
varying float vDepth;
varying vec3 vWorldPos;

void main() {
  vUv = uv;
  vec3 pos = position;
  float t = uTime * uTimeScale;

  float singularity = 1.0 - uStability;
  float warpAmp = uWarp * 4.0 * (1.0 + uRelativity * 0.8 + singularity * 0.5 + uWarpPulse + uSpacetimeDistortion * 0.6);

  vec2 centered = pos.xz;
  float dist = length(centered);
  float gravityWell = warpAmp / (dist + 1.0) + uLensing * uSpacetimeDistortion * 0.5 / (dist + 0.5);

  float wave1 = sin(pos.x * 0.3 + t * 2.0) * cos(pos.z * 0.3 + t * 1.4);
  float wave2 = sin(pos.x * 0.7 - t * 3.0 + uRelativity * 10.0);
  float wave = wave1 + wave2 * 0.4;
  wave += fbm(vec3(pos.xz * 0.15, t * 0.2), 4) * uDistortion;

  pos.y += wave * warpAmp + gravityWell * sin(t * 1.5) * 0.3;

  // Lens-like radial pull toward center
  pos.xz -= normalize(centered + 0.001) * gravityWell * 0.08;

  vDistortion = wave + gravityWell;
  vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
  vDepth = - (modelViewMatrix * vec4(pos, 1.0)).z;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`,E),fragmentShader:T(`// Warp Space Fragment — grid espaço-temporal com ondas temporais

uniform float uTime;
uniform float uWarp;
uniform float uEnergy;
uniform float uRelativity;
uniform float uWarpPulse;
uniform vec3 uColor;

varying vec2 vUv;
varying float vDistortion;
varying float vDepth;
varying vec3 vWorldPos;

void main() {
  float gridScale = 40.0 + uWarp * 20.0;
  float gridX = step(0.965, fract(vUv.x * gridScale + vDistortion * 0.1));
  float gridZ = step(0.965, fract(vUv.y * gridScale - uTime * 0.05));
  float grid = max(gridX, gridZ);

  float temporal = sin(uTime * 3.0 + length(vWorldPos.xz) * 0.5) * 0.5 + 0.5;
  float ripple = smoothstep(0.0, 0.8, sin(length(vWorldPos.xz) * 2.0 - uTime * 4.0 - uWarpPulse * 10.0) * 0.5 + 0.5);

  float alpha = grid * (0.08 + abs(vDistortion) * 0.3 + uWarp * 0.5 + uEnergy * 0.25);
  alpha += ripple * uWarpPulse * 0.2;
  alpha *= 0.5 + temporal * 0.3;

  vec3 col = uColor * (1.0 + vDistortion * 0.8 + uRelativity * 0.5);
  col = mix(col, vec3(0.8, 0.3, 1.0), uRelativity * 0.2 * temporal);

  gl_FragColor = vec4(col, alpha);
}
`,D)};function le(){let e=(0,M.useRef)(),t=(0,M.useRef)(),n=h(w),r=h(g),a=h(v),o=h(_),s=h(y),c=h(x),l=j(),u=(0,M.useMemo)(()=>k(),[]);return i(i=>{let u=i.clock.elapsedTime;if(e.current&&(e.current.rotation.y+=n.warpFactor*.03),t.current){let e=t.current.uniforms;e.uTime.value=u,e.uWarp.value=n.warpFactor+c.warpPulse*.5,e.uDistortion.value=a.spatialDistortion??0,e.uRelativity.value=r.relativisticIntensity??0,e.uStability.value=o.overall??1,e.uEnergy.value=s.energyLevel/100,e.uWarpPulse.value=c.warpPulse??0,e.uLensing.value=l.lensing,e.uSpacetimeDistortion.value=l.distortion,e.uTimeScale.value=l.timeScale}}),(0,N.jsxs)(`group`,{position:[0,-5,0],children:[(0,N.jsx)(`gridHelper`,{ref:e,args:[80,80,`#003355`,`#001018`]}),(0,N.jsxs)(`mesh`,{rotation:[-Math.PI/2,0,0],position:[0,.02,0],children:[(0,N.jsx)(`planeGeometry`,{args:[80,80,128,128]}),(0,N.jsx)(`shaderMaterial`,{ref:t,transparent:!0,depthWrite:!1,vertexShader:q.vertexShader,fragmentShader:q.fragmentShader,uniforms:u})]})]})}var J={vertexShader:T(`// Singularity Vertex — disco de acreção e horizonte

uniform float uTime;
uniform float uHorizon;
uniform float uDistortion;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewDir;
varying float vRadial;
varying vec3 vWorldPos;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPos = worldPos.xyz;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vViewDir = normalize(-mv.xyz);
  vRadial = length(position.xz) / max(uHorizon, 0.01);

  vec3 pos = position;
  float warp = snoise(position * 0.5 + vec3(uTime * 0.2, uDistortion, 0.0)) * uDistortion * 0.15;
  pos += normal * warp;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`,E),fragmentShader:T(`// Singularity Fragment — horizonte, anel de fótons, disco de acreção

uniform float uTime;
uniform float uEnergyDensity;
uniform float uHorizon;
uniform float uCollapseRisk;
uniform float uAccretion;
uniform float uLensing;
uniform vec3 uHotColor;
uniform vec3 uColdColor;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewDir;
varying float vRadial;
varying vec3 vWorldPos;

void main() {
  float fres = fresnel(vNormal, vViewDir, 2.2);
  float angle = atan(vWorldPos.z, vWorldPos.x);
  float spin = angle + uTime * (2.0 + uAccretion * 4.0);

  float diskBand = smoothstep(0.35, 0.55, vRadial) * smoothstep(1.4, 0.9, vRadial);
  float diskFlow = sin(spin * 8.0 + vRadial * 12.0) * 0.5 + 0.5;
  float turbulence = fbm(vec3(vUv * 6.0, uTime * 0.3), 4) * 0.5 + 0.5;

  float photonRing = smoothstep(0.52, 0.58, vRadial) * smoothstep(0.68, 0.62, vRadial);
  photonRing *= 1.0 + sin(uTime * 6.0 + angle * 3.0) * 0.2;

  float innerVoid = 1.0 - smoothstep(0.0, 0.48, vRadial);
  float horizonGlow = smoothstep(0.45, 0.52, vRadial) * (1.0 - innerVoid);

  vec3 accretionCol = mix(uColdColor, uHotColor, diskFlow * 0.7 + uEnergyDensity * 0.5);
  accretionCol += vec3(1.0, 0.5, 0.15) * turbulence * uAccretion * 0.4;
  accretionCol *= diskBand * (0.6 + uEnergyDensity * 0.8);

  vec3 photonCol = vec3(0.9, 0.95, 1.0) * photonRing * (1.2 + fres);
  vec3 horizonCol = vec3(0.15, 0.05, 0.02) * horizonGlow;
  horizonCol += vec3(0.8, 0.3, 0.1) * horizonGlow * uCollapseRisk;

  vec3 col = accretionCol + photonCol + horizonCol;
  col = mix(col, vec3(0.0), innerVoid * 0.95);

  float alpha = diskBand * 0.55 + photonRing * 0.85 + horizonGlow * 0.4;
  alpha = min(alpha, 0.92) * (0.3 + uEnergyDensity * 0.7);

  gl_FragColor = vec4(col, alpha);
}
`,D)},Y=15;function ue(){let e=(0,M.useRef)(),t=(0,M.useRef)(),n=(0,M.useRef)(),r=(0,M.useRef)(),a=A(),o=h(C),s=h(_),c=h(e=>e.ringRadius),l=(0,M.useMemo)(()=>O(),[]),u=o.active||s.singularityMode,d=.35+(o.eventHorizon??0)*1.8,f=u?Math.min(1,.25+(o.energyDensity??0)*1.2):0;return i(i=>{let a=i.clock.elapsedTime,s=c/4*d;if(e.current){e.current.rotation.y=a*(.8+(o.accretionRate??0)*2),e.current.scale.setScalar(s);let t=e.current.material.uniforms;t.uTime.value=a,t.uEnergyDensity.value=o.energyDensity??0,t.uHorizon.value=o.eventHorizon??.5,t.uCollapseRisk.value=o.collapseRisk??0,t.uAccretion.value=o.accretionRate??0,t.uLensing.value=o.lensingStrength??0,t.uDistortion.value=o.spacetimeDistortion??0}t.current&&(t.current.scale.setScalar(s*.42),t.current.material.opacity=.92*f),n.current&&(n.current.rotation.x=Math.PI/2,n.current.rotation.z=a*2.5,n.current.scale.setScalar(s*.95),n.current.material.opacity=.5+(o.lensingStrength??0)*.45),r.current&&(r.current.rotation.y=a*.15,r.current.scale.setScalar(s*2.2),r.current.material.opacity=(o.lensingStrength??0)*.12*f)}),f<.02&&!s.singularityMode?null:(0,N.jsxs)(`group`,{renderOrder:Y,children:[(0,N.jsxs)(`mesh`,{ref:t,renderOrder:Y,children:[(0,N.jsx)(`sphereGeometry`,{args:[1,64,64]}),(0,N.jsx)(`meshBasicMaterial`,{color:`#000000`,toneMapped:!1})]}),(0,N.jsxs)(`mesh`,{ref:n,renderOrder:16,children:[(0,N.jsx)(`torusGeometry`,{args:[1,.04,16,a.singularityDiskSegments]}),(0,N.jsx)(`meshBasicMaterial`,{color:`#e8f4ff`,transparent:!0,opacity:.6,blending:2,depthWrite:!1,toneMapped:!0})]}),(0,N.jsxs)(`mesh`,{ref:e,renderOrder:17,children:[(0,N.jsx)(`torusGeometry`,{args:[1,.55,64,a.singularityDiskSegments]}),(0,N.jsx)(`shaderMaterial`,{transparent:!0,depthWrite:!1,side:2,blending:2,vertexShader:J.vertexShader,fragmentShader:J.fragmentShader,uniforms:l})]}),(0,N.jsxs)(`mesh`,{ref:r,renderOrder:Y-1,children:[(0,N.jsx)(`sphereGeometry`,{args:[1,32,24]}),(0,N.jsx)(`meshBasicMaterial`,{color:`#4488ff`,wireframe:!0,transparent:!0,opacity:.08,blending:2,depthWrite:!1})]})]})}function de(){let e=(0,M.useRef)(),t=h(w);return i(()=>{e.current&&(t.shockwaveActive?(e.current.material.opacity=t.shockwaveOpacity,e.current.scale.set(t.shockwaveScale,t.shockwaveScale,1)):e.current.material.opacity=0)}),(0,N.jsxs)(`mesh`,{ref:e,rotation:[-Math.PI/2,0,0],position:[0,.05,0],children:[(0,N.jsx)(`ringGeometry`,{args:[2,2.5,128]}),(0,N.jsx)(`meshBasicMaterial`,{color:`#00ffff`,transparent:!0,opacity:0,side:2,blending:2,depthWrite:!1})]})}function X({id:e,labelPosition:t,children:n}){let r=h(t=>t.sceneLayers.visibility[e]!==!1),i=h(e=>e.sceneLayers.showLabels),a=m(e);if(!r)return null;let o=t??a?.labelPosition??[0,0,0];return(0,N.jsxs)(`group`,{name:`layer-${e}`,children:[n,i&&a&&(0,N.jsx)(c,{position:o,center:!0,distanceFactor:14,zIndexRange:[50,0],style:{pointerEvents:`none`},children:(0,N.jsxs)(`div`,{className:`scene-layer-label`,style:{"--layer-color":a.color},children:[(0,N.jsx)(`span`,{className:`scene-layer-label__dot`}),(0,N.jsxs)(`div`,{className:`scene-layer-label__text`,children:[(0,N.jsx)(`strong`,{children:a.label}),(0,N.jsx)(`small`,{children:a.shortDesc})]})]})})]})}var fe=(0,M.lazy)(()=>S(()=>import(`./SpacetimeStarfield-oCh0Eu9j.js`),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]))),pe=(0,M.lazy)(()=>S(()=>import(`./SpacetimeFabric-CZ5LHAgv.js`),__vite__mapDeps([11,1,2,12,4,5,6,7,3,8,9,10]))),me=(0,M.lazy)(()=>S(()=>import(`./QuantumField-AIq6lIJ6.js`),__vite__mapDeps([13,1,2,14,4,5,6,7,9,10]))),he=(0,M.lazy)(()=>S(()=>import(`./RealityTears-BEQcIXGf.js`),__vite__mapDeps([15,2,1,12,4,5,6,7,9,10]))),ge=(0,M.lazy)(()=>S(()=>import(`./HyperdimensionField-CrFj7Li7.js`),__vite__mapDeps([16,1,2,17,4,5,6,7,9,10]))),_e=(0,M.lazy)(()=>S(()=>import(`./DecouplingBubble-CUtv3oub.js`),__vite__mapDeps([18,1,2,19,4,5,6,7,10]))),ve=(0,M.lazy)(()=>S(()=>import(`./VolumetricFog-D3IR2NRw.js`),__vite__mapDeps([20,1,4,5,2,6,7])));function ye({starCount:e}){return(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(X,{id:`spacetimeStarfield`,children:(0,N.jsx)(M.Suspense,{fallback:null,children:(0,N.jsx)(fe,{count:e},e)})}),(0,N.jsx)(X,{id:`spacetimeFabric`,children:(0,N.jsx)(M.Suspense,{fallback:null,children:(0,N.jsx)(pe,{})})}),(0,N.jsx)(X,{id:`quantumField`,children:(0,N.jsx)(M.Suspense,{fallback:null,children:(0,N.jsx)(me,{})})}),(0,N.jsx)(X,{id:`realityTears`,children:(0,N.jsx)(M.Suspense,{fallback:null,children:(0,N.jsx)(he,{})})}),(0,N.jsx)(X,{id:`hyperdimension`,labelPosition:[0,11,0],children:(0,N.jsx)(M.Suspense,{fallback:null,children:(0,N.jsx)(ge,{})})}),(0,N.jsx)(X,{id:`decouplingField`,labelPosition:[0,9.5,0],children:(0,N.jsx)(M.Suspense,{fallback:null,children:(0,N.jsx)(_e,{})})}),(0,N.jsx)(M.Suspense,{fallback:null,children:(0,N.jsx)(X,{id:`volumetricFog`,children:(0,N.jsx)(ve,{})})})]})}function be(){return i((e,t)=>{p().tick(t)}),null}var xe=2.5;function Se(){let e=h(e=>e.setFx);(0,M.useEffect)(()=>{let t={[u.REALITY_RUPTURE]:t=>e({realityRupture:.7+(t?.newLevel??0)*.08,glitch:.4+(t?.instability??0)*.4,causalityEcho:(t?.newLevel??0)>=3?.7:.35,universeVibration:(t?.instability??0)*.8,chromaticBoost:.35}),[u.OVERLOAD]:()=>e({overloadFlash:1,bloomBoost:.8,quantumBurst:.55}),[u.INSTABILITY]:()=>e({glitch:.7,chromaticBoost:.5}),[u.SINGULARITY_MODE]:()=>e({warpPulse:1,bloomBoost:.7,chromaticBoost:.6,gravitationalLensing:1,quantumBurst:.9}),[u.HORIZON_WARNING]:()=>e({gravitationalLensing:.85,chromaticBoost:.4,warpPulse:.6}),[u.KARDASHEV_TYPE_CHANGE]:()=>e({bloomBoost:.85,neuralPulse:1,quantumBurst:.5}),[u.IMPOSSIBLE_REGIME_CHANGE]:t=>{t?.enabled&&e({warpPulse:.28,chromaticBoost:.18,quantumBurst:.22})},[u.HYPERDIMENSION_SHIFT]:t=>{!t?.active&&!t?.enabled||e({warpPulse:.35,chromaticBoost:.28,quantumBurst:.4})},[u.DECOUPLING_ACTIVATED]:t=>{t?.active&&e({warpPulse:.25+(t.effectiveStrength??0)*.35,chromaticBoost:.15,quantumBurst:.3,gravitationalLensing:(t.effectiveStrength??0)*.4})},[u.DECOUPLING_COLLAPSE]:()=>e({warpPulse:.15,glitch:.12}),[u.GRAVITATIONAL_COLLAPSE]:()=>e({gravitationalLensing:1,glitch:.6,bloomBoost:1,warpPulse:1}),[u.PLASMA_BURST]:()=>e({plasmaBurst:1}),[u.MAGNETIC_COLLAPSE]:()=>e({glitch:1,magneticFlash:1}),[u.SHOCKWAVE]:()=>e({warpPulse:.9,bloomBoost:.6}),[u.ENERGY_RUPTURE]:()=>e({overloadFlash:1,glitch:.9,bloomBoost:1.2,realityRupture:1,causalityEcho:.85,universeVibration:.9}),[u.ENERGY_PULSE]:()=>e({warpPulse:.5}),[f.AI_TICK]:t=>{t.scanning&&e({neuralPulse:.5,aiScan:1}),(t.threatLevel===`CRITICAL`||t.threatLevel===`SINGULARITY`)&&e({glitch:.2})},[f.AI_PROTOCOL]:t=>e({glitch:.5,bloomBoost:.5,neuralPulse:.8,quantumBurst:t?.protocol===`QUANTUM_LOCK`?1:t?.protocol===`DECOUPLING_FIELD`?.65:.45}),[f.AI_MESSAGE]:t=>{t.priority===`CRITICAL`&&e({glitch:.85,overloadFlash:.7,neuralPulse:1})},[f.AI_MOOD_CHANGE]:t=>{h.setState(e=>({ai:{...e.ai,mind:{...e.ai?.mind,...t}},consciousnessTheme:t.theme??`nominal`})),t.instability>.6&&e({glitch:t.instability*.5,neuralPulse:t.instability})},[f.AI_PERSONALITY_SHIFT]:()=>e({neuralPulse:.8,aiScan:1}),[f.AI_AUTONOMOUS_ON]:()=>e({neuralPulse:.9,bloomBoost:.3})},n=Object.entries(t).map(([e,t])=>d.on(e,t));return()=>n.forEach(e=>e())},[e]),i((t,n)=>{let r=h.getState().fx,i={},a=!1;for(let e of Object.keys(r))typeof r[e]==`number`&&r[e]>.001&&(i[e]=Math.max(0,r[e]-xe*n),a=!0);a&&e(i)})}function Ce(){return Se(),null}function we(e,t=.08){return{x:Math.sin(e*.03)*t,y:Math.cos(e*.02)*t}}var Te=(0,M.lazy)(()=>S(()=>import(`./EffectsComposer-BPfcteVh.js`),__vite__mapDeps([21,1,4,5,2,6,7,19,17,14,12,22,3]))),Z=[0,5.5,15];function Ee(){let e=h(w),t=ie();return i(n=>{let r=n.camera,i=n.clock.elapsedTime*1e3,a=n.clock.elapsedTime,o=Z[0],s=Z[1],c=Z[2];if(e.cameraShake){let t=we(i,e.singularityMode?.15:.08);o+=t.x,s+=t.y}if(t.vibration>.4&&(t.ruptureLevel??0)>=2){let e=t.vibration*.12;o+=Math.sin(a*37)*e,s+=Math.cos(a*41)*e,c+=Math.sin(a*29)*e*.5}r.position.set(o,s,c)}),(0,N.jsx)(l,{enableDamping:!0,dampingFactor:.05,target:[0,0,0],maxPolarAngle:Math.PI*.85,minDistance:8,maxDistance:40})}function De(){let e=A(),{fogNear:t,fogFar:n,ambientIntensity:r,coreLightIntensity:i}=e.scene,a=(0,M.useMemo)(()=>[`#000008`,t,n],[t,n]);return(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(be,{}),(0,N.jsx)(Ce,{}),(0,N.jsx)(`color`,{attach:`background`,args:[`#000008`]}),(0,N.jsx)(`fog`,{attach:`fog`,args:a}),(0,N.jsx)(`ambientLight`,{intensity:r,color:`#667799`}),(0,N.jsx)(`pointLight`,{position:[0,0,0],color:`#00ffff`,intensity:i,distance:140,decay:2}),(0,N.jsx)(`pointLight`,{position:[12,8,-10],color:`#3355ff`,intensity:1.5,distance:90,decay:2}),(0,N.jsx)(`pointLight`,{position:[-10,-5,8],color:`#ff4400`,intensity:.4,distance:60,decay:2}),(0,N.jsx)(`directionalLight`,{position:[-8,12,6],color:`#99bbff`,intensity:.55}),(0,N.jsx)(`directionalLight`,{position:[6,4,10],color:`#00ffcc`,intensity:.25}),(0,N.jsx)(ye,{starCount:e.starCount}),(0,N.jsx)(M.Suspense,{fallback:null,children:(0,N.jsxs)(`group`,{children:[(0,N.jsx)(X,{id:`warpGrid`,children:(0,N.jsx)(le,{})}),(0,N.jsx)(X,{id:`plasma`,children:(0,N.jsx)(W,{})}),(0,N.jsx)(X,{id:`magneticField`,children:(0,N.jsx)(ce,{})}),(0,N.jsx)(X,{id:`energyCore`,children:(0,N.jsx)(R,{})}),(0,N.jsx)(X,{id:`singularityCore`,children:(0,N.jsx)(ue,{})}),(0,N.jsx)(X,{id:`beams`,children:(0,N.jsx)(se,{})}),(0,N.jsx)(X,{id:`ring`,children:(0,N.jsx)(ae,{})}),(0,N.jsx)(X,{id:`shockwave`,children:(0,N.jsx)(de,{})})]})}),(0,N.jsx)(Ee,{}),(0,N.jsx)(M.Suspense,{fallback:null,children:(0,N.jsx)(Te,{})})]})}function Oe(e){try{let t=new a({canvas:e,antialias:!1,alpha:!1,stencil:!1,depth:!0,failIfMajorPerformanceCaveat:!1,powerPreference:`default`});if(!t.getContext())throw t.dispose(),Error(`Contexto WebGL não inicializado`);return t}catch(e){let t=e instanceof Error?e.message:`WebGL indisponível neste dispositivo`;throw Error(t)}}function Q(e){let t=String(e?.message??e??``);return/webgl|context|gl_/i.test(t)}function $({message:e,onRetry:t}){return(0,N.jsxs)(`div`,{className:`viewport-webgl-lost viewport-webgl-lost--init`,role:`alert`,children:[(0,N.jsx)(`p`,{children:`Não foi possível iniciar o motor 3D (WebGL).`}),(0,N.jsx)(`p`,{className:`viewport-webgl-lost__detail`,children:e}),(0,N.jsx)(`button`,{type:`button`,onClick:t,children:`Recarregar simulador`}),(0,N.jsxs)(`ul`,{className:`viewport-webgl-lost__tips`,children:[(0,N.jsx)(`li`,{children:`Ative aceleração de hardware no navegador (Chrome: Configurações → Sistema)`}),(0,N.jsx)(`li`,{children:`Atualize o driver da placa de vídeo`}),(0,N.jsx)(`li`,{children:`Desative extensões que bloqueiam WebGL (bloqueadores, privacidade)`}),(0,N.jsx)(`li`,{children:`Feche outras abas 3D / jogos e tente novamente`})]})]})}var ke=class extends M.Component{constructor(e){super(e),this.state={error:null}}static getDerivedStateFromError(e){return{error:e}}componentDidCatch(e){Q(e)&&this.props.onWebGLError?.(e)}render(){return this.state.error&&Q(this.state.error)?null:this.state.error?(0,N.jsx)($,{message:this.state.error.message,onRetry:()=>window.location.reload()}):this.props.children}};function Ae({canvasKey:e,useLegacy:t}){let n=A(),i=h(e=>e.webglContextLost),a=typeof window<`u`?Math.min(window.devicePixelRatio,n.maxDpr):1,s=e=>{e.toneMapping=4,e.toneMappingExposure=n.toneMappingExposure,e.outputColorSpace=r;let t=e.domElement;t.addEventListener(`webglcontextlost`,e=>{e.preventDefault();let t=h.getState();t.setWebglContextLost(!0),t.renderMode!==`performance`&&t.setRenderMode(`performance`)}),t.addEventListener(`webglcontextrestored`,()=>{h.getState().setWebglContextLost(!1)})};return(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(o,{legacy:t,camera:{position:[0,5.5,15],fov:62,near:.1,far:1e3},dpr:[1,a],gl:Oe,onCreated:({gl:e})=>s(e),children:(0,N.jsx)(M.Suspense,{fallback:null,children:(0,N.jsx)(De,{})})},e),i&&(0,N.jsxs)(`div`,{className:`viewport-webgl-lost`,role:`alert`,children:[(0,N.jsx)(`p`,{children:`Memória gráfica esgotada — contexto WebGL perdido.`}),(0,N.jsx)(`button`,{type:`button`,onClick:()=>window.location.reload(),children:`Recarregar simulador`}),(0,N.jsxs)(`span`,{children:[`Use o modo `,(0,N.jsx)(`strong`,{children:`Performance`}),` e desative camadas 3D extras.`]})]})]})}function je(){let[e,t]=(0,M.useState)(`standard`),[n,r]=(0,M.useState)(0),[i,a]=(0,M.useState)(null),o=(0,M.useCallback)(e=>{let n=e?.message??`Erro ao criar contexto WebGL`;t(e=>e===`standard`?(r(e=>e+1),`legacy`):(a(n),`failed`))},[]),s=(0,M.useRef)(o);return s.current=o,(0,M.useEffect)(()=>{let e=e=>{Q(e.reason)&&(e.preventDefault(),s.current(e.reason))};return window.addEventListener(`unhandledrejection`,e),()=>window.removeEventListener(`unhandledrejection`,e)},[]),e===`failed`||i?(0,N.jsx)($,{message:i??`WebGL indisponível neste navegador ou GPU.`,onRetry:()=>window.location.reload()}):(0,N.jsx)(ke,{onWebGLError:o,children:(0,N.jsx)(Ae,{canvasKey:`${n}-${e}`,useLegacy:e===`legacy`})})}export{je as default};