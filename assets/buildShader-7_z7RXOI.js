var e=`// ── Utilitários GLSL compartilhados ─────────────────────────────────────

const float PI  = 3.14159265359;
const float TAU = 6.28318530718;

mat2 rot2d(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

float remap(float v, float a, float b, float c, float d) {
  return c + (v - a) * (d - c) / (b - a);
}

float clamp01(float x) { return clamp(x, 0.0, 1.0); }

vec3 clamp01(vec3 x) { return clamp(x, 0.0, 1.0); }

float pulse(float t, float freq) {
  return 0.5 + 0.5 * sin(t * freq);
}

vec3 palette(float t) {
  vec3 a = vec3(0.02, 0.08, 0.15);
  vec3 b = vec3(0.0, 0.6, 0.9);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.0, 0.15, 0.35);
  return a + b * cos(TAU * (c * t + d));
}

float fresnel(vec3 normal, vec3 viewDir, float power) {
  return pow(1.0 - clamp01(dot(normal, viewDir)), power);
}
`,t=`// ── Simplex / gradient noise 3D (Ashima Arts) ───────────────────────────

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

float snoise(vec2 v) {
  return snoise(vec3(v, 0.0));
}
`,n=`// ── Fractional Brownian Motion ──────────────────────────────────────────
// Requer: snoise() de noise.glsl

float fbm(vec3 p, int octaves) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 8; i++) {
    if (i >= octaves) break;
    value += amplitude * snoise(p * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

float fbm2(vec2 p, int octaves) {
  return fbm(vec3(p, 0.0), octaves);
}

float turbulence(vec3 p, int octaves) {
  float sum = 0.0;
  float amp = 1.0;
  for (int i = 0; i < 6; i++) {
    if (i >= octaves) break;
    sum += abs(snoise(p)) * amp;
    p *= 2.0;
    amp *= 0.5;
  }
  return sum;
}
`,r=`// Campo espaço-tempo — poço gravitacional (seguro para vertex shader)

vec3 spacetimeWell(vec3 pos, float lensing, float distortion, float time) {
  vec2 xz = pos.xz;
  float dist = length(xz);
  vec2 dir = dist > 0.001 ? normalize(xz) : vec2(0.0);

  float rs = 0.5 + lensing * 2.0;
  float pull = lensing * distortion / (dist * dist * 0.08 + dist + rs);
  pull = min(pull, 1.2);

  vec3 warped = pos;
  warped.xz -= dir * pull * 1.8;

  float ripple = sin(dist * 0.35 - time * (0.8 + lensing * 2.0)) * distortion * 0.25;
  ripple += fbm(vec3(xz * 0.08, time * 0.15), 3) * distortion * 0.2;
  warped.y += ripple;

  return warped;
}
`,i=`// Grade espacial — apenas fragment shader (usa fwidth)

float spacetimeGrid(vec3 pos, float scale, float time, float distortion) {
  vec3 p = pos * scale;
  float gx = abs(fract(p.x - 0.5) - 0.5) / fwidth(p.x);
  float gy = abs(fract(p.y - 0.5) - 0.5) / fwidth(p.y);
  float gz = abs(fract(p.z - 0.5) - 0.5) / fwidth(p.z);
  float grid = 1.0 - min(min(gx, gy), gz);
  float wave = sin(length(pos.xz) * 0.4 - time * 1.2) * 0.5 + 0.5;
  return grid * (0.4 + wave * 0.3 + distortion * 0.4);
}
`,a={utilities:e,noise:t,fbm:n,spacetimeVert:r,spacetimeFrag:i},o={"shared/utilities.glsl":e,"shared/noise.glsl":t,"shared/fbm.glsl":n,"shared/spacetime.glsl":`${r}\n${i}`,"shared/spacetime.vert.glsl":r,"shared/spacetime.frag.glsl":i};function s(e){return e.replace(/#include\s+"([^"]+)"/g,(e,t)=>o[t]||(console.warn(`[buildShader] Include não encontrado: ${t}`),``))}function c(e,t=[`utilities`,`noise`,`fbm`]){return t.map(e=>a[e]??``).filter(Boolean).join(`
`)+`
`+s(e)}var l=[`utilities`,`noise`,`fbm`],u=[`utilities`,`noise`,`fbm`,`spacetimeVert`],d=[`utilities`,`noise`,`fbm`,`spacetimeFrag`],f=[`utilities`,`noise`,`fbm`,`spacetimeVert`,`spacetimeFrag`];export{c as a,l as i,f as n,u as r,d as t};